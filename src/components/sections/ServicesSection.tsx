'use client'

import { motion } from 'framer-motion'
import { Building2, Home, Hammer, Wrench, Ruler, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    icon: Home,
    title: 'Residential Construction',
    description: 'Custom homes, renovations, and additions designed to your specifications with premium quality.',
    features: ['Custom Design', 'Quality Materials', 'Timely Completion'],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10'
  },
  {
    icon: Building2,
    title: 'Commercial Building',
    description: 'Modern office buildings, retail spaces, and industrial facilities built to impress.',
    features: ['Project Management', 'Code Compliance', 'Budget Control'],
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/10'
  },
  {
    icon: Hammer,
    title: 'Renovation & Remodeling',
    description: 'Transform your existing space into your dream environment with expert craftsmanship.',
    features: ['Space Optimization', 'Modern Updates', 'Increased Value'],
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10'
  },
  {
    icon: Wrench,
    title: 'Maintenance Services',
    description: 'Comprehensive maintenance and repair services for all property types.',
    features: ['Preventive Maintenance', 'Emergency Repairs', 'Regular Inspections'],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10'
  },
  {
    icon: Ruler,
    title: 'Architectural Design',
    description: 'Complete design services from concept to construction drawings.',
    features: ['3D Visualization', 'Space Planning', 'Material Selection'],
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/10'
  },
  {
    icon: ShieldCheck,
    title: 'Project Management',
    description: 'End-to-end project coordination and quality assurance excellence.',
    features: ['Timeline Management', 'Budget Tracking', 'Quality Control'],
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/10'
  },
]

export default function ServicesSection() {
  return (
    <div className="theme-section">
      <div className="theme-container">

        {/* Section Header with Animation */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary text-sm font-semibold">COMPREHENSIVE SERVICES</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Premium Construction
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                Services & Solutions
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Delivering exceptional construction services with precision, innovation, and unmatched quality for every project.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:shadow-primary/10">

                {/* Icon with Gradient Background */}
                <CardHeader className="pb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>

                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                        className="flex items-center"
                      >
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${service.color} mr-3`} />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 group-hover:border-primary/30 transition-all duration-300"
                  >
                    <span className="font-semibold text-gray-800 dark:text-white">Learn More</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </motion.button>

                </CardContent>

                {/* Gradient Accent */}
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col md:flex-row w-full items-center justify-between gap-8 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Need a Custom Solution?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {`Let's discuss your unique construction requirements`}
              </p>
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl shadow-lg shadow-primary/25"
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-primary/30 text-primary font-semibold rounded-xl hover:bg-primary/10 transition-colors"
              >
                View All Services
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}