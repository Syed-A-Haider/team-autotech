import { MAPS_DIRECTIONS_LINK, siteConfig } from '@/lib/constants';
import { test, expect } from './fixtures';
import { htmlLang, pageTitle, routes, viewports } from './config/testData';

test.describe('Homepage', { tag: '@homepage' }, () => {
  test(
    'Loads with the correct title',
    { tag: '@smoke' },
    async ({ homePage }) => {
      // Arrange - homePage fixture already navigated to '/'

      // Assert
      await expect(homePage.page).toHaveTitle(pageTitle);
    },
  );

  test(
    'Sets the html lang and meta description',
    { tag: '@smoke' },
    async ({ homePage }) => {
      // Arrange - homePage fixture already navigated to '/'

      // Assert - soft, so both report even if one fails
      await expect.soft(homePage.html).toHaveAttribute('lang', htmlLang);
      await expect
        .soft(homePage.metaDescription)
        .toHaveAttribute('content', siteConfig.description);
    },
  );

  test('has exactly one h1', { tag: '@smoke' }, async ({ homePage }) => {
    // Assert
    await expect(homePage.h1).toHaveCount(1);
  });

  test(
    'Renders key sections in the expected order',
    { tag: '@smoke' },
    async ({ homePage }) => {
      // Act
      const headings = await homePage.allSectionHeadings();
      const whyChooseIndex = headings.indexOf(
        homePage.sectionHeadings.whyChooseUs,
      );
      const findUsIndex = headings.indexOf(homePage.sectionHeadings.findUs);
      const aboutIndex = headings.indexOf(homePage.sectionHeadings.about);

      // Assert - soft, so all three report even if one fails
      expect.soft(whyChooseIndex).toBeGreaterThanOrEqual(0);
      expect.soft(findUsIndex).toBeGreaterThan(whyChooseIndex);
      expect.soft(aboutIndex).toBeGreaterThan(findUsIndex);
    },
  );

  test(
    'Services grid links through to a real service page',
    { tag: '@navigation' },
    async ({ page, homePage }) => {
      // Arrange
      const href = await homePage.firstServiceLink.getAttribute('href');

      // Act
      await homePage.firstServiceLink.click();

      // Assert - plain string, no regex
      await expect(page).toHaveURL(href!);
    },
  );

  test(
    'AboutSnippet CTA links to the About page',
    { tag: '@navigation' },
    async ({ homePage }) => {
      // Assert
      await expect(homePage.aboutCtaLink).toHaveAttribute('href', routes.about);
    },
  );

  test(
    'FindUsSection directions link is present and has a destination',
    { tag: '@navigation' },
    async ({ homePage }) => {
      // Assert
      await expect(homePage.directionsLink).toBeVisible();
      await expect(homePage.directionsLink).toHaveAttribute(
        'href',
        MAPS_DIRECTIONS_LINK,
      );
    },
  );
});

test.describe(
  'Homepage — responsive',
  { tag: ['@homepage', '@responsive'] },
  () => {
    test('Mobile viewport shows the menu toggle', async ({
      page,
      homePage,
    }) => {
      // Arrange
      await page.setViewportSize(viewports.mobile);

      // Assert
      await expect(homePage.menuToggleButton).toBeVisible();
    });

    test('Desktop viewport hides the menu toggle', async ({
      page,
      homePage,
    }) => {
      // Arrange
      await page.setViewportSize(viewports.desktop);

      // Assert
      await expect(homePage.menuToggleButton).toBeHidden();
    });
  },
);
