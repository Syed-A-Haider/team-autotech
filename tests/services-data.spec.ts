import { test, expect } from './fixtures';
import { getAllServices } from '@/lib/services';

test.describe('Service pages', () => {
  for (const service of getAllServices()) {
    test(
      `${service.slug} renders with exactly one h1`,
      { tag: '@services' },
      async ({ servicePage }) => {
        const response = await servicePage.goto(service.slug);
        expect(response?.status()).toBe(200);
        await expect(servicePage.h1).toHaveCount(1);
      },
    );
  }

  test(
    'Unknown slug returns 404',
    { tag: '@smoke' },
    async ({ servicePage }) => {
      const response = await servicePage.goto('not-a-real-service');
      expect(response?.status()).toBe(404);
    },
  );

  test(
    'Navbar service link navigates to a service page',
    { tag: '@navigation' },
    async ({ homePage, page }) => {
      const href = await homePage.firstServiceLink.getAttribute('href');
      await homePage.firstServiceLink.click();
      await expect(page).toHaveURL(href!); // plain string, no regex
    },
  );
});
