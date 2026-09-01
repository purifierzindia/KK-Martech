import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { EnquiryFormState } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormState>({
    name: '',
    company: '',
    phone: '',
    service: 'Web Design',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean enquiry dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleSendViaWhatsAppDirect = () => {
    const text = `Hello KK MARTECH! My name is ${formData.name || 'a client'}${
      formData.company ? ` from ${formData.company}` : ''
    }. I am inquiring about *${formData.service}*. Message: ${formData.message || 'I would like to discuss a project.'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918920880526?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            START A CONVERSATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            LET'S BUILD SOMETHING BETTER.
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            Have a business, project or idea that needs a stronger digital presence? <span className="text-white font-medium">Let's talk.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Direct Call & WhatsApp Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Call Card */}
            <div className="bg-[#141414] rounded-xl border border-white/10 p-6 sm:p-7 space-y-4 hover:border-[#D4AF37]/50 transition-colors shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
                  DIRECT LINE
                </span>
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Phone className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest block mb-1">
                  CALL
                </span>
                <a
                  href="tel:8005986330"
                  className="text-2xl sm:text-3xl font-heading font-bold text-white hover:text-[#D4AF37] transition-colors tracking-tight"
                >
                  8005986330
                </a>
              </div>

              <a
                id="contact-call-btn"
                href="tel:8005986330"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:border-[#D4AF37]/50 transition-all group"
              >
                <span>CALL NOW</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#141414] rounded-xl border border-white/10 p-6 sm:p-7 space-y-4 hover:border-[#25D366]/50 transition-colors shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
                  INSTANT CHAT
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                  <MessageSquare className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest block mb-1">
                  WHATSAPP
                </span>
                <a
                  href="https://wa.me/918920880526"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl sm:text-3xl font-heading font-bold text-white hover:text-[#25D366] transition-colors tracking-tight"
                >
                  8920880526
                </a>
              </div>

              <a
                id="contact-whatsapp-btn"
                href="https://wa.me/918920880526"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded bg-[#25D366] hover:bg-[#20BA5A] text-black text-[10px] font-bold uppercase tracking-widest transition-all shadow-md group"
              >
                <span>WHATSAPP US</span>
                <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Fast reassurance note */}
            <div className="p-4 rounded-lg bg-[#141414] border border-white/10 text-xs text-white/50 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>Prompt response within 2–4 hours during business hours.</span>
            </div>

          </div>

          {/* Right Column: Clean Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#141414] rounded-xl border border-white/10 p-7 sm:p-9 shadow-2xl relative">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed">
                    Your enquiry for <span className="text-[#D4AF37] font-semibold">{formData.service}</span> has been received. We will reach out to you on WhatsApp / Phone promptly.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleSendViaWhatsAppDirect}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-[#25D366] text-black text-[10px] font-bold uppercase tracking-widest"
                    >
                      <span>Also Open in WhatsApp</span>
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          company: '',
                          phone: '',
                          service: 'Web Design',
                          message: ''
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded bg-white/5 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-white/10"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="enquiry-form">
                  <div className="border-b border-white/10 pb-4 mb-2">
                    <h3 className="text-xl font-heading font-bold text-white">
                      Send An Enquiry
                    </h3>
                    <p className="text-xs text-white/50 mt-1">
                      Tell us about your project or requirement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/70" htmlFor="enquiry-name">
                        Your Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-[#0E0E0E] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    {/* Business / Company */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/70" htmlFor="enquiry-company">
                        Business / Company
                      </label>
                      <input
                        id="enquiry-company"
                        type="text"
                        placeholder="e.g. Nova Dental / Zenith Retail"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-[#0E0E0E] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/70" htmlFor="enquiry-phone">
                        Phone / WhatsApp <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-[#0E0E0E] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    {/* Service selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/70" htmlFor="enquiry-service">
                        What do you need?
                      </label>
                      <select
                        id="enquiry-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-[#0E0E0E] border border-white/10 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
                      >
                        <option value="Website Design">Website Design & Development</option>
                        <option value="Digital Marketing">Digital Marketing & Campaigns</option>
                        <option value="Social Media">Social Media Management & Reels</option>
                        <option value="SEO">SEO & Local Google Visibility</option>
                        <option value="AI Creatives">AI Creatives & Ad Assets</option>
                        <option value="Branding">Branding & Visual Identity</option>
                        <option value="Full Digital Package">Full Digital Growth Package</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/70" htmlFor="enquiry-message">
                      Message / Requirement Details
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      placeholder="Briefly describe your goals, timeline, or current challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-[#0E0E0E] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="enquiry-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded bg-[#D4AF37] hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <span>SEND ENQUIRY</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
