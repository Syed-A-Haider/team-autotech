import { HERO_SUBTITLE } from '@/components/home-sections/HeroSection';
import { test, expect } from './fixtures';
import {
  motionServiceSlugs,
  revealCheckSlug,
  routes,
  viewports,
} from './config/testData';

// Guards for the motion phase (T5). They read computed state, never class names,
// so every later effect is checked by the same tests.
// Phone size by default. The page-wide guards (faded, sideways scroll, layout
// shift, reduced motion, JavaScript off) also run at desktop since T5.6, which
// removed the text that was hidden until hover. Held fills, the reveal audit and
// the hero checks stay phone-only, by decision, to keep the suite quick: the hero
// call button is hidden from lg, and the phone run already proves the rest
test.use({ viewport: viewports.mobile });

// Pages that reveal on scroll (the 404 has none yet)
const revealPages = [
  { name: 'home', path: routes.home },
  { name: 'about', path: routes.about },
  ...motionServiceSlugs.map((slug) => ({
    name: slug,
    path: routes.service(slug),
  })),
];

const pages = [...revealPages, { name: 'not found', path: routes.unknownPage }];

// A sampled opacity can sit a hair under its start value on the first frame
const OPACITY_TOLERANCE = 0.01;

// Where a heading's top edge sits in the window, as a fraction of its height.
// The reveal covers the first 30% of the heading's pass (--reveal-end), so 0.85
// is part-way and 0.5 is done
const HEADING_PART_WAY = 0.85;
const HEADING_DONE = 0.5;

// Every size in `viewports`, so a page-wide guard is written once and runs at
// both phone and desktop
const sizes = Object.entries(viewports);

// Same shape for the reduced-motion guards, which share one context option
const reducedMotion = { contextOptions: { reducedMotion: 'reduce' } } as const;

for (const [size, viewport] of sizes) {
  test.describe(`Motion guards, ${size}`, () => {
    test.use({ viewport });

    for (const { name, path } of pages) {
      test(
        `${name}: nothing is left faded after scrolling to the bottom`,
        { tag: '@motion' },
        async ({ motionAudit }) => {
          await motionAudit.goto(path);
          await motionAudit.scrollThrough();
          await expect.poll(() => motionAudit.fadedElementCount()).toBe(0);
        },
      );

      test(
        `${name}: does not scroll sideways`,
        { tag: '@motion' },
        async ({ motionAudit }) => {
          await motionAudit.goto(path);
          await motionAudit.scrollThrough();
          expect(await motionAudit.horizontalOverflow()).toBe(0);
        },
      );

      test(
        `${name}: does not shift the layout`,
        { tag: '@motion' },
        async ({ motionAudit, browserName }) => {
          test.skip(
            browserName !== 'chromium',
            'Only Chromium reports layout shifts, elsewhere this always passes',
          );
          await motionAudit.trackLayoutShift();
          await motionAudit.goto(path);
          await motionAudit.scrollThrough();
          expect(await motionAudit.layoutShift()).toBe(0);
        },
      );
    }
  });
}

// Phone only (see the note at the top)
test.describe('Motion guards, timed effects', () => {
  for (const { name, path } of pages) {
    test(
      `${name}: no timed effect holds its end state`,
      { tag: '@motion' },
      async ({ motionAudit }) => {
        await motionAudit.goto(path);
        expect(await motionAudit.heldFillCount()).toBe(0);
      },
    );
  }
});

test.describe('Motion guards, homepage load-in', () => {
  // Sampled on every frame from first paint, because a timed effect has
  // finished by the time a test could look
  test.beforeEach(async ({ motionAudit }) => {
    await motionAudit.trackHeroFrames();
    await motionAudit.goto(routes.home);
    await expect
      .poll(async () => (await motionAudit.heroFrames()).done)
      .toBe(true);
  });

  test(
    'the headline is visible from the first frame',
    { tag: '@motion' },
    async ({ motionAudit, interactionAudit }) => {
      const frames = await motionAudit.heroFrames();
      const pageFadeStart = await interactionAudit.token('--page-enter-from');

      // The h1 never fades itself, and the page fade never starts from 0
      expect.soft(frames.h1OwnMin).toBe(1);
      expect
        .soft(frames.h1EffectiveMin)
        .toBeGreaterThanOrEqual(pageFadeStart - OPACITY_TOLERANCE);
    },
  );

  test(
    'nothing above the headline moves while the page fades in',
    { tag: '@motion' },
    async ({ motionAudit }) => {
      expect((await motionAudit.heroFrames()).ancestorMoved).toBe(false);
    },
  );

  test(
    'the page fade lasts as long as --motion-fast',
    { tag: '@motion' },
    async ({ motionAudit, interactionAudit }) => {
      expect(await motionAudit.pageEnterDuration()).toBe(
        await interactionAudit.durationToken('--motion-fast'),
      );
    },
  );

  test(
    'the hero image settles from --hero-zoom and is never faded',
    { tag: '@motion' },
    async ({ page, motionAudit, interactionAudit }) => {
      const frames = await motionAudit.heroFrames();
      const zoom = await interactionAudit.token('--hero-zoom');
      const firstScale = Number(frames.imageFirstScale);

      expect.soft(firstScale).toBeGreaterThan(1);
      expect.soft(firstScale).toBeLessThanOrEqual(zoom);
      expect.soft(frames.imageOwnMin).toBe(1);
      await expect(page.getByRole('main').locator('img').first()).toHaveCSS(
        'scale',
        'none',
      );
    },
  );

  test(
    'the stripe, subtitle and call button start hidden and finish in place',
    { tag: '@motion' },
    async ({ page, motionAudit }) => {
      const frames = await motionAudit.heroFrames();
      const subtitle = page.getByText(HERO_SUBTITLE);
      const stripe = page
        .getByRole('main')
        .locator('span[aria-hidden]')
        .first();
      const button = motionAudit.heroCallButton();

      expect.soft(frames.stripeFirstScale.startsWith('0')).toBe(true);
      expect.soft(frames.subtitleFirstOpacity).toBeLessThan(1);
      expect.soft(frames.buttonFirstOpacity).toBeLessThan(1);
      await expect.soft(stripe).toHaveCSS('scale', 'none');
      await expect.soft(subtitle).toHaveCSS('opacity', '1');
      await expect.soft(subtitle).toHaveCSS('translate', 'none');
      await expect.soft(button).toHaveCSS('opacity', '1');
      await expect.soft(button).toHaveCSS('translate', 'none');
    },
  );

  test(
    'the call button sweeps once and leaves nothing showing',
    { tag: '@motion' },
    async ({ motionAudit }) => {
      const { sheenFirst } = await motionAudit.heroFrames();

      // One sweep, no held fill
      expect.soft(sheenFirst.count).toBe(1);
      expect.soft(sheenFirst.iterations).toBe(1);
      expect.soft(sheenFirst.fill).toBe('none');
      await expect.poll(() => motionAudit.sheenAnimationCount()).toBe(0);
      // Back off the left edge, where the band is invisible
      expect(
        (await motionAudit.sheenRestingTranslate()).startsWith('-100%'),
      ).toBe(true);
    },
  );
});

test.describe('Motion guards, scroll reveals', () => {
  for (const { name, path } of revealPages) {
    test(
      `${name}: reveals follow the page scroll and let go when done`,
      { tag: '@motion' },
      async ({ motionAudit }) => {
        await motionAudit.goto(path);
        const audit = await motionAudit.revealAudit();

        expect.soft(audit.subjects).toBeGreaterThan(0);
        expect.soft(audit.detached).toBe(0);
        expect.soft(audit.held).toBe(0);
      },
    );
  }

  test(
    'home: each service card reveals through its wrapper, not itself',
    { tag: '@motion' },
    async ({ motionAudit }) => {
      await motionAudit.goto(routes.home);
      const cards = await motionAudit.serviceCardTimelines();

      expect.soft(cards.length).toBeGreaterThan(0);
      expect.soft(cards.every((card) => !card.own)).toBe(true);
      expect.soft(cards.every((card) => card.parent)).toBe(true);
    },
  );

  test(
    'a heading below the fold fades in with the scroll and ends fully shown',
    { tag: '@motion' },
    async ({ motionAudit }) => {
      // Arrange
      await motionAudit.goto(routes.service(revealCheckSlug));
      expect(await motionAudit.lastHeadingOpacity()).toBe(0);

      // Act
      await motionAudit.scrollLastHeadingTo(HEADING_PART_WAY);

      // Assert: part-way, so neither hidden nor finished
      await expect
        .poll(() => motionAudit.lastHeadingOpacity())
        .toBeGreaterThan(0);
      expect(await motionAudit.lastHeadingOpacity()).toBeLessThan(1);

      // Act
      await motionAudit.scrollLastHeadingTo(HEADING_DONE);

      // Assert: nothing is held once the range ends
      await expect.poll(() => motionAudit.lastHeadingOpacity()).toBe(1);
      expect(await motionAudit.lastHeadingTranslate()).toBe('none');
    },
  );
});

for (const [size, viewport] of sizes) {
  test.describe(`Motion guards, reduced motion, ${size}`, () => {
    test.use({ ...reducedMotion, viewport });

    for (const { name, path } of pages) {
      test(
        `${name}: nothing moves, fades or transitions`,
        { tag: '@motion' },
        async ({ motionAudit }) => {
          await motionAudit.goto(path);
          await motionAudit.scrollThrough();
          await expect.poll(() => motionAudit.runningAnimationCount()).toBe(0);
          expect(await motionAudit.fadedElementCount()).toBe(0);
          expect(await motionAudit.transitioningElementCount()).toBe(0);
          expect((await motionAudit.revealAudit()).subjects).toBe(0);
        },
      );
    }
  });
}

// Phone only: the hero call button is hidden from lg
test.describe('Motion guards, reduced motion, hero', () => {
  test.use(reducedMotion);

  // The poll in the page guards waits for animations to end, so a timed effect
  // that lost its guard would finish and pass. Look from the first frame instead
  test(
    'home: the hero starts no animation, even on the first frame',
    { tag: '@motion' },
    async ({ motionAudit }) => {
      await motionAudit.trackHeroFrames();
      await motionAudit.goto(routes.home);
      await expect
        .poll(async () => (await motionAudit.heroFrames()).done)
        .toBe(true);

      expect((await motionAudit.heroFrames()).maxAnimations).toBe(0);
    },
  );
});

for (const [size, viewport] of sizes) {
  test.describe(`Motion guards, JavaScript off, ${size}`, () => {
    test.use({ javaScriptEnabled: false, viewport });

    // Scroll first: a reveal below the fold is correctly hidden until it is reached
    for (const { name, path } of pages) {
      test(
        `${name}: all content is visible after scrolling`,
        { tag: '@motion' },
        async ({ motionAudit }) => {
          await motionAudit.goto(path);
          await motionAudit.scrollThrough();
          await expect.poll(() => motionAudit.fadedElementCount()).toBe(0);
        },
      );
    }
  });
}
