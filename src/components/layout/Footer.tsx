// src/components/layout/Footer.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail, Phone, MapPin, Building2,
  ArrowRight, ShieldCheck, Award, Send
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

const FOOTER_LINKS = {
  Services: [
    { name: 'Commercial Building', href: '/services/commercial' },
    { name: 'Residential Construction', href: '/services/residential' },
    { name: 'Renovation & Remodeling', href: '/services/renovation' },
    { name: 'Civil Infrastructure', href: '/services/infrastructure' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Projects Portfolio', href: '/projects' },
    { name: 'Methodology & Process', href: '/#process' },
    { name: 'Contact & Estimations', href: '/contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Certifications & Licensing', href: '/about' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border-strong">
      <Container>
        {/* Newsletter & Updates Bar */}
        <div className="pt-12 pb-10 border-b border-white/10">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-1">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider block">
                NEWSLETTER & INSIGHTS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-secondary-foreground leading-snug tracking-tight">
                Stay Updated on Landmark Builds & Engineering
              </h3>
              <p className="text-sm font-normal text-secondary-foreground/75 leading-relaxed">
                Receive quarterly architectural case studies, cost indexes, and project spotlights.
              </p>
            </div>

            <div className="md:col-span-6">
              {subscribed ? (
                <div className="p-3.5 rounded-lg bg-white/10 border border-white/15 text-accent text-sm font-semibold text-center">
                  Thank you for subscribing to Skybound Insights.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter professional email"
                    required
                    className="flex-1 min-h-[2.75rem] px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-secondary-foreground placeholder:text-secondary-foreground/50 text-sm focus:outline-none focus:border-accent"
                  />
                  <Button type="submit" variant="primary" size="default" rightIcon={<Send className="h-3.5 w-3.5" />}>
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links & Company Details */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-secondary-foreground block leading-tight">
                  SKYBOUND
                </span>
                <span className="text-xs font-semibold text-accent tracking-wider uppercase block">
                  CONSTRUCTION & ENG.
                </span>
              </div>
            </Link>

            <p className="text-sm font-normal text-secondary-foreground/75 leading-relaxed max-w-sm">
              Building architectural excellence with uncompromising safety, BIM precision, and transparent execution across residential, commercial, and institutional developments since 2003.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold text-secondary-foreground/80">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>Fully Licensed & Bonded</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold text-secondary-foreground/80">
                <Award className="h-3.5 w-3.5 text-accent" />
                <span>LEED Certified Partner</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-semibold text-secondary-foreground uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2 text-sm font-normal">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-foreground/70 hover:text-accent transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="py-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-secondary-foreground/80">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-accent shrink-0" />
            <span>(555) 123-4567 • 24/7 Field Dispatch</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-accent shrink-0" />
            <span>info@skybound.com • Estimation Desk</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-accent shrink-0" />
            <span>123 Construction Ave, Suite 500, New York, NY</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-foreground/60">
          <div>
            © {new Date().getFullYear()} Skybound Construction Company. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-accent transition-colors">
              Admin CMS
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}