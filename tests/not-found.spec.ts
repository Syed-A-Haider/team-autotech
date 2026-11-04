import { test, expect } from './fixtures';
import { pageTitle, routes, unknownServiceSlug } from './config/testData';
import { NOT_FOUND_TITLE } from '@/app/not-found';

test.describe('Not found page', { tag: '@notfound' }, () => {
  test(
    'Unknown path returns 404 with one h1 and noindex',
    { tag: '@smoke' },
    async ({ notFoundPage }) => {
      // Act
      const response = await notFoundPage.goto(routes.unknownPage);

      // Assert
      expect(response?.status()).toBe(404);
      await expect.soft(notFoundPage.h1).toHaveCount(1);
      await expect
        .soft(notFoundPage.robotsMeta)
        .toHaveAttribute('content', 'noindex');
    },
  );

  test(
    'Unknown service slug returns 404 with one h1',
    { tag: '@smoke' },
    async ({ notFoundPage }) => {
      // Act
      const response = await notFoundPage.goto(
        routes.service(unknownServiceSlug),
      );

      // Assert
      expect(response?.status()).toBe(404);
      await expect(notFoundPage.h1).toHaveCount(1);
    },
  );

  test(
    'Has the templated title',
    { tag: '@smoke' },
    async ({ page, notFoundPage }) => {
      // Act
      await notFoundPage.goto(routes.unknownPage);

      // Assert
      await expect(page).toHaveTitle(`${NOT_FOUND_TITLE} | ${pageTitle}`);
    },
  );

  test(
    'Renders inside the site shell',
    { tag: '@smoke' },
    async ({ notFoundPage }) => {
      // Act
      await notFoundPage.goto(routes.unknownPage);

      // Assert
      await expect.soft(notFoundPage.banner).toBeVisible();
      await expect.soft(notFoundPage.footer).toBeVisible();
    },
  );

  test(
    'Back to home navigates to the home page',
    { tag: '@navigation' },
    async ({ page, notFoundPage }) => {
      // Arrange
      await notFoundPage.goto(routes.unknownPage);

      // Act
      await notFoundPage.homeLink.click();

      // Assert
      await expect(page).toHaveURL(routes.home);
    },
  );
});
