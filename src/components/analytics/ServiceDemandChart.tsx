import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { ServicePerformance } from '../../types/analytics';
import { PieChart as PieIcon, CheckCircle2 } from 'lucide-react';

interface ServiceDemandChartProps {
  data: ServicePerformance[];
}

const COLORS = [
  '#10b981', // emerald
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#f59e0b', // amber
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#64748b'  // slate
];

export const ServiceDemandChart: React.FC<ServiceDemandChartProps> = ({ data }) => {
  // Verificación matemática de la suma de porcentajes
  const totalPercentage = Number(data.reduce((acc, s) => acc + s.sharePercentage, 0).toFixed(1));

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PieIcon className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Distribución de Consultas por Servicio
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Qué servicios específicos despiertan mayor interés entre los usuarios que te contactan.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Suma: {totalPercentage}% verificado</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Pie / Donut Chart */}
        <div className="lg:col-span-5 h-56 sm:h-64 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as ServicePerformance;
                    return (
                      <div className="bg-slate-900 text-white rounded-xl p-3 shadow-lg border border-slate-800 text-xs space-y-1">
                        <p className="font-bold text-slate-200">{item.serviceName}</p>
                        <p className="text-emerald-400 font-extrabold text-sm">
                          {item.inquiries} contactos ({item.sharePercentage}%)
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          Tarifa estimada: ${item.estimatedPrice.toLocaleString()}
                        </p>
                        <p className="text-slate-300 font-semibold text-[11px] pt-1 border-t border-slate-800">
                          Ingresos calculados: ${item.estimatedRevenue.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={data}
                dataKey="inquiries"
                nameKey="serviceName"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`pie-cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center text in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Servicios</span>
            <span className="text-xl font-black text-slate-800">{data.length}</span>
          </div>
        </div>

        {/* Legend & Breakdown Table */}
        <div className="lg:col-span-7 space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {data.map((srv, index) => {
            const color = COLORS[index % COLORS.length];
            return (
              <div 
                key={srv.serviceId}
                className="p-3 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/60 hover:bg-white transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span 
                    className="w-3 h-3 rounded-full shrink-0" 
                    style={{ backgroundColor: color }}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">
                      {srv.serviceName}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Precio ref: ${srv.estimatedPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="font-extrabold text-slate-900">{srv.inquiries} chats</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {srv.sharePercentage}%
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    ${srv.estimatedRevenue.toLocaleString()} est.
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
