// *MOVIE REEL SOUNDS* 🎬
// Cinematic Intro Component - Gurnoor Tamber's dramatic entrance! 🎭

import React, { useState, useEffect, useRef } from 'react';

// *VIDEO PATHS* Backup locations for our epic video! 🎥
const PRIMARY_VIDEO_SRC = './components/In_the_photo_1080p_202512311833.mp4';
const SECONDARY_VIDEO_SRC = './In_the_photo_1080p_202512311833.mp4';

interface CinematicIntroProps {
  onComplete: () => void;
}

// *STAGE TYPES* Different acts of our cinematic masterpiece! 🎬
type IntroStage = 'BOOT' | 'VIDEO' | 'CHOICE' | 'GLITCH' | 'RESTORE' | 'SUCCESS';

// *HERO ENTRANCE* The Cinematic Intro component! Gurnoor's storytelling at its finest! 📖
export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  // *STATE VARIABLES* All the moving parts! 🎪
  const [stage, setStage] = useState<IntroStage>('BOOT');
  const [glitchText, setGlitchText] = useState('');
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [interactionRequired, setInteractionRequired] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMounted = useRef(true); // *SAFETY CHECK* Prevent memory leaks! 🛡️

  // *BOOT TIMER* Stage transitions! Smooth as silk! 🕐
  useEffect(() => {
    isMounted.current = true;
    if (stage === 'BOOT') {
      const timer = setTimeout(() => {
        if (isMounted.current) setStage('VIDEO');
      }, 1200);
      return () => {
        isMounted.current = false;
        clearTimeout(timer);
      };
    }
    return () => {
      isMounted.current = false;
    };
  }, [stage]);

  // *VIDEO PLAYBACK* Handle the epic video! Browser security? We got this! 🎬🔒
  useEffect(() => {
    if (stage === 'VIDEO' && videoRef.current) {
      const video = videoRef.current;
      
      const attemptPlay = async () => {
        if (!video || !isMounted.current) return;
        
        try {
          // *MUTE FIRST* Browser autoplay policy - we respect it! 🤝
          video.muted = true; 
          setIsMuted(true);
          
          const playPromise = video.play();
          
          if (playPromise !== undefined) {
            await playPromise;
            if (isMounted.current) {
              setInteractionRequired(false);
            }
          }
        } catch (error: any) {
          if (isMounted.current) {
            console.warn("Neural Link: Autoplay managed by system security.", error.name);
            if (error.name === 'NotAllowedError') {
              setInteractionRequired(true); // *USER INTERACTION NEEDED* Click to play! 👆
            }
          }
        }
      };
      
      const timer = setTimeout(attemptPlay, 100);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // *UNMUTE BUTTON* Let the sound waves flow! 🔊
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setInteractionRequired(false);
      videoRef.current.play().catch(console.error);
    }
  };

  // *VIDEO END* Time for the choice! Gurnoor's interactive storytelling! 🎯
  const handleVideoEnd = () => {
    if (isMounted.current) setStage('CHOICE');
  };

  // *ERROR HANDLER* Video not loading? No problem! We have backups! 🛡️
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    // *SAFETY FIRST* Use ref directly to avoid event issues! 🎯
    const video = videoRef.current;
    if (!video) return;

    const error = video.error;
    
    // *FALLBACK MODE* Try the secondary path! Gurnoor's redundancy system! 🔄
    if (!videoError && isMounted.current) {
      // Check if we already tried the fallback
      if (video.src.includes('components')) {
         console.warn(`Neural Link: Primary path [${PRIMARY_VIDEO_SRC}] failed. Attempting secondary archive path...`);
         video.src = SECONDARY_VIDEO_SRC;
         // *LOAD FUNCTION* Safely reload the video! 🎬
         if (typeof video.load === 'function') {
            video.load();
         }
         return;
      }
    }

    console.error(`Neural Link Video Decryption Error. Code: ${error?.code}. Message: ${error?.message}. Path: ${video.src}`);
    
    if (isMounted.current) {
      setVideoError(true);
      // *AUTO-ADVANCE* Don't block the user! Skip to choice stage! ⏭️
      const timer = setTimeout(() => {
        if (isMounted.current && stage === 'VIDEO') setStage('CHOICE');
      }, 1500);
      return () => clearTimeout(timer);
    }
  };

  // *CHOICE HANDLER* The user's decision! Gurnoor's branching narrative! 🎭
  const handleChoice = (isTrue: boolean) => {
    if (isTrue) {
      // *GLITCH MODE* Wrong answer? Time for dramatic effects! 💥
      setStage('GLITCH');
      setGlitchText('CRITICAL_SYNC_ERROR: HISTORICAL_BIAS_DETECTED');
      setTimeout(() => {
        if (!isMounted.current) return;
        setGlitchText('DATA_INTEGRITY_COMPROMISED: "FRANKLIN_NOT_RECOGNIZED"');
        setTimeout(() => {
          if (isMounted.current) setStage('CHOICE'); // *RETRY* Back to choice! 🔄
        }, 1500);
      }, 1200);
    } else {
      // *SUCCESS PATH* Correct answer! Restore and celebrate! 🎉
      setStage('RESTORE');
      setTimeout(() => {
        if (isMounted.current) setStage('SUCCESS');
      }, 3000);
    }
  };

  // *SKIP BUTTON* Impatient? Skip ahead! ⏩
  const skipVideo = () => {
    if (isMounted.current) setStage('CHOICE');
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black overflow-hidden font-orbitron text-white flex items-center justify-center">
      {/* Anime Sci-Fi Grid Atmosphere */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,247,255,0.1)_0%,transparent_75%)]"></div>
        <div className="absolute inset-0" style={{ 
             backgroundImage: 'linear-gradient(rgba(0,247,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,247,255,0.03) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
             transform: 'perspective(1000px) rotateX(45deg) translateY(-20%)'
           }}></div>
      </div>

      {/* Stage: BOOTING */}
      {stage === 'BOOT' && (
        <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-700">
           <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 border border-cyan-500/20 rotate-45 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-cyan-500/40 -rotate-12 animate-[spin_6s_linear_infinite_reverse]"></div>
              <div className="w-2 h-2 bg-cyan-400 shadow-[0_0_20px_cyan]"></div>
           </div>
           <span className="text-[10px] font-black tracking-[1.5em] text-cyan-500 uppercase animate-pulse">DECRYPTING_MEMORY_FRAGMENT_0x51</span>
        </div>
      )}

      {/* Video Fragment Interaction Layer */}
      {(stage === 'VIDEO' || stage === 'CHOICE' || stage === 'GLITCH' || stage === 'RESTORE') && (
        <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1000 ${stage !== 'VIDEO' ? 'scale-90 opacity-40 blur-2xl' : 'scale-100 opacity-100'}`}>
          
          <div className="relative w-full max-w-6xl aspect-video border border-white/5 bg-black shadow-[0_0_120px_rgba(0,0,0,1)] overflow-hidden">
            {/* Technical HUD Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10">
               <div className="absolute top-8 left-8 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                     <span className="text-[8px] font-black text-cyan-400 tracking-widest uppercase italic">LIVE_FEED // DNA_ARCHIVE_0x1953</span>
                  </div>
                  <div className="h-[1px] w-32 bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
               </div>
               <div className="absolute bottom-8 left-8">
                  <span className="text-[7px] font-mono text-cyan-900 uppercase">LATENCY: 14ms // BITRATE: 48Mbps // SIGNAL: STABLE</span>
               </div>
            </div>

            <video 
              ref={videoRef}
              playsInline
              preload="auto"
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              src={PRIMARY_VIDEO_SRC}
              className={`w-full h-full object-contain grayscale transition-all duration-1000 ${videoError ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100 blur-0'}`}
            />

            {/* Unmute/Play Control Overlay */}
            {stage === 'VIDEO' && isMuted && !videoError && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <button 
                  onClick={handleUnmute}
                  className="px-6 py-2 bg-cyan-500/10 border border-cyan-400 text-cyan-400 text-[10px] font-black tracking-widest hover:bg-cyan-400 hover:text-black transition-all animate-bounce"
                >
                  UNMUTE_NEURAL_LINK
                </button>
              </div>
            )}

            {/* Interaction Required - Manual Play */}
            {interactionRequired && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-20">
                 <button 
                   onClick={handleUnmute} 
                   className="group relative px-12 py-6 border-2 border-cyan-400 overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all"></div>
                    <span className="relative z-10 text-xl font-black italic tracking-[0.4em] text-cyan-300">RESYNC_NEURAL_UPLINK</span>
                 </button>
              </div>
            )}

            {/* Video Error Handling */}
            {videoError && stage === 'VIDEO' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-30 p-4 text-center">
                 <div className="w-20 h-20 border border-red-500/20 rotate-45 flex items-center justify-center mb-10">
                    <span className="text-red-500 text-4xl -rotate-45 font-black">!</span>
                 </div>
                 <span className="text-red-500 font-black tracking-[0.6em] text-xs uppercase mb-2">ARCHIVE_DECRYPTION_FAILURE</span>
                 <p className="text-[9px] font-mono text-red-900 uppercase max-w-md">Unable to locate memory node. Skipping fragment...</p>
                 <button onClick={skipVideo} className="mt-8 px-10 py-3 border border-red-500/40 text-red-400 text-[10px] font-black hover:bg-red-500/10 transition-all">FORCE_BYPASS {'>'}{'>'} </button>
              </div>
            )}

            {/* Skip Option */}
            {stage === 'VIDEO' && !videoError && (
               <button onClick={skipVideo} className="absolute bottom-8 right-8 z-20 text-[8px] font-black text-cyan-500/40 hover:text-cyan-400 transition-colors uppercase tracking-[0.3em]">Skip_Frag {'>'}{'>'}</button>
            )}
          </div>
        </div>
      )}

      {/* Interaction Stage: CHOICE */}
      {stage === 'CHOICE' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[210] p-10 animate-in zoom-in-110 fade-in duration-700">
           <div className="max-w-4xl w-full text-center space-y-16">
              <div className="space-y-6">
                 <div className="flex items-center justify-center gap-8 mb-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/30"></div>
                    <span className="text-[10px] font-black tracking-[1.5em] text-cyan-500 uppercase">Validation_Required</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/30"></div>
                 </div>
                 <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
                   "We discovered the secret of life!"
                 </h2>
                 <p className="text-cyan-800 text-[9px] font-bold tracking-[0.8em] uppercase mt-4">Identify the historical fidelity of this statement.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 justify-center">
                 <button onClick={() => handleChoice(true)} className="group relative px-24 py-12 border-2 border-cyan-400/20 hover:border-cyan-400 transition-all hover:scale-105">
                    <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 transition-all"></div>
                    <span className="relative text-4xl font-black italic tracking-widest text-white group-hover:text-cyan-400">TRUE</span>
                 </button>
                 <button onClick={() => handleChoice(false)} className="group relative px-24 py-12 border-2 border-red-500/20 hover:border-red-500 transition-all hover:scale-105">
                    <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-all"></div>
                    <span className="relative text-4xl font-black italic tracking-widest text-white group-hover:text-red-400">FALSE</span>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Stage: GLITCH */}
      {stage === 'GLITCH' && (
        <div className="absolute inset-0 bg-red-950/60 backdrop-blur-2xl z-[220] flex flex-col items-center justify-center animate-[glitch_0.1s_infinite]">
           <div className="border-[10px] border-red-600 p-12 bg-black shadow-[0_0_100px_rgba(239,68,68,0.3)]">
              <h3 className="text-4xl md:text-6xl font-black text-red-600 uppercase italic text-center max-w-2xl leading-tight">{glitchText}</h3>
           </div>
        </div>
      )}

      {/* Stage: RESTORE */}
      {stage === 'RESTORE' && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl z-[220] flex flex-col items-center justify-center">
           <div className="relative w-80 h-80 flex items-center justify-center">
              <div className="absolute inset-0 border-t-[4px] border-cyan-400 rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-b-[2px] border-cyan-400/40 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>
              <span className="text-[12px] font-black tracking-[1.5em] text-cyan-400 animate-pulse ml-[1.5em] uppercase">SYNCHRONIZING_CORE</span>
           </div>
        </div>
      )}

      {/* Stage: SUCCESS */}
      {stage === 'SUCCESS' && (
        <div className="absolute inset-0 bg-black z-[230] flex flex-col items-center justify-center animate-in zoom-in-110 duration-1500">
           <div className="text-center space-y-20 p-10">
              <div className="space-y-6">
                 <span className="text-[10px] font-black tracking-[2em] text-cyan-600 uppercase ml-[2em]">NEURAL_RECONSTRUCTION_COMPLETE</span>
                 <h1 className="text-7xl md:text-9xl font-black italic text-white drop-shadow-[0_0_80px_rgba(0,247,255,1)] uppercase tracking-tighter">DR. FRANKLIN</h1>
                 <p className="text-[10px] font-mono text-cyan-950 tracking-[1.5em] uppercase italic">THE_TRUE_ARCHITECT_HAS_MATERIALIZED</p>
              </div>
              <button 
                onClick={onComplete} 
                className="group relative px-32 py-12 border-2 border-cyan-400 bg-cyan-400/5 hover:bg-cyan-400 hover:text-black transition-all hover:scale-110 active:scale-95"
              >
                 <div className="absolute inset-[-10px] border border-cyan-400/20 animate-pulse"></div>
                 <span className="relative z-10 text-3xl font-black tracking-[0.5em] italic uppercase">INITIALIZE_LINK</span>
              </button>
           </div>
        </div>
      )}

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); clip-path: inset(10% 0 30% 0); }
          20% { transform: translate(-5px, 5px); clip-path: inset(40% 0 10% 0); }
          40% { transform: translate(-5px, -5px); clip-path: inset(20% 0 50% 0); }
          60% { transform: translate(5px, 5px); clip-path: inset(70% 0 10% 0); }
          80% { transform: translate(5px, -5px); clip-path: inset(0 0 80% 0); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};
