import mongoose, { Schema, Model } from 'mongoose'
import type { IService } from '@/types'

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['residential', 'commercial', 'specialized', 'renovation'],
      default: 'residential',
    },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    features: { type: [String], default: [] },
    durationEstimate: { type: String, default: 'Varies by project' },
    icon: { type: String, default: 'Building2' },
    coverImage: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)
