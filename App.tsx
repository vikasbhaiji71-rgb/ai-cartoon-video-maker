
import React, { useState } from 'react';
import { AppView, Scene, Character } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import ScriptInput from './components/ScriptInput';
import ImageGenerator from './components/ImageGenerator';
import VideoMaker from './components/VideoMaker';
import VoiceGenerator from './components/VoiceGenerator';
import FinalExport from './components/FinalExport';
import PreviewPlayer from './components/PreviewPlayer';
import ExportSettings from './components/ExportSettings';
import { AboutPage, PrivacyPolicy, TermsOfService, ContactPage, BlogPage } from './components/LegalPages';
import { CreatorGearFooter } from './components/AffiliateGear';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AuthDemo from './components/AuthDemo';
import PricingPage from './components/PricingPage';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [character, setCharacter] = useState<Character | undefined>();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Global Admin Settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [credits, setCredits] = useState(3);

  const handleStart = () => {
    if (maintenanceMode) {
      alert("⚠️ SYSTEM MAINTENANCE: ToonDraft AI is temporarily offline for scheduled updates. Please try again after some time.");
      return;
    }
    setView('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScenesGenerated = (generatedScenes: Scene[], char?: Character) => {
    setScenes(generatedScenes);
    setCharacter(char);
    setView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (newView: AppView) => {
    if (newView === 'home') {
      setScenes([]);
      setCharacter(undefined);
    }
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addCredits = (amount: number) => setCredits(prev => prev + amount);
  const deductCredits = (amount: number) => setCredits(prev => Math.max(0, prev - amount));

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar onNavigate={handleNavigate} currentView={view} credits={credits} />
      
      <main className="flex-grow">
        {maintenanceMode && view !== 'admin' && (
          <div className="bg-amber-100 border-b border-amber-200 py-3 text-center sticky top-[72px] z-40 animate-pulse">
            <p className="text-amber-800 text-[10px] font-black uppercase tracking-[0.2em]">
              ⚠️ Maintenance Mode: Rendering and Generations are Paused
            </p>
          </div>
        )}

        {view === 'home' && (
          <>
            <Hero onStart={handleStart} />
            <Features />
            <HowItWorks />
            <CreatorGearFooter />
          </>
        )}

        {view === 'script' && (
          <div className="min-h-[calc(100vh-72px)]">
            {maintenanceMode ? (
               <div className="max-w-2xl mx-auto py-32 text-center px-6">
                  <div className="text-6xl mb-6">🚧</div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">System Offline</h2>
                  <p className="text-slate-500 font-medium mb-10">ToonDraft AI is currently being upgraded to support faster 2D generation. Please check back in a few hours!</p>
                  <button onClick={() => setView('home')} className="bg-[#0F172A] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">Return Home</button>
               </div>
            ) : (
              <ScriptInput 
                onScenesGenerated={handleScenesGenerated} 
                credits={credits} 
                deductCredits={deductCredits} 
              />
            )}
          </div>
        )}

        {view === 'generator' && (
          <div className="min-h-[calc(100vh-72px)]">
            <ImageGenerator 
              scenes={scenes} 
              character={character} 
              setScenes={setScenes} 
              onNavigate={handleNavigate} 
            />
          </div>
        )}

        {view === 'preview' && (
          <div className="min-h-[calc(100vh-72px)]">
            <PreviewPlayer scenes={scenes} onNavigate={handleNavigate} />
          </div>
        )}

        {view === 'export' && (
          <div className="min-h-[calc(100vh-72px)]">
            <ExportSettings 
              onNavigate={handleNavigate} 
              credits={credits} 
              addCredits={addCredits} 
              adsEnabled={adsEnabled}
            />
          </div>
        )}

        {view === 'video-maker' && (
          <div className="bg-white min-h-[calc(100vh-72px)]">
            <VideoMaker onNavigate={handleNavigate} />
          </div>
        )}

        {view === 'voice-generator' && (
          <div className="bg-gray-50 min-h-[calc(100vh-72px)]">
            <VoiceGenerator onNavigate={handleNavigate} />
          </div>
        )}

        {view === 'final-export' && (
          <div className="bg-white min-h-[calc(100vh-72px)]">
            <FinalExport onNavigate={handleNavigate} />
          </div>
        )}

        {view === 'about' && <AboutPage />}
        {view === 'privacy' && <PrivacyPolicy />}
        {view === 'terms' && <TermsOfService />}
        {view === 'contact' && <ContactPage />}
        {view === 'blog' && <BlogPage />}
        {view === 'pricing' && (
          <PricingPage 
            onNavigate={handleNavigate} 
            addCredits={addCredits} 
            adsEnabled={adsEnabled} 
          />
        )}
        {view === 'login' && <AuthDemo onNavigate={handleNavigate} type="login" />}
        {view === 'signup' && <AuthDemo onNavigate={handleNavigate} type="signup" />}

        {view === 'admin' && (
          isAdminAuthenticated ? (
            <AdminDashboard 
              onLogout={() => setIsAdminAuthenticated(false)} 
              maintenanceMode={maintenanceMode}
              setMaintenanceMode={setMaintenanceMode}
              adsEnabled={adsEnabled}
              setAdsEnabled={setAdsEnabled}
              addCredits={addCredits}
            />
          ) : (
            <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} onNavigate={handleNavigate} />
          )
        )}
      </main>

      {view !== 'admin' && (
        <footer className="py-20 bg-slate-900 text-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-2">
                <div className="mb-6 flex gap-2 items-center">
                  <span className="text-2xl bg-[#38BDF8] p-1.5 rounded-lg">🎨</span>
                  <span className="text-2xl font-black uppercase tracking-tighter">ToonDraft<span className="text-sky-400"> AI</span></span>
                </div>
                <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed font-medium">
                  Automating the 2D cartoon workflow for creators worldwide. High consistency characters, automated storyboards, and mobile-first editing.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Product</h4>
                <ul className="space-y-4 text-sm text-slate-400 font-bold">
                  <li><button onClick={() => handleNavigate('script')} className="hover:text-[#38BDF8]">AI Storyboard</button></li>
                  <li><button onClick={() => handleNavigate('pricing')} className="hover:text-[#38BDF8]">Pricing & Credits</button></li>
                  <li><button onClick={() => handleNavigate('blog')} className="hover:text-[#38BDF8]">Creator Hub</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Legal</h4>
                <ul className="space-y-4 text-sm text-slate-400 font-bold">
                  <li><button onClick={() => handleNavigate('about')} className="hover:text-[#38BDF8]">About Us</button></li>
                  <li><button onClick={() => handleNavigate('privacy')} className="hover:text-[#38BDF8]">Privacy Policy</button></li>
                  <li><button onClick={() => handleNavigate('admin')} className="hover:text-[#38BDF8]">Admin Master</button></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-bold uppercase tracking-widest">
              <p>&copy; {new Date().getFullYear()} ToonDraft AI. Built for Creators.</p>
              <div className="flex items-center gap-6">
                 <button onClick={() => handleNavigate('admin')} className="hover:text-white transition-colors">Admin Gateway</button>
                 <span className="opacity-20">|</span>
                 <p>v1.0.5-Pro-Ready 🚀</p>
              </div>
            </div>
          </div>
        </footer>
      )}

      {view === 'home' && (
        <button 
          onClick={handleStart}
          className="fixed bottom-8 right-8 bg-[#0F172A] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-black transition-all z-40 active:scale-90 border border-white/10"
        >
          <span className="text-2xl">➕</span>
        </button>
      )}
    </div>
  );
};

export default App;
