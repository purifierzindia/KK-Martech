import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onNavigate: (sectionId: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      {/* Subtle gold glow behind */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#D4AF37]/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="bg-[#141414] rounded-2xl border border-white/10 p-10 sm:p-16 shadow-2xl space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>LET'S ELEVATE YOUR BRAND</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            READY TO BUILD YOUR DIGITAL PRESENCE?
          </h2>

          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto font-normal">
            Whether you need a high-converting website, organic social growth, or next-generation AI visuals, we are ready to collaborate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="final-cta-view-work"
              onClick={() => onNavigate('work')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white transition-all duration-300 shadow-md group"
            >
              <span>VIEW OUR WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              id="final-cta-lets-talk"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
