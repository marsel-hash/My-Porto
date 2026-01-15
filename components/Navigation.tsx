import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, SITE_REPO } from '../constants';
import { SectionId } from '../types';
import { Terminal, Menu, X, Wifi, Battery, Clock, Volume2, Github } from 'lucide-react';

interface NavigationProps {
  onNavigate?: (id: SectionId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: SectionId) => {
    if (onNavigate) onNavigate(id);
    setMobileMenuOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const navHeight = 40;
        const buffer = 20;
        const offsetPosition = elementPosition - (navHeight + buffer);
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto'
        });
      }
    }, 50);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A] border-b border-white/10 h-10 flex items-center justify-between px-4 font-mono text-xs select-none">
        
        <div className="flex items-center gap-4 h-full">
          <div className="flex items-center gap-2 px-3 h-full bg-term-green/10 border-r border-term-green/20 text-term-green font-bold hover:bg-term-green/20 transition-colors cursor-default">
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ARCH.LINUX</span>
            <span className="sm:hidden">ARCH</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  px-3 py-1 rounded-sm transition-all duration-300 relative group
                  ${activeSection === item.id 
                    ? 'bg-slate-800 text-white' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'}
                `}
              >
                <span className={`opacity-50 mr-1 group-hover:text-term-cyan transition-colors`}>{index + 1}</span>
                <span className="group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all">
                  {item.label.toLowerCase()}
                </span>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-term-cyan transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>

          <div className="md:hidden text-slate-500 whitespace-nowrap">
             {`[ ${activeSection.toUpperCase()} ]`}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 h-full">
          {/* Source Code Link */}
          <a 
            href={SITE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-all border border-white/5 px-2 py-0.5 rounded bg-white/5 hover:border-term-cyan/50 group"
          >
            <Github className="w-3 h-3 group-hover:text-term-cyan transition-colors" />
            <span>SOURCE</span>
          </a>

          <div className="hidden md:flex items-center gap-4 text-slate-400 border-l border-white/10 pl-4">
            <div className="flex items-center gap-2 hover:text-term-green transition-colors cursor-pointer" title="Connected">
               <Wifi className="w-3.5 h-3.5" />
               <span>WLAN0: <span className="text-term-green drop-shadow-[0_0_3px_rgba(16,185,129,0.5)]">UP</span></span>
            </div>
            <div className="flex items-center gap-2 text-term-cyan hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all cursor-default">
               <Clock className="w-3.5 h-3.5" />
               <span>{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-1.5 text-term-cyan">
             <Clock className="w-3 h-3" />
             <span>{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>

          <button 
            className="md:hidden text-white p-2 hover:bg-white/10 transition-colors rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-10 z-40 bg-black/95 p-4 md:hidden font-mono">
          <div className="border border-white/10 p-2 space-y-1">
            <div className="bg-white/10 px-3 py-2 text-slate-400 text-xs mb-2 flex justify-between">
              <span>// MENU SELECTION</span>
              <a href={SITE_REPO} target="_blank" className="text-term-cyan underline">Get Source</a>
            </div>
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full text-left px-4 py-3 text-sm flex items-center gap-3 border border-transparent transition-all
                  ${activeSection === item.id 
                    ? 'bg-term-green/20 text-term-green border-term-green/30' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:pl-6'}
                `}
              >
                <span>{`0${index + 1}`}</span>
                <span className="flex-1">{item.command}</span>
                {activeSection === item.id && <span className="animate-pulse">_</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;