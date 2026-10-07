import { connectDB } from '@/lib/db'
import { Project } from '@/models/Project'
import type { IProject, ProjectCategory } from '@/types'
import type { ProjectInput } from '@/lib/validations/project.schema'

import { DEFAULT_PROJECTS } from '@/config/data'
export { DEFAULT_PROJECTS }

declare global {
  var inMemoryProjects: IProject[] | undefined
}

function getLocalProjects(): IProject[] {
  if (!globalThis.inMemoryProjects) {
    globalThis.inMemoryProjects = [...DEFAULT_PROJECTS]
  }
  return globalThis.inMemoryProjects
}

export async function getAllProjects(category?: string): Promise<IProject[]> {
  if (!process.env.MONGODB_URI) {
    const list = getLocalProjects()
    if (category && category !== 'All') {
      return list.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }
    return list
  }
  try {
    await connectDB()
    const query: Record<string, unknown> = category && category !== 'All' ? { category: category as ProjectCategory } : {}
    const projects = await Project.find(query).sort({ order: 1 }).lean<IProject[]>()
    if (projects && projects.length > 0) {
      return JSON.parse(JSON.stringify(projects))
    }
  } catch (error) {
    console.warn('DB lookup failed for projects, using defaults:', error instanceof Error ? error.message : error)
  }

  const list = getLocalProjects()
  if (category && category !== 'All') {
    return list.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }
  return list
}

export async function getFeaturedProjects(): Promise<IProject[]> {
  if (!process.env.MONGODB_URI) {
    return getLocalProjects().filter((p) => p.isFeatured)
  }
  try {
    await connectDB()
    const projects = await Project.find({ isFeatured: true }).sort({ order: 1 }).lean<IProject[]>()
    if (projects && projects.length > 0) {
      return JSON.parse(JSON.stringify(projects))
    }
  } catch (error) {
    console.warn('DB lookup failed for featured projects:', error instanceof Error ? error.message : error)
  }
  return getLocalProjects().filter((p) => p.isFeatured)
}

export async function getProjectBySlug(slug: string): Promise<IProject | null> {
  if (!process.env.MONGODB_URI) {
    const fallback = getLocalProjects().find((p) => p.slug === slug)
    return fallback || null
  }
  try {
    await connectDB()
    const project = await Project.findOne({ slug }).lean<IProject>()
    if (project) {
      return JSON.parse(JSON.stringify(project))
    }
  } catch (error) {
    console.warn('DB lookup failed for project slug:', error instanceof Error ? error.message : error)
  }
  const fallback = getLocalProjects().find((p) => p.slug === slug)
  return fallback || null
}

export async function createProject(data: ProjectInput): Promise<IProject> {
  try {
    await connectDB()
    const created = await Project.create(data)
    return JSON.parse(JSON.stringify(created))
  } catch (error) {
    console.warn('DB lookup failed for createProject, using local store:', error)
    const newProject: IProject = {
      _id: `mem-${Date.now()}`,
      title: data.title,
      slug: data.slug,
      category: data.category,
      client: data.client,
      location: data.location,
      year: data.year,
      size: data.size || '',
      budget: data.budget || '',
      duration: data.duration || '',
      description: data.description,
      challenge: data.challenge || '',
      solution: data.solution || '',
      results: data.results || [],
      coverImage: data.coverImage,
      galleryImages: data.galleryImages || [data.coverImage],
      tags: data.tags || [],
      isFeatured: data.isFeatured ?? false,
      order: data.order || 99,
    }
    const list = getLocalProjects()
    list.push(newProject)
    return newProject
  }
}

export async function updateProject(id: string, data: Partial<ProjectInput>): Promise<IProject | null> {
  try {
    await connectDB()
    const updated = await Project.findByIdAndUpdate(id, data, { new: true })
    if (updated) {
      return JSON.parse(JSON.stringify(updated))
    }
  } catch (error) {
    console.warn('DB lookup failed for updateProject, updating local store:', error)
  }

  const list = getLocalProjects()
  const idx = list.findIndex((p) => p._id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...data }
  return list[idx]
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await connectDB()
    const res = await Project.findByIdAndDelete(id)
    if (res) return true
  } catch (error) {
    console.warn('DB lookup failed for deleteProject, removing from local store:', error)
  }

  const list = getLocalProjects()
  const len = list.length
  globalThis.inMemoryProjects = list.filter((p) => p._id !== id)
  return globalThis.inMemoryProjects.length < len
}
