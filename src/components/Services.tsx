import React from 'react';
import { 
  Globe, 
  Megaphone, 
  Share2, 
  TrendingUp, 
  Sparkles, 
  Palette, 
  ArrowUpRight 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ServicesProps {
  onSelectCategoryFilter: (category: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectCategoryFilter }) => {
  const services = [
    {
      number: '01',
      title: 'WEB DESIGN',
      description: 'Modern, responsive websites and landing pages.',
      categoryFilter: 'WEBSITES',
      icon: Globe,
      visualTag: 'High-Converting UI/UX',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80'
    },
    {
      number: '02',
      title: 'DIGITAL MARKETING',
      description: 'Digital strategies and campaigns designed around business goals.',
      categoryFilter: 'DIGITAL MARKETING',
      icon: Megaphone,
      visualTag: 'Targeted Campaigns',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80'
    },
    {
      number: '03',
      title: 'SOCIAL MEDIA',
      description: 'Content strategy, creatives and social-media campaigns.',
      categoryFilter: 'SOCIAL MEDIA',
      icon: Share2,
      visualTag: 'Visual Storytelling',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=700&q=80'
    },
    {
      number: '04',
      title: 'SEO',
      description: 'Search visibility and organic growth.',
      categoryFilter: 'WEBSITES',
      icon: TrendingUp,
      visualTag: 'Search Dominance',
      image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=700&q=80'
    },
    {
      number: '05',
      title: 'AI CREATIVES',
      description: 'AI-assisted images, videos, advertisements and creative concepts.',
      categoryFilter: 'AI CREATIVES',
      icon: Sparkles,
      visualTag: 'Next-Gen Visuals',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80'
    },
    {
      number: '06',
      title: 'BRANDING',
      description: 'Visual identity, marketing creatives and brand communication.',
      categoryFilter: 'BRANDING',
      icon: Palette,
      visualTag: 'Distinctive Identity',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80'
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              OUR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
              WHAT WE DO
            </h2>
          </div>
          <p className="text-base md:text-lg text-white/60 max-w-md font-normal">
            Everything you need to build a stronger digital presence.
          </p>
        </div>

        {/* 6 Visually Attractive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.number}
                id={`service-card-${service.number}`}
                onClick={() => onSelectCategoryFilter(service.categoryFilter)}
                className="group relative bg-[#141414] rounded-xl border border-white/10 overflow-hidden p-6 sm:p-7 flex flex-col justify-between hover:border-[#D4AF37]/50 hover:bg-[#181818] transition-all duration-300 shadow-xl cursor-pointer"
              >
                {/* Subtle top visual accent image preview on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>

                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#D4AF37] px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                      {service.number}
                    </span>

                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 tracking-tight group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Bottom interactive link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                  <span className="text-white/60 group-hover:text-[#D4AF37] transition-colors text-[11px]">
                    {service.visualTag}
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[11px]">
                    <span>View Projects</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
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
