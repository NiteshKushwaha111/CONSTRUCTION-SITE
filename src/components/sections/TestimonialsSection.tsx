'use client'

import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/ui/section-header'
import { TestimonialCard } from '@/components/ui/testimonial-card'
import { DEFAULT_TESTIMONIALS } from '@/config/data'

export default function TestimonialsSection() {
  const testimonials = DEFAULT_TESTIMONIALS
  const featuredTestimonial = testimonials[0]
  const supportingTestimonials = testimonials.slice(1, 4)

  return (
    <section className="py-[clamp(3.5rem,7vw,7rem)] bg-surface text-foreground border-b border-border">
      <Container>
        {/* Section Header */}
        <SectionHeader
          eyebrow="CLIENT REVIEWS"
          title={
            <>
              Proven Results. <br className="hidden sm:inline" />
              <span className="text-primary">Trusted Partnerships.</span>
            </>
          }
          description="Hear directly from developers, property investors, and homeowners whose vision was delivered on schedule with uncompromised engineering quality."
        />

        {/* Featured Testimonial Spotlight */}
        {featuredTestimonial && (
          <div className="mb-8">
            <TestimonialCard
              quote={featuredTestimonial.review}
              clientName={featuredTestimonial.clientName}
              role={featuredTestimonial.clientRole}
              company={featuredTestimonial.company}
              rating={featuredTestimonial.rating || 5}
              projectTitle={featuredTestimonial.projectTitle}
              featured={true}
            />
          </div>
        )}

        {/* Supporting Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportingTestimonials.map((item) => (
            <TestimonialCard
              key={item._id}
              quote={item.review}
              clientName={item.clientName}
              role={item.clientRole}
              company={item.company}
              rating={item.rating || 5}
              projectTitle={item.projectTitle}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}