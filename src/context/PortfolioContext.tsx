import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem, PortfolioCategory } from '../types';
import { INITIAL_PORTFOLIO } from '../data/initialPortfolio';

interface PortfolioContextType {
  projects: PortfolioItem[];
  allProjects: PortfolioItem[]; // includes drafts for CMS
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  selectedProject: PortfolioItem | null;
  setSelectedProject: (project: PortfolioItem | null) => void;
  isCmsOpen: boolean;
  setIsCmsOpen: (open: boolean) => void;
  
  // CMS CRUD actions
  addProject: (project: Omit<PortfolioItem, 'id' | 'order'>) => void;
  updateProject: (id: string, updated: Partial<PortfolioItem>) => void;
  deleteProject: (id: string) => void;
  togglePublished: (id: string) => void;
  toggleFeatured: (id: string) => void;
  moveProject: (id: string, direction: 'up' | 'down') => void;
  resetToDefaults: () => void;
  exportPortfolioJson: () => string;
  importPortfolioJson: (jsonData: string) => boolean;
}

const STORAGE_KEY = 'kk_martech_portfolio_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load portfolio from localStorage', e);
    }
    return INITIAL_PORTFOLIO;
  });

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist portfolio state', e);
    }
  }, [projects]);

  const addProject = (item: Omit<PortfolioItem, 'id' | 'order'>) => {
    const newId = `project-${Date.now()}`;
    const newProject: PortfolioItem = {
      ...item,
      id: newId,
      order: projects.length + 1
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<PortfolioItem>) => {
    setProjects(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(prev => (prev ? { ...prev, ...updated } : null));
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(null);
    }
  };

  const togglePublished = (id: string) => {
    setProjects(prev =>
      prev.map(item => (item.id === id ? { ...item, published: !item.published } : item))
    );
  };

  const toggleFeatured = (id: string) => {
    setProjects(prev =>
      prev.map(item => (item.id === id ? { ...item, featured: !item.featured } : item))
    );
  };

  const moveProject = (id: string, direction: 'up' | 'down') => {
    setProjects(prev => {
      const index = prev.findIndex(p => p.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const resetToDefaults = () => {
    setProjects(INITIAL_PORTFOLIO);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportPortfolioJson = () => {
    return JSON.stringify(projects, null, 2);
  };

  const importPortfolioJson = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProjects(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON', e);
    }
    return false;
  };

  // Filter only published projects for public display
  const publishedProjects = projects.filter(p => p.published);

  return (
    <PortfolioContext.Provider
      value={{
        projects: publishedProjects,
        allProjects: projects,
        activeFilter,
        setActiveFilter,
        selectedProject,
        setSelectedProject,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
