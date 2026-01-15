import React from 'react';
import GlassCard from './GlassCard';
import Reveal from './Reveal';
import { 
  ArrowUpRight, 
  Folder, 
  Terminal, 
  Play, 
  ShieldCheck, 
  Cpu, 
  Webhook, 
  FileCode, 
  Binary, 
  Code 
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

// Helper component to render icons based on tag name
const TechIcon: React.FC<{ tag: string }> = ({ tag }) => {
  const t = tag.toLowerCase();
  // Shared classes for consistent animation on hover
  const iconClass = "w-5 h-5 transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-3";

  // Custom SVG for specific languages to match the Lucide stroke style
  if (t.includes('python')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M12 2c-3.5 0-4 2-4 3 0 1.5.5 2.5 3 2.5h4c1 0 1.5.5 1.5 1.5v2.5h-5c-3.5 0-4.5 1.5-4.5 4 0 3 1 3.5 4 3.5h1.5c2 0 2-.5 2-2v-2h-3c-1.5 0-2.5-.5-2.5-2.5 0-2 1-3 3-3h1.5v-1c0-2-1-3-3-3z" />
        <path d="M12 22c3.5 0 4-2 4-3 0-1.5-.5-2.5-3-2.5h-4c-1 0-1.5-.5-1.5-1.5v-2.5h5c3.5 0 4.5-1.5 4.5-4 0-3-1-3.5-4-3.5h-1.5c-2 0-2 .5-2 2v2h3c1.5 0 2.5.5 2.5 2.5 0 2-1 3-3 3h-1.5v1c0 2 1 3 3 3z" />
      </svg>
    );
  }

  if (t.includes('php')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <path d="M8 12h8" />
        <path d="M12 8.5v7" />
      </svg>
    );
  }

  if (t.includes('react')) {
    return (
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconClass} group-hover/icon:animate-[spin_4s_linear_infinite]`}>
         <circle cx="12" cy="12" r="2" />
         <path d="M12 2.5c-4.5 0-8.5 2.5-8.5 9.5s4 9.5 8.5 9.5 8.5-2.5 8.5-9.5-4-9.5-8.5-9.5z" transform="rotate(0 12 12)" />
         <path d="M12 2.5c-4.5 0-8.5 2.5-8.5 9.5s4 9.5 8.5 9.5 8.5-2.5 8.5-9.5-4-9.5-8.5-9.5z" transform="rotate(60 12 12)" />
         <path d="M12 2.5c-4.5 0-8.5 2.5-8.5 9.5s4 9.5 8.5 9.5 8.5-2.5 8.5-9.5-4-9.5-8.5-9.5z" transform="rotate(120 12 12)" />
       </svg>
    );
  }

  // Mapping Lucide icons to concepts
  if (t.includes('cli') || t.includes('shell') || t.includes('bash')) return <Terminal className={iconClass} />;
  if (t.includes('api') || t.includes('network')) return <Webhook className={iconClass} />;
  if (t.includes('security') || t.includes('test')) return <ShieldCheck className={iconClass} />;
  if (t.includes('algorithm') || t.includes('cpu')) return <Cpu className={iconClass} />;
  if (t.includes('logic') || t.includes('data')) return <Binary className={iconClass} />;
  if (t.includes('script')) return <FileCode className={iconClass} />;

  // Default fallback
  return <Code className={iconClass} />;
};

const ProjectsSection: React.FC = () => {
  const { projects } = useContent();

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
           <div className="mb-8 border-b border-slate-800 pb-4">
              <span className="text-term-cyan font-mono text-sm">~/projects</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-mono mt-1 hover:text-term-cyan transition-colors duration-300 cursor-default">
                ./deployments.sh
              </h2>
           </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <GlassCard 
                variant="cyan"
                className="group flex flex-col md:flex-row hover:bg-white/[0.02] transition-all"
                noHeader
              >
                {/* Left: Terminal Window Visual */}
                <div className="md:w-1/3 bg-black/40 border-r border-white/5 p-4 flex flex-col justify-between group-hover:border-term-cyan/30 transition-colors duration-300">
                   <div className="font-mono text-xs text-slate-500 mb-4 group-hover:text-slate-300 transition-colors">
                      <div className="flex gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full group-hover:brightness-125 transition-all"/>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full group-hover:brightness-125 transition-all"/>
                        <div className="w-2 h-2 bg-green-500 rounded-full group-hover:brightness-125 transition-all"/>
                      </div>
                      <div className="text-term-green">$ run build</div>
                      <div className="text-slate-400 group-hover:text-term-cyan/70 transition-colors">Building {project.title}...</div>
                      <div className="text-term-cyan">Done in 2.4s.</div>
                   </div>
                   
                   <div className="mt-auto">
                      <div className={`inline-flex items-center px-2 py-1 border text-xs font-mono uppercase tracking-wider transition-all duration-300 group-hover:scale-105 ${
                        project.status === 'completed' 
                        ? 'border-term-green/30 text-term-green bg-term-green/10 group-hover:bg-term-green/20 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                        : 'border-term-yellow/30 text-term-yellow bg-term-yellow/10 group-hover:bg-term-yellow/20'
                      }`}>
                         [{project.status}]
                      </div>
                   </div>
                </div>

                {/* Right: Details */}
                <div className="flex-1 p-6 md:p-8">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3 mb-4">
                         <Folder className="w-5 h-5 text-term-cyan fill-term-cyan/20 group-hover:fill-term-cyan/40 transition-all duration-300 group-hover:rotate-6" />
                         <h3 className="text-xl font-bold text-white font-mono group-hover:text-term-cyan transition-colors">{project.title}</h3>
                      </div>
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-term-cyan transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>
                      )}
                   </div>

                   <p className="text-slate-400 font-mono text-sm leading-relaxed mb-6 border-l-2 border-white/10 pl-4 group-hover:border-term-cyan/50 group-hover:text-slate-300 transition-all">
                      {project.description}
                   </p>

                   <div className="space-y-4">
                      <div className="text-xs font-mono text-slate-500">Stack Analysis:</div>
                      <div className="flex flex-wrap gap-3">
                         {project.tags.map(tag => (
                            <div key={tag} className="relative group/icon">
                               <div className="
                                  p-2 rounded-md bg-white/5 border border-white/5 text-slate-400 
                                  hover:text-term-cyan hover:border-term-cyan/50 hover:bg-term-cyan/10 
                                  hover:shadow-[0_0_15px_-2px_rgba(6,182,212,0.4)] hover:-translate-y-1 
                                  transition-all duration-300 ease-out cursor-help
                               ">
                                  <TechIcon tag={tag} />
                               </div>
                               
                               {/* Tooltip */}
                               <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0A0A0A] border border-slate-700 text-slate-200 text-[10px] font-mono rounded opacity-0 transform translate-y-2 group-hover/icon:opacity-100 group-hover/icon:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                                  {tag}
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A0A0A] border-r border-b border-slate-700 transform rotate-45"></div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="mt-8 pt-4 border-t border-white/5 flex gap-4">
                      {/* View Source Button - Always shows if githubUrl exists */}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-mono flex items-center gap-2 text-slate-400 hover:text-white hover:underline decoration-term-green transition-all"
                        >
                           <Terminal className="w-3 h-3" /> View Source
                        </a>
                      )}
                      
                      {/* Live Demo Button - Only shows if link exists */}
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-mono flex items-center gap-2 text-slate-400 hover:text-white hover:underline decoration-term-cyan transition-all"
                        >
                           <Play className="w-3 h-3" /> Live Demo
                        </a>
                      )}
                   </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;