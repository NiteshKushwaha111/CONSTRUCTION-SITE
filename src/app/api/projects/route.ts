import { NextResponse } from 'next/server'
import { getAllProjects, createProject } from '@/lib/services/project.service'
import { projectSchema } from '@/lib/validations/project.schema'
import { getSessionUser } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || undefined
    const projects = await getAllProjects(category)
    return NextResponse.json({ success: true, projects })
  } catch (error) {
    console.error('Failed to get projects:', error)
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
    const parsed = projectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const created = await createProject(parsed.data)
    return NextResponse.json({ success: true, project: created }, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
