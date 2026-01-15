import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#050505] overflow-hidden">
      
      {/* Ambient Glow Orbs for Depth & Reflection */}
      {/* Top Left - Fuchsia/Pink Glow */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none" />
      
      {/* Bottom Right - Cyan/Blue Glow */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
      
      {/* Center - Subtle Emerald Hint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-emerald-900/5 blur-[100px] pointer-events-none" />

      {/* 1. Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* 3. Random Matrix-like hints (Abstract) */}
      <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-emerald-900/20 to-transparent opacity-50" />
      <div className="absolute top-0 left-20 w-px h-full bg-gradient-to-b from-transparent via-cyan-900/20 to-transparent opacity-50" />
      <div className="absolute top-1/4 right-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-900/20 to-transparent opacity-50" />

      {/* 4. Noise Texture (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default Background;