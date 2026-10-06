'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

const CORE_PILLARS = [
  {
    number: '01',
    title: 'Built on Experience',
    description: 'Over two decades of general contracting across high-rise, commercial, and luxury residential projects.',
  },
  {
    number: '02',
    title: 'Quality Without Compromise',
    description: 'Master trades, premium architectural materials, and rigorous multi-stage QA/QC inspections.',
  },
  {
    number: '03',
    title: 'Transparent Communication',
    description: 'Real-time project milestone tracking, clear cost accounting, and zero surprise change orders.',
  },
  {
    number: '04',
    title: 'Delivered With Precision',
    description: 'Fixed-timeline milestones backed by 3D BIM clash detection and proactive municipal permitting.',
  },
]

export default function AboutPreviewSection() {
  return (
    <section className="py-[clamp(3.5rem,7vw,7rem)] bg-surface text-foreground border-b border-border">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Architectural Editorial Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-surface-muted border border-border shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200"
                alt="Architects and site engineers reviewing structural plans"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Bottom Quote inside Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-surface/90 backdrop-blur-md border border-border">
                <p className="text-xs font-semibold text-foreground italic">
                  &ldquo;Architecture and civil construction demand zero tolerance for error.&rdquo;
                </p>
                <span className="block text-xs font-semibold text-primary uppercase tracking-wider mt-1">
                  Skybound Engineering Principle
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Why Choose Us Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
              <span>ABOUT SKYBOUND</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Crafting Enduring Legacies Through{' '}
              <span className="text-primary">Master Craftsmanship.</span>
            </h2>

            <p className="text-foreground-muted text-base sm:text-lg font-normal leading-relaxed max-w-prose">
              Founded in 2003, Skybound has grown from a regional contractor into an industry-recognized leader in complex civil engineering, commercial developments, and bespoke architectural builds. We combine decades of hands-on building intelligence with state-of-the-art BIM planning.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              {CORE_PILLARS.map((pillar) => (
                <div key={pillar.number} className="space-y-1.5 border-l-2 border-primary/30 pl-3.5">
                  <div className="text-xs font-mono font-bold text-primary">
                    {pillar.number}
                  </div>
                  <h4 className="text-base font-semibold leading-snug text-foreground">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-normal text-foreground-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button asChild variant="primary" size="default">
                <Link href="/about">
                  <span>Learn More About Our Team</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>

              <div className="flex items-center gap-2 text-xs font-medium text-foreground-muted">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Fully Licensed, Bonded & Insured Nationally</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
