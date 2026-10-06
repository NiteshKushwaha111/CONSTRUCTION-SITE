import type { IService, IProject, ITestimonial, ISiteSettings } from '@/types'
import { THEME_PRESETS } from './theme'

export const DEFAULT_SERVICES: IService[] = [
  {
    _id: '1',
    title: 'Residential Construction',
    slug: 'residential-construction',
    category: 'residential',
    shortDescription: 'Custom homes, renovations, and additions designed to your exact specifications.',
    fullDescription:
      'We bring your dream residence to life with unparalleled craftsmanship, sustainable building practices, and personalized architectural consultation.',
    features: ['Custom Architectural Design', 'High-Grade Sustainable Materials', 'Strict On-Time Delivery'],
    durationEstimate: '6–12 months',
    icon: 'Home',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071',
    order: 1,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: '2',
    title: 'Commercial Building',
    slug: 'commercial-building',
    category: 'commercial',
    shortDescription: 'Modern corporate offices, retail spaces, and commercial facilities built to impress.',
    fullDescription:
      'Full-lifecycle commercial general contracting services including permit expediting, structural framing, HVAC integration, and tenant build-outs.',
    features: ['Dedicated Project Management', 'Full Code Compliance', 'Fixed Budget Guarantees'],
    durationEstimate: '12–24 months',
    icon: 'Building2',
    coverImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070',
    order: 2,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: '3',
    title: 'Renovation & Remodeling',
    slug: 'renovation-remodeling',
    category: 'renovation',
    shortDescription: 'Transform existing structures into modern, functional spaces with master craftsmanship.',
    fullDescription:
      'From historical preservation to complete interior gut-renovations, we enhance property equity and aesthetics with seamless modern updates.',
    features: ['Space Optimization', 'Modern Aesthetic Upgrades', 'Property Value Enhancement'],
    durationEstimate: '2–6 months',
    icon: 'Hammer',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070',
    order: 3,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: '4',
    title: 'Maintenance Services',
    slug: 'maintenance-services',
    category: 'specialized',
    shortDescription: 'Comprehensive property upkeep, preventative inspections, and rapid repairs.',
    fullDescription:
      'Protect your real estate investment with proactive structural maintenance programs and 24/7 on-call emergency response teams.',
    features: ['Preventive Maintenance Schedules', '24/7 Emergency Repairs', 'Periodic Structural Audits'],
    durationEstimate: 'Ongoing / On-demand',
    icon: 'Wrench',
    coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070',
    order: 4,
    isFeatured: false,
    isActive: true,
  },
  {
    _id: '5',
    title: 'Architectural Design',
    slug: 'architectural-design',
    category: 'specialized',
    shortDescription: 'Complete architectural design services from 3D conceptualization to permit drafting.',
    fullDescription:
      'Bridging imagination and engineering. We produce photorealistic 3D renderings, BIM models, and stamped construction drawings.',
    features: ['3D Photorealistic Rendering', 'Zoning & Space Planning', 'Material Specification'],
    durationEstimate: '4–8 weeks',
    icon: 'Ruler',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070',
    order: 5,
    isFeatured: false,
    isActive: true,
  },
  {
    _id: '6',
    title: 'Project Management & QA',
    slug: 'project-management',
    category: 'specialized',
    shortDescription: 'End-to-end site coordination, contractor oversight, and rigorous quality assurance.',
    fullDescription:
      'We act as your owner-representative on-site, overseeing subcontractors, managing procurement timelines, and upholding strict safety standards.',
    features: ['Milestone Tracking', 'Real-Time Budget Audits', 'OSHA Safety Compliance'],
    durationEstimate: 'Full project lifecycle',
    icon: 'ShieldCheck',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?q=80&w=2070',
    order: 6,
    isFeatured: true,
    isActive: true,
  },
]

export const DEFAULT_PROJECTS: IProject[] = [
  {
    _id: '1',
    title: 'Skyline Office Tower',
    slug: 'skyline-office-tower',
    category: 'Commercial',
    client: 'Metropolitan Real Estate Trust',
    location: 'Manhattan, NY',
    year: '2023',
    size: '450,000 sqft',
    budget: '$8.2M',
    duration: '18 Months',
    description:
      'A 25-story sustainable commercial office tower featuring floor-to-ceiling high-efficiency glazing, rooftop solar integration, and LEED Platinum certification.',
    challenge:
      'Constructing a multi-story commercial complex within a high-density urban corridor with minimal disruption to adjacent street traffic and subway infrastructure.',
    solution:
      'Implemented advanced prefabricated steel modular framing, scheduled night-time logistics deliveries, and deployed 4D BIM modeling to streamline trade handovers.',
    results: [
      'Delivered 3 weeks ahead of the 18-month contractual deadline',
      'Achieved LEED Platinum accreditation with 34% energy savings',
      'Zero lost-time safety incidents across 320,000 man-hours',
    ],
    coverImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070',
    galleryImages: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070',
      'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?q=80&w=2070',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070',
    ],
    tags: ['Commercial', 'LEED Platinum', 'High-Rise', 'Sustainable'],
    isFeatured: true,
    order: 1,
  },
  {
    _id: '2',
    title: 'Azure Waters Residence',
    slug: 'azure-waters-residence',
    category: 'Residential',
    client: 'Private Owner',
    location: 'Brooklyn, NY',
    year: '2023',
    size: '8,500 sqft',
    budget: '$3.5M',
    duration: '14 Months',
    description:
      'Luxury multi-level waterfront private residence featuring panoramic floor-to-ceiling coastal vistas, cantilevered terraces, and smart home automation.',
    challenge:
      'High water table soil conditions and coastal flood mitigation requirements necessitated specialized subterranean waterproofing and foundation piles.',
    solution:
      'Installed deep auger-cast concrete pilings, marine-grade corrosion-resistant reinforcement, and integrated backup generator systems.',
    results: [
      'Completed to exact client architectural specifications',
      'Engineered to withstand Category 3 coastal storm surges',
      'Featured in Contemporary Architectural Digest 2023',
    ],
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071',
    galleryImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070',
    ],
    tags: ['Residential', 'Waterfront', 'Smart Home', 'Custom Architecture'],
    isFeatured: true,
    order: 2,
  },
  {
    _id: '3',
    title: 'Metro Retail Center',
    slug: 'metro-retail-center',
    category: 'Commercial',
    client: 'Urban Horizon Retail Holdings',
    location: 'Queens, NY',
    year: '2022',
    size: '200,000 sqft',
    budget: '$5.4M',
    duration: '12 Months',
    description:
      'Comprehensive transformation of an aging commercial shopping plaza into an open-air pedestrian lifestyle and dining hub.',
    challenge:
      'Maintaining retail foot traffic and safety for 14 active anchor tenants throughout sequential structural demolition and reconstruction.',
    solution:
      'Executed phased night-time structural work with isolated acoustical partitions and temporary covered customer passageways.',
    results: [
      'Zero downtime or revenue disruption for existing anchor tenants',
      'Increased retail lease occupancy from 68% to 100% post-renovation',
    ],
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070',
    galleryImages: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070',
    ],
    tags: ['Retail', 'Commercial', 'Adaptive Reuse'],
    isFeatured: true,
    order: 3,
  },
  {
    _id: '4',
    title: 'Academic Innovation Hub',
    slug: 'academic-innovation-hub',
    category: 'Institutional',
    client: 'Northeast Technological University',
    location: 'Boston, MA',
    year: '2022',
    size: '150,000 sqft',
    budget: '$6.8M',
    duration: '16 Months',
    description:
      'State-of-the-art collegiate research laboratory facility incorporating vibration-isolated cleanrooms, collaborative robotics ateliers, and maker spaces.',
    challenge:
      'Stringent scientific acoustic and vibration tolerances for electron microscopy cleanrooms situated adjacent to campus roadways.',
    solution:
      'Isolated mass-concrete floating foundation pads, specialized electromagnetic shielding, and isolated HVAC air delivery plenums.',
    results: [
      'Achieved strict ISO Class 5 cleanroom certification on first inspection',
      'Honored with the 2022 Regional Institutional Architecture Excellence Award',
    ],
    coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070',
    galleryImages: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070',
    ],
    tags: ['Institutional', 'Laboratory', 'Cleanroom', 'Research'],
    isFeatured: false,
    order: 4,
  },
  {
    _id: '5',
    title: 'Oceanview Resort & Spa',
    slug: 'oceanview-resort-spa',
    category: 'Hospitality',
    client: 'Azure Hospitality Group',
    location: 'Miami, FL',
    year: '2021',
    size: '300,000 sqft',
    budget: '$12.5M',
    duration: '22 Months',
    description:
      'Five-star beachfront hospitality resort featuring 180 luxury keys, infinity-edge oceanfront swimming pools, and signature event venues.',
    challenge:
      'Tight milestone target dates tied to international seasonal tourism openings alongside aggressive hurricane-season weather windows.',
    solution:
      'Coordinated dual shifts with precision crane management and weather-hardened exterior building envelopes ahead of peak storm months.',
    results: [
      'Grand opening hosted on the scheduled target date with zero delays',
      'Awarded Best New Luxury Resort by Travel & Leisure in 2022',
    ],
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    ],
    tags: ['Hospitality', 'Luxury', 'Resort', 'Miami'],
    isFeatured: true,
    order: 5,
  },
  {
    _id: '6',
    title: 'Advanced Medical Center',
    slug: 'advanced-medical-center',
    category: 'Healthcare',
    client: 'Midwest Regional Health System',
    location: 'Chicago, IL',
    year: '2021',
    size: '180,000 sqft',
    budget: '$9.1M',
    duration: '15 Months',
    description:
      'Cutting-edge medical diagnostic clinic and outpatient surgical suites engineered for maximum patient comfort and strict infection control.',
    challenge:
      'Rigorous Department of Health medical gas, radiation shielding, and sterile air turnover compliance guidelines.',
    solution:
      'Collaborated closely with clinical directors, integrating pre-certified medical headwalls and seamless antimicrobial finishes throughout.',
    results: [
      'Passed state healthcare commissioning and licensing on first pass',
      'Expanded regional surgical patient capacity by 45%',
    ],
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053',
    galleryImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053',
    ],
    tags: ['Healthcare', 'Medical', 'Surgical Suites', 'Chicago'],
    isFeatured: true,
    order: 6,
  },
]

export const DEFAULT_TESTIMONIALS: ITestimonial[] = [
  {
    _id: '1',
    clientName: 'Michael Rodriguez',
    clientRole: 'Property Developer',
    company: 'Urban Development Corp',
    rating: 5,
    review:
      'SKYBOUND delivered our commercial office tower 3 weeks ahead of schedule and under budget. Their precision scheduling, proactive safety standards, and project management were exceptional.',
    projectTitle: 'Skyline Office Tower Development',
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '2',
    clientName: 'Sarah Johnson',
    clientRole: 'Homeowner & Interior Designer',
    company: 'Studio Johnson',
    rating: 5,
    review:
      'Our waterfront dream home became a stunning reality thanks to the SKYBOUND crew. They listened attentively to our architectural vision and executed every detail with master craftsmanship.',
    projectTitle: 'Custom Luxury Coastal Residence',
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '3',
    clientName: 'David Chen',
    clientRole: 'Chief Executive Officer',
    company: 'Tech Innovations Inc',
    rating: 5,
    review:
      'The multi-phase renovation of our corporate headquarters was completed with zero disruption to daily technology operations. Truly professional, communicative, and dependable.',
    projectTitle: 'Corporate Headquarters Adaptive Reuse',
    isFeatured: true,
    isApproved: true,
  },
  {
    _id: '4',
    clientName: 'Lisa Thompson',
    clientRole: 'Hospital Administrator',
    company: 'City Medical Center',
    rating: 5,
    review:
      'Constructing a modern surgical hospital wing demands utmost technical precision and infection control. SKYBOUND exceeded our medical regulatory expectations at every milestone.',
    projectTitle: 'Outpatient Surgical Expansion',
    isFeatured: true,
    isApproved: true,
  },
]

export const DEFAULT_SETTINGS: ISiteSettings = {
  companyName: 'SKYBOUND Construction',
  tagline: 'Building Dreams Into Reality',
  description:
    'Building excellence with innovation and integrity since 2003. We transform visions into exceptional spaces with unmatched quality and professionalism.',
  logoUrl: '',
  contact: {
    phone: '(555) 123-4567',
    email: 'info@skybound.com',
    emergencyPhone: '(555) 987-6543',
    address: {
      street: '123 Construction Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA',
    },
    hours: 'Mon - Fri: 8:00 AM - 6:00 PM',
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: '',
  },
  theme: {
    presetId: 'obsidianCopper',
    primaryColor: THEME_PRESETS.obsidianCopper.colors.primary,
    secondaryColor: THEME_PRESETS.obsidianCopper.colors.secondary,
    colors: { ...THEME_PRESETS.obsidianCopper.colors },
  },
  stats: {
    yearsExperience: 20,
    projectsCompleted: 250,
    clientSatisfaction: 98,
    activeProjects: 12,
  },
  seo: {
    metaTitle: 'SKYBOUND Construction | Premier Building Solutions',
    metaDescription: 'Quality general contracting, civil engineering, and construction solutions for residential and commercial developments.',
    keywords: ['construction', 'general contractor', 'commercial building', 'residential remodeling'],
    ogImage: '',
  },
}
