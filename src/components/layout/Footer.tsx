// src/components/layout/Footer.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Building2,
  ArrowRight, Clock, ShieldCheck, Award, Sparkles, Send
} from 'lucide-react'

const footerLinks = {
  Services: [
    { name: 'Residential Construction', href: '/services/residential' },
    { name: 'Commercial Building', href: '/services/commercial' },
    { name: 'Renovation & Remodeling', href: '/services/renovation' },
    { name: 'Project Management', href: '/services/project-management' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Portfolio', href: '/projects' },
  ],
  Resources: [
    { name: 'Blog & Articles', href: '/blog' },
    { name: 'Project Gallery', href: '/gallery' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'FAQs', href: '/faq' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Licenses & Certifications', href: '/licenses' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-gradient-to-br from-purple-600 to-pink-600' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="theme-container">

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-8 bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">STAY UPDATED</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-300">
                Get the latest construction tips, project updates, and exclusive offers.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 text-base sm:text-sm md:text-base"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 sm:py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 text-base sm:text-sm md:text-base whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Subscribe</span>
                  <span className="inline sm:hidden">Join Newsletter</span>
                  <Send className="h-4 w-4 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="pt-12 pb-16 grid gap-12 lg:grid-cols-2 xl:grid-cols-5">

          {/* Company Info */}
          <div className="xl:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-xl border border-primary/30" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">SKYBOUND</h2>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-6 bg-gradient-to-r from-primary to-transparent rounded-full" />
                    <span className="text-primary font-semibold">CONSTRUCTION</span>
                    <div className="h-1 w-6 bg-gradient-to-l from-primary to-transparent rounded-full" />
                  </div>
                </div>
              </div>
            </Link>

            <p className="mb-8 text-gray-400 leading-relaxed max-w-md">
              Building excellence with innovation and integrity since 2003. We transform visions into exceptional spaces with unmatched quality and professionalism.
            </p>

            <div className="flex items-center gap-4 mb-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-300 font-medium">Licensed</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Award className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-amber-300 font-medium">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-6 text-lg font-bold text-white flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Section */}
        <div className="border-t border-gray-800 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Call Us Anytime</p>
                <p className="text-xl font-bold text-white">(555) 123-4567</p>
                <p className="text-sm text-gray-400">24/7 Emergency Service</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email Us</p>
                <p className="text-xl font-bold text-white">info@skybound.com</p>
                <p className="text-sm text-gray-400">Response within 24 hours</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Visit Our Office</p>
                <p className="text-xl font-bold text-white">123 Construction Ave</p>
                <p className="text-sm text-gray-400">New York, NY 10001</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()} SKYBOUND Construction. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Building dreams into reality since 2003
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-primary transition-colors text-sm font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-primary transition-colors text-sm font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-primary transition-colors text-sm font-medium"
              >
                Sitemap
              </Link>
            </div>
          </div>

          {/* Credits & Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              {/* Left: Company Info */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="text-white font-semibold">SKYBOUND CONSTRUCTION</span>
                </div>
                <p className="text-sm text-gray-400 max-w-md">
                  Professional construction services with 20+ years of excellence in residential and commercial projects.
                </p>
              </div>

              {/* Middle: Certifications */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-emerald-300">Licensed</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-blue-300">Insured</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-medium text-amber-300">Certified</span>
                </div>
              </div>

              {/* Right: Developer Credits */}
              <div className="text-center lg:text-right">
                <div className="inline-flex text-center flex-col items-center lg:items-end gap-1">
                  <div className="text-xs text-gray-500">DESIGNED & DEVELOPED BY</div>
                  <div className="flex items-center gap-2">
                    <div className="h-0.5 w-6 bg-gradient-to-r from-primary to-transparent rounded-full hidden lg:block" />
                    <span className="text-white font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      Nitesh
                    </span>
                    <div className="h-0.5 w-6 bg-gradient-to-l from-primary to-transparent rounded-full hidden lg:block" />
                  </div>
                  <a
                    href="mailto:niteshkushwaha603@gmail.com"
                    className="text-xs text-gray-400 hover:text-primary transition-colors"
                  >
                    niteshkushwaha603@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}