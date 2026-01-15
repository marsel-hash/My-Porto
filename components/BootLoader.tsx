import React, { useState, useEffect, useRef } from 'react';
import { playKeystrokeSound } from '../utils/sound';

interface BootLoaderProps {
  onComplete: () => void;
}

const bootLines = [
  "INITIALIZING KERNEL...",
  "LOADING MODULES: [ OK ]",
  "MOUNTING FILE SYSTEM...",
  "CHECKING MEMORY INTEGRITY...",
  "ALLOCATING RESOURCES...",
  "CONNECTING TO NEURAL NET...",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING ASSETS...",
  "DETECTING INFECT_MODULE v1.0.4...",
  "INFECTING SYSTEM CORE... [ STABLE ]",
  "CONFIGURING VIEWPORT...",
  "SYSTEM READY.",
  "EXECUTING PORTFOLIO.EXE..."
];

const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let delay = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, index) => {
      // Vary delay for specific lines
      const isInfectLine = line.includes("INFECT");
      const randomDelay = isInfectLine ? 600 : (Math.random() * 300 + 100);
      delay += randomDelay;

      const timeout = setTimeout(() => {
        setLines(prev => [...prev, line]);
        // Sound Effect
        try { playKeystrokeSound(); } catch(e) {} 
        
        // Auto scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, delay);
      timeouts.push(timeout);
    });

    // Finish sequence
    const finalTimeout = setTimeout(() => {
      onComplete();
    }, delay + 800);
    timeouts.push(finalTimeout);

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-fuchsia-500 font-mono text-sm md:text-base p-8 md:p-12 overflow-hidden flex flex-col justify-end cursor-wait">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[size:100%_2px,3px_100%] pointer-events-none" />
      <div ref={containerRef} className="relative z-20 max-w-2xl w-full mx-auto space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="mr-2 text-slate-500">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
            <span className={`${i === lines.length - 1 ? "animate-pulse" : ""} ${line.includes("INFECT") ? "text-term-cyan" : ""}`}>
              {line}
            </span>
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
      
      {/* ProgressBar */}
      <div className="absolute bottom-0 left-0 h-1 bg-fuchsia-600 transition-all duration-300 ease-out" 
           style={{ width: `${(lines.length / bootLines.length) * 100}%` }} />
    </div>
  );
};

export default BootLoader;