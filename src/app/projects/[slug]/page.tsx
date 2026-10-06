import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Building2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '@/components/public/PageHeader'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getProjectBySlug, getAllProjects } from '@/lib/services/project.service'
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project Not Found | SKYBOUND Construction' }
  }

  return {
    title: `${project.title} | SKYBOUND Construction Portfolio`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const allProjects = await getAllProjects()
  const otherProjects = allProjects.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <PageHeader
        title={project.title}
        subtitle={`${project.category} Project • Completed ${project.year}`}
        badge={project.category}
        breadcrumbs={[
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
      />

      <section className="py-[clamp(2.5rem,5vw,4.5rem)] border-b border-border">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Primary Cover Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden shadow-lg border border-border">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Project Overview */}
              <Card className="p-6 sm:p-8 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Project Overview
                </h2>
                <p className="text-foreground-muted text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </Card>

              {/* Challenge & Solution Grid */}
              {(project.challenge || project.solution) && (
                <div className="grid md:grid-cols-2 gap-6">
                  {project.challenge && (
                    <Card className="p-6 sm:p-8 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        The Challenge
                      </span>
                      <h3 className="text-lg font-bold text-foreground">
                        Engineering Hurdles
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                        {project.challenge}
                      </p>
                    </Card>
                  )}

                  {project.solution && (
                    <Card className="p-6 sm:p-8 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        The Solution
                      </span>
                      <h3 className="text-lg font-bold text-foreground">
                        Executed Strategy
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                        {project.solution}
                      </p>
                    </Card>
                  )}
                </div>
              )}

              {/* Measurable Results */}
              {project.results && project.results.length > 0 && (
                <Card className="p-6 sm:p-8 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Measurable Outcomes
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Key Project Achievements
                  </h3>
                  <div className="space-y-2.5">
                    {project.results.map((res, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">
                          {res}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Gallery Section */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    Construction Photo Gallery
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border group"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} photo ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Project Facts (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 space-y-5">
                <h4 className="text-base font-bold text-foreground pb-3 border-b border-border">
                  Project Specifications
                </h4>

                <div className="space-y-4 text-xs sm:text-sm">
                  {project.client && (
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-foreground-muted text-xs">Client / Developer</div>
                        <div className="font-semibold text-foreground">{project.client}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-foreground-muted text-xs">Location</div>
                      <div className="font-semibold text-foreground">{project.location}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-foreground-muted text-xs">Year Completed</div>
                      <div className="font-semibold text-foreground">{project.year}</div>
                    </div>
                  </div>

                  {project.size && (
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-foreground-muted text-xs">Gross Floor Area</div>
                        <div className="font-semibold text-foreground">{project.size}</div>
                      </div>
                    </div>
                  )}

                  {project.budget && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-foreground-muted text-xs">Contract Value</div>
                        <div className="font-semibold text-emerald-600">{project.budget}</div>
                      </div>
                    </div>
                  )}

                  {project.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-foreground-muted text-xs">Construction Schedule</div>
                        <div className="font-semibold text-foreground">{project.duration}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
                      Disciplines
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <Badge key={t} variant="default" size="sm">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Start Your Project CTA */}
                <div className="pt-4 border-t border-border">
                  <Button asChild variant="primary" size="default" className="w-full">
                    <Link href={`/contact?projectType=${encodeURIComponent(project.category)}`}>
                      <span>Inquire on Similar Project</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Other Projects */}
              {otherProjects.length > 0 && (
                <Card className="p-6 space-y-4">
                  <h4 className="text-sm font-bold text-foreground">
                    More Case Studies
                  </h4>
                  <div className="space-y-3">
                    {otherProjects.map((other) => (
                      <Link
                        key={other.slug}
                        href={`/projects/${other.slug}`}
                        className="group flex items-center gap-3 p-1.5 rounded-lg hover:bg-surface-muted transition-colors"
                      >
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-border">
                          <Image src={other.coverImage} alt={other.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                            {other.title}
                          </h5>
                          <p className="text-xs text-foreground-muted truncate">{other.location}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to all projects</span>
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
