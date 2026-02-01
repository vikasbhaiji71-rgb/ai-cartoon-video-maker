
import React, { useState, useEffect } from 'react';
import { Scene, AppView } from '../types';

interface PreviewPlayerProps {
  scenes: Scene[];
  onNavigate: (view: AppView) => void;
}

const PreviewPlayer: React.FC<PreviewPlayerProps> = ({ scenes, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isPlaying && currentIndex < scenes.length - 1) {
      timer = window.setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 4000); // 4 seconds per scene
    } else if (currentIndex >= scenes.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, scenes.length]);

  const handlePlay = () => {
    if (currentIndex >= scenes.length - 1) setCurrentIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-gray-900">🎬 Video Preview</h2>
        <p className="text-gray-500">Export karne se pehle apna cartoon check karein.</p>
      </div>

      <div className="bg-black rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[9/16] relative mx-auto max-w-[400px]">
        {/* Scene Image */}
        <div className="w-full h-full relative">
          {scenes[currentIndex].imageUrl ? (
            <img 
              src={scenes[currentIndex].imageUrl} 
              alt={`Scene ${currentIndex + 1}`} 
              className="w-full h-full object-cover animate-pulse-slow"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-500">
              <span className="text-6xl mb-4">🖼️</span>
              <p className="font-bold">Image not generated</p>
            </div>
          )}

          {/* Dialogue Overlay */}
          <div className="absolute bottom-10 left-0 right-0 px-6 text-center">
            <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <p className="text-white text-lg font-bold italic leading-snug">
                "{scenes[currentIndex].dialogue}"
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 bg-black/40">
            {scenes.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 flex-1 rounded-full overflow-hidden ${i <= currentIndex ? 'bg-orange-500' : 'bg-white/20'}`}
              >
                {i === currentIndex && isPlaying && (
                  <div className="h-full bg-orange-400 animate-grow-progress"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-6 mt-10">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-20 h-20 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xl hover:bg-orange-700 transition-all active:scale-90"
        >
          {isPlaying ? (
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-10 h-10 translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
      </div>

      <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4 pb-20">
        <button 
          onClick={() => onNavigate('generator')}
          className="bg-white text-gray-900 border-2 border-gray-100 font-black py-4 px-10 rounded-full hover:bg-gray-50 transition-all"
        >
          ✏️ Edit Scenes
        </button>
        <button 
          onClick={() => onNavigate('export')}
          className="bg-orange-600 text-white font-black py-4 px-10 rounded-full shadow-lg hover:bg-orange-700 transition-all"
        >
          🚀 Export Final Video
        </button>
      </div>
      
      <style>{`
        @keyframes grow-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-grow-progress {
          animation: grow-progress 4s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default PreviewPlayer;
