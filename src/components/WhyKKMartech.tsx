import React from 'react';
import { Compass, Sparkles, Cpu, TrendingUp } from 'lucide-react';

export const WhyKKMartech: React.FC = () => {
  const principles = [
    {
      title: 'STRATEGY',
      subtitle: 'Clear Direction & Purpose',
      description: 'Understanding your audience, market landscape, and commercial goals before designing.',
      icon: Compass,
      accent: 'border-[#D4AF37]/30 hover:border-[#D4AF37]'
    },
    {
      title: 'CREATIVITY',
      subtitle: 'Distinctive Visual Craft',
      description: 'High-end design, sensory aesthetics, and memorable branding that commands attention.',
      icon: Sparkles,
      accent: 'border-[#D4AF37]/30 hover:border-[#D4AF37]'
    },
    {
      title: 'TECHNOLOGY',
      subtitle: 'Speed & Modern Standards',
      description: 'Fast, responsive web experiences, clean architecture, and seamless mobile responsiveness.',
      icon: Cpu,
      accent: 'border-[#D4AF37]/30 hover:border-[#D4AF37]'
    },
    {
      title: 'GROWTH',
      subtitle: 'Measurable Momentum',
      description: 'Multi-channel acquisition, search engine visibility, and sustainable customer loyalty.',
      icon: TrendingUp,
      accent: 'border-[#D4AF37]/30 hover:border-[#D4AF37]'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            OUR CORE VALUES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            WHY KK MARTECH?
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed">
            We bring strategy, creativity, technology and AI together to create digital experiences that help businesses communicate better and grow online.
          </p>
        </div>

        {/* 4 Visual Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                id={`principle-card-${item.title.toLowerCase()}`}
                className="group relative bg-[#141414] rounded-xl border border-white/10 p-7 flex flex-col justify-between hover:bg-[#181818] transition-all duration-300 hover:shadow-2xl hover:border-[#D4AF37]/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-white/40 group-hover:text-[#D4AF37] transition-colors">
                      0{idx + 1}
                    </span>
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white mb-1 tracking-tight group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-white/50 block mb-3">
                    {item.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-0 group-hover:w-full h-full bg-[#D4AF37] transition-all duration-500 rounded-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
