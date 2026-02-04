// *HUD OVERLAY* 🎮
// The Heads-Up Display - Gurnoor Tamber's UI masterpiece!
// Status info, time, and all that sci-fi goodness! 🚀

import React, { useState, useEffect } from 'react';

interface HUDProps {
  status: string;
}

// *HUD COMPONENT* Overlay that shows all the important info! 📊
export const HUDOverlay: React.FC<HUDProps> = ({ status }) => {
  // *TIME STATE* Keep track of the current time! ⏰
  const [time, setTime] = useState(new Date());

  // *TIME UPDATER* Update every second! Tick tock! ⏱️
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 p-12 font-orbitron text-[10px] tracking-widest text-cyan-500/60 uppercase pointer-events-none select-none z-50">
      
      {/* Top Right: Chrono */}
      <div className="absolute top-10 right-10 text-right border-r-2 border-cyan-500/20 pr-5">
        <div className="text-xl font-black text-white tracking-tight font-mono drop-shadow-[0_0_10px_rgba(0,247,255,0.3)]">
          {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="text-[7px] opacity-30 font-mono tracking-widest mt-1">SYS_TIME_SYNC_0xA91</div>
      </div>

      {/* Side Decorative Arcs */}
      <div className="absolute left-[-250px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="cyan" strokeWidth="0.1" strokeDasharray="40 160" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="cyan" strokeWidth="0.05" strokeDasharray="10 190" strokeDashoffset="50" />
        </svg>
      </div>

      {/* Lower Metadata - Minimalist display */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end opacity-20 font-mono text-[6px] tracking-widest">
         <span>LATENCY: 12ms</span>
         <span>NEURAL_FIDELITY: 99.98%</span>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
