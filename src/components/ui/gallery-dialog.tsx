'use client'

import * as React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export interface GalleryItem {
  url: string
  title?: string
  caption?: string
}

export interface GalleryDialogProps {
  images: GalleryItem[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function GalleryDialog({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: GalleryDialogProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)

  React.useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const total = images.length

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleNext, handlePrev, onClose])

  if (!isOpen || images.length === 0) return null

  const currentItem = images[currentIndex]

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md animate-in fade-in-0 duration-200" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in-0 duration-200 focus:outline-none">
          {/* Top Bar: Counter & Close */}
          <div className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
            <div className="px-3 py-1 rounded-md bg-white/10 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>

            <button
              onClick={onClose}
              className="h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Visual Display */}
          <div className="relative flex-1 flex items-center justify-center my-4 w-full max-w-7xl mx-auto overflow-hidden">
            {total > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 h-12 w-12 rounded-xl bg-black/50 hover:bg-black/80 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <div className="relative w-full h-full max-h-[78vh] flex items-center justify-center">
              <Image
                src={currentItem.url}
                alt={currentItem.title || `Project image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
            </div>

            {total > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 h-12 w-12 rounded-xl bg-black/50 hover:bg-black/80 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption */}
          <div className="z-10 w-full max-w-7xl mx-auto text-center pb-2">
            {currentItem.title && (
              <h4 className="text-white font-bold text-base sm:text-lg">
                {currentItem.title}
              </h4>
            )}
            {currentItem.caption && (
              <p className="text-white/70 text-xs sm:text-sm mt-0.5">
                {currentItem.caption}
              </p>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
