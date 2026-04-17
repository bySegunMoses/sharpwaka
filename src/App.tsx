import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Plane, 
  MapPin, 
  Search, 
  ArrowRight, 
  Clock, 
  Navigation,
  Navigation2,
  Building2,
  Mic,
  ChevronDown,
  Info,
  Bus,
  Car,
  HelpCircle,
  Menu,
  Globe,
  Zap,
  ShieldCheck,
  Twitter,
  MessageCircle,
  Share2,
  X
} from 'lucide-react';
import { AIRLINES, TERMINALS, AirlineData } from './constants';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Mode = 'TRANSPORT' | 'TERMINAL';

export default function App() {
  const [query, setQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Ikeja to MMA2",
    "Lekki to GAT (MMA1)",
    "Ibom Air terminal?",
    "Air Peace from where?",
    "Obalende to MMA2"
  ];

  const handleShare = (platform: 'X' | 'WHATSAPP') => {
    if (!aiResponse) return;
    const url = window.location.origin;
    const text = `SharpWaka AI Trip Info:\n\n${aiResponse.substring(0, 150)}...\n\nCheck am out at: ${url}`;
    const encodedText = encodeURIComponent(text);
    
    if (platform === 'X') {
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
    } else {
      window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    }
  };

  const handleSearch = async (forcedQuery?: string) => {
    const activeQuery = forcedQuery || query;
    if (!activeQuery.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse(null);
    setResultsOpen(true);
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are SharpWaka Pro, a street-smart logistics and travel intelligence AI for Nigeria, focused on Lagos. 
        User Query: "${activeQuery}". 
        Context:
        - MMA2 is the private terminal (Ibom Air, ValueJet, United Nigeria, Air Peace, Max Air, Rano Air, Dana).
        - GAT (MMA1) is the govt terminal (Arik, Green Africa, Overland, Aero).
        - Transit: Recommend BRT, Danfo, or Ride-hailing. Mention "Oshodi" or "Ikeja Underbridge" as major connecting points.
        
        Guidelines:
        - Solve the user's logic problem sharp-sharp with a "Lagos Pro" vibe.
        - Use bold text (**like this**) for important names, costs, or locations.
        - If comparing multiple options (like transport prices/times), use a Markdown table.
        - Use bullet points for steps.
        - Confirm terminal details (MMA1 vs MMA2) clearly for airport queries.
        - Give estimated time and Naira costs for transport.`,
        config: {
          tools: [{ googleSearch: {} }],
          toolConfig: { includeServerSideToolInvocations: true }
        }
      });
      
      setAiResponse(response.text || "Eya, something don happen. Try again or check the airline list below.");
    } catch (error) {
      console.error(error);
      setAiResponse("Network issues o! Abeg try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-waka-bg font-sans text-white pb-20 selection:bg-waka-accent/30">
      {/* Top Header Navigation */}
      <nav className="max-w-3xl mx-auto pt-8 px-6 mb-20 flex items-center justify-between">
        <div className="flex items-center gap-4 bg-waka-card p-4 rounded-3xl border border-white/5 shadow-2xl flex-1 max-w-sm glow-purple">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-waka-accent/20 flex items-center justify-center border border-waka-accent/30 shadow-inner">
             <Zap className="w-6 h-6 text-waka-accent fill-waka-accent/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-display font-extrabold tracking-tight text-white">SharpWaka <span className="text-waka-accent italic">Pro</span></h1>
            </div>
            <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap">No Dodoyo</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-4">
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="w-10 h-10 rounded-full bg-waka-card border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6">
        {/* Main Interface */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-display font-extrabold mb-10 text-white tracking-tight"
          >
            Where you dey <span className="text-waka-accent">waka</span> go?
          </motion.h2>

          <div className="bg-waka-card rounded-[2rem] shadow-2xl p-2 mb-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-waka-accent/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-waka-accent/10 transition-colors"></div>
            <div className="waka-input-wrapper relative z-10">
              <div className="pl-4">
                <Search className="w-5 h-5 text-slate-500" />
              </div>
              <input 
                type="text" 
                placeholder="e.g. Lekki to MMA2"
                className="flex-1 bg-transparent py-4 outline-none text-lg text-white placeholder:text-slate-700 font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className="flex items-center gap-2 pr-1">
                <button className="p-3 text-slate-500 hover:text-white transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleSearch()}
                  disabled={isAiLoading || !query.trim()}
                  className="bg-waka-accent hover:opacity-90 disabled:opacity-30 text-white font-bold p-3 rounded-2xl transition-all flex items-center shadow-lg shadow-waka-accent/20"
                >
                  {isAiLoading ? <Clock className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {suggestions.map((suggestion) => (
              <button 
                key={suggestion}
                onClick={() => { setQuery(suggestion); handleSearch(suggestion); }}
                className="waka-suggest-tag"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <AnimatePresence>
          {resultsOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
              ref={resultsRef}
            >
              {aiResponse ? (
                <div className="waka-card overflow-hidden border-waka-accent/20">
                  <div className="p-8 border-b border-white/5 bg-gradient-to-br from-waka-accent/5 to-transparent">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-waka-neon/20 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-waka-neon" />
                        </div>
                        <h3 className="font-display font-bold text-xl text-white">Smart Waka Result</h3>
                      </div>
                      <span className="text-[9px] font-bold text-waka-accent uppercase tracking-widest border border-waka-accent/30 px-2 py-0.5 rounded-md">Verified Info</span>
                    </div>
                    
                    <div className="markdown-body">
                      <Markdown remarkPlugins={[remarkGfm]}>{aiResponse}</Markdown>
                    </div>
                  </div>
                  
                  <div className="px-8 pb-8 flex items-center justify-between border-b border-white/5">
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleShare('WHATSAPP')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all text-[10px] font-bold uppercase tracking-widest border border-[#25D366]/20"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </button>
                      <button 
                         onClick={() => handleShare('X')}
                         className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest border border-white/10"
                      >
                        <Twitter className="w-3.5 h-3.5" /> Share on X
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                      <Share2 className="w-3 h-3" /> Broadcast
                    </div>
                  </div>
                  
                  <div className="p-6 bg-waka-card/50 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group">
                      <MapPin className="w-4 h-4 text-waka-neon group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Save Route</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group">
                      <Navigation2 className="w-4 h-4 text-waka-neon group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Open Maps</span>
                    </button>
                  </div>
                </div>
              ) : isAiLoading && (
                <div className="waka-card p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
                  <div className="w-12 h-12 bg-waka-accent/10 rounded-2xl mx-auto mb-4 border border-waka-accent/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-waka-accent animate-pulse" />
                  </div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">SharpWaka is calculating...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHelpOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsHelpOpen(false)}
                className="absolute inset-0 bg-waka-bg/80 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="waka-card relative z-10 w-full max-w-lg p-8 border-waka-accent/20 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4">
                  <button onClick={() => setIsHelpOpen(false)} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-waka-accent/20 flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-waka-accent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">How to Waka Pro</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-waka-neon/20 flex-shrink-0 flex items-center justify-center text-waka-neon font-bold text-xs">01</div>
                    <div className="text-slate-300 text-sm leading-relaxed">
                      <strong className="text-white block mb-1 font-bold">Type your logic</strong>
                      Tell SharpWaka where you're going or which airline you're using. "Lekki to MMA2" or "United Nigeria terminal?"
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-waka-neon/20 flex-shrink-0 flex items-center justify-center text-waka-neon font-bold text-xs">02</div>
                    <div className="text-slate-300 text-sm leading-relaxed">
                      <strong className="text-white block mb-1 font-bold">Get the Sharp Breakdown</strong>
                      AI calculates the best routes (BRT, Danfo, Bolt), terminal details, and current Naira costs.
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-waka-neon/20 flex-shrink-0 flex items-center justify-center text-waka-neon font-bold text-xs">03</div>
                    <div className="text-slate-300 text-sm leading-relaxed">
                      <strong className="text-white block mb-1 font-bold">Share with the Squad</strong>
                      Use the broadcast buttons to send your trip info directly to WhatsApp or X.
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsHelpOpen(false)}
                  className="w-full mt-10 p-4 rounded-2xl bg-waka-accent text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-waka-accent/20"
                >
                  Oya, let's waka!
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Directory Hub */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Direct Access</h3>
            <div className="h-px bg-white/5 flex-1 ml-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {AIRLINES.slice(0, 6).map((airline) => (
              <div 
                key={airline.id}
                className="waka-card p-5 flex items-center justify-between group hover:border-waka-neon/30 hover:bg-white/[0.02] transition-all cursor-pointer"
                onClick={() => { setQuery(`${airline.name} Terminal?`); handleSearch(`${airline.name} Terminal?`); }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border border-white/5 ${airline.terminal === 'MMA2' ? 'text-lagos-yellow' : 'text-waka-neon'}`}>
                    {airline.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 group-hover:text-white transition-colors">{airline.name}</h4>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${airline.terminal === 'MMA2' ? 'text-lagos-yellow/60' : 'text-waka-neon/60'}`}>{airline.terminal}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                   <ArrowRight className="w-4 h-4 text-waka-neon" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid sm:grid-cols-3 gap-6">
          <div className="waka-card p-6 group hover:border-waka-accent/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-waka-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bus className="w-5 h-5 text-waka-accent" />
            </div>
            <h5 className="font-bold text-sm mb-2 text-white">Lagos Connect</h5>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Verified local Danfo & BRT routes to MMA1 & MMA2.</p>
          </div>
          <div className="waka-card p-6 group hover:border-pink-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Car className="w-5 h-5 text-pink-500" />
            </div>
            <h5 className="font-bold text-sm mb-2 text-white">Ride Hailing</h5>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Uber/Bolt drop-off intelligence for perfect exits.</p>
          </div>
          <div className="waka-card p-6 group hover:border-waka-neon/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-waka-neon/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5 text-waka-neon" />
            </div>
            <h5 className="font-bold text-sm mb-2 text-white">Live Terminals</h5>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Always up-to-date airline terminal assignments.</p>
          </div>
        </div>
      </main>

      <footer className="mt-40 text-center pb-12">
        <p className="text-[10px] text-slate-700 uppercase tracking-[0.4em] font-black mb-2">Designed for the Lagos Street</p>
        <div className="flex items-center justify-center gap-2 text-slate-800">
           <Zap className="w-3 h-3 fill-current" />
           <span className="w-8 h-[1px] bg-slate-800"></span>
           <span className="text-[9px] font-bold">SHARPWAKA AI 2026</span>
           <span className="w-8 h-[1px] bg-slate-800"></span>
           <Navigation className="w-3 h-3 fill-current" />
        </div>
      </footer>
    </div>
  );
}
