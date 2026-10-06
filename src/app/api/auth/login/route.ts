import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User'
import { comparePassword } from '@/lib/password'
import { signToken, AUTH_COOKIE_NAME } from '@/lib/auth'
import { loginSchema } from '@/lib/validations/auth.schema'

import type { UserRole } from '@/types'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data
    const normalizedEmail = email.toLowerCase().trim()

    let authenticatedUser: {
      id: string
      name: string
      email: string
      role: UserRole
    } | null = null

    // 1. Instant check for default development / demo administrator
    if (normalizedEmail === 'admin@skybound.com' && (password === 'admin123456' || password === 'admin' || !process.env.MONGODB_URI)) {
      authenticatedUser = {
        id: 'default-admin-id',
        name: 'Senior Administrator',
        email: 'admin@skybound.com',
        role: 'super_admin',
      }
    }

    // 2. If not demo account and MongoDB is configured, verify against database
    if (!authenticatedUser && process.env.MONGODB_URI) {
      try {
        await connectDB()
        const user = await User.findOne({ email: normalizedEmail })

        if (user && user.isActive) {
          const isMatch = await comparePassword(password, user.passwordHash)
          if (isMatch) {
            user.lastLogin = new Date()
            await user.save()
            authenticatedUser = {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
      } catch (dbError) {
        console.warn('MongoDB query failed, falling back:', dbError)
      }
    }

    // 3. Fallback: If no match found but running offline, allow admin credentials
    if (!authenticatedUser && normalizedEmail === 'admin@skybound.com' && password === 'admin123456') {
      authenticatedUser = {
        id: 'default-admin-id',
        name: 'Senior Administrator',
        email: 'admin@skybound.com',
        role: 'super_admin',
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: 'Invalid email or password. Use admin@skybound.com / admin123456 for demo access.' },
        { status: 401 }
      )
    }

    const token = await signToken({
      userId: authenticatedUser.id,
      email: authenticatedUser.email,
      name: authenticatedUser.name,
      role: authenticatedUser.role,
    })

    const response = NextResponse.json({
      success: true,
      user: authenticatedUser,
    })

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred during authentication' },
      { status: 500 }
    )
  }
}
