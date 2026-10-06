'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import {
  Palette,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Sliders,
  ShieldCheck,
  Eye,
  Loader2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import { THEME_PRESETS, DEFAULT_THEME_PRESET_ID } from '@/config/theme'
import type { ThemeColors, ThemePresetId, ThemePreset } from '@/types/theme'
import { useThemePreset } from '@/components/providers/ThemePresetProvider'
import { evaluateThemeContrast } from '@/lib/color-contrast'

export default function AdminThemeSettingsPage() {
  const { presetId, colors, setPresetId, setCustomColors, resetToPreset } = useThemePreset()

  const [activePresetId, setActivePresetId] = useState<ThemePresetId | 'custom'>(presetId)
  const [workingColors, setWorkingColors] = useState<ThemeColors>(colors)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    setActivePresetId(presetId)
    setWorkingColors(colors)
  }, [presetId, colors])

  const contrastEvaluation = evaluateThemeContrast(workingColors)

  const handleSelectPreset = (id: ThemePresetId) => {
    setActivePresetId(id)
    const preset = THEME_PRESETS[id]
    const updated = { ...preset.colors }
    setWorkingColors(updated)
    setCustomColors(updated)
  }

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    const updated: ThemeColors = {
      ...workingColors,
      [key]: value,
    }
    setWorkingColors(updated)
    setActivePresetId('custom')
    setCustomColors(updated)
  }

  const handleReset = () => {
    const targetId = activePresetId !== 'custom' ? activePresetId : DEFAULT_THEME_PRESET_ID
    const preset = THEME_PRESETS[targetId]
    setActivePresetId(targetId)
    setWorkingColors({ ...preset.colors })
    resetToPreset(targetId)
  }

  const handleSaveAndPublish = async () => {
    setIsSaving(true)
    setSaveSuccess(null)
    setSaveError(null)

    try {
      // Fetch current settings to preserve other metadata
      const currentRes = await fetch('/api/settings')
      const currentData = await currentRes.json()
      const existingSettings = currentData.settings || {}

      const updatedSettings = {
        ...existingSettings,
        theme: {
          presetId: activePresetId,
          primaryColor: workingColors.primary,
          secondaryColor: workingColors.secondary,
          colors: workingColors,
        },
      }

      const saveRes = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings),
      })

      if (!saveRes.ok) {
        throw new Error('Failed to persist theme settings to server')
      }

      setSaveSuccess('Theme configuration published across the entire website!')
      setTimeout(() => setSaveSuccess(null), 4000)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSaveError(err.message)
      } else {
        setSaveError('Could not save theme settings')
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminShell>
      <div className="space-y-8 max-w-6xl pb-20">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-2">
              <Palette className="h-3.5 w-3.5" />
              <span>Design System Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Brand Theme & Semantic Color System
            </h1>
            <p className="text-sm text-foreground-muted mt-1 max-w-2xl leading-relaxed">
              Select one of the 6 architectural presets, customize brand tokens, and audit real-time WCAG accessibility compliance without editing code.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface-muted hover:bg-surface text-foreground text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleSaveAndPublish}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-primary-hover transition cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Publish Theme</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {saveSuccess && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {saveError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {/* Section 1: 6 Theme Presets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span>Architectural Theme Presets</span>
                <span className="text-xs font-normal text-foreground-muted">(Choose to instantly apply)</span>
              </h2>
            </div>
            <span className="text-xs text-foreground-muted font-mono">
              Active: {activePresetId === 'custom' ? 'Customized' : THEME_PRESETS[activePresetId]?.name}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(THEME_PRESETS).map(([key, preset]) => {
              const isSelected = activePresetId === key
              const id = key as ThemePresetId

              return (
                <div
                  key={key}
                  onClick={() => handleSelectPreset(id)}
                  className={`p-5 rounded-xl border text-left transition-all cursor-pointer group relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary bg-surface shadow-md ring-2 ring-primary/40'
                      : 'border-border bg-surface hover:border-primary/50 hover:bg-surface-muted/50'
                  }`}
                >
                  <div>
                    {/* Header: Name and Style */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                          {preset.name}
                        </span>
                        {key === 'obsidianCopper' && (
                          <span className="text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <span className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-foreground-muted font-medium line-clamp-1 mb-4">
                      {preset.style}
                    </p>

                    {/* 4 Swatch Chips: Primary, Secondary, Accent, Background */}
                    <div className="grid grid-cols-4 gap-2 p-2.5 rounded-xl bg-surface-muted border border-border mb-4">
                      <div className="text-center">
                        <div
                          className="h-8 rounded-lg shadow-xs border border-border mx-auto mb-1"
                          style={{ backgroundColor: preset.colors.primary }}
                        />
                        <span className="text-xs text-foreground-muted font-mono block">Primary</span>
                      </div>

                      <div className="text-center">
                        <div
                          className="h-8 rounded-lg shadow-xs border border-border mx-auto mb-1"
                          style={{ backgroundColor: preset.colors.secondary }}
                        />
                        <span className="text-xs text-foreground-muted font-mono block">Secondary</span>
                      </div>

                      <div className="text-center">
                        <div
                          className="h-8 rounded-lg shadow-xs border border-border mx-auto mb-1"
                          style={{ backgroundColor: preset.colors.accent }}
                        />
                        <span className="text-xs text-foreground-muted font-mono block">Accent</span>
                      </div>

                      <div className="text-center">
                        <div
                          className="h-8 rounded-lg shadow-xs border border-border mx-auto mb-1"
                          style={{ backgroundColor: preset.colors.background }}
                        />
                        <span className="text-xs text-foreground-muted font-mono block">Backgr.</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {preset.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section 2: Live Interactive Preview */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2 text-foreground font-bold tracking-tight">
              <Eye className="h-5 w-5 text-primary" />
              <span>Live Theme Component Preview</span>
            </div>
            <span className="text-xs text-foreground-muted font-mono">Real-time Reactive Simulation</span>
          </div>

          {/* Simulation Container utilizing active working colors */}
          <div
            className="rounded-2xl p-6 sm:p-8 border shadow-inner space-y-6 transition-all"
            style={{
              backgroundColor: workingColors.background,
              color: workingColors.foreground,
              borderColor: workingColors.border,
            }}
          >
            {/* Simulation Header */}
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: workingColors.border }}>
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center font-black text-sm shadow-sm"
                  style={{
                    backgroundColor: workingColors.primary,
                    color: workingColors.primaryForeground,
                  }}
                >
                  SK
                </div>
                <div>
                  <div className="font-bold text-sm tracking-tight" style={{ color: workingColors.foreground }}>
                    SKYBOUND CONSTRUCTION
                  </div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: workingColors.foregroundMuted }}>
                    Building Architecture & General Contracting
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: workingColors.accent,
                    color: workingColors.accentForeground,
                  }}
                >
                  Featured Badge
                </span>
              </div>
            </div>

            {/* Simulation Card and Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Surface Card */}
              <div
                className="p-6 rounded-2xl border shadow-sm space-y-4"
                style={{
                  backgroundColor: workingColors.surface,
                  borderColor: workingColors.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base" style={{ color: workingColors.foreground }}>
                    Modern Commercial Development
                  </h3>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${workingColors.primary}20`,
                      color: workingColors.primary,
                    }}
                  >
                    BIM Level 3
                  </span>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: workingColors.foregroundMuted }}>
                  Multi-story seismic reinforced structure delivered 3 weeks ahead of milestone schedule with zero lost-time incidents.
                </p>

                {/* Form Simulation */}
                <div>
                  <label className="block text-[11px] font-semibold mb-1" style={{ color: workingColors.foreground }}>
                    Sample Input Field
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="user@construction-client.com"
                    className="w-full px-3 py-2 rounded-xl text-xs border outline-none font-mono"
                    style={{
                      backgroundColor: workingColors.surfaceMuted,
                      borderColor: workingColors.border,
                      color: workingColors.foreground,
                    }}
                  />
                </div>

                {/* Buttons Showcase */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl text-xs font-bold shadow-md transition"
                    style={{
                      backgroundColor: workingColors.primary,
                      color: workingColors.primaryForeground,
                    }}
                  >
                    Primary CTA
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl text-xs font-semibold border transition"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: workingColors.primary,
                      color: workingColors.primary,
                    }}
                  >
                    Outline Variant
                  </button>
                </div>
              </div>

              {/* Dark Block / Secondary Section */}
              <div
                className="p-6 rounded-2xl border shadow-md space-y-4 flex flex-col justify-between"
                style={{
                  backgroundColor: workingColors.secondary,
                  borderColor: workingColors.borderStrong,
                  color: workingColors.secondaryForeground,
                }}
              >
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-3"
                    style={{
                      backgroundColor: `${workingColors.primary}30`,
                      color: workingColors.primary,
                    }}
                  >
                    Secondary / Dark Section
                  </span>

                  <h3 className="font-bold text-base" style={{ color: workingColors.secondaryForeground }}>
                    Guaranteed Turnkey Milestone Contracts
                  </h3>

                  <p className="text-xs leading-relaxed mt-2 opacity-80">
                    This block simulates the CTA section, footer, and dark feature banners across the public website.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl text-xs font-bold transition shadow"
                    style={{
                      backgroundColor: workingColors.secondaryHover,
                      color: workingColors.secondaryForeground,
                      border: `1px solid ${workingColors.borderStrong}`,
                    }}
                  >
                    Secondary Action
                  </button>

                  <span className="text-xs font-semibold underline cursor-pointer" style={{ color: workingColors.accent }}>
                    Learn More &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: WCAG Accessibility & Contrast Auditor */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span>WCAG 2.1 Color Contrast Audit</span>
              </h2>
              <p className="text-xs text-foreground-muted mt-0.5">
                Evaluates readability of text and buttons according to international web accessibility standards.
              </p>
            </div>

            {contrastEvaluation.hasFailures ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>{contrastEvaluation.failureCount} Contrast Warning(s)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>All Color Pairs Pass WCAG Standards</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contrastEvaluation.results.map((check) => (
              <div
                key={check.id}
                className={`p-4 rounded-xl border transition-all ${
                  check.isPass
                    ? 'border-border bg-surface-muted/60'
                    : 'border-amber-500/40 bg-amber-500/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground truncate">{check.name}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${
                      check.level === 'AAA'
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : check.level === 'AA'
                        ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                        : check.level === 'AA_LARGE'
                        ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                        : 'bg-red-500/20 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {check.ratio}:1 &bull; {check.level}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-border"
                    style={{ backgroundColor: check.fgColor }}
                  />
                  <span className="text-xs text-foreground-muted">{check.fgName}</span>
                  <span className="text-xs text-foreground-muted/60">on</span>
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-border"
                    style={{ backgroundColor: check.bgColor }}
                  />
                  <span className="text-xs text-foreground-muted">{check.bgName}</span>
                </div>

                {check.warning && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 leading-tight mt-2 font-medium">
                    {check.warning}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Basic Colors Editor */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Sliders className="h-5 w-5 text-primary" />
                <span>Basic Theme Colors</span>
              </h2>
              <p className="text-xs text-foreground-muted mt-0.5">
                Core primary brand elements, background foundations, and surface containers.
              </p>
            </div>
            {activePresetId === 'custom' && (
              <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full font-semibold border border-amber-500/20">
                Custom Palette Active
              </span>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary */}
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">
                Primary Brand Color *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={workingColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                />
                <input
                  value={workingColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                />
              </div>
            </div>

            {/* Secondary */}
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">
                Secondary (Dark Sections & Footers) *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={workingColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                />
                <input
                  value={workingColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                />
              </div>
            </div>

            {/* Accent */}
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">
                Accent Highlight *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={workingColors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                />
                <input
                  value={workingColors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                />
              </div>
            </div>

            {/* Background */}
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">
                Main Page Background *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={workingColors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                />
                <input
                  value={workingColors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                />
              </div>
            </div>

            {/* Surface */}
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">
                Card / Surface Container *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={workingColors.surface}
                  onChange={(e) => handleColorChange('surface', e.target.value)}
                  className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                />
                <input
                  value={workingColors.surface}
                  onChange={(e) => handleColorChange('surface', e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                />
              </div>
            </div>

            {/* Foreground */}
            <div>
              <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">
                Primary Text Foreground *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={workingColors.foreground}
                  onChange={(e) => handleColorChange('foreground', e.target.value)}
                  className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                />
                <input
                  value={workingColors.foreground}
                  onChange={(e) => handleColorChange('foreground', e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Advanced Colors (Collapsible) */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <span>Advanced Semantic Color Tokens</span>
              </h2>
              <p className="text-xs text-foreground-muted mt-0.5">
                Fine-tune hover states, button foregrounds, borders, overlays, and system notifications.
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-surface-muted border border-border flex items-center justify-center text-foreground-muted">
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>

          {showAdvanced && (
            <div className="pt-4 border-t border-border grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
              {/* Primary Hover */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Primary Hover</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.primaryHover}
                    onChange={(e) => handleColorChange('primaryHover', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.primaryHover}
                    onChange={(e) => handleColorChange('primaryHover', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>

              {/* Primary Foreground */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Primary Button Text</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.primaryForeground}
                    onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.primaryForeground}
                    onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>

              {/* Secondary Hover */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Secondary Hover</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.secondaryHover}
                    onChange={(e) => handleColorChange('secondaryHover', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.secondaryHover}
                    onChange={(e) => handleColorChange('secondaryHover', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>

              {/* Surface Muted */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Surface Muted (Feature Sections)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.surfaceMuted}
                    onChange={(e) => handleColorChange('surfaceMuted', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.surfaceMuted}
                    onChange={(e) => handleColorChange('surfaceMuted', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>

              {/* Foreground Muted */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Muted Text / Descriptions</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.foregroundMuted}
                    onChange={(e) => handleColorChange('foregroundMuted', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.foregroundMuted}
                    onChange={(e) => handleColorChange('foregroundMuted', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>

              {/* Border */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Border (Cards & Inputs)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.border}
                    onChange={(e) => handleColorChange('border', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.border}
                    onChange={(e) => handleColorChange('border', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>

              {/* Border Strong */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Border Strong (Dividers)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.borderStrong}
                    onChange={(e) => handleColorChange('borderStrong', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.borderStrong}
                    onChange={(e) => handleColorChange('borderStrong', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>

              {/* Success */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Success State</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.success}
                    onChange={(e) => handleColorChange('success', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.success}
                    onChange={(e) => handleColorChange('success', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>

              {/* Error */}
              <div>
                <label className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1.5">Error State</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={workingColors.error}
                    onChange={(e) => handleColorChange('error', e.target.value)}
                    className="h-10 w-12 rounded-lg cursor-pointer bg-transparent border border-border"
                  />
                  <input
                    value={workingColors.error}
                    onChange={(e) => handleColorChange('error', e.target.value)}
                    className="flex-1 p-2.5 rounded-lg bg-surface-muted border border-border text-foreground text-xs font-mono outline-none focus:border-primary focus:bg-surface transition"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
