'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import {
  Hammer,
  Plus,
  Trash2,
  Edit2,
  X,
  Loader2,
} from 'lucide-react'
import type { IService, ServiceCategory } from '@/types'

export default function AdminServicesPage() {
  const [services, setServices] = useState<IService[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<IService | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState<ServiceCategory>('residential')
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [durationEstimate, setDurationEstimate] = useState('4–8 weeks')
  const [featuresStr, setFeaturesStr] = useState('')
  const [isFeatured, setIsFeatured] = useState(true)

  const fetchServices = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/services')
      const data = await res.json()
      if (data.success) {
        setServices(data.services)
      }
    } catch (err) {
      console.error('Failed to fetch services:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const openCreateModal = () => {
    setEditingService(null)
    setTitle('')
    setSlug('')
    setCategory('residential')
    setShortDescription('')
    setFullDescription('')
    setDurationEstimate('4–8 weeks')
    setFeaturesStr('Custom Design, Quality Materials, Timely Delivery')
    setIsFeatured(true)
    setIsModalOpen(true)
  }

  const openEditModal = (svc: IService) => {
    setEditingService(svc)
    setTitle(svc.title)
    setSlug(svc.slug)
    setCategory(svc.category)
    setShortDescription(svc.shortDescription)
    setFullDescription(svc.fullDescription)
    setDurationEstimate(svc.durationEstimate)
    setFeaturesStr(svc.features?.join(', ') || '')
    setIsFeatured(svc.isFeatured ?? true)
    setIsModalOpen(true)
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!editingService) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      )
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const payload = {
      title,
      slug,
      category,
      shortDescription,
      fullDescription,
      durationEstimate,
      features: featuresStr
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      isFeatured,
      isActive: true,
      icon: 'Building2',
      coverImage:
        editingService?.coverImage ||
        'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?q=80&w=2070',
      order: editingService?.order || services.length + 1,
    }

    try {
      if (editingService?._id) {
        const res = await fetch(`/api/services/${editingService._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          await fetchServices()
          setIsModalOpen(false)
        }
      } else {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          await fetchServices()
          setIsModalOpen(false)
        }
      }
    } catch (err) {
      console.error('Failed to save service:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Are you sure you want to delete this service?')) return

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s._id !== id))
      }
    } catch (err) {
      console.error('Failed to delete service:', err)
    }
  }

  return (
    <AdminShell>
      <div className="space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Services & Trade Offerings</h1>
            <p className="text-sm text-foreground-muted mt-0.5">
              Manage construction disciplines, deliverables, and service catalog.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-primary-hover shadow-xs transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Services Table */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center text-foreground-muted flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-sm">Loading services...</span>
            </div>
          ) : services.length === 0 ? (
            <div className="py-20 text-center text-foreground-muted text-sm">
              <Hammer className="h-10 w-10 mx-auto text-foreground-muted/60 mb-3" />
              <span>No services created yet. Click &apos;Add New Service&apos; to create one.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-foreground-muted text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Service Name</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Timeline</th>
                    <th className="pb-3 font-semibold">Featured</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {services.map((svc) => (
                    <tr key={svc.slug} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-foreground">{svc.title}</div>
                        <div className="text-xs text-foreground-muted mt-0.5 font-mono">/services/{svc.slug}</div>
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full bg-surface-muted text-foreground text-xs font-semibold capitalize border border-border">
                          {svc.category}
                        </span>
                      </td>
                      <td className="py-4 text-foreground-muted text-xs">{svc.durationEstimate}</td>
                      <td className="py-4">
                        {svc.isFeatured ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                            Yes
                          </span>
                        ) : (
                          <span className="text-foreground-muted text-xs">No</span>
                        )}
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(svc)}
                          className="p-2 rounded-lg bg-surface-muted text-foreground hover:bg-surface border border-border transition cursor-pointer shadow-xs"
                          title="Edit Service"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(svc._id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Dialog */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  {editingService ? 'Edit Service' : 'Create New Construction Service'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-muted transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Title *</label>
                    <input
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Commercial Building"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">URL Slug *</label>
                    <input
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="commercial-building"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface font-mono text-xs transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="renovation">Renovation</option>
                      <option value="specialized">Specialized</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Estimated Timeline</label>
                    <input
                      value={durationEstimate}
                      onChange={(e) => setDurationEstimate(e.target.value)}
                      placeholder="6–12 months"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Short Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Brief 1-2 sentence overview shown on index cards..."
                    className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface resize-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Full Scope & Specifications *</label>
                  <textarea
                    rows={4}
                    required
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    placeholder="Detailed narrative shown on the service detail page..."
                    className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface resize-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    Features / Deliverables (Comma-separated)
                  </label>
                  <input
                    value={featuresStr}
                    onChange={(e) => setFeaturesStr(e.target.value)}
                    placeholder="Architectural Plans, Foundation, Code Compliance"
                    className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  <label htmlFor="isFeatured" className="text-xs text-foreground font-semibold cursor-pointer">
                    Feature prominently on Homepage & Highlights
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-lg bg-surface-muted text-foreground text-xs font-semibold uppercase tracking-wider hover:bg-surface border border-border transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-primary-hover shadow-xs flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
                  >
                    {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    <span>{editingService ? 'Save Changes' : 'Create Service'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
