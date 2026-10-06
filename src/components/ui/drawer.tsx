'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
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
  const sideClasses = {
    right:
      'inset-y-0 right-0 w-full max-w-sm data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
    left:
      'inset-y-0 left-0 w-full max-w-sm data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
    bottom:
      'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200" />
        <DialogPrimitive.Content
          className={cn(
            'fixed z-50 bg-surface border-border p-6 shadow-2xl flex flex-col justify-between duration-300 ease-in-out focus:outline-none',
            side === 'bottom' ? 'border-t' : side === 'left' ? 'border-r' : 'border-l',
            sideClasses[side]
          )}
        >
          <div className="flex items-center justify-between pb-4 border-b border-border">
            {title ? (
              <DialogPrimitive.Title className="text-base font-bold text-foreground">
                {title}
              </DialogPrimitive.Title>
            ) : (
              <span />
            )}
            <DialogPrimitive.Close className="rounded-lg p-2 text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors cursor-pointer">
              <X className="h-5 w-5" />
              <span className="sr-only">Close drawer</span>
            </DialogPrimitive.Close>
          </div>

          <div className="flex-1 overflow-y-auto py-4">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
