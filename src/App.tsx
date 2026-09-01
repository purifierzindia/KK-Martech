import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { OurWork } from './components/OurWork';
import { CreativeShowcase } from './components/CreativeShowcase';
import { WhyKKMartech } from './components/WhyKKMartech';
import { OurApproach } from './components/OurApproach';
import { AiMarketing } from './components/AiMarketing';
import { Capabilities } from './components/Capabilities';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CmsManagerModal } from './components/CmsManagerModal';
import { QuickWhatsAppButton } from './components/QuickWhatsAppButton';
import { KayKayChatbot } from './components/KayKayChatbot';

const MainAgencyContent: React.FC = () => {
  const { selectedProject, setSelectedProject, setActiveFilter } = usePortfolio();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectServiceFilter = (category: string) => {
    setActiveFilter(category);
    handleNavigate('work');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#D4AF37] selection:text-black flex flex-col font-sans">
      {/* Sticky Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* 2. Services Section */}
        <Services onSelectCategoryFilter={handleSelectServiceFilter} />

        {/* 3. Our Work Portfolio Grid */}
        <OurWork />

        {/* 4. Creative Visual Showcase Reel */}
        <CreativeShowcase />

        {/* 5. Why KK MARTECH */}
        <WhyKKMartech />

        {/* 6. Our Approach (4-Step Timeline) */}
        <OurApproach />

        {/* 7. AI + Marketing Pipeline */}
        <AiMarketing />

        {/* 8. Professional Capabilities Grid */}
        <Capabilities />

        {/* 9. About KK MARTECH */}
        <About />

        {/* 10. Contact Section */}
        <Contact />

        {/* 11. Final High-Impact CTA */}
        <FinalCTA onNavigate={handleNavigate} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={() => {
          setSelectedProject(null);
          handleNavigate('contact');
        }}
      />

      {/* Portfolio CMS Management Modal */}
      <CmsManagerModal />

      {/* Floating Instant WhatsApp Button */}
      <QuickWhatsAppButton />

      {/* Floating Gemini AI Chatbot "KayKay" */}
      <KayKayChatbot onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainAgencyContent />
    </PortfolioProvider>
  );
}
