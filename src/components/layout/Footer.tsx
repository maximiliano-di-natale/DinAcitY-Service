import React from 'react';
import { Layers, ShieldCheck, Zap, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { ViewMode } from '../../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Layers className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">
                  Dinacity
                </span>
                <span className="text-2xl font-light tracking-tight text-emerald-400">
                  Service
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              El gran puente e intermediario digital independiente que conecta de forma transparente a usuarios con las mejores empresas y profesionales de todos los rubros. Facilitamos el contacto directo e inmediato sin comisiones ocultas.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Negocios Verificados</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Contacto Directo WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <HeartHandshake className="w-4 h-4 text-cyan-400" />
                <span>100% Independiente</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-400"
                >
                  Directorio de Servicios
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-400"
                >
                  Publicar mi Empresa
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-400"
                >
                  Panel de Estadísticas
                </button>
              </li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Rubros Principales
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Mecánica Ligera & Talleres Automotores</li>
              <li>Gastronomía, Catering & Viandas</li>
              <li>Electricidad, Plomería & Reparaciones</li>
              <li>Servicios Legales & Contables</li>
              <li>Estética, Barberías & Cuidado Personal</li>
              <li>Salud, Kinesiología & Masajes</li>
              <li>Clínicas Veterinarias & Cuidado Animal</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dinacity Service. Todos los derechos reservados. Desarrollado como plataforma independiente de intermediación de servicios.</p>
          <p className="flex items-center gap-1">
            <span>Diseñado con arquitectura Mobile-First & React</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
