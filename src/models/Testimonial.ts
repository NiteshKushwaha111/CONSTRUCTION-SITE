import mongoose, { Schema, Model } from 'mongoose'
import type { ITestimonial } from '@/types'

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    clientRole: { type: String, required: true },
    company: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    review: { type: String, required: true },
    projectTitle: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
