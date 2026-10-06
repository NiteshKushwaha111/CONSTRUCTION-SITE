import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center' | 'right'
  action?: React.ReactNode
  variant?: 'light' | 'dark'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  variant = 'light',
  className,
  ...props
}: SectionHeaderProps) {
  const isCentered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col mb-[clamp(2.5rem,4.5vw,4.5rem)]',
        isCentered
          ? 'items-center text-center max-w-3xl mx-auto'
          : 'lg:flex-row lg:items-end lg:justify-between gap-6',
        className
      )}
      {...props}
    >
      <div className={cn('space-y-3', !isCentered && 'max-w-2xl')}>
        {eyebrow && (
          <div
            className={cn(
              'inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider',
              variant === 'dark'
                ? 'bg-white/10 text-accent border border-white/15'
                : 'bg-primary/10 text-primary border border-primary/20'
            )}
          >
            <span>{eyebrow}</span>
          </div>
        )}

        <h2
          className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight',
            variant === 'dark' ? 'text-secondary-foreground' : 'text-foreground'
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              'text-base font-normal leading-relaxed max-w-prose',
              variant === 'dark'
                ? 'text-secondary-foreground/75'
                : 'text-foreground-muted',
              isCentered && 'mx-auto'
            )}
          >
            {description}
          </p>
        )}
      </div>

      {!isCentered && action && (
        <div className="shrink-0 pt-2 lg:pt-0">{action}</div>
      )}
    </div>
  )
}
