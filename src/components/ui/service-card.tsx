import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number | string
  title: string
  description: string
  href: string
  image?: string
  features?: string[]
}

export function ServiceCard({
  index,
  title,
  description,
  href,
  image,
  features,
  className,
  ...props
}: ServiceCardProps) {
  const formattedIndex = typeof index === 'number' ? String(index).padStart(2, '0') : index

  return (
    <div
      className={cn(
        'group relative bg-surface border border-border rounded-xl overflow-hidden flex flex-col justify-between hover:border-primary/50 hover:shadow-lg transition-all duration-300',
        className
      )}
      {...props}
    >
      <div>
        {/* Top Architectural Image Banner */}
        {image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Architectural Index Tag + Quick Action Arrow Overlaid on Image */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold tracking-wider">
                {formattedIndex}
              </span>
              <div className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm text-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all shadow-sm">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        )}

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
            <Link href={href} className="focus:outline-none">
              <span className="absolute inset-0 z-10" />
              {title}
            </Link>
          </h3>

          <p className="text-sm font-normal text-foreground-muted leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          {/* Clean Deliverables / Specifications List */}
          {features && features.length > 0 && (
            <ul className="space-y-1.5 pt-2 mb-2 text-xs text-foreground-muted">
              {features.slice(0, 3).map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Card Footer: Explore Specifications */}
      <div className="px-5 sm:px-6 pb-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
        <span>Explore Specifications</span>
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  )
}
