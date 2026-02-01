
import React from 'react';

export type GearType = 'mic' | 'laptop' | 'tripod' | 'greenscreen';

interface AffiliateGearProps {
  type: GearType;
  showImage?: boolean;
}

const productData = {
  mic: {
    title: 'BOYA by-M1 Lavalier Microphone',
    desc: 'Noise cancellation ke saath, mobile aur camera dono ke liye best.',
    link: 'https://www.amazon.in/s?k=boya+m1+mic',
    icon: '🎙️',
    priceLabel: 'Check Price on Amazon'
  },
  laptop: {
    title: 'Fast Video Editing Laptop',
    desc: 'Agar mobile slow hai, toh ye budget laptop check karein.',
    link: 'https://www.amazon.in/s?k=video+editing+laptop',
    icon: '⚡',
    priceLabel: 'Best Laptop Deal'
  },
  tripod: {
    title: 'Mobile Tripod Stand',
    desc: 'Steady video recording aur stability ke liye best choice.',
    link: 'https://www.amazon.in/s?k=mobile+tripod',
    icon: '📱',
    priceLabel: 'View on Amazon'
  },
  greenscreen: {
    title: 'Professional Green Screen',
    desc: 'Background change karne aur professional look ke liye.',
    link: 'https://www.amazon.in/s?k=green+screen',
    icon: '🟩',
    priceLabel: 'See Deals'
  }
};

const AffiliateGear: React.FC<AffiliateGearProps> = ({ type, showImage }) => {
  const data = productData[type];

  return (
    <div className={`p-6 rounded-3xl text-center shadow-inner border-2 border-dashed ${type === 'mic' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} max-w-xl mx-auto`}>
      <h4 className={`font-extrabold mb-2 flex items-center justify-center gap-2 ${type === 'mic' ? 'text-yellow-900' : 'text-blue-900'}`}>
        <span className="text-2xl">{data.icon}</span> {data.title}
      </h4>
      <p className={`text-sm mb-4 leading-relaxed ${type === 'mic' ? 'text-yellow-800' : 'text-blue-800'}`}>
        {data.desc}
      </p>
      <a 
        href={data.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`inline-block text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-md ${type === 'mic' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        👉 {data.priceLabel}
      </a>
    </div>
  );
};

export const CreatorGearFooter: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100">
      <h3 className="text-2xl font-black text-gray-900 text-center mb-10">📦 Recommended Creator Gear</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { type: 'mic' as const, title: 'Best Mic', text: 'Clear voice ke liye.' },
          { type: 'tripod' as const, title: 'Mobile Stand', text: 'Steady video recording.' },
          { type: 'greenscreen' as const, title: 'Green Screen', text: 'Background change karne ke liye.' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-3xl mb-3">{productData[item.type].icon}</div>
            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
            <p className="text-xs text-gray-500 mb-4">{item.text}</p>
            <a 
              href={productData[item.type].link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-600 font-bold text-sm hover:underline"
            >
              [Amazon Link]
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateGear;
