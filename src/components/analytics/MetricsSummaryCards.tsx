import React from 'react';
import { 
  Eye, 
  MessageCircle, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles
} from 'lucide-react';
import { ProviderMetricsSummary } from '../../types/analytics';

interface MetricsSummaryCardsProps {
  summary: ProviderMetricsSummary;
}

export const MetricsSummaryCards: React.FC<MetricsSummaryCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      
      {/* 1. Visualizaciones de Perfil */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Vistas de Perfil
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Eye className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-slate-900 tracking-tight">
          {summary.totalViews.toLocaleString()}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          {summary.viewsDelta >= 0 ? (
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +{summary.viewsDelta}%
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              {summary.viewsDelta}%
            </span>
          )}
          <span className="text-[11px] text-slate-400">vs período ant.</span>
        </div>
      </div>

      {/* 2. Clics WhatsApp */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-emerald-200 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Chats WhatsApp
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-emerald-600 tracking-tight">
          {summary.totalWhatsAppClicks.toLocaleString()}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          {summary.whatsappDelta >= 0 ? (
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +{summary.whatsappDelta}%
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              {summary.whatsappDelta}%
            </span>
          )}
          <span className="text-[11px] text-slate-400">contactos directos</span>
        </div>
      </div>

      {/* 3. Tasa de Conversión */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-indigo-200 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Tasa Conversión
          </span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-indigo-700 tracking-tight">
          {summary.conversionRate}%
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[11px] font-semibold text-slate-500">
            {summary.conversionDelta >= 0 ? `+${summary.conversionDelta}%` : `${summary.conversionDelta}%`}
          </span>
          <span className="text-[11px] text-slate-400">de vistas a chat</span>
        </div>
      </div>

      {/* 4. Trabajos Concretados */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-amber-200 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Trabajos Cerrados
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-slate-900 tracking-tight">
          {summary.estimatedJobs}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
            {summary.closingRate}% de cierre
          </span>
        </div>
      </div>

      {/* 5. Facturación Estimada */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-emerald-200 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Ingresos Estimados
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight truncate">
          ${summary.estimatedTotalRevenue.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {summary.revenueDelta >= 0 ? (
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              +{summary.revenueDelta}%
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-bold text-rose-600">
              {summary.revenueDelta}%
            </span>
          )}
          <span className="text-[11px] text-slate-400">ticket: ${summary.estimatedAverageTicket.toLocaleString()}</span>
        </div>
      </div>

      {/* 6. Tiempo de Respuesta */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Tiempo Respuesta
          </span>
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-slate-800 tracking-tight">
          ~{summary.averageResponseMinutes} min
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <Sparkles className="w-3 h-3" /> Excelente agilidad
          </span>
        </div>
      </div>

    </div>
  );
};
