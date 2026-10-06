import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import PageHeader from '@/components/public/PageHeader'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/ui/section-header'
import { ServiceCard } from '@/components/ui/service-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAllServices } from '@/lib/services/service.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | SKYBOUND Construction',
  description: 'Full-service general contracting, residential building, commercial development, and structural renovations.',
}

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <PageHeader
        title="Comprehensive Construction Services"
        subtitle="From ground-up residential builds to large-scale commercial developments and historic renovations, we execute with precision, safety, and uncompromising quality."
        badge="Our Capabilities"
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services Grid */}
      <section className="py-[clamp(3.5rem,6vw,6rem)] border-b border-border">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                index={index + 1}
                title={service.title}
                description={service.shortDescription}
                href={`/services/${service.slug}`}
                image={service.coverImage}
                features={service.features}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 6-Step Workflow */}
      <section className="py-[clamp(3.5rem,6vw,6rem)] bg-surface-muted border-b border-border">
        <Container>
          <SectionHeader
            eyebrow="PROVEN DELIVERY"
            title="Our 6-Step Construction Methodology"
            description="Clear accountability from initial structural consultation through turnkey final inspection."
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Consultation & Site Feasibility', desc: 'Comprehensive property evaluation, zoning review, and client vision alignment.' },
              { step: '02', title: 'Architectural & BIM Modeling', desc: 'Photorealistic 3D drafting, value engineering, and structural permit preparation.' },
              { step: '03', title: 'Guaranteed Cost Estimation', desc: 'Itemized material schedules, subcontractor bidding, and firm milestone contracts.' },
              { step: '04', title: 'Active Site Construction', desc: 'Dedicated OSHA-certified superintendent oversight with real-time progress reporting.' },
              { step: '05', title: 'Multi-Point Inspection', desc: 'Rigorous municipal code checks, MEP system stress-testing, and client punch-lists.' },
              { step: '06', title: 'Handover & Warranty Support', desc: 'Turnkey key transfer, complete warranty documentation, and 24/7 post-occupancy care.' },
            ].map((step) => (
              <Card key={step.step} className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="text-primary font-mono text-2xl font-bold mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm font-normal text-foreground-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Consultation Banner */}
      <section className="py-[clamp(3.5rem,6vw,5.5rem)]">
        <Container size="narrow">
          <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 sm:p-12 text-center border border-border-strong space-y-4">
            <div className="h-12 w-12 rounded-xl bg-white/10 mx-auto flex items-center justify-center text-accent">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground tracking-tight leading-tight">
              Need a Tailored Construction Solution?
            </h2>
            <p className="text-secondary-foreground/80 max-w-prose mx-auto text-base font-normal leading-relaxed">
              Every commercial and residential project has unique structural variables. Let our engineering team draft a custom plan.
            </p>
            <div className="pt-2">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">
                  <span>Schedule Free Site Consultation</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
