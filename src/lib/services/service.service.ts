import { connectDB } from '@/lib/db'
import { Service } from '@/models/Service'
import type { IService } from '@/types'
import type { ServiceInput } from '@/lib/validations/service.schema'

import { DEFAULT_SERVICES } from '@/config/data'
export { DEFAULT_SERVICES }

declare global {
  var inMemoryServices: IService[] | undefined
}

function getLocalServices(): IService[] {
  if (!globalThis.inMemoryServices) {
    globalThis.inMemoryServices = [...DEFAULT_SERVICES]
  }
  return globalThis.inMemoryServices
}

export async function getAllServices(): Promise<IService[]> {
  try {
    await connectDB()
    const services = await Service.find({ isActive: true }).sort({ order: 1 }).lean<IService[]>()
    if (services && services.length > 0) {
      return JSON.parse(JSON.stringify(services))
    }
  } catch (error) {
    console.warn('Could not fetch services from DB, using defaults:', error)
  }
  return getLocalServices().filter((s) => s.isActive)
}

export async function getAdminServices(): Promise<IService[]> {
  try {
    await connectDB()
    const services = await Service.find().sort({ order: 1 }).lean<IService[]>()
    if (services && services.length > 0) {
      return JSON.parse(JSON.stringify(services))
    }
  } catch {
    // DB not available, use local store
  }
  return getLocalServices()
}

export async function getServiceBySlug(slug: string): Promise<IService | null> {
  try {
    await connectDB()
    const service = await Service.findOne({ slug, isActive: true }).lean<IService>()
    if (service) {
      return JSON.parse(JSON.stringify(service))
    }
  } catch (error) {
    console.warn('DB lookup failed for service slug:', error)
  }
  const fallback = getLocalServices().find((s) => s.slug === slug && s.isActive)
  return fallback || null
}

export async function createService(data: ServiceInput): Promise<IService> {
  try {
    await connectDB()
    const created = await Service.create(data)
    return JSON.parse(JSON.stringify(created))
  } catch (error) {
    console.warn('DB unavailable for createService, using local store:', error)
    const newService: IService = {
      _id: `mem-${Date.now()}`,
      title: data.title,
      slug: data.slug,
      category: data.category,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      features: data.features,
      durationEstimate: data.durationEstimate || '',
      icon: data.icon || 'Hammer',
      coverImage: data.coverImage,
      order: data.order || 99,
      isFeatured: data.isFeatured ?? false,
      isActive: data.isActive ?? true,
    }
    const list = getLocalServices()
    list.push(newService)
    return newService
  }
}

export async function updateService(id: string, data: Partial<ServiceInput>): Promise<IService | null> {
  try {
    await connectDB()
    const updated = await Service.findByIdAndUpdate(id, data, { new: true })
    if (updated) {
      return JSON.parse(JSON.stringify(updated))
    }
  } catch (error) {
    console.warn('DB unavailable for updateService, updating local store:', error)
  }

  const list = getLocalServices()
  const idx = list.findIndex((s) => s._id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...data }
  return list[idx]
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    await connectDB()
    const res = await Service.findByIdAndDelete(id)
    if (res) return true
  } catch (error) {
    console.warn('DB unavailable for deleteService, removing from local store:', error)
  }

  const list = getLocalServices()
  const len = list.length
  globalThis.inMemoryServices = list.filter((s) => s._id !== id)
  return globalThis.inMemoryServices.length < len
}
