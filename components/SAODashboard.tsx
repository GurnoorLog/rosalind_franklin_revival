// *SAO DASHBOARD* 🎮
// The Main Menu - Gurnoor Tamber's SAO-inspired interface!
// Sword Art Online vibes with neural network powers! ⚔️✨

import React, { useState, useEffect } from 'react';
import { NeuralStatus } from '../App';

interface SAODashboardProps {
  onSelect: (mode: NeuralStatus) => void;
}

const MenuOption: React.FC<{ 
  label: string; 
  sub: string; 
  icon: React.ReactNode; 
  onClick: () => void;
  index: number;
}> = ({ label, sub, icon, onClick, index }) => (
  <button 
    onClick={onClick}
    style={{ animationDelay: `${index * 0.1}s` }}
    className="group relative pointer-events-auto flex items-center mb-4 transition-all duration-300 hover:translate-x-4 active:scale-95 animate-in slide-in-from-left-20 fade-in"
  >
    {/* SAO Floating Diamond Connector */}
    <div className="absolute left-[-40px] opacity-0 group-hover:opacity-100 transition-all duration-300">
       <div className="w-6 h-[2px] bg-white shadow-[0_0_10px_white]"></div>
       <div className="absolute left-[-4px] top-[-3px] w-2 h-2 bg-white rotate-45"></div>
    </div>
    
    {/* SAO Menu Button Shape */}
    <div className="relative flex items-center gap-3 px-5 py-2.5 min-w-[220px] bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-md border-l-[3px] border-white/40 group-hover:border-cyan-400 group-hover:from-cyan-500/20 group-hover:to-transparent transition-all"
         style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}>
      
      {/* Icon Frame - SAO Diamond Style */}
      <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-white/5 border border-white/20 group-hover:border-cyan-400 group-hover:bg-cyan-400/20 transition-all rotate-45">
         <div className="-rotate-45 text-white group-hover:text-cyan-400 transition-colors">
           {React.cloneElement(icon as React.ReactElement<any>, { className: "w-4 h-4 fill-current" })}
         </div>
      </div>

      {/* Label Group */}
      <div className="flex flex-col items-start z-10">
        <h2 className="text-base font-black italic tracking-[0.15em] text-white uppercase group-hover:text-cyan-400 transition-colors font-orbitron">
          {label}
        </h2>
        <span className="text-[6px] font-mono text-white/40 uppercase tracking-[0.3em] font-bold group-hover:text-cyan-700 transition-colors">
          {sub}
        </span>
      </div>

      {/* Right-side Selection Indicator */}
      <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all">
         <div className="w-1.5 h-1.5 bg-cyan-400 rotate-45 animate-pulse"></div>
      </div>
    </div>
  </button>
);

// *MAIN DASHBOARD* Gurnoor's epic menu system! 🎯
export const SAODashboard: React.FC<SAODashboardProps> = ({ onSelect }) => {
  // *SYNC PERCENTAGE* Animated health bar! 📊
  const [percent, setPercent] = useState(99.9);

  // *PERCENTAGE ANIMATION* Random fluctuations for realism! 🎲
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(p => Math.max(98.5, Math.min(99.9, p + (Math.random() - 0.5) * 0.1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-start pl-32 animate-in fade-in duration-700">
      
      {/* CLEANER SAO BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #00f7ff 0, #00f7ff 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
        <div className="absolute top-1/2 left-[-200px] -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
      </div>

      {/* PLAYER STATUS BAR (Top Left) - Cleaned as per request */}
      <div className="absolute top-12 left-12 flex flex-col gap-2 animate-in slide-in-from-top-10 duration-700">
         {/* Name Only */}
         <div className="flex items-end gap-2 mb-1">
            <div className="bg-white px-4 py-0.5 skew-x-[-20deg] shadow-[0_0_15px_rgba(255,255,255,0.3)]">
               <span className="block skew-x-[20deg] text-black text-[9px] font-black italic tracking-[0.25em]">ROSALIND_FRANKLIN</span>
            </div>
            {/* Removed LV. 99 */}
         </div>
         
         {/* Progress Bar Only */}
         <div className="flex items-center gap-2">
            <div className="relative w-64 h-2.5 bg-black/60 border border-white/10 skew-x-[-20deg] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)]">
               {/* HP/Sync Bar */}
               <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-green-400 transition-all duration-1000 shadow-[0_0_10px_rgba(74,222,128,0.5)]" style={{ width: `${percent}%` }}></div>
               {/* Shimmer Effect */}
               <div className="absolute inset-0 bg-white/5 skew-x-[20deg] animate-[shimmer_4s_infinite]"></div>
            </div>
            {/* Removed Numerical Percentage */}
         </div>
         
         {/* Secondary Stat Line */}
         <div className="flex items-center gap-3 mt-1 opacity-30">
            <div className="w-32 h-[1px] bg-gradient-to-r from-cyan-500 via-cyan-500/30 to-transparent"></div>
            <span className="text-[6px] font-mono text-cyan-400 tracking-[0.5em] uppercase font-bold">NEURAL_STABILITY: OPTIMAL</span>
         </div>
      </div>

      {/* MAIN VERTICAL MENU */}
      <div className="relative z-20 flex flex-col pt-20">
        <div className="mb-6 space-y-1.5 animate-in slide-in-from-left-10 duration-500">
           <div className="flex items-center gap-2">
              <div className="w-6 h-[1.5px] bg-cyan-500"></div>
              <span className="text-[7px] font-black tracking-[1.2em] text-cyan-500 uppercase italic">MAIN_MENU</span>
           </div>
        </div>

        <div className="flex flex-col gap-1">
          <MenuOption 
            index={0}
            label="VOICE_LINK" 
            sub="ESTABLISH_NEURAL_UPLINK"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            }
            onClick={() => onSelect('LISTENING')}
          />
          <MenuOption 
            index={1}
            label="RESEARCH_NODES" 
            sub="HISTORICAL_ARCHIVE_DREDGE"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17l-7-3.82v2.45L12 19.45l7-3.82v-2.45L12 17z"/>
              </svg>
            }
            onClick={() => onSelect('LEARNING')}
          />
          <MenuOption 
            index={2}
            label="TERMINAL_DIRECT" 
            sub="TEXT_SYNAPSE_CONNECTION"
            icon={
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 3l1.5 1.5L8.5 12l4 4-1.5 1.5L6 12l5-5zm7 10h-6v-2h6v2z"/>
              </svg>
            }
            onClick={() => onSelect('TEXT_CHAT')}
          />
        </div>
      </div>

      {/* FOOTER METADATA */}
      <div className="absolute bottom-8 left-8 flex items-center gap-6 opacity-20">
         <div className="w-[1px] h-8 bg-gradient-to-t from-white to-transparent"></div>
         <div className="flex flex-col gap-0.5">
            <span className="text-[6px] font-mono text-white tracking-[0.6em] uppercase font-black">SYSTEM_AUTH: OVERRIDE_ACTIVE</span>
            <span className="text-[5px] font-mono text-white/50 tracking-[0.3em] uppercase">UID: 0xF51_DNA_CORE_v6</span>
         </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}</style>
    </div>
  );
};
