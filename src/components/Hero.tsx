import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, Monitor, Share2, Target, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { setSelectedProject, projects } = usePortfolio();

  const handleOpenFeatured = (id: string) => {
    const found = projects.find(p => p.id === id);
    if (found) {
      setSelectedProject(found);
    } else if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex flex-col justify-center bg-[#0A0A0A]"
    >
      {/* Background ambient lighting - strictly warm gold and deep carbon */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[450px] bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (approx 45%) */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 z-10 text-center lg:text-left">
            
            {/* Agency Brand Tagline Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#141414] border border-white/10 text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
              <span>MARKETING × TECHNOLOGY × AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-black tracking-tight leading-[1.05] text-white">
              BUILD <span className="text-[#D4AF37]">SMARTER.</span>
              <br />
              MARKET <span className="text-white">BETTER.</span>
              <br />
              GROW <span className="text-[#E2BD48]">FASTER.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Digital marketing, websites, social media and AI-powered creative solutions for modern businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-view-work-cta"
                onClick={() => onNavigate('work')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)] active:scale-95 group"
              >
                <span>VIEW OUR WORK</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                id="hero-lets-talk-cta"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-transparent hover:bg-white/5 border border-white/20 hover:border-[#D4AF37] transition-all duration-300 active:scale-95 group"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Fast 4 Pillar Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                <Monitor className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Websites</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Marketing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Social Media</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>AI Creatives</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (approx 55%) */}
          {/* ONE Strong Visual Composition combining Website + Social + Ad + AI Creative */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-6 lg:pt-0">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11]">
              
              {/* Primary Anchor: Website Mockup Card */}
              <div
                onClick={() => handleOpenFeatured('aura-interior-website')}
                className="absolute inset-x-4 top-2 sm:top-4 bg-[#141414] rounded-xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)] cursor-pointer group z-10"
              >
                {/* Browser Top Chrome */}
                <div className="px-4 py-2.5 bg-[#0C0C0C] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/70" />
                  </div>
                  <div className="px-3 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/40 tracking-tight">
                    kkmartech.agency/preview/aura
                  </div>
                  <div className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase">
                    WEB DESIGN
                  </div>
                </div>

                {/* Website Visual Banner */}
                <div className="relative h-44 sm:h-56 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
                    alt="Aura Living Web Concept"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">
                        CONCEPT PROJECT
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white font-heading">
                        Aura Living Architecture & Interiors
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm text-[10px] font-semibold text-white border border-white/20 group-hover:border-[#D4AF37]">
                      View Study →
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Element 1: Vertical Mobile Social Creative Card (Left Offset) */}
              <div
                onClick={() => handleOpenFeatured('velvet-roast-social')}
                className="absolute -left-2 sm:-left-6 bottom-0 w-36 sm:w-44 bg-[#141414] rounded-lg border border-white/10 overflow-hidden shadow-2xl z-20 cursor-pointer hover:scale-105 hover:border-[#D4AF37]/60 transition-all duration-300 group"
              >
                <div className="relative aspect-[9/13] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=85"
                    alt="Social Media Creative Reel"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-bold text-[#E5C158] uppercase tracking-wider">
                    SOCIAL MEDIA
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[10px] font-bold text-white leading-tight">
                      Velvet Roast Campaign
                    </p>
                    <span className="text-[8px] text-white/50">Reel & Visual Grid</span>
                  </div>
                </div>
              </div>

              {/* Floating Element 2: AI Photorealistic Creative Card (Right Offset) */}
              <div
                onClick={() => handleOpenFeatured('hyperion-hypercar-ai')}
                className="absolute -right-2 sm:-right-6 bottom-4 w-40 sm:w-52 bg-[#141414] rounded-lg border border-white/10 overflow-hidden shadow-2xl z-20 cursor-pointer hover:scale-105 hover:border-[#D4AF37]/60 transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=85"
                    alt="AI Generated Spec Ad"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/80 border border-[#D4AF37]/30 text-[8px] font-bold text-[#D4AF37]">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>AI CREATIVE</span>
                  </div>
                  <div className="absolute bottom-2 left-2.5 right-2">
                    <p className="text-[11px] font-bold text-white">Hyperion Spec Concept</p>
                    <span className="text-[8px] text-white/50">Generative Rendering</span>
                  </div>
                </div>
              </div>

              {/* Central Floating Quality Badge */}
              <div className="absolute -top-3 right-6 sm:right-12 z-30 px-3.5 py-1.5 bg-[#141414]/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                  Creative Portfolio
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
