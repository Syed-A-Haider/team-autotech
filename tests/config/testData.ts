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

export const pageTitle = 'Team AutoTech';

// aria-labels and link text of the desktop Main nav
export const navLabels = { main: 'Main', about: 'About' } as const;

export const viewports = {
  mobile: { width: 375, height: 812 },
  desktop: { width: 1280, height: 800 },
} as const;
