'use client'

import { useState, useEffect } from 'react'
import { Palette, Check, Sparkles } from 'lucide-react'
import { useThemePreset } from '@/components/providers/ThemePresetProvider'
import type { ThemePresetId } from '@/types/theme'

export default function ThemePresetSwitcher() {
  const { presetId, setPresetId, presets } = useThemePreset()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkDrawer = () => {
      setDrawerOpen(document.body.classList.contains('drawer-open'))
    }

    checkDrawer()
    const observer = new MutationObserver(checkDrawer)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  if (!mounted || drawerOpen) return null

  return (
    <>
      {/* Backdrop overlay for outside click to close */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-[2px] transition-opacity"
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[70] pointer-events-auto">
        {/* Popover Menu */}
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-[calc(100vw-1.5rem)] max-w-xs sm:w-80 bg-surface border border-border rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl transition-all animate-in fade-in slide-in-from-bottom-2 z-[75]">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary shrink-0" />
                <span className="font-bold text-xs text-foreground uppercase tracking-wider">
                  Select Brand Theme
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-foreground-muted hover:text-foreground cursor-pointer p-1 rounded-md hover:bg-surface-muted transition-colors"
                aria-label="Close theme selector"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-80 sm:max-h-96 overflow-y-auto pr-1">
              {Object.entries(presets).map(([key, theme]) => {
                const isSelected = presetId === key
                const id = key as ThemePresetId

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setPresetId(id)
                    }}
                    className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-xs'
                        : 'border-border/80 hover:border-primary/40 bg-surface-muted/40 hover:bg-surface-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      {/* 4 Color Swatch Dots: Primary, Secondary, Accent, Background */}
                      <div className="flex -space-x-1.5 items-center shrink-0">
                        <span
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full ring-2 ring-surface shadow-xs"
                          style={{ backgroundColor: theme.colors.primary }}
                          title={`Primary: ${theme.colors.primary}`}
                        />
                        <span
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full ring-2 ring-surface shadow-xs"
                          style={{ backgroundColor: theme.colors.secondary }}
                          title={`Secondary: ${theme.colors.secondary}`}
                        />
                        <span
                          className="h-3 sm:h-3.5 sm:w-3.5 rounded-full ring-2 ring-surface shadow-xs"
                          style={{ backgroundColor: theme.colors.accent }}
                          title={`Accent: ${theme.colors.accent}`}
                        />
                        <span
                          className="h-3 sm:h-3.5 sm:w-3.5 rounded-full ring-2 ring-surface shadow-xs border border-border"
                          style={{ backgroundColor: theme.colors.background }}
                          title={`Background: ${theme.colors.background}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="block text-xs font-bold text-foreground truncate">
                            {theme.name}
                          </span>
                          {key === 'obsidianCopper' && (
                            <span className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.2 rounded font-semibold shrink-0">
                              Default
                            </span>
                          )}
                        </div>
                        <span className="block text-[11px] text-foreground-muted truncate mt-0.5">
                          {theme.style}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="h-4.5 w-4.5 sm:h-5 sm:w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 ml-2">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[11px] text-foreground-muted">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                6 Architectural Presets
              </span>
              <span className="font-mono text-[10px]">CSS Variables</span>
            </div>
          </div>
        )}

        {/* Floating Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-surface text-foreground border border-border shadow-xl hover:border-primary/50 hover:shadow-2xl active:scale-95 transition-all cursor-pointer font-semibold text-xs shrink-0 select-none"
          aria-label="Toggle theme preset selector"
        >
          <Palette className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
          <span className="text-foreground-muted font-normal text-[11px] sm:text-xs">Theme:</span>
          <span className="text-foreground font-bold text-[11px] sm:text-xs truncate max-w-[100px] sm:max-w-none">
            {presets[presetId as ThemePresetId]?.name || 'Custom'}
          </span>
        </button>
      </div>
    </>
  )
}
