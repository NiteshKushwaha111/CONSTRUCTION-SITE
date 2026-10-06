import { z } from 'zod'

export const leadSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  projectType: z.string().min(1, 'Please select a project type'),
  budgetRange: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  source: z.string().optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
