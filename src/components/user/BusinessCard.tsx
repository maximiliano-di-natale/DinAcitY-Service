import React from 'react';
import { MapPin, MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { Business } from '../../types';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';

interface BusinessCardProps {
  business: Business;
  onSelect: (business: Business) => void;
  onContactWhatsApp: (business: Business) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onSelect,
  onContactWhatsApp
}) => {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Banner */}
      <div 
        onClick={() => onSelect(business)}
        className="relative h-44 sm:h-48 w-full overflow-hidden cursor-pointer bg-slate-100"
      >
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge category={business.category} className="shadow-xs backdrop-blur-md bg-white/95" />
          {business.isVerified && (
            <Badge variant="verified" label="Verificado" className="shadow-xs backdrop-blur-md bg-white/95" />
          )}
        </div>

        {/* Rating Overlay on bottom right of image */}
        <div className="absolute bottom-2.5 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
          <StarRating rating={business.rating} reviewCount={business.reviewCount} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Tagline */}
          <h3 
            onClick={() => onSelect(business)}
            className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
          >
            {business.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {business.tagline}
          </p>

          {/* Location & Schedule preview */}
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{business.city} · {business.address}</span>
            </div>
            <div className="flex items-center gap-1.5 line-clamp-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{business.hours.weekdays}</span>
            </div>
          </div>

          {/* Service tags preview */}
          {business.services.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
              {business.services.slice(0, 2).map((srv) => (
                <span 
                  key={srv.id} 
                  className="inline-block px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 font-medium truncate max-w-[200px]"
                >
                  ✓ {srv.name}
                </span>
              ))}
              {business.services.length > 2 && (
                <span className="inline-block px-1.5 py-0.5 rounded-md text-[10px] bg-slate-50 text-slate-500 font-semibold">
                  +{business.services.length - 2} más
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
          {/* Detail Button */}
          <button
            type="button"
            onClick={() => onSelect(business)}
            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>Ver Ficha</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* WhatsApp Direct Contact Button */}
          <button
            type="button"
            onClick={() => onContactWhatsApp(business)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-emerald-600/20 hover:shadow-md transition-all"
            title="Abrir conversación directa en WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-100/20" />
            <span>Contactar</span>
          </button>
        </div>

      </div>

    </article>
  );
};
