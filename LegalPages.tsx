
import React from 'react';
import AdPlaceholder from './AdPlaceholder';

const PageWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-4xl mx-auto py-20 px-6">
    <h1 className="text-4xl font-black text-[#0F172A] mb-10 tracking-tighter uppercase">{title}</h1>
    <div className="prose prose-sky max-w-none text-slate-600 space-y-6 font-medium">
      {children}
    </div>
  </div>
);

export const AboutPage: React.FC = () => (
  <PageWrapper title="About ToonDraft AI">
    <p>Welcome to <strong>ToonDraft AI</strong>, the ultimate tool for mobile creators who want to build viral cartoon channels using the power of AI.</p>
    <p>ToonDraft AI ek creator-friendly platform hai jo users ko script se 2D cartoon video banane ka simple aur guided process provide karta hai. Humara mission hai 2D animation ko har kisi ke liye accessible banana.</p>
    <p>Hum beginners aur mobile users ke liye easy-to-use AI workflow design karte hain. Whether you are a YouTube Shorts creator, an Instagram Reel maker, or just someone with a story to tell, ToonDraft AI provides the tech stack to bring your vision to life in minutes.</p>
  </PageWrapper>
);

export const PrivacyPolicy: React.FC = () => (
  <PageWrapper title="Privacy Policy">
    <p>ToonDraft AI users ki privacy ka poora dhyaan rakhta hai. Hum koi personal data sell ya misuse nahi karte. Scripts sirf video generation ke liye use hoti hain. Third-party tools apni privacy policies follow karte hain.</p>
    <h2 className="text-xl font-black text-[#0F172A] tracking-tight">Cookies and Ads</h2>
    <p>Like any other website, ToonDraft AI uses 'cookies'. We may use third-party advertising partners like Google AdSense to serve ads. These partners use cookies to serve ads based on your visit to our site.</p>
  </PageWrapper>
);

export const TermsOfService: React.FC = () => (
  <PageWrapper title="Terms & Conditions">
    <ul className="list-disc pl-5 space-y-2">
      <li>Website demo purpose ke liye hai</li>
      <li>Generated content user ki responsibility hai</li>
      <li>Copyright violation allowed nahi</li>
      <li>Service future me update ho sakti hai</li>
    </ul>
    <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use ToonDraft AI if you do not agree to all terms stated.</p>
  </PageWrapper>
);

export const ContactPage: React.FC = () => (
  <PageWrapper title="Contact Us">
    <p className="text-lg">Agar aapko koi sawal hai ya aap help chahte hain, toh humse contact karein:</p>
    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mt-8 space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-2xl">📧</span>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Support</p>
          <p className="font-bold text-[#0F172A]">support@toondraftai.com</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl">📺</span>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">YouTube Channel</p>
          <p className="font-bold text-[#0F172A]">ToonDraft AI Official</p>
        </div>
      </div>
    </div>
  </PageWrapper>
);

export const BlogPage: React.FC = () => (
  <div className="max-w-6xl mx-auto py-20 px-6">
    <h1 className="text-5xl font-black text-[#0F172A] mb-4 text-center tracking-tighter uppercase">Creator Hub</h1>
    <p className="text-center text-slate-500 mb-16 font-medium max-w-2xl mx-auto">Get the strategy and traffic plans you need to build your cartoon empire.</p>
    
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { 
          title: "The Ultimate YouTube Shorts Strategy for 2024", 
          excerpt: "Full plan to get millions of views on your cartoon shorts. Hooks, timing, and consistency tips.",
          date: "Launch Day",
          tag: "Option 1 Strategy"
        },
        { 
          title: "How to Keep Character Consistency in AI", 
          excerpt: "Deep dive into ToonDraft's unique seed system for character faces.",
          date: "Recent",
          tag: "Product Guide"
        }
      ].map((post, i) => (
        <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-black text-[#38BDF8] uppercase tracking-widest">{post.date}</p>
            <span className="bg-slate-900 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{post.tag}</span>
          </div>
          <h3 className="text-2xl font-black text-[#0F172A] mb-4 group-hover:text-[#38BDF8] transition-colors">{post.title}</h3>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">{post.excerpt}</p>
          <button className="text-[#0F172A] font-black text-xs uppercase tracking-[0.2em] border-b-2 border-[#38BDF8] pb-1">Read Full Strategy →</button>
        </div>
      ))}
    </div>
    <div className="mt-16">
      <AdPlaceholder type="banner" />
    </div>
  </div>
);
