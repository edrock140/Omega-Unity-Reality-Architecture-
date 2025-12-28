
import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Terminal, 
  Activity, 
  Layers,
  Monitor,
  Command,
  ChevronRight,
  ShieldCheck,
  Eye,
  FileCode,
  Lock,
  Radio,
  Coins,
  Scale,
  UserCheck,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { editLogo } from './services/gemini';
import { calculateMarketPrice, MarketPrice } from './services/pricing';
import { ImageState } from './types';

const App: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [marketPrice, setMarketPrice] = useState<MarketPrice | null>(null);
  const [paymentPending, setPaymentPending] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const [state, setState] = useState<ImageState>({
    original: null,
    edited: null,
    loading: false,
    error: null,
  });
  
  const DEFAULT_PROMPT = 'Fill the word "EVOLVE" with pure red and draw a window using color red. Manufacture architectural precision.';
  const [customPrompt, setCustomPrompt] = useState(DEFAULT_PROMPT);
  const [logs, setLogs] = useState<string[]>([
    "PRECOGNITIVE_ARBITRAGE: READY",
    "AUTHORITY: LISWANISO EDGAR MULENGA WARMABLON",
    "Awaiting Identity Verification..."
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Check for successful payment return from Flutterwave
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success') {
      setIsUnlocked(true);
      setSessionActive(true);
      setUserEmail("VERIFIED_SOVEREIGN");
      addLog("LEDGER_SETTLED: Sovereignty unlocked via Gateway verification.");
      addLog("SYSTEM_READY: You may now Manifest Reality.");
    }
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.includes('@')) {
      setSessionActive(true);
      addLog(`IDENTITY_VERIFIED: Session locked to ${userEmail}`);
    }
  };

  const handleAuditRequest = async () => {
    if (!state.original) return;
    addLog("AUDITING_COMPLEXITY: Assessing market value of your Decree...");
    try {
      const price = await calculateMarketPrice(customPrompt);
      setMarketPrice(price);
      addLog(`PRICE_SETTLED: ${price.amount} ${price.currency} (${price.complexity} Complexity)`);
    } catch (e) {
      addLog("AUDIT_ERROR: Price generation failed. Retrying...");
    }
  };

  const initiatePayment = async () => {
    if (!marketPrice) return;
    setPaymentPending(true);
    addLog("INITIATING_GATEWAY: Requesting secure payment link...");
    
    try {
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userEmail,
          amount: marketPrice.amount,
          email: userEmail
        })
      });
      const data = await response.json();
      if (data.url) {
        addLog("REDIRECTION: Routing to Sovereign Payment Portal...");
        window.location.href = data.url; // Redirect to Flutterwave
      } else {
        throw new Error("Invalid response from gateway");
      }
    } catch (err) {
      addLog("GATEWAY_ERROR: Failed to establish link. Check Vercel logs.");
      setPaymentPending(false);
    }
  };

  const handleEdit = async () => {
    if (!state.original || !isUnlocked) {
      addLog("ACCESS_DENIED: Manifestation requires settled ledger.");
      return;
    }
    setState(prev => ({ ...prev, loading: true, error: null }));
    addLog("MANUFACTURING_CONSEQUENCE: Commencing Reality Shift...");
    
    try {
      const editedUrl = await editLogo(state.original, customPrompt);
      addLog("SETTLEMENT_COMPLETE: Outcome manufactured successfully.");
      setState(prev => ({ ...prev, edited: editedUrl, loading: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, loading: false, error: err.message }));
      addLog(`CRITICAL_FAIL: ${err.message}`);
    }
  };

  if (!sessionActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="max-w-md w-full glass p-10 border-t-4 border-red-600 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-red-600 flex items-center justify-center rotate-45 border-4 border-white pure-red-glow">
              <Zap size={40} className="text-white -rotate-45" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-center mb-2 uppercase tracking-tighter">Welcome to <span className="text-red-600">Omega Unity</span></h1>
          <p className="text-[10px] mono text-red-900 text-center mb-8 uppercase tracking-widest">Sovereign Authority: Liswaniso Edgar</p>
          
          <form onSubmit={handleIdentitySubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] mono text-red-500 uppercase mb-2">Identify Your Essence (Email)</label>
              <input 
                required
                type="email" 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-black border border-red-900/50 p-4 text-red-100 mono text-xs outline-none focus:border-red-600 transition-all"
                placeholder="authority@source.com"
              />
            </div>
            <button className="w-full bg-red-600 py-4 font-black uppercase tracking-widest text-xs hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2">
              <UserCheck size={18} /> Establish Connection
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 max-w-[1700px] mx-auto min-h-screen flex flex-col">
      {/* Sovereign Header */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-10 border-b border-red-900/30 pb-6 gap-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 bg-red-600 flex items-center justify-center rounded-none rotate-45 border-4 border-white pure-red-glow animate-pulse">
              <Zap size={32} className="text-white fill-current -rotate-45" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-black border border-red-600 px-1 py-0.5 text-[8px] mono text-red-500 font-bold">EMW/L</div>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none italic flex items-center gap-2">
              <span className="text-white">OMEGA</span> <span className="text-red-600">UNITY</span>
            </h1>
            <p className="text-[11px] mono text-red-900 tracking-[0.3em] uppercase mt-2 font-bold">ACTIVE SESSION: {userEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 mono text-[10px] text-red-800">
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-2">MARKET_SYNC: <span className="text-red-500 font-bold">REALTIME</span></span>
            <span className="flex items-center gap-2">ZMW_SPREAD: <span className="text-red-500 font-bold">STABLE</span></span>
          </div>
          <div className="h-10 w-[1px] bg-red-900/30"></div>
          <div className="px-5 py-2 border border-red-600/20 bg-red-600/5 text-red-500 font-bold tracking-widest flex items-center gap-2">
            <Coins size={14} /> {marketPrice ? `${marketPrice.amount} ${marketPrice.currency}` : 'AUDIT PENDING'}
          </div>
          {isUnlocked && (
            <div className="px-5 py-2 bg-green-900/20 border border-green-600 text-green-500 font-black tracking-widest flex items-center gap-2 animate-pulse">
              <CheckCircle2 size={14} /> SOVEREIGN_UNLOCKED
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-grow">
        <aside className="xl:col-span-3 flex flex-col gap-6">
          {/* Tier 1: Intention */}
          <section className="glass p-6 rounded-none border-l-4 border-red-600">
            <div className="flex items-center gap-2 mb-5 text-red-500 font-black uppercase text-xs tracking-[0.2em]">
              <Layers size={18} /> 1. Input Source
            </div>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-red-900/30 bg-black p-8 text-center cursor-pointer hover:border-red-600 transition-all group relative overflow-hidden"
            >
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const r = new FileReader();
                  r.onloadend = () => {
                    setState(p => ({ ...p, original: r.result as string }));
                    addLog(`SUBSTRATE_LOADED: Ready for Audit.`);
                  };
                  r.readAsDataURL(file);
                }
              }} />
              <FileCode size={40} className="text-red-900 mx-auto mb-3" />
              <p className="text-[10px] mono text-red-800 font-bold uppercase">Commit Reality Substrate</p>
            </div>
          </section>

          {/* Tier 2: Codification & Pricing */}
          <section className="glass p-6 rounded-none border-l-4 border-red-600">
            <div className="flex items-center gap-2 mb-5 text-red-500 font-black uppercase text-xs tracking-[0.2em]">
              <Command size={18} /> 2. Market Audit
            </div>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full h-24 p-4 text-[11px] mono bg-black border border-red-900/50 text-red-100 uppercase resize-none outline-none focus:border-red-600 transition-all"
              placeholder="ENTER DECREE..."
            />
            
            {!marketPrice ? (
              <button
                onClick={handleAuditRequest}
                disabled={!state.original}
                className="w-full mt-4 py-4 bg-black border border-red-600 text-red-600 font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Audit Request Complexity
              </button>
            ) : !isUnlocked ? (
              <div className="mt-4 p-4 bg-red-600/10 border border-red-600 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] mono text-red-500 font-black">AUDIT_RESULT:</span>
                  <span className="text-xl font-black text-red-100">{marketPrice.amount} {marketPrice.currency}</span>
                </div>
                <button
                  onClick={initiatePayment}
                  disabled={paymentPending}
                  className="w-full py-4 bg-red-600 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-red-700 active:scale-95 transition-all"
                >
                  <CreditCard size={16} /> {paymentPending ? 'CONNECTING...' : 'PAY TO MANUFACTURE'}
                </button>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-green-900/10 border border-green-600 text-green-500 text-center font-black text-[10px] uppercase tracking-widest">
                Ledger Settled
              </div>
            )}
          </section>

          {/* Tier 3: Reality Manufacture */}
          <section className={`glass p-6 rounded-none border-l-4 border-red-600 transition-all ${!isUnlocked ? 'opacity-30 grayscale' : 'opacity-100'}`}>
            <div className="flex items-center gap-2 mb-5 text-red-500 font-black uppercase text-xs tracking-[0.2em]">
              <Scale size={18} /> 3. Manifestation
            </div>
            <button
              onClick={handleEdit}
              disabled={!state.original || state.loading || !isUnlocked}
              className="w-full py-5 bg-red-950 text-red-600 font-black uppercase tracking-[0.4em] border border-red-900 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed transition-all"
            >
              {state.loading ? 'SHIFTING...' : 'FORCE REALITY'}
            </button>
          </section>

          {/* Logs */}
          <section className="glass p-5 rounded-none border-l-4 border-red-600 flex-grow max-h-[250px] overflow-hidden flex flex-col mt-auto shadow-inner">
             <div className="text-[9px] mono text-red-500 font-bold mb-2 flex items-center gap-2"><Terminal size={12} /> CONSOLE_OUTPUT</div>
            <div className="bg-black p-4 flex-grow overflow-y-auto border border-red-900/20">
              {logs.map((log, i) => (
                <div key={i} className="text-[10px] mono mb-1 text-red-800 animate-in fade-in slide-in-from-left-1">
                  <span className="text-red-600 mr-2 italic">»</span> {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </section>
        </aside>

        <main className="xl:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-8 flex items-center justify-center relative min-h-[600px] border-red-900/20 group">
            <div className="scanline"></div>
            <div className="absolute top-4 left-4 text-[9px] mono text-red-900 font-bold">SOURCE_SUBSTRATE</div>
            {state.original ? (
              <img src={state.original} className="max-h-full object-contain z-10 shadow-2xl border border-white/5" />
            ) : (
              <div className="flex flex-col items-center gap-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Eye size={120} />
                <span className="mono text-xs uppercase font-black">Waiting for input</span>
              </div>
            )}
          </div>
          <div className="glass p-8 flex items-center justify-center relative min-h-[600px] border-red-600/30 group">
            <div className="scanline"></div>
            <div className="absolute top-4 left-4 text-[9px] mono text-red-500 font-bold">OUTCOME_MANIFOLD</div>
            {state.loading ? (
              <div className="text-center animate-pulse z-10">
                <Zap size={80} className="text-red-600 mx-auto mb-6 pure-red-glow" />
                <p className="mono text-sm uppercase font-black tracking-widest">Settling Reality Ledger...</p>
                <div className="w-48 h-1 bg-red-900/30 mx-auto mt-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-600 animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            ) : state.edited ? (
              <img src={state.edited} className="max-h-full object-contain z-10 animate-in zoom-in-95 duration-700 shadow-2xl border border-red-600/20" />
            ) : (
              <div className="flex flex-col items-center gap-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lock size={120} />
                <span className="mono text-xs uppercase font-black">Locked by Ledger</span>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="mt-8 border-t border-red-900/20 pt-6 text-[9px] mono text-red-950 flex justify-between uppercase font-bold tracking-[0.4em]">
        <div className="flex items-center gap-4">
          <span className="text-red-600 flex items-center gap-2"><ShieldCheck size={12} /> VERIFIED_DOMAIN: OMEGA-UNITY.VERCEL.APP</span>
          <span>Session: {userEmail}</span>
        </div>
        <span>Authority: LISWANISO EDGAR MULENGA WARMABLON</span>
      </footer>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default App;
