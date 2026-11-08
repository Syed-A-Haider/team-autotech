import { test, expect } from './fixtures';
import { OLD_URL_REDIRECTS } from '@/lib/redirects';

// Shop and account URLs stay a branded 404, never a redirect
const KEPT_404_PATHS = ['/shop', '/cart', '/my-account'];

const FIRST_REDIRECT = OLD_URL_REDIRECTS[0];

test.describe('Old WordPress URL redirects', { tag: '@redirects' }, () => {
  // Plain HTTP, so one browser is enough
  test.skip(({ browserName }) => browserName !== 'chromium', 'HTTP only');

  for (const { source, destination } of OLD_URL_REDIRECTS) {
    test(`${source} redirects to ${destination} in one hop`, async ({
      request,
    }) => {
      // Act
      const response = await request.get(source, { maxRedirects: 0 });

      // Assert
      expect(response.status()).toBe(308);
      const location = response.headers()['location'];
      expect(new URL(location, response.url()).pathname).toBe(destination);
    });

    test(`${source}/ ends on ${destination}`, async ({ request }) => {
      // Act
      const response = await request.get(`${source}/`);

      // Assert
      expect(response.status()).toBe(200);
      expect(new URL(response.url()).pathname).toBe(destination);
    });
  }

  test('Keeps the query string', async ({ request }) => {
    // Act
    const response = await request.get(
      `${FIRST_REDIRECT.source}?utm_source=gbp`,
    );

    // Assert
    const url = new URL(response.url());
    expect(url.pathname).toBe(FIRST_REDIRECT.destination);
    expect(url.search).toBe('?utm_source=gbp');
  });

  test('Matches an uppercase source', async ({ request }) => {
    // Act
    const response = await request.get(FIRST_REDIRECT.source.toUpperCase());

    // Assert
    expect(response.status()).toBe(200);
    expect(new URL(response.url()).pathname).toBe(FIRST_REDIRECT.destination);
  });

  for (const path of KEPT_404_PATHS) {
    test(`${path} stays a 404`, async ({ request }) => {
      // Act
      const response = await request.get(path, { maxRedirects: 0 });

      // Assert
      expect(response.status()).toBe(404);
    });
  }
});
