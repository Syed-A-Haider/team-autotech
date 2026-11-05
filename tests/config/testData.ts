import { getAllServices } from '@/lib/services';

// Central home for literal test data with no single source of truth in the
// app itself (routes, viewport presets).
export const routes = {
  home: '/',
  about: '/about',
  servicesPrefix: '/services/',
  service: (slug: string) => `/services/${slug}`,
  unknownPage: '/this-page-does-not-exist',
} as const;

export const unknownServiceSlug = 'not-a-real-service';

// One live and one coming-soon service, so both page shapes are covered
export const motionServiceSlugs = [
  'stage-1-tuning',
  'dpf-egr-solutions',
] as const;

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
export const navLabels = { main: 'Main', about: 'About' } as const;

export const viewports = {
  mobile: { width: 375, height: 812 },
  desktop: { width: 1280, height: 800 },
} as const;
