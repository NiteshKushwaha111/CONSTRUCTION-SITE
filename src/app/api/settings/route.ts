import { NextResponse } from 'next/server'
import { getSettings, updateSettings } from '@/lib/services/settings.service'
import { settingsSchema } from '@/lib/validations/settings.schema'
import { getSessionUser } from '@/lib/auth'

export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('Failed to get settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const parsed = settingsSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const updated = await updateSettings(parsed.data)
    return NextResponse.json({ success: true, settings: updated })
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
