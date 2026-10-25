import { useState, useEffect, useMemo, useCallback } from 'react';
import { Business, CategoryId } from '../types';
import { BusinessService } from '../services/businessService';

export function useBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [dashboardBusinessId, setDashboardBusinessId] = useState<string>('');

  // Initial load
  const reloadBusinesses = useCallback(() => {
    const list = BusinessService.getAll();
    setBusinesses(list);
    if (list.length > 0 && !dashboardBusinessId) {
      setDashboardBusinessId(list[0].id);
    }
  }, [dashboardBusinessId]);

  useEffect(() => {
    reloadBusinesses();
  }, [reloadBusinesses]);

  // Filtered list
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      // Category match
      const matchesCategory = selectedCategory === 'todos' || b.category === selectedCategory;
      if (!matchesCategory) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const inName = b.name.toLowerCase().includes(q);
      const inTagline = b.tagline.toLowerCase().includes(q);
      const inDescription = b.description.toLowerCase().includes(q);
      const inCity = b.city.toLowerCase().includes(q);
      const inAddress = b.address.toLowerCase().includes(q);
      const inServices = b.services.some(s => 
        s.name.toLowerCase().includes(q) || (s.description && s.description.toLowerCase().includes(q))
      );

      return inName || inTagline || inDescription || inCity || inAddress || inServices;
    });
  }, [businesses, selectedCategory, searchQuery]);

  // Track detail view
  const openBusinessDetail = useCallback((business: Business) => {
    setSelectedBusiness(business);
    BusinessService.recordView(business.id);
    // Locally update view count
    setBusinesses(prev => prev.map(b => b.id === business.id ? {
      ...b,
      analytics: {
        ...b.analytics,
        views: (b.analytics.views || 0) + 1,
        lastViewedAt: new Date().toISOString()
      }
    } : b));
  }, []);

  const closeBusinessDetail = useCallback(() => {
    setSelectedBusiness(null);
  }, []);

  // Track WhatsApp click and open link
  const contactViaWhatsApp = useCallback((business: Business) => {
    BusinessService.recordContactClick(business.id);
    // Locally update contact clicks
    setBusinesses(prev => prev.map(b => b.id === business.id ? {
      ...b,
      analytics: {
        ...b.analytics,
        contactClicks: (b.analytics.contactClicks || 0) + 1
      }
    } : b));

    const url = BusinessService.buildWhatsAppUrl(business.whatsapp, business.name);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Register new business
  const registerBusiness = useCallback((payload: Parameters<typeof BusinessService.create>[0]) => {
    const created = BusinessService.create(payload);
    reloadBusinesses();
    setDashboardBusinessId(created.id);
    return created;
  }, [reloadBusinesses]);

  // Update existing business
  const updateBusiness = useCallback((id: string, updates: Partial<Business>) => {
    const updated = BusinessService.update(id, updates);
    if (updated) {
      reloadBusinesses();
    }
    return updated;
  }, [reloadBusinesses]);

  // Current business for dashboard
  const currentDashboardBusiness = useMemo(() => {
    return businesses.find(b => b.id === dashboardBusinessId) || businesses[0] || null;
  }, [businesses, dashboardBusinessId]);

  return {
    businesses,
    filteredBusinesses,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedBusiness,
    openBusinessDetail,
    closeBusinessDetail,
    contactViaWhatsApp,
    registerBusiness,
    updateBusiness,
    dashboardBusinessId,
    setDashboardBusinessId,
    currentDashboardBusiness,
    reloadBusinesses
  };
}
