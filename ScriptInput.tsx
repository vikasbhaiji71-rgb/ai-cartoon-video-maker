
import React, { useState } from 'react';
import { generateStoryScenes } from '../services/geminiService';
import { Scene, Character } from '../types';
import AdPlaceholder from './AdPlaceholder';

interface ScriptInputProps {
  onScenesGenerated: (scenes: Scene[], character?: Character) => void;
  credits: number;
  deductCredits: (amount: number) => void;
}

const CHARACTER_PRESETS: Character[] = [
  { id: 'rahul', name: 'Rahul', icon: '👦', color: 'bg-blue-500', description: 'A cute 10-year old Indian boy in a red hoodie and blue jeans, big expressive eyes.', gender: 'Male', ageGroup: 'Child', style: 'Simple 2D' },
  { id: 'sheru', name: 'Sheru', icon: '🦁', color: 'bg-orange-500', description: 'A small, friendly baby lion walking on two legs, wearing a tiny yellow cape.', gender: 'Male', ageGroup: 'Child', style: 'Kids Cartoon' },
  { id: 'mimi', name: 'Mimi', icon: '👧', color: 'bg-pink-500', description: 'A bubbly 7-year old girl with pigtails, wearing a purple dress and white sneakers.', gender: 'Female', ageGroup: 'Child', style: 'Kids Cartoon' },
  { id: 'kaka', name: 'Kaka', icon: '👴', color: 'bg-amber-600', description: 'A wise old man with a grey beard and a turban, wearing a traditional white kurta.', gender: 'Male', ageGroup: 'Adult', style: 'Simple 2D' }
];

const ScriptInput: React.FC<ScriptInputProps> = ({ onScenesGenerated, credits, deductCredits }) => {
  const [script, setScript] = useState('');
  const [language, setLanguage] = useState<'Hindi' | 'English'>('Hindi');
  const [length, setLength] = useState<'30 sec' | '40 sec'>('30 sec');
  const [videoStyle, setVideoStyle] = useState<'Kids' | 'Story' | 'Motivation'>('Kids');
  const [selectedChar, setSelectedChar] = useState<Character>(CHARACTER_PRESETS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!script.trim()) return;

    if (credits <= 0) {
      setError('Insufficient credits. Please watch an ad or buy more to continue.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const scenes = await generateStoryScenes(script, selectedChar);
      deductCredits(1);
      onScenesGenerated(scenes, selectedChar);
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column: Form */}
        <div className="flex-1">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Create New ToonDraft</h2>
              <p className="text-gray-500 font-medium">Yahan apni Hindi ya English story paste kare. Best result ke liye 30–40 seconds ki script likhe.</p>
            </div>
            <div className="bg-orange-50 border border-orange-100 px-6 py-4 rounded-3xl text-center shrink-0 shadow-sm">
               <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Your Balance</p>
               <p className="text-2xl font-black text-gray-900">{credits} Credits</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* STEP 1: SCRIPT DETAILS */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">01</span>
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                  Script & Preferences
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Language</label>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none"
                  >
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Length</label>
                  <select 
                    value={length} 
                    onChange={(e) => setLength(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none"
                  >
                    <option value="30 sec">30 sec</option>
                    <option value="40 sec">40 sec</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Style</label>
                  <select 
                    value={videoStyle} 
                    onChange={(e) => setVideoStyle(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none"
                  >
                    <option value="Kids">Kids</option>
                    <option value="Story">Story</option>
                    <option value="Motivation">Motivation</option>
                  </select>
                </div>
              </div>

              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Ex: Ek baar ki baat hai, Rahul jungle mein ghumne gaya..."
                className="w-full h-48 p-6 rounded-3xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all resize-none text-lg font-medium"
                disabled={isLoading}
              />
              
              <div className="mt-4 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <span>Recommended: 300-500 words</span>
                <span>{script.length} chars</span>
              </div>
            </div>

            {/* STEP 2: CHARACTER SETUP */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">02</span>
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                  Apna Cartoon Character Select Kare
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {CHARACTER_PRESETS.map((char) => (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => setSelectedChar(char)}
                    className={`relative p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 group ${
                      selectedChar.id === char.id 
                        ? 'border-orange-500 bg-orange-50 shadow-lg scale-105' 
                        : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-4xl group-hover:scale-110 transition-transform">{char.icon}</span>
                    <span className="font-bold text-gray-900 text-sm">{char.name}</span>
                    {selectedChar.id === char.id && (
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1 shadow-md">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="p-5 bg-red-50 text-red-600 rounded-3xl text-sm border border-red-100 font-bold">{error}</div>}

            <button
              type="submit"
              disabled={isLoading || !script.trim() || credits <= 0}
              className={`w-full py-6 rounded-full font-black text-2xl shadow-2xl transition-all transform hover:translate-y-[-4px] active:scale-95 flex items-center justify-center gap-4 ${
                isLoading || !script.trim() || credits <= 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating Cartoon Scenes...
                </>
              ) : (
                <>{credits <= 0 ? 'Insufficient Credits' : 'Generate Scenes (1 Credit) ✨'}</>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Pro Info & Tips */}
        <div className="hidden lg:block w-80 shrink-0 space-y-6">
          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
             <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-400">⚡</span> Pro Tips
             </h4>
             <ul className="space-y-4 text-sm opacity-80 font-medium">
               <li className="flex gap-2">
                 <span className="text-indigo-400">•</span>
                 Direct dialogues likhne se expressions acche aate hain.
               </li>
               <li className="flex gap-2">
                 <span className="text-indigo-400">•</span>
                 1 Credit equals 1 storyboard generation.
               </li>
             </ul>
          </div>

          <AdPlaceholder type="sidebar" />
        </div>
      </div>
    </div>
  );
};

export default ScriptInput;
