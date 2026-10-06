import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { SiteSettings } from '../src/models/SiteSettings'
import { Service } from '../src/models/Service'
import { Project } from '../src/models/Project'
import { Testimonial } from '../src/models/Testimonial'
import { User } from '../src/models/User'
import { DEFAULT_SETTINGS } from '../src/lib/services/settings.service'
import { DEFAULT_SERVICES } from '../src/lib/services/service.service'
import { DEFAULT_PROJECTS } from '../src/lib/services/project.service'
import { DEFAULT_TESTIMONIALS } from '../src/lib/services/testimonial.service'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/construction_cms'

async function seed() {
  console.log('Connecting to MongoDB at:', MONGODB_URI)
  await mongoose.connect(MONGODB_URI)
  console.log('Connected successfully.')

  // 1. Seed Site Settings
  console.log('Seeding Site Settings...')
  await SiteSettings.deleteMany({})
  await SiteSettings.create(DEFAULT_SETTINGS)

  // 2. Seed Services
  console.log('Seeding Services...')
  await Service.deleteMany({})
  for (const s of DEFAULT_SERVICES) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = s
    await Service.create(rest)
  }

  // 3. Seed Projects
  console.log('Seeding Projects...')
  await Project.deleteMany({})
  for (const p of DEFAULT_PROJECTS) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = p
    await Project.create(rest)
  }

  // 4. Seed Testimonials
  console.log('Seeding Testimonials...')
  await Testimonial.deleteMany({})
  for (const t of DEFAULT_TESTIMONIALS) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = t
    await Testimonial.create(rest)
  }

  // 5. Seed Super Admin User
  console.log('Seeding Default Admin User...')
  await User.deleteMany({})
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash('admin123456', salt)

  await User.create({
    name: 'Master Administrator',
    email: 'admin@skybound.com',
    passwordHash,
    role: 'super_admin',
    isActive: true,
  })

  console.log('Database seeded successfully!')
  console.log('Default Admin Credentials:')
  console.log('  Email: admin@skybound.com')
  console.log('  Password: admin123456')

  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
