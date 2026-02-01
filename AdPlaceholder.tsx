
import React from 'react';

interface AdPlaceholderProps {
  type: 'banner' | 'square' | 'sidebar';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  const styles = {
    banner: "w-full h-32 md:h-24",
    square: "w-full aspect-square max-w-[300px]",
    sidebar: "w-full h-[600px] hidden lg:block"
  };

  return (
    <div className={`${styles[type]} bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-6 my-8 overflow-hidden group hover:border-orange-200 transition-colors`}>
      <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Advertisement</div>
      <div className="text-gray-400 font-bold text-center">
        {type === 'banner' && <p className="text-sm">Place Horizontal Banner Ad Here (Google AdSense)</p>}
        {type === 'square' && <p className="text-sm">Place Square Ad Here</p>}
        {type === 'sidebar' && <p className="text-sm">Tall Skycraper Ad Slot</p>}
      </div>
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity bg-orange-600 text-white text-[8px] font-black px-2 py-1 rounded">
        AD SLOT READY
      </div>
    </div>
  );
};

export default AdPlaceholder;
