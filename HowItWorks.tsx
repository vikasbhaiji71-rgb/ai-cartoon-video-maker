
import React from 'react';

const Step: React.FC<{ number: number; title: string; text: string }> = ({ number, title, text }) => (
  <div className="flex gap-6 items-start">
    <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🎞 Video Kaise Banayein?</h2>
          <p className="text-gray-600">3 Simple Steps mein apna viral cartoon video taiyaar karein.</p>
        </div>

        <div className="space-y-12">
          <Step 
            number={1}
            title='Script Input'
            text='"Script Input" page par apni story paste karein aur "Generate Scenes" par click karein.'
          />
          <Step 
            number={2}
            title='AI Image Generator'
            text='AI scenes create karega. Ab har scene ke liye AI se mast 2D images generate karein.'
          />
          <Step 
            number={3}
            title='Voice & Export'
            text='Images ko download karein aur CapCut/InShot mein audio ke saath jod kar export karein!'
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
