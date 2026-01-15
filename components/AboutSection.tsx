import React from 'react';
import GlassCard from './GlassCard';
import Reveal from './Reveal';
import { useContent } from '../context/ContentContext';

const AboutSection: React.FC = () => {
  const { profile } = useContent();

  return (
    <section id="about" className="py-24 px-4 md:px-8">
      {/* Container Lebar 7xl untuk tampilan desktop yang lebih luas */}
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Header Column (3 cols) */}
            <div className="lg:col-span-3">
               <div className="sticky top-24">
                  <span className="text-term-green font-mono text-sm tracking-widest mb-2 block">// MANUAL PAGE</span>
                  <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                  <div className="h-1 w-20 bg-term-green mb-6"></div>
                  <p className="text-slate-500 text-sm font-mono leading-relaxed">
                     Reference manual for the {profile.name} unit. Contains specifications, origin story, and runtime parameters.
                  </p>
               </div>
            </div>

            {/* Content Column (9 cols) */}
            <div className="lg:col-span-9">
               <GlassCard className="p-5 md:p-12 font-mono" noHeader>
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-4 mb-8">
                     <span className="text-xl font-bold text-white">MAN(1)</span>
                     <span className="text-slate-500 text-sm">System Manager's Manual</span>
                  </div>

                  <div className="space-y-10">
                     {/* NAME */}
                     <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4">
                        <h3 className="text-term-green font-bold text-sm uppercase tracking-wider pt-1">NAME</h3>
                        <p className="text-slate-200 text-lg">
                           {profile.name.toLowerCase()} <span className="text-slate-500">-</span> {profile.title.toLowerCase()}
                        </p>
                     </div>

                     {/* DESCRIPTION */}
                     <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4">
                        <h3 className="text-term-green font-bold text-sm uppercase tracking-wider pt-1">DESCRIPTION</h3>
                        <div className="text-slate-400 leading-relaxed text-sm md:text-base space-y-6">
                           <p className="text-justify border-l-2 border-white/5 pl-4 hover:border-term-green/50 transition-colors">
                              {profile.bio1}
                           </p>
                           <p className="text-justify border-l-2 border-white/5 pl-4 hover:border-term-green/50 transition-colors">
                              {profile.bio2}
                           </p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-600">
                     Marsel Manual Page 1.0.4
                  </div>
               </GlassCard>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;