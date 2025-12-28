'use client'

import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
} from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }

  return (
    <main className="overflow-hidden">

      {/* ------------------------------------------------------------------ */}
      {/* HERO – MATCHES ABOUT PAGE EXACTLY                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-primary/30 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="theme-container relative py-24">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-4xl leading-tight">
            Let’s Build Something <span className="text-primary">Great</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Start your construction journey with expert guidance,
            transparent planning, and proven execution.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CONTACT EXPERIENCE                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT – TRUST + INFO */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Talk to Our Experts
            </h2>
            <p className="text-gray-600 max-w-xl mb-10">
              Whether you’re planning a residential build or a large-scale
              commercial project, our team is ready to guide you end-to-end.
            </p>

            {/* Trust Highlights (KEY FIX) */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <TrustCard icon={Award} label="250+ Projects" />
              <TrustCard icon={Users} label="Expert Team" />
              <TrustCard icon={ShieldCheck} label="Licensed & Insured" />
              <TrustCard icon={Clock} label="25+ Years Experience" />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <InfoRow
                icon={Phone}
                title="Call Us"
                value="+1 (555) 123-4567"
                sub="Mon – Fri · 8AM – 6PM"
              />
              <InfoRow
                icon={Mail}
                title="Email"
                value="info@skybound.com"
                sub="Response within 24 hours"
              />
              <InfoRow
                icon={MapPin}
                title="Office"
                value="Los Angeles, CA"
                sub="Serving Southern California"
              />
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 to-transparent blur-xl" />
            <div className="relative bg-white rounded-3xl shadow-xl p-10">

              <h3 className="text-2xl font-bold mb-2">
                Request a Consultation
              </h3>
              <p className="text-gray-600 mb-8">
                Share your project details and our team will contact you shortly.
              </p>

              {submitted ? (
                <div className="py-20 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-2">Message Sent</h4>
                  <p className="text-gray-600">
                    Our team will reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Full Name" required />
                    <Input label="Email Address" type="email" required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Phone Number" />
                    <Select label="Project Type" />
                  </div>

                  <Input label="Subject" required />
                  <Textarea label="Message" required />

                  <button
                    type="submit"
                    className="w-full mt-4 py-4 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition"
                  >
                    <Send className="h-5 w-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA STRIP – SOFT TRANSITION                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-50 py-20">
        <div className="theme-container text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 mb-8">
            From planning to execution, SKYBOUND Construction delivers with confidence.
          </p>
          <a
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition"
          >
            View Our Projects
          </a>
        </div>
      </section>

    </main>
  )
}

/* -------------------------------------------------------------------------- */
/* SMALL COMPONENTS                                                           */
/* -------------------------------------------------------------------------- */

function TrustCard({
  icon: Icon,
  label,
}: {
  icon: React.ElementType
  label: string
}) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border">
      <div className="p-3 rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <span className="font-semibold">{label}</span>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  title,
  value,
  sub,
}: {
  icon: React.ElementType
  title: string
  value: string
  sub: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-primary font-medium">{value}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
    </div>
  )
}

function Input({
  label,
  type = 'text',
  required = false,
}: {
  label: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}

function Textarea({
  label,
  required = false,
}: {
  label: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && '*'}
      </label>
      <textarea
        required={required}
        rows={4}
        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}

function Select({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-primary">
        {['Residential', 'Commercial', 'Industrial', 'Renovation', 'Other'].map(
          (type) => (
            <option key={type}>{type}</option>
          )
        )}
      </select>
    </div>
  )
}
