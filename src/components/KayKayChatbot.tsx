import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import {
  Bot,
  Send,
  X,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Maximize2,
  Minimize2,
  ChevronDown,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedActions?: Array<{ label: string; action: string }>;
}

interface KayKayChatbotProps {
  onNavigate: (sectionId: string) => void;
}

const INITIAL_SUGGESTIONS = [
  'What services does KK MARTECH offer?',
  'How much does a custom website or app cost?',
  'Explain your AI Creative & video pipeline',
  'How do you improve SEO and Google ranking?',
  'Can I book a discovery consultation?',
];

export const KayKayChatbot: React.FC<KayKayChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello! I'm **KayKay**, KK MARTECH's AI Digital Strategist & Concierge.\n\nI can instantly answer questions about our **Web Engineering**, **Performance Ads**, **SEO**, **Social Media Growth**, or **AI Creative Pipelines**.\n\nHow can I help accelerate your digital growth today?`,
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Explore Services', action: 'services' },
        { label: 'View Portfolio', action: 'work' },
        { label: 'Get Free Audit', action: 'contact' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleCustomOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-kaykay-chat', handleCustomOpen);
    return () => window.removeEventListener('open-kaykay-chat', handleCustomOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: newTimestamp,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newHistory.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "I'm here to help! Let me know what specific questions you have about KK MARTECH.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions || [],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Error contacting KayKay server endpoint:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: `I'm having a brief connection hitch, but our agency is standing by! You can reach our senior strategists directly via **Phone (8005986330)** or **WhatsApp (8920880526)**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'Chat on WhatsApp', action: 'whatsapp' },
          { label: 'Open Contact Form', action: 'contact' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: string) => {
    if (action === 'whatsapp') {
      window.open('https://wa.me/918920880526', '_blank');
    } else if (action === 'call') {
      window.location.href = 'tel:8005986330';
    } else {
      onNavigate(action);
      // Optional: keep bot open or close on mobile
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Chat reset! I'm **KayKay**, ready to answer any questions about our digital marketing, web engineering, SEO, and AI creative solutions. What would you like to know?`,
        timestamp: 'Just now',
        suggestedActions: [
          { label: 'Explore Services', action: 'services' },
          { label: 'View Portfolio', action: 'work' },
          { label: 'Contact Us', action: 'contact' },
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Unread Prompt Bubble */}
        {!isOpen && hasUnread && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#D4AF37]/40 text-xs text-white shadow-xl cursor-pointer hover:border-[#D4AF37] transition-all animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium text-[11px]">Ask KayKay AI</span>
          </div>
        )}

        <button
          id="kaykay-chat-launcher"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open KayKay AI Chat"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#141414] hover:bg-[#1A1A1A] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] text-[#D4AF37] hover:text-white transition-all duration-300 active:scale-95"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              {/* Online pulse indicator */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D4AF37] border-2 border-[#0A0A0A]"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Card */}
      {isOpen && (
        <div
          id="kaykay-chat-window"
          className={`fixed z-50 bg-[#141414] border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'inset-4 sm:inset-10 sm:max-w-4xl sm:mx-auto'
              : 'bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="px-4 py-3.5 bg-[#0F0F0F] border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0F0F0F]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                    KAYKAY
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[9px] font-mono font-bold text-[#D4AF37]">
                    GEMINI 3.7
                  </span>
                </div>
                <p className="text-[10px] text-white/50">
                  KK MARTECH Digital Strategist
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Direct Agency Quick Bar */}
          <div className="px-4 py-2 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between text-[10px] text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Instant Agency Support</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/918920880526"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:8005986330"
                className="flex items-center gap-1 text-white/80 hover:text-[#D4AF37]"
              >
                <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
                <span>8005986330</span>
              </a>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-normal">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#D4AF37] text-black font-medium rounded-tr-none'
                      : 'bg-[#1C1C1C] border border-white/10 text-white/90 rounded-tl-none'
                  }`}
                >
                  <div className="prose prose-invert prose-xs max-w-none text-inherit">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>

                {/* Suggested Action Chips for Bot messages */}
                {msg.sender === 'bot' && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(act.action)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#D4AF37] text-white/80 hover:text-black border border-white/10 hover:border-[#D4AF37] text-[10px] font-bold tracking-wider uppercase transition-all"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[9px] text-white/30 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl rounded-tl-none p-3 flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-[10px] text-white/50 font-mono">KayKay is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Suggestion Pills */}
          <div className="px-3 py-2 bg-[#0E0E0E] border-t border-white/5 overflow-x-auto scrollbar-none flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1 flex-shrink-0 pr-1">
              <Zap className="w-3 h-3 text-[#D4AF37]" />
              Quick:
            </span>
            {INITIAL_SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(suggestion)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white/70 hover:text-white whitespace-nowrap transition-colors flex-shrink-0 disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Bottom Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0F0F0F] border-t border-white/10 flex items-center gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask KayKay about services, pricing, SEO, AI..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/70 transition-colors"
            />
            <button
              id="kaykay-send-btn"
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-[#D4AF37] hover:bg-white text-black flex items-center justify-center transition-all disabled:opacity-40 disabled:hover:bg-[#D4AF37] shadow-md flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
