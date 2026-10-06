import * as React from 'react'
import { FolderOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-dashed border-border bg-surface-muted/50 p-8 sm:p-12 text-center max-w-lg mx-auto flex flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      <div className="h-12 w-12 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground-muted mb-4 shadow-sm">
        {icon || <FolderOpen className="h-6 w-6" />}
      </div>

      <h3 className="text-lg font-bold text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-foreground-muted max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Button asChild variant="outline" size="sm">
          <Link href={actionHref}>
            <span>{actionLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Link>
        </Button>
      )}

      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
