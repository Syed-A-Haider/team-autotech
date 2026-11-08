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

// Paths the sitemap must list: home, About and every live service. A function,
// so the list follows the data as each content batch goes live (T6.7 to T6.12)
export function getIndexablePaths(): string[] {
  const livePaths = getAllServices()
    .filter((service) => service.status === 'live')
    .map((service) => routes.service(service.slug));
  return [routes.home, routes.about, ...livePaths];
}

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

// Title of a service's first section of this type, so the block tests follow
// the data. A function, so a missing block fails its own test only
export function getSectionTitle(
  slug: string,
  type: 'feature' | 'steps' | 'video' | 'prose',
): string {
  const section = getAllServices()
    .find((service) => service.slug === slug)
    ?.sections?.find((candidate) => candidate.type === type);
  if (!section?.title) throw new Error(`${slug} has no titled ${type} section`);
  return section.title;
}

// One live page per block under test (T5.10)
export const featureGridSlug = 'stage-1-tuning';
export const stepsSlug = 'scorpion-x-series-immobiliser';
export const videoSlug = 'ghost-immobiliser-ii';
export const comingSoonSlug = 'dpf-egr-solutions';

export const pageTitle = 'Team AutoTech';

export const htmlLang = 'en';

// aria-labels and link text of the desktop Main nav
export const navLabels = {
  main: 'Main',
  about: 'About',
  services: 'Services',
  // The menu panel that opens below lg (MobileMenu)
  mobile: 'Mobile',
} as const;

// Start of the header call button's text ("Get a Quote: <number>"). Also the
// mobile hero button, which has the same text
export const callButtonLabel = 'Get a Quote';

// aria-label of one footer social icon (the labels live in Footer.tsx)
export const footerSocialLabel = 'Facebook';

// The centre review card must never be narrower than this on desktop (T5.1, T5.7)
export const reviewCardMinWidth = 896;

// The button under the reviews carousel (the label lives in ReviewsSection.tsx)
export const googleReviewsLinkLabel = 'See all our reviews on Google';

export const viewports = {
  mobile: { width: 375, height: 812 },
  desktop: { width: 1280, height: 800 },
} as const;

// Between phone and lg (1024): the narrowest the side cards sit on the ramp's
// edge, and no tilt yet. Not in `viewports`, so the page-wide loops stay as they are
export const tabletViewport = { width: 768, height: 900 } as const;

// The first lg width: side slides have the least room here (T5.9)
export const lgViewport = { width: 1024, height: 800 } as const;
