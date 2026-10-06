'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Building2, Phone, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/providers/ThemeProvider'
import { Drawer } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Process', href: '/#process' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 text-foreground backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-surface/90 text-foreground backdrop-blur-sm border-b border-border/60'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(1rem,3vw,3rem)]">
        <div className="flex h-20 items-center justify-between">
          {/* Architectural Brand Logo */}
          <Link href="/" className="group flex items-center gap-3 select-none">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground block leading-tight">
                SKYBOUND
              </span>
              <span className="text-xs font-semibold text-primary tracking-wider uppercase block">
                CONSTRUCTION & ENG.
              </span>
            </div>
          </Link>

          {/* Desktop Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm leading-normal transition-colors rounded-md ${
                    active
                      ? 'font-semibold text-primary'
                      : 'font-medium text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {item.name}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Button
              asChild
              variant="primary"
              className="hidden sm:inline-flex h-10 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm active:scale-[0.98]"
            >
              <Link href="/contact" className="inline-flex items-center gap-1.5">
                <span>Start Your Project</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>

            <Link
              href="/admin/login"
              title="Admin CMS Portal"
              className="hidden xl:inline-flex items-center justify-center h-10 px-3.5 rounded-lg border border-border bg-surface hover:bg-surface-muted text-foreground-muted hover:text-foreground text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs hover:border-primary/50"
            >
              CMS
            </Link>

            <ThemeToggle className="h-10 w-10" />

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden h-10 w-10 rounded-lg bg-surface text-foreground border border-border hover:border-primary flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Drawer Navigation */}
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Navigation"
        side="right"
      >
        <div className="flex flex-col justify-between h-full pt-2">
          <div className="space-y-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base leading-normal transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-foreground hover:bg-surface-muted font-medium'
                  }`}
                >
                  <span>{item.name}</span>
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </Link>
              )
            })}
          </div>

          <div className="pt-6 border-t border-border space-y-4">
            <Button asChild variant="primary" size="lg" className="w-full">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <span>Start Your Project</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>

            <div className="space-y-2 pt-2 text-xs text-foreground-muted">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>info@skybound.com</span>
              </div>
            </div>

            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block text-center text-xs font-semibold text-foreground-muted hover:text-primary pt-2"
            >
              Admin CMS Login
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  )
}
