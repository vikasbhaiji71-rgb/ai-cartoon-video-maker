
import React, { useState } from 'react';
import { AppView } from '../types';
import AdPlaceholder from './AdPlaceholder';

interface ExportSettingsProps {
  onNavigate: (view: AppView) => void;
  credits: number;
  addCredits: (amount: number) => void;
  adsEnabled?: boolean;
}

const ExportSettings: React.FC<ExportSettingsProps> = ({ onNavigate, credits, addCredits, adsEnabled = true }) => {
  const [quality, setQuality] = useState<'low' | 'med' | 'high'>('med');
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAdWatching, setIsAdWatching] = useState(false);

  const handleExport = () => {
    const isPremium = quality === 'high' || quality === 'med';
    if (isPremium && credits <= 0) {
      alert("⚠️ INSUFFICIENT CREDITS: Please unlock HD Export with credits.");
      return;
    }
    
    setIsExporting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 5;
      if (p >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => onNavigate('final-export'), 1000);
      } else {
        setProgress(p);
      }
    }, quality === 'high' ? 200 : 100);
  };

  const simulateAdWatch = () => {
    setIsAdWatching(true);
    setTimeout(() => {
      addCredits(1);
      setIsAdWatching(false);
      alert("🎉 AWESOME! Ad Watched. +1 Credit earned! You can now render in HD.");
    }, 2000);
  };

  const isLocked = (quality === 'med' || quality === 'high') && credits <= 0;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Left Side: Tips & Ads */}
        <div className="hidden lg:block space-y-6">
           <div className="bg-sky-50 border border-sky-100 p-8 rounded-[2.5rem] shadow-sm">
              <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-3">Your Account</p>
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-2xl">🎟</span>
                 <p className="text-xl font-black text-[#0F172A]">{credits} Credits</p>
              </div>
              <p className="text-[10px] text-sky-400 font-bold leading-relaxed uppercase">1 Credit = 1 HD Export</p>
           </div>
           <AdPlaceholder type="sidebar" />
        </div>

        {/* Center: Main Export Controls */}
        <div className="lg:col-span-2 bg-white rounded-[4rem] shadow-2xl border border-slate-100 p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tighter uppercase">🎞 Render Final Video</h2>
            <p className="text-slate-500 font-medium">Select render quality. HD videos get 10x more reach.</p>
          </div>
          
          {!isExporting ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Output Quality</label>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'low', label: 'Draft (480p)', speed: 'Fast Rendering', icon: '⚡', premium: false },
                    { id: 'med', label: 'Creator HD (720p)', speed: 'Standard Viral Quality', icon: '⭐', premium: true },
                    { id: 'high', label: 'Pro Ultra (1080p)', speed: 'Best for Shorts/Reels', icon: '💎', premium: true }
                  ].map((q) => {
                    const active = quality === q.id;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setQuality(q.id as any)}
                        className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all group ${
                          active 
                            ? 'border-[#38BDF8] bg-sky-50 shadow-lg' 
                            : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <span className={`text-3xl transition-transform group-hover:scale-110 ${active ? 'scale-110' : ''}`}>{q.icon}</span>
                          <div className="text-left">
                            <p className="font-black text-[#0F172A] flex items-center gap-2">
                              {q.label}
                              {q.id === 'low' && <span className="text-[8px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black">UNLIMITED</span>}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">{q.speed}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {q.premium && credits <= 0 && <span className="text-[10px] font-black text-slate-300 uppercase">Locked</span>}
                          {active && <div className="w-8 h-8 bg-[#38BDF8] rounded-full flex items-center justify-center text-white text-sm shadow-md">✓</div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {isLocked && adsEnabled && (
                <div className="p-10 bg-[#0F172A] rounded-[3rem] border border-slate-800 flex flex-col items-center gap-6 text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl"></div>
                  <div className="w-16 h-16 bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner border border-slate-700">📺</div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-2 tracking-tight uppercase">Unlock HD Exports</h4>
                    <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">Watch a quick sponsor ad to get 1 Free Credit. <br/>Ads help us keep ToonDraft AI free!</p>
                  </div>
                  <button 
                    onClick={simulateAdWatch}
                    disabled={isAdWatching}
                    className="w-full bg-[#38BDF8] text-white py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-sky-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isAdWatching ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Loading Ad...</>
                    ) : 'Watch Ad & Earn Credit'}
                  </button>
                </div>
              )}

              {isLocked && !adsEnabled && (
                 <div className="p-8 bg-red-50 border border-red-100 rounded-3xl text-center">
                   <p className="text-red-700 font-black text-sm uppercase">Insufficient Credits</p>
                   <p className="text-red-500 text-xs font-bold mt-1">Please upgrade your plan in the pricing section.</p>
                 </div>
              )}

              <button 
                onClick={handleExport}
                className={`w-full font-black py-6 rounded-full shadow-2xl transition-all text-xl tracking-tighter uppercase ${
                  isLocked
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-[#0F172A] text-white hover:bg-black transform hover:translate-y-[-4px]'
                }`}
              >
                {isLocked ? 'Credit Required for HD' : 'Render & Finalize 🎥'}
              </button>
              
              <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
                Render normally takes 2-3 minutes depending on speed.
              </p>
            </div>
          ) : (
            <div className="text-center space-y-10 py-12">
              <div className="relative w-56 h-56 mx-auto">
                 <svg className="w-full h-full transform -rotate-90">
                  <circle cx="112" cy="112" r="90" fill="none" stroke="#f1f5f9" strokeWidth="20" />
                  <circle cx="112" cy="112" r="90" fill="none" stroke="#38BDF8" strokeWidth="20" 
                    strokeDasharray={565} strokeDashoffset={565 - (565 * progress) / 100}
                    strokeLinecap="round" className="transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-[#0F172A] tracking-tighter">{Math.round(progress)}%</span>
                  <span className="text-[10px] font-black text-[#38BDF8] uppercase tracking-widest mt-1">Stitching</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0F172A] mb-2 tracking-tight uppercase">Baking Cartoon...</h3>
                <p className="text-slate-500 font-medium">Syncing voiceover with character animation frames.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportSettings;
