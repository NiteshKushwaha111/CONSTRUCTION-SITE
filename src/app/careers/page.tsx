'use client'

import { useState } from 'react'
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

export default function CareersPage() {
  const [department, setDepartment] = useState('all')

  const departments = [
    { id: 'all', label: 'All Roles' },
    { id: 'construction', label: 'Field Operations' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'project', label: 'Project Management' },
    { id: 'safety', label: 'Safety' },
    { id: 'admin', label: 'Administration' },
  ]

  const jobs = [
    {
      id: 1,
      title: 'Site Supervisor',
      department: 'construction',
      type: 'Full-time',
      location: 'Los Angeles, CA',
      salary: '$85k – $110k',
      experience: '5+ years',
      description:
        'Lead on-site construction operations while ensuring safety, quality, and timelines.',
      benefits: ['Health Insurance', '401(k)', 'Paid Time Off'],
    },
    {
      id: 2,
      title: 'Structural Engineer',
      department: 'engineering',
      type: 'Full-time',
      location: 'Hybrid / Remote',
      salary: '$95k – $125k',
      experience: '7+ years',
      description:
        'Design and analyze structural systems for residential and commercial projects.',
      benefits: ['Flexible Schedule', 'Education Support', 'Career Growth'],
    },
    {
      id: 3,
      title: 'Project Manager',
      department: 'project',
      type: 'Full-time',
      location: 'San Diego, CA',
      salary: '$90k – $120k',
      experience: '8+ years',
      description:
        'Own project execution from planning to delivery while coordinating teams.',
      benefits: ['Bonuses', 'Company Vehicle', 'Paid Certifications'],
    },
    {
      id: 4,
      title: 'Safety Officer',
      department: 'safety',
      type: 'Full-time',
      location: 'Los Angeles, CA',
      salary: '$70k – $90k',
      experience: '3+ years',
      description:
        'Champion workplace safety and compliance across active construction sites.',
      benefits: ['Health Coverage', 'Safety Incentives', 'Training'],
    },
  ]

  const culture = [
    {
      icon: Users,
      title: 'Strong Teams',
      desc: 'Collaborate with skilled professionals who value craftsmanship.',
    },
    {
      icon: Award,
      title: 'Career Growth',
      desc: 'Clear growth paths, mentorship, and leadership opportunities.',
    },
    {
      icon: Heart,
      title: 'Work–Life Balance',
      desc: 'Respectful schedules with competitive leave policies.',
    },
    {
      icon: Clock,
      title: 'Stability',
      desc: 'Long-term projects backed by decades of industry trust.',
    },
  ]

  const filteredJobs =
    department === 'all'
      ? jobs
      : jobs.filter((job) => job.department === department)

  return (
    <main>

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-primary/30 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="theme-container relative py-28 max-w-4xl">
          <h1 className="text-5xl font-extrabold leading-tight">
            Build Your <span className="text-primary">Career</span> With Us
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Join a construction company that values expertise, integrity,
            and long-term growth.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CULTURE */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24">
        <h2 className="text-3xl font-bold mb-14 text-center">
          Life at SKYBOUND
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {culture.map((item) => (
            <div key={item.title} className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-5">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* OPEN ROLES */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-50 py-24">
        <div className="theme-container">

          <div className="flex flex-col md:flex-row justify-between gap-6 mb-14">
            <h2 className="text-3xl font-bold">Open Positions</h2>

            <div className="flex flex-wrap gap-2">
              {departments.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDepartment(d.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    department === d.id
                      ? 'bg-primary text-white'
                      : 'bg-white border text-gray-600 hover:bg-gray-100'
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
                className="bg-white rounded-2xl border p-8 hover:shadow-xl transition"
              >
                <div className="grid lg:grid-cols-3 gap-8 items-start">

                  {/* Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">{job.title}</h3>
                      <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary font-semibold">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-5">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <Briefcase size={14} /> {job.experience}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <DollarSign size={14} /> {job.salary}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="font-semibold mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {job.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <button className="w-full px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-20">
                <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold mb-2">No openings available</h3>
                <p className="text-gray-500">
                  Please check back soon for new opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HIRING PROCESS */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24">
        <h2 className="text-3xl font-bold text-center mb-16">
          Our Hiring Process
        </h2>

        <div className="grid md:grid-cols-4 gap-10 text-center">
          {[
            'Application Review',
            'Initial Screening',
            'Technical Interview',
            'Offer & Onboarding',
          ].map((step, i) => (
            <div key={step}>
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {i + 1}
              </div>
              <h4 className="font-semibold">{step}</h4>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
