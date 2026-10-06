import mongoose, { Schema, Model } from 'mongoose'
import type { IProject } from '@/types'

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Commercial', 'Residential', 'Institutional', 'Hospitality', 'Healthcare', 'Industrial', 'Renovation'],
      default: 'Commercial',
    },
    client: { type: String, default: 'Private Client' },
    location: { type: String, required: true },
    year: { type: String, required: true },
    size: { type: String, default: '' },
    budget: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, required: true },
    challenge: { type: String, default: '' },
    solution: { type: String, default: '' },
    results: { type: [String], default: [] },
    coverImage: { type: String, required: true },
    galleryImages: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
