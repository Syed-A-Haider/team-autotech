import { test, expect } from './fixtures';
import { getIndexablePaths } from './config/testData';
import { siteConfig } from '@/lib/constants';

const SITEMAP_PATH = '/sitemap.xml';
const ROBOTS_PATH = '/robots.txt';

const indexablePaths = getIndexablePaths();

test.describe('Sitemap and robots', { tag: '@indexing' }, () => {
  // Plain HTTP, so one browser is enough
  test.skip(({ browserName }) => browserName !== 'chromium', 'HTTP only');

  test('Serves /sitemap.xml as XML', async ({ request }) => {
    // Act
    const response = await request.get(SITEMAP_PATH);

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/xml');
  });

  test('Lists exactly the home page, About and the live services', async ({
    request,
  }) => {
    // Act
    const response = await request.get(SITEMAP_PATH);
    const body = await response.text();
    const locations = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1],
    );

    // Assert: the production origin, even when tested on localhost
    expect(locations).toEqual(
      indexablePaths.map((path) => `${siteConfig.url}${path}`),
    );
  });

  // A listed URL that redirects or 404s would waste Google's crawl
  for (const path of indexablePaths) {
    test(`${path} is served directly, with no redirect`, async ({
      request,
    }) => {
      // Act
      const response = await request.get(path, { maxRedirects: 0 });

      // Assert
      expect(response.status()).toBe(200);
    });
  }

  test('Serves /robots.txt as text that names the sitemap', async ({
    request,
  }) => {
    // Act
    const response = await request.get(ROBOTS_PATH);
    const body = await response.text();

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/plain');
    expect(body).toContain(`Sitemap: ${siteConfig.url}${SITEMAP_PATH}`);
  });
});
