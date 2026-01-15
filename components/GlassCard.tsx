import React, { ReactNode } from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'fuchsia' | 'cyan' | 'violet' | 'emerald';
  noHeader?: boolean; // Option to hide the "window header"
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  style,
  variant = 'default',
  noHeader = false,
  ...props
}) => {
  
  // Mapping variant ke warna border/accent
  const borderColor = {
    default: 'border-slate-800 group-hover:border-slate-500',
    fuchsia: 'border-fuchsia-900/50 group-hover:border-fuchsia-500',
    cyan: 'border-cyan-900/50 group-hover:border-cyan-400',
    violet: 'border-violet-900/50 group-hover:border-violet-400',
    emerald: 'border-emerald-900/50 group-hover:border-emerald-400',
  }[variant];

  // Efek Glow Shadow saat Hover
  const shadowColor = {
    default: 'hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]',
    fuchsia: 'hover:shadow-[0_0_40px_-10px_rgba(217,70,239,0.3)]',
    cyan: 'hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]',
    violet: 'hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]',
    emerald: 'hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]',
  }[variant];

  const headerColor = {
    default: 'bg-slate-900 group-hover:bg-slate-800',
    fuchsia: 'bg-fuchsia-950/30 group-hover:bg-fuchsia-900/40',
    cyan: 'bg-cyan-950/30 group-hover:bg-cyan-900/40',
    violet: 'bg-violet-950/30 group-hover:bg-violet-900/40',
    emerald: 'bg-emerald-950/30 group-hover:bg-emerald-900/40',
  }[variant];

  return (
    <div 
      className={`
        group relative w-full h-full
        bg-[#0A0A0A]/90 backdrop-blur-md
        border ${borderColor}
        rounded-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1 /* Efek Levitasi */
        ${shadowColor} /* Efek Glow */
        overflow-hidden
        flex flex-col
        ${className}
      `}
      style={style}
      {...props}
    >
      {/* Window Header (Fake Titlebar) */}
      {!noHeader && (
        <div className={`h-6 w-full ${headerColor} border-b border-white/5 flex items-center px-2 gap-2 shrink-0 transition-colors duration-300`}>
          <div className="flex gap-1.5">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${variant === 'default' ? 'bg-slate-600 group-hover:bg-slate-400' : 'bg-' + (variant === 'violet' ? 'purple' : variant) + '-500 group-hover:brightness-125'} opacity-50 group-hover:opacity-100`} />
            <div className="w-2 h-2 rounded-full bg-slate-700 opacity-30 group-hover:bg-yellow-500 group-hover:opacity-100 transition-all duration-300" />
            <div className="w-2 h-2 rounded-full bg-slate-700 opacity-30 group-hover:bg-green-500 group-hover:opacity-100 transition-all duration-300" />
          </div>
          <div className="ml-auto w-full h-[1px] bg-white/5" />
        </div>
      )}

      {/* Content Area */}
      <div className="p-0 flex-1 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;