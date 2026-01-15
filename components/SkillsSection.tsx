import React, { useState, useEffect, useRef } from 'react';
import GlassCard from './GlassCard';
import Reveal from './Reveal';
import { useContent } from '../context/ContentContext';

const ProgressBar: React.FC<{ label: string; color: string; percent: number }> = ({ label, color, percent }) => {
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null); // Ref untuk menyimpan interval ID

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation
          setWidth(percent);
          
          // Bersihkan interval sebelumnya jika ada (safety check)
          if (intervalRef.current) clearInterval(intervalRef.current);

          // Number counter animation
          let start = 0;
          const duration = 1500; // 1.5s duration
          const incrementTime = 20; // update every 20ms
          const steps = duration / incrementTime;
          const incrementValue = percent / steps;

          intervalRef.current = setInterval(() => {
            start += incrementValue;
            if (start >= percent) {
              setCount(percent);
              if (intervalRef.current) clearInterval(intervalRef.current);
            } else {
              setCount(Math.floor(start));
            }
          }, incrementTime);

          // Kita TIDAK memanggil observer.disconnect() agar animasi bisa berulang
        } else {
          // Reset saat elemen keluar viewport agar bisa animasi ulang nanti
          setWidth(0);
          setCount(0);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      },
      { threshold: 0.2 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [percent]);

  return (
    <div ref={barRef} className="flex items-center gap-4 text-xs md:text-sm font-mono mb-3 group">
      <div className="w-24 md:w-32 text-slate-400 truncate text-right shrink-0 group-hover:text-white transition-colors">{label}</div>
      <div className="flex-1 h-4 bg-slate-900 border border-slate-800 relative overflow-hidden">
        {/* Animated Bar */}
        <div 
          className={`h-full ${color} transition-all duration-[1500ms] ease-out relative`} 
          style={{ width: `${width}%` }}
        >
            {/* Glitch/Scanline effect inside the bar */}
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse opacity-20"></div>
        </div>
        
        {/* Bars segments (Grid overlay) */}
        <div className="absolute inset-0 grid grid-cols-12 gap-0.5 pointer-events-none z-10">
           {Array.from({length: 12}).map((_, i) => (
               <div key={i} className="bg-black/40 h-full w-px ml-auto"></div>
           ))}
        </div>
      </div>
      <div className="w-12 text-slate-300 text-right shrink-0 font-bold">
        {count}<span className="text-slate-500">%</span>
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const { skills } = useContent();

  // Helper to get color based on category index
  const getCategoryColor = (index: number) => {
    const colors = ['bg-term-green', 'bg-term-cyan', 'bg-term-magenta', 'bg-term-yellow'];
    return colors[index % colors.length];
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="mb-8">
             <div className="text-sm font-mono text-slate-500 mb-2">$ htop --filter=skills</div>
             <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">
               System <span className="text-term-green">Resources</span>
             </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <GlassCard variant="default" className="p-5 font-mono">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
                  <h3 className="font-bold text-white uppercase tracking-wider">
                    {/* PID style ID */}
                    <span className="text-slate-600 mr-2">{1000 + idx}</span>
                    {skillGroup.category}
                  </h3>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${getCategoryColor(idx).replace('bg-', 'bg-')}`} />
                </div>

                <div className="space-y-1">
                   {skillGroup.items.map((item, itemIdx) => {
                      // Pseudo-random percent for visual flair, deterministic based on string length
                      // Added randomness to make it look more like live CPU usage
                      const percent = Math.min(98, 60 + (item.length * 4) + (itemIdx % 2 === 0 ? 5 : -5)); 
                      return (
                        <ProgressBar 
                          key={itemIdx} 
                          label={item} 
                          color={getCategoryColor(idx)}
                          percent={percent} 
                        />
                      );
                   })}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;