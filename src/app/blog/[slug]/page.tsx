import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/public/PageHeader'
import { ARTICLES } from '@/app/blog/page'
import type { Metadata } from 'next'

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    return { title: 'Article Not Found | SKYBOUND Construction' }
  }

  return {
    title: `${article.title} | SKYBOUND Construction Insights`,
    description: article.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const article = ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <PageHeader
        title={article.title}
        subtitle={article.excerpt}
        badge={article.category}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: article.category },
        ]}
      />

      <article className="theme-container max-w-4xl py-12 md:py-16">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-14 border border-gray-200 dark:border-gray-800 shadow-sm space-y-8">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800 dark:text-gray-200">
                <User className="h-4 w-4 text-primary" /> {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" /> {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" /> {article.readTime}
              </span>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all insights</span>
            </Link>
          </div>

          {/* Article Prose Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed">
            <p className="text-xl font-medium text-gray-900 dark:text-white leading-relaxed">
              As the building sector evolves to meet stringent environmental metrics and tighter urban timelines, structural engineering practices are undergoing a quiet revolution.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white pt-4">
              1. Reducing Embodied Carbon Through Prefabrication
            </h3>
            <p>
              Traditional on-site concrete pours and structural steel adjustments often generate significant material waste and logistical friction. By migrating major framing components to precision off-site prefabrication facilities, builders can cut material waste by over 30% while dramatically reducing on-site construction durations.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white pt-4">
              2. Integrating 4D BIM for Total Team Alignment
            </h3>
            <p>
              Modern Building Information Modeling (BIM) goes beyond 3D drafting. By tying timelines directly to digital volumetric models (4D BIM), general contractors, mechanical trades, and client stakeholders can identify spatial collisions months before physical steel is set in place.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white pt-4">
              3. The Bottom Line for Developers and Owners
            </h3>
            <p>
              Investing in upfront engineering precision consistently pays dividends. Reduced cycle times translate directly into earlier tenant occupancy, lowered construction loan interest carry, and superior long-term asset valuations.
            </p>
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
