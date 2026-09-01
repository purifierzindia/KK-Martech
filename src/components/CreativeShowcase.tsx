import React, { useState } from 'react';
import { SHOWCASE_GALLERY_ITEMS } from '../data/initialPortfolio';
import { Sparkles, Maximize2, X, ChevronRight, ChevronLeft } from 'lucide-react';

export const CreativeShowcase: React.FC = () => {
  const [activeItem, setActiveItem] = useState<{
    id: string;
    type: string;
    title: string;
    image: string;
    tag: string;
  } | null>(null);

  const [scrollIndex, setScrollIndex] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] border-y border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>VISUAL REEL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
              CREATIVE THAT GETS ATTENTION.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 max-w-md">
            High-impact visual execution across social feeds, digital ads, 3D renderings, and AI generative design.
          </p>
        </div>
      </div>

      {/* Horizontal visual scrolling reel */}
      <div className="relative">
        <div className="flex space-x-5 overflow-x-auto pb-6 px-4 sm:px-6 lg:px-8 scrollbar-none snap-x snap-mandatory">
          {SHOWCASE_GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="flex-shrink-0 w-72 sm:w-80 md:w-96 snap-center group relative rounded-xl overflow-hidden bg-[#141414] border border-white/10 shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300 cursor-pointer"
            >
              {/* Image Preview */}
              <div className="aspect-[4/3] relative overflow-hidden bg-[#0A0A0A]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Type Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/90 backdrop-blur-md border border-white/10 text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">
                  <span>{item.type}</span>
                </div>

                {/* Quick Expand Icon */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Title & Tag */}
                <div className="absolute bottom-3 left-3.5 right-3.5">
                  <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-0.5">
                    {item.tag}
                  </span>
                  <h4 className="text-sm font-heading font-bold text-white leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#141414] rounded-xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 text-white hover:text-[#D4AF37] flex items-center justify-center border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#141414] border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase">
                  {activeItem.type} • {activeItem.tag}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2 rounded bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 border border-white/10"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
