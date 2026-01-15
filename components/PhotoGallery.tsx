import React, { useState } from 'react';
import GlassCard from './GlassCard';
import Reveal from './Reveal';
import { useContent } from '../context/ContentContext';
import { Maximize2, X } from 'lucide-react';
import { Photo } from '../types';

const PhotoGallery: React.FC<{ mode?: 'preview' | 'full'; onViewAll?: () => void; onBack?: () => void }> = ({ 
  mode = 'preview', 
  onViewAll, 
  onBack 
}) => {
  const { photos } = useContent();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const displayedPhotos = mode === 'preview' ? photos.slice(0, 6) : photos;

  return (
    <section id="photography" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
             <div>
                <span className="text-term-magenta font-mono text-sm">/var/www/images</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-mono mt-1">
                   Graphic<span className="text-slate-500">_Assets</span>
                </h2>
             </div>
             {mode === 'full' && (
                <button onClick={onBack} className="text-xs font-mono text-slate-400 hover:text-white">[ cd .. ]</button>
             )}
          </div>
        </Reveal>

        {/* Masonry Layout using CSS Columns */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
           {displayedPhotos.map((photo, idx) => (
              <Reveal key={photo.id} delay={idx * 0.05}>
                 <div 
                   onClick={() => setSelectedPhoto(photo)}
                   className="
                     break-inside-avoid mb-4
                     group relative 
                     bg-[#0F0F0F] border border-white/5 
                     hover:border-term-magenta hover:z-10
                     hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.3)] /* Neon Glow */
                     cursor-pointer p-2 
                     transition-all duration-300 ease-out
                   "
                 >
                    {/* Image Container */}
                    <div className="overflow-hidden relative mb-2 bg-[#050505]">
                       <img 
                          src={photo.url} 
                          alt={photo.caption} 
                          className="w-full h-auto block transition-all duration-500 group-hover:scale-105 group-hover:brightness-110" 
                          loading="lazy"
                       />
                       
                       <Maximize2 className="absolute top-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 z-20 drop-shadow-md transition-all duration-300 group-hover:rotate-90" />
                       
                       <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Metadata */}
                    <div className="font-mono text-[10px] text-slate-500 flex justify-between transition-colors group-hover:text-white">
                       <span className="truncate max-w-[70%] group-hover:text-term-magenta">{photo.caption.replace(/ /g, '_')}.jpg</span>
                       <span>{photo.orientation ? photo.orientation.toUpperCase().substring(0,3) : 'IMG'}</span>
                    </div>
                 </div>
              </Reveal>
           ))}
        </div>

        {mode === 'preview' && (
           <div className="mt-8 text-center">
              <button 
                onClick={onViewAll}
                className="font-mono text-xs border border-white/10 bg-white/5 hover:bg-white/10 hover:border-term-magenta hover:text-term-magenta hover:shadow-[0_0_20px_-5px_rgba(217,70,239,0.5)] px-6 py-3 transition-all duration-300 uppercase tracking-widest"
              >
                 Load_More_Assets()
              </button>
           </div>
        )}

        {/* Modal / Lightbox */}
        {selectedPhoto && (
           <div 
             className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
             onClick={() => setSelectedPhoto(null)}
           >
              <div 
                className="max-w-6xl w-full border border-white/10 bg-[#050505] shadow-2xl flex flex-col max-h-[90vh]" 
                onClick={e => e.stopPropagation()}
              >
                 <div className="h-12 shrink-0 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 select-none">
                    <span className="font-mono text-xs text-slate-400 truncate pr-4">{selectedPhoto.caption} - ImageViewer</span>
                    {/* Enhanced Close Button */}
                    <button 
                        onClick={() => setSelectedPhoto(null)} 
                        className="text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all p-2 rounded flex items-center justify-center group"
                        aria-label="Close"
                    >
                       <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                 </div>
                 
                 {/* Clean background for modal image */}
                 <div className="p-2 flex justify-center bg-[#080808] overflow-hidden flex-1 relative">
                    <img 
                      src={selectedPhoto.url} 
                      alt="full" 
                      className="w-auto h-full object-contain shadow-2xl" 
                    />
                 </div>
                 
                 <div className="shrink-0 p-3 border-t border-white/10 flex justify-between font-mono text-xs text-slate-500 bg-[#0A0A0A]">
                    <div>EXIF: {selectedPhoto.exif || 'N/A'}</div>
                    <div className="text-term-green animate-pulse">READY</div>
                 </div>
              </div>
           </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;