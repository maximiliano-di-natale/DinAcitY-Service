import React, { useState } from 'react';
import { Business, ServiceOffer } from '../../types';
import { ServicePerformance } from '../../types/analytics';
import { Briefcase, Plus, Trash2, Edit2, Check, DollarSign, Sparkles } from 'lucide-react';

interface ServicesManagerProps {
  business: Business;
  servicePerformance: ServicePerformance[];
  onUpdateServices: (services: ServiceOffer[]) => void;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({
  business,
  servicePerformance,
  onUpdateServices
}) => {
  const [services, setServices] = useState<ServiceOffer[]>(business.services || []);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newOffer: ServiceOffer = {
      id: `srv-${Date.now()}`,
      name: newServiceName.trim(),
      priceEstimate: newServicePrice.trim() ? `Desde $${newServicePrice.replace(/\D/g, '')}` : 'Consultar',
      description: newServiceDesc.trim() || undefined
    };

    const updated = [...services, newOffer];
    setServices(updated);
    onUpdateServices(updated);

    setNewServiceName('');
    setNewServicePrice('');
    setNewServiceDesc('');
    setIsAdding(false);
  };

  const handleDeleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    onUpdateServices(updated);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Catálogo de Servicios y Rendimiento Comercial
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Administra los servicios que visualizan tus clientes en DinAcitY Service y monitorea su cuota de consultas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancelar' : 'Agregar Servicio'}</span>
        </button>
      </div>

      {/* Add Service Inline Form */}
      {isAdding && (
        <form onSubmit={handleAddService} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nuevo Servicio a Publicar</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Nombre del Servicio *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Diagnóstico Computarizado o Asesoría Jurídica"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Precio Estimado (ARS)
              </label>
              <input
                type="number"
                placeholder="Ej. 25000"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Descripción Breve
            </label>
            <input
              type="text"
              placeholder="Ej. Incluye reporte digital y presupuesto sin cargo"
              value={newServiceDesc}
              onChange={(e) => setNewServiceDesc(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:border-emerald-500 outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              Guardar Servicio
            </button>
          </div>
        </form>
      )}

      {/* Services List Table */}
      <div className="divide-y divide-slate-100">
        {services.map((srv) => {
          const perf = servicePerformance.find(p => p.serviceId === srv.id);
          return (
            <div key={srv.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{srv.name}</h4>
                  {perf && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {perf.sharePercentage}% de demanda
                    </span>
                  )}
                </div>
                {srv.description && (
                  <p className="text-xs text-slate-500">{srv.description}</p>
                )}
                <span className="text-xs font-bold text-slate-700 inline-block mt-0.5">
                  {srv.priceEstimate || 'A convenir'}
                </span>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                {perf && (
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-slate-900 block">
                      {perf.inquiries} consultas
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ${perf.estimatedRevenue.toLocaleString()} est.
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteService(srv.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Eliminar servicio"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
