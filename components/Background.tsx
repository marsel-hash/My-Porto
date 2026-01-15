import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#030005] overflow-hidden">
      
      {/* Ambient Glow Orbs for Depth & Reflection - UPDATED TO PURPLE THEME */}
      {/* Top Left - Violet Glow */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[120px] pointer-events-none" />
      
      {/* Bottom Right - Fuchsia Glow */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/15 blur-[120px] pointer-events-none" />
      
      {/* Center - Deep Purple Hint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />

      {/* 1. Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(#33104a 1px, transparent 1px), linear-gradient(90deg, #33104a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,0,5,0.8)_100%)]" />

      {/* 3. Random Matrix-like hints (Abstract) */}
      <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-purple-900/30 to-transparent opacity-50" />
      <div className="absolute top-0 left-20 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-900/30 to-transparent opacity-50" />
      <div className="absolute top-1/4 right-0 w-full h-px bg-gradient-to-r from-transparent via-violet-900/30 to-transparent opacity-50" />
    </div>
  );
};

export default Background;