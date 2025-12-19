// src/components/sections/HeroSection.tsx
'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { Sparkles, ArrowRight, Hammer, Home, CheckCircle, Award, Clock, Shield, Phone, Calendar } from 'lucide-react'

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  // Generate deterministic particle data based on index
  const particleData = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => {
      const pseudoRandom = (seed: number, max: number) => {
        const x = Math.sin(seed * 12.9898) * 43758.5453;
        return (x - Math.floor(x)) * max;
      }

      return {
        id: i,
        initialX: pseudoRandom(i, 100),
        initialY: pseudoRandom(i + 1, 100),
        scale: 0.5 + pseudoRandom(i + 2, 0.5),
        duration: 2 + pseudoRandom(i + 3, 3),
        xOffset: pseudoRandom(i + 4, 20) - 10,
      }
    }),
    [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    })

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [controls])

  return (
    <div className="">
      <div className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">

        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-amber-900/20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        {/* Floating Particles */}
        {particleData.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ scale: particle.scale }}
            animate={{
              y: [0, -20, 0],
              x: [0, particle.xOffset, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.id * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              filter: 'blur(1px)',
              opacity: 0.6,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`
            }}
          />
        ))}

        {/* Parallax Background Elements */}
        <motion.div
          className="absolute w-64 h-64 rounded-full border border-primary/30 hidden lg:block"
          style={{
            left: '10%',
            top: '30%',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: 360
          }}
          transition={{
            scale: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            },
            rotate: {
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />

        <motion.div
          className="absolute w-48 h-48 rounded-full border border-amber-500/20 hidden lg:block"
          style={{
            right: '15%',
            bottom: '30%',
            transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Content Container */}
        <div className="theme-container relative z-10 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-semibold">EST. 2003 • 20+ YEARS EXPERIENCE</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block">Building</span>
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  Dreams
                </motion.span>
                <span className="block">Into Reality</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                Premium construction and renovation services that transform visions into exceptional spaces.
                Where <span className="text-primary font-semibold">quality</span> meets <span className="text-amber-400 font-semibold">innovation</span> in every project.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                {[
                  { number: '500+', label: 'Projects' },
                  { number: '20+', label: 'Years' },
                  { number: '100%', label: 'Satisfaction' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg shadow-primary/25"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  <span>View Portfolio</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Interactive Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 overflow-hidden p-8">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="h-full w-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 110-30 15 15 0 010 30z' fill='%233b82f6' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  }} />
                </div>

                {/* Content */}
                <div className="relative">

                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="text-2xl font-bold text-white mb-2">Why Choose Us</div>
                    <div className="text-primary font-medium">Award-Winning Excellence</div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, text: "Certified", color: "border-emerald-500/30 bg-emerald-500/10" },
                      { icon: <Clock className="w-5 h-5 text-blue-400" />, text: "On Time", color: "border-blue-500/30 bg-blue-500/10" },
                      { icon: <Shield className="w-5 h-5 text-amber-400" />, text: "Insured", color: "border-amber-500/30 bg-amber-500/10" },
                      { icon: <Award className="w-5 h-5 text-purple-400" />, text: "Awarded", color: "border-purple-500/30 bg-purple-500/10" },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border ${feature.color} backdrop-blur-sm`}
                      >
                        {feature.icon}
                        <span className="text-white text-sm font-medium mt-2">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contact Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm rounded-xl p-6 border border-primary/20"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-xl">(555) 123-4567</div>
                        <div className="text-gray-400 text-sm">24/7 Support Available</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-semibold"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Free Consultation</span>
                    </motion.button>
                  </motion.div>

                  {/* Current Projects */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="mt-6 pt-6 border-t border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400">Active Projects</div>
                        <div className="text-xl font-bold text-white">12</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Completion Rate</div>
                        <div className="text-xl font-bold text-emerald-400">98%</div>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500 rounded-br-lg" />
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-primary rounded-full mt-2"
                animate={{
                  y: [0, 12, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}