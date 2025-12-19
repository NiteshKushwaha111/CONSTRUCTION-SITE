// src/components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Building2, Sparkles, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/providers/ThemeProvider'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', submenu: [
    { name: 'Residential Construction', href: '/services/residential' },
    { name: 'Commercial Building', href: '/services/commercial' },
    { name: 'Renovation & Remodeling', href: '/services/renovation' },
    { name: 'Project Management', href: '/services/project-management' },
  ]},
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg' 
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg'
    }`}>
      {/* Top bar */}
      {/* <div className="hidden lg:block bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
        <div className="theme-container">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm">Mon-Fri: 8AM-6PM</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                20+ Years Experience
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div> */}
  
      {/* Main navbar */}
      <div className="theme-container">
        <div className="flex h-20 items-center justify-between">
          
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  setHoveredItem(item.name)
                  if (item.submenu) setOpenSubmenu(item.name)
                }}
                onMouseLeave={() => {
                  setHoveredItem(null)
                  if (item.submenu) setOpenSubmenu(null)
                }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    pathname === item.href 
                      ? 'text-primary' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className={`inline ml-1 h-4 w-4 transition-transform duration-300 ${
                      openSubmenu === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                  
                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/50"
                    initial={false}
                    animate={{
                      width: hoveredItem === item.name || pathname === item.href ? '100%' : '0%'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>

                {/* Submenu */}
                {item.submenu && openSubmenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                  >
                    <div className="p-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm rounded-lg hover:bg-primary/5 hover:text-primary transition-all duration-200"
                          onClick={() => setOpenSubmenu(null)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary/50" />
                            {subItem.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center">
            {/* Contact Info - Desktop */}
            <motion.div 
              className="hidden lg:flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                  <Phone className="h-5 w-5 text-primary animate-pulse" />
                  <div>
                    <div className="text-sm font-semibold">Call Now</div>
                    <div className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      (555) 123-4567
                    </div>
                  </div>
                </div>
              </motion.div> */}

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(var(--primary), 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Free Consultation
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="border-t border-gray-200 dark:border-gray-800 py-6">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                          pathname === item.href 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => {
                          setIsOpen(false)
                          if (!item.submenu) setOpenSubmenu(null)
                        }}
                      >
                        <span>{item.name}</span>
                        {item.submenu && (
                          <ChevronDown 
                            className={`h-5 w-5 transition-transform duration-300 ${
                              openSubmenu === item.name ? 'rotate-180' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                            }}
                          />
                        )}
                      </Link>
                      
                      {item.submenu && openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-800"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={() => {
                                setIsOpen(false)
                                setOpenSubmenu(null)
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                                {subItem.name}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Mobile Bottom Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Call us 24/7</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">(555) 123-4567</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-4 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white">
                        Free Consultation
                      </button>
                      <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <ThemeToggle />
                        <span className="text-sm">Theme</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}