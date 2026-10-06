import mongoose, { Schema, Model } from 'mongoose'
import type { ISiteSettings } from '@/types'

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, required: true, default: 'SKYBOUND Construction' },
    tagline: { type: String, default: 'Building Dreams Into Reality' },
    description: {
      type: String,
      default:
        'Building excellence with innovation and integrity since 2003. We transform visions into exceptional spaces with unmatched quality and professionalism.',
    },
    logoUrl: { type: String, default: '' },
    contact: {
      phone: { type: String, default: '(555) 123-4567' },
      email: { type: String, default: 'info@skybound.com' },
      emergencyPhone: { type: String, default: '(555) 987-6543' },
      address: {
        street: { type: String, default: '123 Construction Ave' },
        city: { type: String, default: 'Los Angeles' },
        state: { type: String, default: 'CA' },
        zip: { type: String, default: '90001' },
        country: { type: String, default: 'USA' },
      },
      hours: { type: String, default: 'Mon - Fri: 8:00 AM - 6:00 PM' },
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com' },
      twitter: { type: String, default: 'https://twitter.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      youtube: { type: String, default: '' },
    },
    theme: {
      presetId: { type: String, default: 'obsidianCopper' },
      primaryColor: { type: String, default: '#C46A2B' },
      secondaryColor: { type: String, default: '#171A1D' },
      colors: { type: Schema.Types.Mixed, default: {} },
    },
    stats: {
      yearsExperience: { type: Number, default: 20 },
      projectsCompleted: { type: Number, default: 250 },
      clientSatisfaction: { type: Number, default: 98 },
      activeProjects: { type: Number, default: 12 },
    },
    seo: {
      metaTitle: { type: String, default: 'SKYBOUND Construction | Professional Building Solutions' },
      metaDescription: {
        type: String,
        default: 'Quality construction services for residential and commercial projects',
      },
      keywords: {
        type: [String],
        default: ['construction', 'general contractor', 'commercial building', 'residential remodeling'],
      },
      ogImage: { type: String, default: '' },
    },
  },
  { timestamps: true }
)

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)
