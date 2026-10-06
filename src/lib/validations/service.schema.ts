import { z } from 'zod'

export const serviceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.enum(['residential', 'commercial', 'specialized', 'renovation']),
  shortDescription: z.string().min(10, 'Short description is required'),
  fullDescription: z.string().min(20, 'Full description is required'),
  features: z.array(z.string()).default([]),
  durationEstimate: z.string().default('Varies by project'),
  icon: z.string().default('Building2'),
  coverImage: z.string().optional(),
  order: z.number().default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

export type ServiceInput = z.infer<typeof serviceSchema>
