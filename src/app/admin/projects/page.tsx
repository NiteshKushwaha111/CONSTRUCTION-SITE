'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import {
  FolderGit2,
  Plus,
  Trash2,
  Edit2,
  X,
  Loader2,
} from 'lucide-react'
import type { IProject, ProjectCategory } from '@/types'

const CATEGORIES: ProjectCategory[] = [
  'Commercial',
  'Residential',
  'Institutional',
  'Hospitality',
  'Healthcare',
  'Industrial',
  'Renovation',
]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<IProject | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState<ProjectCategory>('Commercial')
  const [client, setClient] = useState('')
  const [location, setLocation] = useState('')
  const [year, setYear] = useState('2024')
  const [size, setSize] = useState('')
  const [budget, setBudget] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [challenge, setChallenge] = useState('')
  const [solution, setSolution] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [tagsStr, setTagsStr] = useState('')
  const [isFeatured, setIsFeatured] = useState(true)

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/projects')
      const data = await res.json()
      if (data.success) {
        setProjects(data.projects)
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const openCreateModal = () => {
    setEditingProject(null)
    setTitle('')
    setSlug('')
    setCategory('Commercial')
    setClient('Private Developer')
    setLocation('Los Angeles, CA')
    setYear('2024')
    setSize('120,000 sqft')
    setBudget('$4.5M')
    setDuration('12 Months')
    setDescription('')
    setChallenge('')
    setSolution('')
    setCoverImage('https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070')
    setTagsStr('Commercial, Steel Framing, LEED')
    setIsFeatured(true)
    setIsModalOpen(true)
  }

  const openEditModal = (p: IProject) => {
    setEditingProject(p)
    setTitle(p.title)
    setSlug(p.slug)
    setCategory(p.category)
    setClient(p.client || '')
    setLocation(p.location)
    setYear(p.year)
    setSize(p.size || '')
    setBudget(p.budget || '')
    setDuration(p.duration || '')
    setDescription(p.description)
    setChallenge(p.challenge || '')
    setSolution(p.solution || '')
    setCoverImage(p.coverImage)
    setTagsStr(p.tags?.join(', ') || '')
    setIsFeatured(p.isFeatured)
    setIsModalOpen(true)
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!editingProject) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim()
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
      client,
      location,
      year,
      size,
      budget,
      duration,
      description,
      challenge,
      solution,
      coverImage,
      tags: tagsStr.split(',').map((t) => t.trim()).filter(Boolean),
      isFeatured,
      order: editingProject?.order || projects.length + 1,
    }

    try {
      if (editingProject?._id) {
        const res = await fetch(`/api/projects/${editingProject._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          await fetchProjects()
          setIsModalOpen(false)
        }
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          await fetchProjects()
          setIsModalOpen(false)
        }
      }
    } catch (err) {
      console.error('Failed to save project:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== id))
      }
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  return (
    <AdminShell>
      <div className="space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Projects & Portfolio Case Studies</h1>
            <p className="text-sm text-foreground-muted mt-0.5">
              Showcase completed structures, client briefs, and engineering achievements.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-primary-hover shadow-xs transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Projects Table */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center text-foreground-muted flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-sm">Loading projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-20 text-center text-foreground-muted text-sm">
              <FolderGit2 className="h-10 w-10 mx-auto text-foreground-muted/60 mb-3" />
              <span>No portfolio projects found. Click &apos;Add New Project&apos; to showcase your work.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-foreground-muted text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Project Title</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Location</th>
                    <th className="pb-3 font-semibold">Year</th>
                    <th className="pb-3 font-semibold">Contract</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {projects.map((proj) => (
                    <tr key={proj.slug} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-foreground">{proj.title}</div>
                        <div className="text-xs text-foreground-muted mt-0.5 font-mono">/projects/{proj.slug}</div>
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full bg-surface-muted text-foreground text-xs font-semibold capitalize border border-border">
                          {proj.category}
                        </span>
                      </td>
                      <td className="py-4 text-foreground-muted text-xs">{proj.location}</td>
                      <td className="py-4 text-foreground-muted text-xs">{proj.year}</td>
                      <td className="py-4 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">{proj.budget || 'N/A'}</td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-2 rounded-lg bg-surface-muted text-foreground hover:bg-surface border border-border transition cursor-pointer shadow-xs"
                          title="Edit Project"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                          title="Delete Project"
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
            <div className="w-full max-w-3xl bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  {editingProject ? 'Edit Project' : 'Create New Portfolio Case Study'}
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
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Project Title *</label>
                    <input
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Skyline Office Tower"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">URL Slug *</label>
                    <input
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="skyline-office-tower"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface font-mono text-xs transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Location *</label>
                    <input
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Manhattan, NY"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Year Completed *</label>
                    <input
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2024"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Floor Area / Size</label>
                    <input
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="450,000 sqft"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Contract Budget</label>
                    <input
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="$8.2M"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Duration</label>
                    <input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="18 Months"
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Cover Image URL *</label>
                  <input
                    required
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface font-mono text-xs transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Project Narrative & Scope *</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Comprehensive description of the structural project..."
                    className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface resize-none transition"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Engineering Challenge</label>
                    <textarea
                      rows={2}
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      placeholder="Urban congestion, environmental constraints..."
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface resize-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Executed Solution</label>
                    <textarea
                      rows={2}
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      placeholder="Prefabricated steel framing, phased night shifts..."
                      className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface resize-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                    Tags & Specialties (Comma-separated)
                  </label>
                  <input
                    value={tagsStr}
                    onChange={(e) => setTagsStr(e.target.value)}
                    placeholder="Commercial, LEED, High-Rise, Steel"
                    className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isProjFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  <label htmlFor="isProjFeatured" className="text-xs text-foreground font-semibold cursor-pointer">
                    Feature prominently on Homepage portfolio carousel
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
                    <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
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
