import Link from 'next/link'
import Image from 'next/image'
import { Award, Users, Clock, Shield, Building2, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/public/PageHeader'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/ui/section-header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getSettings } from '@/lib/services/settings.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | SKYBOUND Construction',
  description: 'Building excellence with innovation and integrity since 2003. Learn about our leadership, core values, and certifications.',
}

export default async function AboutPage() {
  const settings = await getSettings()

  const values = [
    {
      number: '01',
      title: 'Safety First Mindset',
      desc: 'Zero-incident standard with full OSHA compliance on every active construction site.',
      icon: Shield,
    },
    {
      number: '02',
      title: 'Master Craftsmanship',
      desc: 'Obsession with structural integrity, premium materials, and fine architectural detail.',
      icon: Award,
    },
    {
      number: '03',
      title: 'On-Time Milestone Delivery',
      desc: 'Rigorous schedule tracking ensuring 98% of projects complete on or before contract date.',
      icon: Clock,
    },
    {
      number: '04',
      title: 'Transparent Client Trust',
      desc: 'Itemized milestone accounting, daily superintendent updates, and no surprise change orders.',
      icon: Users,
    },
  ]

  const leadership = [
    { name: 'John Carter', role: 'Founder & Managing Director', exp: '25+ Years Experience' },
    { name: 'Sarah Miller, PE', role: 'Chief Structural Engineer', exp: '18+ Years Experience' },
    { name: 'Mike Rodriguez', role: 'Director of Field Operations', exp: '20+ Years Experience' },
    { name: 'Lisa Chen, AIA', role: 'Principal Architect & BIM Lead', exp: '15+ Years Experience' },
  ]

  const certifications = [
    { name: 'OSHA 30-Hour Construction Safety', issuer: 'U.S. Department of Labor', icon: Shield },
    { name: 'LEED Accredited General Contractor', issuer: 'U.S. Green Building Council', icon: Award },
    { name: 'Licensed Class-A General Contractor', issuer: 'State Contractor Licensing Board', icon: Building2 },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <PageHeader
        title="Building Excellence with Precision & Integrity"
        subtitle={settings.description}
        badge="About SKYBOUND"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Heritage & Editorial Story */}
      <section className="py-[clamp(3.5rem,6vw,6rem)] border-b border-border">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
                <span>OUR HERITAGE</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
                Two Decades of Transformative Structural Engineering
              </h2>

              <p className="text-foreground-muted text-base sm:text-lg font-normal leading-relaxed max-w-prose">
                Founded over 20 years ago, Skybound Construction began as a boutique civil contractor driven by craftsmanship, accountability, and engineering rigor.
              </p>

              <p className="text-foreground-muted text-base font-normal leading-relaxed max-w-prose">
                Today, we have grown into a premier general contracting firm delivering luxury private estates, multi-story commercial office towers, and complex healthcare facilities nationwide.
              </p>

              {/* Metric Callouts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-xl bg-surface border border-border">
                  <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight leading-none text-primary mb-1">
                    {settings.stats?.projectsCompleted}+
                  </div>
                  <div className="text-sm font-medium text-foreground">Completed Builds</div>
                  <div className="text-xs font-normal text-foreground-muted mt-0.5">Across 6 major sectors</div>
                </div>

                <div className="p-5 rounded-xl bg-surface border border-border">
                  <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight leading-none text-primary mb-1">
                    {settings.stats?.clientSatisfaction}%
                  </div>
                  <div className="text-sm font-medium text-foreground">Client Satisfaction</div>
                  <div className="text-xs font-normal text-foreground-muted mt-0.5">Verified review score</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-muted border border-border shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?q=80&w=1200"
                  alt="Skybound construction site engineers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Foundational Pillars */}
      <section className="py-[clamp(3.5rem,6vw,6rem)] bg-surface-muted border-b border-border">
        <Container>
          <SectionHeader
            eyebrow="FOUNDATIONAL PILLARS"
            title="Our Core Company Values"
            description="The fundamental principles that guide our site supervisors, structural engineers, and project managers every day."
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <Card key={val.title} className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-primary mb-3">
                    {val.number}
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-4">
                    <val.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-foreground mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm font-normal text-foreground-muted leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership Team */}
      <section className="py-[clamp(3.5rem,6vw,6rem)] border-b border-border">
        <Container>
          <SectionHeader
            eyebrow="EXECUTIVE LEADERSHIP"
            title="Meet the Engineers & Builders Behind Skybound"
            description="Decades of combined technical and field operations experience across civil engineering, architecture, and general contracting."
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <Card key={member.name} className="p-6 text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 border border-primary/25 mx-auto mb-4 flex items-center justify-center text-primary font-bold text-xl">
                  {member.name.slice(0, 2)}
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-primary mt-1 mb-2">
                  {member.role}
                </p>
                <p className="text-xs font-normal text-foreground-muted">{member.exp}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-[clamp(3.5rem,6vw,6rem)] bg-secondary text-secondary-foreground border-b border-border-strong">
        <Container>
          <SectionHeader
            eyebrow="INDUSTRY CREDENTIALS"
            title="Licensing, Safety & Accreditations"
            description="We hold top-tier national and state credentials in safety and sustainable building."
            align="center"
            variant="dark"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="p-6 rounded-xl bg-white/5 border border-white/10 text-center space-y-3"
              >
                <cert.icon className="h-8 w-8 text-accent mx-auto" />
                <h3 className="text-base font-semibold text-secondary-foreground">
                  {cert.name}
                </h3>
                <p className="text-xs font-normal text-secondary-foreground/75">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-[clamp(3.5rem,6vw,5.5rem)] text-center">
        <Container size="narrow" className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
            Ready to Partner with Skybound?
          </h2>
          <p className="text-foreground-muted text-base font-normal leading-relaxed max-w-xl mx-auto">
            Let’s discuss your construction requirements and build a durable, high-value solution together.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">
                <span>Request Project Proposal</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                <span>View Project Case Studies</span>
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
