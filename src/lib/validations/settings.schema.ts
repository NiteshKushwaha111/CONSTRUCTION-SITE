import { z } from 'zod'

export const settingsSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  tagline: z.string().default(''),
  description: z.string().min(10, 'Description is required'),
  logoUrl: z.string().optional(),
  contact: z.object({
    phone: z.string().min(5, 'Phone number is required'),
    email: z.string().email('Valid email is required'),
    emergencyPhone: z.string().optional(),
    address: z.object({
      street: z.string().default(''),
      city: z.string().default(''),
      state: z.string().default(''),
      zip: z.string().default(''),
      country: z.string().default('USA'),
    }),
    hours: z.string().default(''),
  }),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }),
  theme: z.object({
    presetId: z.string().optional(),
    primaryColor: z.string().default('#C46A2B'),
    secondaryColor: z.string().default('#171A1D'),
    colors: z.record(z.string(), z.string()).optional(),
  }),
  stats: z.object({
    yearsExperience: z.number().default(20),
    projectsCompleted: z.number().default(250),
    clientSatisfaction: z.number().default(98),
    activeProjects: z.number().default(12),
  }),
  seo: z.object({
    metaTitle: z.string().default(''),
    metaDescription: z.string().default(''),
    keywords: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
  }),
})

export type SettingsInput = z.infer<typeof settingsSchema>
