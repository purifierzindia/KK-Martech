import React from 'react';
import { Logo } from './Logo';
import { usePortfolio } from '../context/PortfolioContext';
import { Phone, MessageSquare, ArrowUp, Sliders } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { setIsCmsOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-12 text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="full" onClick={() => onNavigate('hero')} />
            <p className="text-xs text-white/50 max-w-sm leading-relaxed">
              Modern digital marketing, high-performance websites, social media strategy and AI-accelerated creative solutions for ambitious businesses.
            </p>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Communication (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">
              GET IN TOUCH
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="tel:8005986330"
                className="flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call: 8005986330</span>
              </a>
              <a
                href="https://wa.me/918920880526"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: 8920880526</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsCmsOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all font-bold uppercase tracking-widest"
              >
                <Sliders className="w-3 h-3" />
                <span>Manage Portfolio CMS</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>© 2026 KK MARTECH. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#D4AF37] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
