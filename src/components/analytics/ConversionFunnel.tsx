import React from 'react';
import { FunnelStage } from '../../types/analytics';
import { Filter, ArrowDown, Users, Eye, MessageCircle, CheckCircle } from 'lucide-react';

interface ConversionFunnelProps {
  stages: FunnelStage[];
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ stages }) => {
  const icons = [
    <Users className="w-4 h-4 text-slate-500" />,
    <Eye className="w-4 h-4 text-blue-600" />,
    <MessageCircle className="w-4 h-4 text-emerald-600" />,
    <CheckCircle className="w-4 h-4 text-amber-500" />
  ];

  const barColors = [
    'bg-slate-200 text-slate-800',
    'bg-blue-100 text-blue-900 border-l-4 border-blue-600',
    'bg-emerald-100 text-emerald-950 border-l-4 border-emerald-600',
    'bg-amber-100 text-amber-950 border-l-4 border-amber-600'
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Embudo Matemático de Conversión
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Paso a paso de cómo los usuarios de DinAcitY Service descubren tu empresa y se convierten en clientes de pago.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl self-start sm:self-auto">
          Tasa Global: {stages[stages.length - 1]?.rateFromTotal}%
        </span>
      </div>

      <div className="space-y-3">
        {stages.map((stage, idx) => {
          const isFirst = idx === 0;
          const barWidth = Math.max(stage.rateFromTotal, 14); // Mínimo para que el texto sea legible
          
          return (
            <div key={stage.id} className="group">
              
              {/* Connector arrow between stages */}
              {!isFirst && (
                <div className="flex items-center gap-2 pl-6 py-1 text-slate-400">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold text-slate-500">
                    Pasan a esta etapa: <strong className="text-slate-800">{stage.rateFromPrevious}%</strong>
                    <span className="text-slate-400 ml-1.5 font-normal">
                      (abandono / fuga: {stage.dropoffRate}%)
                    </span>
                  </span>
                </div>
              )}

              {/* Stage Card */}
              <div className={`p-4 rounded-2xl border transition-all ${barColors[idx % barColors.length]}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/80 shadow-xs flex items-center justify-center shrink-0">
                      {icons[idx % icons.length]}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {stage.name}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xl font-black text-slate-900">
                      {stage.count.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 block">
                      {stage.rateFromTotal}% del total
                    </span>
                  </div>
                </div>

                {/* Progress bar visually representing funnel width */}
                <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden">
                  <div 
                    className="h-full bg-slate-900 rounded-full transition-all duration-700"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Fórmulas: CTR = (Vistas / Impresiones) × 100 | Contacto = (WhatsApp / Vistas) × 100</span>
        <span className="font-semibold text-slate-600">Sin fugas aritméticas</span>
      </div>

    </div>
  );
};
