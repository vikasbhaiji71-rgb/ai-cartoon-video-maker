
import React, { useState } from 'react';
import { AppView } from '../types';

interface AdminLoginProps {
  onLogin: () => void;
  onNavigate: (view: AppView) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authStep, setAuthStep] = useState<'credentials' | 'pin'>('credentials');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate real Firebase-style check
    setTimeout(() => {
      if (email === 'admin@toondraft.ai' && password === 'vikaash21') {
        setAuthStep('pin');
        setIsLoading(false);
        setError(null);
      } else {
        setError('Invalid Admin Credentials');
        setIsLoading(false);
      }
    }, 800);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (pin === '1234') {
        onLogin();
      } else {
        setError('Security PIN Mismatch');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 bg-[#020617] relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]"></div>

      <div className="bg-slate-900 border border-slate-800 p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-md w-full relative z-10 backdrop-blur-xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-500/10 rounded-3xl border border-sky-500/20 mb-6 group">
            <span className="text-4xl group-hover:scale-110 transition-transform">🔐</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Master Terminal</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">Level 4 Restricted Access</p>
        </div>

        {authStep === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-4">Admin Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@toondraft.ai"
                className="w-full p-5 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-sky-500 text-white font-bold transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-4">Master Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-5 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-sky-500 text-white font-bold transition-all"
                required
              />
            </div>
            {error && <p className="text-red-400 text-[10px] font-black uppercase text-center">{error}</p>}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-full transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              {isLoading ? 'Verifying...' : 'Authenticate Identity'}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="text-center">
              <p className="text-sky-400 text-xs font-black uppercase tracking-widest mb-4">Credentials Verified. Enter PIN.</p>
              <input 
                type="password" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="0 0 0 0"
                className="w-full text-center text-4xl font-black tracking-[0.5em] p-6 bg-slate-950 border border-sky-500/50 rounded-3xl outline-none text-white"
                maxLength={4}
                required
              />
            </div>
            {error && <p className="text-red-400 text-[10px] font-black uppercase text-center">{error}</p>}
            <button 
              type="submit"
              className="w-full py-5 bg-white text-slate-950 font-black rounded-full transition-all shadow-lg hover:bg-sky-50 uppercase tracking-widest text-xs"
            >
              Access System Control
            </button>
          </form>
        )}

        <div className="mt-12 flex justify-between items-center text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">
          <button onClick={() => onNavigate('home')} className="hover:text-slate-400 transition-colors">← Abort Login</button>
          <span>System v1.0.4 - Secure</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
