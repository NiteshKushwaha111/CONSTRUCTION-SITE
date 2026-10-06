import { NextResponse } from 'next/server'
import { getAllServices, createService } from '@/lib/services/service.service'
import { serviceSchema } from '@/lib/validations/service.schema'
import { getSessionUser } from '@/lib/auth'

export async function GET() {
  try {
    const services = await getAllServices()
    return NextResponse.json({ success: true, services })
  } catch (error) {
    console.error('Failed to get services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const parsed = serviceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const created = await createService(parsed.data)
    return NextResponse.json({ success: true, service: created }, { status: 201 })
  } catch (error) {
    console.error('Failed to create service:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
