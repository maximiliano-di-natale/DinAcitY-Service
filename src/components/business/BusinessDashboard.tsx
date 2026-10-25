import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  MessageCircle, 
  TrendingUp, 
  Star, 
  Save, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Building, 
  Clock, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';
import { Business } from '../../types';
import { Badge } from '../common/Badge';

interface BusinessDashboardProps {
  businesses: Business[];
  currentBusiness: Business | null;
  onSelectBusiness: (id: string) => void;
  onUpdateBusiness: (id: string, updates: Partial<Business>) => void;
  onPreviewPublic: (business: Business) => void;
}

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({
  businesses,
  currentBusiness,
  onSelectBusiness,
  onUpdateBusiness,
  onPreviewPublic
}) => {
  // If no business exists yet
  if (!currentBusiness) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
        <Building className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          No hay negocios registrados aún
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Publica tu negocio primero para acceder a las estadísticas y gestión de tu perfil en Dinacity Service.
        </p>
      </div>
    );
  }

  // Edit State
  const [tagline, setTagline] = useState(currentBusiness.tagline);
  const [description, setDescription] = useState(currentBusiness.description);
  const [whatsapp, setWhatsapp] = useState(currentBusiness.whatsapp);
  const [address, setAddress] = useState(currentBusiness.address);
  const [weekdaysHours, setWeekdaysHours] = useState(currentBusiness.hours.weekdays);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if active business changes
  useEffect(() => {
    if (currentBusiness) {
      setTagline(currentBusiness.tagline);
      setDescription(currentBusiness.description);
      setWhatsapp(currentBusiness.whatsapp);
      setAddress(currentBusiness.address);
      setWeekdaysHours(currentBusiness.hours.weekdays);
      setSaveSuccess(false);
    }
  }, [currentBusiness.id]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusiness(currentBusiness.id, {
      tagline,
      description,
      whatsapp: whatsapp.replace(/\D/g, ''),
      address,
      hours: {
        ...currentBusiness.hours,
        weekdays: weekdaysHours
      }
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const views = currentBusiness.analytics?.views || 0;
  const clicks = currentBusiness.analytics?.contactClicks || 0;
  const conversionRate = views > 0 ? ((clicks / views) * 100).toFixed(1) : '0';

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Top Header & Business Selector */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            <img 
              src={currentBusiness.imageUrl} 
              alt={currentBusiness.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentBusiness.name}
              </h2>
              {currentBusiness.isVerified && (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge category={currentBusiness.category} />
              <span className="text-xs text-slate-500">
                En Dinacity desde {new Date(currentBusiness.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Switch business if multiple */}
          {businesses.length > 1 && (
            <select
              value={currentBusiness.id}
              onChange={(e) => onSelectBusiness(e.target.value)}
              aria-label="Seleccionar negocio para administrar"
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 bg-white"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={() => onPreviewPublic(currentBusiness)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>Ver Ficha Pública</span>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric: Profile Views */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Visualizaciones</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {views.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Usuarios que abrieron tu perfil
          </p>
        </div>

        {/* Metric: WhatsApp Clicks */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Consultas WhatsApp</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {clicks.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Clics en contactar por chat
          </p>
        </div>

        {/* Metric: Conversion Rate */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tasa de Conversión</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-700">
            {conversionRate}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            De vistas convertidas en contacto
          </p>
        </div>

        {/* Metric: Rating */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Calificación</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 flex items-baseline gap-1">
            <span>{currentBusiness.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Basado en {currentBusiness.reviewCount} opiniones
          </p>
        </div>

      </div>

      {/* Edit Form Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-emerald-600" />
              <span>Editar Información Pública del Perfil</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Mantén tus datos de contacto y horarios actualizados para no perder clientes.
            </p>
          </div>

          {saveSuccess && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>¡Cambios guardados!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Eslogan / Frase Breve
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Descripción del Negocio
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                WhatsApp Receptor de Clientes
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                </span>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Dirección / Ubicación
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Horario Habitual (Lunes a Viernes)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-400">
                <Clock className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                value={weekdaysHours}
                onChange={(e) => setWeekdaysHours(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
