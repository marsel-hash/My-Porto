import React from 'react';
import GlassCard from './GlassCard';
import Reveal from './Reveal';
import { useContent } from '../context/ContentContext';

const AboutSection: React.FC = () => {
  const { profile } = useContent();

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="mb-6 flex items-baseline gap-3">
             <span className="text-term-green font-bold text-xl">MAN(1)</span>
             <span className="text-slate-500">General Commands Manual</span>
             <span className="text-term-green font-bold text-xl ml-auto">MAN(1)</span>
          </div>

          <GlassCard 
            className="p-6 md:p-12 font-mono transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] hover:border-term-green/30" 
            noHeader
          >
            
            {/* NAME */}
            <div className="mb-8">
              <h3 className="text-term-green font-bold mb-2 uppercase tracking-wider">NAME</h3>
              <p className="pl-4 md:pl-8 text-slate-300">
                {profile.name.toLowerCase()} - {profile.title.toLowerCase()}
              </p>
            </div>

            {/* SYNOPSIS */}
            <div className="mb-8">
              <h3 className="text-term-green font-bold mb-2 uppercase tracking-wider">SYNOPSIS</h3>
              <p className="pl-4 md:pl-8 text-slate-300">
                <span className="font-bold text-fuchsia-400">marsel</span> [options] [projects...] <br/>
                <span className="text-xs text-slate-500 italic">Options: --infect, --build, --deploy</span>
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">
              <h3 className="text-term-green font-bold mb-2 uppercase tracking-wider">DESCRIPTION</h3>
              <div className="pl-4 md:pl-8 text-slate-300 text-sm md:text-base leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <p className="text-justify">{profile.bio1}</p>
                  <p className="text-justify">{profile.bio2}</p>
                </div>
              </div>
            </div>

             {/* STATS TABLE (Custom Format) */}
             <div className="mb-8">
              <h3 className="text-term-green font-bold mb-2 uppercase tracking-wider">ATTRIBUTES</h3>
              <div className="pl-4 md:pl-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="border border-white/10 p-2 bg-black/40 hover:border-term-green/50 transition-colors">
                    <div className="text-xs text-slate-500 mb-1">EXP_LEVEL</div>
                    <div className="text-fuchsia-400">{profile.experience}</div>
                 </div>
                 <div className="border border-white/10 p-2 bg-black/40 hover:border-term-green/50 transition-colors">
                    <div className="text-xs text-slate-500 mb-1">CURRENT_STATUS</div>
                    <div className="text-term-green animate-pulse">{profile.availability}</div>
                 </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-12 pt-4 border-t border-white/10 text-center text-slate-600 text-xs">
              Press 'q' to quit (just kidding, keep scrolling)
            </div>

          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;