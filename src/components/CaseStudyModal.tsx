import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Target, 
  Lightbulb, 
  CheckCircle2, 
  Calendar, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CaseStudyModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onStartProject: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onStartProject
}) => {
  if (!project) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = project.images && project.images.length > 0
    ? project.images
    : [project.thumbnail];

  return (
    <div
      id="case-study-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="case-study-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#141414] rounded-xl border border-white/10 overflow-hidden shadow-2xl my-auto text-white"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 px-6 py-4 bg-[#141414]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white/5 text-[10px] font-bold text-[#D4AF37] border border-white/10 uppercase tracking-widest">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-white/50 uppercase">
              {project.isConceptOrDemo.replace('_', ' ')}
            </span>
          </div>

          <button
            id="close-case-study-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-10 space-y-10">
          
          {/* Title & Short Summary */}
          <div className="space-y-3">
            {project.clientIndustry && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                {project.clientIndustry}
              </span>
            )}
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>
          </div>

          {/* Main Visual Gallery Stage */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10">
              <img
                src={images[activeImageIndex]}
                alt={`${project.title} preview`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-24 h-16 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === i ? 'border-[#D4AF37] scale-102' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Structured Case Study Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Objective */}
            <div className="p-6 rounded-xl bg-[#1C1C1C] border border-white/10 space-y-2.5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                <Target className="w-4 h-4" />
                <span>OBJECTIVE</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {project.projectObjective}
              </p>
            </div>

            {/* Strategy */}
            <div className="p-6 rounded-xl bg-[#1C1C1C] border border-white/10 space-y-2.5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                <Layers className="w-4 h-4" />
                <span>STRATEGY</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {project.strategy || 'Structured cross-channel deployment focused on audience relevance and visual distinction.'}
              </p>
            </div>

            {/* Creative Execution */}
            <div className="p-6 rounded-xl bg-[#1C1C1C] border border-white/10 space-y-2.5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                <Lightbulb className="w-4 h-4" />
                <span>CREATIVE EXECUTION</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {project.creativeApproach}
              </p>
            </div>

            {/* Final Result */}
            <div className="p-6 rounded-xl bg-[#1C1C1C] border border-white/10 space-y-2.5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                <CheckCircle2 className="w-4 h-4" />
                <span>FINAL RESULT</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {project.finalResult}
              </p>
            </div>

          </div>

          {/* Tools & Meta Bar */}
          <div className="p-6 rounded-xl bg-[#101010] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 block mb-2">
                TOOLS & TECHNOLOGIES
              </span>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-medium text-white/80"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="px-6 py-3 rounded bg-[#D4AF37] hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md flex-shrink-0"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
