import * as React from 'react'
import { cn } from '@/lib/utils'

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-surface-muted border border-border/40',
        className
      )}
      {...props}
    />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden flex flex-col">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="pt-4 border-t border-border flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="pt-4 border-t border-border/50">
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  )
}
