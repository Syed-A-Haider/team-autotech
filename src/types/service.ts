// Shared types for service data across website

export interface Service {
  slug: string;
  title: string;
  category: Category;
  shortDescription: string; // Used on ServiceCard
  body: string; // placeholder or real content
}

// Category can be one of these
// When adding a new category, add it's title here.
export type Category =
  | 'Remap / Tuning'
  | 'Programming'
  | 'Auto Security'
  | 'Auto Electrical Services';
