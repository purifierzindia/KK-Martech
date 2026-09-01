import React from 'react';
import { MessageSquare } from 'lucide-react';

export const QuickWhatsAppButton: React.FC = () => {
  return (
    <a
      id="floating-whatsapp-btn"
      href="https://wa.me/918920880526"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#141414] hover:bg-[#25D366] text-white hover:text-black border border-white/10 hover:border-[#25D366] shadow-2xl backdrop-blur-md transition-all duration-300 active:scale-95"
    >
      <div className="w-8 h-8 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-md">
        <MessageSquare className="w-4 h-4 fill-black text-black" />
      </div>
      <div className="hidden sm:flex flex-col text-left pr-1">
        <span className="text-[9px] uppercase font-bold tracking-widest text-[#D4AF37] group-hover:text-black leading-tight">
          Let's Talk
        </span>
        <span className="text-xs font-bold leading-tight">
          WhatsApp Us
        </span>
      </div>
    </a>
  );
};
