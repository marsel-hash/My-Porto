import React, { useState, useEffect, useRef, useMemo } from 'react';
import GlassCard from './GlassCard';
import { useContent } from '../context/ContentContext';
import { Terminal, ChevronRight, Command } from 'lucide-react';

const TerminalHero: React.FC = () => {
  const { profile } = useContent();
  const [typedTitle, setTypedTitle] = useState('');
  
  // Stats Animation State
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memUsage, setMemUsage] = useState(348);
  const [activeCodeLine, setActiveCodeLine] = useState(0);

  // Terminal Interaction State
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{cmd: string, output: React.ReactNode}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Typing Effect
  useEffect(() => {
    const fullText = profile.title;
    let i = 0;
    const typing = setInterval(() => {
      setTypedTitle(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(typing);
    }, 70);
    return () => clearInterval(typing);
  }, [profile.title]);

  // Code Snippet Data - Memoized to prevent re-render glitches
  const codeData = useMemo(() => [
    { id: '1', text: <span><span className="text-term-magenta">interface</span> <span className="text-term-yellow">Developer</span> {'{'}</span> },
    { id: '2', text: <span className="pl-4">name: <span className="text-term-green">'{profile.name}'</span>;</span> },
    { id: '3', text: <span className="pl-4">skills: <span className="text-term-cyan">['React', 'Node', 'Python']</span>;</span> },
    { id: '4', text: <span className="pl-4">isHirable: <span className="text-term-magenta">true</span>;</span> },
    { id: '5', text: <span>{'}'}</span> },
    { id: '6', spacer: true }, // Index 5
    { id: '7', text: <span><span className="text-term-magenta">const</span> <span className="text-white">init</span> = () <span className="text-term-magenta">{'=>'}</span> {'{'}</span> },
    { id: '8', text: <span className="pl-4"><span className="text-slate-500">// Loading core modules...</span></span> },
    { id: '9', text: <span className="pl-4"><span className="text-term-cyan">System</span>.ready();</span> },
    { id: '10', text: <span className="pl-4"><span className="text-term-cyan">Portfolio</span>.render(<span className="text-term-green">'#root'</span>);</span> },
    { id: '11', text: <span>{'}'}</span> },
    { id: '12', spacer: true }, // Index 11
    { id: '13', text: <span><span className="text-term-yellow">init</span>();</span> }
  ], [profile.name]);

  // Dynamic Stats & Code Line Animation
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 15) + 5); // Random 5-20%
      setMemUsage(Math.floor(Math.random() * 200) + 300); // Random 300-500MB
    }, 2000);

    const codeInterval = setInterval(() => {
        setActiveCodeLine(prev => {
            const totalLines = 13; // codeData.length
            const spacerIndices = [5, 11];
            let next = (prev + 1) % totalLines;
            
            // Skip spacer lines to prevent "empty bar" highlight
            while (spacerIndices.includes(next)) {
                next = (next + 1) % totalLines;
            }
            return next;
        });
    }, 400);

    return () => {
        clearInterval(statsInterval);
        clearInterval(codeInterval);
    };
  }, []);

  // Auto-scroll to bottom of terminal history
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = null;

    switch (cleanCmd.split(' ')[0]) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 gap-1 text-slate-400">
            <div><span className="text-term-yellow">ls</span>       - List directory contents</div>
            <div><span className="text-term-yellow">cd [dir]</span> - Navigate to section (e.g., cd projects)</div>
            <div><span className="text-term-yellow">cat [file]</span>- Display file content</div>
            <div><span className="text-term-yellow">clear</span>    - Clear terminal history</div>
            <div><span className="text-term-yellow">whoami</span>   - Print effective user</div>
            <div><span className="text-term-yellow">date</span>     - Print system date</div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="flex flex-wrap gap-4 text-term-cyan font-bold">
            <span>about.md</span>
            <span>skills.json</span>
            <span className="text-term-green">projects.sh*</span>
            <span className="text-term-magenta">gallery/</span>
            <span>contact.txt</span>
          </div>
        );
        break;
      case 'whoami':
        output = <div className="text-slate-300">visitor@portfolio</div>;
        break;
      case 'date':
        output = <div className="text-slate-300">{new Date().toString()}</div>;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'cd':
      case 'open':
        const target = cleanCmd.split(' ')[1];
        if (!target) {
            output = <div className="text-red-400">usage: cd [directory]</div>;
        } else if (['projects', 'projects.sh'].includes(target)) {
            output = <div className="text-term-green">Navigating to projects...</div>;
            setTimeout(() => scrollToSection('projects'), 500);
        } else if (['about', 'about.md'].includes(target)) {
            output = <div className="text-term-green">Opening about section...</div>;
            setTimeout(() => scrollToSection('about'), 500);
        } else if (['gallery', 'photos'].includes(target)) {
            output = <div className="text-term-green">Opening gallery...</div>;
            setTimeout(() => scrollToSection('photography'), 500);
        } else if (['contact', 'contact.txt'].includes(target)) {
            output = <div className="text-term-green">Opening contact channel...</div>;
            setTimeout(() => scrollToSection('contact'), 500);
        } else if (['skills', 'skills.json'].includes(target)) {
            output = <div className="text-term-green">Analyzing skills...</div>;
            setTimeout(() => scrollToSection('skills'), 500);
        } else {
            output = <div className="text-red-400">cd: no such file or directory: {target}</div>;
        }
        break;
      case 'cat':
        const file = cleanCmd.split(' ')[1];
        if (!file) {
            output = <div className="text-red-400">usage: cat [file]</div>;
        } else if (file === 'about.md') {
            output = <div className="text-slate-300">{profile.bio1}</div>;
        } else if (file === 'contact.txt') {
             output = <div className="text-slate-300">Email: {profile.email}</div>;
        } else if (file === 'skills.json') {
             output = <div className="text-slate-300">[Object Object] - Use 'cd skills' to view visual data.</div>;
        } else {
             output = <div className="text-red-400">cat: {file}: No such file or directory</div>;
        }
        break;
      case 'sudo':
        output = <div className="text-red-500 font-bold">PERMISSION DENIED. Nice try.</div>;
        break;
      case '':
        output = null;
        break;
      default:
        output = <div className="text-red-400">zsh: command not found: {cleanCmd}</div>;
    }

    if (cleanCmd !== 'clear') {
        setHistory(prev => [...prev, { cmd, output }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    // Prevent keyboard popping up on mobile unless explicitly focused on input
    if (window.innerWidth >= 768) {
        inputRef.current?.focus();
    }
  };

  // Helper to render code snippet (used twice for responsive placement)
  const renderCodeSnippet = (isMobile: boolean) => (
    <div className={`${isMobile ? 'block md:hidden mt-4' : 'hidden md:block'} select-none pointer-events-none opacity-90 w-full`}>
       <div className="bg-[#0A0A0A] border border-white/5 rounded-lg p-3 md:p-5 text-[9px] md:text-[10px] leading-relaxed text-slate-400 shadow-2xl relative overflow-hidden">
          <div className="absolute top-2 right-2 text-[8px] md:text-xs text-slate-700 font-bold">TypeScript</div>
          <div className="grid grid-cols-[15px_1fr] md:grid-cols-[20px_1fr] gap-2">
             {/* Line Numbers */}
             <div className="text-right text-slate-700 border-r border-white/5 pr-1 md:pr-2 select-none flex flex-col">
                {Array.from({length: codeData.length}).map((_, i) => <span key={i}>{i + 1}</span>)}
             </div>
             
             {/* Code Content with Highlights */}
             <div className="font-mono relative whitespace-pre md:whitespace-normal overflow-x-auto md:overflow-visible no-scrollbar">
                {codeData.map((line, index) => (
                  <div 
                      key={line.id} 
                      className={`relative transition-all duration-300 ${!line.spacer && activeCodeLine === index ? 'bg-white/5 -mx-2 px-2 rounded-sm text-shadow-glow' : ''} ${line.spacer ? 'h-4' : ''}`}
                  >
                      {!line.spacer && line.text}
                      {!line.spacer && activeCodeLine === index && (
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-term-cyan/50 -ml-2"></div>
                      )}
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <section id="home" className="min-h-[100dvh] flex items-center justify-center pt-16 pb-8 md:py-0 px-2 md:px-8 relative overflow-hidden">
      
      {/* Decorative Glow Behind Card - Pulsing Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[80%] h-[60%] bg-gradient-to-r from-term-green/10 via-term-cyan/10 to-term-magenta/10 blur-[50px] md:blur-[80px] rounded-full pointer-events-none animate-pulse" />

      {/* Main Terminal Container with Float Animation */}
      <div className="max-w-5xl w-full relative z-10 animate-float">
        <GlassCard 
            variant="default" 
            alwaysGlow={true} // ENABLE ALWAYS ON GLOW HERE
            className="flex flex-col border-white/15 cursor-text" 
            noHeader
            onClick={handleTerminalClick}
        >
             
             {/* Terminal Header */}
             <div className="bg-[#0f0f0f] border-b border-white/10 p-2 md:px-5 md:py-3 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5 md:gap-2">
                   <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                   <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                   <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-slate-500">
                   <Terminal className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-60" />
                   <span className="opacity-60">zsh — {profile.name.toLowerCase()} — interactive</span>
                </div>
                <div className="w-8 md:w-12"></div>
             </div>

             {/* Terminal Body - Flex 1 to fill available space */}
             <div className="p-4 md:p-10 font-mono text-xs md:text-sm leading-relaxed relative overflow-hidden bg-black/40 backdrop-blur-sm max-h-[80vh] overflow-y-auto custom-scrollbar flex-1">
               
               {/* Scanline Effect - Hidden on mobile to prevent ghosting bars */}
               <div className="hidden md:block animate-scanline opacity-50 pointer-events-none"></div>

               {/* Last Login Info */}
               <div className="text-slate-600 mb-4 md:mb-8 text-[9px] md:text-xs">
                  Last login: {new Date().toDateString()} on ttys001
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10 mb-8">
                  
                  {/* LEFT COLUMN: Main Introduction */}
                  <div className="space-y-5 md:space-y-8">
                     <div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 md:mb-3 text-slate-500 text-[10px] md:text-sm">
                           <span className="text-term-green font-bold">➜</span>
                           <span className="text-term-cyan font-bold">~</span>
                           <span className="text-slate-400 break-all">./init.sh --user="{profile.name.toLowerCase()}"</span>
                        </div>
                        
                        <div className="pl-3 md:pl-0 border-l-2 md:border-l-0 border-white/10">
                            <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                               Hello, I'm <br />
                               <span className="text-4xl sm:text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-term-green via-term-cyan to-term-green bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                                  {profile.name}
                               </span>
                            </h2>
                            <div className="text-fuchsia-400 font-bold text-base sm:text-xl md:text-3xl flex items-center h-6 md:h-10 mt-1">
                               <span className="text-term-magenta mr-2">{'>'}</span>
                               <span className="truncate">{typedTitle}</span>
                               <span className="animate-pulse w-2 h-4 md:w-2.5 md:h-8 bg-fuchsia-400 ml-1 block shrink-0"></span>
                            </div>
                        </div>
                     </div>

                     <div className="flex flex-col gap-3 pt-2">
                        <button 
                           onClick={() => scrollToSection('projects')}
                           className="group relative px-6 py-3 md:px-8 md:py-3.5 bg-term-green text-black font-bold text-xs md:text-sm hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition-all rounded-sm flex items-center justify-center gap-2 overflow-hidden w-full"
                        >
                           <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                           <Terminal className="w-4 h-4 relative z-10" />
                           <span className="relative z-10">VIEW PROJECTS</span>
                        </button>
                        
                        <button 
                           onClick={() => scrollToSection('contact')}
                           className="group px-6 py-3 md:px-8 md:py-3.5 bg-white/5 border border-white/10 text-white font-bold text-xs md:text-sm hover:bg-white/10 hover:border-white/30 transition-all rounded-sm flex items-center justify-center gap-2 w-full"
                        >
                           <span>CONTACT ME</span>
                           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </div>

                  {/* RIGHT COLUMN: Desktop Code Snippet */}
                  {renderCodeSnippet(false)}
               </div>
               
               {/* INTERACTIVE PROMPT SECTION */}
               <div className="mt-4 md:mt-6 border-t border-white/5 pt-4">
                  <div className="text-slate-500 mb-2">
                    Type <span className="text-term-yellow font-bold">'help'</span> to see available commands.
                  </div>
                  
                  {/* Command History */}
                  {history.map((item, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-term-green">➜</span>
                        <span className="text-term-cyan">~</span>
                        <span>{item.cmd}</span>
                      </div>
                      <div className="pl-5 mt-1 text-slate-300 whitespace-pre-wrap">
                        {item.output}
                      </div>
                    </div>
                  ))}
                  
                  {/* Input Line */}
                  <div className="flex items-center gap-2 text-slate-400 relative">
                      <span className="text-term-green">➜</span>
                      <span className="text-term-cyan">~</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent !bg-transparent border-none outline-none text-slate-200 font-mono caret-term-green placeholder-slate-700 appearance-none m-0 p-0 rounded-none shadow-none ring-0"
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="Enter command..."
                      />
                  </div>
                  <div ref={historyEndRef} />
               </div>

               {/* MOBILE Code Snippet (Moved to bottom) */}
               {renderCodeSnippet(true)}

             </div>
             
             {/* Bottom Status Bar (Moved Outside to stick to bottom) */}
             <div className="w-full h-8 bg-[#111] border-t border-white/10 flex items-center justify-between px-3 md:px-4 text-[9px] md:text-[10px] text-slate-500 z-20 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-term-green animate-pulse"></div>
                      <span className="font-bold tracking-wider">ONLINE</span>
                   </div>
                   <div className="hidden sm:block">CPU: <span className="text-slate-300 w-8 inline-block text-right">{cpuUsage}%</span></div>
                   <div className="hidden sm:block">MEM: <span className="text-slate-300 w-12 inline-block text-right">{memUsage}MB</span></div>
                </div>
                <div className="flex items-center gap-2">
                   <Command className="w-3 h-3" />
                   <span className="font-bold tracking-wider">BASH</span>
                </div>
             </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default TerminalHero;