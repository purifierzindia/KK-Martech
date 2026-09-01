import React from 'react';

interface LogoProps {
  variant?: 'compact' | 'full' | 'hero';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'compact', className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer group select-none ${className}`}
      id="brand-logo"
    >
      {/* Emblem SVG: dual K monogram in gold & silver with upward growth arrow and tech pixel matrix */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className={
            variant === 'hero'
              ? 'w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]'
              : variant === 'full'
              ? 'w-11 h-11'
              : 'w-9 h-9 md:w-10 md:h-10'
          }
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gold Gradients */}
            <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2C6" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8C6811" />
            </linearGradient>
            <linearGradient id="goldGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5D77F" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#E2BD48" />
            </linearGradient>
            {/* Silver Platinum Gradients */}
            <linearGradient id="silverGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="silverGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            {/* Shadow filter */}
            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Background subtle dark backing */}
          <rect width="100" height="100" rx="20" fill="#0D0D10" stroke="#26262B" strokeWidth="1.5" />
          
          <g filter="url(#logoShadow)">
            {/* Silver Secondary 'K' in background */}
            <path
              d="M48 24 L56 24 L56 76 L48 76 Z"
              fill="url(#silverGrad2)"
              opacity="0.9"
            />
            <path
              d="M54 50 L74 24 L84 24 L62 53 L86 76 L75 76 L54 53 Z"
              fill="url(#silverGrad1)"
            />

            {/* Gold Primary 'K' in foreground */}
            <path
              d="M22 20 L31 20 L31 80 L22 80 Z"
              fill="url(#goldGrad1)"
            />
            <path
              d="M31 52 L52 24 L64 24 L40 55 L65 80 L52 80 L31 56 Z"
              fill="url(#goldGrad2)"
            />

            {/* Rising Swoop Growth Arrow */}
            <path
              d="M16 68 C 12 55, 20 40, 36 34 C 48 30, 62 26, 75 14"
              stroke="url(#goldGrad1)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Arrowhead */}
            <polygon
              points="75,10 82,13 77,20 72,17"
              fill="url(#goldGrad1)"
            />

            {/* Tech Pixel matrix */}
            <rect x="76" y="28" width="4" height="4" rx="0.5" fill="url(#silverGrad1)" />
            <rect x="83" y="32" width="3.5" height="3.5" rx="0.5" fill="url(#goldGrad1)" />
            <rect x="80" y="39" width="4" height="4" rx="0.5" fill="url(#silverGrad1)" />
            <rect x="87" y="42" width="3" height="3" rx="0.5" fill="url(#goldGrad2)" />
          </g>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight leading-none">
          <span className="font-heading font-extrabold text-lg md:text-xl text-[#F5D77F] tracking-wide">
            KK
          </span>
          <span className="font-heading font-bold text-lg md:text-xl text-white ml-1.5 tracking-wider">
            MARTECH
          </span>
        </div>
        <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.22em] text-[#9CA3AF] uppercase mt-0.5 whitespace-nowrap group-hover:text-[#D4AF37] transition-colors">
          MARKETING <span className="text-[#D4AF37] font-bold">×</span> TECH <span className="text-[#D4AF37] font-bold">×</span> AI
        </span>
      </div>
    </div>
  );
};
