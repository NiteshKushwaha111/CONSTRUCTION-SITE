'use client'

import { useState } from 'react'
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Building2,
  ArrowRight,
  Filter,
} from 'lucide-react'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'renovation', label: 'Renovation' },
  ]

  const projects = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      category: 'residential',
      location: 'Beverly Hills, CA',
      year: '2023',
      duration: '14 Months',
      budget: '$2.5M',
      description: 'Contemporary 5-bedroom villa with smart home automation.',
      tags: ['Luxury', 'Smart Home', 'Sustainable'],
    },
    {
      id: 2,
      title: 'Corporate Office Tower',
      category: 'commercial',
      location: 'Downtown Los Angeles',
      year: '2022',
      duration: '18 Months',
      budget: '$8.2M',
      description: '25-story LEED-certified corporate office building.',
      tags: ['Commercial', 'LEED', 'High-rise'],
    },
    {
      id: 3,
      title: 'Industrial Warehouse',
      category: 'industrial',
      location: 'Riverside, CA',
      year: '2023',
      duration: '8 Months',
      budget: '$3.8M',
      description: '50,000 sq ft logistics and distribution center.',
      tags: ['Industrial', 'Logistics'],
    },
    {
      id: 4,
      title: 'Historic Hotel Renovation',
      category: 'renovation',
      location: 'San Francisco, CA',
      year: '2022',
      duration: '10 Months',
      budget: '$4.5M',
      description: 'Restoration of a 1920s heritage luxury hotel.',
      tags: ['Restoration', 'Hospitality'],
    },
    {
      id: 5,
      title: 'Medical Center Expansion',
      category: 'commercial',
      location: 'San Diego, CA',
      year: '2023',
      duration: '12 Months',
      budget: '$6.7M',
      description: 'Hospital expansion with specialized care facilities.',
      tags: ['Healthcare', 'Expansion'],
    },
    {
      id: 6,
      title: 'Custom Family Residence',
      category: 'residential',
      location: 'Orange County, CA',
      year: '2022',
      duration: '9 Months',
      budget: '$1.8M',
      description: 'Custom-designed family home with outdoor living.',
      tags: ['Custom', 'Family'],
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      filter === 'all' || project.category === filter
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main>

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-primary/30 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="theme-container relative py-24">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-4xl">
            Our <span className="text-primary">Projects</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            A showcase of residential, commercial, and industrial projects
            delivered with precision and excellence.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FILTERS */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white border-b">
        <div className="theme-container py-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  filter === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PROJECT GRID */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <Filter className="h-14 w-14 mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Projects Found</h3>
            <p className="text-gray-600">
              Try adjusting filters or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl border shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="h-52 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center relative">
                  <Building2 className="h-16 w-16 text-primary/40" />
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white text-xs font-semibold capitalize">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-5">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {project.year}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {project.duration}
                    </span>
                    <span className="font-semibold text-primary">
                      {project.budget}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-gray-100 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* STATS */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-900 text-white py-24">
        <div className="theme-container">
          <div className="grid md:grid-cols-4 gap-10 text-center">
            <Stat value="250+" label="Projects Completed" />
            <Stat value="$500M+" label="Total Project Value" />
            <Stat value="98%" label="Client Satisfaction" />
            <Stat value="25+" label="Years Experience" />
          </div>
        </div>
      </section>

    </main>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    STAT                                    */
/* -------------------------------------------------------------------------- */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-5xl font-extrabold mb-2">{value}</div>
      <div className="text-gray-300">{label}</div>
    </div>
  )
}
