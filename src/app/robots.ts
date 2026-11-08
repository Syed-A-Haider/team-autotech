import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

// Built to /robots.txt at build time, and the build fails if it turns dynamic
export const dynamic = 'error';

// Nothing on the site is private, so nothing is disallowed. Blocking /_next
// would stop Google loading the CSS and JS it needs to render pages, and a
// disallowed page would hide its noindex tag from Google.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', siteConfig.url).href,
  };
}
