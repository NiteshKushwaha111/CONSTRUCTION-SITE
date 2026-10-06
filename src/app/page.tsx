import HeroSection from '@/components/sections/HeroSection'
import AboutPreviewSection from '@/components/sections/AboutPreviewSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectEstimator from '@/components/sections/ProjectEstimator'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import { getSettings } from '@/lib/services/settings.service'

export default async function HomePage() {
  const settings = await getSettings()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Architectural Hero - 100% visible at top with embedded metrics */}
      <HeroSection />

      {/* Editorial About & Why Choose Us Principles */}
      <AboutPreviewSection />

      {/* Comprehensive Civil & Building Services */}
      <ServicesSection />

      {/* Interactive Construction Cost & GFA Estimator */}
      <ProjectEstimator />

      {/* Selected Projects Portfolio with Lightbox */}
      <ProjectsSection />

      {/* 5-Stage Project Methodology Lifecycle */}
      <ProcessSection />

      {/* Verified Client Testimonials & Trust */}
      <TestimonialsSection />

      {/* Direct Engineering Intake & Free Estimate Form */}
      <CTASection
        phone={settings.contact?.phone}
        email={settings.contact?.email}
      />
    </div>
  )
}