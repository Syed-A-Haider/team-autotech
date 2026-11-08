import type { MetadataRoute } from 'next';
import { getAllServices } from '@/lib/services';
import { serviceHref } from '@/lib/routes';
import { siteConfig } from '@/lib/constants';

// Built to /sitemap.xml at build time, and the build fails if it turns dynamic
export const dynamic = 'error';

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).href;
}

// Home, About and live services only. Coming-soon pages are noindex, and a
// noindex URL in a sitemap sends Google a conflicting signal. Entries carry no
// lastModified, changeFrequency or priority: there is no real date to give
// and Google ignores the other two.
export default function sitemap(): MetadataRoute.Sitemap {
  const liveServices = getAllServices().filter(
    (service) => service.status === 'live',
  );

  return [
    '/',
    '/about',
    ...liveServices.map((service) => serviceHref(service.slug)),
  ].map((path) => ({ url: absoluteUrl(path) }));
}
