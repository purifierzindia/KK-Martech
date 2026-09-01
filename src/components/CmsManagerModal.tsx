import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioItem, PortfolioCategory, ProjectStatus } from '../types';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Sliders 
} from 'lucide-react';

export const CmsManagerModal: React.FC = () => {
  const {
    allProjects,
    isCmsOpen,
    setIsCmsOpen,
    addProject,
    updateProject,
    deleteProject,
    togglePublished,
    toggleFeatured,
    moveProject,
    resetToDefaults,
    exportPortfolioJson,
    importPortfolioJson
  } = usePortfolio();

  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<PortfolioItem, 'id' | 'order'>>({
    title: '',
    category: 'WEBSITES',
    thumbnail: '',
    images: [],
    video: '',
    shortDescription: '',
    projectObjective: '',
    strategy: '',
    creativeApproach: '',
    finalResult: '',
    toolsUsed: ['Figma', 'React'],
    date: '2026',
    featured: false,
    published: true,
    isConceptOrDemo: 'CONCEPT',
    clientIndustry: '',
    aspectRatio: 'landscape'
  });

  const [toolsInput, setToolsInput] = useState('Figma, React');
  const [imagesInput, setImagesInput] = useState('');

  if (!isCmsOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStartAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'WEBSITES',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85'],
      video: '',
      shortDescription: '',
      projectObjective: '',
      strategy: '',
      creativeApproach: '',
      finalResult: '',
      toolsUsed: ['Figma', 'Tailwind CSS'],
      date: '2026',
      featured: true,
      published: true,
      isConceptOrDemo: 'CONCEPT',
      clientIndustry: '',
      aspectRatio: 'landscape'
    });
    setToolsInput('Figma, Tailwind CSS');
    setImagesInput('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85');
    setIsAddingNew(true);
  };

  const handleStartEdit = (project: PortfolioItem) => {
    setIsAddingNew(false);
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      thumbnail: project.thumbnail,
      images: project.images || [project.thumbnail],
      video: project.video || '',
      shortDescription: project.shortDescription,
      projectObjective: project.projectObjective,
      strategy: project.strategy || '',
      creativeApproach: project.creativeApproach,
      finalResult: project.finalResult,
      toolsUsed: project.toolsUsed,
      date: project.date,
      featured: project.featured,
      published: project.published,
      isConceptOrDemo: project.isConceptOrDemo,
      clientIndustry: project.clientIndustry || '',
      aspectRatio: project.aspectRatio || 'landscape'
    });
    setToolsInput(project.toolsUsed.join(', '));
    setImagesInput((project.images || [project.thumbnail]).join(', '));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const tools = toolsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    const imagesList = imagesInput
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      toolsUsed: tools.length > 0 ? tools : ['Digital'],
      images: imagesList.length > 0 ? imagesList : [formData.thumbnail]
    };

    if (isAddingNew) {
      addProject(payload);
      showNotification('Project added to portfolio!');
      setIsAddingNew(false);
    } else if (editingProject) {
      updateProject(editingProject.id, payload);
      showNotification('Project updated successfully!');
      setEditingProject(null);
    }
  };

  const handleExport = () => {
    const json = exportPortfolioJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kk-martech-portfolio-${Date.now()}.json`;
    a.click();
    showNotification('Portfolio exported as JSON');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importPortfolioJson(importJsonText);
    if (success) {
      showNotification('Portfolio imported successfully!');
      setShowImportBox(false);
      setImportJsonText('');
    } else {
      alert('Invalid JSON format. Please verify your file content.');
    }
  };

  return (
    <div
      id="cms-modal-backdrop"
      onClick={() => setIsCmsOpen(false)}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        id="cms-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl bg-[#141414] rounded-xl border border-white/10 overflow-hidden shadow-2xl my-auto text-white max-h-[90vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#141414] border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D4AF37] text-black flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2">
                Portfolio CMS Studio
              </h2>
              <p className="text-xs text-white/50">
                Add, edit, reorder, and publish marketing & creative projects.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCmsOpen(false)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification pill */}
        {notification && (
          <div className="bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 flex items-center justify-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <button
                id="cms-add-new-btn"
                onClick={handleStartAdd}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#D4AF37] hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>

              <button
                onClick={() => setShowImportBox(!showImportBox)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-white/5 text-xs font-semibold text-white/80 hover:text-white border border-white/10"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
              </button>

              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-white/5 text-xs font-semibold text-white/80 hover:text-white border border-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Backup</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (confirm('Reset portfolio to initial curated projects?')) {
                  resetToDefaults();
                  showNotification('Reset to defaults complete');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Import JSON Box */}
          {showImportBox && (
            <div className="p-4 rounded bg-[#1A1A1A] border border-white/10 space-y-3">
              <label className="text-xs font-semibold text-white block">
                Paste Portfolio JSON to Import:
              </label>
              <textarea
                rows={3}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder="[ { ... } ]"
                className="w-full p-3 rounded bg-[#0E0E0E] border border-white/10 text-xs font-mono text-white/90"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowImportBox(false)}
                  className="px-3 py-1.5 rounded text-xs text-white/50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-1.5 rounded bg-[#D4AF37] text-black text-xs font-bold"
                >
                  Confirm Import
                </button>
              </div>
            </div>
          )}

          {/* Editor Form (If Adding or Editing) */}
          {(isAddingNew || editingProject) && (
            <div className="p-6 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{isAddingNew ? 'Add New Project' : `Editing: ${editingProject?.title}`}</span>
                </h3>
                <button
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingProject(null);
                  }}
                  className="text-xs text-white/50 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white"
                      placeholder="e.g. Aura Architecture Website"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as PortfolioCategory })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white"
                    >
                      <option value="WEBSITES">WEBSITES</option>
                      <option value="DIGITAL MARKETING">DIGITAL MARKETING</option>
                      <option value="SOCIAL MEDIA">SOCIAL MEDIA</option>
                      <option value="BRANDING">BRANDING</option>
                      <option value="AI CREATIVES">AI CREATIVES</option>
                      <option value="CAMPAIGNS">CAMPAIGNS</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Industry */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Client / Industry</label>
                    <input
                      type="text"
                      value={formData.clientIndustry}
                      onChange={(e) => setFormData({ ...formData, clientIndustry: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white"
                      placeholder="e.g. Retail, Clinics, Fashion"
                    />
                  </div>

                  {/* Status label */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Project Label</label>
                    <select
                      value={formData.isConceptOrDemo}
                      onChange={(e) => setFormData({ ...formData, isConceptOrDemo: e.target.value as ProjectStatus })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white"
                    >
                      <option value="CONCEPT">CONCEPT PROJECT</option>
                      <option value="DEMO">DEMO PROJECT</option>
                      <option value="AI_CREATIVE">AI CREATIVE</option>
                      <option value="CLIENT">CLIENT WORK</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Year / Date</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white"
                      placeholder="2026"
                    />
                  </div>
                </div>

                {/* Thumbnail & Gallery Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Thumbnail Image URL *</label>
                    <input
                      type="url"
                      required
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Additional Images (Comma separated URLs)</label>
                    <input
                      type="text"
                      value={imagesInput}
                      onChange={(e) => setImagesInput(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white"
                      placeholder="https://image1.jpg, https://image2.jpg"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/80">Short Summary / Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white resize-none"
                    placeholder="Concise overview visible in cards..."
                  />
                </div>

                {/* Case Study Detailed Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Project Objective</label>
                    <textarea
                      rows={2}
                      value={formData.projectObjective}
                      onChange={(e) => setFormData({ ...formData, projectObjective: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white resize-none"
                      placeholder="Goals and client objectives..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Strategy</label>
                    <textarea
                      rows={2}
                      value={formData.strategy}
                      onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white resize-none"
                      placeholder="Strategic roadmap and audience angle..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Creative Execution</label>
                    <textarea
                      rows={2}
                      value={formData.creativeApproach}
                      onChange={(e) => setFormData({ ...formData, creativeApproach: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white resize-none"
                      placeholder="Design choices, aesthetics, motion..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/80">Final Result</label>
                    <textarea
                      rows={2}
                      value={formData.finalResult}
                      onChange={(e) => setFormData({ ...formData, finalResult: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white resize-none"
                      placeholder="Commercial outcome or deliverable..."
                    />
                  </div>
                </div>

                {/* Tools used & Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-xs font-semibold text-white/80">Tools Used (Comma separated)</label>
                    <input
                      type="text"
                      value={toolsInput}
                      onChange={(e) => setToolsInput(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#0E0E0E] border border-white/10 text-xs text-white"
                      placeholder="Figma, React, Midjourney"
                    />
                  </div>

                  <div className="flex items-center gap-6 sm:col-span-2 pt-4">
                    <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded bg-[#1A1A1A] border-white/20 text-[#D4AF37] focus:ring-0"
                      />
                      <span>Feature on Homepage Hero</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="rounded bg-[#1A1A1A] border-white/20 text-[#D4AF37] focus:ring-0"
                      />
                      <span>Published (Live)</span>
                    </label>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingProject(null);
                    }}
                    className="px-4 py-2 rounded text-xs text-white/60 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#D4AF37] hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Project List Table */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              All Projects ({allProjects.length})
            </h3>

            <div className="space-y-2">
              {allProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    p.published ? 'bg-[#1C1C1C] border-white/10' : 'bg-[#141414] border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-10 object-cover rounded bg-black flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white">{p.title}</h4>
                        {p.featured && (
                          <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold">
                            FEATURED
                          </span>
                        )}
                        {!p.published && (
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-[9px] font-bold">
                            DRAFT
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-white/40">
                        {p.category} • {p.isConceptOrDemo}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      onClick={() => moveProject(p.id, 'up')}
                      disabled={idx === 0}
                      title="Move Up"
                      className="p-1.5 rounded bg-white/5 text-white/70 hover:text-white disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveProject(p.id, 'down')}
                      disabled={idx === allProjects.length - 1}
                      title="Move Down"
                      className="p-1.5 rounded bg-white/5 text-white/70 hover:text-white disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleFeatured(p.id)}
                      title={p.featured ? 'Unfeature' : 'Feature'}
                      className={`p-1.5 rounded border ${
                        p.featured ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40' : 'bg-white/5 text-white/40 border-transparent'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => togglePublished(p.id)}
                      title={p.published ? 'Unpublish' : 'Publish'}
                      className={`p-1.5 rounded border ${
                        p.published ? 'bg-white/5 text-[#4ADE80] border-transparent' : 'bg-white/5 text-white/40 border-transparent'
                      }`}
                    >
                      {p.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleStartEdit(p)}
                      title="Edit Project"
                      className="p-1.5 rounded bg-white/5 text-white/70 hover:text-[#D4AF37]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${p.title}"?`)) {
                          deleteProject(p.id);
                          showNotification('Project deleted');
                        }
                      }}
                      title="Delete Project"
                      className="p-1.5 rounded bg-white/5 text-[#EF4444] hover:bg-[#EF4444]/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#141414] border-t border-white/10 flex items-center justify-between text-xs text-white/40 flex-shrink-0">
          <span>All updates take effect immediately on live portfolio.</span>
          <button
            onClick={() => setIsCmsOpen(false)}
            className="px-4 py-1.5 rounded bg-white/10 text-white hover:bg-white/20"
          >
            Close CMS
          </button>
        </div>
      </div>
    </div>
  );
};
