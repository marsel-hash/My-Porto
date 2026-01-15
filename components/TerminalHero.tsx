import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { useContent } from '../context/ContentContext';
import { Terminal, ShieldCheck } from 'lucide-react';

const TerminalHero: React.FC = () => {
  const { profile } = useContent();
  const [typedTitle, setTypedTitle] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  // State untuk menangani sumber gambar, default dari profile
  const [imgSrc, setImgSrc] = useState(profile.avatarUrl);
  const [hasError, setHasError] = useState(false);

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Update imgSrc jika profile berubah
  useEffect(() => {
    setImgSrc(profile.avatarUrl);
    setHasError(false);
  }, [profile.avatarUrl]);

  // Typing effect
  useEffect(() => {
    const fullText = profile.title;
    let i = 0;
    const typing = setInterval(() => {
      setTypedTitle(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(typing);
    }, 50);
    return () => clearInterval(typing);
  }, [profile.title]);

  const handleImgError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback ke avatar generator jika gambar lokal tidak ditemukan
      setImgSrc(`https://ui-avatars.com/api/?name=${profile.name}&background=701a75&color=fff&size=512&bold=true`);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: ASCII / Avatar Art */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <GlassCard variant="fuchsia" className="h-full p-6 relative flex flex-col items-center justify-center" noHeader>
             {/* Decorative Corner Borders */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-fuchsia-500"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-fuchsia-500"></div>
             
             <div className="flex items-center justify-center py-8">
                {/* 3D Stacked Avatar Effect */}
                <div className="relative group perspective-[1000px]">
                   
                   {/* Layer 1: Back Shadow/Solid Color */}
                   <div className="absolute inset-0 bg-fuchsia-600 rounded w-48 h-48 md:w-64 md:h-64 translate-x-4 translate-y-4 opacity-40 blur-[1px] group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-300 ease-out"></div>
                   
                   {/* Layer 2: Wireframe Offset */}
                   <div className="absolute inset-0 border-2 border-term-cyan/40 rounded w-48 h-48 md:w-64 md:h-64 translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-300 ease-out z-0"></div>

                   {/* Layer 3: Main Image (Front) */}
                   <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-slate-900 rounded border border-white/10 shadow-2xl overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
                      <img 
                        src={imgSrc} 
                        onError={handleImgError}
                        alt="avatar" 
                        className="w-full h-full object-cover" 
                      />
                      
                      {/* Hover Glint */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                   </div>
                </div>
             </div>
             
             <div className="mt-4 text-center md:text-left space-y-2 font-mono text-sm w-full px-4">
                <div className="text-slate-500 flex justify-between md:block">
                  <span>USER:</span> <span className="text-white">{profile.name.toLowerCase()}</span>
                </div>
                <div className="text-slate-500 flex justify-between md:block">
                  <span>HOST:</span> <span className="text-fuchsia-400">localhost</span>
                </div>
                <div className="text-slate-500 flex justify-between md:block group cursor-help">
                  <span>INFECT_MOD:</span> <span className="text-term-cyan group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,1)] transition-all">ACTIVE v1.0.4</span>
                </div>
                <div className="text-slate-500 flex justify-between md:block">
                  <span>TIME:</span> <span className="text-term-cyan">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                </div>
                {hasError && (
                  <div className="text-[10px] text-red-400 mt-2 bg-red-900/20 p-1 border border-red-900/50 rounded text-center">
                    Warning: Local image not found.<br/>Using fallback.
                  </div>
                )}
             </div>
          </GlassCard>
        </div>

        {/* Right: System Info (Neofetch style) */}
        <div className="md:col-span-7">
          <GlassCard variant="default" className="h-full p-8 font-mono text-sm md:text-base leading-relaxed">
             <div className="flex items-center gap-2 mb-6 text-slate-500 pb-4 border-b border-white/10">
               <Terminal className="w-4 h-4" />
               <span>~/readme.md</span>
             </div>

             <div className="space-y-4">
               <div>
                 <span className="text-fuchsia-500 font-bold text-xl md:text-2xl block mb-1">{profile.name}</span>
                 <span className="text-slate-500">------------------------------</span>
               </div>
               
               <div className="grid grid-cols-[100px_1fr] gap-y-2">
                 <span className="text-fuchsia-400">OS</span>
                 <span className="text-slate-300">Arch Linux x86_64</span>
                 
                 <span className="text-fuchsia-400">Role</span>
                 <span className="text-slate-300">
                    {typedTitle}
                    <span className="animate-pulse bg-fuchsia-500 text-black px-1 ml-1">_</span>
                 </span>

                 <span className="text-fuchsia-400">Shell</span>
                 <span className="text-slate-300">zsh 5.9</span>

                 <span className="text-fuchsia-400">Kernel</span>
                 <span className="text-slate-300">6.x-infect-stable</span>

                 <span className="text-fuchsia-400">Location</span>
                 <span className="text-slate-300">{profile.location.split(',')[0]}</span>

                 <span className="text-fuchsia-400">Bio</span>
                 <span className="text-slate-300 text-xs md:text-sm">{profile.bio1}</span>
               </div>

               {/* Color Palette Display */}
               <div className="pt-6 flex gap-3">
                 <div className="w-8 h-8 bg-black"></div>
                 <div className="w-8 h-8 bg-red-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-8 h-8 bg-green-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-8 h-8 bg-yellow-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-8 h-8 bg-blue-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-8 h-8 bg-fuchsia-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-8 h-8 bg-cyan-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-8 h-8 bg-white shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
               </div>
             </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
};

export default TerminalHero;