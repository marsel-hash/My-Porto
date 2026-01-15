import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Navigation from './components/Navigation';
import TerminalHero from './components/TerminalHero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import PhotoGallery from './components/PhotoGallery';
import ContactSection from './components/ContactSection';
import BootLoader from './components/BootLoader';
import ScrollProgress from './components/ScrollProgress';
import { ContentProvider, useContent } from './context/ContentContext';
import { playStartupSound } from './utils/sound';
import { GitBranch, Circle, ShieldCheck } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'gallery'>('home');
  const { profile } = useContent();

  const handleBackFromGallery = () => {
    setCurrentView('home');
    setTimeout(() => {
      const element = document.getElementById('photography');
      if (element) {
        const headerOffset = 60; 
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <>
      <ScrollProgress />
      <Navigation onNavigate={() => setCurrentView('home')} />
      
      {currentView === 'home' ? (
        <main className="relative z-10 flex flex-col gap-10">
          <TerminalHero />
          <div className="space-y-32">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent -z-10 hidden md:block" />
              
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <PhotoGallery 
                mode="preview" 
                onViewAll={() => setCurrentView('gallery')} 
              />
              <ContactSection />
            </div>
          </div>
        </main>
      ) : (
        <main className="relative z-10 min-h-screen">
          <PhotoGallery 
            mode="full" 
            onBack={handleBackFromGallery} 
          />
        </main>
      )}

      <footer className="relative z-10 py-12 text-center text-slate-500 font-mono text-sm bg-black/40 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-xs mx-auto mb-4 flex items-center justify-center gap-2 text-xs text-slate-600">
          <div className="h-px flex-1 bg-white/5"></div>
          <span className="uppercase tracking-widest px-2">End of Line</span>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>
        
        <p className="flex items-center justify-center gap-2">
          Designed & Built by 
          <a 
            href={profile.socials.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-fuchsia-400 hover:text-white transition-all group"
          >
            <span className="hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">test</span>
            <ShieldCheck className="w-3.5 h-3.5 text-term-cyan opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
          </a>
        </p>
        
        <p className="text-[10px] mt-2 opacity-30 font-mono">
          [ ACCESS_LEVEL: ROOT ] • © {new Date().getFullYear()}
        </p>
        
        {/* Decorative Git Status */}
        <div className="flex items-center justify-center gap-4 mt-8 text-[10px] text-slate-600 border-t border-white/5 pt-6 max-w-xs mx-auto">
           <div className="flex items-center gap-1.5 hover:text-term-green transition-colors cursor-help" title="Git Status">
              <GitBranch className="w-3 h-3" />
              <span>origin/main</span>
           </div>
           <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-term-green animate-pulse"></div>
              <span>tree clean</span>
           </div>
           <div className="opacity-50">build: v{new Date().getMonth()+1}.{new Date().getDate()}</div>
        </div>
      </footer>
    </>
  );
};

// Define system states for the boot sequence
type SystemState = 'booting' | 'blackout' | 'desktop';

const App: React.FC = () => {
  const [systemState, setSystemState] = useState<SystemState>('booting');
  const [crtFinished, setCrtFinished] = useState(false);

  // Handle phase transitions
  const handleBootComplete = () => {
    setSystemState('blackout');
    
    // Switch to desktop after momentary blackout (simulating video mode switch)
    setTimeout(() => {
      setSystemState('desktop');
      // Play Sound Effect
      try { playStartupSound(); } catch(e) {}
    }, 800);
  };

  // Scroll Locking Logic
  useEffect(() => {
    if (systemState !== 'desktop') {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      // Restore native scroll
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [systemState]);

  return (
    <ContentProvider>
      {/* Container utama dengan overflow-x-hidden untuk mencegah horizontal scroll tapi mengizinkan vertical scroll saat isi tersedia */}
      <div className="relative min-h-screen text-slate-200 bg-term-bg overflow-x-hidden">
        <Background />
        
        {/* Phase 1: BootLoader */}
        {systemState === 'booting' && (
          <BootLoader onComplete={handleBootComplete} />
        )}

        {/* Phase 2: Blackout (Implicit) */}

        {/* Phase 3: Desktop Environment with CRT ON effect */}
        {systemState === 'desktop' && (
          <div 
            // PENTING: Class 'animate-crt-on' dihapus setelah selesai
            // Jika tidak dihapus, properti 'transform' akan membuat element fixed di dalamnya rusak
            className={`w-full min-h-screen origin-center ${!crtFinished ? 'animate-crt-on' : ''}`}
            onAnimationEnd={() => setCrtFinished(true)}
          >
            <Portfolio />
          </div>
        )}
      </div>
    </ContentProvider>
  );
};

export default App;
