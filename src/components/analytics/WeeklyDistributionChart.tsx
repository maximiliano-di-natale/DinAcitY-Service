import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';
import { DayDemand } from '../../types/analytics';
import { CalendarDays, Flame } from 'lucide-react';

interface WeeklyDistributionChartProps {
  data: DayDemand[];
}

export const WeeklyDistributionChart: React.FC<WeeklyDistributionChartProps> = ({ data }) => {
  const peakDay = data.find(d => d.isPeakDay) || data[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Demanda por Día de la Semana
            </h3>
          </div>
          {peakDay && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              Pico: {peakDay.dayName}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Distribución de contactos de clientes en WhatsApp según el día para planificar tu disponibilidad operativa.
        </p>

        {/* Bar Chart */}
        <div className="w-full h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="shortName" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as DayDemand;
                    return (
                      <div className="bg-slate-900 text-white rounded-xl p-2.5 shadow-lg border border-slate-800 text-xs">
                        <p className="font-bold text-slate-200">{item.dayName}</p>
                        <p className="text-emerald-400 font-extrabold text-sm">
                          {item.inquiries} contactos ({item.percentage}%)
                        </p>
                        {item.isPeakDay && (
                          <p className="text-[10px] text-amber-300 font-medium mt-1">
                            🔥 Día con mayor actividad comercial
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="inquiries" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isPeakDay ? '#10b981' : '#cbd5e1'} 
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Mayor volumen: <strong className="text-slate-800">{peakDay.dayName}</strong> ({peakDay.percentage}% del total)</span>
        <span className="text-[11px] text-emerald-600 font-semibold">100% distribuido</span>
      </div>
    </div>
  );
};
