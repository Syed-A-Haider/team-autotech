import { whyChooseUsItems } from '@/components/home-sections/WhyChooseUsSection';
import { MAPS_DIRECTIONS_LINK, siteConfig } from '@/lib/constants';
import { test, expect } from './fixtures';
import {
  htmlLang,
  pageTitle,
  reviewCardMinWidth,
  routes,
  viewports,
} from './config/testData';

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
    'Jumping to #services leaves the section clear of the sticky header',
    { tag: '@navigation' },
    async ({ homePage }) => {
      // Act
      await homePage.gotoServicesAnchor();

      // Assert - polled, the jump settles after the navigation resolves. No
      // allowance: since T5.5 the page fade has no translate, so Safari lands exactly
      await expect
        .poll(() => homePage.servicesGapBelowHeader())
        .toBeGreaterThanOrEqual(0);
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

// T5.6: the old strip hid every description (display:none on phones, a zero-height
// box until hover on desktop). Visibility is read from the browser, not a class
test.describe(
  'Homepage - Why Choose Us',
  { tag: ['@homepage', '@responsive'] },
  () => {
    for (const [size, viewport] of Object.entries(viewports)) {
      test.describe(`${size} width`, () => {
        test.use({ viewport });

        test('Every description shows without hover', async ({ homePage }) => {
          // Assert - the fixture has loaded the page at this width
          await expect(
            homePage.whyChooseUsDescriptions.filter({ visible: true }),
          ).toHaveCount(whyChooseUsItems.length);
        });
      });
    }
  },
);

// T5.7: the reviews carousel is a native scroller. Positions are read from the
// layout, and each check waits for the smooth scroll to stop before it looks
const reducedMotion = { contextOptions: { reducedMotion: 'reduce' } } as const;

// Run once normally and once with reduced motion (an instant scroll)
function defineReviewNavigationTests() {
  test('The next button centres the next review', async ({ homePage }) => {
    // Arrange
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
    expect(await homePage.centredReviewIndex()).toBe(0);

    // Act
    await homePage.reviewsNextButton.click();

    // Assert - the state moves at once, the layout once the scroll has landed
    await expect.poll(() => homePage.currentReviewIndex()).toBe(1);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(1);
  });

  test('Clicking the neighbouring review centres it', async ({ homePage }) => {
    // Arrange
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();

    // Act - near the slide's left edge, the part that shows beside the first
    await homePage.reviewSlides.nth(1).click({ position: { x: 8, y: 100 } });

    // Assert
    await expect.poll(() => homePage.currentReviewIndex()).toBe(1);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(1);
  });

  test('ArrowRight moves exactly one review', async ({ homePage }) => {
    // Arrange
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
    await homePage.reviewsTrack.focus();

    // Act
    await homePage.page.keyboard.press('ArrowRight');

    // Assert - after the scroll stops, so a second step from the browser's own
    // key handling would show as review 3
    await expect.poll(() => homePage.currentReviewIndex()).toBe(1);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(1);
  });

  // Wrap-around: both ends join up, by button, by click and by swipe
  test('The previous button on the first review wraps to the last', async ({
    homePage,
  }) => {
    // Arrange
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
    const last = (await homePage.reviewSlides.count()) - 1;

    // Act
    await homePage.reviewsPrevButton.click();

    // Assert
    await expect.poll(() => homePage.currentReviewIndex()).toBe(last);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(last);
  });

  test('The next button on the last review wraps to the first', async ({
    homePage,
  }) => {
    // Arrange - on the last review, once the window has turned around it
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
    await homePage.reviewsPrevButton.click();
    await homePage.waitForReviewsToSettle();
    await expect.poll(() => homePage.currentReviewIsInMiddleSlot()).toBe(true);

    // Act
    await homePage.reviewsNextButton.click();

    // Assert
    await expect.poll(() => homePage.currentReviewIndex()).toBe(0);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(0);
  });

  test('Clicking the review beside the first on its left centres the last', async ({
    homePage,
  }) => {
    // Arrange - once the window is on, the last review is beside the first
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
    await homePage.waitForReviewsWindow();
    const last = (await homePage.reviewSlides.count()) - 1;
    const lastSlide = homePage.reviewSlides.nth(last);
    const { width } = await homePage.reviewSlideBox(last);

    // Act - near the slide's right edge, the part that shows beside the first
    await lastSlide.click({ position: { x: width - 8, y: 100 } });

    // Assert
    await expect.poll(() => homePage.currentReviewIndex()).toBe(last);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(last);
  });

  test('Swiping back from the first review lands on the last', async ({
    homePage,
  }) => {
    // Arrange
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
    const last = (await homePage.reviewSlides.count()) - 1;

    // Act
    await homePage.swipeReviews(-1);

    // Assert
    await expect.poll(() => homePage.currentReviewIndex()).toBe(last);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(last);
  });

  test('Swiping forward from the last review lands on the first', async ({
    homePage,
  }) => {
    // Arrange - on the last review, once the window has turned around it
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
    await homePage.reviewsPrevButton.click();
    await homePage.waitForReviewsToSettle();
    await expect.poll(() => homePage.currentReviewIsInMiddleSlot()).toBe(true);

    // Act
    await homePage.swipeReviews(1);

    // Assert
    await expect.poll(() => homePage.currentReviewIndex()).toBe(0);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(0);
  });

  test('The window turns after a swipe, so the next swipe has a neighbour too', async ({
    homePage,
  }) => {
    // Arrange
    await homePage.reviewsNextButton.scrollIntoViewIfNeeded();

    // Act - swipe forward, let it land, then swipe back past the first
    await homePage.swipeReviews(1, 'scroll');
    await homePage.waitForReviewsToSettle();
    await expect.poll(() => homePage.currentReviewIsInMiddleSlot()).toBe(true);
    await homePage.swipeReviews(-1, 'scroll');
    await homePage.waitForReviewsToSettle();
    await expect.poll(() => homePage.currentReviewIsInMiddleSlot()).toBe(true);
    await homePage.swipeReviews(-1, 'scroll');

    // Assert
    const last = (await homePage.reviewSlides.count()) - 1;
    await expect.poll(() => homePage.currentReviewIndex()).toBe(last);
    await homePage.waitForReviewsToSettle();
    expect(await homePage.centredReviewIndex()).toBe(last);
  });
}

test.describe(
  'Homepage - reviews carousel',
  { tag: ['@homepage', '@responsive'] },
  () => {
    for (const [size, viewport] of Object.entries(viewports)) {
      test.describe(`${size} width`, () => {
        test.use({ viewport });

        defineReviewNavigationTests();

        test.describe('with reduced motion', () => {
          test.use(reducedMotion);

          defineReviewNavigationTests();
        });

        test('The next review peeks in beside the first', async ({
          homePage,
        }) => {
          // Assert - its left edge is inside the window
          expect((await homePage.reviewSlideBox(1)).peek).toBeGreaterThan(0);
        });

        test('A neighbouring review tints faintly on hover, the centre one does not', async ({
          homePage,
        }) => {
          // Arrange
          await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
          await homePage.waitForReviewsWindow();
          const last = (await homePage.reviewSlides.count()) - 1;
          const { width } = await homePage.reviewSlideBox(last);
          expect(await homePage.reviewTintAlpha(1)).toBe(0);

          // Act - over each side neighbour, at the part that shows
          await homePage.reviewSlides
            .nth(1)
            .hover({ position: { x: 8, y: 100 } });

          // Assert - a faint wash, nowhere near opaque. The centre card has none
          await expect
            .poll(() => homePage.reviewTintAlpha(1))
            .toBeGreaterThan(0);
          expect(await homePage.reviewTintAlpha(1)).toBeLessThan(0.2);
          expect(await homePage.reviewTintAlpha(0)).toBe(0);

          await homePage.reviewSlides
            .nth(last)
            .hover({ position: { x: width - 8, y: 100 } });
          await expect
            .poll(() => homePage.reviewTintAlpha(last))
            .toBeGreaterThan(0);
          // The first neighbour's tint fades out as the pointer leaves it
          await expect.poll(() => homePage.reviewTintAlpha(1)).toBe(0);
        });
      });
    }

    test.describe('desktop width', () => {
      test.use({ viewport: viewports.desktop });

      test('The centre card is at least the desktop minimum wide', async ({
        homePage,
      }) => {
        // Assert
        expect((await homePage.reviewSlideBox(0)).width).toBeGreaterThanOrEqual(
          reviewCardMinWidth,
        );
      });

      test('The arrows sit on the track edges, centred on the track', async ({
        homePage,
      }) => {
        // Act
        const track = (await homePage.reviewsTrack.boundingBox())!;
        const prev = (await homePage.reviewsPrevButton.boundingBox())!;
        const next = (await homePage.reviewsNextButton.boundingBox())!;

        // Assert - soft, so all three report even if one fails
        const trackMiddle = track.y + track.height / 2;
        expect
          .soft(Math.abs(prev.y + prev.height / 2 - trackMiddle))
          .toBeLessThan(1);
        expect.soft(prev.x).toBeLessThan(track.x + track.width / 2);
        expect.soft(next.x).toBeGreaterThan(track.x + track.width / 2);
      });
    });

    test.describe('phone width', () => {
      test.use({ viewport: viewports.mobile });

      test('A press made as the page loads still lands', async ({
        homePage,
      }) => {
        // React replays a click made while the page hydrates, a moment before
        // the carousel switches to its wrap-around layout. It is a race, so a
        // few early clicks. Each one used to leave the last review current with
        // the first still on screen
        const attempts = 4;
        for (let attempt = 0; attempt < attempts; attempt++) {
          // Arrange - the click comes as soon as the button can take it
          await homePage.page.goto(routes.home, { waitUntil: 'commit' });

          // Act
          await homePage.reviewsPrevButton.click();

          // Assert
          const last = (await homePage.reviewSlides.count()) - 1;
          await expect.poll(() => homePage.currentReviewIndex()).toBe(last);
          await homePage.waitForReviewsToSettle();
          expect(await homePage.centredReviewIndex()).toBe(last);
          await expect
            .poll(() => homePage.currentReviewIsInMiddleSlot())
            .toBe(true);
        }
      });

      test('The arrows sit in the row under the track', async ({
        homePage,
      }) => {
        // Act
        const track = (await homePage.reviewsTrack.boundingBox())!;
        const prev = (await homePage.reviewsPrevButton.boundingBox())!;
        const next = (await homePage.reviewsNextButton.boundingBox())!;

        // Assert - soft, so both report even if one fails
        expect.soft(prev.y).toBeGreaterThanOrEqual(track.y + track.height);
        expect.soft(next.y).toBeGreaterThanOrEqual(track.y + track.height);
      });
    });
  },
);
