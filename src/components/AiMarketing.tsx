import React from 'react';
import { Lightbulb, Sparkles, Palette, Send, ArrowRight } from 'lucide-react';

export const AiMarketing: React.FC = () => {
  const steps = [
    { label: 'IDEA', icon: Lightbulb, desc: 'Human Strategy & Concept' },
    { label: 'AI', icon: Sparkles, desc: 'Rapid Generative Exploration', highlight: true },
    { label: 'CREATIVE', icon: Palette, desc: 'Craft & Art Direction' },
    { label: 'CAMPAIGN', icon: Send, desc: 'Omni-Channel Execution' },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#141414] rounded-2xl border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle gold glow backing */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>AI × HUMAN JUDGEMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              SMARTER CREATION WITH AI
            </h2>
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-normal">
              AI helps accelerate ideas, creative exploration, content creation and marketing workflows—while strategy and creative judgement remain human-led.
            </p>
          </div>

          {/* Simple Visual Pipeline: IDEA → AI → CREATIVE → CAMPAIGN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="relative flex flex-col items-center sm:items-start">
                  
                  <div
                    className={`w-full p-5 rounded-xl border transition-all duration-300 ${
                      step.highlight
                        ? 'bg-[#1C1C1C] border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                        : 'bg-[#0E0E0E] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          step.highlight
                            ? 'bg-[#D4AF37] text-black shadow-md'
                            : 'bg-white/5 text-[#D4AF37] border border-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-white/40">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-lg font-heading font-black text-white mb-1 tracking-wide">
                      {step.label}
                    </h4>
                    <p className="text-xs text-white/60">
                      {step.desc}
                    </p>
                  </div>

                  {/* Connecting Arrow for desktop */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#1A1A1A] border border-white/20 items-center justify-center text-[#D4AF37]">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
