import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  // LOGIC BARU: Disable scroll saat modal foto terbuka
  useEffect(() => {
    if (selectedPhoto) {
      // Kunci scroll body
      document.body.style.overflow = 'hidden';
    } else {
      // Kembalikan scroll body ke semula
      document.body.style.overflow = '';
    }

    // Cleanup function untuk memastikan scroll kembali aktif jika komponen di-unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  const displayedPhotos = mode === 'preview' ? photos.slice(0, 6) : photos;

  return (
    <section 
      id="photography" 
      // FIX: Add significantly more bottom padding (pb-48) when in 'full' mode to prevent footer overlap
      className={`px-4 md:px-8 ${mode === 'full' ? 'pt-20 pb-48' : 'py-20'}`}
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex justify-between items-end mb-10 border-b border-slate-800 pb-4">
             <div>
                <span className="text-term-magenta font-mono text-sm tracking-widest">/var/www/images</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-mono mt-2">
                   Graphic<span className="text-slate-500">_Assets</span>
                </h2>
             </div>
             {mode === 'full' && (
                <button onClick={onBack} className="text-sm font-mono text-slate-400 hover:text-white px-4 py-2 border border-white/10 hover:bg-white/5 transition-all">[ cd .. ]</button>
             )}
          </div>
        </Reveal>

        {/* 
           UPDATED LAYOUT: 
           - Reverted to 'columns-' (Masonry) to keep ORIGINAL ASPECT RATIO (Portrait/Landscape mixed).
           - Reduced max columns to 'md:columns-3' (removed columns-4). 
             Result: Images are LARGER and fill the screen width better, eliminating the empty right space.
           - Added 'space-y-6' to manage vertical gaps in masonry.
        */}
        <div className="columns-2 md:columns-3 gap-6 space-y-6">
           {displayedPhotos.map((photo, idx) => (
              <Reveal key={photo.id} delay={idx * 0.05}>
                 <div 
                   onClick={() => setSelectedPhoto(photo)}
                   className="
                     break-inside-avoid
                     group relative 
                     bg-[#0F0F0F] border border-white/5 
                     hover:border-term-magenta hover:z-10
                     hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.3)]
                     cursor-pointer p-1.5 md:p-2.5
                     transition-all duration-300 ease-out
                   "
                 >
                    {/* Image Container - No fixed aspect ratio, allows natural height */}
                    <div className="overflow-hidden relative mb-2 md:mb-3 bg-[#050505] w-full">
                       <img 
                          src={photo.url} 
                          alt={photo.caption} 
                          className="w-full h-auto block transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" 
                          loading="lazy"
                       />
                       
                       <Maximize2 className="absolute top-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 z-20 drop-shadow-md transition-all duration-300 group-hover:rotate-90" />
                    </div>
                    
                    {/* Metadata */}
                    <div className="font-mono text-[9px] md:text-xs text-slate-500 flex justify-between items-center transition-colors group-hover:text-white">
                       <span className="truncate max-w-[80%] group-hover:text-term-magenta">{photo.caption}</span>
                       <span className="opacity-50 text-[8px] border border-white/10 px-1 rounded">
                          {photo.orientation === 'portrait' ? 'PORT' : photo.orientation === 'square' ? '1:1' : 'LAND'}
                       </span>
                    </div>
                 </div>
              </Reveal>
           ))}
        </div>

        {mode === 'preview' && (
           <div className="mt-12 text-center">
              <button 
                onClick={onViewAll}
                className="font-mono text-xs md:text-sm border border-white/10 bg-white/5 hover:bg-white/10 hover:border-term-magenta hover:text-term-magenta hover:shadow-[0_0_20px_-5px_rgba(217,70,239,0.5)] px-8 py-4 transition-all duration-300 uppercase tracking-[0.2em]"
              >
                 Load_More_Assets()
              </button>
           </div>
        )}

        {/* Modal / Lightbox */}
        {selectedPhoto && createPortal(
           <div 
             className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-hidden touch-none"
             onClick={() => setSelectedPhoto(null)}
           >
              <div 
                className="max-w-7xl w-full border border-white/10 bg-[#050505] shadow-2xl flex flex-col h-[80vh] md:h-[90vh] max-h-[1000px] rounded-sm overflow-hidden" 
                onClick={e => e.stopPropagation()}
              >
                 {/* Header */}
                 <div className="h-12 md:h-14 shrink-0 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 md:px-6 select-none">
                    <span className="font-mono text-xs md:text-sm text-slate-400 truncate pr-4">{selectedPhoto.caption}</span>
                    <button 
                        onClick={() => setSelectedPhoto(null)} 
                        className="text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all p-2 rounded flex items-center justify-center group"
                    >
                       <X className="w-5 h-5" />
                    </button>
                 </div>
                 
                 {/* Main Image Area */}
                 <div className="p-2 md:p-8 flex justify-center items-center bg-[#080808] overflow-hidden flex-1 relative">
                    <img 
                      src={selectedPhoto.url} 
                      alt="full" 
                      className="w-auto h-auto max-w-full max-h-full object-contain shadow-2xl" 
                    />
                 </div>
                 
                 {/* Footer of Modal */}
                 <div className="shrink-0 p-3 md:p-4 border-t border-white/10 flex justify-between font-mono text-[10px] md:text-sm text-slate-500 bg-[#0A0A0A]">
                    <div className="flex gap-4">
                       <span>{selectedPhoto.orientation?.toUpperCase() || 'IMG'}</span>
                    </div>
                    <div className="text-term-green flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-term-green inline-block animate-pulse"></span>
                       VIEWING
                    </div>
                 </div>
              </div>
           </div>,
           document.body
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;