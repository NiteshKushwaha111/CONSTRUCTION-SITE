import mongoose from 'mongoose'

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
  isUnavailable: boolean
  lastCheck: number
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  isUnavailable: false,
  lastCheck: 0,
}
global.mongooseCache = cached

export async function connectDB(): Promise<typeof mongoose> {
  // If no DB URI is supplied, fail immediately so fallback data is served in 0ms
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not configured. Using mock/local data layer.')
  }

  // If DB was checked recently and failed, don't wait on timeout again for 30s
  if (cached.isUnavailable && Date.now() - cached.lastCheck < 30000) {
    throw new Error('MongoDB currently unreachable. Using fallback local layer.')
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 1000, // fast failover within 1 sec
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      cached.isUnavailable = false
      return mongooseInstance
    })
  }

  try {
    cached.conn = await cached.promise
    cached.isUnavailable = false
  } catch (e) {
    cached.promise = null
    cached.isUnavailable = true
    cached.lastCheck = Date.now()
    throw e
  }

  return cached.conn
}
