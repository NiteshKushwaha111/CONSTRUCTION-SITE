import { connectDB } from '@/lib/db'
import { Testimonial } from '@/models/Testimonial'
import type { ITestimonial } from '@/types'

import { DEFAULT_TESTIMONIALS } from '@/config/data'
export { DEFAULT_TESTIMONIALS }

export async function getAllTestimonials(): Promise<ITestimonial[]> {
  if (!process.env.MONGODB_URI) {
    return DEFAULT_TESTIMONIALS
  }
  try {
    await connectDB()
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 }).lean<ITestimonial[]>()
    if (testimonials && testimonials.length > 0) {
      return JSON.parse(JSON.stringify(testimonials))
    }
  } catch (error) {
    console.warn('DB lookup failed for testimonials, using defaults:', error instanceof Error ? error.message : error)
  }
  return DEFAULT_TESTIMONIALS
}

export async function createTestimonial(data: Omit<ITestimonial, '_id' | 'createdAt' | 'updatedAt'>): Promise<ITestimonial> {
  await connectDB()
  const created = await Testimonial.create(data)
  return JSON.parse(JSON.stringify(created))
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  await connectDB()
  const res = await Testimonial.findByIdAndDelete(id)
  return !!res
}
