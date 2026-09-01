import React from 'react';
import { Logo } from './Logo';
import { Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Brand Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden bg-[#141414] border border-white/10 p-8 shadow-2xl">
              
              {/* Subtle background texture */}
              <div className="absolute -right-12 -bottom-12 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <Logo variant="full" />

                <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Creative & Growth Studio</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Designed for startups, medical practices, professional services, retail brands, and ambitious businesses seeking clean aesthetic differentiation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded bg-black/40 border border-white/10">
                    <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-1">
                      DISCIPLINE
                    </span>
                    <span className="text-sm font-bold text-white">Full-Stack Creative</span>
                  </div>
                  <div className="p-3.5 rounded bg-black/40 border border-white/10">
                    <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-1">
                      EXECUTION
                    </span>
                    <span className="text-sm font-bold text-white">Human-Led + AI</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Short crisp text & pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              OUR IDENTITY
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">
              ABOUT KK MARTECH
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-normal">
              KK MARTECH is a modern digital marketing and creative studio focused on helping businesses build stronger digital experiences through strategy, creativity, technology and AI.
            </p>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              We eliminate unnecessary agency fluff to deliver clean websites, high-converting marketing campaigns, refined branding, and AI-accelerated visuals that directly support your growth objectives.
            </p>

            {/* Quick check bullet features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-white/80">
                  Broad Industry Versatility
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-white/80">
                  Rapid Creative Turnaround
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-white/80">
                  End-to-End Digital Production
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-white/80">
                  Direct WhatsApp & Call Access
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
