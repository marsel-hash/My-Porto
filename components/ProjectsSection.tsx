import React from 'react';
import GlassCard from './GlassCard';
import Reveal from './Reveal';
import { 
  ArrowUpRight, 
  Terminal, 
  Play, 
  ShieldCheck, 
  Code,
  Layers,
  Binary,
  Cpu,
  Folder
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const TechIcon: React.FC<{ tag: string }> = ({ tag }) => {
  const t = tag.toLowerCase();
  const iconClass = "w-3 h-3 md:w-3.5 md:h-3.5";

  if (t.includes('python')) return <Binary className={iconClass} />;
  if (t.includes('react') || t.includes('next')) return <Code className={iconClass} />;
  if (t.includes('security') || t.includes('payload')) return <ShieldCheck className={iconClass} />;
  if (t.includes('cli') || t.includes('bash')) return <Terminal className={iconClass} />;
  if (t.includes('ai') || t.includes('logic')) return <Cpu className={iconClass} />;
  
  return <Layers className={iconClass} />;
};

const ProjectsSection: React.FC = () => {
  const { projects } = useContent();

  return (
    <section id="projects" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
           <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-term-cyan/10 rounded border border-term-cyan/20 text-term-cyan">
                   <Terminal className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-[10px] md:text-xs font-mono text-slate-500 tracking-widest uppercase">./deployments.sh</div>
                   <h2 className="text-2xl md:text-3xl font-bold text-white font-mono mt-0.5">
                     Featured <span className="text-term-cyan">Projects</span>
                   </h2>
                </div>
              </div>
              <div className="hidden md:block text-xs font-mono text-slate-500">
                Total: <span className="text-white">{projects.length}</span>
              </div>
           </div>
        </Reveal>

        {/* 
            GRID LAYOUT:
            - Mobile: 1 Column
            - Desktop: 2 Columns (Reduces vertical scroll height significantly)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <GlassCard 
                variant="cyan"
                className="group p-5 md:p-6 h-full flex flex-col transition-all duration-300 hover:bg-white/[0.03]"
                noHeader
              >
                {/* Header: Title, Status, and Links */}
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-white/5 border border-white/10 text-term-cyan group-hover:text-white group-hover:bg-term-cyan group-hover:border-term-cyan transition-all duration-300">
                        <Folder className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-term-cyan transition-colors leading-tight">
                           {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                           <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'completed' ? 'bg-term-green animate-pulse' : 'bg-yellow-500'}`}></span>
                           <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{project.status}</span>
                        </div>
                      </div>
                   </div>

                   {/* Quick Links (Top Right) */}
                   <div className="flex gap-2">
                      {project.githubUrl && (
                         <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            title="View Code"
                         >
                            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                         </a>
                      )}
                      {project.link && (
                         <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-term-cyan/20 text-slate-400 hover:text-term-cyan transition-colors"
                            title="Live Demo"
                         >
                            <Play className="w-4 h-4 md:w-5 md:h-5" />
                         </a>
                      )}
                   </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 flex-grow line-clamp-3 md:line-clamp-none">
                   {project.description}
                </p>

                {/* Footer: Tech Stack & Decorative Terminal Line */}
                <div className="mt-auto">
                   <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map(tag => (
                         <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-sm bg-black/30 border border-white/5 text-[10px] md:text-xs text-slate-300 font-mono hover:border-term-cyan/30 transition-colors">
                            <TechIcon tag={tag} />
                            {tag}
                         </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 text-[10px] text-slate-500">+{project.tags.length - 4}</span>
                      )}
                   </div>

                   {/* Terminal Command Decoration */}
                   <div className="pt-3 border-t border-white/5 font-mono text-[10px] text-slate-600 flex items-center gap-2">
                      <span className="text-term-green">➜</span>
                      <span>npm run deploy <span className="opacity-50">--production</span></span>
                      <span className="animate-pulse ml-1 bg-slate-500 w-1.5 h-3 inline-block align-middle"></span>
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