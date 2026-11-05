import { test, expect } from './fixtures';
import { motionServiceSlugs, routes, viewports } from './config/testData';

// Guards for the motion phase (T5). They read computed state, never class names,
// so every later effect is checked by the same tests.
// Phone size only for now: on desktop, Why Choose Us hides its text until hover.
// T5.6 removes that and adds the desktop run.
test.use({ viewport: viewports.mobile });

const pages = [
  { name: 'home', path: routes.home },
  { name: 'about', path: routes.about },
  ...motionServiceSlugs.map((slug) => ({
    name: slug,
    path: routes.service(slug),
  })),
  { name: 'not found', path: routes.unknownPage },
];

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
      },
    );
  }
});

test.describe('Motion guards, JavaScript off', () => {
  test.use({ javaScriptEnabled: false });

  for (const { name, path } of pages) {
    test(
      `${name}: all content is visible`,
      { tag: '@motion' },
      async ({ motionAudit }) => {
        await motionAudit.goto(path);
        await expect.poll(() => motionAudit.fadedElementCount()).toBe(0);
      },
    );
  }
});
