// *PRESENTATION OVERLAY* 🎬
// The Prezi Presentation Viewer - Gurnoor Tamber's presentation showcase!
// Full-screen immersive experience! 🎭

import React, { useState, useEffect } from 'react';

interface PresentationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// *PRESENTATION COMPONENT* Show that Prezi! Gurnoor's visual storytelling! 📊
export const PresentationOverlay: React.FC<PresentationOverlayProps> = ({ isOpen, onClose }) => {
  // *LOADING STATES* Track presentation loading! ⏳
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // *LOAD TRACKER* Mark when we've loaded once! 🎯
  useEffect(() => {
    if (isOpen && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [isOpen, hasLoadedOnce]);

  // *PREZI URLS* Gurnoor's presentation links! 🎬
  const preziEmbedUrl = "https://prezi.com/p/embed/53EQfINhA7jODdH6Duf9/";
  const preziDirectUrl = "https://prezi.com/view/53EQfINhA7jODdH6Duf9/?referral_token=rGbPGllnB3FN";

  return (
    <div 
      className={`fixed inset-0 z-[500] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 transition-all duration-700 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
    >
      {/* Anime Sci-Fi Decorator Frames */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 md:w-64 h-32 md:h-64 border-t-[4px] border-l-[4px] border-cyan-500 opacity-20 translate-x-4 translate-y-4 md:translate-x-10 md:translate-y-10"></div>
        <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 border-t-[4px] border-r-[4px] border-cyan-500 opacity-20 -translate-x-4 translate-y-4 md:-translate-x-10 md:translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 border-b-[4px] border-l-[4px] border-cyan-500 opacity-20 translate-x-4 -translate-y-4 md:translate-x-10 md:-translate-y-10"></div>
        <div className="absolute bottom-0 right-0 w-32 md:w-64 h-32 md:h-64 border-b-[4px] border-r-[4px] border-cyan-500 opacity-20 -translate-x-4 -translate-y-4 md:-translate-x-10 md:-translate-y-10"></div>
        
        {/* Animated Scanning Line */}
        {isOpen && (
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-cyan-400/30 shadow-[0_0_10px_cyan] animate-[scan-line_6s_linear_infinite]"></div>
        )}
      </div>

      <div className="relative w-full h-full max-w-7xl flex flex-col bg-black border border-white/10 rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,247,255,0.15)]">
        {/* UI Header */}
        <div className="h-14 flex items-center justify-between px-6 bg-gradient-to-r from-cyan-900/40 via-black to-transparent border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-1 h-5 bg-cyan-400"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-[0.3em] text-white italic uppercase leading-none">NEURAL_ARCHIVE_VIEWER</span>
              <span className="text-[6px] font-mono tracking-[0.2em] text-cyan-800 uppercase font-black">SYNC_NODE: 0x51_PRESENTATION</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href={preziDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-1.5 border border-cyan-500/20 hover:border-cyan-400 transition-all text-[8px] font-black text-cyan-500 hover:text-white uppercase tracking-widest"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
              OPEN_EXTERNAL
            </a>
            <div className="h-6 w-[1px] bg-white/10"></div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 p-1 text-[8px] font-black text-white/40 hover:text-red-500 transition-colors uppercase tracking-widest"
            >
              <span>CLOSE</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>
        </div>

        {/* Iframe Content Container */}
        <div className="flex-1 relative bg-[#050505]">
          {isLoading && isOpen && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 bg-black">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
                <div className="absolute inset-3 border-b-2 border-cyan-900/40 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-black tracking-[1em] text-cyan-500 animate-pulse uppercase ml-[1em]">UPLOADING_VISUAL_MATRIX</span>
                <span className="text-[6px] font-mono text-cyan-900 uppercase">establishing_secure_tunnel...</span>
              </div>
            </div>
          )}
          
          {hasLoadedOnce && (
            <iframe 
              src={preziEmbedUrl} 
              className="w-full h-full border-none"
              onLoad={() => setIsLoading(false)}
              allow="autoplay; fullscreen"
              title="Rosalind Franklin Presentation"
            />
          )}

          {/* CRT Overlay Effect on top of Presentation */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_3px,3px_100%]"></div>
        </div>

        {/* UI Footer Metadata */}
        <div className="h-10 flex items-center justify-between px-8 border-t border-white/5 bg-black/60">
           <div className="flex items-center gap-8">
              <div className="flex flex-col">
                 <span className="text-[5px] text-white/20 uppercase font-black">STREAM_PROTOCOL</span>
                 <span className="text-[7px] font-mono text-cyan-900 uppercase">WEB_FRAME_v2</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[5px] text-white/20 uppercase font-black">UPLINK_STATUS</span>
                 <span className="text-[7px] font-mono text-cyan-900 uppercase">TUNNEL_ESTABLISHED</span>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-[7px] font-black text-white/30 tracking-[0.3em] uppercase">PRESS_ESC_TO_EXIT_INTERFACE</span>
              <div className="w-1 h-1 bg-cyan-500 rotate-45 animate-pulse"></div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
