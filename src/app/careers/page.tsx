'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Award,
  Heart,
  Clock,
  CheckCircle,
} from 'lucide-react'
import PageHeader from '@/components/public/PageHeader'

export default function CareersPage() {
  const [department, setDepartment] = useState('all')

  const departments = [
    { id: 'all', label: 'All Roles' },
    { id: 'construction', label: 'Field Operations' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'project', label: 'Project Management' },
    { id: 'safety', label: 'Safety' },
  ]

  const jobs = [
    {
      id: 1,
      title: 'Senior Site Superintendent',
      department: 'construction',
      type: 'Full-time',
      location: 'Los Angeles, CA',
      salary: '$95k – $125k',
      experience: '5+ years',
      description:
        'Lead on-site commercial and residential construction operations while ensuring safety, trade quality, and milestone schedules.',
      benefits: ['Comprehensive Health Coverage', '401(k) Match', 'Company Vehicle Allowance'],
    },
    {
      id: 2,
      title: 'Structural Project Engineer',
      department: 'engineering',
      type: 'Full-time',
      location: 'Hybrid / Los Angeles',
      salary: '$105k – $135k',
      experience: '7+ years',
      description:
        'Design, review, and analyze structural systems and BIM models for commercial high-rises and custom residential estates.',
      benefits: ['Flexible Scheduling', 'PE License Reimbursement', 'Annual Performance Bonus'],
    },
    {
      id: 3,
      title: 'Commercial Project Manager',
      department: 'project',
      type: 'Full-time',
      location: 'San Diego, CA',
      salary: '$110k – $140k',
      experience: '8+ years',
      description:
        'Own project execution from pre-construction bidding to delivery while managing subcontractor contracts and budgets.',
      benefits: ['Profit Sharing Bonus', 'Vehicle Allowance', 'Paid Certifications'],
    },
    {
      id: 4,
      title: 'Certified Safety Officer',
      department: 'safety',
      type: 'Full-time',
      location: 'Southern California',
      salary: '$80k – $100k',
      experience: '3+ years',
      description:
        'Champion job-site safety, conduct daily site audits, and uphold zero-accident standards across active job sites.',
      benefits: ['Full Health Insurance', 'Safety Incentive Bonuses', 'Ongoing OSHA Training'],
    },
  ]

  const culture = [
    {
      icon: Users,
      title: 'Collaborative Teams',
      desc: 'Work alongside master craftsmen, licensed engineers, and visionary architects.',
    },
    {
      icon: Award,
      title: 'Career Advancement',
      desc: 'Clear pathways from field leadership to executive project management.',
    },
    {
      icon: Heart,
      title: 'Safety & Well-being',
      desc: 'Top-tier safety gear, comprehensive healthcare, and reasonable work-life balance.',
    },
    {
      icon: Clock,
      title: 'Long-Term Stability',
      desc: 'Consistent pipeline of prestigious commercial, residential, and institutional contracts.',
    },
  ]

  const filteredJobs =
    department === 'all'
      ? jobs
      : jobs.filter((job) => job.department === department)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <PageHeader
        title="Build Your Career With SKYBOUND"
        subtitle="Join an elite construction company that values technical craft, personal accountability, and long-term career growth."
        badge="Careers"
        breadcrumbs={[{ label: 'Careers' }]}
      />

      {/* Culture Section */}
      <section className="theme-container py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Why Work With Us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4">
            Life & Craft at SKYBOUND
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We invest in our people with competitive salaries, modern tool suites, and ongoing professional licensure support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {culture.map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-center"
            >
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-5">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-20">
        <div className="theme-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Active Openings</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Explore open roles across engineering, superintendent, and management disciplines.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {departments.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDepartment(d.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    department === d.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 dark:bg-gray-800/60 rounded-3xl border border-gray-200 dark:border-gray-700/60 p-8 hover:shadow-xl hover:border-primary/40 transition-all"
              >
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                      <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary font-bold">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-primary" /> {job.experience}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="h-4 w-4" /> {job.salary}
                      </span>
                    </div>
                  </div>

                  {/* Benefits & Apply */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                      Included Benefits
                    </h4>
                    <ul className="space-y-2 mb-6 text-xs">
                      {job.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                          <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/contact?projectType=Career+Application:+${encodeURIComponent(job.title)}`}
                      className="block w-full py-3 rounded-xl bg-primary text-white text-center font-bold text-xs hover:bg-primary/90 transition shadow-md shadow-primary/20"
                    >
                      Apply For Position
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
