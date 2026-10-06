import * as React from 'react'
import { Star, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string
  clientName: string
  role?: string
  company?: string
  rating?: number
  featured?: boolean
  projectTitle?: string
}

export function TestimonialCard({
  quote,
  clientName,
  role,
  company,
  rating = 5,
  featured = false,
  projectTitle,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface p-6 sm:p-8 flex flex-col justify-between transition-all',
        featured
          ? 'shadow-lg border-primary/40 bg-surface'
          : 'hover:border-primary/40 hover:shadow-md',
        className
      )}
      {...props}
    >
      <div>
        {/* Rating and Verified Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            <CheckCircle2 className="h-3 w-3" />
            <span>Verified Client</span>
          </div>
        </div>

        {/* Quote */}
        <blockquote
          className={cn(
            'text-foreground leading-relaxed italic mb-6',
            featured ? 'text-xl md:text-2xl font-normal' : 'text-base font-normal'
          )}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>

      {/* Client Meta */}
      <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
            {clientName.charAt(0)}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {clientName}
            </h4>
            {(role || company) && (
              <p className="text-xs text-foreground-muted">
                {role} {role && company && '•'} {company}
              </p>
            )}
          </div>
        </div>

        {projectTitle && (
          <span className="hidden sm:inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded max-w-[140px] truncate">
            {projectTitle}
          </span>
        )}
      </div>
    </div>
  )
}
