'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  return (
    <section className="theme-section bg-gray-900 text-white">
      <div className="theme-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-300 mb-8">
             {` Contact us today for a free consultation and estimate. Let's build something amazing together.`}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-lg">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-lg">info@SKYBOUND.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="text-lg">24/7 Emergency Services Available</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get a Free Quote</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  id="project"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                >
                  <option>Select project type</option>
                  <option>Residential Construction</option>
                  <option>Commercial Building</option>
                  <option>Renovation & Remodeling</option>
                  <option>Maintenance Services</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Details
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <Button type="submit" className="w-full btn-primary">
                Submit Request
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}