
import React from 'react';

const FeatureBox: React.FC<{ icon: string; title: string; text: string; delay: string }> = ({ icon, title, text, delay }) => (
  <div className={`bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:translate-y-[-10px] transition-all group`}>
    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
      {icon}
    </div>
    <h3 className="text-2xl font-black text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed font-medium">{text}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Stop Editing. <br/><span className="text-orange-600">Start Creating.</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium">Everything you need to build a faceless cartoon channel from scratch.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-3xl shadow-xl">
           <div className="flex -space-x-4">
              {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-gray-900 bg-gray-700"></div>)}
           </div>
           <div>
              <p className="text-xs font-black uppercase tracking-widest text-orange-500">Community</p>
              <p className="text-sm font-bold">5,000+ Creators</p>
           </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureBox 
          icon="🧩"
          title="Consistent Seeds"
          text="AI remembers your character. Same face, same clothes, every scene. No more jumping styles."
          delay="0"
        />
        <FeatureBox 
          icon="🎙️"
          title="AI Voice Engine"
          text="Convert your Hindi dialogue into emotional, character-driven voices using ElevenLabs integration."
          delay="100"
        />
        <FeatureBox 
          icon="🎞️"
          title="Auto-Storyboard"
          text="Don't waste hours thinking about visuals. AI breaks your script into professional shots automatically."
          delay="200"
        />
      </div>
    </section>
  );
};

export default Features;
