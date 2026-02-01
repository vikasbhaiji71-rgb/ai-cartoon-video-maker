
import React from 'react';
import { AppView } from '../types';

interface AuthProps {
  onNavigate: (view: AppView) => void;
  type: 'login' | 'signup';
}

const AuthDemo: React.FC<AuthProps> = ({ onNavigate, type }) => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
      <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#38BDF8]"></div>
        
        <div className="w-20 h-20 bg-[#0F172A] text-white rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl">
          {type === 'login' ? '🔑' : '🆕'}
        </div>
        
        <h2 className="text-3xl font-black text-[#0F172A] mb-2 tracking-tighter">
          {type === 'login' ? 'Login to ToonDraft' : 'Create Free Account'}
        </h2>
        <p className="text-slate-500 font-medium mb-10 text-sm">
          {type === 'login' 
            ? 'Welcome back! Enter your details to continue.' 
            : 'Join 5,000+ creators building viral cartoon channels.'}
        </p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate('script'); }}>
          {type === 'signup' && (
            <input 
              type="text" 
              placeholder="Full Name"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#38BDF8] font-bold text-slate-700 placeholder:text-slate-300"
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#38BDF8] font-bold text-slate-700 placeholder:text-slate-300"
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#38BDF8] font-bold text-slate-700 placeholder:text-slate-300"
          />
          
          <button 
            type="submit"
            className="w-full bg-[#0F172A] text-white py-5 rounded-full font-black text-lg hover:bg-black transition-all shadow-lg active:scale-95 mt-4"
          >
            {type === 'login' ? 'Login (Demo)' : 'Create Free Account'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Or continue with</p>
          <button className="w-full flex items-center justify-center gap-3 p-4 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.47-1.92 4.64-1.2 1.39-3.11 2.51-6.17 2.51-4.79 0-8.73-3.88-8.73-8.67s3.94-8.67 8.73-8.67c2.51 0 4.41.97 5.8 2.29l2.45-2.45C18.42 1.94 15.68 1 12.48 1 6.2 1 1.12 6.06 1.12 12.3s5.08 11.3 11.36 11.3c3.42 0 6.01-1.12 8.13-3.32 2.18-2.18 2.87-5.3 2.87-7.88 0-.58-.04-1.14-.12-1.68h-10.8z"/></svg>
            Google Login
          </button>
        </div>

        <p className="mt-8 text-sm text-slate-500 font-medium">
          {type === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => onNavigate(type === 'login' ? 'signup' : 'login')}
            className="ml-2 text-[#38BDF8] font-black hover:underline"
          >
            {type === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>

        <div className="mt-6 p-4 bg-sky-50 rounded-2xl border border-sky-100">
           <p className="text-[10px] text-sky-700 font-black uppercase tracking-widest leading-relaxed">
             This is a demo login. <br/>No real password data is stored.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;
