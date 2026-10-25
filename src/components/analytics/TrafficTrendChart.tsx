import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { TimeSeriesPoint, TimePeriod } from '../../types/analytics';
import { TrendingUp, Calendar, Info } from 'lucide-react';

interface TrafficTrendChartProps {
  data: TimeSeriesPoint[];
  period: TimePeriod;
  onPeriodChange: (p: TimePeriod) => void;
}

export const TrafficTrendChart: React.FC<TrafficTrendChartProps> = ({
  data,
  period,
  onPeriodChange
}) => {
  const [metricView, setMetricView] = useState<'traffic' | 'revenue'>('traffic');

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
      
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {metricView === 'traffic' 
                ? 'Tendencia de Tráfico y Contactos WhatsApp' 
                : 'Evolución de Ingresos y Trabajos Concretados'}
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              Matemáticamente Correlacionado
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {metricView === 'traffic'
              ? 'Comparativa temporal entre usuarios que vieron tu perfil y los que hicieron clic en WhatsApp.'
              : 'Estimación de ingresos calculados en base al ticket promedio por trabajo cerrado.'}
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode toggle */}
          <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMetricView('traffic')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                metricView === 'traffic'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Tráfico & Chats
            </button>
            <button
              type="button"
              onClick={() => setMetricView('revenue')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                metricView === 'revenue'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Ingresos ($)
            </button>
          </div>

          {/* Time range buttons */}
          <div className="inline-flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            {(['7d', '30d', '90d', '1y'] as TimePeriod[]).map((p) => {
              const labelMap: Record<TimePeriod, string> = {
                '7d': '7D',
                '30d': '30D',
                '90d': '90D',
                '1y': '1 Año'
              };
              const isActive = period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPeriodChange(p)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {labelMap[p]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="label" 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => metricView === 'revenue' ? `$${(v / 1000).toFixed(0)}k` : `${v}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white rounded-xl p-3 shadow-lg border border-slate-800 text-xs space-y-1.5">
                      <p className="font-bold text-slate-300 pb-1 border-b border-slate-800">{label}</p>
                      {payload.map((entry, index) => (
                        <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span>{entry.name}:</span>
                          </span>
                          <span className="font-extrabold text-white">
                            {metricView === 'revenue' && entry.dataKey === 'estimatedRevenue'
                              ? `$${Number(entry.value).toLocaleString()}`
                              : Number(entry.value).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: 16, fontSize: 12 }} 
              formatter={(value) => <span className="font-semibold text-slate-700">{value}</span>}
            />
            
            {metricView === 'traffic' ? (
              <>
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Visualizaciones Perfil"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="whatsappClicks"
                  name="Consultas WhatsApp"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                />
              </>
            ) : (
              <>
                <Area
                  type="monotone"
                  dataKey="estimatedRevenue"
                  name="Facturación Estimada ($)"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info badge */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="inline-flex items-center gap-1">
          <Info className="w-3.5 h-3.5" />
          Datos trazados día por día garantizando que la suma temporal coincida con tus métricas totales.
        </span>
        <span className="font-semibold text-slate-600 hidden sm:inline">
          {data.length} puntos de muestreo
        </span>
      </div>

    </div>
  );
};
