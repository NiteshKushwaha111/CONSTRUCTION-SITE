import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-surface-muted text-foreground-muted border border-border',
        primary: 'bg-primary/10 text-primary border border-primary/25',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent/15 text-accent-foreground border border-accent/30',
        completed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
        ongoing: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20',
        upcoming: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20',
        featured: 'bg-primary text-primary-foreground shadow-sm',
        outline: 'border border-border text-foreground-muted bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-xs sm:text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full shrink-0',
            variant === 'completed'
              ? 'bg-emerald-500'
              : variant === 'ongoing'
              ? 'bg-amber-500'
              : variant === 'upcoming'
              ? 'bg-blue-500'
              : 'bg-primary'
          )}
        />
      )}
      <span>{children}</span>
    </span>
  )
}
