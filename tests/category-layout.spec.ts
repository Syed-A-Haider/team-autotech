import { test, expect } from './fixtures';
import {
  lgViewport,
  navLabels,
  tabletViewport,
  viewports,
} from './config/testData';
import { ABOUT_SERVICES_HEADING } from '@/app/about/page';

// Five categories (T6.5): the About cards and the Services dropdown must stay
// tidy. These read box geometry, so a wrong class shows up here.
// A literal on purpose: it must not follow the data
const CATEGORY_COUNT = 5;

const aboutSizes = [
  ['phone', viewports.mobile],
  ['tablet', tabletViewport],
  ['lg', lgViewport],
  ['desktop', viewports.desktop],
] as const;

const dropdownSizes = [
  ['lg', lgViewport],
  ['desktop', viewports.desktop],
] as const;

for (const [size, viewport] of aboutSizes) {
  test.describe(`About category cards, ${size}`, () => {
    test.use({ viewport });

    test(
      'every row of cards fills the full width, so no card sits alone',
      { tag: '@about' },
      async ({ aboutPage }) => {
        // Arrange - one card per category, found by its h3 in the What We Do section
        await aboutPage.goto();
        const section = aboutPage.main.locator('section', {
          has: aboutPage.page.getByRole('heading', {
            name: ABOUT_SERVICES_HEADING,
          }),
        });
        const cards = section.locator('h3').locator('xpath=..');
        await expect(cards).toHaveCount(CATEGORY_COUNT);

        // Act
        const boxes = await cards.evaluateAll((nodes) =>
          nodes.map((node) => {
            const { left, right, top } = node.getBoundingClientRect();
            return { left, right, top: Math.round(top) };
          }),
        );

        // Assert - every row starts at the same left edge and ends at the same right edge
        const rows = Map.groupBy(boxes, (box) => box.top);
        const left = Math.min(...boxes.map((box) => box.left));
        const right = Math.max(...boxes.map((box) => box.right));
        for (const row of rows.values()) {
          expect
            .soft(Math.min(...row.map((box) => box.left)))
            .toBeCloseTo(left, 0);
          expect
            .soft(Math.max(...row.map((box) => box.right)))
            .toBeCloseTo(right, 0);
        }
      },
    );

    test(
      'the page does not scroll sideways',
      { tag: '@about' },
      async ({ page, aboutPage }) => {
        await aboutPage.goto();

        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      },
    );
  });
}

for (const [size, viewport] of dropdownSizes) {
  test.describe(`Services dropdown, ${size}`, () => {
    test.use({ viewport });

    test(
      'shows every category in one row, with the lists starting level',
      { tag: '@navigation' },
      async ({ page, homePage }) => {
        // Arrange
        await homePage.goto();
        await homePage.navServicesButton.hover();
        const headings = page
          .getByRole('navigation', { name: navLabels.main })
          .getByRole('heading', { level: 3 });
        await expect(headings).toHaveCount(CATEGORY_COUNT);

        // Act - the top and edges of each column's list
        const lists = await headings
          .locator('xpath=following-sibling::ul')
          .evaluateAll((nodes) =>
            nodes.map((node) => {
              const { top, left, right } = node.getBoundingClientRect();
              return { top: Math.round(top), left, right };
            }),
          );

        // Assert - one shared top edge, columns side by side, all inside the window
        expect(new Set(lists.map((list) => list.top)).size).toBe(1);
        lists.forEach((list, index) => {
          expect(list.right).toBeLessThanOrEqual(viewport.width);
          if (index > 0) {
            expect(list.left).toBeGreaterThanOrEqual(lists[index - 1].right);
          }
        });
      },
    );
  });
}
