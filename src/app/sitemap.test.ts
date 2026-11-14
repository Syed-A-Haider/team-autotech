import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect, vi } from 'vitest';
import { Wrench } from 'lucide-react';
import sitemap from './sitemap';
import { getAllServices } from '@/lib/services';
import { serviceHref } from '@/lib/routes';
import { siteConfig } from '@/lib/constants';
import type { Service } from '@/types/service';

// Keeps the real getters, so a test can swap in a fixture for one call
vi.mock('@/lib/services', { spy: true });

function makeService(slug: string, status?: Service['status']): Service {
  return {
    slug,
    title: slug,
    category: 'Programming',
    shortDescription: 'Fixture',
    icon: Wrench,
    status,
  };
}

const HOME_URL = `${siteConfig.url}/`;
const ABOUT_URL = `${siteConfig.url}/about`;

function urlOf(slug: string): string {
  return `${siteConfig.url}${serviceHref(slug)}`;
}

describe('sitemap', () => {
  it('Lists the home page then About first', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls.slice(0, 2)).toEqual([HOME_URL, ABOUT_URL]);
  });

  it('Includes every live service', () => {
    const urls = sitemap().map((entry) => entry.url);
    const live = getAllServices().filter((s) => s.status === 'live');

    expect(live.length).toBeGreaterThan(0);
    for (const service of live) {
      expect(urls).toContain(urlOf(service.slug));
    }
  });

  it('Lists only live services, never coming-soon or unset ones', () => {
    vi.mocked(getAllServices).mockReturnValueOnce([
      makeService('live-one', 'live'),
      makeService('soon-one', 'coming-soon'),
      makeService('unset-one'),
    ]);

    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual([HOME_URL, ABOUT_URL, urlOf('live-one')]);
  });

  it('Uses absolute URLs on the site origin, no trailing slash except home', () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const url of urls) {
      expect(url.startsWith(`${siteConfig.url}/`)).toBe(true);
    }
    expect(urls.filter((url) => url.endsWith('/'))).toEqual([HOME_URL]);
  });

  it('Has no duplicate URLs', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
  });

  it('Gives each entry a URL only, no invented dates or priorities', () => {
    for (const entry of sitemap()) {
      expect(Object.keys(entry)).toEqual(['url']);
    }
  });
});

// Services join the sitemap through their status, but every other page is
// listed by hand in sitemap.ts. This fails when a new page.tsx is not listed,
// so a new route cannot go live and stay invisible to Google.
const APP_DIR = join(process.cwd(), 'src', 'app');
// The only dynamic route: one page per live service, listed from the data
const SERVICE_ROUTE = 'services/[slug]';

// "about/page.tsx" gives "about", the root "page.tsx" gives ""
function folderOf(pageFile: string): string {
  return pageFile.replace(/\\/g, '/').replace(/\/?page\.tsx$/, '');
}

function pageFolders(): string[] {
  return (readdirSync(APP_DIR, { recursive: true }) as string[])
    .filter((file) => /(^|[\\/])page\.tsx$/.test(file))
    .map(folderOf);
}

describe('sitemap covers every page', () => {
  it('Finds the pages it checks', () => {
    expect(pageFolders()).toEqual(expect.arrayContaining(['', 'about']));
  });

  it('Lists every static page.tsx route', () => {
    const urls = sitemap().map((entry) => entry.url);
    const staticFolders = pageFolders().filter((f) => !f.includes('['));

    for (const folder of staticFolders) {
      expect(urls, `/${folder} is missing from sitemap.ts`).toContain(
        `${siteConfig.url}/${folder}`,
      );
    }
  });

  it('Has no dynamic route other than the service pages', () => {
    const dynamicFolders = pageFolders().filter((f) => f.includes('['));

    expect(
      dynamicFolders.filter((folder) => folder !== SERVICE_ROUTE),
      'a new dynamic route needs its own source in sitemap.ts',
    ).toEqual([]);
  });
});
