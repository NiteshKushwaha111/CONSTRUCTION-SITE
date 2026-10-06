import { Container } from '@/components/ui/container'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/breadcrumb'

interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  breadcrumbs?: BreadcrumbItem[]
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="relative bg-secondary text-secondary-foreground overflow-hidden py-[clamp(3rem,5vw,4.5rem)] border-b border-border-strong">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

      <Container className="relative z-10 space-y-4">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb
            items={breadcrumbs}
            className="text-secondary-foreground/60"
          />
        )}

        {/* Eyebrow Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-accent text-xs font-semibold tracking-wider uppercase">
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight max-w-4xl text-secondary-foreground leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base sm:text-lg font-normal leading-relaxed text-secondary-foreground/80 max-w-2xl">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  )
}
