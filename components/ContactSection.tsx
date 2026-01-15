import React from 'react';
import GlassCard from './GlassCard';
import Reveal from './Reveal';
import { useContent } from '../context/ContentContext';
import { Terminal, Github, Instagram, Mail, ArrowUpRight } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { profile } = useContent();

  return (
    <section id="contact" className="py-32 px-4 mb-10">
      <div className="max-w-4xl mx-auto">
        <GlassCard variant="default" className="p-0 overflow-hidden" noHeader>
           {/* Terminal Header */}
           <div className="bg-slate-900 border-b border-white/10 p-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs font-mono text-slate-400 ml-2">root@marsel-server: ~/contact</div>
           </div>

           <div className="p-6 md:p-10 font-mono text-sm md:text-base bg-black/80">
              <div className="mb-8 space-y-2 text-slate-300 border-b border-white/5 pb-6">
                 <p>Last login: {new Date().toDateString()} on ttys001</p>
                 <p className="text-slate-500"># Choose a communication channel below to execute connection:</p>
              </div>

              <div className="grid gap-4">
                 
                 {/* Email Item */}
                 <a 
                   href={`mailto:${profile.email}`} 
                   className="group relative flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-term-green/30 transition-all rounded-sm overflow-hidden"
                 >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-term-green/0 group-hover:bg-term-green transition-all" />
                    
                    <div className="p-3 bg-black/50 border border-white/10 rounded group-hover:border-term-green/50 group-hover:text-term-green text-slate-400 transition-colors">
                       <Mail className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="text-term-green font-bold">$</span>
                          <span>ssh user@mail</span>
                       </div>
                       <div className="text-slate-200 font-bold truncate group-hover:text-term-green transition-colors">
                          {profile.email}
                       </div>
                    </div>
                    
                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-term-green group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                 </a>

                 {/* Github Item */}
                 <a 
                   href={profile.socials.github} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="group relative flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-term-cyan/30 transition-all rounded-sm overflow-hidden"
                 >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-term-cyan/0 group-hover:bg-term-cyan transition-all" />

                    <div className="p-3 bg-black/50 border border-white/10 rounded group-hover:border-term-cyan/50 group-hover:text-term-cyan text-slate-400 transition-colors">
                       <Github className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="text-term-cyan font-bold">$</span>
                          <span>git remote add origin</span>
                       </div>
                       <div className="text-slate-200 font-bold truncate group-hover:text-term-cyan transition-colors">
                          {profile.socials.github.replace('https://', '')}
                       </div>
                    </div>

                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-term-cyan group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                 </a>

                 {/* Instagram Item */}
                 <a 
                   href={profile.socials.instagram} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="group relative flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-term-magenta/30 transition-all rounded-sm overflow-hidden"
                 >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-term-magenta/0 group-hover:bg-term-magenta transition-all" />

                    <div className="p-3 bg-black/50 border border-white/10 rounded group-hover:border-term-magenta/50 group-hover:text-term-magenta text-slate-400 transition-colors">
                       <Instagram className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="text-term-magenta font-bold">$</span>
                          <span>curl -L follow_stream</span>
                       </div>
                       <div className="text-slate-200 font-bold truncate group-hover:text-term-magenta transition-colors">
                          @{profile.socials.instagram.split('/').pop()}
                       </div>
                    </div>

                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-term-magenta group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                 </a>

              </div>
              
              {/* Fake Prompt */}
              <div className="mt-8 flex items-center gap-2 animate-pulse">
                 <span className="text-term-green">➜</span>
                 <span className="text-term-cyan">~</span>
                 <span className="w-2.5 h-5 bg-slate-400 block"></span>
              </div>
           </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default ContactSection;