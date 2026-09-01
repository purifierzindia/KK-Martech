import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioCategory, PortfolioItem } from '../types';
import { ArrowUpRight, Plus, Sparkles, LayoutGrid, Eye } from 'lucide-react';

export const OurWork: React.FC = () => {
  const {
    projects,
    activeFilter,
    setActiveFilter,
    setSelectedProject,
    setIsCmsOpen
  } = usePortfolio();

  const categories: (string | PortfolioCategory)[] = [
    'ALL',
    'WEBSITES',
    'DIGITAL MARKETING',
    'SOCIAL MEDIA',
    'BRANDING',
    'AI CREATIVES',
    'CAMPAIGNS'
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const getStatusBadge = (status: PortfolioItem['isConceptOrDemo']) => {
    switch (status) {
      case 'CONCEPT':
        return (
          <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#E5C158] border border-[#D4AF37]/30 uppercase tracking-wider">
            CONCEPT PROJECT
          </span>
        );
      case 'DEMO':
        return (
          <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#E2E8F0] border border-[#475569] uppercase tracking-wider">
            DEMO PROJECT
          </span>
        );
      case 'AI_CREATIVE':
        return (
          <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/40 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            AI CREATIVE
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#4ADE80] border border-[#16A34A]/40 uppercase tracking-wider">
            CLIENT WORK
          </span>
        );
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              FEATURED PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
              OUR WORK
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base md:text-lg text-white font-medium leading-snug">
              Ideas are easy to talk about.
            </p>
            <p className="text-sm md:text-base text-white/50 font-normal">
              We prefer to show what we can create.
            </p>
          </div>
        </div>

        {/* Filter Bar with CMS Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  id={`portfolio-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? 'bg-[#D4AF37] text-black shadow-md'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* CMS Fast Action */}
          <button
            onClick={() => setIsCmsOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-[#D4AF37] border border-white/10 transition-all hover:border-[#D4AF37]/40"
          >
            <Plus className="w-3 h-3 text-[#D4AF37]" />
            <span>Add / Manage Projects</span>
          </button>
        </div>

        {/* Portfolio Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-[#141414] rounded-xl border border-white/10">
            <p className="text-white/40 text-sm mb-4">No projects found in this category.</p>
            <button
              onClick={() => setIsCmsOpen(true)}
              className="px-6 py-2 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Add First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="group bg-[#141414] rounded-xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl cursor-pointer"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#0A0A0A]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

                  {/* Top Status & Category Badge */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    {getStatusBadge(project.isConceptOrDemo)}
                    <span className="px-2.5 py-1 rounded bg-black/90 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      View Case Study
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    {project.clientIndustry && (
                      <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5 block">
                        {project.clientIndustry}
                      </span>
                    )}
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug mb-2.5">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 line-clamp-2 leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Footer Tools & Action */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 max-w-[75%]">
                      {project.toolsUsed.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-medium text-white/60 border border-white/10"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.toolsUsed.length > 3 && (
                        <span className="text-[9px] text-white/40 self-center">
                          +{project.toolsUsed.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#D4AF37] text-white/60 group-hover:text-black flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
