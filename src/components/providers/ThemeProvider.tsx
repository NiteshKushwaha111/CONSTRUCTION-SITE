// src/components/providers/ThemeProvider.tsx
'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { createContext, useContext } from 'react'

type Theme = 'light' | 'dark'
type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'construction-theme',
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [isMounted, setIsMounted] = useState(false)

  // Get system theme preference
  const getSystemTheme = useCallback((): Theme => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return 'light'
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  // Apply theme to DOM
  const applyTheme = useCallback((theme: Theme) => {
    const root = document.documentElement
    
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    
    if (theme === 'dark') {
      root.style.colorScheme = 'dark'
    } else {
      root.style.colorScheme = 'light'
    }
  }, [])

  // Set theme with persistence
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    
    try {
      localStorage.setItem(storageKey, newTheme)
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
    
    applyTheme(newTheme)
  }, [storageKey, applyTheme])

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [theme, setTheme])

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Try to get saved theme
        const savedTheme = localStorage.getItem(storageKey) as Theme | null
        
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setThemeState(savedTheme)
          applyTheme(savedTheme)
          return
        }
        
        // Use system preference if enabled
        if (enableSystem) {
          const systemTheme = getSystemTheme()
          setThemeState(systemTheme)
          applyTheme(systemTheme)
          return
        }
        
        // Use default theme
        applyTheme(defaultTheme)
      } catch (error) {
        console.warn('Theme initialization failed, using default:', error)
        applyTheme(defaultTheme)
      }
    }

    initializeTheme()
    
    // Use setTimeout to avoid synchronous state updates in useEffect
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 0)
    
    return () => clearTimeout(timer)
  }, [defaultTheme, enableSystem, storageKey, applyTheme, getSystemTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      // Only update if user hasn't set a preference
      try {
        const savedTheme = localStorage.getItem(storageKey)
        if (!savedTheme) {
          const systemTheme = getSystemTheme()
          setThemeState(systemTheme)
          applyTheme(systemTheme)
        }
      } catch (error) {
        console.warn('Failed to update theme from system change:', error)
      }
    }
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [enableSystem, storageKey, getSystemTheme, applyTheme])

  // Create memoized context value BEFORE any conditional returns
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  )

  // Prevent flash of unstyled content
  if (!isMounted) {
    return (
      <div 
        style={{ 
          visibility: 'hidden',
          opacity: 0,
          position: 'fixed',
          width: '100%',
          height: '100%'
        }}
        aria-hidden="true"
        suppressHydrationWarning
      />
    )
  }

  return (
    <ThemeProviderContext.Provider {...props} value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// Custom hook to use theme
export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

// Hook to get current theme
export const useCurrentTheme = (): Theme => {
  const { theme } = useTheme()
  return theme
}

// Hook to toggle theme
export const useToggleTheme = (): (() => void) => {
  const { toggleTheme } = useTheme()
  return toggleTheme
}

// Theme toggle button component (optional, for easy use)
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        // Sun icon for dark mode (switch to light)
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for light mode (switch to dark)
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  )
}