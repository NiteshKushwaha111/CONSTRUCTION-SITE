'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/ui/section-header'
import { ServiceCard } from '@/components/ui/service-card'
import { Button } from '@/components/ui/button'
import { DEFAULT_SERVICES } from '@/config/data'
import type { IService } from '@/types'

export default function ServicesSection() {
  const services: IService[] = DEFAULT_SERVICES.slice(0, 6)

  return (
    <section className="py-[clamp(3.5rem,7vw,7rem)] bg-surface-muted text-foreground border-b border-border">
      <Container>
        {/* Editorial Section Header */}
        <SectionHeader
          eyebrow="OUR SERVICES"
          title={
            <>
              Built Around Your Vision. <br className="hidden sm:inline" />
              <span className="text-primary">Engineered to Perfection.</span>
            </>
          }
          description="From high-rise commercial structures to bespoke luxury residences, we coordinate master trades and certified civil engineers for turnkey delivery."
          action={
            <Button asChild variant="outline" size="default">
              <Link href="/services">
                <span>View All Services</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          }
        />

        {/* 3-Column Architectural Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
  )
}