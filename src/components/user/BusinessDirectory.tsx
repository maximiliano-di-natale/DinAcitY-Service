import React from 'react';
import { Business } from '../../types';
import { BusinessCard } from './BusinessCard';
import { SearchX, Sparkles } from 'lucide-react';

interface BusinessDirectoryProps {
  businesses: Business[];
  onSelectBusiness: (business: Business) => void;
  onContactWhatsApp: (business: Business) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const BusinessDirectory: React.FC<BusinessDirectoryProps> = ({
  businesses,
  onSelectBusiness,
  onContactWhatsApp,
  onResetFilters,
  hasActiveFilters
}) => {
  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm my-8">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          No encontramos servicios con esos criterios
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Intenta buscando con palabras más generales (por ejemplo: "taller", "reparación", "viandas") o explorando todas las categorías disponibles.
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Restablecer Filtros y Ver Todo</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {businesses.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            onSelect={onSelectBusiness}
            onContactWhatsApp={onContactWhatsApp}
          />
        ))}
      </div>
    </div>
  );
};
