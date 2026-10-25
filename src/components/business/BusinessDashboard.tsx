import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building, 
  ExternalLink, 
  ShieldCheck, 
  Edit3, 
  Save, 
  CheckCircle2, 
  MessageCircle, 
  MapPin, 
  Clock, 
  BarChart3, 
  LayoutDashboard, 
  Briefcase, 
  Star, 
  Calculator, 
  Sparkles,
  Phone,
  Mail,
  Store,
  RefreshCw
} from 'lucide-react';
import { Business } from '../../types';
import { TimePeriod } from '../../types/analytics';
import { AnalyticsEngine } from '../../services/analyticsEngine';
import { MetricsSummaryCards } from '../analytics/MetricsSummaryCards';
import { TrafficTrendChart } from '../analytics/TrafficTrendChart';
import { WeeklyDistributionChart } from '../analytics/WeeklyDistributionChart';
import { HourlyDistributionChart } from '../analytics/HourlyDistributionChart';
import { ServiceDemandChart } from '../analytics/ServiceDemandChart';
import { ConversionFunnel } from '../analytics/ConversionFunnel';
import { RatingReputationSection } from '../analytics/RatingReputationSection';
import { GrowthSimulator } from '../analytics/GrowthSimulator';
import { ServicesManager } from './ServicesManager';
import { Badge } from '../common/Badge';

interface BusinessDashboardProps {
  businesses: Business[];
  currentBusiness: Business | null;
  onSelectBusiness: (id: string) => void;
  onUpdateBusiness: (id: string, updates: Partial<Business>) => void;
  onPreviewPublic: (business: Business) => void;
  onRegisterNew?: () => void;
}

type TabType = 'resumen' | 'analiticas' | 'servicios' | 'reputacion' | 'empresa' | 'simulador';

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({
  businesses,
  currentBusiness,
  onSelectBusiness,
  onUpdateBusiness,
  onPreviewPublic,
  onRegisterNew
}) => {
  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('resumen');
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('30d');

  // Edit State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [weekdaysHours, setWeekdaysHours] = useState('');
  const [saturdayHours, setSaturdayHours] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if active business changes
  useEffect(() => {
    if (currentBusiness) {
      setName(currentBusiness.name);
      setTagline(currentBusiness.tagline);
      setDescription(currentBusiness.description);
      setWhatsapp(currentBusiness.whatsapp);
      setPhone(currentBusiness.phone || '');
      setEmail(currentBusiness.email || '');
      setAddress(currentBusiness.address);
      setCity(currentBusiness.city);
      setWeekdaysHours(currentBusiness.hours?.weekdays || '');
      setSaturdayHours(currentBusiness.hours?.saturday || '09:00 a 13:00');
      setSaveSuccess(false);
    }
  }, [currentBusiness?.id]);

  // Motor matemático de analíticas en tiempo real
  const analytics = useMemo(() => {
    if (!currentBusiness) return null;
    return AnalyticsEngine.calculateAnalytics(currentBusiness, selectedPeriod);
  }, [currentBusiness, selectedPeriod]);

  // Si no hay empresa registrada
  if (!currentBusiness) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
        <Building className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          No hay prestadores registrados aún
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Registra tu empresa o comercio para acceder al panel de estadísticas y gestión de DinAcitY Service.
        </p>
        {onRegisterNew && (
          <button
            type="button"
            onClick={onRegisterNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Registrar mi Empresa</span>
          </button>
        )}
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusiness(currentBusiness.id, {
      name,
      tagline,
      description,
      whatsapp: whatsapp.replace(/\D/g, ''),
      phone,
      email,
      address,
      city,
      hours: {
        ...currentBusiness.hours,
        weekdays: weekdaysHours,
        saturday: saturdayHours
      }
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: 'resumen', label: 'Resumen Ejecutivo', icon: LayoutDashboard },
    { id: 'analiticas', label: 'Estadísticas & Gráficos', icon: BarChart3 },
    { id: 'servicios', label: 'Catálogo de Servicios', icon: Briefcase },
    { id: 'reputacion', label: 'Calificaciones', icon: Star },
    { id: 'empresa', label: 'Datos de la Empresa', icon: Store },
    { id: 'simulador', label: 'Simulador ROI', icon: Calculator }
  ] as const;

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Banner & Prestador Identity */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Business Info */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-xs">
              <img 
                src={currentBusiness.imageUrl} 
                alt={currentBusiness.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {currentBusiness.name}
                </h1>
                {currentBusiness.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verificado DinAcitY</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {currentBusiness.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Badge category={currentBusiness.category} />
                <span className="text-xs text-slate-400">
                  {currentBusiness.city} • En DinAcitY desde {new Date(currentBusiness.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Business Switcher & Actions */}
          <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto justify-end">
            {businesses.length > 1 && (
              <div className="w-full sm:w-auto">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Gestionando cuenta:
                </label>
                <select
                  value={currentBusiness.id}
                  onChange={(e) => onSelectBusiness(e.target.value)}
                  aria-label="Seleccionar empresa para administrar"
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 hover:bg-white outline-none focus:border-emerald-500 transition-colors"
                >
                  {businesses.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.category})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={() => onPreviewPublic(currentBusiness)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <span>Ver Ficha Pública</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-100 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* TAB CONTENT: 1. RESUMEN EJECUTIVO */}
      {activeTab === 'resumen' && analytics && (
        <div className="space-y-6">
          {/* KPI Summary Cards */}
          <MetricsSummaryCards summary={analytics.summary} />

          {/* Quick Trend Chart */}
          <TrafficTrendChart
            data={analytics.timeSeries}
            period={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />

          {/* Quick 2-column view: Demand by Day + Service breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeeklyDistributionChart data={analytics.dayDemand} />
            <HourlyDistributionChart data={analytics.hourlyDemand} />
          </div>

          {/* Funnel teaser */}
          <ConversionFunnel stages={analytics.funnel} />
        </div>
      )}

      {/* TAB CONTENT: 2. ESTADÍSTICAS & GRÁFICOS AVANZADOS */}
      {activeTab === 'analiticas' && analytics && (
        <div className="space-y-6">
          <MetricsSummaryCards summary={analytics.summary} />

          {/* Main Traffic & Revenue Chart */}
          <TrafficTrendChart
            data={analytics.timeSeries}
            period={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />

          {/* Conversion Funnel */}
          <ConversionFunnel stages={analytics.funnel} />

          {/* Demand by Service Donut */}
          <ServiceDemandChart data={analytics.servicePerformance} />

          {/* Day of Week + Hourly Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeeklyDistributionChart data={analytics.dayDemand} />
            <HourlyDistributionChart data={analytics.hourlyDemand} />
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. CATÁLOGO DE SERVICIOS */}
      {activeTab === 'servicios' && analytics && (
        <ServicesManager
          business={currentBusiness}
          servicePerformance={analytics.servicePerformance}
          onUpdateServices={(newServices) => {
            onUpdateBusiness(currentBusiness.id, { services: newServices });
          }}
        />
      )}

      {/* TAB CONTENT: 4. CALIFICACIONES & REPUTACIÓN */}
      {activeTab === 'reputacion' && analytics && (
        <RatingReputationSection
          business={currentBusiness}
          ratingStats={analytics.ratingStats}
        />
      )}

      {/* TAB CONTENT: 5. DATOS DE LA EMPRESA & HORARIOS */}
      {activeTab === 'empresa' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-600" />
                <span>Perfil Comercial y Datos de Atención</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                La información que ingreses aquí se refleja en tiempo real en la ficha pública de DinAcitY Service.
              </p>
            </div>

            {saveSuccess && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Cambios guardados con éxito!</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nombre de la Empresa / Comercio *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Eslogan / Frase Breve
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Descripción Detallada del Negocio
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  WhatsApp Receptor (Sin 0 ni 15) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-emerald-600">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ej. 5491122334455"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Teléfono Fijo / Alternativo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Opcional"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email de Contacto
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@empresa.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Dirección Física
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ciudad / Zona
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Horario Habitual (Lunes a Viernes)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <Clock className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={weekdaysHours}
                    onChange={(e) => setWeekdaysHours(e.target.value)}
                    placeholder="Ej. 08:30 a 18:30"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Horario Sábados
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">
                    <Clock className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={saturdayHours}
                    onChange={(e) => setSaturdayHours(e.target.value)}
                    placeholder="Ej. 09:00 a 13:00 o Cerrado"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios de la Empresa</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: 6. SIMULADOR DE CRECIMIENTO */}
      {activeTab === 'simulador' && analytics && (
        <GrowthSimulator summary={analytics.summary} />
      )}

    </div>
  );
};
