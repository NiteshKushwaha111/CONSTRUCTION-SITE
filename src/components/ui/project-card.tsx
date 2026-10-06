import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  category: string
  location?: string
  year?: string | number
  image: string
  href: string
  status?: 'completed' | 'ongoing' | 'upcoming'
  featured?: boolean
  onQuickView?: () => void
}

export function ProjectCard({
  title,
  category,
  location,
  year,
  image,
  href,
  status = 'completed',
  featured = false,
  onQuickView,
  className,
  ...props
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-xl overflow-hidden bg-surface border border-border flex flex-col justify-between hover:border-primary/50 hover:shadow-xl transition-all duration-300',
        featured && 'lg:col-span-2 lg:grid lg:grid-cols-12 lg:items-center',
        className
      )}
      {...props}
    >
      {/* Image Area */}
      <div
        className={cn(
          'relative overflow-hidden bg-surface-muted',
          featured
            ? 'lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[18rem]'
            : 'aspect-[16/10] sm:aspect-[4/3] w-full'
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          sizes={
            featured
              ? '(max-width: 1024px) 100vw, 65vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

        {/* Top Floating Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 flex gap-2">
          <Badge variant={status === 'ongoing' ? 'ongoing' : 'completed'} dot>
            {status}
          </Badge>
          {featured && (
            <Badge variant="featured">
              Featured Build
            </Badge>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div
        className={cn(
          'p-5 sm:p-7 flex flex-col justify-between flex-1',
          featured && 'lg:col-span-5'
        )}
      >
        <div>
          {/* Category */}
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {category}
          </span>

          {/* Title */}
          <h3
            className={cn(
              'font-semibold text-foreground mt-1.5 mb-2 leading-snug tracking-tight group-hover:text-primary transition-colors',
              featured ? 'text-xl md:text-2xl' : 'text-xl'
            )}
          >
            <Link href={href} className="focus:outline-none">
              <span className="absolute inset-0 z-10" />
              {title}
            </Link>
          </h3>

          {/* Meta Details */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm font-medium text-foreground-muted mt-3">
            {location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            )}
            {year && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{year}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
            View Case Study
          </span>
          <div className="h-8 w-8 rounded-lg bg-surface-muted border border-border flex items-center justify-center text-foreground-muted group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  )
}
