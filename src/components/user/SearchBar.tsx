import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultsCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar por servicio, rubro, empresa o zona (ej. Mecánica, Catering, Electricista)...',
  resultsCount
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-4.5 pointer-events-none text-slate-400">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 bg-white rounded-2xl border-2 border-slate-200/80 shadow-md shadow-slate-100 hover:border-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all duration-200 outline-none"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {resultsCount !== undefined && value && (
        <p className="mt-2 text-xs sm:text-sm text-slate-500 text-center">
          Se encontraron <span className="font-bold text-slate-800">{resultsCount}</span> resultados para "<span className="text-emerald-700 font-semibold">{value}</span>"
        </p>
      )}
    </div>
  );
};
