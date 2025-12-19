'use client'

import { motion } from 'framer-motion'
import { Users, Award, Clock, Building } from 'lucide-react'

const stats = [
  { icon: Building, value: '250+', label: 'Projects Completed' },
  { icon: Users, value: '50+', label: 'Expert Team Members' },
  { icon: Award, value: '15', label: 'Industry Awards' },
  { icon: Clock, value: '98%', label: 'On-Time Delivery' },
]

export default function StatsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="theme-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}