import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import { SiteSettings } from '@/models/SiteSettings'
import { Service } from '@/models/Service'
import { Project } from '@/models/Project'
import { Testimonial } from '@/models/Testimonial'
import { User } from '@/models/User'
import { DEFAULT_SETTINGS } from '@/lib/services/settings.service'
import { DEFAULT_SERVICES } from '@/lib/services/service.service'
import { DEFAULT_PROJECTS } from '@/lib/services/project.service'
import { DEFAULT_TESTIMONIALS } from '@/lib/services/testimonial.service'

export async function POST() {
  try {
    await connectDB()

    // 1. Seed Site Settings
    const settingsCount = await SiteSettings.countDocuments()
    if (settingsCount === 0) {
      await SiteSettings.create(DEFAULT_SETTINGS)
    }

    // 2. Seed Services
    const servicesCount = await Service.countDocuments()
    if (servicesCount === 0) {
      for (const s of DEFAULT_SERVICES) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = s
        await Service.create(rest)
      }
    }

    // 3. Seed Projects
    const projectsCount = await Project.countDocuments()
    if (projectsCount === 0) {
      for (const p of DEFAULT_PROJECTS) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = p
        await Project.create(rest)
      }
    }

    // 4. Seed Testimonials
    const testimonialsCount = await Testimonial.countDocuments()
    if (testimonialsCount === 0) {
      for (const t of DEFAULT_TESTIMONIALS) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = t
        await Testimonial.create(rest)
      }
    }

    // 5. Seed Super Admin User if none exists
    const adminCount = await User.countDocuments()
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash('admin123456', salt)

      await User.create({
        name: 'Master Administrator',
        email: 'admin@skybound.com',
        passwordHash,
        role: 'super_admin',
        isActive: true,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized and seeded with default SKYBOUND construction records.',
    })
  } catch (error) {
    console.error('Seed API error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: String(error) },
      { status: 500 }
    )
  }
}
