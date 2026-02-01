
import React from 'react';
import { AppView } from '../types';

interface PricingPageProps {
  onNavigate: (view: AppView) => void;
  addCredits: (amount: number) => void;
  adsEnabled?: boolean;
}

const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, addCredits, adsEnabled = true }) => {
  const plans = [
    {
      name: 'FREE',
      price: '₹0',
      period: '/ Month',
      color: 'slate',
      features: ['Script to Scene AI', 'Same Character Preset', 'Preview (480p)', 'Low Quality Export', 'Ads Supported'],
      cta: 'Start Free',
      status: 'Active'
    },
    {
      name: 'CREATOR',
      price: '₹299',
      period: '/ Month',
      color: 'sky',
      features: ['Everything in Free', '720p HD Export', 'No Watermark', 'Fewer Ads', 'Priority Support'],
      cta: 'Coming Soon',
      status: 'Waitlist'
    },
    {
      name: 'PRO',
      price: '₹599',
      period: '/ Month',
      color: 'indigo',
      features: ['1080p Ultra HD Export', 'Unlimited Videos', 'Full Character Customization', 'Zero Ads', 'Early Beta Access'],
      cta: 'Coming Soon',
      status: 'Waitlist'
    }
  ];

  const handleWatchAd = () => {
    alert("📺 Simulating Ad View... (5s)\nThis ad helps keep ToonDraft free!");
    setTimeout(() => {
      addCredits(1);
      alert("🎉 Success! +1 Credit added for watching the ad.");
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-[#0F172A] mb-4 tracking-tighter uppercase">ToonDraft AI Pricing</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Choose the best plan for your YouTube Shorts or Reels journey. Credits give you full control over high-quality renders.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-white p-10 rounded-[3.5rem] border-2 transition-all ${plan.name === 'CREATOR' ? 'border-[#38BDF8] shadow-2xl scale-105 relative' : 'border-slate-100 shadow-sm hover:border-slate-200'}`}>
            {plan.name === 'CREATOR' && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#38BDF8] text-white px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Most Popular</span>
            )}
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{plan.name} Plan</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-[#0F172A]">{plan.price}</span>
              <span className="text-slate-400 font-bold">{plan.period}</span>
            </div>
            
            <ul className="space-y-4 mb-10">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm font-bold text-slate-600">
                  <span className="text-green-500">✔</span>
                  {f}
                </li>
              ))}
            </ul>

            <button 
              disabled={plan.status === 'Waitlist'}
              onClick={() => plan.status === 'Active' && onNavigate('script')}
              className={`w-full py-5 rounded-full font-black text-lg transition-all shadow-md ${
                plan.status === 'Waitlist' 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-[#0F172A] text-white hover:bg-black'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Credits Section */}
      <div className="bg-[#0F172A] text-white p-12 md:p-20 rounded-[4.5rem] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4 tracking-tight uppercase">🎟 Credits System</h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            1 Credit = 1 HD Export. Need more? {adsEnabled ? 'Watch sponsor ads to earn credits for free, or upgrade to a bulk pack.' : 'Upgrade to a bulk pack to continue creating.'}
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {adsEnabled && (
              <button 
                onClick={handleWatchAd}
                className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] hover:bg-white/10 transition-colors group text-left"
              >
                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">📺</span>
                <p className="text-xs font-black text-[#38BDF8] uppercase tracking-widest mb-1">Watch Ad</p>
                <p className="text-xl font-black">+1 Credit</p>
                <p className="text-[10px] font-bold text-slate-500 mt-2">FREE EARN</p>
              </button>
            )}

            {[
              { label: 'Basic Pack', count: '10 Credits', price: '₹99', icon: '🎟' },
              { label: 'Pro Pack', count: '50 Credits', price: '₹399', icon: '💎' },
              { label: 'Unlimited', count: 'Monthly', price: '₹599', icon: '🚀' },
            ].map(item => (
              <div key={item.label} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] hover:bg-white/10 transition-colors group text-left cursor-pointer opacity-80 hover:opacity-100">
                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                <p className="text-xs font-black text-sky-400 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-xl font-black">{item.count}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-2">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
