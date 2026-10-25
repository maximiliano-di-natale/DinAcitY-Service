import React from 'react';
import { Business } from '../types';
import { BusinessDashboard } from '../components/business/BusinessDashboard';
import { BusinessDetail } from '../components/user/BusinessDetail';
import { Modal } from '../components/common/Modal';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';
import { ViewMode } from '../types';

interface DashboardViewProps {
  businesses: Business[];
  currentBusiness: Business | null;
  onSelectBusiness: (id: string) => void;
  onUpdateBusiness: (id: string, updates: Partial<Business>) => void;
  onNavigate: (view: ViewMode) => void;
  onContactWhatsApp: (business: Business) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  businesses,
  currentBusiness,
  onSelectBusiness,
  onUpdateBusiness,
  onNavigate,
  onContactWhatsApp
}) => {
  const [previewBusiness, setPreviewBusiness] = React.useState<Business | null>(null);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Bar Quick Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Panel de Control del Prestador Activo
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">• DinAcitY Business Analytics</span>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>Ver como Usuario</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Registrar otra empresa</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Component */}
      <BusinessDashboard
        businesses={businesses}
        currentBusiness={currentBusiness}
        onSelectBusiness={onSelectBusiness}
        onUpdateBusiness={onUpdateBusiness}
        onPreviewPublic={(biz) => setPreviewBusiness(biz)}
        onRegisterNew={() => onNavigate('register')}
      />

      {/* Modal for Previewing Public Card */}
      {previewBusiness && (
        <Modal
          isOpen={!!previewBusiness}
          onClose={() => setPreviewBusiness(null)}
          maxWidth="4xl"
        >
          <BusinessDetail
            business={previewBusiness}
            onClose={() => setPreviewBusiness(null)}
            onContactWhatsApp={onContactWhatsApp}
          />
        </Modal>
      )}

    </div>
  );
};
