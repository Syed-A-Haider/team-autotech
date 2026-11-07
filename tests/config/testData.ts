import { getAllServices } from '@/lib/services';

// Central home for literal test data with no single source of truth in the
// app itself (routes, viewport presets).
export const routes = {
  home: '/',
  about: '/about',
  homeServices: '/#services',
  servicesPrefix: '/services/',
  service: (slug: string) => `/services/${slug}`,
  unknownPage: '/this-page-does-not-exist',
} as const;

export const unknownServiceSlug = 'not-a-real-service';

// Every live page shape (prose and FAQ, video, steps only) plus a coming-soon one
export const motionServiceSlugs = [
  'stage-1-tuning',
  'ghost-immobiliser-ii',
  'scorpion-x-series-immobiliser',
  'dpf-egr-solutions',
] as const;

// Long page with a closing band and related services, far below the fold
export const revealCheckSlug = 'stage-1-tuning';

// First live service with an FAQ block, so the FAQ tests follow the data.
// A function, so a missing FAQ fails the FAQ tests only, not every spec
export function getFaqServiceSlug(): string {
  const service = getAllServices().find(
    (candidate) =>
      candidate.status === 'live' &&
      candidate.sections?.some((section) => section.type === 'faq'),
  );
  if (!service) throw new Error('No live service has an FAQ section');
  return service.slug;
}

export const pageTitle = 'Team AutoTech';

export const htmlLang = 'en';

// aria-labels and link text of the desktop Main nav
export const navLabels = {
  main: 'Main',
  about: 'About',
  services: 'Services',
} as const;

// Start of the header call button's text ("Get a Quote: <number>"). Also the
// mobile hero button, which has the same text
export const callButtonLabel = 'Get a Quote';

// aria-label of one footer social icon (the labels live in Footer.tsx)
export const footerSocialLabel = 'Facebook';

// The centre review card must never be narrower than this on desktop (T5.1, T5.7)
export const reviewCardMinWidth = 896;

export const viewports = {
  mobile: { width: 375, height: 812 },
  desktop: { width: 1280, height: 800 },
} as const;
