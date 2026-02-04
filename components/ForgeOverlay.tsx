// *FORGE ACTIVATED* 🔨✨
// The Forge Overlay - Gurnoor Tamber's creative materialization engine!
// Where images and videos come to life! 🎨🎬

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ForgeOverlayProps {
  type: 'image' | 'video';
  prompt: string;
  onClose: () => void;
}

// *FORGE MESSAGES* Epic status updates! Each one cooler than the last! 🌟
const FORGE_MESSAGES = [
  "CALIBRATING_DIFFRACTION...",
  "SYNTHESIZING_ATOMS...",
  "COMPILING_TEMPORAL_DATA...",
  "STABILIZING_ELECTRON_CLOUDS...",
  "ENCODING_FIDELITY...",
  "FINALIZING_RENDER..."
];

// *MAIN FORGE COMPONENT* Gurnoor's materialization machine! 🔥
export const ForgeOverlay: React.FC<ForgeOverlayProps> = ({ type, prompt, onClose }) => {
  // *STATE VARIABLES* All the forge controls! ⚙️
  const [status, setStatus] = useState<'FORGING' | 'SUCCESS' | 'ERROR'>('FORGING');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [forgeLog, setForgeLog] = useState<string>(FORGE_MESSAGES[0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const logTimerRef = useRef<number | null>(null); // *TIMER REF* For cleanup! 🧹

  // *FORGE INITIATION* Start the materialization process! 🚀
  useEffect(() => {
    let logIdx = 0;
    // *LOG ROTATION* Cycle through those epic messages! 📜
    logTimerRef.current = window.setInterval(() => {
      logIdx = (logIdx + 1) % FORGE_MESSAGES.length;
      setForgeLog(FORGE_MESSAGES[logIdx]);
      setProgress(p => Math.min(98, p + (type === 'video' ? 1.5 : 8))); // *PROGRESS* Videos take longer! ⏱️
    }, 2000);

    // *ASYNC FORGE* The actual materialization! Gurnoor's AI magic! ✨
    const initiateForge = async () => {
      try {
        // *AI INITIALIZATION* Connect to Gurnoor's AI network! 🤖
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // *IMAGE GENERATION* Create those visuals! 🎨
        if (type === 'image') {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: { imageConfig: { aspectRatio: "1:1" } }
          });
          
          let foundImage = false;
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              setResultUrl(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
              foundImage = true;
              break;
            }
          }
          if (!foundImage) throw new Error("NEURAL_RENDER_EMPTY: No visual data returned.");
          setStatus('SUCCESS');
          setProgress(100);
        } else {
          // *VIDEO GENERATION* The big one! Temporal materialization! 🎬
          let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
          });

          // *POLLING LOOP* Wait for video to finish! Patience is a virtue! ⏳
          while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 8000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
          }

          const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
          if (!downloadLink) throw new Error("TEMPORAL_LINK_NULL: Video fragment missing.");
          
          const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
          const blob = await response.blob();
          setResultUrl(URL.createObjectURL(blob));
          setStatus('SUCCESS');
          setProgress(100);
        }
      } catch (err: any) {
        console.error("FORGE_FAILURE:", err);
        setErrorMsg(err.message || "Unknown disruption in neural forge.");
        setStatus('ERROR');
      } finally {
        if (logTimerRef.current) clearInterval(logTimerRef.current);
      }
    };

    initiateForge();

    return () => {
      if (logTimerRef.current) clearInterval(logTimerRef.current);
    };
  }, [type, prompt]);


  return (
    <div className="fixed inset-0 z-[600] bg-black/40 backdrop-blur-md flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in duration-500 font-orbitron">
      
      {/* SAO Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-24 h-24 border border-white/5 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-magenta-500/10 rotate-[15deg] animate-[spin_20s_linear_infinite]"></div>
      </div>

      <div className="relative w-full max-w-5xl flex flex-col items-center gap-8">
        
        {/* Top Header Label - SAO Floating Style */}
        <div className="flex items-center gap-10 animate-in slide-in-from-top-10 duration-700">
           <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-magenta-500 shadow-[0_0_10px_magenta]"></div>
           <div className="flex flex-col items-center">
             <h2 className="text-3xl font-black italic tracking-[0.4em] text-white uppercase drop-shadow-[0_0_20px_rgba(255,0,255,0.8)]">
               FORGE_PROTOCOL
             </h2>
             <span className="text-[9px] font-mono text-magenta-400 tracking-[1em] mt-2 uppercase ml-[1em]">
               Materializing_{type}
             </span>
           </div>
           <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-magenta-500 shadow-[0_0_10px_magenta]"></div>
        </div>

        {/* Main Content Area */}
        <div className="relative w-full min-h-[50vh] flex flex-col items-center justify-center p-12 bg-black/60 backdrop-blur-3xl border-t border-b border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
           
           {/* Hex Pattern Overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'28\' height=\'49\' viewBox=\'0 0 28 49\'%3E%3Cpath fill=\'%23ff00ff\' fill-opacity=\'1\' d=\'M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9l10.99-6.35L25 17.9v12.7L13.99 36.95 3 30.6V17.9z\'/%3E%3C/svg%3E")' }}></div>


           {status === 'FORGING' && (
             <div className="w-full flex flex-col items-center gap-16 relative z-10">
                {/* SAO Diamond Spinner */}
                <div className="relative w-56 h-56 flex items-center justify-center">
                   <div className="absolute inset-0 border-[2px] border-magenta-500/20 rotate-45 animate-[spin_10s_linear_infinite]"></div>
                   <div className="absolute inset-4 border-[1px] border-white/20 rotate-[-15deg] animate-[spin_5s_linear_infinite_reverse]"></div>
                   <div className="absolute inset-8 border-[2px] border-magenta-400 rotate-45 shadow-[0_0_30px_rgba(255,0,255,0.4)]"></div>
                   
                   <div className="relative flex flex-col items-center">
                      <span className="text-5xl font-black italic text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">{Math.floor(progress)}</span>
                      <span className="text-[10px] font-black text-magenta-500 uppercase tracking-widest mt-1">%_SYNC</span>
                   </div>
                </div>

                <div className="flex flex-col items-center gap-4 text-center">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-white rotate-45 animate-bounce"></div>
                      <span className="text-[14px] font-black tracking-[0.6em] text-white uppercase italic">{forgeLog}</span>
                      <div className="w-2 h-2 bg-white rotate-45 animate-bounce [animation-delay:0.2s]"></div>
                   </div>
                   <div className="max-w-md p-4 border border-white/5 bg-white/5 backdrop-blur-md">
                      <p className="text-[8px] font-mono text-cyan-500 uppercase tracking-widest leading-relaxed">
                        INPUT_VECTOR: "{prompt}"
                      </p>
                   </div>
                </div>
             </div>
           )}

           {status === 'SUCCESS' && resultUrl && (
             <div className="w-full flex flex-col items-center gap-12 animate-in zoom-in-110 duration-700 relative z-10">
                <div className="relative w-full max-w-4xl aspect-video bg-black/60 border-2 border-magenta-500/40 shadow-[0_0_100px_rgba(255,0,255,0.2)] overflow-hidden rounded-sm">
                   {type === 'image' ? (
                     <img src={resultUrl} alt="Neural Forge Fragment" className="w-full h-full object-contain" />
                   ) : (
                     <video src={resultUrl} controls autoPlay loop className="w-full h-full object-contain" />
                   )}
                   
                   {/* HUD Overlays on result */}
                   <div className="absolute top-4 left-4 p-2 bg-magenta-500/10 backdrop-blur-md border-l-2 border-magenta-500">
                      <span className="text-[8px] font-black text-white tracking-widest uppercase">STABILIZED_FRAGMENT_0x51</span>
                   </div>
                   <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-1 text-[7px] font-mono text-white/40 uppercase tracking-widest border border-white/10">
                     MATERIALIZATION: SUCCESSFUL
                   </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg">
                   <a 
                    href={resultUrl} 
                    download={`forge_${type}_${Date.now()}.${type === 'image' ? 'png' : 'mp4'}`}
                    className="flex-1 px-10 py-5 bg-magenta-500 text-black font-black italic tracking-[0.2em] hover:bg-white transition-all text-[12px] text-center"
                    style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }}
                   >
                     SAVE_FRAGMENT
                   </a>
                   <button 
                    onClick={onClose} 
                    className="flex-1 px-10 py-5 border-2 border-white/40 text-white hover:border-white transition-all font-black italic tracking-[0.2em] text-[12px]"
                    style={{ clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0 100%)' }}
                   >
                     DISMISS_LINK
                   </button>
                </div>
             </div>
           )}

           {status === 'ERROR' && (
             <div className="flex flex-col items-center gap-8 text-center relative z-10 animate-in shake duration-500">
                <div className="w-20 h-20 border-2 border-red-500 rotate-45 flex items-center justify-center mb-4 bg-red-500/10">
                   <span className="text-red-500 text-4xl -rotate-45 font-black">!</span>
                </div>
                <div className="space-y-2">
                   <h2 className="text-2xl font-black text-white uppercase italic tracking-widest">FORGE_DISRUPTION</h2>
                   <p className="text-[9px] font-mono text-red-400 uppercase tracking-[0.3em] max-w-sm border-t border-red-500/20 pt-4 opacity-70">
                     {errorMsg}
                   </p>
                </div>
                <button 
                  onClick={onClose} 
                  className="px-12 py-4 border-2 border-white/20 text-white hover:border-red-500 transition-all font-black text-[10px] tracking-widest"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}
                >
                  RETURN_TO_CORE
                </button>
             </div>
           )}
        </div>

        {/* Footer Info Lines */}
        <div className="w-full flex justify-between items-center opacity-40 px-6">
           <div className="flex gap-10">
              <div className="flex flex-col">
                <span className="text-[6px] font-black text-white uppercase">NEURAL_LOAD</span>
                <div className="w-24 h-1 bg-white/10 mt-1">
                   <div className="h-full bg-magenta-500 w-[88%]"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[6px] font-black text-white uppercase">SYNC_PRECISION</span>
                <span className="text-[9px] font-mono text-magenta-500 uppercase tracking-widest">99.98%</span>
              </div>
           </div>
           <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] italic">
             ROSALIND_FRANKLIN_NEURAL_FORGE_SUBSTRATE
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};
