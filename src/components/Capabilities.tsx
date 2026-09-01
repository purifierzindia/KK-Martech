import React from 'react';
import { 
  Megaphone, 
  Share2, 
  FileText, 
  Monitor, 
  Search, 
  Palette, 
  Lightbulb, 
  Sparkles, 
  Workflow, 
  Target 
} from 'lucide-react';

export const Capabilities: React.FC = () => {
  const capabilities = [
    { name: 'Digital Marketing', icon: Megaphone, desc: 'Targeted acquisition across search & social channels.' },
    { name: 'Social Media', icon: Share2, desc: 'Cohesive feed curation, reel production & community management.' },
    { name: 'Content Strategy', icon: FileText, desc: 'Narrative planning, copywriting & visual storytelling.' },
    { name: 'Website Design', icon: Monitor, desc: 'Fast, responsive, editorial-grade web experiences.' },
    { name: 'SEO', icon: Search, desc: 'Technical SEO, content clustering & local Google visibility.' },
    { name: 'Branding', icon: Palette, desc: 'Visual identity, logo systems, color palettes & guidelines.' },
    { name: 'Creative Strategy', icon: Lightbulb, desc: 'Campaign concepts, artistic direction & commercial hooks.' },
    { name: 'AI-Assisted Marketing', icon: Sparkles, desc: 'Generative image assets, rapid video concepts & ideation.' },
    { name: 'Marketing Automation', icon: Workflow, desc: 'Lead routing, automated email sequences & CRM funnels.' },
    { name: 'Digital Strategy', icon: Target, desc: 'Holistic growth frameworks & cross-platform positioning.' },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              COMPREHENSIVE SKILLSET
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
              DIGITAL CAPABILITIES
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 max-w-md">
            Full-spectrum digital marketing and creative capabilities built to scale modern businesses.
          </p>
        </div>

        {/* Clean visual tags/cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.name}
                id={`capability-${cap.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-[#141414] rounded-xl border border-white/10 p-5 hover:border-[#D4AF37]/50 hover:bg-[#181818] transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-white mb-1.5 group-hover:text-[#D4AF37] transition-colors">
                    {cap.name}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  <span>KK Martech</span>
                  <span className="text-[#D4AF37]">Active</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
