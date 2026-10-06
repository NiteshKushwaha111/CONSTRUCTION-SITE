'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/ui/section-header'
import { ProjectCard } from '@/components/ui/project-card'
import { Tabs } from '@/components/ui/tabs'
import { GalleryDialog, type GalleryItem } from '@/components/ui/gallery-dialog'
import { Button } from '@/components/ui/button'
import { DEFAULT_PROJECTS } from '@/config/data'

const CATEGORY_TABS = [
  { id: 'All', label: 'All Projects' },
  { id: 'Commercial', label: 'Commercial' },
  { id: 'Residential', label: 'Residential' },
  { id: 'Institutional', label: 'Institutional' },
  { id: 'Infrastructure', label: 'Infrastructure' },
]

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredProjects =
    activeCategory === 'All'
      ? DEFAULT_PROJECTS
      : DEFAULT_PROJECTS.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        )

  const galleryItems: GalleryItem[] = filteredProjects.map((p) => ({
    url: p.coverImage,
    title: p.title,
    caption: `${p.category} • ${p.location}`,
  }))

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section className="py-[clamp(3.5rem,7vw,7rem)] bg-surface text-foreground border-b border-border">
      <Container>
        {/* Section Header */}
        <SectionHeader
          eyebrow="SELECTED PORTFOLIO"
          title={
            <>
              Landmark Projects Delivered <br className="hidden sm:inline" />
              <span className="text-primary">With Architectural Precision.</span>
            </>
          }
          description="Explore our proven track record of iconic high-rises, LEED-certified commercial centers, and bespoke luxury estates."
          action={
            <Button asChild variant="outline" size="default">
              <Link href="/projects">
                <span>View Full Portfolio</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          }
        />

        {/* Category Tabs */}
        <div className="mb-8 flex justify-start sm:justify-center overflow-x-auto pb-2">
          <Tabs
            tabs={CATEGORY_TABS}
            activeId={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Editorial Project Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredProjects.slice(0, 6).map((project, index) => {
            // Editorial layout: first card is featured 2-col when viewing "All"
            const isFeatured = activeCategory === 'All' && index === 0

            return (
              <ProjectCard
                key={project.slug}
                title={project.title}
                category={project.category}
                location={project.location}
                year={project.year}
                image={project.coverImage}
                href={`/projects/${project.slug}`}
                status={project.status as 'completed' | 'ongoing'}
                featured={isFeatured}
                onQuickView={() => openLightbox(index)}
              />
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-foreground-muted mb-4">
            Looking for specific civil engineering certifications or tender documents?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="primary" size="default">
              <Link href="/contact">
                <span>Request Project Proposal</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link href="/projects">
                <span>Browse All 250+ Case Studies</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* High-Resolution Architectural Lightbox */}
      <GalleryDialog
        images={galleryItems}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  )
}