import { connectDB } from '@/lib/db'
import { Lead } from '@/models/Lead'
import type { ILead, LeadStatus } from '@/types'
import type { LeadInput } from '@/lib/validations/lead.schema'

declare global {
  var inMemoryLeads: ILead[] | undefined
}

const INITIAL_FALLBACK_LEADS: ILead[] = [
  {
    _id: 'lead-1',
    fullName: 'Robert Harrison',
    email: 'robert.harrison@vanguardcap.com',
    phone: '(212) 555-0182',
    projectType: 'Commercial',
    budgetRange: '$5M - $10M',
    message: 'Requesting RFQ for a 12-story corporate headquarters expansion in downtown financial district.',
    status: 'new',
    source: 'website_form',
    createdAt: new Date(Date.now() - 3600000 * 4),
    updatedAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    _id: 'lead-2',
    fullName: 'Dr. Evelyn Martinez',
    email: 'emartinez@metrohealth.org',
    phone: '(312) 555-0199',
    projectType: 'Healthcare',
    budgetRange: '$2M - $5M',
    message: 'Seeking certified contractors for ambulatory surgical center renovation and clean-room HVAC fit-out.',
    status: 'in_review',
    notes: 'Architectural drawings received, schedule site review for Thursday.',
    source: 'website_form',
    createdAt: new Date(Date.now() - 3600000 * 24),
    updatedAt: new Date(Date.now() - 3600000 * 12),
  },
  {
    _id: 'lead-3',
    fullName: 'Marcus Vance',
    email: 'marcus@vanceestates.com',
    phone: '(305) 555-0134',
    projectType: 'Residential',
    budgetRange: '$1M - $2M',
    message: 'Modern coastal residential build with infinity pool and hurricane-grade structural glazing.',
    status: 'contacted',
    notes: 'Introductory discovery call completed.',
    source: 'website_form',
    createdAt: new Date(Date.now() - 3600000 * 72),
    updatedAt: new Date(Date.now() - 3600000 * 48),
  },
]

function getLocalLeads(): ILead[] {
  if (!globalThis.inMemoryLeads) {
    globalThis.inMemoryLeads = [...INITIAL_FALLBACK_LEADS]
  }
  return globalThis.inMemoryLeads
}

export async function createLead(data: LeadInput): Promise<ILead> {
  try {
    await connectDB()
    const lead = await Lead.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      projectType: data.projectType,
      budgetRange: data.budgetRange || '',
      message: data.message,
      source: data.source || 'website_form',
      status: 'new',
    })
    return JSON.parse(JSON.stringify(lead))
  } catch (error) {
    console.warn('MongoDB unavailable for lead creation, persisting in memory:', error)
    const newLead: ILead = {
      _id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      projectType: data.projectType,
      budgetRange: data.budgetRange || '',
      message: data.message,
      source: data.source || 'website_form',
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const list = getLocalLeads()
    list.unshift(newLead)
    return newLead
  }
}

export async function getAllLeads(status?: LeadStatus): Promise<ILead[]> {
  try {
    await connectDB()
    const query = status ? { status } : {}
    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean<ILead[]>()
    if (leads && leads.length > 0) {
      return JSON.parse(JSON.stringify(leads))
    }
  } catch (error) {
    console.warn('MongoDB unavailable for leads lookup, returning local store:', error)
  }

  const list = getLocalLeads()
  if (status && status !== ('all' as unknown as LeadStatus)) {
    return list.filter((l) => l.status === status)
  }
  return list
}

export async function updateLeadStatus(id: string, status: LeadStatus, notes?: string): Promise<ILead | null> {
  try {
    await connectDB()
    const updateData: { status: LeadStatus; notes?: string } = { status }
    if (notes !== undefined) {
      updateData.notes = notes
    }
    const updated = await Lead.findByIdAndUpdate(id, updateData, { new: true })
    if (updated) {
      return JSON.parse(JSON.stringify(updated))
    }
  } catch (error) {
    console.warn('MongoDB unavailable for lead update, updating local store:', error)
  }

  const list = getLocalLeads()
  const target = list.find((l) => l._id === id)
  if (!target) return null
  target.status = status
  if (notes !== undefined) {
    target.notes = notes
  }
  target.updatedAt = new Date()
  return { ...target }
}

export async function deleteLead(id: string): Promise<boolean> {
  try {
    await connectDB()
    const res = await Lead.findByIdAndDelete(id)
    if (res) return true
  } catch (error) {
    console.warn('MongoDB unavailable for lead delete, removing from local store:', error)
  }

  const list = getLocalLeads()
  const initialLength = list.length
  globalThis.inMemoryLeads = list.filter((l) => l._id !== id)
  return globalThis.inMemoryLeads.length < initialLength
}
