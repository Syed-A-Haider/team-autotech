import { test, expect } from './fixtures';
import {
  motionServiceSlugs,
  revealCheckSlug,
  routes,
  viewports,
} from './config/testData';

// Guards for the motion phase (T5). They read computed state, never class names,
// so every later effect is checked by the same tests.
// Phone size only for now: on desktop, Why Choose Us hides its text until hover.
// T5.6 removes that and adds the desktop run.
test.use({ viewport: viewports.mobile });

// Pages whose headings reveal on scroll (home and 404 have none yet)
const revealPages = [
  { name: 'about', path: routes.about },
  ...motionServiceSlugs.map((slug) => ({
    name: slug,
    path: routes.service(slug),
  })),
];

const pages = [
  { name: 'home', path: routes.home },
  ...revealPages,
  { name: 'not found', path: routes.unknownPage },
];

// Where a heading's top edge sits in the window, as a fraction of its height.
// The reveal covers the first 30% of the heading's pass (--reveal-end), so 0.85
// is part-way and 0.5 is done
const HEADING_PART_WAY = 0.85;
const HEADING_DONE = 0.5;

test.describe('Motion guards', () => {
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
      async ({ motionAudit }) => {
        await motionAudit.trackLayoutShift();
        await motionAudit.goto(path);
        await motionAudit.scrollThrough();
        expect(await motionAudit.layoutShift()).toBe(0);
      },
    );
  }
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

test.describe('Motion guards, reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

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

test.describe('Motion guards, JavaScript off', () => {
  test.use({ javaScriptEnabled: false });

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
