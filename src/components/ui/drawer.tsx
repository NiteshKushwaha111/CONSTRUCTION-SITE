'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  children: React.ReactNode
  side?: 'left' | 'right' | 'bottom'
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
}: DrawerProps) {
  // Prevent body scrolling when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
      document.body.classList.add('drawer-open')
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      document.body.classList.remove('drawer-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      document.body.classList.remove('drawer-open')
    }
  }, [isOpen])

  // ESC key to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sidePosition = {
    right: 'inset-y-0 right-0 w-[88vw] max-w-sm border-l border-border',
    left: 'inset-y-0 left-0 w-[88vw] max-w-sm border-r border-border',
    bottom: 'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl border-t border-border',
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel - Guaranteed full viewport height */}
      <div
        className={cn(
          'fixed z-[101] h-full h-dvh bg-surface shadow-2xl flex flex-col focus:outline-none transition-transform duration-300 ease-out',
          sidePosition[side]
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0 bg-surface">
          <div className="min-w-0 pr-2">
            {typeof title === 'string' ? (
              <h2 className="text-sm font-bold text-foreground truncate">{title}</h2>
            ) : (
              title
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-lg border border-border bg-surface-muted/50 text-foreground-muted hover:text-foreground hover:bg-surface-muted hover:border-primary/50 transition-colors flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Close menu"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Drawer Content - Scrollable full body */}
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0 bg-surface">{children}</div>
      </div>
    </div>
  )
}
