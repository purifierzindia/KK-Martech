import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, ArrowUpRight, Sliders, PhoneCall, MessageSquare, Bot } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCmsOpen } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: 'hero' },
    { label: 'SERVICES', href: 'services' },
    { label: 'OUR WORK', href: 'work' },
    { label: 'ABOUT', href: 'about' },
    { label: 'CONTACT', href: 'contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-[#0A0A0A]/95 to-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo
          variant="compact"
          onClick={() => handleNavClick('hero')}
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              id={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
              onClick={() => handleNavClick(item.href)}
              className="text-[11px] font-bold tracking-widest text-white/60 hover:text-[#D4AF37] transition-colors duration-200 uppercase relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Ask KayKay AI Concierge */}
          <button
            id="header-ask-kaykay-btn"
            onClick={() => window.dispatchEvent(new CustomEvent('open-kaykay-chat'))}
            title="Chat with KayKay AI"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded border border-[#D4AF37]/30 transition-all duration-200"
          >
            <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>KayKay AI</span>
          </button>

          {/* CMS Portfolio Studio Quick Access */}
          <button
            id="cms-manage-trigger-btn"
            onClick={() => setIsCmsOpen(true)}
            title="Open Portfolio CMS Manager"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-[#D4AF37] hover:bg-white/5 rounded border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-200"
          >
            <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Manage CMS</span>
          </button>

          {/* Let's Talk Main CTA */}
          <button
            id="header-lets-talk-btn"
            onClick={() => handleNavClick('contact')}
            className="group relative inline-flex items-center gap-2 px-6 py-2 text-[10px] font-bold tracking-widest uppercase text-black bg-[#D4AF37] hover:bg-white transition-colors duration-300 active:scale-95 shadow-md"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-white/80 bg-white/5 border border-white/10 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden bg-[#0A0A0A] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                id={`mobile-nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-xs font-bold tracking-widest text-white/70 hover:text-[#D4AF37] py-2 border-b border-white/5 flex items-center justify-between uppercase"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-white/30" />
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              id="mobile-drawer-ask-kaykay-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-kaykay-chat'));
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Ask KayKay AI Assistant</span>
            </button>

            <button
              id="mobile-drawer-lets-talk-btn"
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 text-[11px] font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-white transition-all"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:8005986330"
                className="flex items-center justify-center gap-2 py-2.5 bg-white/5 text-[11px] font-bold tracking-wider text-white border border-white/10 hover:border-[#D4AF37]/50"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/918920880526"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 bg-white/5 text-[11px] font-bold tracking-wider text-[#25D366] border border-white/10 hover:border-[#25D366]/50"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCmsOpen(true);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] uppercase font-bold tracking-wider text-white/40 hover:text-[#D4AF37]"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Portfolio CMS & Editor</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
