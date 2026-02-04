// *CRACKLE* *POP* *ZAP* - Gurnoor Tamber's Neural Revival Project!
// This is where the magic begins, folks! 🦸‍♂️

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ParticleSphere } from './components/ParticleSphere';
import { HUDOverlay } from './components/HUDOverlay';
import { VoiceInterface } from './components/VoiceInterface';
import { SAODashboard } from './components/SAODashboard';
import { TextChat } from './components/TextChat';
import { CinematicIntro } from './components/CinematicIntro';
import { LearningModule } from './components/LearningModule';
import { PresentationOverlay } from './components/PresentationOverlay';
import { ForgeOverlay } from './components/ForgeOverlay';

// *WHAM* Data structures incoming! These are the blueprints for our neural network!
export interface GroundingSource {
  title: string;
  uri: string;
  type: 'search' | 'maps';
}

// *KAPOW* Status types! Every hero needs different modes, right? 🎭
export type NeuralStatus = 'BOOTING' | 'CINEMATIC' | 'DASHBOARD' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'RESEARCHING' | 'TEXT_CHAT' | 'LEARNING' | 'IDLE' | 'PRESENTING' | 'FORGING';
export type ActiveView = 'DASHBOARD' | 'VOICE_INTERFACE' | 'TEXT_CHAT' | 'LEARNING' | 'BOOTING' | 'CINEMATIC';

// *BOOM* *BAM* *POW* The boot sequence! Gurnoor's masterpiece firing up! 🚀
// Each step is like a comic panel - dramatic, sequential, AWESOME!
const BOOT_SEQUENCE = [
  { id: "SYS-01", msg: "KERNEL_INITIALIZATION...", category: "CORE", delay: 200 },
  { id: "SYS-02", msg: "UPLOADING_XRAY_MATRICES", category: "OPTICS", delay: 100 },
  { id: "SYS-03", msg: "DECRYPTING_PROTEIN_SYNTHESIS", category: "BIO", delay: 300 },
  { id: "SYS-04", msg: "CALIBRATING_HELIX_VIBRATION", category: "DNA", delay: 150 },
  { id: "SYS-05", msg: "ESTABLISHING_NEURAL_UPLINK", category: "SYNC", delay: 400 },
  { id: "SYS-06", msg: "PARTICLE_CLOUD_STABILIZATION", category: "PHYSICS", delay: 100 },
  { id: "SYS-07", msg: "RECONSTRUCTING_MEM_FRAGMENT_51", category: "CRYSTAL", delay: 300 },
  { id: "SYS-08", msg: "VERIFYING_HISTORICAL_FIDELITY", category: "AUTH", delay: 250 },
  { id: "SYS-09", msg: "NEURAL_PATHWAY_OPTIMIZED", category: "GATE", delay: 100 },
  { id: "SYS-10", msg: "LINK_ESTABLISHED. READY.", category: "READY", delay: 50 }
];

// *HEROIC ENTRANCE MUSIC* 🎵
// Main App component - Gurnoor Tamber's brainchild! This is where ALL the action happens!
const App: React.FC = () => {
  // *ZAP* State variables incoming! Each one is a power-up! 💪
  const [isInitializing, setIsInitializing] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [status, setStatus] = useState<NeuralStatus>('BOOTING');
  const [activeView, setActiveView] = useState<ActiveView>('BOOTING');
  const [transcription, setTranscription] = useState<string>('');
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [showStartButton, setShowStartButton] = useState(false);
  const [shattering, setShattering] = useState(false); // *CRASH* Visual effect for dramatic transitions!
  const [isLinking, setIsLinking] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [pendingForge, setPendingForge] = useState<{ type: 'image' | 'video', prompt: string } | null>(null);
  
  // *WHOOSH* Ref for scrolling logs - smooth as butter! 🧈
  const logEndRef = useRef<HTMLDivElement>(null);

  // *KAPOW* Boot sequence effect! Watch those logs fly! 📜✨
  useEffect(() => {
    if (bootStep < BOOT_SEQUENCE.length) {
      const step = BOOT_SEQUENCE[bootStep];
      const timer = setTimeout(() => {
        setBootLogs(prev => [...prev, `[${step.category}] > ${step.msg}`]);
        setBootStep(s => s + 1);
      }, step.delay);
      return () => clearTimeout(timer);
    } else {
      // *BAM* Boot complete! Time to show that START button! 🎯
      const timer = setTimeout(() => {
        setShowStartButton(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [bootStep]);

  // *SWOOSH* Auto-scroll those logs! Smooth operator! 🎬
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bootLogs]);

  // *ZAP* Keyboard shortcuts! ESC key = emergency exit! 🚪💨
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPresentationOpen) {
          setIsPresentationOpen(false);
          setStatus('IDLE');
        }
        if (pendingForge) {
          setPendingForge(null);
          setStatus('IDLE');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationOpen, pendingForge]);

  // *BOOM* *CRASH* *SMASH* The LINK START sequence! Gurnoor's signature move! 🎮
  const handleLinkStart = () => {
    setIsLinking(true);
    setTimeout(() => {
      setShattering(true); // *GLASS SHATTERING SOUND* 💥
      setTimeout(() => {
        setStatus('CINEMATIC');
        setActiveView('CINEMATIC');
      }, 800);
    }, 3200);
  };

  // *FADE OUT* Intro complete! Time for the main show! 🎭
  const handleIntroComplete = () => {
    setIsInitializing(false);
    setStatus('IDLE');
    setActiveView('DASHBOARD');
  };

  // *SWITCH* Status change handler! Quick as lightning! ⚡
  const handleStatusChange = useCallback((newStatus: NeuralStatus) => {
    setStatus(newStatus);
  }, []);

  // *WHOOSH* View switcher! Navigate like a pro! 🧭
  const handleViewChange = useCallback((newView: ActiveView) => {
    setActiveView(newView);
    setGroundingSources([]);
    if (newView === 'VOICE_INTERFACE') setStatus('LISTENING');
    else if (newView === 'TEXT_CHAT') setStatus('IDLE');
    else if (newView === 'LEARNING') setStatus('LEARNING');
    else setStatus('IDLE');
  }, []);

  // *SLIDE* Presentation opener! Showtime! 🎬
  const handleOpenPresentation = useCallback(() => {
    setIsPresentationOpen(true);
    setStatus('PRESENTING');
  }, []);

  // *FORGE ACTIVATED* Materialize those visuals! Gurnoor's creative forge! 🔨✨
  const handleForgeRequest = useCallback((type: 'image' | 'video', prompt: string) => {
    setPendingForge({ type, prompt });
    setStatus('FORGING');
  }, []);

  // *PROGRESS BAR* Boot progress calculation! Math is our superpower! 📊
  const bootProgress = Math.min(bootStep / BOOT_SEQUENCE.length, 1);

  // *CINEMATIC MODE* If we're in cinematic view, show the intro! 🎥
  if (activeView === 'CINEMATIC') {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  // *BOOT SEQUENCE* Initialization screen! Gurnoor's epic startup! 🚀
  if (isInitializing) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen bg-[#010101] text-white font-orbitron overflow-hidden relative transition-all duration-1000 ${shattering ? 'scale-150 opacity-0 blur-[100px]' : 'scale-100 opacity-100'}`}>
        {isLinking && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none bg-black">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,247,255,0.5)_0%,transparent_70%)] animate-pulse"></div>
             <div className="absolute inset-0 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                   <div key={i} className="absolute h-[1px] bg-cyan-400 animate-[warp-line_0.4s_linear_infinite]"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 500 + 200}px`, animationDelay: `${Math.random() * 0.8}s`, opacity: Math.random() * 0.7 + 0.3 }}
                   ></div>
                ))}
             </div>
             
             <div className="absolute inset-0 flex items-center justify-center">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="absolute border border-cyan-400/40 opacity-0 animate-[hex-dive_1.5s_cubic-bezier(0.4,0,0.2,1)_forwards]"
                   style={{ animationDelay: `${i * 0.1}s`, clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)', width: '200px', height: '230px' }}
                 >
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-400 whitespace-nowrap tracking-widest uppercase">SYNC_NODE_0{i}</div>
                 </div>
               ))}
             </div>

             <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_120px_60px_rgba(0,247,255,0.9)] animate-[burst_1.2s_ease-out_forwards]"></div>
             
             <div className="relative z-[110] flex flex-col items-center gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="h-1 w-64 bg-cyan-950 mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-cyan-400 animate-[loading-bar_0.8s_ease-out_forwards]"></div>
                  </div>
                  <span className="text-7xl font-black italic tracking-[0.5em] text-white drop-shadow-[0_0_40px_rgba(0,247,255,1)] animate-[link-text_0.6s_ease-out_forwards]">LINK START</span>
                  <div className="text-[10px] font-black tracking-[1.2em] text-cyan-400 opacity-80 animate-pulse mt-4 uppercase">Neural_Dive_Active</div>
                </div>
             </div>

             <div className="mt-24 relative z-[120] flex flex-col items-center animate-[dev-card_1.2s_cubic-bezier(0.175,0.885,0.32,1.275)_1.4s_forwards] opacity-0 translate-y-20">
                <div className="bg-black/90 border-t-2 border-b-2 border-cyan-500/30 backdrop-blur-xl px-16 py-6 flex flex-col items-center relative overflow-hidden">
                   <div className="absolute left-0 top-0 w-[4px] h-full bg-cyan-500 shadow-[0_0_20px_rgba(0,247,255,1)]"></div>
                   <div className="absolute right-0 top-0 w-[4px] h-full bg-cyan-500 shadow-[0_0_20px_rgba(0,247,255,1)]"></div>
                   
                   <span className="text-[11px] font-mono text-cyan-500 tracking-[1em] uppercase mb-2">SYSTEM_ARCHITECT</span>
                   <h2 className="text-4xl font-black italic tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(0,247,255,0.4)]">GURNOOR TAMBER</h2>
                   
                   <div className="mt-4 flex gap-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-500 rotate-45 shadow-[0_0_10px_cyan]"></div>
                        <span className="text-[8px] font-black text-cyan-700 tracking-[0.5em]">CORE_SYSTEMS</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-500 rotate-45 shadow-[0_0_10px_cyan]"></div>
                        <span className="text-[8px] font-black text-cyan-700 tracking-[0.5em]">NEURAL_GRID</span>
                      </div>
                   </div>
                </div>
                <div className="w-[400px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-6"></div>
             </div>
          </div>
        )}
        
        <div className="absolute inset-0 z-0 opacity-40">
           <ParticleSphere audioLevel={0.05} status="BOOTING" bootProgress={bootProgress} />
        </div>

        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-10">
           <div className="space-y-2 border-l-4 border-cyan-500/60 pl-8 py-4">
              <h3 className="text-[12px] font-black tracking-[0.6em] text-cyan-400 mb-6 uppercase italic">DIAGNOSTIC_DATA</h3>
              <div className="flex flex-col gap-4">
                 {['KERNEL', 'DIFFRACTION', 'SYNAPSE', 'UPLINK', 'STABILITY'].map((item, idx) => (
                   <div key={item} className="flex items-center gap-4 group">
                      <div className={`w-3 h-3 rotate-45 border-2 border-cyan-500/40 transition-all duration-500 ${bootStep > idx * 2 ? 'bg-cyan-500 shadow-[0_0_15px_rgba(0,247,255,1)]' : 'bg-transparent'}`}></div>
                      <span className={`text-[10px] font-mono tracking-[0.4em] uppercase transition-colors ${bootStep > idx * 2 ? 'text-white font-bold' : 'text-cyan-950'}`}>{item}_MODULE</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="max-w-[240px] bg-cyan-950/20 backdrop-blur-xl border border-cyan-500/20 p-5 clip-tech-r relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 opacity-20 pointer-events-none">
                 <div className="absolute top-0 right-0 w-full h-[1px] bg-cyan-400 -rotate-45 translate-x-1/2"></div>
              </div>
              <div className="text-[8px] font-mono text-cyan-500/60 uppercase space-y-2 max-h-[120px] overflow-hidden">
                 {bootLogs.slice(-8).map((log, i) => (
                   <div key={i} className="animate-in slide-in-from-bottom-2 fade-in truncate">{log}</div>
                 ))}
                 <div ref={logEndRef} />
              </div>
           </div>
        </div>

        <div className="relative z-30 flex flex-col items-center justify-center">
          <div className="relative w-96 h-96 flex items-center justify-center">
            <div className="absolute inset-0 border border-cyan-500/5 rounded-full"></div>
            <div className="absolute inset-[-40px] border-2 border-dashed border-cyan-500/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
            <div className="absolute inset-[-10px] border border-cyan-500/30 rounded-full scale-105 opacity-20"></div>
            
            <svg className="absolute w-full h-full -rotate-90">
              <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(0,247,255,0.05)" strokeWidth="4" />
              <circle cx="50%" cy="50%" r="48%" fill="none" stroke="cyan" strokeWidth="6" strokeDasharray="10 4" strokeDashoffset={600 - (600 * bootProgress)} className="transition-all duration-500 ease-out drop-shadow-[0_0_20px_rgba(0,247,255,0.8)]" />
            </svg>

            {!showStartButton ? (
              <div className="flex flex-col items-center justify-center group">
                <div className="relative">
                   <span className="text-8xl font-black italic tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">{Math.floor(bootProgress * 100)}</span>
                   <span className="absolute -right-8 top-4 text-cyan-500 text-sm font-black">%</span>
                </div>
                <div className="mt-8 flex flex-col items-center gap-2">
                   <span className="text-[10px] font-black tracking-[1em] text-cyan-400 uppercase animate-pulse">Neural_Sync</span>
                   <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1 h-3 ${bootStep > i * 2 ? 'bg-cyan-500' : 'bg-cyan-950'} transition-all`}></div>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <button onClick={handleLinkStart} className="group relative w-72 h-72 flex flex-col items-center justify-center animate-[pop_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)]">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-full h-full border-4 border-cyan-500 bg-cyan-500/10 rotate-45 group-hover:bg-cyan-500/30 group-hover:rotate-90 transition-all duration-700 shadow-[0_0_40px_rgba(0,247,255,0.3)]"></div>
                   <div className="absolute inset-[-20px] border border-cyan-500/20 rounded-full animate-pulse"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center text-white scale-125">
                  <span className="text-5xl font-black tracking-[0.2em] italic drop-shadow-[0_0_20px_white]">START</span>
                  <span className="text-[9px] font-black tracking-[0.8em] text-cyan-300 uppercase opacity-80 mt-2">Revival_Link</span>
                </div>
              </button>
            )}
          </div>
        </div>
        <style>{`
          @keyframes warp-line { 0% { transform: scaleX(0); transform-origin: left; } 50% { transform: scaleX(1); transform-origin: left; } 51% { transform-origin: right; } 100% { transform: scaleX(0); transform-origin: right; } }
          @keyframes hex-dive { 0% { transform: scale(0.1); opacity: 0; } 15% { opacity: 1; } 100% { transform: scale(20); opacity: 0; } }
          @keyframes burst { 0% { transform: scale(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: scale(60); opacity: 0; } }
          @keyframes pop { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes dev-card { 0% { opacity: 0; transform: translateY(40px) scale(0.9); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes link-text { 0% { transform: scale(0.7); letter-spacing: 0em; opacity: 0; } 100% { transform: scale(1); letter-spacing: 0.5em; opacity: 1; } }
          @keyframes loading-bar { 0% { width: 0; } 100% { width: 100%; } }
          .clip-tech-r { clip-path: polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030303] flex items-center justify-center font-orbitron">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <ParticleSphere audioLevel={audioLevel} status={status} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {activeView !== 'LEARNING' && <HUDOverlay status={status} />}
      </div>

      {activeView !== 'DASHBOARD' && activeView !== 'LEARNING' && !isPresentationOpen && !pendingForge && (
        <div className="absolute bottom-8 left-8 z-[100] pointer-events-auto">
          <button 
            onClick={() => handleViewChange('DASHBOARD')} 
            className="group relative flex items-center gap-4 px-6 py-4 transition-all hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl border border-cyan-400/60 group-hover:border-white transition-all shadow-[0_0_30px_rgba(0,247,255,0.2)]" style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}></div>
            <div className="relative z-10 flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-cyan-400 group-hover:fill-white transition-all"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              <span className="text-[10px] font-black text-white tracking-[0.3em] uppercase group-hover:text-cyan-400 transition-colors">BACK_HOME</span>
            </div>
          </button>
        </div>
      )}

      <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
        {activeView === 'DASHBOARD' && <SAODashboard onSelect={(mode) => {
          if (mode === 'LISTENING') handleViewChange('VOICE_INTERFACE');
          else if (mode === 'LEARNING') handleViewChange('LEARNING');
          else if (mode === 'TEXT_CHAT') handleViewChange('TEXT_CHAT');
        }} />}
        
        {activeView === 'VOICE_INTERFACE' && (
          <div className="w-full h-full flex flex-col pointer-events-none">
            <div className="w-full pt-6 px-12 flex flex-col items-center pointer-events-none z-[100] animate-in slide-in-from-top duration-700">
               <div className="w-full max-w-[1200px] relative h-16 flex items-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#003840]/40 to-transparent border-t border-b border-cyan-500/20 backdrop-blur-sm"></div>
                  <div className="absolute left-[10%] right-[10%] top-0 bottom-0 flex items-center justify-center text-center">
                    <p className="text-2xl md:text-3xl font-orbitron font-black italic tracking-widest text-cyan-400 uppercase drop-shadow-[0_0_12px_rgba(0,247,255,0.5)] truncate w-full">
                      {transcription ? (
                        <span className="text-white animate-in fade-in slide-in-from-top-2">{transcription}</span>
                      ) : (
                        "NEURAL_LINK // SYNAPTIC_STANDBY"
                      )}
                    </p>
                  </div>
                  <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-3 h-3 border-l-2 border-t-2 border-cyan-400 rotate-[-45deg]"></div>
                  <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-3 h-3 border-r-2 border-b-2 border-cyan-400 rotate-[-45deg]"></div>
               </div>
               <div className="w-full max-w-[1000px] flex justify-between mt-1 px-10 opacity-30">
                  <span className="text-[6px] font-mono tracking-widest text-cyan-500 uppercase">SYS_NODE_0x51</span>
                  <div className="flex gap-4">
                     <span className="text-[6px] font-mono tracking-widest text-cyan-500 uppercase">LATENCY: 12ms</span>
                     <span className="text-[6px] font-mono tracking-widest text-cyan-500 uppercase">SYNC: 99.8%</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end pb-12 pointer-events-auto">
              <VoiceInterface 
                status={status} 
                onStatusChange={handleStatusChange} 
                onAudioLevel={setAudioLevel} 
                onTranscription={setTranscription} 
                onGroundingSources={setGroundingSources}
                onOpenPresentation={handleOpenPresentation}
                onForgeRequest={handleForgeRequest}
                isPresentationOpen={isPresentationOpen}
                groundingSources={groundingSources}
              />
            </div>
          </div>
        )}
        
        {activeView === 'TEXT_CHAT' && (
          <TextChat 
            onTranscription={setTranscription} 
            onStatusChange={handleStatusChange} 
            onAudioLevel={setAudioLevel} 
            onForgeRequest={handleForgeRequest} 
            onGroundingSources={setGroundingSources}
            groundingSources={groundingSources}
          />
        )}
        {activeView === 'LEARNING' && <LearningModule onBack={() => handleViewChange('DASHBOARD')} />}
      </div>

      <PresentationOverlay isOpen={isPresentationOpen} onClose={() => {
        setIsPresentationOpen(false);
        setStatus('IDLE');
      }} />

      {pendingForge && (
        <ForgeOverlay 
          type={pendingForge.type} 
          prompt={pendingForge.prompt} 
          onClose={() => {
            setPendingForge(null);
            setStatus('IDLE');
          }} 
        />
      )}
    </div>
  );
};

export default App;
