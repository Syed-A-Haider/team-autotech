import { MENU_TOGGLE_OPEN_LABEL } from '@/components/layout/MobileMenu';
import { test, expect } from './fixtures';
import {
  comingSoonSlug,
  featureGridSlug,
  mechanicalSlug,
  getSectionTitle,
  routes,
  stepsSlug,
  videoSlug,
  viewports,
} from './config/testData';

// Service page motion (T5.10): the hero load-in, the block reveals and the
// scroll progress bar. Reads computed style, never a class name. The page-wide
// guards (faded, sideways, layout shift, held fills, reduced motion, JS off)
// already run over four service pages in motion.spec.ts.
// Phone size by default (the hero call button and the mobile menu are phone only)
test.use({ viewport: viewports.mobile });

const sizes = Object.entries(viewports);
const reducedMotion = { contextOptions: { reducedMotion: 'reduce' } } as const;

// Where an element's top edge sits in the window, as a fraction of its height.
// 0.85 is part-way through a reveal, 0.3 is done
const PART_WAY = 0.85;
const DONE = 0.3;

// Pages that show the hero and the bar: a live one and a coming-soon one
const heroPages = [featureGridSlug, comingSoonSlug, mechanicalSlug];

for (const [size, viewport] of sizes) {
  test.describe(`Service motion, hero, ${size}`, () => {
    test.use({ viewport });

    test(
      'the text enters one step after another, 200ms apart',
      { tag: '@motion' },
      async ({ servicePage, motionAudit, interactionAudit }) => {
        await servicePage.goto(featureGridSlug);
        const step = await interactionAudit.durationToken('--hero-step');

        expect
          .soft(await motionAudit.animationDelay(servicePage.heroEyebrow()))
          .toBeCloseTo(0, 3);
        expect
          .soft(await motionAudit.animationDelay(servicePage.h1))
          .toBeCloseTo(step, 3);
        expect
          .soft(await motionAudit.animationDelay(servicePage.heroDescription()))
          .toBeCloseTo(step * 2, 3);
      },
    );

    test(
      'the h1 rises but never fades, because it is the LCP text',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);

        expect
          .soft(await motionAudit.animationName(servicePage.h1))
          .toContain('hero-rise');
        expect(
          await motionAudit.customProperty(servicePage.h1, '--hero-fade-from'),
        ).toBe('1');
      },
    );

    for (const slug of heroPages) {
      test(
        `${slug}: the motif settles over the hero and the photo is left alone`,
        { tag: '@motion' },
        async ({ servicePage, motionAudit }) => {
          await servicePage.goto(slug);

          expect
            .soft(await motionAudit.animationName(servicePage.heroMotif()))
            .toContain('hero-zoom');
          expect
            .soft(await motionAudit.animationName(servicePage.heroImage()))
            .toBe('none');
          await expect.soft(servicePage.heroMotif()).toHaveCSS('scale', 'none');
        },
      );
    }
  });
}

// Phone only: the hero call button is hidden from lg
test.describe('Service motion, hero call button', () => {
  test(
    'it is the fourth step and sweeps once',
    { tag: '@motion' },
    async ({ servicePage, motionAudit, interactionAudit }) => {
      await servicePage.goto(featureGridSlug);
      const step = await interactionAudit.durationToken('--hero-step');

      expect
        .soft(await motionAudit.animationDelay(servicePage.heroCallButton()))
        .toBeCloseTo(step * 3, 3);
      await expect.poll(() => servicePage.heroSheenCount()).toBe(1);
    },
  );
});

// Sampled on every frame from first paint, because a timed effect has finished
// by the time a test could look
for (const [size, viewport] of sizes) {
  test.describe(`Service motion, hero frames, ${size}`, () => {
    test.use({ viewport });

    for (const slug of heroPages) {
      test(
        `${slug}: the h1 is visible from the first frame and nothing above it moves`,
        { tag: '@motion' },
        async ({ motionAudit, interactionAudit }) => {
          await motionAudit.trackHeroFrames();
          await motionAudit.goto(routes.service(slug));
          await expect
            .poll(async () => (await motionAudit.heroFrames()).done)
            .toBe(true);

          const frames = await motionAudit.heroFrames();
          const pageFadeStart =
            await interactionAudit.token('--page-enter-from');

          expect.soft(frames.h1OwnMin).toBe(1);
          expect
            .soft(frames.h1EffectiveMin)
            .toBeGreaterThanOrEqual(pageFadeStart - 0.01);
          expect.soft(frames.ancestorMoved).toBe(false);
          expect.soft(frames.imageOwnMin).toBe(1);
          expect.soft(frames.imageFirstScale).toBe('none');
        },
      );
    }
  });
}

test.describe('Service motion, reduced motion, hero', () => {
  test.use(reducedMotion);

  for (const slug of heroPages) {
    test(
      `${slug}: the hero starts no animation, even on the first frame`,
      { tag: '@motion' },
      async ({ motionAudit }) => {
        await motionAudit.trackHeroFrames();
        await motionAudit.goto(routes.service(slug));
        await expect
          .poll(async () => (await motionAudit.heroFrames()).done)
          .toBe(true);

        expect((await motionAudit.heroFrames()).maxAnimations).toBe(0);
      },
    );
  }
});

for (const [size, viewport] of sizes) {
  test.describe(`Service motion, blocks, ${size}`, () => {
    test.use({ viewport });

    test(
      'a prose block reveals as one, not paragraph by paragraph',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);
        const block = servicePage.proseBlock();

        expect.soft(await motionAudit.ridesScroll(block)).toBe(true);
        expect
          .soft(
            (await motionAudit.childrenRideScroll(block)).every(
              (rides) => !rides,
            ),
          )
          .toBe(true);
      },
    );

    test(
      'feature cards rise in turn through their list',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);
        const list = servicePage.featureList(
          getSectionTitle(featureGridSlug, 'feature'),
        );
        const cards = await motionAudit.childrenRideScroll(list);

        expect.soft(await motionAudit.ridesScroll(list)).toBe(false);
        expect.soft(cards.length).toBeGreaterThan(0);
        expect.soft(cards.every((rides) => rides)).toBe(true);
      },
    );

    test(
      'steps rise in turn and each badge pops in, keeping its skew',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(stepsSlug);
        const title = getSectionTitle(stepsSlug, 'steps');
        const list = servicePage.stepsList(title);
        const steps = await motionAudit.childrenRideScroll(list);
        const badge = servicePage.stepBadge(title, 0);

        expect.soft(await motionAudit.ridesScroll(list)).toBe(false);
        expect.soft(steps.length).toBeGreaterThan(0);
        expect.soft(steps.every((rides) => rides)).toBe(true);
        expect
          .soft(await motionAudit.animationName(badge))
          .toContain('pop-grow');
        expect.soft(await motionAudit.ridesScroll(badge)).toBe(true);
        // The un-skewed number inside never animates on its own
        expect
          .soft(
            await motionAudit.animationName(servicePage.stepNumber(title, 0)),
          )
          .toBe('none');
        await expect.soft(badge).not.toHaveCSS('transform', 'none');
      },
    );

    test(
      'a step badge is part-way small and ends at full size',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(stepsSlug);
        const badge = servicePage.stepBadge(
          getSectionTitle(stepsSlug, 'steps'),
          0,
        );

        await motionAudit.scrollTopTo(badge, PART_WAY);
        await expect.poll(() => motionAudit.scaleX(badge)).toBeLessThan(1);
        expect(await motionAudit.scaleX(badge)).toBeGreaterThan(0);

        await motionAudit.scrollTopTo(badge, DONE);
        await expect.poll(() => motionAudit.scaleX(badge)).toBe(1);
        await expect(badge).toHaveCSS('scale', 'none');
      },
    );

    test(
      'the video player reveals through a wrapper, never itself or the button',
      { tag: '@motion' },
      async ({ page, servicePage, motionAudit }) => {
        await servicePage.goto(videoSlug);
        const wrapper = servicePage.videoWrapper();
        const inside = await motionAudit.childrenRideScroll(wrapper);

        expect.soft(await motionAudit.ridesScroll(wrapper)).toBe(true);
        expect.soft(inside.length).toBeGreaterThan(0);
        expect.soft(inside.every((rides) => !rides)).toBe(true);
        expect
          .soft(
            await motionAudit.ridesScroll(
              page.getByRole('button', { name: /^Play video/ }),
            ),
          )
          .toBe(false);
        await expect.soft(page.locator('main iframe')).toHaveCount(0);
      },
    );
  });
}

// The progress bar: one decorative 2px line under the sticky header
for (const [size, viewport] of sizes) {
  test.describe(`Service motion, progress bar, ${size}`, () => {
    test.use({ viewport });

    for (const slug of heroPages) {
      test(
        `${slug}: one 2px decorative bar sits full width under the header`,
        { tag: '@motion' },
        async ({ motionAudit }) => {
          await motionAudit.goto(routes.service(slug));
          const bars = await motionAudit.progressBars();

          expect(bars).toHaveLength(1);
          const [bar] = bars;
          expect.soft(bar.ariaHidden).toBe('true');
          expect.soft(bar.height).toBe(2);
          expect.soft(bar.left).toBe(0);
          expect.soft(bar.width).toBe(bar.clientWidth);
          expect.soft(bar.top).toBeCloseTo(bar.headerBottom, 0);
          expect.soft(bar.timeline).toContain('scroll(');
        },
      );
    }

    test(
      'it is empty at the top, part-way in the middle and full at the bottom',
      { tag: '@motion' },
      async ({ page, servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);
        const [bar] = await motionAudit.progressBars();
        expect(bar.scale).toBe('0 1');

        await page.evaluate(() =>
          window.scrollTo(
            0,
            (document.documentElement.scrollHeight - window.innerHeight) / 2,
          ),
        );
        await expect
          .poll(async () =>
            Number((await motionAudit.progressBarScale()).toFixed(1)),
          )
          .toBe(0.5);

        await motionAudit.scrollThrough();
        await expect.poll(() => motionAudit.progressBarScale()).toBe(1);
      },
    );

    test(
      'home and About have no bar',
      { tag: '@motion' },
      async ({ motionAudit }) => {
        await motionAudit.goto(routes.home);
        expect.soft(await motionAudit.progressBars()).toHaveLength(0);
        await motionAudit.goto(routes.about);
        expect.soft(await motionAudit.progressBars()).toHaveLength(0);
      },
    );
  });
}

// The header, its open menu and its dropdown sit above the bar
test.describe('Service motion, progress bar under the menus', () => {
  test(
    'the open mobile menu covers it',
    { tag: '@motion' },
    async ({ page, servicePage, motionAudit }) => {
      await servicePage.goto(featureGridSlug);
      await motionAudit.scrollThrough();
      await expect
        .poll(async () => (await motionAudit.elementAtProgressBar()).isBar)
        .toBe(true);

      await page.getByRole('button', { name: MENU_TOGGLE_OPEN_LABEL }).click();

      await expect
        .poll(
          async () => (await motionAudit.elementAtProgressBar()).insideHeader,
        )
        .toBe(true);
    },
  );

  test.describe('desktop', () => {
    test.use({ viewport: viewports.desktop });

    test(
      'the open Services dropdown covers it',
      { tag: '@motion' },
      async ({ page, servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);
        await motionAudit.scrollThrough();
        await expect
          .poll(async () => (await motionAudit.elementAtProgressBar()).isBar)
          .toBe(true);

        await page
          .getByRole('navigation', { name: 'Main' })
          .getByRole('button', { name: 'Services' })
          .hover();

        await expect
          .poll(
            async () => (await motionAudit.elementAtProgressBar()).insideHeader,
          )
          .toBe(true);
      },
    );
  });
});

for (const [size, viewport] of sizes) {
  test.describe(`Service motion, progress bar, reduced motion, ${size}`, () => {
    test.use({ ...reducedMotion, viewport });

    test(
      'it stays empty while the page scrolls',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);
        await motionAudit.scrollThrough();
        // Still there to be found, but never drawn
        expect(await motionAudit.progressBarScale()).toBe(0);
      },
    );
  });

  test.describe(`Service motion, progress bar, JavaScript off, ${size}`, () => {
    test.use({ javaScriptEnabled: false, viewport });

    test(
      'it still tracks the scroll',
      { tag: '@motion' },
      async ({ servicePage, motionAudit }) => {
        await servicePage.goto(featureGridSlug);
        await motionAudit.scrollThrough();
        await expect.poll(() => motionAudit.progressBarScale()).toBe(1);
      },
    );
  });
}
