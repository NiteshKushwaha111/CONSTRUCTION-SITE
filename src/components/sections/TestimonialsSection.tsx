'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Building2, Home, Briefcase, Hospital, Sparkles } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Michael Rodriguez',
    role: 'Property Developer',
    company: 'Urban Development Corp',
    content: 'SKYBOUND delivered our commercial complex ahead of schedule and under budget. Their attention to detail and project management was exceptional.',
    rating: 5,
    project: 'Office Tower Development',
    icon: Building2,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    company: '',
    content: 'Our dream home became a reality thanks to SKYBOUND. They listened to our needs and executed perfectly. The quality is outstanding.',
    rating: 5,
    project: 'Custom Luxury Residence',
    icon: Home,
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'CEO',
    company: 'Tech Innovations Inc',
    content: 'The renovation of our headquarters was completed with minimal disruption to our operations. Professional team, excellent results.',
    rating: 5,
    project: 'Corporate Office Renovation',
    icon: Briefcase,
  },
  {
    id: 4,
    name: 'Lisa Thompson',
    role: 'Hospital Administrator',
    company: 'City Medical Center',
    content: 'Building a hospital wing requires precision and expertise. SKYBOUND exceeded our expectations in every aspect.',
    rating: 5,
    project: 'Hospital Expansion',
    icon: Hospital,
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="theme-section">
      <div className="theme-container">

        {/* Section Header */}
        <div className="text-center mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold">CLIENT TESTIMONIALS</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Trusted by homeowners, developers, and businesses for our commitment to excellence.
            </p>
          </motion.div>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-full mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Large Quote Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
              <div className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Quote className="h-7 w-7 text-white" />
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-12 shadow-xl">

              {/* Rating Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-amber-400 text-amber-400 mx-1"
                  />
                ))}
              </div>

              {/* Quote Content */}
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-white text-center leading-relaxed mb-8">
                {currentTestimonial.content}
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left: Client Details */}
                <div className="flex items-center gap-4">
                  {/* Client Icon */}
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center">
                    <currentTestimonial.icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Client Text */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{currentTestimonial.name}</h4>
                    <div className="text-gray-600 dark:text-gray-300">
                      {currentTestimonial.role}
                      {currentTestimonial.company && (
                        <span className="text-gray-500 dark:text-gray-400">, {currentTestimonial.company}</span>
                      )}
                    </div>
                    <div className="text-primary font-semibold text-sm mt-1">
                      {currentTestimonial.project}
                    </div>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex items-center gap-6">
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-primary w-6'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white hover:shadow-lg transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex  w-full items-center justify-between gap-6 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to Build Your Vision?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join our growing list of satisfied clients
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all">
                Get Free Consultation
              </button>
              {/* <button className="px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                View All Testimonials
              </button> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}