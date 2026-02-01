
import React, { useState } from 'react';

interface AdminDashboardProps {
  onLogout: () => void;
  maintenanceMode: boolean;
  setMaintenanceMode: (val: boolean) => void;
  adsEnabled: boolean;
  setAdsEnabled: (val: boolean) => void;
  addCredits: (amount: number) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onLogout, 
  maintenanceMode, 
  setMaintenanceMode,
  adsEnabled,
  setAdsEnabled,
  addCredits
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'credits' | 'logs' | 'settings'>('overview');
  const [logs, setLogs] = useState<string[]>([
    'System Booting...',
    'Admin session active: admin@toondraft.ai',
    'Global synchronization complete.'
  ]);
  const [injectAmount, setInjectAmount] = useState(10);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 15));
  };

  const toggleMaintenance = () => {
    const newVal = !maintenanceMode;
    setMaintenanceMode(newVal);
    addLog(`Maintenance mode set to ${newVal ? 'ON' : 'OFF'}`);
  };

  const toggleAds = () => {
    const newVal = !adsEnabled;
    setAdsEnabled(newVal);
    addLog(`Ad system ${newVal ? 'ACTIVATED' : 'DEACTIVATED'}`);
  };

  const handleInjectCredits = () => {
    addCredits(injectAmount);
    addLog(`Injected ${injectAmount} credits to current session.`);
    alert(`Successfully injected ${injectAmount} credits!`);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans flex">
      {/* SIDEBAR */}
      <div className="w-20 lg:w-72 bg-[#0F172A] text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-3 border-b border-white/5">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black text-slate-900 shadow-lg shadow-sky-500/20">TD</div>
          <div className="hidden lg:block">
            <h1 className="text-sm font-black uppercase tracking-tighter">Control Tower</h1>
            <p className="text-[8px] font-black text-sky-400 uppercase tracking-widest">Master Admin Access</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'credits', label: 'Credits Mgr', icon: '🎟' },
            { id: 'logs', label: 'Security Logs', icon: '📜' },
            { id: 'settings', label: 'Core Setup', icon: '⚙️' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden lg:block font-bold text-sm uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button 
            onClick={onLogout} 
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest"
          >
            <span>🚪</span> <span className="hidden lg:inline">Terminate Session</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{activeTab} Dashboard</h2>
            <p className="text-slate-500 font-medium">ToonDraft AI Management Interface v1.0.5</p>
          </div>
          <div className="hidden md:flex gap-4">
             <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-3">
               <div className={`w-3 h-3 rounded-full animate-pulse ${maintenanceMode ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-green-500 shadow-[0_0_10px_#22c55e]'}`}></div>
               <span className="text-[10px] font-black uppercase tracking-widest">{maintenanceMode ? 'Maintenance ON' : 'System Healthy'}</span>
             </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Core Controls */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">🚧</div>
                    <button 
                      onClick={toggleMaintenance}
                      className={`w-14 h-7 rounded-full relative transition-all ${maintenanceMode ? 'bg-amber-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${maintenanceMode ? 'left-8' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Maintenance Mode</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Blocks all script & image generations. Use for updates.</p>
                </div>

                <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-2xl">📺</div>
                    <button 
                      onClick={toggleAds}
                      className={`w-14 h-7 rounded-full relative transition-all ${adsEnabled ? 'bg-sky-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${adsEnabled ? 'left-8' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Ad Monetization</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Toggle "Watch Ad to Earn" logic across the platform.</p>
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="bg-[#0F172A] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black pointer-events-none group-hover:scale-110 transition-transform">SYSTEM</div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  Live Master Logs
                </h4>
                <div className="font-mono text-[11px] space-y-4 h-64 overflow-y-auto custom-scrollbar">
                  {logs.map((log, i) => (
                    <p key={i} className="flex gap-4 opacity-80 border-b border-white/5 pb-2 last:border-0">
                      <span className="text-slate-600 shrink-0 select-none"># {logs.length - i}</span>
                      <span className={log.includes('Injected') ? 'text-green-400' : log.includes('Maintenance') ? 'text-amber-400' : 'text-slate-300'}>{log}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Credits & Quick Stats */}
            <div className="space-y-6">
               <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Video Exports</p>
                 <p className="text-5xl font-black text-slate-900 tracking-tighter">4,812</p>
                 <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                   <span className="text-green-500 text-xs font-black uppercase">↑ 24.5% This Week</span>
                   <span className="text-[10px] font-bold text-slate-300">Updated Now</span>
                 </div>
               </div>
               
               <div className="bg-indigo-600 p-10 rounded-[3.5rem] text-white shadow-xl shadow-indigo-200">
                 <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                   <span>🎟</span> Credit Injector
                 </h4>
                 <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <label className="block text-[8px] font-black text-indigo-200 uppercase mb-2">Amount to Add</label>
                      <input 
                        type="number" 
                        value={injectAmount}
                        onChange={(e) => setInjectAmount(parseInt(e.target.value) || 0)}
                        className="bg-transparent text-2xl font-black outline-none w-full"
                      />
                    </div>
                    <button 
                      onClick={handleInjectCredits}
                      className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-sky-50 transition-all active:scale-95"
                    >
                      Process Injection
                    </button>
                    <p className="text-[8px] text-center text-indigo-200 opacity-60 font-bold uppercase">Injects credits to current live session</p>
                 </div>
               </div>

               <div className="bg-slate-200/50 p-6 rounded-[2rem] border border-slate-300/50 text-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Developer Tools</p>
                  <button onClick={() => addLog('Database optimized')} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 underline">Run Optimization</button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'credits' && (
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 text-center">
            <div className="text-6xl mb-6">💎</div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-4">User Credit Ledger</h3>
            <p className="text-slate-500 max-w-xl mx-auto mb-10">This section allows you to manage specific user project credits. In the real version, this will connect to your Firebase User Database.</p>
            <div className="max-w-md mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <input type="text" placeholder="User Email (e.g. user@gmail.com)" className="w-full p-4 rounded-2xl bg-white border border-slate-200 mb-4 outline-none focus:border-sky-500 font-bold" />
               <button className="w-full bg-[#0F172A] text-white py-4 rounded-full font-black text-xs uppercase tracking-widest">Search User Portfolio</button>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
           <div className="bg-[#0F172A] p-12 rounded-[4rem] text-white font-mono h-[70vh] overflow-y-auto">
             <h3 className="text-xl font-black text-sky-400 uppercase tracking-widest mb-10 border-b border-white/10 pb-4">Full System Trace Log</h3>
             <div className="space-y-4 opacity-70">
                {logs.map((log, i) => <p key={i} className="text-sm">>>> {log}</p>)}
                <p className="text-slate-600 animate-pulse">>>> Waiting for incoming packets...</p>
             </div>
           </div>
        )}

        {activeTab === 'settings' && (
           <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-white p-10 rounded-[3rem] shadow-sm">
                <h4 className="text-lg font-black text-slate-900 uppercase mb-6">API Keys Configuration</h4>
                <div className="space-y-4">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Gemini AI Model</p>
                     <p className="font-mono text-xs text-slate-600">••••••••••••••••••••••••</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[8px] font-black text-slate-400 uppercase mb-1">ElevenLabs (Voice)</p>
                     <p className="font-mono text-xs text-slate-600">••••••••••••••••••••••••</p>
                   </div>
                </div>
             </div>
             <div className="bg-white p-10 rounded-[3rem] shadow-sm">
                <h4 className="text-lg font-black text-slate-900 uppercase mb-6">Version Control</h4>
                <p className="text-sm text-slate-500 mb-6 font-medium">Build: 1.0.5-PRO<br/>Status: Production Ready</p>
                <button className="w-full py-4 bg-sky-50 text-sky-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-100 transition-all">Check for Updates</button>
             </div>
           </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
