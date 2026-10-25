import React, { useState } from 'react';
import { ProviderMetricsSummary } from '../../types/analytics';
import { Calculator, TrendingUp, DollarSign, Sparkles, Target, ArrowRight } from 'lucide-react';

interface GrowthSimulatorProps {
  summary: ProviderMetricsSummary;
}

export const GrowthSimulator: React.FC<GrowthSimulatorProps> = ({ summary }) => {
  const [trafficIncreasePct, setTrafficIncreasePct] = useState<number>(50); // +50%
  const [conversionImprovementPts, setConversionImprovementPts] = useState<number>(2.0); // +2 puntos %

  // Cálculos matemáticos proyectados basados en las métricas reales del prestador
  const baseViews = summary.totalViews;
  const baseConversionRate = summary.conversionRate; // ej. 18.5%
  const baseClosingRate = summary.closingRate / 100; // ej. 0.52
  const avgTicket = summary.estimatedAverageTicket;

  // Nuevas vistas proyectadas
  const projectedViews = Math.round(baseViews * (1 + trafficIncreasePct / 100));
  const viewsDeltaAbsolute = projectedViews - baseViews;

  // Nueva tasa de conversión proyectada
  const projectedConversionRate = Number((baseConversionRate + conversionImprovementPts).toFixed(1));

  // Nuevos clics en WhatsApp proyectados
  const projectedClicks = Math.round(projectedViews * (projectedConversionRate / 100));
  const clicksDeltaAbsolute = Math.max(0, projectedClicks - summary.totalWhatsAppClicks);

  // Nuevos trabajos cerrados
  const projectedJobs = Math.round(projectedClicks * baseClosingRate);
  const jobsDeltaAbsolute = Math.max(0, projectedJobs - summary.estimatedJobs);

  // Nueva facturación total e incremento neto
  const projectedRevenue = projectedJobs * avgTicket;
  const revenueDeltaAbsolute = Math.max(0, projectedRevenue - summary.estimatedTotalRevenue);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/80">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Simulador Matemático de Crecimiento & ROI
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Proyecta cómo impactaría un aumento de tráfico o mejora de conversión en tu facturación mensual real.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 self-start sm:self-auto">
          <Sparkles className="w-4 h-4" />
          <span>Modelo Predictivo DinAcitY</span>
        </span>
      </div>

      {/* Control sliders & results grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Sliders Area (left 6 cols) */}
        <div className="lg:col-span-6 space-y-6 bg-white/5 p-5 rounded-2xl border border-white/10">
          
          {/* Slider 1: Aumento de Visibilidad / Visitas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="font-bold text-slate-200 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Incremento de Visualizaciones del Perfil</span>
              </label>
              <span className="font-extrabold text-emerald-400 text-sm sm:text-base">
                +{trafficIncreasePct}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={trafficIncreasePct}
              onChange={(e) => setTrafficIncreasePct(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>+10% (orgánico)</span>
              <span>+50% (destacado)</span>
              <span>+200% (campaña intensiva)</span>
            </div>
          </div>

          {/* Slider 2: Optimización de tasa de contacto */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="font-bold text-slate-200 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Optimización en WhatsApp / Tasa Contacto</span>
              </label>
              <span className="font-extrabold text-indigo-400 text-sm sm:text-base">
                +{conversionImprovementPts}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={conversionImprovementPts}
              onChange={(e) => setConversionImprovementPts(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0% (igual)</span>
              <span>+5% (respuesta rápida)</span>
              <span>+10% (ofertas atractivas)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <p>
              Basado en tu <strong>ticket promedio de ${avgTicket.toLocaleString()}</strong> y una tasa histórica de cierre de <strong>{summary.closingRate}%</strong>.
            </p>
          </div>

        </div>

        {/* Projection results cards (right 6 cols) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card: Clientes WhatsApp extra */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Chats WhatsApp Proyectados
              </span>
              <div className="text-3xl font-black text-white">
                {projectedClicks.toLocaleString()}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700/60">
              <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                +{clicksDeltaAbsolute} chats adicionales
              </span>
            </div>
          </div>

          {/* Card: Trabajos extras cerrados */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Trabajos Finalizados
              </span>
              <div className="text-3xl font-black text-amber-400">
                {projectedJobs.toLocaleString()}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700/60">
              <span className="inline-flex items-center text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                +{jobsDeltaAbsolute} nuevos clientes
              </span>
            </div>
          </div>

          {/* Large Card: Ingresos Extras Proyectados */}
          <div className="sm:col-span-2 bg-gradient-to-r from-emerald-900/60 to-teal-900/40 rounded-2xl p-6 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Facturación Extra Estimada</span>
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-300">
                +${revenueDeltaAbsolute.toLocaleString()}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Llegando a un ingreso mensual total proyectado de <strong>${projectedRevenue.toLocaleString()}</strong>.
              </p>
            </div>

            <div className="shrink-0">
              <div className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs sm:text-sm text-center shadow-lg">
                ROI Positivo
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
