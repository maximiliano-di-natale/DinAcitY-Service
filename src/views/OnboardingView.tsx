import React from 'react';
import { BusinessRegistrationForm } from '../components/business/BusinessRegistrationForm';
import { ArrowLeft, Users, Shield, Zap } from 'lucide-react';
import { ViewMode } from '../types';

interface OnboardingViewProps {
  onRegister: Parameters<typeof BusinessRegistrationForm>[0]['onSubmit'];
  onNavigate: (view: ViewMode) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onRegister,
  onNavigate
}) => {
  return (
    <div className="space-y-8">
      
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Directorio de Servicios</span>
        </button>
      </div>

      {/* Top Banner Info */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 uppercase tracking-wider backdrop-blur-md">
            Plataforma para Empresas & Prestadores
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
            Suma tu negocio a Dinacity Service y llega a más clientes
          </h1>
          <p className="text-emerald-100 text-xs sm:text-base leading-relaxed">
            Actuamos como tu vitrina digital y puente directo con personas que necesitan tus servicios. Sin comisiones por venta: el usuario te escribe directamente por WhatsApp.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="flex items-center gap-2 text-xs font-medium bg-black/15 p-2 rounded-xl backdrop-blur-sm">
              <Users className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Visibilidad en tu zona</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-black/15 p-2 rounded-xl backdrop-blur-sm">
              <Zap className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Consultas por WhatsApp</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-black/15 p-2 rounded-xl backdrop-blur-sm">
              <Shield className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Perfil verificado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div>
        <BusinessRegistrationForm
          onSubmit={onRegister}
          onCancel={() => onNavigate('explore')}
        />
      </div>

    </div>
  );
};
