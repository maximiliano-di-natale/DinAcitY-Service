import { Business } from '../types';
import { INITIAL_BUSINESSES } from '../data/mockBusinesses';

const STORAGE_KEY = 'dinacity_businesses_v1';

export class BusinessService {
  private static getStoredBusinesses(): Business[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BUSINESSES));
        return INITIAL_BUSINESSES;
      }
      return JSON.parse(data);
    } catch (error) {
      console.warn('Error reading from localStorage, using in-memory mock data:', error);
      return INITIAL_BUSINESSES;
    }
  }

  private static saveBusinesses(businesses: Business[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(businesses));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  public static getAll(): Business[] {
    return this.getStoredBusinesses();
  }

  public static getById(id: string): Business | undefined {
    const list = this.getStoredBusinesses();
    return list.find(b => b.id === id);
  }

  public static create(payload: {
    name: string;
    tagline: string;
    category: Business['category'];
    description: string;
    address: string;
    city: string;
    whatsapp: string;
    phone?: string;
    email?: string;
    instagram?: string;
    website?: string;
    hours: Business['hours'];
    services: Business['services'];
    imageUrl?: string;
  }): Business {
    const list = this.getStoredBusinesses();

    // Default clean placeholder if no image provided
    const defaultImages: Record<string, string> = {
      mecanica: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      gastronomia: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      reparaciones: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      profesionales: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      estetica: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      salud: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      mascotas: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    };

    const newBusiness: Business = {
      id: `biz-${Date.now()}`,
      name: payload.name.trim(),
      tagline: payload.tagline.trim(),
      category: payload.category,
      description: payload.description.trim(),
      address: payload.address.trim(),
      city: payload.city.trim() || 'Ciudad / Zona',
      whatsapp: payload.whatsapp.replace(/\D/g, ''),
      phone: payload.phone?.trim(),
      email: payload.email?.trim(),
      instagram: payload.instagram?.trim(),
      website: payload.website?.trim(),
      hours: payload.hours,
      services: payload.services.length > 0 ? payload.services : [
        { id: `s-${Date.now()}`, name: 'Atención y Consultas Generales', description: 'Consulte vía WhatsApp por presupuestos personalizados.' }
      ],
      rating: 5.0, // Initial bonus rating for new verified listing
      reviewCount: 1,
      imageUrl: payload.imageUrl?.trim() || defaultImages[payload.category] || 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
      isVerified: true,
      createdAt: new Date().toISOString(),
      analytics: {
        views: 1,
        contactClicks: 0,
        lastViewedAt: new Date().toISOString()
      }
    };

    const updated = [newBusiness, ...list];
    this.saveBusinesses(updated);
    return newBusiness;
  }

  public static update(id: string, updates: Partial<Business>): Business | null {
    const list = this.getStoredBusinesses();
    const index = list.findIndex(b => b.id === id);
    if (index === -1) return null;

    list[index] = { ...list[index], ...updates };
    this.saveBusinesses(list);
    return list[index];
  }

  public static recordView(id: string): void {
    const list = this.getStoredBusinesses();
    const item = list.find(b => b.id === id);
    if (item) {
      item.analytics.views = (item.analytics.views || 0) + 1;
      item.analytics.lastViewedAt = new Date().toISOString();
      this.saveBusinesses(list);
    }
  }

  public static recordContactClick(id: string): void {
    const list = this.getStoredBusinesses();
    const item = list.find(b => b.id === id);
    if (item) {
      item.analytics.contactClicks = (item.analytics.contactClicks || 0) + 1;
      this.saveBusinesses(list);
    }
  }

  public static resetToDefault(): Business[] {
    this.saveBusinesses(INITIAL_BUSINESSES);
    return INITIAL_BUSINESSES;
  }

  /**
   * Genera el enlace de WhatsApp con formato internacional y mensaje predeterminado
   */
  public static buildWhatsAppUrl(whatsapp: string, businessName: string): string {
    const cleanNumber = whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(
      `¡Hola ${businessName}! Los encontré a través de Dinacity Service y quisiera consultar por sus servicios.`
    );
    return `https://wa.me/${cleanNumber}?text=${message}`;
  }
}
