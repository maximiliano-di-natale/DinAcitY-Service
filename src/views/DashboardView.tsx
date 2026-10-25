import React from 'react';
import { Business } from '../types';
import { BusinessDashboard } from '../components/business/BusinessDashboard';
import { BusinessDetail } from '../components/user/BusinessDetail';
import { Modal } from '../components/common/Modal';
import { ArrowLeft, Sparkles } from 'lucide-react';
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
    <div className="space-y-8">
      
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Directorio de Servicios</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('register')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs sm:text-sm font-semibold border border-emerald-200 transition-colors self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Registrar otra empresa</span>
        </button>
      </div>

      {/* Main Dashboard Component */}
      <BusinessDashboard
        businesses={businesses}
        currentBusiness={currentBusiness}
        onSelectBusiness={onSelectBusiness}
        onUpdateBusiness={onUpdateBusiness}
        onPreviewPublic={(biz) => setPreviewBusiness(biz)}
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
