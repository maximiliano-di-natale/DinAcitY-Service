import React from 'react';
import logoImg from '../../assets/logo.png';

export interface DinacityLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  variant?: 'icon' | 'icon-plain' | 'full' | 'horizontal';
  withContainer?: boolean;
  containerClassName?: string;
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
  theme?: 'light' | 'dark';
}

const sizeMap = {
  xs: { box: 24, icon: 20 },
  sm: { box: 32, icon: 28 },
  md: { box: 44, icon: 38 },
  lg: { box: 56, icon: 48 },
  xl: { box: 72, icon: 62 },
  '2xl': { box: 96, icon: 84 }
};

export const DinacityLogo: React.FC<DinacityLogoProps> = ({
  size = 'md',
  variant = 'icon',
  withContainer = false,
  containerClassName = '',
  className = '',
  showSubtitle = true,
  subtitleText = 'Panel Prestador',
  theme = 'light'
}) => {
  const pixelSize = typeof size === 'number' 
    ? { box: size, icon: Math.round(size * 0.85) } 
    : sizeMap[size] || sizeMap.md;

  const renderImage = (width = pixelSize.icon) => (
    <img 
      src={logoImg}
      alt="Dinacity Service Logo"
      style={{ width: `${width}px`, height: `${width}px` }}
      className="shrink-0 object-contain transition-transform duration-200"
    />
  );

  if (variant === 'icon-plain') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderImage()}
      </div>
    );
  }

  const iconElement = withContainer ? (
    <div 
      style={{ width: pixelSize.box, height: pixelSize.box }}
      className={`rounded-xl flex items-center justify-center p-1 shadow-sm transition-all duration-200 ${
        theme === 'dark' 
          ? 'bg-slate-900 border border-slate-800' 
          : 'bg-white border border-slate-200 shadow-slate-200/50'
      } ${containerClassName}`}
    >
      {renderImage()}
    </div>
  ) : (
    renderImage()
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {iconElement}
      </div>
    );
  }

  // Horizontal logo (Icon + Text side-by-side)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {iconElement}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`text-xl sm:text-2xl font-black tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#0056D6]'
          }`}>
            Dinacity
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#34C759]">
            Service
          </span>
          {showSubtitle && subtitleText && (
            <span className="ml-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300">
              {subtitleText}
            </span>
          )}
        </div>
        <p className="text-[10px] sm:text-xs font-medium text-slate-400 tracking-wide mt-1 uppercase">
          Portal de Gestión & Analíticas Comerciales
        </p>
      </div>
    </div>
  );
};
