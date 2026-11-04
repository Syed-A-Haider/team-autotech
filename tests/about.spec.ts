import { test, expect } from './fixtures';
import { pageTitle, routes, viewports } from './config/testData';
import { ABOUT_META_TITLE } from '@/app/about/page';
import { getAllServices } from '@/lib/services';

test.describe('About page', { tag: '@about' }, () => {
  test(
    'Returns 200 with exactly one h1',
    { tag: '@smoke' },
    async ({ aboutPage }) => {
      // Act
      const response = await aboutPage.goto();

      // Assert
      expect(response?.status()).toBe(200);
      await expect(aboutPage.h1).toHaveCount(1);
    },
  );

  test(
    'Has the templated title',
    { tag: '@smoke' },
    async ({ page, aboutPage }) => {
      // Act
      await aboutPage.goto();

      // Assert
      await expect(page).toHaveTitle(`${ABOUT_META_TITLE} | ${pageTitle}`);
    },
  );

  test(
    'AboutSnippet CTA lands on the About page',
    { tag: '@navigation' },
    async ({ page, homePage }) => {
      // Act
      await homePage.aboutCtaLink.click();

      // Assert
      await expect(page).toHaveURL(routes.about);
    },
  );

  test(
    'Desktop nav About link lands on the About page',
    { tag: '@navigation' },
    async ({ page, homePage }) => {
      // Arrange
      await page.setViewportSize(viewports.desktop);

      // Act
      await homePage.navAboutLink.click();

      // Assert
      await expect(page).toHaveURL(routes.about);
    },
  );

  test(
    'Service link on About lands on its service page',
    { tag: '@navigation' },
    async ({ page, aboutPage }) => {
      // Arrange
      const [service] = getAllServices();
      await aboutPage.goto();

      // Act
      await aboutPage.serviceLink(service.title).click();

      // Assert
      await expect(page).toHaveURL(routes.service(service.slug));
    },
  );
});
