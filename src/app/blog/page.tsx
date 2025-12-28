'use client'

import { useState } from 'react'
import {
  Calendar,
  User,
  Clock,
  Search,
  ArrowRight,
} from 'lucide-react'

export default function BlogPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'industry', label: 'Industry' },
    { id: 'tips', label: 'Tips' },
    { id: 'projects', label: 'Projects' },
    { id: 'safety', label: 'Safety' },
    { id: 'materials', label: 'Materials' },
  ]

  const articles = [
    {
      id: 1,
      title: 'The Future of Sustainable Construction',
      excerpt:
        'Innovative materials and building techniques that are shaping eco-friendly construction.',
      category: 'industry',
      author: 'Michael Chen',
      date: 'Mar 15, 2024',
      readTime: '5 min',
      tags: ['Sustainability', 'Innovation'],
    },
    {
      id: 2,
      title: '10 Essential Safety Protocols Every Site Needs',
      excerpt:
        'A practical guide to maintaining safety standards across construction sites.',
      category: 'safety',
      author: 'Sarah Johnson',
      date: 'Mar 10, 2024',
      readTime: '8 min',
      tags: ['Safety', 'Best Practices'],
    },
    {
      id: 3,
      title: 'Smart Home Technology in Modern Builds',
      excerpt:
        'How smart systems are transforming residential and commercial construction.',
      category: 'materials',
      author: 'David Park',
      date: 'Mar 05, 2024',
      readTime: '6 min',
      tags: ['Technology', 'Smart Homes'],
    },
    {
      id: 4,
      title: 'Project Spotlight: Downtown Office Tower',
      excerpt:
        'A behind-the-scenes look at one of our latest commercial developments.',
      category: 'projects',
      author: 'Construction Team',
      date: 'Feb 28, 2024',
      readTime: '4 min',
      tags: ['Commercial', 'Case Study'],
    },
  ]

  const filtered = articles.filter(
    (a) =>
      (category === 'all' || a.category === category) &&
      (search === '' ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <main>

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-primary/30 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="theme-container relative py-28 max-w-4xl">
          <h1 className="text-5xl font-extrabold leading-tight">
            Construction <span className="text-primary">Insights</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Industry trends, expert advice, and project stories from the SKYBOUND team.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FEATURED */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-transparent border">
          <div className="p-12 max-w-3xl">
            <span className="inline-block mb-4 text-sm font-semibold text-primary">
              Featured Article
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Revolutionizing Construction with 3D Printing
            </h2>
            <p className="text-gray-600 mb-6">
              Discover how 3D printing is reshaping construction workflows, costs,
              and sustainability.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
              <span className="flex items-center gap-2">
                <User size={14} /> Alex Morgan
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} /> Mar 20, 2024
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} /> 10 min read
              </span>
            </div>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition">
              Read Article <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FILTER BAR */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-y bg-white">
        <div className="theme-container py-6 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === c.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ARTICLES */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((a) => (
            <article
              key={a.id}
              className="group bg-white rounded-2xl border hover:shadow-xl transition"
            >
              <div className="p-8">
                <span className="inline-block mb-3 text-xs font-semibold text-primary">
                  {a.category.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition">
                  {a.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{a.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <User size={14} /> {a.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} /> {a.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* NEWSLETTER */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-50 py-24">
        <div className="theme-container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-gray-600 mb-8">
            Get construction insights and updates delivered straight to your inbox.
          </p>

          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-3 rounded-xl border focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}
