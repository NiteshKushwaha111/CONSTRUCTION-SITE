'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Building2, Phone, Mail, ArrowRight, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ThemeToggle } from '@/components/providers/ThemeProvider'
import { applyThemeVariables } from '@/components/providers/ThemePresetProvider'
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
  const [mounted, setMounted] = useState(false)

  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDark = mounted ? (resolvedTheme === 'dark' || theme === 'dark') : false

  const handleToggleMode = () => {
    const currentlyDark = typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : isDark
    const nextTheme = currentlyDark ? 'light' : 'dark'
    setTheme(nextTheme)
    if (typeof document !== 'undefined') {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
      applyThemeVariables()
    }
  }

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
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 select-none min-w-0">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Building2 className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-xl font-bold tracking-tight text-foreground block leading-tight truncate">
                SKYBOUND
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-primary tracking-wider uppercase block truncate">
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
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Start Your Project Button - Hidden on mobile (<md), shown on tablet & desktop */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover text-xs font-semibold uppercase tracking-wider shadow-sm transition-all active:scale-[0.98]"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* CMS - Visible on xl screens */}
            <Link
              href="/admin/login"
              title="Admin CMS Portal"
              className="hidden xl:inline-flex items-center justify-center h-10 px-3.5 rounded-lg border border-border bg-surface hover:bg-surface-muted text-foreground-muted hover:text-foreground text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs hover:border-primary/50"
            >
              CMS
            </Link>

            {/* Light / Dark Mode Toggle - Visible on ALL screen sizes */}
            <ThemeToggle className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0" />

            {/* Mobile Menu Hamburger - Visible below lg */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-surface text-foreground border border-border hover:border-primary flex items-center justify-center transition-colors cursor-pointer shadow-xs shrink-0 select-none"
              aria-label="Open navigation menu"
            >
              <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Drawer Navigation */}
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        side="right"
        title={
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black shadow-xs shrink-0">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="text-sm font-bold tracking-tight text-foreground block leading-tight truncate">
                SKYBOUND
              </span>
              <span className="text-[9px] font-semibold text-primary tracking-wider uppercase block truncate">
                CONSTRUCTION & ENG.
              </span>
            </div>
          </div>
        }
      >
        <div className="flex flex-col justify-between h-full min-h-0 bg-surface">
          {/* Scrollable middle body */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            {/* Clean Navigation Links */}
            <nav className="space-y-1">
              {NAV_LINKS.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                      active
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-foreground hover:bg-surface-muted font-medium'
                    }`}
                  >
                    <span className="text-base tracking-tight">{item.name}</span>
                    <ArrowRight
                      className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                        active
                          ? 'text-primary'
                          : 'text-foreground-muted/40 group-hover:text-foreground'
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Consultation Card */}
            <div className="p-4 rounded-xl bg-surface-muted/60 border border-border space-y-3">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                  Project Consultation
                </span>
                <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">
                  Discuss structural engineering, commercial builds, or renovation feasibility with our team.
                </p>
              </div>
              <Button asChild variant="primary" size="default" className="w-full justify-center shadow-xs">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <span>Start Your Project</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-1.5 text-xs text-foreground-muted pt-2 border-t border-border">
              <a
                href="tel:5551234567"
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-muted hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="font-semibold text-foreground">(555) 123-4567</span>
              </a>
              <a
                href="mailto:contact@skybound.com"
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-muted hover:text-foreground transition-colors truncate"
              >
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">contact@skybound.com</span>
              </a>
            </div>
          </div>

          {/* Drawer Footer: Appearance Mode & Admin Link */}
          <div className="p-4 border-t border-border bg-surface-muted/30 shrink-0 flex items-center justify-between">
            {/* Light / Dark Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground-muted">Mode:</span>
              <button
                type="button"
                onClick={handleToggleMode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-foreground hover:bg-surface-muted text-xs font-semibold cursor-pointer shadow-xs transition-colors"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-primary" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Admin CMS link */}
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-foreground-muted hover:text-primary transition-colors"
            >
              Admin Portal →
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  )
}
