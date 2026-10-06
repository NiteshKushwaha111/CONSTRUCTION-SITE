'use client'

import { useState, useEffect } from 'react'
import { Palette, Check, Sparkles } from 'lucide-react'
import { useThemePreset } from '@/components/providers/ThemePresetProvider'
import type { ThemePresetId } from '@/types/theme'

export default function ThemePresetSwitcher() {
  const { presetId, setPresetId, presets } = useThemePreset()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                Select Brand Theme
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {Object.entries(presets).map(([key, theme]) => {
              const isSelected = presetId === key
              const id = key as ThemePresetId

              return (
                <button
                  key={key}
                  onClick={() => {
                    setPresetId(id)
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* 4 Color Swatch Dots: Primary, Secondary, Accent, Background */}
                    <div className="flex -space-x-1.5 items-center shrink-0">
                      <span
                        className="h-4 w-4 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.colors.primary }}
                        title={`Primary: ${theme.colors.primary}`}
                      />
                      <span
                        className="h-4 w-4 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.colors.secondary }}
                        title={`Secondary: ${theme.colors.secondary}`}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.colors.accent }}
                        title={`Accent: ${theme.colors.accent}`}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-sm border border-black/10"
                        style={{ backgroundColor: theme.colors.background }}
                        title={`Background: ${theme.colors.background}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                          {theme.name}
                        </span>
                        {key === 'obsidianCopper' && (
                          <span className="text-xs bg-primary/15 text-primary px-1.5 py-0.5 rounded font-semibold shrink-0">
                            Default
                          </span>
                        )}
                      </div>
                      <span className="block text-xs text-slate-400 truncate mt-0.5">
                        {theme.style}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0 ml-2">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary" />
              6 Architectural Presets
            </span>
            <span className="font-mono">Pure CSS Variables</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl shadow-slate-900/30 hover:scale-105 active:scale-95 transition-all cursor-pointer font-semibold text-xs border border-white/20"
      >
        <Palette className="h-4 w-4 text-primary animate-pulse" />
        <span>Theme: {presets[presetId as ThemePresetId]?.name || 'Custom'}</span>
      </button>
    </div>
  )
}
