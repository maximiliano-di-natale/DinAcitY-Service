import React from 'react';
import { HourlySlotDemand } from '../../types/analytics';
import { Clock, Zap } from 'lucide-react';

interface HourlyDistributionChartProps {
  data: HourlySlotDemand[];
}

export const HourlyDistributionChart: React.FC<HourlyDistributionChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Franjas Horarias de Mayor Interés
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
            <Zap className="w-3 h-3 text-indigo-600" />
            Atención Rápida
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Horarios en los que los usuarios inician conversaciones en WhatsApp para optimizar tu tiempo de respuesta.
        </p>

        {/* Progress bars list */}
        <div className="space-y-3.5">
          {data.map((slot, idx) => {
            const isPico = slot.level === 'pico';
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{slot.hourRange}</span>
                    <span className="text-[11px] text-slate-400">({slot.label})</span>
                    {isPico && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Horario Pico
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{slot.inquiries}</span>
                    <span className="text-slate-400 font-medium">({slot.percentage}%)</span>
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPico 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                        : slot.level === 'medio'
                          ? 'bg-indigo-400'
                          : 'bg-slate-300'
                    }`}
                    style={{ width: `${Math.max(slot.percentage, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
        <span>💡 Tip: Responder dentro de los primeros 10 min duplica el cierre de ventas.</span>
      </div>
    </div>
  );
};
