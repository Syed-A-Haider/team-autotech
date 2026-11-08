import { describe, it, expect } from 'vitest';
import robots from './robots';
import { siteConfig } from '@/lib/constants';

describe('robots', () => {
  it('Allows every crawler to crawl the whole site', () => {
    expect(robots().rules).toEqual({ userAgent: '*', allow: '/' });
  });

  it('Disallows nothing, so noindex pages stay crawlable', () => {
    expect(JSON.stringify(robots().rules)).not.toContain('disallow');
  });

  it('Points to the sitemap with an absolute URL on the site origin', () => {
    expect(robots().sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});
