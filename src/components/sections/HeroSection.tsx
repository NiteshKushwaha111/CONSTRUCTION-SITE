'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronRight, ArrowUpRight, Building2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100svh-5rem)] min-h-[600px] max-h-[960px] flex flex-col justify-between bg-secondary text-secondary-foreground overflow-hidden">
      {/* Full-Bleed Architectural Photography Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
          alt="High-Rise Steel Construction"
          fill
          priority
          unoptimized
          className="object-cover object-center brightness-90"
          sizes="100vw"
        />
        {/* Subtle Architectural Dark Gradient Overlay (transparent toward the right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40 backdrop-contrast-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-black/30" />
      </div>

      {/* Main Hero Editorial Content - 2-Column Balanced Grid */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[clamp(1rem,3vw,3rem)] flex-1 flex flex-col justify-center py-6 sm:py-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-white/90 text-xs font-semibold tracking-wider uppercase">
              <Building2 className="w-3.5 h-3.5 text-accent" />
              <span>CONSTRUCTION & INFRASTRUCTURE</span>
            </div>

            {/* Large Architectural Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight text-balance">
              Building Spaces <br className="hidden sm:inline" />
              That <span className="text-accent">Endure.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-white/85 text-base sm:text-lg max-w-prose font-normal leading-relaxed">
              We deliver high-quality residential and commercial construction with precision, transparency, and verified engineering expertise from groundbreaking to turnkey handover.
            </p>

            {/* Action-Oriented CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/25 text-white hover:bg-white/10 hover:border-white/50"
              >
                <Link href="/projects" className="flex items-center justify-center gap-1.5">
                  <span>View Our Projects</span>
                  <ChevronRight className="h-4 w-4 text-white/60" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Featured Architectural Project Showcase */}
          <div className="lg:col-span-5 hidden lg:flex justify-end">
            <div className="w-full max-w-[420px] bg-black/45 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-2xl transition-all hover:border-accent/50 group">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase text-white/90">
                    FEATURED LANDMARK
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/70">
                  <MapPin className="w-3 h-3 text-accent" />
                  <span>Manhattan, NY</span>
                </div>
              </div>

              {/* Project Preview Image */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070"
                  alt="Skyline Office Tower"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1280px) 400px, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-end">
                  <span className="text-xs font-mono uppercase bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/15 text-white/90">
                    Commercial High-Rise
                  </span>
                  <span className="text-xs font-mono font-bold text-accent">
                    $48.2M
                  </span>
                </div>
              </div>

              {/* Project Title & Summary */}
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-accent transition-colors flex items-center justify-between">
                <span>Skyline Office Tower</span>
                <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-white/75 leading-relaxed mb-3 line-clamp-2">
                25-story sustainable commercial office tower with LEED Platinum engineering and integrated solar envelope.
              </p>

              {/* Progress & Specs Bar */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/70">
                <span>Phase: Final Commissioning</span>
                <span className="text-accent font-semibold">94% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Architectural Metric Bar at Base */}
      <div className="relative z-10 w-full border-t border-white/15 bg-black/35 backdrop-blur-sm">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(1rem,3vw,3rem)] py-3 sm:py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-white">
            <div className="border-l border-white/20 pl-3 sm:pl-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-white leading-none">
                20+
              </div>
              <div className="text-xs sm:text-sm font-medium leading-normal text-white/75 mt-1">
                Years Experience
              </div>
            </div>

            <div className="border-l border-white/20 pl-3 sm:pl-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-white leading-none">
                250+
              </div>
              <div className="text-xs sm:text-sm font-medium leading-normal text-white/75 mt-1">
                Projects Delivered
              </div>
            </div>

            <div className="border-l border-white/20 pl-3 sm:pl-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-white leading-none">
                $450M+
              </div>
              <div className="text-xs sm:text-sm font-medium leading-normal text-white/75 mt-1">
                Completed Value
              </div>
            </div>

            <div className="border-l border-white/20 pl-3 sm:pl-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-white leading-none">
                98%
              </div>
              <div className="text-xs sm:text-sm font-medium leading-normal text-white/75 mt-1">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}