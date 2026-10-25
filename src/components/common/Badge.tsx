import React from 'react';
import { CategoryId } from '../../types';

interface BadgeProps {
  category?: CategoryId;
  label?: string;
  variant?: 'category' | 'verified' | 'accent' | 'neutral';
  className?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  mecanica: 'Mecánica & Autos',
  gastronomia: 'Gastronomía',
  reparaciones: 'Hogar & Reparaciones',
  profesionales: 'Profesionales',
  estetica: 'Estética & Belleza',
  salud: 'Salud',
  mascotas: 'Mascotas',
  todos: 'General'
};

const CATEGORY_COLORS: Record<string, string> = {
  mecanica: 'bg-blue-50 text-blue-700 border-blue-200/60',
  gastronomia: 'bg-amber-50 text-amber-700 border-amber-200/60',
  reparaciones: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  profesionales: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  estetica: 'bg-rose-50 text-rose-700 border-rose-200/60',
  salud: 'bg-teal-50 text-teal-700 border-teal-200/60',
  mascotas: 'bg-purple-50 text-purple-700 border-purple-200/60',
  todos: 'bg-slate-100 text-slate-700 border-slate-200'
};

export const Badge: React.FC<BadgeProps> = ({
  category,
  label,
  variant = 'category',
  className = ''
}) => {
  if (variant === 'verified') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${className}`}>
        <svg className="w-3.5 h-3.5 text-emerald-600 fill-current" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {label || 'Verificado'}
      </span>
    );
  }

  if (category) {
    const colorClass = CATEGORY_COLORS[category] || 'bg-slate-100 text-slate-700 border-slate-200';
    const text = label || CATEGORY_LABELS[category] || category;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
      {label}
    </span>
  );
};
