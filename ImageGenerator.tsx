
import React, { useState } from 'react';
import { Scene, AppView, Character } from '../types';
import { generateSceneImage } from '../services/geminiService';

interface ImageGeneratorProps {
  scenes: Scene[];
  character?: Character;
  setScenes: React.Dispatch<React.SetStateAction<Scene[]>>;
  onNavigate: (view: AppView) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ scenes, character, setScenes, onNavigate }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [copied, setCopied] = useState<number | string | null>(null);

  const copyPrompt = (text: string, id: number | string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateImageForScene = async (index: number) => {
    const updatedScenes = [...scenes];
    updatedScenes[index].isGenerating = true;
    setScenes(updatedScenes);

    try {
      const imageUrl = await generateSceneImage(updatedScenes[index].visualDescription, character);
      const finalScenes = [...scenes];
      finalScenes[index].imageUrl = imageUrl;
      finalScenes[index].isGenerating = false;
      setScenes(finalScenes);
    } catch (error) {
      console.error(error);
      const failedScenes = [...scenes];
      failedScenes[index].isGenerating = false;
      setScenes(failedScenes);
      alert('Failed to generate image for this scene.');
    }
  };

  const generateAllImages = async () => {
    setGlobalLoading(true);
    for (let i = 0; i < scenes.length; i++) {
      if (!scenes[i].imageUrl) {
        await generateImageForScene(i);
      }
    }
    setGlobalLoading(false);
  };

  const allImagesReady = scenes.every(s => s.imageUrl);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">🎨 2D Character Studio</h2>
        <p className="text-gray-600">Generating consistent images for: <span className="font-bold text-orange-600">{character?.name || 'Your Character'}</span></p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Storyboard Scenes</h3>
          <p className="text-gray-500 text-sm">{scenes.length} professional scenes created by AI.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={generateAllImages}
            disabled={globalLoading}
            className={`py-4 px-10 rounded-full font-extrabold shadow-lg transition-all ${
              globalLoading 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {globalLoading ? 'Auto-Generating...' : 'Auto-Generate All 🚀'}
          </button>
          {allImagesReady && (
            <button
              onClick={() => onNavigate('preview')}
              className="py-4 px-10 rounded-full font-extrabold shadow-lg bg-orange-600 text-white hover:bg-orange-700 animate-bounce-short"
            >
              Watch Preview ▶️
            </button>
          )}
        </div>
      </div>

      <div className="space-y-12">
        {scenes.map((scene, index) => (
          <div key={index} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10 hover:shadow-md transition-all">
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-orange-100 text-orange-600 font-extrabold px-5 py-2 rounded-2xl text-sm tracking-wide">
                  SCENE {scene.sceneNumber}
                </span>
                <button 
                  onClick={() => copyPrompt(scene.visualDescription, index)}
                  className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors ${
                    copied === index ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {copied === index ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Script</h4>
                <p className="text-xl font-bold text-gray-800 italic">"{scene.dialogue}"</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">AI Visualization</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-5 rounded-2xl border border-gray-100 leading-relaxed">
                  {scene.visualDescription}
                </p>
              </div>

              {!scene.imageUrl && !scene.isGenerating && (
                <button
                  onClick={() => generateImageForScene(index)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all"
                >
                  Generate Image
                </button>
              )}
            </div>

            <div className="w-full lg:w-72 aspect-[9/16] bg-gray-50 rounded-3xl flex items-center justify-center overflow-hidden border-4 border-dashed border-gray-200 relative group shrink-0 shadow-inner">
              {scene.isGenerating ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-bold text-gray-500">AutoDrafting...</span>
                </div>
              ) : scene.imageUrl ? (
                <>
                  <img src={scene.imageUrl} alt={`Scene ${scene.sceneNumber}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <a 
                      href={scene.imageUrl} 
                      download={`scene-${scene.sceneNumber}.png`}
                      className="bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg"
                    >
                      Download HD
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 opacity-30">
                  <span className="text-4xl">📸</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center pb-20">
         <button 
          onClick={() => allImagesReady ? onNavigate('preview') : alert('Sabhi images generate karein!')}
          className="bg-gray-900 text-white font-black py-5 px-16 rounded-full shadow-2xl hover:bg-black transition-all text-xl"
        >
          Check Video Preview ▶️
        </button>
      </div>

      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-short {
          animation: bounce-short 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageGenerator;
