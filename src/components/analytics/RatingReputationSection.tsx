import React from 'react';
import { Star, MessageSquare, ThumbsUp, Award, CheckCircle } from 'lucide-react';
import { RatingStats } from '../../types/analytics';
import { Business } from '../../types';

interface RatingReputationSectionProps {
  business: Business;
  ratingStats: RatingStats;
}

export const RatingReputationSection: React.FC<RatingReputationSectionProps> = ({
  business,
  ratingStats
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Calificaciones y Reputación Ponderada
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cálculo matemático de la media ponderada de satisfacción de clientes en DinAcitY Service.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 self-start sm:self-auto">
          <Award className="w-3.5 h-3.5" />
          <span>Prestador Destacado</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left score block */}
        <div className="md:col-span-4 bg-slate-50/80 rounded-2xl p-6 text-center border border-slate-200/80 flex flex-col items-center justify-center">
          <div className="text-5xl font-black text-slate-900 tracking-tight">
            {ratingStats.averageRating.toFixed(1)}
          </div>
          
          {/* Star row */}
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(ratingStats.averageRating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>

          <p className="text-xs font-medium text-slate-500">
            Basado en <strong className="text-slate-800">{ratingStats.totalReviews}</strong> valoraciones reales
          </p>

          <div className="mt-4 pt-4 border-t border-slate-200/70 w-full grid grid-cols-2 gap-2 text-center">
            <div>
              <span className="text-sm font-extrabold text-emerald-600 block">
                {ratingStats.satisfactionScore}%
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Satisfacción (CSAT)
              </span>
            </div>
            <div>
              <span className="text-sm font-extrabold text-indigo-600 block">
                +{ratingStats.recommendationRate}%
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Tasa Recom. (NPS)
              </span>
            </div>
          </div>
        </div>

        {/* Right Star Breakdown */}
        <div className="md:col-span-8 space-y-2.5">
          {ratingStats.breakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-slate-700 flex items-center gap-1 shrink-0">
                <span>{row.stars}</span>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </span>

              {/* Progress bar */}
              <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>

              <div className="w-20 text-right shrink-0">
                <span className="font-bold text-slate-800">{row.count}</span>
                <span className="text-slate-400 ml-1 text-[11px]">({row.percentage}%)</span>
              </div>
            </div>
          ))}
          
          <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Fórmula de media ponderada: Promedio = Σ(Estrellas × Opiniones) / Total, garantizando estricta coherencia decimal.
          </p>
        </div>

      </div>

      {/* Sample recent verified customer feedback */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
          <span>Últimas Opiniones de Clientes Verificados</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Martín G.</span>
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-slate-600">
              "Excelente atención y cumplimiento. Los contacté por el botón de WhatsApp de DinAcitY y me respondieron a los 5 minutos. Trabajo impecable."
            </p>
            <span className="text-[10px] text-slate-400 block">Hace 3 días • Cliente Verificado</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Lucía V.</span>
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-slate-600">
              "Muy profesionales y transparentes con el presupuesto. Los recomiendo 100% para la zona."
            </p>
            <span className="text-[10px] text-slate-400 block">Hace 1 semana • Cliente Verificado</span>
          </div>
        </div>
      </div>

    </div>
  );
};
