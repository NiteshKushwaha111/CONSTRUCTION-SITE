export type ServiceCategory = 'residential' | 'commercial' | 'specialized' | 'renovation'

export interface IService {
  _id?: string
  title: string
  slug: string
  category: ServiceCategory
  shortDescription: string
  fullDescription: string
  features: string[]
  durationEstimate: string
  icon: string
  coverImage?: string
  order: number
  isFeatured: boolean
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type ProjectCategory = 'Commercial' | 'Residential' | 'Institutional' | 'Hospitality' | 'Healthcare' | 'Industrial' | 'Renovation'

export interface IProject {
  _id?: string
  title: string
  slug: string
  category: ProjectCategory
  status?: 'completed' | 'ongoing' | 'upcoming'
  client?: string
  location: string
  year: string
  size?: string
  budget?: string
  duration?: string
  description: string
  challenge?: string
  solution?: string
  results?: string[]
  coverImage: string
  galleryImages: string[]
  tags: string[]
  isFeatured: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ITestimonial {
  _id?: string
  clientName: string
  clientRole: string
  company?: string
  rating: number
  review: string
  projectTitle: string
  avatarUrl?: string
  isFeatured: boolean
  isApproved: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type LeadStatus = 'new' | 'in_review' | 'contacted' | 'closed'

export interface ILead {
  _id?: string
  fullName: string
  email: string
  phone: string
  projectType: string
  budgetRange?: string
  message: string
  status: LeadStatus
  notes?: string
  source?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ISiteSettings {
  _id?: string
  companyName: string
  tagline: string
  description: string
  logoUrl?: string
  contact: {
    phone: string
    email: string
    emergencyPhone?: string
    address: {
      street: string
      city: string
      state: string
      zip: string
      country: string
    }
    hours: string
  }
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  theme: {
    presetId?: string
    primaryColor: string
    secondaryColor: string
    colors?: import('./theme').ThemeColors
  }
  stats: {
    yearsExperience: number
    projectsCompleted: number
    clientSatisfaction: number
    activeProjects: number
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    ogImage?: string
  }
  updatedAt?: Date
}

export type UserRole = 'super_admin' | 'admin' | 'editor'

export interface IUser {
  _id?: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
  isActive: boolean
  lastLogin?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface SessionUser {
  userId: string
  email: string
  name: string
  role: UserRole
}

export * from './theme'
