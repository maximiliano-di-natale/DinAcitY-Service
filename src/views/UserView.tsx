import React from 'react';
import { Business, CategoryId } from '../types';
import { SearchBar } from '../components/user/SearchBar';
import { CategoryFilter } from '../components/user/CategoryFilter';
import { BusinessDirectory } from '../components/user/BusinessDirectory';
import { BusinessDetail } from '../components/user/BusinessDetail';
import { Modal } from '../components/common/Modal';
import { ShieldCheck, MessageCircle, Star, Sparkles, HelpCircle } from 'lucide-react';

interface UserViewProps {
  businesses: Business[];
  filteredBusinesses: Business[];
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedBusiness: Business | null;
  onSelectBusiness: (business: Business) => void;
  onCloseDetail: () => void;
  onContactWhatsApp: (business: Business) => void;
  onNavigateToRegister: () => void;
}

export const UserView: React.FC<UserViewProps> = ({
  businesses,
  filteredBusinesses,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedBusiness,
  onSelectBusiness,
  onCloseDetail,
  onContactWhatsApp,
  onNavigateToRegister
}) => {
  // Category counts
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    businesses.forEach(b => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, [businesses]);

  const hasActiveFilters = selectedCategory !== 'todos' || searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    onSelectCategory('todos');
    onSearchChange('');
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white px-6 py-12 sm:py-16 md:py-20 shadow-2xl border border-slate-800">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>El Gran Puente Intermediario de Servicios</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Encuentra y Conecta con <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              Servicios Confiables
            </span> de Cualquier Rubro
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Acercamos a las personas que necesitan soluciones con las mejores empresas y prestadores. Contacto directo, rápido y sin vueltas por WhatsApp.
          </p>

          {/* Real-time search bar embedded inside hero */}
          <div className="pt-2">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              resultsCount={filteredBusinesses.length}
            />
          </div>

          {/* Quick trust metrics */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Prestadores Verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat Directo por WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Calificaciones Reales</span>
            </div>
          </div>

        </div>
      </section>

      {/* Categories & Directory Section */}
      <section className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Explorar por Rubros
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Selecciona una categoría o escribe lo que buscas en el buscador
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline self-start sm:self-auto"
            >
              Limpiar filtros aplicados
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          businessCounts={categoryCounts}
        />

        {/* Directory Grid */}
        <div className="pt-2">
          <BusinessDirectory
            businesses={filteredBusinesses}
            onSelectBusiness={onSelectBusiness}
            onContactWhatsApp={onContactWhatsApp}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

      </section>

      {/* Value Proposition Intermediary Card */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            ¿Tienes un negocio, taller o brindas servicios?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Dinacity Service es el puente ideal para que nuevos clientes te encuentren. Publica tu empresa gratis, muestra tus servicios y recibe consultas directas a tu WhatsApp.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Publicar Mi Negocio Ahora</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Business Detail Modal */}
      {selectedBusiness && (
        <Modal
          isOpen={!!selectedBusiness}
          onClose={onCloseDetail}
          maxWidth="4xl"
        >
          <BusinessDetail
            business={selectedBusiness}
            onClose={onCloseDetail}
            onContactWhatsApp={onContactWhatsApp}
          />
        </Modal>
      )}

    </div>
  );
};
