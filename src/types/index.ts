// === CMS Data Models ===

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  metaTitle: string
  metaDescription: string
  ogImage?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface PropertyType {
  id: string
  name: string
  slug: string
  headline: string
  description: string
  icon: string
  featuredImage?: string
  benefits: string[]
  ctaText: string
  metaTitle: string
  metaDescription: string
  displayOrder: number
  status: 'draft' | 'published'
}

export interface Testimonial {
  id: string
  sellerName: string
  location: string
  propertyType: string
  quote: string
  rating: number
  photo?: string
  featured: boolean
  status: 'draft' | 'published'
  createdAt: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: 'process' | 'offer' | 'closing' | 'situations' | 'general'
  displayOrder: number
  status: 'draft' | 'published'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo?: string
  displayOrder: number
  status: 'active' | 'inactive'
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  category: 'foreclosure' | 'probate' | 'selling_tips' | 'market_updates' | 'relocation' | 'general'
  author: string
  tags: string[]
  metaTitle: string
  metaDescription: string
  status: 'draft' | 'published'
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Lead {
  id: string
  propertyAddress: string
  propertyCity: string
  propertyState: string
  propertyZip: string
  propertyType: 'house' | 'vacant_land' | 'mobile_home' | 'multi_family' | 'commercial' | 'other'
  bedrooms?: number
  bathrooms?: number
  squareFootage?: number
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_major_work'
  timeline: 'asap' | '30_days' | '60_days' | '90_days' | 'flexible'
  motivation?: string
  sellerName: string
  sellerPhone: string
  sellerEmail: string
  preferredContact: 'phone' | 'email' | 'text'
  source: string
  status: 'new' | 'contacted' | 'offer_made' | 'under_contract' | 'closed' | 'lost'
  notes?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

export interface Consultation {
  id: string
  leadId?: string
  consultationType: 'phone' | 'video' | 'in_person'
  date: string
  time: string
  name: string
  phone: string
  email: string
  propertyAddress?: string
  notes?: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  createdAt: string
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone?: string
  propertyAddress?: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

export interface SiteSettings {
  companyName: string
  phone: string
  email: string
  address: string
  officeHours: string
  logo?: string
  favicon?: string
  socialFacebook: string
  socialInstagram: string
  googleAnalyticsId: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
}
