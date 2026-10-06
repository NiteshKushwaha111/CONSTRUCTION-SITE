'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  THEME_PRESETS,
  DEFAULT_THEME_PRESET_ID,
  type ThemePresetKey,
} from '@/config/theme'
import type { ThemeColors, ThemePresetId, ThemePreset } from '@/types/theme'

interface ThemePresetContextType {
  presetId: ThemePresetId | 'custom'
  preset: ThemePreset
  colors: ThemeColors
  setPresetId: (id: ThemePresetId) => void
  setCustomColors: (colors: ThemeColors) => void
  resetToPreset: (id: ThemePresetId) => void
  presets: Record<ThemePresetId, ThemePreset>
}

const ThemePresetContext = createContext<ThemePresetContextType | undefined>(undefined)

export function applyThemeVariables(colors: ThemeColors) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const isDark = root.classList.contains('dark')

  // Architectural Dark tokens
  const darkBg = '#0D1013'
  const darkSurface = '#14181C'
  const darkSurfaceMuted = '#1C2229'
  const darkFg = '#F4F6F8'
  const darkFgMuted = '#9BA3AF'
  const darkBorder = '#252D37'
  const darkBorderStrong = '#323C4A'
  const darkOverlay = 'rgba(13, 16, 19, 0.75)'

  // Brand color tokens from active preset
  root.style.setProperty('--color-primary', colors.primary)
  root.style.setProperty('--color-primary-hover', colors.primaryHover)
  root.style.setProperty('--color-primary-foreground', colors.primaryForeground)

  root.style.setProperty('--color-secondary', colors.secondary)
  root.style.setProperty('--color-secondary-hover', colors.secondaryHover)
  root.style.setProperty('--color-secondary-foreground', colors.secondaryForeground)

  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-accent-foreground', colors.accentForeground)

  // Surface and layout tokens (mode-aware)
  root.style.setProperty('--color-background', isDark ? darkBg : colors.background)
  root.style.setProperty('--color-surface', isDark ? darkSurface : colors.surface)
  root.style.setProperty('--color-surface-muted', isDark ? darkSurfaceMuted : colors.surfaceMuted)

  root.style.setProperty('--color-foreground', isDark ? darkFg : colors.foreground)
  root.style.setProperty('--color-foreground-muted', isDark ? darkFgMuted : colors.foregroundMuted)

  root.style.setProperty('--color-border', isDark ? darkBorder : colors.border)
  root.style.setProperty('--color-border-strong', isDark ? darkBorderStrong : colors.borderStrong)

  root.style.setProperty('--color-success', colors.success)
  root.style.setProperty('--color-warning', colors.warning)
  root.style.setProperty('--color-error', colors.error)
  root.style.setProperty('--color-info', colors.info)

  root.style.setProperty('--color-overlay', isDark ? darkOverlay : colors.overlay)

  // Backward-compatibility & Tailwind utility shortcuts
  root.style.setProperty('--primary', colors.primary)
  root.style.setProperty('--primary-hover', colors.primaryHover)
  root.style.setProperty('--primary-foreground', colors.primaryForeground)
  root.style.setProperty('--secondary', colors.secondary)
  root.style.setProperty('--secondary-hover', colors.secondaryHover)
  root.style.setProperty('--secondary-foreground', colors.secondaryForeground)
  root.style.setProperty('--accent', colors.accent)
  root.style.setProperty('--accent-foreground', colors.accentForeground)
  root.style.setProperty('--background', isDark ? darkBg : colors.background)
  root.style.setProperty('--foreground', isDark ? darkFg : colors.foreground)
  root.style.setProperty('--surface', isDark ? darkSurface : colors.surface)
  root.style.setProperty('--surface-muted', isDark ? darkSurfaceMuted : colors.surfaceMuted)
  root.style.setProperty('--muted', isDark ? darkSurfaceMuted : colors.surfaceMuted)
  root.style.setProperty('--muted-foreground', isDark ? darkFgMuted : colors.foregroundMuted)
  root.style.setProperty('--border', isDark ? darkBorder : colors.border)
  root.style.setProperty('--border-strong', isDark ? darkBorderStrong : colors.borderStrong)
  root.style.setProperty('--ring', colors.primary)
  root.style.setProperty('--card', isDark ? darkSurface : colors.surface)
  root.style.setProperty('--card-foreground', isDark ? darkFg : colors.foreground)
}

export function ThemePresetProvider({ children }: { children: React.ReactNode }) {
  const [presetId, setPresetIdState] = useState<ThemePresetId | 'custom'>(DEFAULT_THEME_PRESET_ID)
  const [colors, setColorsState] = useState<ThemeColors>(() => ({
    ...THEME_PRESETS[DEFAULT_THEME_PRESET_ID].colors,
  }))

  useEffect(() => {
    // 1. Restore saved client preferences on mount
    let activeColors = { ...THEME_PRESETS[DEFAULT_THEME_PRESET_ID].colors }
    let activePreset: ThemePresetId | 'custom' = DEFAULT_THEME_PRESET_ID

    if (typeof window !== 'undefined') {
      const savedCustom = localStorage.getItem('site_theme_custom_colors')
      if (savedCustom) {
        try {
          const parsed = JSON.parse(savedCustom) as ThemeColors
          activeColors = parsed
          activePreset = 'custom'
        } catch {
          // ignore corrupted json
        }
      } else {
        const saved = localStorage.getItem('site_theme_preset') as ThemePresetId
        if (saved && THEME_PRESETS[saved]) {
          activePreset = saved
          activeColors = { ...THEME_PRESETS[saved].colors }
        }
      }

      setPresetIdState(activePreset)
      setColorsState(activeColors)
      applyThemeVariables(activeColors)
    }

    // 2. Watch for dark/light mode toggles on documentElement
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          applyThemeVariables(activeColors)
        }
      }
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  const setPresetId = useCallback((id: ThemePresetId) => {
    const preset = THEME_PRESETS[id] || THEME_PRESETS[DEFAULT_THEME_PRESET_ID]
    setPresetIdState(id)
    setColorsState({ ...preset.colors })
    if (typeof window !== 'undefined') {
      localStorage.setItem('site_theme_preset', id)
      localStorage.removeItem('site_theme_custom_colors')
    }
    applyThemeVariables(preset.colors)
  }, [])

  const setCustomColors = useCallback((newColors: ThemeColors) => {
    setPresetIdState('custom')
    setColorsState(newColors)
    if (typeof window !== 'undefined') {
      localStorage.setItem('site_theme_preset', 'custom')
      localStorage.setItem('site_theme_custom_colors', JSON.stringify(newColors))
    }
    applyThemeVariables(newColors)
  }, [])

  const resetToPreset = useCallback((id: ThemePresetId) => {
    setPresetId(id)
  }, [setPresetId])

  const currentPreset =
    presetId !== 'custom' && THEME_PRESETS[presetId]
      ? THEME_PRESETS[presetId]
      : {
          id: 'custom' as unknown as ThemePresetId,
          name: 'Custom Theme',
          style: 'Custom Palette',
          description: 'Client-customized semantic color tokens',
          colors,
        }

  return (
    <ThemePresetContext.Provider
      value={{
        presetId,
        preset: currentPreset,
        colors,
        setPresetId,
        setCustomColors,
        resetToPreset,
        presets: THEME_PRESETS,
      }}
    >
      {children}
    </ThemePresetContext.Provider>
  )
}

export function useThemePreset() {
  const context = useContext(ThemePresetContext)
  if (!context) {
    throw new Error('useThemePreset must be used within a ThemePresetProvider')
  }
  return context
}
