// Shared types for service data across website

import { LucideIcon } from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  category: Category;
  shortDescription: string; // Used on ServiceCard
  body: string; // Placeholder or real content
  icon: LucideIcon;
  popular?: boolean; // Highlights this service on cards
}

// Category can be one of these
// When adding a new category, add it's title here.
export type Category =
  | 'Remap / Tuning'
  | 'Programming'
  | 'Auto Security'
  | 'Auto Electrical Services';

// Dictionary between service categories and services
export type ServiceCategories = Record<string, Service[]>;
