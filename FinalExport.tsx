
import React from 'react';
import { AppView } from '../types';
import AffiliateGear from './AffiliateGear';

interface FinalExportProps {
  onNavigate: (view: AppView) => void;
}

const FinalExport: React.FC<FinalExportProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter uppercase">Badhai Ho! Video Ready Hai</h2>
        <p className="text-slate-500 italic font-medium">Ab waqt hai viral hone ka. Niche di gayi strategy follow karein.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Export Settings */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <span className="bg-[#38BDF8] text-white p-2 rounded-lg text-sm">⚙️</span>
            Export & Upload Settings
          </h4>
          <ul className="space-y-4 text-slate-600 text-sm font-bold">
            <li className="flex items-start gap-3">
              <span className="text-sky-500">•</span>
              <span>Resolution: 1080p (9:16 Vertical)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-500">•</span>
              <span>Frame Rate: 60fps for smoothness</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-500">•</span>
              <span>Cover: Video ka best character frame</span>
            </li>
          </ul>
        </div>

        {/* Viral Hooks (Option 1 Integration) */}
        <div className="bg-[#0F172A] text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl"></div>
          <h4 className="text-xl font-black mb-6 flex items-center gap-2">
            <span className="text-sky-400">🔥</span>
            Viral Shorts Hooks
          </h4>
          <div className="space-y-4 text-xs font-bold opacity-90">
            <p className="bg-white/5 p-3 rounded-xl border border-white/10">"Wait for the end... unexpected twist! 😱"</p>
            <p className="bg-white/5 p-3 rounded-xl border border-white/10">"Kya aapne kabhi aisa sher dekha hai? 🦁"</p>
            <p className="bg-white/5 p-3 rounded-xl border border-white/10">"Moral story that will change your day. ✨"</p>
          </div>
        </div>
      </div>

      {/* Traffic Strategy (Option 1 Integration) */}
      <div className="bg-sky-50 border border-sky-100 p-10 rounded-[3rem] mb-16">
        <h3 className="text-2xl font-black text-slate-900 mb-6 text-center tracking-tighter uppercase">🚀 YouTube Shorts Viral Strategy</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <span className="text-3xl block mb-2">⏰</span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Best Timing</p>
            <p className="text-sm font-bold text-slate-900">6:00 PM - 8:30 PM (IST)</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <span className="text-3xl block mb-2">#️⃣</span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Must Hashtags</p>
            <p className="text-xs font-bold text-slate-900">#HindiShorts #CartoonAI #ToonDraft</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <span className="text-3xl block mb-2">📈</span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Consistency</p>
            <p className="text-sm font-bold text-slate-900">1 Video Daily for 30 Days</p>
          </div>
        </div>
      </div>

      <AffiliateGear type="mic" />

      <div className="text-center mt-16 pb-20">
        <button 
          onClick={() => onNavigate('home')}
          className="bg-[#0F172A] hover:bg-black text-white font-black py-6 px-16 rounded-full shadow-2xl transform active:scale-95 transition-all text-2xl flex items-center gap-4 mx-auto uppercase tracking-tighter"
        >
          🔄 Start New Project
        </button>
        <p className="mt-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
          Nayi video banayein aur channel grow karein!
        </p>
      </div>
    </div>
  );
};

export default FinalExport;
