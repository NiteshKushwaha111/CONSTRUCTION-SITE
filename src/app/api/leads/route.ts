import { NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validations/lead.schema'
import { createLead, getAllLeads } from '@/lib/services/lead.service'
import { getSessionUser } from '@/lib/auth'
import type { LeadStatus } from '@/types'

// Public inquiry submission
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const lead = await createLead(parsed.data)
    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error) {
    console.error('Failed to create lead:', error)
    return NextResponse.json(
      { error: 'Internal server error while saving lead' },
      { status: 500 }
    )
  }
}

// Protected admin retrieval
export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') as LeadStatus | undefined

    const leads = await getAllLeads(status)
    return NextResponse.json({ success: true, leads })
  } catch (error) {
    console.error('Failed to list leads:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
