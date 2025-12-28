'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Building2,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/providers/ThemeProvider'

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type SubMenuItem = {
  name: string
  href: string
}

type NavItem = {
  name: string
  href: string
  submenu?: SubMenuItem[]
}

/* -------------------------------------------------------------------------- */
/* NAVIGATION DATA                                                            */
/* -------------------------------------------------------------------------- */

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /** ---------------------------------------------------------------------- */
  /** ACTIVE STATE LOGIC                                                      */
  /** ---------------------------------------------------------------------- */
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg'
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg'
      }`}
    >
      <div className="theme-container">

        {/* ------------------------------------------------------------------ */}
        {/* TOP BAR                                                            */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex h-20 items-center justify-between">

          {/* LOGO */}
          {/* <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent dark:from-white">
                SKYBOUND
              </h1>
              <p className="text-sm font-semibold text-primary">
                CONSTRUCTION
              </p>
            </div>
          </Link> */}
           {/* Logo with animation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="group flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20"
              >
                <Building2 className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-xl border border-white/20" />
              </motion.div>
              <div className="relative">
                <motion.h1 
                  className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent dark:from-white dark:to-primary"
                  whileHover={{ scale: 1.02 }}
                >
                  SKYBOUND
                </motion.h1>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-gradient-to-r from-primary to-transparent rounded-full" />
                  <p className="text-sm font-semibold text-primary">CONSTRUCTION</p>
                  <div className="h-1 w-8 bg-gradient-to-l from-primary to-transparent rounded-full" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? 'text-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                  }`}
                >
                  {item.name}

                  {/* underline */}
                  <motion.span
                    className="absolute left-0 bottom-0 h-0.5 bg-primary"
                    initial={false}
                    animate={{ width: active ? '100%' : '0%' }}
                    transition={{ duration: 0.25 }}
                  />
                </Link>
              )
            })}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <button
              onClick={() => setIsOpen((v) => !v)}
              className="lg:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE NAV                                                         */}
        {/* ------------------------------------------------------------------ */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4"
            >
              <div className="space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href)

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}

                {/* Mobile theme toggle */}
                <div className="px-4 pt-4">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  )
}
