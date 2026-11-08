import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config';
import { OLD_URL_REDIRECTS } from './redirects';
import { serviceHref } from './routes';
import { getAllServices } from './services';

const SOURCE_PATTERN = /^\/[a-z0-9-]+(\/[a-z0-9-]+)*$/;

// Confirmed from the content briefs
const CONFIRMED_SOURCES = [
  '/stage-1-tuning',
  '/ghost-immobiliser-ii',
  '/scorpion-x-series-immobiliser',
];

// Paths that must stay a branded 404 (shop and account)
const KEPT_404_PREFIXES = [
  '/shop',
  '/product',
  '/product-category',
  '/basket',
  '/cart',
  '/checkout',
  '/my-account',
];

// Served outside the app folder
const RESERVED_SEGMENTS = [
  '_next',
  'api',
  'favicon.ico',
  'sitemap.xml',
  'robots.txt',
];

function firstSegment(source: string): string {
  return source.split('/')[1];
}

// Top-level folders that serve a URL (not route groups, private, dynamic or slots).
// Files cannot clash: a source has no dot
function topLevelFolders(dir: string): string[] {
  const root = path.join(process.cwd(), dir);
  return readdirSync(root).filter(
    (name) =>
      !/^[(_[@]/.test(name) && statSync(path.join(root, name)).isDirectory(),
  );
}

const sources = OLD_URL_REDIRECTS.map((redirect) => redirect.source);
const serviceSlugs = getAllServices().map((service) => service.slug);

describe('OLD_URL_REDIRECTS', () => {
  it('Includes the three confirmed old URLs', () => {
    CONFIRMED_SOURCES.forEach((source) => {
      expect(sources).toContain(source);
    });
  });

  it('Has a root-slug redirect for every service', () => {
    serviceSlugs.forEach((slug) => {
      expect(OLD_URL_REDIRECTS).toContainEqual({
        source: `/${slug}`,
        destination: serviceHref(slug),
      });
    });
  });

  it('Every source is lowercase with no trailing slash or params', () => {
    sources.forEach((source) => {
      expect(source).toMatch(SOURCE_PATTERN);
    });
  });

  it('Has no duplicate sources, ignoring case', () => {
    const lower = sources.map((source) => source.toLowerCase());
    expect(new Set(lower).size).toBe(lower.length);
  });

  it('Every destination is home, about or an existing service page', () => {
    const allowed = ['/', '/about', ...serviceSlugs.map(serviceHref)];
    OLD_URL_REDIRECTS.forEach(({ destination }) => {
      expect(allowed).toContain(destination);
    });
  });

  it('No destination is also a source, so there are no chains', () => {
    OLD_URL_REDIRECTS.forEach(({ destination }) => {
      expect(sources).not.toContain(destination);
    });
  });

  it('No source shadows a real route or a public file', () => {
    const real = [
      ...topLevelFolders('src/app'),
      ...topLevelFolders('public'),
      ...RESERVED_SEGMENTS,
    ];
    sources.forEach((source) => {
      expect(source).not.toBe('/');
      expect(real).not.toContain(firstSegment(source));
    });
  });

  it('No source is a shop or account path', () => {
    sources.forEach((source) => {
      KEPT_404_PREFIXES.forEach((prefix) => {
        expect(source === prefix || source.startsWith(`${prefix}/`)).toBe(
          false,
        );
      });
    });
  });
});

describe('next.config redirects', () => {
  it('Returns every entry as a permanent redirect', async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      OLD_URL_REDIRECTS.map((redirect) => ({ ...redirect, permanent: true })),
    );
  });
});
