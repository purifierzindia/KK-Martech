import React from 'react';
import { Search, Map, Paintbrush, Rocket } from 'lucide-react';

export const OurApproach: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      subtitle: 'Understand the business and audience.',
      description: 'We dive deep into your market positioning, customer pain points, competitor gaps, and brand identity.',
      icon: Search
    },
    {
      number: '02',
      title: 'PLAN',
      subtitle: 'Build the right digital strategy.',
      description: 'Crafting the roadmaps, content frameworks, ad architectures, and visual wireframes tailored to your objectives.',
      icon: Map
    },
    {
      number: '03',
      title: 'CREATE',
      subtitle: 'Design the website, content and campaigns.',
      description: 'Developing high-conversion web experiences, creative assets, social reels, and AI-assisted visual collateral.',
      icon: Paintbrush
    },
    {
      number: '04',
      title: 'GROW',
      subtitle: 'Optimise and improve.',
      description: 'Refining campaigns, monitoring search signals, enhancing creative variations, and scaling sustainable traction.',
      icon: Rocket
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            HOW WE WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            OUR APPROACH
          </h2>
          <p className="text-base text-white/60">
            A structured, transparent four-step process delivering tangible creative and commercial results.
          </p>
        </div>

        {/* 4-Step Visual Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                id={`approach-step-${step.number}`}
                className="group relative bg-[#141414] rounded-xl border border-white/10 p-7 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-heading font-black text-[#D4AF37]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-white/90 mb-2 leading-snug">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Phase 0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
