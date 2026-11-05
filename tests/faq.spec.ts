import { test, expect } from './fixtures';
import { getFaqServiceSlug, viewports } from './config/testData';

// 8px in from the corner of the first row. Padding on the old markup (so the
// old row did not toggle), and the centre of the rounded corner on the new
const ROW_PADDING_POINT = { x: 8, y: 8 };

test.describe('FAQ', { tag: '@faq' }, () => {
  for (const [size, viewport] of Object.entries(viewports)) {
    test.describe(`${size} width`, () => {
      test.use({ viewport });

      test('Clicking the row padding opens an item and a second click closes it', async ({
        servicePage,
      }) => {
        // Arrange
        await servicePage.goto(getFaqServiceSlug());
        const row = servicePage.faqRow(0);
        await expect(row).toHaveJSProperty('open', false);

        // Act
        await row.click({ position: ROW_PADDING_POINT });

        // Assert
        await expect(row).toHaveJSProperty('open', true);

        // Act
        await row.click({ position: ROW_PADDING_POINT });

        // Assert
        await expect(row).toHaveJSProperty('open', false);
      });
    });
  }

  test('Enter opens an item and Space closes it', async ({ servicePage }) => {
    // Arrange
    await servicePage.goto(getFaqServiceSlug());
    const row = servicePage.faqRow(0);

    // Act
    await servicePage.faqSummary(0).press('Enter');

    // Assert
    await expect(row).toHaveJSProperty('open', true);

    // Act
    await servicePage.faqSummary(0).press('Space');

    // Assert
    await expect(row).toHaveJSProperty('open', false);
  });

  test('Opening animates the answer, which ends fully visible', async ({
    servicePage,
  }) => {
    // Arrange
    await servicePage.goto(getFaqServiceSlug());

    // Act
    await servicePage.faqSummary(0).click();

    // Assert: polled, so a slow run cannot miss the 300ms window
    await expect
      .poll(() => servicePage.faqAnswerAnimationCount(0))
      .toBeGreaterThan(0);
    await expect.poll(() => servicePage.faqAnswerAnimationCount(0)).toBe(0);
    await expect(servicePage.faqAnswer(0)).toHaveCSS('opacity', '1');
  });

  test.describe('reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } });

    test('Opening starts no motion', async ({ servicePage, motionAudit }) => {
      // Arrange
      await servicePage.goto(getFaqServiceSlug());

      // Act
      await servicePage.faqSummary(0).click();

      // Assert: read straight away, because polling would hide a short animation
      await expect(servicePage.faqRow(0)).toHaveJSProperty('open', true);
      expect.soft(await motionAudit.runningAnimationCount()).toBe(0);
      expect.soft(await motionAudit.transitioningElementCount()).toBe(0);
    });
  });
});
