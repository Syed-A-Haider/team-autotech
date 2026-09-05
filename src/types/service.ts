// Shared types for service data across website

import { LucideIcon } from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  category: Category;
  shortDescription: string; // Used on ServiceCard
  body: string;
  icon: LucideIcon;
  popular?: boolean; // Highlights this service on cards
  sections?: ServiceSection[];
  status?: ServiceStatus; // Undefined = coming soon
  heroImage?: string; // Overrides CategoryTheme.heroImage if defined
}

// Category can be one of these
// When adding a new category, add it's title here.
export type Category =
  'Remap / Tuning' | 'Programming' | 'Auto Security' | 'Auto Electrical';

// Dictionary between service categories and services
export type ServiceCategories = Record<string, Service[]>;

// Content Model
export type ServiceStatus = 'live' | 'coming-soon';

export interface Feature {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Discriminated Union - each service page composed from lots of these blocks
// Rather then declaring shapes - define type
export type ServiceSection =
  | { type: 'prose'; title?: string; body: string[] }
  | {
      type: 'feature';
      title?: string;
      layout: 'grid' | 'alternating' | 'list';
      features: Feature[];
    }
  | { type: 'steps'; title?: string; steps: Step[] }
  | { type: 'specband'; title?: string; specs: Spec[] }
  | { type: 'faq'; title?: string; items: FaqItem[] }
  | {
      type: 'video';
      title: string;
      videoId: string;
      posterImage: string;
      caption?: string;
    };
