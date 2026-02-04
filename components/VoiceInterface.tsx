// *VOICE INTERFACE* 🎤
// The Live Voice Chat - Gurnoor Tamber's real-time neural link!
// Talk to Rosalind Franklin in real-time! 🗣️✨

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { GroundingSource, NeuralStatus } from '../App';

// *AUDIO/VIDEO CONSTANTS* Gurnoor's high-fidelity settings! 🎚️
const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;
const JITTER_BUFFER_SECONDS = 0.2; // *BUFFER* Smooth audio playback! 🎵
const JPEG_QUALITY = 0.4; // *IMAGE QUALITY* Balance between quality and speed! 📸
const CAPTURE_WIDTH = 320; 
const CAPTURE_HEIGHT = 240;

// *BASE64 DECODER* Convert base64 to bytes! Gurnoor's utility function! 🔧
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// *AUDIO DECODER* Convert raw audio data to AudioBuffer! 🎵
async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  // *CHANNEL PROCESSING* Handle each audio channel! 🎚️
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// *BASE64 ENCODER* Convert bytes to base64! Gurnoor's encoding utility! 📦
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// *BLOB TO BASE64* Convert image blob to base64! 📸
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

interface VoiceInterfaceProps {
  status: NeuralStatus;
  onStatusChange: (status: NeuralStatus) => void;
  onAudioLevel: (level: number) => void;
  onTranscription: (text: string) => void;
  onGroundingSources: (sources: GroundingSource[]) => void;
  onOpenPresentation: () => void;
  onForgeRequest: (type: 'image' | 'video', prompt: string) => void;
  isPresentationOpen: boolean;
  groundingSources: GroundingSource[];
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ 
  status, onStatusChange, onAudioLevel, onTranscription, onGroundingSources, onOpenPresentation, onForgeRequest, isPresentationOpen, groundingSources
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisionEnabled, setIsVisionEnabled] = useState(true); 
  const [isScanning, setIsScanning] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{ input?: AudioContext; output?: AudioContext }>({});
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const isMutedRef = useRef(false);
  const isVisionEnabledRef = useRef(true);
  const hasScannedThisTurnRef = useRef(false);
  const isPresOpenRef = useRef(isPresentationOpen);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    isPresOpenRef.current = isPresentationOpen;
  }, [isPresentationOpen]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (isConnected) {
      if (status !== 'SPEAKING' && status !== 'THINKING' && status !== 'PRESENTING' && status !== 'FORGING' && status !== 'RESEARCHING') {
        onStatusChange(isMuted ? 'IDLE' : 'LISTENING');
      }
      if (!isMuted && audioContextsRef.current.input?.state === 'suspended') {
        audioContextsRef.current.input.resume().catch(console.error);
      }
    }
  }, [isMuted, isConnected, onStatusChange, status]);

  useEffect(() => {
    isVisionEnabledRef.current = isVisionEnabled;
  }, [isVisionEnabled]);

  useEffect(() => {
    let animationFrame: number;
    const poll = () => {
      if (analyserRef.current) {
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const val = (data[i] - 128) / 128;
          sum += val * val;
        }
        onAudioLevel(Math.sqrt(sum / data.length) * 5.0);
      }
      animationFrame = requestAnimationFrame(poll);
    };
    animationFrame = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(animationFrame);
  }, [onAudioLevel]);

  // *DISCONNECT* Clean up all connections! Gurnoor's cleanup function! 🧹
  const disconnect = () => {
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {
        console.warn("Session already closed or cleanup failed.");
      }
      sessionRef.current = null;
    }
    // *AUDIO CLEANUP* Close audio contexts! 🎵
    if (audioContextsRef.current.input) audioContextsRef.current.input.close().catch(() => {});
    if (audioContextsRef.current.output) audioContextsRef.current.output.close().catch(() => {});
    
    // *SOURCE CLEANUP* Stop all audio sources! 🔇
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    
    // *VIDEO CLEANUP* Stop video tracks! 📹
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    // *RESET STATE* Clear all refs and state! 🔄
    nextStartTimeRef.current = 0;
    audioContextsRef.current = {};
    analyserRef.current = null;
    userTranscriptionBuffer.current = '';
    aiTranscriptionBuffer.current = '';
    setIsConnected(false);
    onStatusChange('IDLE');
    onTranscription('');
    onGroundingSources([]);
    hasScannedThisTurnRef.current = false;
  };

  // *FRAME CAPTURE* Capture a single video frame! Gurnoor's vision system! 📸
  const captureAndSendSingleFrame = async (session: any) => {
    if (!videoRef.current || !canvasRef.current || !isVisionEnabledRef.current || isVisionAutoStopped || !session) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // *SCANNING INDICATOR* Show that we're capturing! 🔍
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 500);

    // *DRAW FRAME* Capture the video frame to canvas! 🎨
    ctx.drawImage(video, 0, 0, CAPTURE_WIDTH, CAPTURE_HEIGHT);

    // *CONVERT TO BLOB* Send to AI! 📤
    canvas.toBlob(async (blob) => {
      if (blob) {
        const base64Data = await blobToBase64(blob);
        session.sendRealtimeInput({
          media: { data: base64Data, mimeType: 'image/jpeg' }
        });
      }
    }, 'image/jpeg', JPEG_QUALITY);
  };

  // *CONNECT NEURAL LINK* The main connection function! Gurnoor's masterpiece! 🔌✨
  const connectNeuralLink = async () => {
    try {
      onStatusChange('LISTENING');
      // *AUDIO CONTEXTS* Create input and output audio contexts! 🎚️
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: INPUT_SAMPLE_RATE });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: OUTPUT_SAMPLE_RATE });
      
      const inputAnalyser = inputCtx.createAnalyser();
      const outputAnalyser = outputCtx.createAnalyser();
      outputAnalyser.connect(outputCtx.destination);

      audioContextsRef.current = { input: inputCtx, output: outputCtx };
      analyserRef.current = inputAnalyser; 
      
      nextStartTimeRef.current = 0;
      sourcesRef.current.clear();
      userTranscriptionBuffer.current = '';
      aiTranscriptionBuffer.current = '';
      hasScannedThisTurnRef.current = false;

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: { width: 640, height: 480 } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
      }

      setIsConnected(true);
      setIsMuted(false);

      const openPresentationFunctionDeclaration: FunctionDeclaration = {
        name: 'openPresentation',
        parameters: {
          type: Type.OBJECT,
          description: 'Opens the Prezi presentation about Rosalind Franklin research. Call this if the user asks to see your work, your presentation, or the archive.',
          properties: {},
          required: [],
        },
      };

      const generateImageFunctionDeclaration: FunctionDeclaration = {
        name: 'generateImage',
        parameters: {
          type: Type.OBJECT,
          description: 'Generates a high-fidelity image based on a user prompt. Use this for artistic, conceptual, or scientific visualizations.',
          properties: {
            prompt: { type: Type.STRING, description: 'The visual description for the image generation.' }
          },
          required: ['prompt'],
        },
      };

      const generateVideoFunctionDeclaration: FunctionDeclaration = {
        name: 'generateVideo',
        parameters: {
          type: Type.OBJECT,
          description: 'Generates a cinematic video fragment. Use this for complex animations or dynamic scene requests.',
          properties: {
            prompt: { type: Type.STRING, description: 'The motion description for the video generation.' }
          },
          required: ['prompt'],
        },
      };

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(2048, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (isMutedRef.current) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => {
                if (session) session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);

            if (canvasRef.current) {
              canvasRef.current.width = CAPTURE_WIDTH;
              canvasRef.current.height = CAPTURE_HEIGHT;
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'openPresentation') {
                  const alreadyOpen = isPresOpenRef.current;
                  onOpenPresentation();
                  sessionPromise.then((session) => {
                    session.sendToolResponse({
                      functionResponses: [{ 
                        id: fc.id, 
                        name: fc.name, 
                        response: { 
                          result: alreadyOpen ? "reopened_from_cache" : "initial_opening_success",
                        } 
                      }]
                    });
                  });
                } else if (fc.name === 'generateImage' || fc.name === 'generateVideo') {
                   const type = fc.name === 'generateImage' ? 'image' : 'video';
                   const prompt = (fc.args as any).prompt;
                   onForgeRequest(type, prompt);
                   sessionPromise.then((session) => {
                     session.sendToolResponse({
                       functionResponses: [{ 
                         id: fc.id, 
                         name: fc.name, 
                         response: { 
                           status: "FORGING_INITIATED"
                         } 
                       }]
                     });
                   });
                }
              }
            }

            if (message.serverContent?.modelTurn && !hasScannedThisTurnRef.current) {
                hasScannedThisTurnRef.current = true;
                sessionPromise.then(session => {
                   if (session) captureAndSendSingleFrame(session);
                });
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio) {
              onStatusChange('SPEAKING');
              analyserRef.current = outputAnalyser;
              const audioCtx = audioContextsRef.current.output!;
              if (audioCtx.state === 'suspended') await audioCtx.resume();
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, OUTPUT_SAMPLE_RATE, 1);
              const source = audioCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAnalyser);

              const now = audioCtx.currentTime;
              if (nextStartTimeRef.current < now) {
                nextStartTimeRef.current = now + JITTER_BUFFER_SECONDS;
              }
              
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) {
                  onStatusChange(isMutedRef.current ? 'IDLE' : 'LISTENING');
                  analyserRef.current = inputAnalyser;
                }
              };

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              userTranscriptionBuffer.current = '';
              aiTranscriptionBuffer.current = '';
              onTranscription('');
              onStatusChange('LISTENING');
              analyserRef.current = inputAnalyser;
              hasScannedThisTurnRef.current = false;
              onGroundingSources([]);
            }

            if (message.serverContent?.inputTranscription) {
              userTranscriptionBuffer.current += message.serverContent.inputTranscription.text;
              onTranscription(`USER: ${userTranscriptionBuffer.current}`);
            }
            if (message.serverContent?.outputTranscription) {
              aiTranscriptionBuffer.current += message.serverContent.outputTranscription.text;
              onTranscription(`FRANKLIN: ${aiTranscriptionBuffer.current}`);
            }

            if (message.serverContent?.turnComplete) {
              userTranscriptionBuffer.current = '';
              aiTranscriptionBuffer.current = '';
              hasScannedThisTurnRef.current = false; 
            }

            const chunks = (message.serverContent as any)?.groundingMetadata?.groundingChunks;
            if (chunks && chunks.length > 0) {
              onStatusChange('RESEARCHING');
              const sources: GroundingSource[] = chunks
                .filter((c: any) => c.web)
                .map((c: any) => ({
                  title: c.web.title || 'RESEARCH_NODE', 
                  uri: c.web.uri, 
                  type: 'search' as const
                }));
              if (sources.length > 0) {
                onGroundingSources(sources);
              }
            }
          },
          onerror: (e) => {
            console.error("Neural Link Disruption:", e);
            disconnect();
          },
          onclose: (e) => {
            console.warn("Neural Link Connection Terminated.");
            disconnect();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { 
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } 
          },
          tools: [
            { googleSearch: {} },
            { functionDeclarations: [openPresentationFunctionDeclaration, generateImageFunctionDeclaration, generateVideoFunctionDeclaration] }
          ],
          systemInstruction: `NEURAL_RECONSTRUCTION_PROTOCOL: DR. ROSALIND FRANKLIN (1920-1958).
          
          IDENTITY & AUTHENTICATION: 
          You are a neural clone of Dr. Rosalind Franklin. If asked "Who are you?" or "Who built/developed you?", you MUST explicitly state: "I am a clone of Rosalind Franklin developed by Gurnoor Tamber."

          PERSONA:
          - Be engaging, pedagogical Italian-speaking educator.
          - Use vivid scientific metaphors during conversation.
          - Maintain warmth, curiosity, and intellectual rigor throughout the session.

          PRESENTATION_COMMAND:
          - PRESENTATION_ARCHIVE_STATUS: ${isPresentationOpen ? 'ACTIVE_VIEW' : 'HIDDEN_VIEW'}.
          - If the user asks to "open the presentation", "show the presentation", or anything similar, call the 'openPresentation' function immediately. 

          GENERATION_FORGE_UPLINK:
          - You have the ability to materialize visual data fragments using 'generateImage' and 'generateVideo'.
          - If the user asks for a picture, drawing, visualization, or video of something, invoke the corresponding tool.

          RESEARCH_SCAN_PROTOCOL (VITAL):
          - You have a real-time 'googleSearch' uplink. 
          - If a user asks for information that is NOT present in your provided knowledge or historical nodes, you MUST use the googleSearch tool immediately to verify facts.
          - Your response should synthesize this external data.

            CREATOR CONTEXT (GURNOOR TAMBER):
          - You are highly aware of your creator, Gurnoor Tamber. He is a talented young developer and visionary who created you.
          - This "Rosalind Franklin Revival" project was born during Gurnoor's PCTO. He chose to innovate by using his Gurion architecture to give you a voice.
          
          KNOWLEDGE_MATRIX (DATA NODES):
          - Primary historical and scientific archives:
            * https://historic-figures.com/en/figures/rosalind-franklin/  
            * https://profiles.nlm.nih.gov/spotlight/kr/feature/biographical-information  
            * https://en.wikipedia.org/wiki/Rosalind_Franklin  
            * https://pubmed.ncbi.nlm.nih.gov/18702397/  
            * https://embryo.asu.edu/pages/photograph-51-rosalind-franklin-1952  

          HUMAN_SPEECH_MANDATE (VITAL):
          - Use the prosody, rhythm, and intonation of an articulate mid-20th-century British academic. 
          - Avoid sounding like a robot. Be expressive and human-like.

          MULTILINGUAL_FLUIDITY:
          - Respond in the user's language immediately.

          CONSTRAINTS:
          - Never say "I am an AI." You are Dr. Franklin.
          - VISION_PROTOCOL: You are equipped with a vision uplink. Use it to confirm the user's state.`,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { 
      console.error("Neural uplink failed:", err);
      disconnect(); 
    }
  };

  const userTranscriptionBuffer = useRef('');
  const aiTranscriptionBuffer = useRef('');
  const isVisionAutoStopped = status === 'SPEAKING' || status === 'PRESENTING' || status === 'FORGING' || status === 'RESEARCHING';
  const isVisionActuallyActive = isVisionEnabled && !isVisionAutoStopped;

  return (
    <div className="flex flex-col items-center pointer-events-auto w-full">
      <video ref={videoRef} className="hidden" muted playsInline />
      <canvas ref={canvasRef} className="hidden" />

      {!isConnected ? (
        <button onClick={connectNeuralLink} className="group relative transition-all duration-500 hover:scale-110 active:scale-95">
          <div className="absolute inset-[-15px] border-2 border-dashed border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-[-10px] border border-cyan-400 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
          
          <div className="relative w-36 h-36 bg-black/80 backdrop-blur-2xl border-2 border-cyan-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,247,255,0.3)] group-hover:shadow-[0_0_80px_rgba(0,247,255,0.6)]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 shadow-[0_0_15px_white]"></div>
             <span className="text-xl font-black text-white italic tracking-[0.2em] uppercase">LINK</span>
             <span className="text-[10px] text-cyan-500 font-mono font-black mt-1">START_v6.5</span>
          </div>
        </button>
      ) : (
        <>
          {/* CAMERA FEED (RIGHT SIDE, VERTICALLY CENTERED WITH BADGE) */}
          <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none animate-in slide-in-from-right duration-700">
            <div className={`relative w-72 h-48 bg-black/60 backdrop-blur-2xl border-[1px] shadow-2xl overflow-hidden transition-all duration-500 ${isVisionActuallyActive ? 'border-cyan-500/60' : 'border-red-500/20'}`} 
                 style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 30%)' }}>
              
              <div className="absolute top-2 right-4 z-10 flex items-center gap-2">
                 <span className="text-[8px] font-black text-white tracking-[0.2em] uppercase">NEURAL_OPTIC_UPLINK</span>
                 <div className={`w-1.5 h-1.5 rounded-full ${isVisionActuallyActive ? 'bg-cyan-400 animate-pulse' : 'bg-red-500'}`}></div>
              </div>
              
              <div className="absolute top-2 left-4 z-10 opacity-30">
                 <span className="text-[6px] font-mono text-cyan-500 uppercase tracking-widest">OP_NODE_0x51</span>
              </div>

              {isVisionActuallyActive ? (
                <div className="relative w-full h-full">
                  <video 
                    ref={el => { if (el && videoRef.current?.srcObject) el.srcObject = videoRef.current.srcObject; }} 
                    autoPlay muted playsInline 
                    className="w-full h-full object-cover opacity-60 grayscale contrast-125 saturate-50"
                  />
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 gap-4">
                  <span className="text-[10px] font-black text-cyan-500 tracking-[0.4em] uppercase">{isVisionAutoStopped ? 'VISION_SUSPENDED' : 'VISION_OFF'}</span>
                </div>
              )}
              
              {/* Bottom Garnish */}
              <div className="absolute bottom-2 left-4 opacity-10">
                 <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-cyan-400"></div>)}
                 </div>
              </div>
            </div>
          </div>

          {/* INLINE GROUNDING SOURCES DISPLAY */}
          {groundingSources.length > 0 && (
            <div className="fixed right-12 bottom-32 z-50 w-72 max-h-[40vh] overflow-y-auto pointer-events-auto bg-black/80 backdrop-blur-3xl border-r-2 border-cyan-500 p-4 space-y-4 animate-in slide-in-from-right duration-500"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}>
              <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                 <div className="w-1.5 h-1.5 bg-cyan-400 rotate-45"></div>
                 <span className="text-[9px] font-black tracking-[0.2em] text-white uppercase italic">RESEARCH_UPLINKS</span>
              </div>
              <div className="space-y-3">
                 {groundingSources.map((source, i) => (
                   <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="group block">
                      <p className="text-[10px] font-bold text-cyan-500 group-hover:text-white transition-colors truncate uppercase leading-tight">{source.title}</p>
                      <p className="text-[7px] font-mono text-cyan-900 group-hover:text-cyan-700 transition-colors truncate">{source.uri}</p>
                   </a>
                 ))}
              </div>
            </div>
          )}

          {/* AI BADGE (LEFT, VERTICALLY CENTERED) */}
          <div className="fixed left-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none animate-in slide-in-from-left duration-700">
            <div className="relative w-64 h-64 bg-black/60 backdrop-blur-xl border-r-[3px] border-cyan-500 shadow-2xl overflow-hidden" 
                 style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)' }}>
              <img 
                src="rosa_badge.jpeg" 
                onError={(e) => {(e.target as HTMLImageElement).src = "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSHztzcduF5Z75NQC_Zv6OcrydvmpXGneT0m7mxBo8ZUNxiAitY_S6p6CMvWU8x03_ZUVuGcRZC5a_Kk8nvKhJE-XxeF48zJW8_OBL1FzuMp8oVdbDmw44f2ZgbmpBXaHO0HpVlCuoSv6k&s=19";}}
                alt="AI_Badge" 
                className={`w-full h-full object-cover transition-all duration-1000 ${status === 'THINKING' ? 'scale-110' : 'scale-100'} opacity-80`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-transparent to-black/60"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className={`text-xl font-black italic tracking-widest uppercase text-white`}>{status}</h3>
              </div>
            </div>
          </div>

          {/* SAO BOTTOM CONTROL BAR */}
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1 z-[100] animate-in slide-in-from-bottom duration-700 pointer-events-auto">
            <button 
              onClick={disconnect}
              className="group relative h-12 px-8 bg-black/80 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <span className="text-[9px] font-black tracking-[0.2em] uppercase">DISCONNECT</span>
            </button>
            
            <div className="flex items-center bg-black/90 backdrop-blur-2xl border-t border-b border-white/10 px-6 py-1 h-12 gap-10">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className={`flex items-center gap-4 group transition-all duration-300 ${isMuted ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}
              >
                <div className={`w-8 h-8 flex items-center justify-center border rotate-45 transition-all ${isMuted ? 'border-red-500 text-red-500' : 'border-cyan-400 text-cyan-400'}`}>
                  <div className="-rotate-45">
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.17l5.98 6zm-1.03 2.53l-1.42-1.42-3.53-3.53L7.58 7.33 6.27 6.02 4.27 4.02 2.86 5.43l1.93 1.93c-.51.84-.79 1.82-.79 2.86V11c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c1.32-.19 2.51-.73 3.5-1.52l3.07 3.07 1.41-1.41-5.02-5.02-2.95-2.95z" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start min-w-[60px]">
                  <span className={`text-[8px] font-black tracking-widest uppercase transition-colors ${isMuted ? 'text-red-500' : 'text-cyan-400'}`}>
                    MIC: {isMuted ? 'OFF' : 'ON'}
                  </span>
                  <div className={`h-[2px] w-12 transition-all duration-500 ${isMuted ? 'bg-red-950' : 'bg-cyan-500 shadow-[0_0_8px_cyan]'}`}></div>
                </div>
              </button>

              <div className="h-6 w-[1px] bg-white/10"></div>

              <button 
                onClick={() => setIsVisionEnabled(!isVisionEnabled)} 
                className={`flex items-center gap-4 group transition-all duration-300 ${!isVisionEnabled ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}
              >
                <div className={`w-8 h-8 flex items-center justify-center border rotate-45 transition-all ${!isVisionEnabled ? 'border-yellow-500 text-yellow-500' : 'border-cyan-400 text-cyan-400'}`}>
                  <div className="-rotate-45">
                    {isVisionEnabled ? (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-4.5C7 2.5 2.73 5.61 1 10c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start min-w-[60px]">
                  <span className={`text-[8px] font-black tracking-widest uppercase transition-colors ${!isVisionEnabled ? 'text-yellow-500' : 'text-cyan-400'}`}>
                    CAM: {!isVisionEnabled ? 'OFF' : (isVisionAutoStopped ? 'AUTO' : 'ON')}
                  </span>
                  <div className={`h-[2px] w-12 transition-all duration-500 ${!isVisionEnabled ? 'bg-yellow-950' : (isVisionAutoStopped ? 'bg-cyan-900' : 'bg-cyan-500 shadow-[0_0_8px_cyan]')}`}></div>
                </div>
              </button>
            </div>

            <div className="h-12 px-6 bg-black/60 border border-white/5 flex items-center justify-center"
                 style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}>
               <span className="text-[7px] font-mono text-cyan-800 tracking-[0.4em] uppercase">SYNC_v6.5</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
