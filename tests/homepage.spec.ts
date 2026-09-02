import { test, expect } from './fixtures';
import { pageTitle, routes, viewports } from './config/testData';

test.describe('Homepage', { tag: '@homepage' }, () => {
  test('Loads with the correct title', { tag: '@smoke' }, async ({ page }) => {
    // Arrange - homePage fixture already navigated to '/'

    // Act
    const title = await page.title();

    // Assert
    expect(title).toBe(pageTitle);
  });

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
      // Act
      await homePage.firstServiceLink.click();

      // Assert
      await expect(page).toHaveURL(/\/services\//);
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
      // Act
      const href = await homePage.directionsLink.getAttribute('href');

      // Assert
      await expect(homePage.directionsLink).toBeVisible();
      expect(href).toBeTruthy();
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
