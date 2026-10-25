import React from 'react';
import { 
  LayoutGrid, 
  Wrench, 
  Utensils, 
  Hammer, 
  Briefcase, 
  Sparkles, 
  HeartPulse, 
  PawPrint 
} from 'lucide-react';
import { CategoryId } from '../../types';
import { CATEGORIES } from '../../data/mockBusinesses';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
  businessCounts?: Record<string, number>;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutGrid,
  Wrench,
  Utensils,
  Hammer,
  Briefcase,
  Sparkles,
  HeartPulse,
  PawPrint
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  businessCounts = {}
}) => {
  return (
    <div className="w-full">
      {/* Scrollable container for mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const IconComponent = ICON_MAP[cat.iconName] || LayoutGrid;
          const count = cat.id === 'todos' 
            ? Object.values(businessCounts).reduce((a, b) => a + b, 0)
            : businessCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
              <span>{cat.name}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-emerald-700/80 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
