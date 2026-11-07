import { whyChooseUsItems } from '@/components/home-sections/WhyChooseUsSection';
import { AUTOPLAY_INTERVAL_MS } from '@/components/home-sections/ReviewsCarousel';
import {
  MAPS_DIRECTIONS_LINK,
  PHONE_MOBILE,
  siteConfig,
} from '@/lib/constants';
import { test, expect } from './fixtures';
import type { HomePage } from './pages/HomePage';
import {
  callButtonLabel,
  htmlLang,
  pageTitle,
  reviewCardMinWidth,
  routes,
  tabletViewport,
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

// The hero call button is a tel: link, so a phone dials on a tap and has no use
// for the number. From sm it is shown, as on the Call button in ContactLinks.
// Visible text (innerText) is read from the browser, so CSS decides
test.describe(
  'Homepage - hero call button',
  { tag: ['@homepage', '@responsive'] },
  () => {
    test.describe('phone width', () => {
      test.use({ viewport: viewports.mobile });

      test('Shows no phone number, a tap dials', async ({ homePage }) => {
        // Assert - the fixture has loaded the page at this width
        await expect(homePage.heroCallLink).toBeVisible();
        await expect(homePage.heroCallLink).toHaveText(callButtonLabel, {
          useInnerText: true,
        });
      });

      test('The open menu call button shows no phone number either', async ({
        homePage,
      }) => {
        // Act
        await homePage.menuToggleButton.click();

        // Assert
        await expect(homePage.mobileMenuCallLink).toBeVisible();
        await expect(homePage.mobileMenuCallLink).toHaveText(callButtonLabel, {
          useInnerText: true,
        });
      });
    });

    test.describe('tablet width', () => {
      test.use({ viewport: tabletViewport });

      test('Shows the phone number', async ({ homePage }) => {
        // Assert
        await expect(homePage.heroCallLink).toBeVisible();
        await expect(homePage.heroCallLink).toContainText(PHONE_MOBILE, {
          useInnerText: true,
        });
      });
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

// T5.7: the carousel moves on by itself. A fake clock jumps over each interval,
// so a test does not wait out each interval. The clock is installed after the page
// has loaded and then runs on in real time, so scrolling and the settle still work
test.describe(
  'Homepage - reviews autoplay',
  { tag: ['@homepage', '@responsive'] },
  () => {
    test.use({ viewport: viewports.mobile });

    // The root says whether the timer is running or held (data-autoplay). A test
    // waits for the state it needs, then two frames so React has started or
    // cleared the timer, before the clock jumps
    async function waitForAutoplay(
      homePage: HomePage,
      state: 'running' | 'held',
    ) {
      await expect(homePage.reviewsRoot).toHaveAttribute(
        'data-autoplay',
        state,
      );
      await homePage.waitForFrames();
    }

    // The carousel in view, with its timer running and the mouse out of the way
    async function startAutoplay(homePage: HomePage) {
      await homePage.page.clock.install();
      await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
      await homePage.waitForReviewsWindow();
      await homePage.waitForReviewsInView();
      await waitForAutoplay(homePage, 'running');
    }

    async function jumpOneInterval(homePage: HomePage) {
      await homePage.page.clock.fastForward(AUTOPLAY_INTERVAL_MS);
    }

    test('Moves on by itself, one review at a time', async ({ homePage }) => {
      // Arrange
      await startAutoplay(homePage);

      // Act
      await jumpOneInterval(homePage);

      // Assert
      await expect.poll(() => homePage.currentReviewIndex()).toBe(1);
      await homePage.waitForReviewsToSettle();
      expect(await homePage.centredReviewIndex()).toBe(1);

      // And again, once that move has settled
      await expect
        .poll(() => homePage.currentReviewIsInMiddleSlot())
        .toBe(true);
      await jumpOneInterval(homePage);
      await expect.poll(() => homePage.currentReviewIndex()).toBe(2);
    });

    test('Wraps forward from the last review to the first', async ({
      homePage,
    }) => {
      // Arrange
      await startAutoplay(homePage);
      const last = (await homePage.reviewSlides.count()) - 1;

      // Act - on to the last review, one settled move at a time
      for (let review = 1; review <= last; review++) {
        await jumpOneInterval(homePage);
        await expect.poll(() => homePage.currentReviewIndex()).toBe(review);
        await homePage.waitForReviewsToSettle();
        await expect
          .poll(() => homePage.currentReviewIsInMiddleSlot())
          .toBe(true);
      }
      await jumpOneInterval(homePage);

      // Assert
      await expect.poll(() => homePage.currentReviewIndex()).toBe(0);
      await homePage.waitForReviewsToSettle();
      expect(await homePage.centredReviewIndex()).toBe(0);
    });

    test('Pause holds it, and play sets it going again', async ({
      homePage,
    }) => {
      // Arrange
      await startAutoplay(homePage);

      // Act
      await homePage.reviewsPauseButton.click();
      await waitForAutoplay(homePage, 'held');
      await jumpOneInterval(homePage);
      await jumpOneInterval(homePage);

      // Assert - still on the first review
      await homePage.waitForReviewsToSettle();
      expect(await homePage.currentReviewIndex()).toBe(0);
      expect(await homePage.centredReviewIndex()).toBe(0);

      // Act
      await homePage.reviewsPlayButton.click();
      await waitForAutoplay(homePage, 'running');
      await jumpOneInterval(homePage);

      // Assert
      await expect.poll(() => homePage.currentReviewIndex()).toBe(1);
    });

    // The only autoplay test on the real clock. A fake clock hid the bug where
    // a mouse resting over the carousel (where scrolling to it leaves the cursor)
    // held autoplay for good
    test('Starts by itself in real time, with a mouse resting over it', async ({
      homePage,
    }) => {
      // Arrange
      await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
      await homePage.waitForReviewsWindow();

      // Act
      await homePage.reviewsTrack.hover();

      // Assert - within a couple of intervals, on its own
      await expect
        .poll(() => homePage.currentReviewIndex(), {
          timeout: 3 * AUTOPLAY_INTERVAL_MS,
        })
        .toBe(1);
    });

    test('Using the carousel stops it for good', async ({ homePage }) => {
      // Arrange
      await startAutoplay(homePage);

      // Act
      await homePage.reviewsNextButton.click();
      await waitForAutoplay(homePage, 'held');
      await jumpOneInterval(homePage);
      await jumpOneInterval(homePage);

      // Assert - it stays on the review the visitor chose, and offers play
      await homePage.waitForReviewsToSettle();
      expect(await homePage.currentReviewIndex()).toBe(1);
      await expect(homePage.reviewsPlayButton).toBeVisible();
    });

    test.describe('with reduced motion', () => {
      test.use(reducedMotion);

      test('Stays still and has no pause button', async ({ homePage }) => {
        // Arrange
        await homePage.page.clock.install();
        await homePage.reviewsNextButton.scrollIntoViewIfNeeded();
        await homePage.waitForReviewsInView();

        // Act
        await jumpOneInterval(homePage);
        await homePage.waitForReviewsToSettle();

        // Assert
        expect(await homePage.currentReviewIndex()).toBe(0);
        await expect(homePage.reviewsPauseButton).toHaveCount(0);
        await expect(homePage.reviewsPlayButton).toHaveCount(0);
      });
    });
  },
);

// A thumb scrolling the page lands on the carousel, because it fills much of a
// phone's screen. That must not stop autoplay (it did, so on a phone the carousel
// was often already paused when the visitor reached it). A swipe of the track
// itself is use and does stop it. Real touch events go through the browser's
// debugging protocol, which only Chromium has
test.describe(
  'Homepage - reviews autoplay, finger',
  { tag: ['@homepage', '@responsive'] },
  () => {
    test.use({ viewport: viewports.mobile, hasTouch: true, isMobile: true });
    test.skip(
      ({ browserName }) => browserName !== 'chromium',
      'Needs real touch events (CDP)',
    );

    async function showReviewsPlaying(homePage: HomePage) {
      await homePage.reviewsTrack.scrollIntoViewIfNeeded();
      await homePage.waitForReviewsWindow();
      await homePage.waitForReviewsInView();
      await expect(homePage.reviewsRoot).toHaveAttribute(
        'data-autoplay',
        'running',
      );
    }

    test('A finger scrolling the page over the carousel does not stop it', async ({
      homePage,
    }) => {
      // Arrange
      await showReviewsPlaying(homePage);

      // Act - the finger goes down on the track and drags the page up
      await homePage.dragFingerOverReviews({ x: 0, y: -80 });
      await homePage.waitForFrames();

      // Assert - still offering to pause, so it is still playing
      await expect(homePage.reviewsPauseButton).toBeVisible();
      await expect(homePage.reviewsPlayButton).toBeHidden();
    });

    test('A finger swiping the track stops it', async ({ homePage }) => {
      // Arrange
      await showReviewsPlaying(homePage);

      // Act
      await homePage.dragFingerOverReviews({ x: -120, y: 0 });

      // Assert
      await expect(homePage.reviewsPlayButton).toBeVisible();
    });
  },
);
