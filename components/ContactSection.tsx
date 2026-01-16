import React from 'react';
import GlassCard from './GlassCard';
import Reveal from './Reveal';
import { useContent } from '../context/ContentContext';
import { Github, Instagram, Mail, ArrowUpRight, MessageSquare, Terminal } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { profile } = useContent();

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      cmd: 'ssh mail',
      color: 'text-term-green',
      borderColor: 'group-hover:border-term-green/50',
      bgHover: 'group-hover:bg-term-green/10',
      link: `mailto:${profile.email}`
    },
    {
      icon: Github,
      label: 'Github',
      value: profile.socials.github.replace('https://', ''),
      cmd: 'git remote',
      color: 'text-term-cyan',
      borderColor: 'group-hover:border-term-cyan/50',
      bgHover: 'group-hover:bg-term-cyan/10',
      link: profile.socials.github
    },
    {
      icon: Instagram,
      label: 'Social',
      value: `@${profile.socials.instagram.split('/').pop()}`,
      cmd: 'curl stream',
      color: 'text-term-magenta',
      borderColor: 'group-hover:border-term-magenta/50',
      bgHover: 'group-hover:bg-term-magenta/10',
      link: profile.socials.instagram
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 mb-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-slate-400 font-mono text-xs mb-4">
               <span className="w-2 h-2 rounded-full bg-term-green animate-pulse"></span>
               Connection Available
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">Initialize <span className="text-term-green">Handshake</span></h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 gap-2 md:gap-6">
          {contacts.map((contact, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <a 
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <GlassCard 
                  className={`h-full p-3 md:p-8 transition-all duration-300 hover:-translate-y-2 border-white/10 ${contact.borderColor}`} 
                  noHeader
                >
                  <div className="flex flex-col h-full justify-between items-center md:items-start text-center md:text-left">
                     <div className="w-full flex flex-col items-center md:items-start">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 flex items-center justify-center mb-3 md:mb-6 border border-white/10 transition-colors ${contact.bgHover}`}>
                           <contact.icon className={`w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-white transition-colors`} />
                        </div>
                        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-500 mb-2">
                           <Terminal className="w-3 h-3" />
                           <span>{contact.cmd}</span>
                        </div>
                        
                        <h3 className="text-[10px] md:text-lg font-bold text-slate-200 group-hover:text-white mb-1 w-full truncate px-1 md:px-0">
                           <span className="md:hidden">{contact.label}</span>
                           <span className="hidden md:inline">{contact.value}</span>
                        </h3>

                        <p className={`hidden md:block text-xs font-mono font-bold uppercase tracking-widest opacity-60 ${contact.color}`}>
                           {contact.label}
                        </p>
                     </div>

                     <div className="mt-3 md:mt-8 flex items-center justify-center md:justify-between border-t border-white/5 pt-2 md:pt-4 w-full">
                        <span className="text-[9px] md:text-xs text-slate-500 group-hover:text-white transition-colors uppercase md:normal-case tracking-wider md:tracking-normal">
                          Connect
                        </span>
                        <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-slate-600 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1 ml-1" />
                     </div>
                  </div>
                </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 md:mt-16 max-w-2xl mx-auto bg-black/50 border border-white/10 rounded-sm p-4 font-mono text-xs md:text-sm">
           <div className="flex items-center gap-2 text-slate-500 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
           </div>
           <div className="flex gap-2">
              <span className="text-term-green">root@portfolio</span>
              <span className="text-slate-500">:</span>
              <span className="text-term-cyan">~</span>
              <span className="text-slate-300">$ echo "Thank you for visiting."</span>
           </div>
           <div className="flex gap-2 mt-1">
              <span className="text-slate-400">Thank you for visiting.</span>
           </div>
           <div className="flex gap-2 mt-1">
              <span className="text-term-green">root@portfolio</span>
              <span className="text-slate-500">:</span>
              <span className="text-term-cyan">~</span>
              <span className="w-2 h-4 bg-slate-500 animate-pulse block"></span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
