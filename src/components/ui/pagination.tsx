import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1.5', className)}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 px-3 rounded-lg border border-border bg-surface text-foreground-muted hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {getPages().map((page, index) => {
        if (typeof page === 'string') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="h-9 w-9 flex items-center justify-center text-xs text-foreground-muted"
            >
              ...
            </span>
          )
        }

        const isCurrent = page === currentPage

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'h-9 w-9 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
              isCurrent
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-surface text-foreground hover:border-primary hover:text-primary'
            )}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 px-3 rounded-lg border border-border bg-surface text-foreground-muted hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
