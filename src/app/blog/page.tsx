import Link from 'next/link'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/public/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Construction Insights & News | SKYBOUND Construction',
  description: 'Explore engineering case studies, sustainable building innovations, safety protocols, and industry updates.',
}

export const ARTICLES = [
  {
    id: 1,
    slug: 'the-future-of-sustainable-construction',
    title: 'The Future of Sustainable Construction: Mass Timber & Low-Carbon Concrete',
    excerpt: 'Innovative materials and embodied-carbon reduction techniques that are actively transforming modern eco-friendly commercial and residential architecture.',
    category: 'Industry',
    author: 'Michael Chen, PE',
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    tags: ['Sustainability', 'Innovation', 'Materials'],
  },
  {
    id: 2,
    slug: '10-essential-safety-protocols-every-site-needs',
    title: '10 Essential Safety Protocols Every Construction Job Site Must Implement',
    excerpt: 'A practical, field-tested guide to maintaining zero-incident safety standards across active high-density building operations.',
    category: 'Safety',
    author: 'Sarah Johnson, CSP',
    date: 'Mar 10, 2024',
    readTime: '8 min read',
    tags: ['Safety', 'OSHA', 'Best Practices'],
  },
  {
    id: 3,
    slug: 'smart-home-technology-in-modern-builds',
    title: 'Integrating Smart Home Infrastructure & Renewable Microgrids in Modern Builds',
    excerpt: 'How integrated low-voltage automation, battery storage, and smart thermal envelopes elevate private residential living and asset value.',
    category: 'Technology',
    author: 'David Park, AIA',
    date: 'Mar 05, 2024',
    readTime: '6 min read',
    tags: ['Technology', 'Smart Homes', 'Residential'],
  },
  {
    id: 4,
    slug: 'project-spotlight-downtown-office-tower',
    title: 'Engineering Spotlight: Overcoming Urban Logistics in Downtown High-Rise Construction',
    excerpt: 'A behind-the-scenes structural breakdown of our 25-story LEED-certified commercial office project in a busy metropolitan corridor.',
    category: 'Projects',
    author: 'Field Engineering Team',
    date: 'Feb 28, 2024',
    readTime: '4 min read',
    tags: ['Commercial', 'Case Study', 'Urban Logistics'],
  },
]

export default function BlogPage() {
  const featured = ARTICLES[0]
  const otherArticles = ARTICLES.slice(1)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <PageHeader
        title="Construction Insights & Thought Leadership"
        subtitle="Explore industry trends, engineering innovations, job-site safety standards, and project stories directly from our builders."
        badge="Insights"
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="theme-container py-16">
        {/* Featured Post Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-md mb-16">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              Featured Insight • {featured.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {featured.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
              {featured.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-gray-400 mb-8 font-medium">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-primary" /> {featured.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> {featured.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {featured.readTime}</span>
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/20"
            >
              <span>Read Full Article</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((art) => (
            <article
              key={art.slug}
              className="group flex flex-col bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {art.category}
                </span>
                <span className="text-xs text-gray-400">{art.readTime}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                {art.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6 flex-1">
                {art.excerpt}
              </p>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                <span>{art.date}</span>
                <Link
                  href={`/blog/${art.slug}`}
                  className="font-semibold text-primary group-hover:underline flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
