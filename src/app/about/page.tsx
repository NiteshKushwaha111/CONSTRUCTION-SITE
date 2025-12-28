// app/about/page.tsx
import {
  Award,
  Users,
  Clock,
  Shield,
  Building2,
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const teamMembers = [
    { name: 'John Carter', role: 'Founder & CEO', experience: '25+ Years' },
    { name: 'Sarah Miller', role: 'Project Director', experience: '18+ Years' },
    { name: 'Mike Rodriguez', role: 'Head of Operations', experience: '20+ Years' },
    { name: 'Lisa Chen', role: 'Chief Engineer', experience: '15+ Years' },
  ]

  const values = [
    {
      title: 'Safety First',
      desc: 'Zero-accident mindset across all construction sites.',
      icon: Shield,
    },
    {
      title: 'Quality Craftsmanship',
      desc: 'Every detail executed with precision and care.',
      icon: Award,
    },
    {
      title: 'On-Time Delivery',
      desc: '97% of projects delivered on or before schedule.',
      icon: Clock,
    },
    {
      title: 'Team Excellence',
      desc: 'Certified professionals with decades of experience.',
      icon: Users,
    },
  ]

  const certifications = [
    {
      name: 'OSHA 30-Hour Certified',
      issuer: 'Occupational Safety Authority',
      icon: Shield,
    },
    {
      name: 'LEED Accredited',
      issuer: 'Green Building Council',
      icon: Award,
    },
    {
      name: 'Licensed General Contractor',
      issuer: 'State License Board',
      icon: Building2,
    },
  ]

  return (
    <main className="overflow-hidden">

      {/* ------------------------------------------------------------------ */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-primary/30 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="theme-container relative py-24">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-4xl leading-tight">
            Building <span className="text-primary">Excellence</span> Since 1998
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            For over two decades, SKYBOUND Construction has transformed
            ambitious visions into durable, world-class structures.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition"
            >
              View Our Projects
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* STORY SECTION */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Our Journey
            </h2>
            <p className="text-gray-600 mb-4">
              Founded in 1998, SKYBOUND Construction began as a small residential
              firm driven by integrity and craftsmanship. Today, we are a
              full-service construction company trusted across residential,
              commercial, and industrial projects.
            </p>
            <p className="text-gray-600 mb-8">
              Our success is built on transparency, engineering excellence, and
              long-term client partnerships.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-gray-50 border">
                <div className="text-4xl font-bold text-primary">250+</div>
                <div className="text-gray-500 mt-1">Projects Delivered</div>
              </div>
              <div className="p-6 rounded-xl bg-gray-50 border">
                <div className="text-4xl font-bold text-primary">98%</div>
                <div className="text-gray-500 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative h-[420px] rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Building2 className="h-32 w-32 text-primary/40" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CORE VALUES */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-50 py-24">
        <div className="theme-container">
          <h2 className="text-center text-3xl font-bold mb-16">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="group bg-white p-8 rounded-2xl border shadow-sm hover:shadow-xl transition"
              >
                <value.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition" />
                <h3 className="text-xl font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LEADERSHIP */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24">
        <h2 className="text-center text-3xl font-bold mb-16">
          Meet Our Leadership
        </h2>

        <div className="grid md:grid-cols-4 gap-10">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="text-center bg-white p-8 rounded-2xl border hover:shadow-xl transition"
            >
              <div className="mx-auto mb-6 h-28 w-28 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
              <p className="text-gray-500 text-sm mt-2">
                {member.experience} Experience
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CERTIFICATIONS */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-900 text-white py-24">
        <div className="theme-container">
          <h2 className="text-center text-3xl font-bold mb-16">
            Certifications & Accreditations
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-center"
              >
                <cert.icon className="h-14 w-14 mx-auto mb-6 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-300">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Build Your Vision?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Partner with a construction company that delivers quality,
          reliability, and complete peace of mind.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="px-10 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition"
          >
            Start Your Project
          </Link>
          <Link
            href="/services"
            className="px-10 py-4 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/5 transition"
          >
            Our Services
          </Link>
        </div>
      </section>
    </main>
  )
}
