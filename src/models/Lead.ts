import mongoose, { Schema, Model } from 'mongoose'
import type { ILead } from '@/types'

const LeadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    projectType: { type: String, required: true, default: 'General Inquiry' },
    budgetRange: { type: String, default: '' },
    message: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['new', 'in_review', 'contacted', 'closed'],
      default: 'new',
    },
    notes: { type: String, default: '' },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
)

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)
