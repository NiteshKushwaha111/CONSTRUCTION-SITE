'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Compass,
  FileSpreadsheet,
  Layers,
  HardHat,
  KeyRound,
  CheckCircle2,
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/ui/section-header'
import { Button } from '@/components/ui/button'

const PROCESS_STEPS = [
  {
    step: '01',
    phase: 'STAGE 01',
    icon: Compass,
    title: 'Consultation & Feasibility',
    description:
      'Site surveying, zoning validation, preliminary cost feasibility, and client requirement scoping.',
    deliverable: 'Feasibility Audit & Scope',
    duration: 'Weeks 1–2',
  },
  {
    step: '02',
    phase: 'STAGE 02',
    icon: FileSpreadsheet,
    title: 'Pre-Construction Planning',
    description:
      'Fixed-price estimation, trade sub-contractor tendering, risk mitigation, and procurement scheduling.',
    deliverable: 'Fixed-Budget Contract',
    duration: 'Weeks 3–6',
  },
  {
    step: '03',
    phase: 'STAGE 03',
    icon: Layers,
    title: 'Architectural & BIM Design',
    description:
      '3D clash detection, structural engineering sign-offs, and expedited municipal permit approvals.',
    deliverable: 'Stamped Permit Drawings',
    duration: 'Weeks 7–12',
  },
  {
    step: '04',
    phase: 'STAGE 04',
    icon: HardHat,
    title: 'Precision Construction',
    description:
      'Site mobilization, foundation framing, MEP rough-ins, envelope assembly, and daily OSHA audits.',
    deliverable: 'QA Structural Shell',
    duration: 'Month 4–Handover',
  },
  {
    step: '05',
    phase: 'STAGE 05',
    icon: KeyRound,
    title: 'Commissioning & Handover',
    description:
      'HVAC balancing, final punch-list clearance, certificate of occupancy, and 10-year warranty package.',
    deliverable: 'Turnkey Certificate',
    duration: 'Final Phase',
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-[clamp(3.5rem,7vw,7rem)] bg-surface-muted text-foreground border-b border-border">
      <Container>
        {/* Section Header */}
        <SectionHeader
          eyebrow="OUR METHODOLOGY"
          title={
            <>
              How We Deliver Excellence. <br className="hidden sm:inline" />
              <span className="text-primary">Step-by-Step Transparency.</span>
            </>
          }
          description="A rigorous 5-stage project delivery lifecycle designed to eliminate budget overruns, streamline approvals, and guarantee structural integrity."
          action={
            <Button asChild variant="outline" size="default">
              <Link href="/contact" className="flex items-center gap-1.5">
                <span>Start Stage 01</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 mt-8">
          {PROCESS_STEPS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="group relative bg-surface border border-border rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                {/* Top Subtle Accent Bar on Hover */}
                <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-transparent group-hover:bg-primary transition-colors" />

                <div>
                  {/* Card Header: Icon + Stage Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-surface-muted border border-border flex items-center justify-center text-foreground-muted group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                      {item.step}
                    </span>
                  </div>

                  {/* Stage Label */}
                  <span className="block text-xs font-mono uppercase tracking-wider text-foreground-muted/70 mb-1">
                    {item.phase} • {item.duration}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-semibold leading-snug text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-normal text-foreground-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Structured Bottom Deliverable Pill */}
                <div className="mt-5 pt-3.5 border-t border-border/60">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-foreground-muted/80">Output:</span>
                    <span className="text-foreground font-semibold truncate">
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
