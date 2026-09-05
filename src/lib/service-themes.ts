import type { Category } from '@/types/service';

// Per-category identity for the heroes
// Single accent colour throughout
interface CategoryTheme {
  eyebrow: string;
  heroImage: string;
  overlayClassName: string;
  motifClassName: string;
}

const SCRIM =
  'bg-gradient-to-t from-background via-background/70 to-transparent';

export const CATEGORY_THEMES = {
  'Remap / Tuning': {
    eyebrow: 'Performance Tuning',
    heroImage: '/images/services/tuning.jpg',
    overlayClassName: SCRIM,
    motifClassName:
      'bg-[linear-gradient(115deg,transparent_40%,color-mix(in_srgb,var(--color-accent)_12%,transparent)_50%,transparent_60%)]',
  },
  Programming: {
    eyebrow: 'ECU Programming',
    heroImage: '/images/services/programming.jpg',
    overlayClassName: SCRIM,
    motifClassName:
      'bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_23px,color-mix(in_srgb,var(--color-border)_80%,transparent)_24px)]',
  },
  'Auto Security': {
    eyebrow: 'Auto Security',
    heroImage: '/images/services/security.jpg',
    overlayClassName: SCRIM,
    motifClassName:
      'bg-[radial-gradient(circle_at_70%_35%,transparent_30%,color-mix(in_srgb,var(--color-background)_50%,transparent)_75%)]',
  },
  'Auto Electrical': {
    eyebrow: 'Auto Electrical',
    heroImage: '/images/services/electrical.jpg',
    overlayClassName: SCRIM,
    motifClassName:
      'bg-[repeating-linear-gradient(180deg,transparent_0px,transparent_5px,color-mix(in_srgb,var(--color-foreground)_5%,transparent)_6px)]',
  },
} satisfies Record<Category, CategoryTheme>;
