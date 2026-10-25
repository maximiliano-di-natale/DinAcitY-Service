export type CategoryId = 
  | 'todos'
  | 'mecanica'
  | 'gastronomia'
  | 'reparaciones'
  | 'profesionales'
  | 'estetica'
  | 'salud'
  | 'educacion'
  | 'mascotas';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  color: string;
}

export interface ServiceOffer {
  id: string;
  name: string;
  description?: string;
  priceEstimate?: string;
}

export interface BusinessReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface BusinessHours {
  weekdays: string;
  saturday?: string;
  sunday?: string;
}

export interface BusinessAnalytics {
  views: number;
  contactClicks: number;
  lastViewedAt?: string;
}

export interface Business {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  description: string;
  address: string;
  city: string;
  whatsapp: string; // e.g. "5491122334455"
  phone?: string;
  email?: string;
  instagram?: string;
  website?: string;
  hours: BusinessHours;
  services: ServiceOffer[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isVerified: boolean;
  createdAt: string;
  analytics: BusinessAnalytics;
}

export type ViewMode = 'explore' | 'register' | 'dashboard';
