'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Suppress React 19 / Next.js known false-positive warning for next-themes script injection
if (typeof window !== 'undefined') {
  const origError = console.error
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag while rendering React component')
    ) {
      return
    }
    origError.apply(console, args)
  }
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

import { applyThemeVariables } from '@/components/providers/ThemePresetProvider'

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const activeDark = document.documentElement.classList.contains('dark') || resolvedTheme === 'dark'
    setIsDark(activeDark)
  }, [resolvedTheme])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const currentlyDark = document.documentElement.classList.contains('dark')
    const nextTheme = currentlyDark ? 'light' : 'dark'

    // 1. Immediately toggle DOM class
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }

    // 2. Update local state for instant icon flip
    setIsDark(!currentlyDark)

    // 3. Persist to next-themes and localStorage
    setTheme(nextTheme)

    // 4. Update CSS variables with current active brand colors
    applyThemeVariables()
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        'inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground hover:bg-surface-muted hover:border-primary/50 transition-colors shadow-xs cursor-pointer select-none',
        className
      )}
      aria-label={mounted && isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={mounted && isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {mounted && isDark ? (
        <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-500 fill-amber-500/20 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-foreground fill-foreground/10 transition-transform hover:-rotate-12" />
      )}
    </button>
  )
}