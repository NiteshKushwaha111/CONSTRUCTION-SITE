import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { updateLeadStatus, deleteLead } from '@/lib/services/lead.service'
import type { LeadStatus } from '@/types'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { status, notes } = body

    if (!['new', 'in_review', 'contacted', 'closed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid lead status' }, { status: 400 })
    }

    const updated = await updateLeadStatus(id, status as LeadStatus, notes)
    if (!updated) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead: updated })
  } catch (error) {
    console.error('Failed to update lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const deleted = await deleteLead(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
