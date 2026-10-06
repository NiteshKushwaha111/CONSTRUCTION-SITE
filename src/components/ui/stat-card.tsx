import * as React from 'react'
import { cn } from '@/lib/utils'

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number
  label: string
  sublabel?: string
  suffix?: string
  variant?: 'light' | 'dark' | 'minimal'
}

export function StatCard({
  value,
  label,
  sublabel,
  suffix,
  variant = 'light',
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between py-6 px-4 sm:px-6 transition-all',
        variant === 'dark'
          ? 'text-secondary-foreground border-l border-white/10'
          : variant === 'minimal'
          ? 'text-foreground'
          : 'text-foreground border-l border-border',
        className
      )}
      {...props}
    >
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            'text-4xl md:text-5xl font-bold tracking-tight font-mono leading-none',
            variant === 'dark' ? 'text-secondary-foreground' : 'text-foreground'
          )}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-xl sm:text-2xl font-bold text-primary">
            {suffix}
          </span>
        )}
      </div>

      <div className="mt-2.5">
        <h4
          className={cn(
            'text-sm font-medium leading-normal',
            variant === 'dark' ? 'text-secondary-foreground' : 'text-foreground'
          )}
        >
          {label}
        </h4>
        {sublabel && (
          <p
            className={cn(
              'text-xs font-normal leading-normal mt-0.5 line-clamp-1',
              variant === 'dark'
                ? 'text-secondary-foreground/60'
                : 'text-foreground-muted'
            )}
          >
            {sublabel}
          </p>
        )}
      </div>
    </div>
  )
}
