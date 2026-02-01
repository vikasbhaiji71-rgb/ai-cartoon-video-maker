
import React from 'react';
import { AppView } from '../types';
import AffiliateGear from './AffiliateGear';

interface VoiceGeneratorProps {
  onNavigate: (view: AppView) => void;
}

const VoiceGenerator: React.FC<VoiceGeneratorProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">🗣 Cartoon Voice Generate Karein</h2>
        <p className="text-gray-600">Apni script ko paste karein aur AI se bulwayein.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10">
        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="bg-orange-600 text-white p-2 rounded-lg text-sm">🎙</span>
          Voice Kaise Banayein:
        </h4>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">1</div>
            <p className="text-gray-700">Niche diye gaye <strong>ElevenLabs</strong> button par click karein.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">2</div>
            <p className="text-gray-700">Apni Hindi ya English Script paste karein jo aapne Page 2 par taiyaar ki thi.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">3</div>
            <p className="text-gray-700"><strong>Voice Select Karein:</strong> "Adam" (Male) ya "Mimi" (Kid/Cartoon) voice best hai.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">4</div>
            <p className="text-gray-700">Generate dabayein aur <strong>Audio download</strong> kar lein.</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <a 
          href="https://elevenlabs.io/text-to-speech" 
          target="_blank" 
          className="w-full bg-indigo-600 text-white py-5 px-8 rounded-3xl font-black text-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-4"
        >
          🎤 Open Voice AI (Free Version)
        </a>
      </div>

      {/* Mic Recommendation for Voiceover */}
      <div className="py-10">
        <hr className="border-gray-100 mb-10" />
        <div className="text-center mb-6">
          <h3 className="text-xl font-black text-gray-900">🎙 Khud Ki Aawaz Record Karni Hai?</h3>
          <p className="text-gray-500 mt-2">Agar aap AI voice use nahi karna chahte aur apni aawaz mein video banana chahte hain, toh sasti aur clear audio ke liye yeh Mic best hai:</p>
        </div>
        <AffiliateGear type="mic" />
      </div>

      <div className="bg-blue-900 text-blue-50 p-8 rounded-[2.5rem] shadow-2xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl">💡</div>
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-blue-400">💡</span> Editor Tip:
        </h4>
        <p className="text-lg leading-relaxed opacity-90">
          Jab aapke paas Video (Images wali) aur Voice (ElevenLabs se) aa jaye, toh wapis Video Editor (CapCut/VN) mein jayein:
          <br /><br />
          <span className="font-bold text-blue-300">Audio > Sounds > From File</span> select karke voice ko video ke niche har scene ke dialogue ke hisaab se set kar dein.
        </p>
      </div>

      <div className="text-center pb-20">
        <button 
          onClick={() => onNavigate('final-export')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-5 px-16 rounded-full shadow-lg transform active:scale-95 transition-all text-xl"
        >
          👉 Next: Final Export & Upload
        </button>
      </div>
    </div>
  );
};

export default VoiceGenerator;
