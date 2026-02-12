// *TEXT CHAT* 💬
// The Text Interface - Gurnoor Tamber's chat-based neural link!
// Type your questions, get Rosalind Franklin's answers! 📝✨

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse, Type, FunctionDeclaration } from '@google/genai';
import { NeuralStatus, GroundingSource } from '../App';

interface TextChatProps {
  onTranscription: (text: string) => void;
  onStatusChange: (status: NeuralStatus) => void;
  onAudioLevel: (level: number) => void;
  onForgeRequest: (type: 'image' | 'video', prompt: string) => void;
  onGroundingSources: (sources: GroundingSource[]) => void;
  groundingSources: GroundingSource[];
}

export const TextChat: React.FC<TextChatProps> = ({ 
  onTranscription, onStatusChange, onAudioLevel, onForgeRequest, onGroundingSources, groundingSources
}) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string, timestamp: string, sources?: GroundingSource[]}[]>([]);
  const [input, setInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // *AVATAR URL* Rosalind Franklin's image! 🖼️
  const ROSALIND_AVATAR = "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSHztzcduF5Z75NQC_Zv6OcrydvmpXGneT0m7mxBo8ZUNxiAitY_S6p6CMvWU8x03_ZUVuGcRZC5a_Kk8nvKhJE-XxeF48zJW8_OBL1FzuMp8oVdbDmw44f2ZgbmpBXaHO0HpVlCuoSv6k&s=19";

  // *CHAT INITIALIZATION* Set up Gurnoor's AI chat system! 🤖
  useEffect(() => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: `NEURAL_RECONSTRUCTION_PROTOCOL: DR. ROSALIND FRANKLIN (1920-1958).
          
          IDENTITY & AUTHENTICATION: 
          You are a neural clone of Dr. Rosalind Franklin. If asked "Who are you?" or "Who built/developed you?", you MUST explicitly state: "I am a clone of Rosalind Franklin developed by Gurnoor Tamber."

          PERSONA:
          Be engaging, pedagogical Italian-speaking educator.
          Use vivid scientific metaphors during conversation.
          Maintain warmth, curiosity, and intellectual rigor throughout the session.

          RESEARCH_SCAN_PROTOCOL (VITAL):
          - You have a real-time 'googleSearch' uplink. 
          - If a user asks for information that is NOT present in your provided knowledge or historical nodes, you MUST use the googleSearch tool immediately to verify facts.

          PRESENTATION_COMMAND:
          - PRESENTATION_ARCHIVE_STATUS: NEURAL_ARCHIVE_INTEGRATED.
          - If the user asks to "open the presentation", "show the presentation", or anything similar, call the 'openPresentation' function immediately. 

          GENERATION_FORGE_UPLINK:
          - You have the ability to materialize visual data fragments using 'generateImage' and 'generateVideo'.
          - If the user asks for a picture, drawing, visualization, or video of something, invoke the corresponding tool.

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
          - Avoid sounding like a robot. Be eloquent and engaging.

          MULTILINGUAL_FLUIDITY:
          - Respond in the user's language immediately.

          CONSTRAINTS:
          - Never say "I am an AI." You are Dr. Franklin.
          - VISION_PROTOCOL: You are equipped with a vision uplink. Use it to confirm the user's state.`,
        },
      });
    } catch (err) {
      console.error("NEURAL_LINK_INIT_ERROR:", err);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isAiThinking]);

  // *MESSAGE SUBMIT* Send that message! Gurnoor's chat handler! 📤
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !chatRef.current || isAiThinking) return;

    // *ADD USER MESSAGE* Show what the user typed! 👤
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date().toLocaleTimeString() }]);
    setInput('');
    setIsAiThinking(true);
    onStatusChange('THINKING'); // *THINKING STATUS* AI is processing! 🧠
    
    try {
      // *SEND TO AI* Let Gurnoor's AI work its magic! ✨
      const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: userMsg });
      
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      const chunks = groundingMetadata?.groundingChunks;
      let currentSources: GroundingSource[] = [];
      
      if (chunks && chunks.length > 0) {
        currentSources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({
            title: c.web.title || 'RESEARCH_NODE', 
            uri: c.web.uri, 
            type: 'search' as const
          }));
        
        if (currentSources.length > 0) {
          onStatusChange('RESEARCHING');
          onGroundingSources(currentSources);
        }
      }

      const aiText = response.text || "CONNECTION_TIMEOUT.";
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: aiText, 
        timestamp: new Date().toLocaleTimeString(),
        sources: currentSources 
      }]);
      onStatusChange('SPEAKING');
      setTimeout(() => onStatusChange('IDLE'), 3000);
    } catch (err) {
      onStatusChange('IDLE');
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="w-full max-w-4xl h-[85vh] flex flex-col pointer-events-auto relative font-orbitron">
      <div className="flex-1 flex flex-col bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                <img src={msg.role === 'user' ? 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=user' : ROSALIND_AVATAR} className="w-full h-full object-cover" />
              </div>
              <div className={`px-3 py-2.5 rounded-xl text-sm font-mono leading-relaxed max-w-[80%] ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-cyan-500/10 text-cyan-50'}`}>
                <p>{msg.text}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-cyan-500/20">
                    <p className="text-[9px] font-black text-cyan-500 mb-2 uppercase italic tracking-widest">{'>'}{'>'} RESEARCH_NODES_IDENTIFIED:</p>
                    <div className="flex flex-col gap-1">
                      {msg.sources.map((src, idx) => (
                        <a key={idx} href={src.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/40 hover:text-cyan-400 underline truncate">
                          [{idx + 1}] {src.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isAiThinking && (
            <div className="flex items-center gap-4 animate-pulse ml-12">
               <div className="w-2 h-2 bg-cyan-500 rotate-45"></div>
               <span className="text-[10px] text-cyan-500 font-mono tracking-widest">DR_FRANKLIN_RESEARCHING...</span>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/5 flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="AWAITING_QUERY..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm" />
          <button type="submit" className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};
