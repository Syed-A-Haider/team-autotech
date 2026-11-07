import { REVIEWS_TRACK_LABEL } from '@/components/home-sections/ReviewsCarousel';
import { REVIEWS_SECTION_HEADING } from '@/components/home-sections/ReviewsSection';
import { HomePage, type ReviewDepth } from './pages/HomePage';
import { test, expect } from './fixtures';
import {
  googleReviewsLinkLabel,
  tabletViewport,
  viewports,
} from './config/testData';

// T5.8: the depth effect on the reviews carousel. Every value is read from
// computed style and compared with the design tokens, so retuning a token does
// not break a test. Autoplay is paused first, or a 3s tick moves the carousel
// in the middle of a check.

const sizes = [
  { name: 'phone', viewport: viewports.mobile, tilts: false },
  { name: 'tablet', viewport: tabletViewport, tilts: false },
  { name: 'desktop', viewport: viewports.desktop, tilts: true },
];

const reducedMotion = { contextOptions: { reducedMotion: 'reduce' } } as const;

// A value read part-way through a move may be a frame behind in WebKit
const TOLERANCE = 0.02;
// How far off centre a card is held to read it on the ramp, in card steps. 0.3
// is inside the ramp at every width: not at rest, not centred
const MID_MOVE = 0.3;
// A card turned by the effect shows its inner edge at the slide edge within this
const EDGE_TOLERANCE_PX = 1;

function allClose(values: number[], target: number) {
  return values.every((value) => Math.abs(value - target) < TOLERANCE);
}

// A neighbouring review at rest: small, dim, no ring, small stars
function expectSideLook(
  side: ReviewDepth,
  look: { depthScale: number; depthDim: number; starRest: number },
) {
  expect.soft(side.scale).toBeCloseTo(look.depthScale, 2);
  expect.soft(side.dim).toBeCloseTo(look.depthDim, 2);
  expect.soft(side.ring).toBe(0);
  expect.soft(allClose(side.stars, look.starRest)).toBe(true);
}

function nonIncreasing(values: number[]) {
  return values.every((value, i) => i === 0 || value <= values[i - 1] + 0.001);
}

for (const { name, viewport, tilts } of sizes) {
  test.describe(
    `Reviews carousel depth, ${name}`,
    { tag: ['@motion', '@homepage'] },
    () => {
      test.use({ viewport });

      test('the centred review is full size with a ring, the neighbours small and dim', async ({
        homePage,
        interactionAudit,
      }) => {
        // Arrange
        await homePage.pauseReviews();
        const depthScale = await interactionAudit.token('--depth-scale');
        const depthDim = await interactionAudit.token('--depth-dim');
        const starRest = await interactionAudit.token('--star-rest');

        // Act
        const centre = await homePage.reviewDepth(
          await homePage.centredReviewIndex(),
        );
        const left = await homePage.reviewDepth(
          await homePage.reviewIndexBeside('left'),
        );
        const right = await homePage.reviewDepth(
          await homePage.reviewIndexBeside('right'),
        );

        // Assert
        expect.soft(centre.scale).toBe(1);
        expect.soft(centre.shift).toBe(0);
        expect.soft(centre.tilt).toBe(0);
        expect.soft(centre.ring).toBe(1);
        expect.soft(centre.dim).toBe(0);
        expect.soft(allClose(centre.stars, 1)).toBe(true);
        expectSideLook(left, { depthScale, depthDim, starRest });
        expectSideLook(right, { depthScale, depthDim, starRest });
      });

      test('the two neighbours are mirror images of each other', async ({
        homePage,
        interactionAudit,
      }) => {
        // Arrange
        await homePage.pauseReviews();
        const tiltToken = await interactionAudit.token('--depth-tilt');
        const perspectiveToken = await interactionAudit.token(
          '--depth-perspective',
        );
        const leftIndex = await homePage.reviewIndexBeside('left');
        const rightIndex = await homePage.reviewIndexBeside('right');

        // Act
        const left = await homePage.reviewDepth(leftIndex);
        const right = await homePage.reviewDepth(rightIndex);

        // Assert - the same size and dim, shifted and turned opposite ways. The
        // card is shifted towards the centre, which keeps the edge it shows
        expect.soft(left.scale).toBeCloseTo(right.scale, 2);
        expect.soft(left.dim).toBeCloseTo(right.dim, 2);
        expect.soft(left.shift).toBeCloseTo(-right.shift, 2);
        expect.soft(left.shift).toBeGreaterThan(0);
        expect.soft(left.tilt).toBeCloseTo(tilts ? tiltToken : 0, 2);
        expect.soft(right.tilt).toBeCloseTo(tilts ? -tiltToken : 0, 2);
        expect
          .soft(right.perspective)
          .toBe(tilts ? `${perspectiveToken}px` : 'none');
      });

      test('no slide itself is ever scaled, moved or turned', async ({
        homePage,
      }) => {
        // Arrange
        await homePage.pauseReviews();
        const count = await homePage.reviewSlides.count();

        // Act
        const slides = await Promise.all(
          Array.from({ length: count }, (_, i) => homePage.reviewDepth(i)),
        );

        // Assert - the slide's box is what snapping, clicking and layout use
        expect(count).toBeGreaterThan(0);
        expect(slides.some((slide) => slide.slideTransformed)).toBe(false);
      });

      test('part-way through a move the card is between its two looks, the same either side of the centre', async ({
        homePage,
        interactionAudit,
      }) => {
        // Arrange
        await homePage.pauseReviews();
        const depthScale = await interactionAudit.token('--depth-scale');
        const depthDim = await interactionAudit.token('--depth-dim');

        // Act - the first review, a little right of the middle and then the same
        // distance left of it
        await homePage.scrollReviewsOffCentre(0, MID_MOVE);
        const toTheLeft = await homePage.reviewDepth(0);
        await homePage.scrollReviewsOffCentre(0, -MID_MOVE);
        const toTheRight = await homePage.reviewDepth(0);

        // Assert - on the ramp, not at rest, and the two sides agree. A card
        // that came out of its range into its natural look on one side only
        // would fail the second half
        expect.soft(toTheLeft.scale).toBeGreaterThan(depthScale + 0.005);
        expect.soft(toTheLeft.scale).toBeLessThan(0.999);
        expect.soft(toTheLeft.dim).toBeGreaterThan(0.005);
        expect.soft(toTheLeft.dim).toBeLessThan(depthDim - 0.005);
        expect.soft(toTheLeft.ring).toBeGreaterThan(0.005);
        expect.soft(toTheLeft.ring).toBeLessThan(0.995);
        expect.soft(toTheRight.scale).toBeCloseTo(toTheLeft.scale, 1);
        expect
          .soft(Math.abs(toTheRight.scale - toTheLeft.scale))
          .toBeLessThan(TOLERANCE);
        expect
          .soft(Math.abs(toTheRight.dim - toTheLeft.dim))
          .toBeLessThan(TOLERANCE);
        expect
          .soft(Math.abs(toTheRight.ring - toTheLeft.ring))
          .toBeLessThan(TOLERANCE);
        expect.soft(toTheRight.shift).toBeCloseTo(-toTheLeft.shift, 1);
        expect.soft(toTheRight.tilt).toBeCloseTo(-toTheLeft.tilt, 1);
      });

      test('the stars grow one after another, first star first, from either side', async ({
        homePage,
      }) => {
        // Arrange
        await homePage.pauseReviews();

        // Act
        await homePage.scrollReviewsOffCentre(0, MID_MOVE);
        const fromTheLeft = (await homePage.reviewDepth(0)).stars;
        await homePage.scrollReviewsOffCentre(0, -MID_MOVE);
        const fromTheRight = (await homePage.reviewDepth(0)).stars;

        // Assert
        expect.soft(nonIncreasing(fromTheLeft)).toBe(true);
        expect.soft(nonIncreasing(fromTheRight)).toBe(true);
        expect.soft(fromTheLeft[0]).toBeGreaterThan(fromTheLeft[4]);
        expect.soft(fromTheRight[0]).toBeGreaterThan(fromTheRight[4]);
      });

      test('the depth timelines belong to the track, are live and hold no fill', async ({
        homePage,
        motionAudit,
      }) => {
        // Arrange
        await homePage.pauseReviews();

        // Act
        const audit =
          await motionAudit.carouselTimelineAudit(REVIEWS_TRACK_LABEL);

        // Assert
        expect.soft(audit.total).toBeGreaterThan(0);
        expect.soft(audit.onTrack).toBe(audit.total);
        expect.soft(audit.live).toBe(audit.total);
        expect.soft(audit.held).toBe(0);
      });

      test('turning the window of slides after a move changes nothing on screen', async ({
        homePage,
      }) => {
        // Arrange
        await homePage.pauseReviews();

        // Act - watch from before the click until a few frames after the turn
        const watch = homePage.watchReviewWindowTurn();
        await homePage.reviewsNextButton.click();
        const result = await watch;

        // Assert
        expect.soft(result.turned).toBe(true);
        expect.soft(result.worstChange).toBeLessThan(TOLERANCE);
      });

      test('the active dot is a short bar made by scaling, not by widening', async ({
        homePage,
      }) => {
        // Arrange
        await homePage.reviewsRoot.scrollIntoViewIfNeeded();
        await homePage.pauseReviews();

        // Assert - the first dot is the bar once its transition has ended
        await expect
          .poll(async () => (await homePage.reviewDotBars())[0].barScale)
          .toBeGreaterThan(2);
        const before = await homePage.reviewDotBars();
        expect
          .soft(before.slice(1).every((dot) => dot.barScale === 1))
          .toBe(true);
        // Layout width and tap target are the same for every dot
        expect.soft(new Set(before.map((dot) => dot.barWidth)).size).toBe(1);
        expect.soft(new Set(before.map((dot) => dot.tapWidth)).size).toBe(1);

        // Act
        await homePage.reviewsNextButton.click();

        // Assert - the bar moves to the second dot
        await expect
          .poll(async () => (await homePage.reviewDotBars())[1].barScale)
          .toBeGreaterThan(2);
        await expect
          .poll(async () => (await homePage.reviewDotBars())[0].barScale)
          .toBe(1);
      });
    },
  );
}

// From lg the tilt moves the projected edges, so the peek is checked where
// nothing tilts: phone and tablet
for (const { name, viewport } of sizes.filter((size) => !size.tilts)) {
  test.describe(
    `Reviews carousel depth, peek, ${name}`,
    { tag: ['@motion', '@homepage'] },
    () => {
      test.use({ viewport });

      test('the neighbouring review keeps its peek when it shrinks', async ({
        homePage,
      }) => {
        // Arrange
        await homePage.pauseReviews();

        // Act
        const right = await homePage.reviewCardInset(
          await homePage.reviewIndexBeside('right'),
        );
        const left = await homePage.reviewCardInset(
          await homePage.reviewIndexBeside('left'),
        );

        // Assert - the card's inner edge is where the slide's is
        expect.soft(Math.abs(right.left)).toBeLessThan(EDGE_TOLERANCE_PX);
        expect.soft(Math.abs(left.right)).toBeLessThan(EDGE_TOLERANCE_PX);
        expect.soft(right.right).toBeGreaterThan(EDGE_TOLERANCE_PX);
        expect.soft(left.left).toBeGreaterThan(EDGE_TOLERANCE_PX);
      });
    },
  );
}

test.describe(
  'Reviews carousel depth, first paint',
  { tag: ['@motion', '@homepage'] },
  () => {
    for (const { name, viewport } of sizes) {
      test(`${name}: the first review is never small or dim`, async ({
        page,
      }) => {
        // Arrange - sampling starts before the page loads
        await page.setViewportSize(viewport);
        const homePage = new HomePage(page);
        await homePage.trackFirstReviewFrames(REVIEWS_TRACK_LABEL);

        // Act
        await homePage.goto();
        await expect
          .poll(async () => (await homePage.firstReviewFrames()).done)
          .toBe(true);

        // Assert - it sampled, and the card was full size and undimmed every time
        const frames = await homePage.firstReviewFrames();
        expect.soft(frames.samples).toBeGreaterThan(0);
        expect.soft(frames.minScale).toBe(1);
        expect.soft(frames.maxDim).toBe(0);
      });
    }
  },
);

test.describe(
  'Reviews carousel depth, JavaScript off',
  { tag: ['@motion', '@homepage'] },
  () => {
    test.use({ javaScriptEnabled: false, viewport: viewports.mobile });

    // Before any script, slide one is centred (the spacers see to that) and the
    // next one is a neighbour: the depth effect is CSS, so it is already there
    test('the first review is centred and the next one is dim', async ({
      homePage,
      interactionAudit,
    }) => {
      // Arrange
      const depthScale = await interactionAudit.token('--depth-scale');
      const depthDim = await interactionAudit.token('--depth-dim');

      // Act
      const first = await homePage.reviewDepth(0);
      const second = await homePage.reviewDepth(1);

      // Assert
      expect.soft(first.scale).toBe(1);
      expect.soft(first.ring).toBe(1);
      expect.soft(first.dim).toBe(0);
      expect.soft(second.scale).toBeCloseTo(depthScale, 2);
      expect.soft(second.dim).toBeCloseTo(depthDim, 2);
      expect.soft(second.ring).toBe(0);
    });
  },
);

for (const { name, viewport } of sizes) {
  test.describe(
    `Reviews carousel depth, reduced motion, ${name}`,
    { tag: ['@motion', '@homepage'] },
    () => {
      test.use({ ...reducedMotion, viewport });

      test('every review looks the same, with no overlay', async ({
        homePage,
      }) => {
        // Arrange
        const count = await homePage.reviewSlides.count();

        // Act
        const slides = await Promise.all(
          Array.from({ length: count }, (_, i) => homePage.reviewDepth(i)),
        );

        // Assert - no scale, no shift, no tilt, no perspective, and no overlay
        // at all (an overlay that does not exist reads NaN)
        expect(count).toBeGreaterThan(0);
        expect
          .soft(
            slides.every(
              (slide) =>
                slide.scale === 1 &&
                slide.shift === 0 &&
                slide.tilt === 0 &&
                slide.perspective === 'none' &&
                Number.isNaN(slide.ring) &&
                Number.isNaN(slide.dim) &&
                allClose(slide.stars, 1),
            ),
          )
          .toBe(true);
      });
    },
  );
}

test.describe(
  'Reviews section reveals',
  { tag: ['@motion', '@homepage'] },
  () => {
    test.use({ viewport: viewports.mobile });

    test('the heading block and the Google button wrapper reveal, the button itself does not', async ({
      homePage,
    }) => {
      // Act
      const timelines = await homePage.reviewsRevealTimelines(
        REVIEWS_SECTION_HEADING,
        googleReviewsLinkLabel,
      );

      // Assert
      expect.soft(timelines.heading).toBe(true);
      expect.soft(timelines.wrapper).toBe(true);
      expect.soft(timelines.link).toBe(false);
    });
  },
);
