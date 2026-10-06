import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.enum(['Commercial', 'Residential', 'Institutional', 'Hospitality', 'Healthcare', 'Industrial', 'Renovation']),
  client: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  year: z.string().min(4, 'Year is required'),
  size: z.string().optional(),
  budget: z.string().optional(),
  duration: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.array(z.string()).default([]),
  coverImage: z.string().min(1, 'Cover image URL is required'),
  galleryImages: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  order: z.number().default(0),
})

export type ProjectInput = z.infer<typeof projectSchema>
