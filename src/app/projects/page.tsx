import Link from 'next/link'
import PageHeader from '@/components/public/PageHeader'
import { Container } from '@/components/ui/container'
import { ProjectCard } from '@/components/ui/project-card'
import { EmptyState } from '@/components/ui/empty-state'
import { getAllProjects } from '@/lib/services/project.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio & Projects | SKYBOUND Construction',
  description: 'Explore our portfolio of commercial office towers, luxury residential residences, and specialized medical facilities.',
}

const CATEGORIES = ['All', 'Commercial', 'Residential', 'Institutional', 'Hospitality', 'Healthcare']

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { category = 'All' } = await searchParams
  const projects = await getAllProjects(category)

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <PageHeader
        title="Featured Construction Projects"
        subtitle="A verified showcase of completed commercial developments, luxury residential residences, and institutional infrastructure."
        badge="Portfolio"
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <section className="py-[clamp(2.5rem,5vw,4.5rem)] border-b border-border">
        <Container>
          {/* Category Filter Pills (URL Driven) */}
          <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => {
              const isActive =
                category.toLowerCase() === cat.toLowerCase() ||
                (cat === 'All' && !category)
              const href = cat === 'All' ? '/projects' : `/projects?category=${cat}`

              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all select-none ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'border border-border bg-surface text-foreground-muted hover:text-foreground hover:border-border-strong'
                  }`}
                >
                  {cat}
                </Link>
              )
            })}
          </div>

          {/* Project Cards Grid */}
          {projects.length === 0 ? (
            <EmptyState
              title="No projects found in this category"
              description="Try selecting another category or view our complete architectural catalog."
              actionLabel="View All Projects"
              actionHref="/projects"
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  year={project.year}
                  image={project.coverImage}
                  href={`/projects/${project.slug}`}
                  status={project.status as 'completed' | 'ongoing'}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
