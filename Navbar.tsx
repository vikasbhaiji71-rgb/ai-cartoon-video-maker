
import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  onNavigate: (view: AppView) => void;
  currentView: AppView;
  credits?: number;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, credits = 0 }) => {
  const getProgress = () => {
    switch (currentView) {
      case 'home': return 0;
      case 'script': return 25;
      case 'generator': return 50;
      case 'preview': return 75;
      case 'export':
      case 'final-export': return 100;
      default: return 0;
    }
  };

  if (currentView === 'admin') return null;

  const isContentPage = !['home', 'login', 'signup', 'pricing', 'about', 'privacy', 'terms', 'contact', 'blog'].includes(currentView);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div 
          className="text-2xl font-black text-[#0F172A] flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <span className="bg-[#0F172A] text-white p-1.5 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </span>
          <span className="tracking-tighter uppercase font-black">ToonDraft<span className="text-[#38BDF8]"> AI</span></span>
        </div>

        <div className="hidden xl:flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <button onClick={() => onNavigate('blog')} className={`transition-colors ${currentView === 'blog' ? 'text-[#38BDF8]' : 'hover:text-[#0F172A]'}`}>Creator Blog</button>
          <button onClick={() => onNavigate('pricing')} className={`transition-colors ${currentView === 'pricing' ? 'text-[#38BDF8]' : 'hover:text-[#0F172A]'}`}>Pricing</button>
          <button onClick={() => onNavigate('contact')} className={`transition-colors ${currentView === 'contact' ? 'text-[#38BDF8]' : 'hover:text-[#0F172A]'}`}>Contact</button>
        </div>

        <div className="flex items-center gap-3">
          {isContentPage && (
            <div className="flex items-center gap-2 bg-sky-50 border border-sky-100 px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm">🎟</span>
              <span className="text-xs font-black text-sky-600 uppercase tracking-widest">{credits} Credits</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1.5 bg-slate-50 text-slate-400 hover:text-slate-900 border border-slate-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
            >
              <span className="text-xs">🔐</span> Admin Login
            </button>
            
            <button 
              onClick={() => onNavigate('login')}
              className={`hidden md:block text-[10px] font-black transition-colors uppercase tracking-widest px-3 ${currentView === 'login' ? 'text-[#38BDF8]' : 'text-slate-500 hover:text-[#0F172A]'}`}
            >
              Login
            </button>

            {currentView === 'home' ? (
              <button 
                onClick={() => onNavigate('signup')}
                className="bg-[#38BDF8] text-white px-6 py-2.5 rounded-full text-xs font-black hover:bg-sky-500 transition-all shadow-md active:scale-95 uppercase tracking-widest"
              >
                Sign Up Free
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('home')}
                className="text-xs font-black text-slate-400 hover:text-[#0F172A] uppercase tracking-widest ml-4"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress Line */}
      {currentView !== 'home' && !['login', 'signup', 'pricing', 'about', 'privacy', 'terms', 'contact', 'blog'].includes(currentView) && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-gray-50 w-full">
          <div 
            className="h-full bg-[#38BDF8] transition-all duration-700 ease-out shadow-[0_0_10px_#38BDF8]" 
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
