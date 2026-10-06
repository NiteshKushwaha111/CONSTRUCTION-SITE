'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Phone,
  Palette,
  Globe,
  ArrowRight,
} from 'lucide-react'
import type { ISiteSettings } from '@/types'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<ISiteSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data.success) {
          setSettings(data.settings)
        }
      } catch (err) {
        console.error('Failed to load settings:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setIsSaving(true)
    setSuccessMsg(null)
    setErrorMsg(null)

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update company settings')
      }

      setSuccessMsg('Company branding and settings saved successfully!')
      setTimeout(() => setSuccessMsg(null), 4000)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message)
      } else {
        setErrorMsg('Error saving settings')
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading || !settings) {
    return (
      <AdminShell>
        <div className="py-24 text-center text-foreground-muted flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-sm">Loading company branding parameters...</span>
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Company Branding & Settings</h1>
            <p className="text-sm text-foreground-muted mt-0.5">
              Customize company identity, contact numbers, address, and color tokens without touching source code.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-primary-hover shadow-xs transition cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save Changes</span>
          </button>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Section 1: Company Profile */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Business Identity</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Company Legal Name *</label>
              <input
                required
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Tagline / Slogan</label>
              <input
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Company Narrative / Description *</label>
            <textarea
              rows={3}
              required
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface resize-none transition"
            />
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Direct Contacts & Physical Office</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Primary Telephone *</label>
              <input
                required
                value={settings.contact?.phone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, phone: e.target.value },
                  })
                }
                className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Official Email *</label>
              <input
                type="email"
                required
                value={settings.contact?.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, email: e.target.value },
                  })
                }
                className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Emergency 24/7 Line</label>
              <input
                value={settings.contact?.emergencyPhone || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, emergencyPhone: e.target.value },
                  })
                }
                className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Street Address</label>
              <input
                value={settings.contact?.address?.street}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: {
                      ...settings.contact,
                      address: { ...settings.contact.address, street: e.target.value },
                    },
                  })
                }
                className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">City</label>
              <input
                value={settings.contact?.address?.city}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: {
                      ...settings.contact,
                      address: { ...settings.contact.address, city: e.target.value },
                    },
                  })
                }
                className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">State & ZIP</label>
              <input
                value={`${settings.contact?.address?.state || ''} ${settings.contact?.address?.zip || ''}`}
                onChange={(e) => {
                  const parts = e.target.value.split(' ')
                  setSettings({
                    ...settings,
                    contact: {
                      ...settings.contact,
                      address: {
                        ...settings.contact.address,
                        state: parts[0] || '',
                        zip: parts.slice(1).join(' ') || '',
                      },
                    },
                  })
                }}
                className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Color Palette & Appearance */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Palette className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Website Theme Colors</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Primary Brand Color (Hex)</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.theme?.primaryColor || '#C46A2B'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value },
                    })
                  }
                  className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                />
                <input
                  value={settings.theme?.primaryColor || '#C46A2B'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value },
                    })
                  }
                  className="flex-1 p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm font-mono outline-none focus:border-primary focus:bg-surface transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Secondary Accent Color (Hex)</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.theme?.secondaryColor || '#171A1D'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, secondaryColor: e.target.value },
                    })
                  }
                  className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                />
                <input
                  value={settings.theme?.secondaryColor || '#171A1D'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, secondaryColor: e.target.value },
                    })
                  }
                  className="flex-1 p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm font-mono outline-none focus:border-primary focus:bg-surface transition"
                />
              </div>
            </div>
          </div>

          {/* Quick Presets & Link to Full Theme Management */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                1-Click Architectural Presets
              </label>
              <Link
                href="/admin/settings/theme"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>Open Advanced Theme Customizer & Contrast Auditor</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { id: 'obsidianCopper', name: 'Obsidian Copper', primary: '#C46A2B', secondary: '#171A1D', accent: '#E09A5B' },
                { id: 'deepNavy', name: 'Deep Navy', primary: '#17324D', secondary: '#0B1623', accent: '#3E7FA3' },
                { id: 'charcoalBrass', name: 'Charcoal Brass', primary: '#B68A3A', secondary: '#202326', accent: '#D2AA5A' },
                { id: 'graphiteTerracotta', name: 'Graphite Terracotta', primary: '#B9573A', secondary: '#242628', accent: '#D98262' },
                { id: 'forestSlate', name: 'Forest Slate', primary: '#315C4A', secondary: '#1F2925', accent: '#71947F' },
                { id: 'slateOrange', name: 'Slate Orange', primary: '#C65D28', secondary: '#29313A', accent: '#E28A52' },
              ].map((pst) => (
                <button
                  key={pst.id}
                  type="button"
                  onClick={() => {
                    setSettings({
                      ...settings,
                      theme: {
                        presetId: pst.id,
                        primaryColor: pst.primary,
                        secondaryColor: pst.secondary,
                      },
                    })
                    if (typeof document !== 'undefined') {
                      document.documentElement.style.setProperty('--color-primary', pst.primary)
                      document.documentElement.style.setProperty('--color-secondary', pst.secondary)
                      document.documentElement.style.setProperty('--color-accent', pst.accent)
                      document.documentElement.style.setProperty('--primary', pst.primary)
                      document.documentElement.style.setProperty('--secondary', pst.secondary)
                      localStorage.setItem('site_theme_preset', pst.id)
                    }
                  }}
                  className="p-3 rounded-xl border border-border bg-surface-muted hover:bg-surface hover:border-primary/50 text-left transition-all cursor-pointer group shadow-xs"
                >
                  <div className="flex -space-x-1 mb-2">
                    <span className="h-4 w-4 rounded-full ring-1 ring-border" style={{ backgroundColor: pst.primary }} />
                    <span className="h-4 w-4 rounded-full ring-1 ring-border" style={{ backgroundColor: pst.secondary }} />
                    <span className="h-3.5 w-3.5 rounded-full ring-1 ring-border" style={{ backgroundColor: pst.accent }} />
                  </div>
                  <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {pst.name}
                  </div>
                  <div className="text-xs text-foreground-muted font-mono mt-0.5 truncate">{pst.primary}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: SEO Metadata */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Default Search Engine Metadata (SEO)</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Meta Title Tag</label>
            <input
              value={settings.seo?.metaTitle || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, metaTitle: e.target.value },
                })
              }
              className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Meta Description</label>
            <textarea
              rows={2}
              value={settings.seo?.metaDescription || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, metaDescription: e.target.value },
                })
              }
              className="w-full p-3 rounded-lg bg-surface-muted border border-border text-foreground text-sm outline-none focus:border-primary focus:bg-surface resize-none transition"
            />
          </div>
        </div>
      </form>
    </AdminShell>
  )
}
