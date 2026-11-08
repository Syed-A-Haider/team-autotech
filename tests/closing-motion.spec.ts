import { COMING_SOON_BADGE } from '@/components/service-sections/ComingSoonPanel';
import { WHATSAPP_LABEL, CALL_LABEL } from '@/components/ui/ContactLinks';
import { groupServicesByCategory } from '@/lib/services';
import { test, expect } from './fixtures';
import {
  comingSoonSlug,
  featureGridSlug,
  footerSocialLabel,
  routes,
  tallViewport,
  viewports,
} from './config/testData';

// Closing motion (T5.11): the Footer columns, Related Services, the closing
// EnquiryBand with its coming-soon chip, the About panels and the 404.
// Reads computed style, never a class name. Page-wide guards (faded, sideways,
// held fills, reduced motion, JavaScript off) run for the 404 in motion.spec.ts
test.use({ viewport: viewports.mobile });

const sizes = Object.entries(viewports);

// How much of a column has entered the window: part-way, and fully on screen
const ENTRY_PART_WAY = 0.3;
const ENTRY_DONE = 1;

const FOOTER_COLUMNS = 4;

for (const [size, viewport] of sizes) {
  test.describe(`Closing motion, Footer, ${size}`, () => {
    test.use({ viewport });

    test(
      'each column rides a view timeline and the grid does not',
      { tag: '@motion' },
      async ({ page, motionAudit }) => {
        await page.goto(routes.home);
        const grid = motionAudit.footerGrid();
        const columns = await motionAudit.childrenRideScroll(grid);

        expect.soft(columns).toHaveLength(FOOTER_COLUMNS);
        expect.soft(columns.every((rides) => rides)).toBe(true);
        expect.soft(await motionAudit.ridesScroll(grid)).toBe(false);
      },
    );

    test(
      'the copyright row, a social icon and a quick link stay still',
      { tag: '@motion' },
      async ({ page, motionAudit }) => {
        await page.goto(routes.home);
        const footer = page.getByRole('contentinfo');

        expect
          .soft(await motionAudit.ridesScroll(motionAudit.footerCopyright()))
          .toBe(false);
        expect
          .soft(
            await motionAudit.ridesScroll(
              footer.getByRole('link', { name: footerSocialLabel }),
            ),
          )
          .toBe(false);
        expect
          .soft(
            await motionAudit.ridesScroll(
              motionAudit
                .footerGrid()
                .getByRole('link', { name: 'About', exact: true }),
            ),
          )
          .toBe(false);
      },
    );

    test(
      'a column is part-way at entry 0.3 and done once fully on screen',
      { tag: '@motion' },
      async ({ page, motionAudit }) => {
        await page.goto(routes.home);
        const first = motionAudit.footerGrid().locator(':scope > *').first();
        const last = motionAudit.footerGrid().locator(':scope > *').last();
        const opacity = (column: typeof first) =>
          column.evaluate((el) => Number(getComputedStyle(el).opacity));

        // Act: part-way
        await motionAudit.scrollEntryTo(first, ENTRY_PART_WAY);

        // Assert: neither hidden nor finished
        await expect.poll(() => opacity(first)).toBeGreaterThan(0);
        expect(await opacity(first)).toBeLessThan(1);

        // Act: the last column part-way too, then everything on screen
        await motionAudit.scrollEntryTo(last, ENTRY_PART_WAY);
        await expect.poll(() => opacity(last)).toBeGreaterThan(0);
        expect(await opacity(last)).toBeLessThan(1);
        await motionAudit.scrollEntryTo(last, ENTRY_DONE);

        // Assert: done, and nothing is held
        await expect.poll(() => opacity(last)).toBe(1);
        await expect.poll(() => opacity(first)).toBe(1);
        expect(await motionAudit.revealOffset(last)).toEqual({ x: 0, y: 0 });
      },
    );
  });
}

test.describe('Closing motion, 404', () => {
  test(
    'nothing in main rides a view timeline',
    { tag: '@motion' },
    async ({ notFoundPage, motionAudit }) => {
      await notFoundPage.goto(routes.unknownPage);

      expect(await motionAudit.scrollSubjectCount(notFoundPage.main)).toBe(0);
    },
  );

  test.describe('tall window', () => {
    test.use({ viewport: tallViewport });

    test(
      'the Footer leaves nothing faded on a page that cannot scroll',
      { tag: '@motion' },
      async ({ page, notFoundPage, motionAudit }) => {
        await notFoundPage.goto(routes.unknownPage);

        // Arrange: prove the page cannot scroll, so no scroll can rescue it
        const scrolls = await page.evaluate(
          () => document.documentElement.scrollHeight > window.innerHeight,
        );
        expect(scrolls).toBe(false);

        // Assert
        await expect.poll(() => motionAudit.fadedElementCount()).toBe(0);
      },
    );
  });
});

for (const [size, viewport] of sizes) {
  test.describe(`Closing motion, coming-soon band, ${size}`, () => {
    test.use({ viewport });

    test(
      'the chip pops once at load, after --pop-delay, from --pop-scale and --pop-rotate',
      { tag: '@motion' },
      async ({ servicePage, motionAudit, interactionAudit }) => {
        await servicePage.goto(comingSoonSlug);
        const chip = servicePage.bandChip();
        const timing = await motionAudit.animationTiming(chip);
        const start = await motionAudit.animationStartLook(chip);

        expect.soft(await motionAudit.animationName(chip)).toBe('pop-settle');
        expect.soft(timing.iterations).toBe('1');
        expect
          .soft(timing.delay)
          .toBeCloseTo(await interactionAudit.durationToken('--pop-delay'), 3);
        expect
          .soft(Number(start.scale))
          .toBe(await interactionAudit.token('--pop-scale'));
        expect
          .soft(parseFloat(start.rotate))
          .toBe(await interactionAudit.token('--pop-rotate'));
      },
    );

    test(
      'the chip ends at rest and keeps its skew, and its text never animates',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(comingSoonSlug);
        const chip = servicePage.bandChip();

        // Once finished, scale and rotate let go. Skew is a transform, kept
        await expect(chip).toHaveCSS('scale', 'none', { timeout: 10_000 });
        await expect(chip).toHaveCSS('rotate', 'none');
        await expect(chip).not.toHaveCSS('transform', 'none');
        expect(
          await motionAudit.animationName(servicePage.bandChipText()),
        ).toBe('none');
      },
    );

    test(
      'the pitch and contact row ride, the Call and WhatsApp buttons do not',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(comingSoonSlug);
        const band = servicePage.band();

        expect
          .soft(await motionAudit.ridesScroll(servicePage.bandPitch()))
          .toBe(true);
        expect
          .soft(await motionAudit.ridesScroll(servicePage.bandContactRow()))
          .toBe(true);
        expect
          .soft(
            await motionAudit.ridesScroll(
              band.getByRole('link', { name: CALL_LABEL }),
            ),
          )
          .toBe(false);
        expect
          .soft(
            await motionAudit.ridesScroll(
              band.getByRole('link', { name: WHATSAPP_LABEL }),
            ),
          )
          .toBe(false);
      },
    );
  });
}

for (const [size, viewport] of sizes) {
  test.describe(`Closing motion, live page, ${size}`, () => {
    test.use({ viewport });

    test(
      'the CTA band pitch and contact row ride and there is no chip',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);

        expect
          .soft(await motionAudit.ridesScroll(servicePage.bandPitch()))
          .toBe(true);
        expect
          .soft(await motionAudit.ridesScroll(servicePage.bandContactRow()))
          .toBe(true);
        await expect
          .soft(servicePage.band().getByText(COMING_SOON_BADGE))
          .toHaveCount(0);
      },
    );

    test(
      'related cards reveal through their wrapper, never themselves',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);
        const cards = await motionAudit.cardTimelines(
          servicePage.relatedSection(),
        );

        expect.soft(cards.length).toBeGreaterThan(0);
        expect.soft(cards.every((card) => !card.own)).toBe(true);
        expect.soft(cards.every((card) => card.parent)).toBe(true);
      },
    );
  });
}

for (const [size, viewport] of sizes) {
  test.describe(`Closing motion, About, ${size}`, () => {
    test.use({ viewport });

    test(
      'the intro panel, every category card and the Find Us panel ride',
      { tag: '@motion' },
      async ({ aboutPage, motionAudit }) => {
        await aboutPage.goto();
        const cards = aboutPage.categoryCards();
        const expectedCards = Object.keys(groupServicesByCategory()).length;

        expect.soft(cards).toHaveCount(expectedCards);
        expect
          .soft(await motionAudit.ridesScroll(aboutPage.introPanel()))
          .toBe(true);
        expect
          .soft(await motionAudit.ridesScroll(aboutPage.findUsPanel()))
          .toBe(true);
        expect
          .soft(
            (
              await motionAudit.childrenRideScroll(aboutPage.categoryGrid())
            ).every((rides) => rides),
          )
          .toBe(true);
      },
    );

    test(
      'only the cards ride in the grid: no stagger, no grid, no service rows',
      { tag: '@motion' },
      async ({ aboutPage, motionAudit }) => {
        await aboutPage.goto();
        const grid = aboutPage.categoryGrid();
        const expectedCards = Object.keys(groupServicesByCategory()).length;

        expect.soft(await motionAudit.ridesScroll(grid)).toBe(false);
        // Cards plus anything inside them: exactly one subject per card
        expect
          .soft(await motionAudit.scrollSubjectCount(grid))
          .toBe(expectedCards);
        const steps = await aboutPage
          .categoryCards()
          .evaluateAll((cards) =>
            cards.map((card) => getComputedStyle(card).getPropertyValue('--i')),
          );
        expect.soft(steps.every((step) => step.trim() === '')).toBe(true);
      },
    );

    test(
      'the closing band pitch rides',
      { tag: '@motion' },
      async ({ aboutPage, servicePage, motionAudit }) => {
        await aboutPage.goto();

        expect(await motionAudit.ridesScroll(servicePage.bandPitch())).toBe(
          true,
        );
      },
    );
  });
}
