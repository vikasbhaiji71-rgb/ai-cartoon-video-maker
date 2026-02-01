
import React from 'react';
import AdPlaceholder from './AdPlaceholder';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-10 pb-32 flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#F8FAFC]">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-400/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0F172A]/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-100 px-6 py-2 rounded-full mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#38BDF8]"></span>
          <span className="text-slate-700 text-[10px] font-black uppercase tracking-widest">FREE | Mobile First | No Editing Needed</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-[#0F172A] leading-[0.95] mb-8 tracking-tighter uppercase">
          Script se <span className="text-[#38BDF8]">2D Cartoon</span> Video
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Apni kahani paste kijiye aur AI-style workflow se professional 2D cartoon video banaiye. Same character consistency ke saath.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto bg-[#0F172A] hover:bg-black text-white font-black py-6 px-14 rounded-full shadow-2xl transform hover:translate-y-[-4px] active:scale-95 transition-all text-xl flex items-center justify-center gap-3 group uppercase tracking-tighter"
          >
            Start Creating Free
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 text-left max-w-3xl mx-auto border-t border-slate-100 pt-12">
          {[
            { label: 'Script → Scenes', icon: '✔' },
            { label: 'Same Character', icon: '✔' },
            { label: '2D Cartoon Look', icon: '✔' },
            { label: 'Watch Ad Export', icon: '✔' },
            { label: '1080p Quality', icon: '✔' },
            { label: 'Mobile Editor', icon: '✔' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#38BDF8] font-black text-lg">{item.icon}</span>
              <span className="text-[#0F172A] font-black text-[10px] uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <AdPlaceholder type="banner" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
