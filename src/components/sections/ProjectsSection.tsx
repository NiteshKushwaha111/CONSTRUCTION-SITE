'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar, MapPin, Star } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'Skyline Office Tower',
    category: 'Commercial',
    location: 'Manhattan, NY',
    year: '2023',
    size: '450,000 sqft',
    description: 'A 25-story sustainable office tower with LEED Platinum certification.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070',
  },
  {
    id: 2,
    title: 'Azure Waters Residence',
    category: 'Residential',
    location: 'Brooklyn, NY',
    year: '2023',
    size: '8,500 sqft',
    description: 'Luxury waterfront home with smart home automation.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071',
  },
  {
    id: 3,
    title: 'Metro Retail Center',
    category: 'Commercial',
    location: 'Queens, NY',
    year: '2022',
    size: '200,000 sqft',
    description: 'Modern retail destination transformation.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070',
  },
  {
    id: 4,
    title: 'Academic Innovation Hub',
    category: 'Institutional',
    location: 'Boston, MA',
    year: '2022',
    size: '150,000 sqft',
    description: 'State-of-the-art research facility.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070',
  },
  {
    id: 5,
    title: 'Oceanview Resort & Spa',
    category: 'Hospitality',
    location: 'Miami, FL',
    year: '2021',
    size: '300,000 sqft',
    description: '5-star beachfront resort with sustainable design.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
  },
  {
    id: 6,
    title: 'Advanced Medical Center',
    category: 'Healthcare',
    location: 'Chicago, IL',
    year: '2021',
    size: '180,000 sqft',
    description: 'Cutting-edge medical facility.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070',
  },
]

const categories = ['All', 'Commercial', 'Residential', 'Institutional', 'Hospitality', 'Healthcare']

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <div className="theme-section bg-blue-100/30">
      <div className="theme-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-primary text-sm font-semibold">OUR PORTFOLIO</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Construction Projects
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Showcasing our successful projects that blend quality with innovation.
            </p>
          </motion.div>
        </div>

        {/* Simple Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Simple Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                    {project.category}
                  </span>
                </div>
                
                {/* Size Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block rounded-lg bg-black/70 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                    {project.size}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                
                {/* Location & Year */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-primary" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-primary" />
                    {project.year}
                  </div>
                </div>
                
                {/* View Details Button */}
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-primary hover:text-white transition-colors duration-300">
                  View Project Details
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Interested in Our Work?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              {`Let's discuss how we can bring your vision to life`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                View Full Portfolio
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors">
                Get Free Quote
              </button>
            </div>
          </div>
        </motion.div>

      </div>
      </div>
  )
}