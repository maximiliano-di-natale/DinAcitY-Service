import React from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Share2, 
  X,
  ExternalLink
} from 'lucide-react';
import { Business } from '../../types';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';

interface BusinessDetailProps {
  business: Business;
  onClose: () => void;
  onContactWhatsApp: (business: Business) => void;
}

export const BusinessDetail: React.FC<BusinessDetailProps> = ({
  business,
  onClose,
  onContactWhatsApp
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative">
      
      {/* Close button top right */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
        aria-label="Cerrar detalle"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Image with Gradient */}
      <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-t-2xl -mt-4 sm:-mt-6 -mx-4 sm:-mx-6 bg-slate-800">
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge category={business.category} className="bg-white/95 text-slate-900 font-bold" />
            {business.isVerified && (
              <Badge variant="verified" label="Empresa Verificada" className="bg-emerald-500/90 text-white border-0" />
            )}
          </div>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? '¡Enlace copiado!' : 'Compartir'}</span>
          </button>
        </div>
      </div>

      {/* Main Info */}
      <div className="pt-6 space-y-6">
        
        {/* Title, rating and tagline */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {business.name}
            </h2>
            <StarRating rating={business.rating} reviewCount={business.reviewCount} size="lg" />
          </div>
          <p className="text-base text-slate-600 font-medium mt-1">
            {business.tagline}
          </p>
        </div>

        {/* WhatsApp Call to Action Banner (Intermediary focus) */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border-2 border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-sm font-bold text-slate-900">
                Contacto Directo por WhatsApp
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              Solicita cotizaciones, presupuestos o disponibilidad al instante sin intermediarios adicionales.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onContactWhatsApp(business)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>Contactar / Solicitar Servicio</span>
          </button>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span>Sobre la empresa</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {business.description}
          </p>
        </div>

        {/* Services Catalog */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span>Servicios que Ofrece</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {business.services.length} disponibles
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {business.services.map((service) => (
              <div 
                key={service.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800 text-sm">
                      {service.name}
                    </span>
                  </div>
                  {service.priceEstimate && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                      {service.priceEstimate}
                    </span>
                  )}
                </div>
                {service.description && (
                  <p className="text-xs text-slate-500 mt-1 pl-6 leading-relaxed">
                    {service.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid: Hours & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          {/* Working Hours */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Horarios de Atención</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><strong className="text-slate-700">Días de semana:</strong> {business.hours.weekdays}</li>
              {business.hours.saturday && (
                <li><strong className="text-slate-700">Sábados:</strong> {business.hours.saturday}</li>
              )}
              {business.hours.sunday && (
                <li><strong className="text-slate-700">Domingos:</strong> {business.hours.sunday}</li>
              )}
            </ul>
          </div>

          {/* Location & Zone */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Zona & Dirección</span>
            </div>
            <p className="text-xs text-slate-700 font-semibold mb-1">
              {business.address}
            </p>
            <p className="text-xs text-slate-500">
              Ubicación: <span className="font-medium text-slate-700">{business.city}</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Consulte radio de cobertura o atención a domicilio directamente vía WhatsApp.
            </p>
          </div>

        </div>

        {/* Secondary Contact Info */}
        <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500">
          {business.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{business.phone}</span>
            </div>
          )}
          {business.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{business.email}</span>
            </div>
          )}
          {business.instagram && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-rose-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>{business.instagram}</span>
            </div>
          )}
          {business.website && (
            <a 
              href={business.website} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-600 hover:underline"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Sitio Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Intermediary Guarantee Tag */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Publicado a través de Dinacity Service</span>
          </div>
          <span className="text-[11px]">ID Negocio: {business.id}</span>
        </div>

      </div>

    </div>
  );
};
