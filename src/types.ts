export type PortfolioCategory =
  | 'WEBSITES'
  | 'DIGITAL MARKETING'
  | 'SOCIAL MEDIA'
  | 'BRANDING'
  | 'AI CREATIVES'
  | 'CAMPAIGNS';

export type ProjectStatus = 'CONCEPT' | 'DEMO' | 'CLIENT' | 'AI_CREATIVE';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  thumbnail: string;
  images: string[];
  video?: string;
  shortDescription: string;
  projectObjective: string;
  strategy?: string;
  creativeApproach: string;
  finalResult: string;
  toolsUsed: string[];
  date: string;
  featured: boolean;
  published: boolean;
  isConceptOrDemo: ProjectStatus;
  clientIndustry?: string;
  liveUrl?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  order: number;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  gradient: string;
  showcaseVisual: string;
}

export interface EnquiryFormState {
  name: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}
