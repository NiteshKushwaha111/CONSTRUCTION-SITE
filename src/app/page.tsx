// src/app/page.tsx
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
// import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <div className="f">
      {/* Hero Section - Full width */}
      <HeroSection />
      
      {/* Content Sections - Constrained width */}
      {/* <div className="theme-container"> */}
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
      {/* </div> */}
      
      {/* CTA Section - Full width */}
      {/* <CTASection /> */}
    </div>
  )
}