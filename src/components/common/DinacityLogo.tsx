import React from 'react';

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
  xs: { box: 24, icon: 16 },
  sm: { box: 32, icon: 22 },
  md: { box: 42, icon: 28 },
  lg: { box: 52, icon: 36 },
  xl: { box: 64, icon: 44 },
  '2xl': { box: 80, icon: 56 }
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
    ? { box: size, icon: Math.round(size * 0.7) } 
    : sizeMap[size] || sizeMap.md;

  // The pure vector SVG emblem with the brand gradient
  const renderEmblem = (width = pixelSize.icon, height = Math.round(width * 68 / 72)) => (
    <svg 
      viewBox="0 0 72 68" 
      width={width} 
      height={height} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200"
      aria-label="Dinacity Service Logo"
    >
      <defs>
        <linearGradient id="dinacityBrandGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0056D6" />
          <stop offset="40%" stopColor="#0072E5" />
          <stop offset="70%" stopColor="#1DB954" />
          <stop offset="100%" stopColor="#34C759" />
        </linearGradient>
      </defs>

      <g fill="url(#dinacityBrandGrad)" stroke="url(#dinacityBrandGrad)">
        {/* Outer 'D' Top Bar & Upper Outer Arc */}
        <path 
          d="M 2 9 L 44 9 A 28 28 0 0 1 60 21 L 55 25 A 22 22 0 0 0 44 15 L 10 15 L 4 9 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />

        {/* Outer 'D' Bottom Bar & Lower Outer Arc */}
        <path 
          d="M 66 38 A 28 28 0 0 1 44 65 L 18 65 L 24 59 L 44 59 A 22 22 0 0 0 60 41 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />

        {/* Left Vertical Spine of 'D' */}
        <path 
          d="M 8 18 L 14 18 L 14 43 L 8 43 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />

        {/* Inner Chevron */}
        <path 
          d="M 14 18 L 37 35 L 33 39 L 14 24 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />

        {/* Arrow Shaft: 45° continuous diagonal bar */}
        <path 
          d="M 1 65 L 8 65 L 60 13 L 54 9 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />

        {/* Arrowhead at Top-Right */}
        <path 
          d="M 67 2 L 52 5 L 56 10 L 59 13 L 67 17 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />

        {/* Mid Target Arc */}
        <path 
          d="M 44 19 A 18 18 0 0 1 54 24 L 51 28 A 14 14 0 0 0 44 23 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 58 40 A 18 18 0 0 1 44 55 L 44 50 A 13 13 0 0 0 53 39 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />

        {/* Inner Target Arc */}
        <path 
          d="M 44 27 A 10 10 0 0 1 49 30 L 47 33 A 7 7 0 0 0 44 30 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 52 40 A 9 9 0 0 1 44 46 L 44 42 A 6 6 0 0 0 49 39 Z" 
          strokeWidth="0.5" 
          strokeLinejoin="round" 
        />

        {/* Circuit Connection Node */}
        <circle cx="53" cy="44" r="2.5" />
      </g>
    </svg>
  );

  // Raw icon without wrapper
  if (variant === 'icon-plain') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderEmblem()}
      </div>
    );
  }

  // Icon with styled squircle badge container
  const iconElement = withContainer ? (
    <div 
      style={{ width: pixelSize.box, height: pixelSize.box }}
      className={`rounded-xl flex items-center justify-center shadow-md transition-all duration-200 ${
        theme === 'dark' 
          ? 'bg-slate-950/80 border border-slate-800 shadow-slate-950/50' 
          : 'bg-white border border-slate-200/80 shadow-slate-200/50 hover:border-blue-200'
      } ${containerClassName}`}
    >
      {renderEmblem()}
    </div>
  ) : (
    renderEmblem()
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
        <p className="text-[10px] sm:text-xs font-medium text-slate-400 tracking-wide mt-1">
          Tu puente a servicios locales confiables
        </p>
      </div>
    </div>
  );
};
