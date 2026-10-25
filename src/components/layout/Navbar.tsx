import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { 
  BarChart3, 
  PlusCircle, 
  Compass, 
  Menu, 
  X, 
  Sparkles,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  businessCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  businessCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Layers className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Dinacity
                </span>
                <span className="text-xl sm:text-2xl font-light tracking-tight text-emerald-600">
                  Service
                </span>
                <span className="ml-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                  Panel Prestador
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-slate-400 tracking-wide uppercase">
                Portal de Gestión & Analíticas Comerciales
              </p>
            </div>
          </div>

          {/* Desktop Navigation Modes */}
          <nav className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/70">
            <button
              type="button"
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                currentView === 'dashboard'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${currentView === 'dashboard' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Mi Panel & Estadísticas</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('register')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                currentView === 'register'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <PlusCircle className={`w-4 h-4 ${currentView === 'register' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Registrar Empresa</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('explore')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                currentView === 'explore'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Compass className={`w-4 h-4 ${currentView === 'explore' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Directorio ({businessCount})</span>
            </button>
          </nav>

          {/* Action Button: Prestador badge / quick switch */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Conexión Segura</span>
            </div>
            <button
              type="button"
              onClick={() => handleNavClick('register')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Nueva Empresa</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <button
            type="button"
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
              currentView === 'dashboard'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>Mi Panel & Estadísticas</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('register')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
              currentView === 'register'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-5 h-5 text-emerald-600" />
              <span>Registrar Nueva Empresa</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
              Gratis
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('explore')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
              currentView === 'explore'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-slate-500" />
              <span>Directorio Público</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-200 text-slate-800 font-bold">
              {businessCount}
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
