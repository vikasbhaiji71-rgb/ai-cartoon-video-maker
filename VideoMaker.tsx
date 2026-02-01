
import React from 'react';
import { AppView } from '../types';
import AffiliateGear from './AffiliateGear';

interface VideoMakerProps {
  onNavigate: (view: AppView) => void;
}

const VideoMaker: React.FC<VideoMakerProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">🎞 Images Ko 2D Cartoon Video Banayein</h2>
        <p className="text-gray-600">Apni generated images ko jodein aur unme jaan daalein.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10">
        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="bg-orange-600 text-white p-2 rounded-lg text-sm">📱</span>
          Video Editing Steps:
        </h4>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">1</div>
            <p className="text-gray-700"><strong>App Open Karein:</strong> CapCut ya VN Editor kholein.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">2</div>
            <p className="text-gray-700"><strong>New Project:</strong> Apni saari Cartoon Images select karein jo aapne Page 3 se download ki hain.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">3</div>
            <p className="text-gray-700"><strong>Ratio Set Karein:</strong> Niche "Ratio" pe click karein aur <strong>9:16 (TikTok/Shorts)</strong> select karein.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">4</div>
            <p className="text-gray-700"><strong>Duration:</strong> Har photo ko 3 se 4 seconds ka rakhein taaki story fast chale.</p>
          </div>
          <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">✨</div>
            <p className="text-blue-900"><strong>Magic Trick (Animation):</strong> Photo pe click karein → Animation → Combo → "Zoom 1" ya "Pan Right" select karein. Isse video professional lagegi.</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <a 
          href="https://www.capcut.com/" 
          target="_blank" 
          className="bg-black text-white py-4 px-6 rounded-2xl font-bold text-center hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          📱 Download CapCut
        </a>
        <a 
          href="https://vlognow.me/" 
          target="_blank" 
          className="bg-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-center hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          ✂️ Download VN Editor
        </a>
      </div>

      <AffiliateGear type="laptop" />

      <div className="text-center mt-12 pb-20">
        <button 
          onClick={() => onNavigate('voice-generator')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-4 px-12 rounded-full shadow-lg transform active:scale-95 transition-all text-xl"
        >
          👉 Next: Add Voice (Aawaz Daalein)
        </button>
      </div>
    </div>
  );
};

export default VideoMaker;
