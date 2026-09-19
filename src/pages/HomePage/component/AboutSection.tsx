import React from 'react';
import {type Pillar } from '../../../types/productHome.types';
import { useReveal } from '../../../hooks/useReveal';


const pillars: Pillar[] = [
  { icon: '🌿', title: 'Clean Formula', description: 'No parabens, sulfates or harsh chemicals ever' },
  { icon: '🔬', title: 'Clinically Tested', description: 'Dermatologist approved and proven effective' },
  { icon: '🌸', title: 'Cruelty Free', description: 'Always ethical, always kind to all beings' },
  { icon: '♻️', title: 'Sustainable', description: 'Eco packaging, carbon conscious brand' },
];

export const AboutSection: React.FC = () => {
  const leftRef = useReveal();
  const rightRef = useReveal();

  return (
    <section className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-25 bg-gradient-to-br ...from-[#fff0f5] to-[#f8bbd9] relative overflow-hidden">
      <div className="absolute top-[-80px] right-[-80px] w-95 h-95 rounded-full bg-[rgba(249,168,212,0.14)] blur-[65px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-[1200px] mx-auto items-center">
        {/* Left Content */}
        <div ref={leftRef as React.RefObject<HTMLDivElement>} className="reveal">
          <div className="text-[11px] tracking-widest text-[#ec4899] font-bold uppercase mb-3.5">✦ Our Philosophy</div>
          <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(32px,3.5vw,54px)] font-bold text-[#1a0a14] leading-[1.1] m-0 mb-5.5">
            Skin that tells<br />
            <em className="text-[#ec4899] not-italic">your story</em> beautifully
          </h2>
          <p className="text-[15px] text-[#6b4c63] leading-[1.9] font-light mb-5">
            At Lumière, we believe skincare is a ritual, not a routine. Born from Parisian beauty science and nurtured by clinical research, every formula we create honors the complexity of real skin — with real science.
          </p>
          <p className="text-[15px] text-[#6b4c63] leading-[1.9] font-light mb-5">
            We partner with leading dermatologists to formulate products that deliver visible results without compromise — 100% clean, 100% effective, always.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-white/72 backdrop-blur-md border border-[rgba(236,72,153,0.1)] rounded-2xl p-4.5 transition-all duration-300 hover:border-[rgba(236,72,153,0.25)] hover:translate-y-[-3px] hover:shadow-[0_8px_24px_rgba(236,72,153,0.1)]"
              >
                <div className="text-2xl mb-2">{pillar.icon}</div>
                <div className="font-bold text-[13px] text-[#1a0a14] mb-1">{pillar.title}</div>
                <div className="text-xs text-[#9d6b8e] leading-[1.55] font-light">{pillar.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div ref={rightRef as React.RefObject<HTMLDivElement>} className="relative h-[420px] sm:h-[500px] lg:h-130 reveal"style={{ transitionDelay: '0.2s' }}>
          <div className="absolute top-0 left-0 w-2/3 h-[62%] bg-gradient-to-br from-[#fce4ec] to-[#f8bbd9] rounded-3xl flex items-center justify-center text-8xl shadow-[0_20px_56px_rgba(236,72,153,0.14)] overflow-hidden">
            <div className="animate-[bottleFloat_4.5s_ease-in-out_infinite]">🧪</div>
          </div>
          <div className="absolute bottom-0 right-0 w-3/5 h-[55%] bg-gradient-to-br from-[#f3e5f5] to-[#e1bee7] rounded-3xl flex items-center justify-center text-7xl shadow-[0_20px_56px_rgba(236,72,153,0.14)] overflow-hidden">
            <div className="animate-[bottleFloat_4.5s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>🌸</div>
          </div>
          <div className="absolute w-32 h-32 bottom-[30%] left-[57%] bg-white/92 backdrop-blur-md border border-[rgba(236,72,153,0.18)] rounded-3xl flex flex-col items-center justify-center shadow-[0_14px_40px_rgba(236,72,153,0.12)] animate-[floatTag_6s_ease-in-out_infinite]">
            <div className="text-3xl mb-1.5">💆‍♀️</div>
            <div className="text-[10px] font-bold text-[#ec4899] tracking-widest uppercase text-center leading-[1.4]">
              Glow<br />Ritual
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};