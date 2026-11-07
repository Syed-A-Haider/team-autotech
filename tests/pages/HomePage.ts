import type { Locator, Page } from '@playwright/test';
import {
  sectionHeading as whyChooseUsHeading,
  whyChooseUsItems,
} from '@/components/home-sections/WhyChooseUsSection';
import {
  FIND_US_SECTION_HEADING,
  FIND_US_DIRECTIONS_LABEL,
} from '@/components/home-sections/FindUsSection';
import {
  ABOUT_HEADLINE,
  ABOUT_CTA_LABEL,
} from '@/components/home-sections/AboutSnippet';
import {
  NEXT_REVIEW_LABEL,
  PAUSE_REVIEWS_LABEL,
  PLAY_REVIEWS_LABEL,
  PREV_REVIEW_LABEL,
  REVIEWS_CAROUSEL_LABEL,
  REVIEWS_TRACK_LABEL,
} from '@/components/home-sections/ReviewsCarousel';
import { MENU_TOGGLE_OPEN_LABEL } from '@/components/layout/MobileMenu';
import { WHATSAPP_WIDGET_LABEL } from '@/components/layout/WhatsAppWidget';
import {
  callButtonLabel,
  footerSocialLabel,
  navLabels,
  routes,
} from '../config/testData';

// What the reviews carousel's depth effect (T5.8) has done to one review, read
// from computed style. Numbers, so a test compares them with the design tokens.
// ring and dim are NaN when the overlay does not exist (reduced motion, no support)
export interface ReviewDepth {
  scale: number;
  // Sideways shift of the card in percent of its width (negative is left)
  shift: number;
  // Turn about the vertical axis in degrees
  tilt: number;
  ring: number;
  dim: number;
  // The five rating stars' scales, first to last
  stars: number[];
  // True if the slide itself is scaled, moved or turned. It must never be
  slideTransformed: boolean;
  perspective: string;
}

// The active dot and the others, read from each dot's ::before (the visible dot)
export interface ReviewDot {
  current: boolean;
  barScale: number;
  barWidth: number;
  tapWidth: number;
}

// Runs in the page: does this element ride a scroll (view) timeline?
function ridesViewTimeline(el: Element): boolean {
  return getComputedStyle(el)
    .getPropertyValue('animation-timeline')
    .includes('view');
}

export class HomePage {
  readonly page: Page;
  readonly main: Locator;
  readonly html: Locator;
  readonly metaDescription: Locator;
  readonly h1: Locator;
  readonly firstServiceLink: Locator;
  readonly aboutCtaLink: Locator;
  readonly navAboutLink: Locator;
  readonly navServicesButton: Locator;
  // First row of the Services dropdown (hidden until the button is hovered)
  readonly navDropdownLink: Locator;
  // Header call button on desktop, hidden below lg
  readonly headerCallLink: Locator;
  // Hero call button, shown below lg only
  readonly heroCallLink: Locator;
  readonly footerSocialLink: Locator;
  readonly whatsAppWidget: Locator;
  readonly directionsLink: Locator;
  readonly menuToggleButton: Locator;
  readonly header: Locator;
  readonly servicesSection: Locator;
  // The four Why Choose Us items, found by their copy. The h3 title is the
  // anchor: its parent is the card
  readonly whyChooseUsDescriptions: Locator;
  readonly whyChooseUsTitles: Locator;
  readonly whyChooseUsCards: Locator;
  // The reviews carousel (T5.7): the scrolling track, its slides (the hidden
  // ones are the neighbours, so they are included) and the two arrows
  readonly reviewsRoot: Locator;
  readonly reviewsTrack: Locator;
  readonly reviewSlides: Locator;
  readonly reviewsPrevButton: Locator;
  readonly reviewsNextButton: Locator;
  // The pause and play button for the carousel's own movement (T5.7)
  readonly reviewsPauseButton: Locator;
  readonly reviewsPlayButton: Locator;

  readonly sectionHeadings = {
    whyChooseUs: whyChooseUsHeading,
    findUs: FIND_US_SECTION_HEADING,
    about: ABOUT_HEADLINE,
  };

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');
    this.html = page.locator('html');
    this.metaDescription = page.locator('meta[name="description"]');
    this.h1 = page.getByRole('heading', { level: 1 });
    this.firstServiceLink = this.main
      .locator(`a[href^="${routes.servicesPrefix}"]`)
      .first();
    this.aboutCtaLink = this.main.getByRole('link', {
      name: ABOUT_CTA_LABEL,
    });
    const mainNav = page.getByRole('navigation', { name: navLabels.main });
    this.navAboutLink = mainNav.getByRole('link', { name: navLabels.about });
    this.navServicesButton = mainNav.getByRole('button', {
      name: navLabels.services,
    });
    this.navDropdownLink = mainNav.getByRole('link').first();
    this.headerCallLink = page
      .getByRole('banner')
      .getByRole('link', { name: callButtonLabel });
    this.heroCallLink = page
      .getByRole('main')
      .getByRole('link', { name: callButtonLabel });
    this.footerSocialLink = page
      .getByRole('contentinfo')
      .getByRole('link', { name: footerSocialLabel });
    this.whatsAppWidget = page.getByRole('link', {
      name: WHATSAPP_WIDGET_LABEL,
    });
    this.directionsLink = page.getByRole('link', {
      name: FIND_US_DIRECTIONS_LABEL,
    });
    this.menuToggleButton = page.getByRole('button', {
      name: MENU_TOGGLE_OPEN_LABEL,
    });
    this.header = page.getByRole('banner');
    this.servicesSection = page.locator('#services');
    this.whyChooseUsDescriptions = this.anyOf(
      whyChooseUsItems.map(({ description }) =>
        this.main.getByText(description, { exact: true }),
      ),
    );
    this.whyChooseUsTitles = this.anyOf(
      whyChooseUsItems.map(({ title }) =>
        this.main.getByRole('heading', { level: 3, name: title, exact: true }),
      ),
    );
    this.whyChooseUsCards = this.whyChooseUsTitles.locator('..');
    this.reviewsRoot = page.getByRole('region', {
      name: REVIEWS_CAROUSEL_LABEL,
    });
    this.reviewsTrack = page.getByRole('region', { name: REVIEWS_TRACK_LABEL });
    this.reviewSlides = this.reviewsTrack.getByRole('group', {
      includeHidden: true,
    });
    this.reviewsPrevButton = page.getByRole('button', {
      name: PREV_REVIEW_LABEL,
    });
    this.reviewsPauseButton = page.getByRole('button', {
      name: PAUSE_REVIEWS_LABEL,
    });
    this.reviewsPlayButton = page.getByRole('button', {
      name: PLAY_REVIEWS_LABEL,
    });
    this.reviewsNextButton = page.getByRole('button', {
      name: NEXT_REVIEW_LABEL,
    });
  }

  // One locator that matches any of the given ones
  private anyOf(locators: Locator[]): Locator {
    return locators.reduce((all, next) => all.or(next));
  }

  async goto() {
    await this.page.goto(routes.home);
  }

  async gotoServicesAnchor() {
    await this.page.goto(routes.homeServices);
  }

  // Pixels between the bottom of the sticky header and the top of the services
  // section. Negative means the header covers the start of the section
  async servicesGapBelowHeader(): Promise<number> {
    const headerBottom = await this.header.evaluate(
      (el) => el.getBoundingClientRect().bottom,
    );
    const sectionTop = await this.servicesSection.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    return sectionTop - headerBottom;
  }

  async allSectionHeadings(): Promise<string[]> {
    return this.page.getByRole('heading', { level: 2 }).allTextContents();
  }

  // The review the carousel treats as current: the one slide that is not
  // aria-hidden
  async currentReviewIndex(): Promise<number> {
    return this.reviewSlides.evaluateAll((slides) =>
      slides.findIndex(
        (slide) => slide.getAttribute('aria-hidden') === 'false',
      ),
    );
  }

  // The review that is actually in the middle of the track on screen: the slide
  // whose middle is nearest the track's middle. Read from the layout, so it
  // proves the scroll happened and not only that the state changed
  async centredReviewIndex(): Promise<number> {
    return this.reviewsTrack.evaluate((track) => {
      const trackBox = track.getBoundingClientRect();
      const trackMiddle = trackBox.left + trackBox.width / 2;
      const distances = Array.from(track.children).map((slide) => {
        const box = slide.getBoundingClientRect();
        return Math.abs(box.left + box.width / 2 - trackMiddle);
      });
      return distances.indexOf(Math.min(...distances));
    });
  }

  // A slide's width and how far its left edge is from the right edge of the
  // window (negative when it is off screen). Layout sizes, not transformed ones
  async reviewSlideBox(
    index: number,
  ): Promise<{ width: number; peek: number }> {
    return this.reviewSlides.nth(index).evaluate((slide) => ({
      width: (slide as HTMLElement).offsetWidth,
      peek: window.innerWidth - slide.getBoundingClientRect().left,
    }));
  }

  // Resolves once the track has stopped moving. A smooth scroll takes a while,
  // and a check made mid-scroll could pass for the wrong reason
  async waitForReviewsToSettle(): Promise<void> {
    await this.reviewsTrack.evaluate(
      (track) =>
        new Promise<void>((resolve) => {
          const STILL_FRAMES = 10;
          let last = track.scrollLeft;
          let still = 0;
          const check = () => {
            still = track.scrollLeft === last ? still + 1 : 0;
            last = track.scrollLeft;
            if (still >= STILL_FRAMES) resolve();
            else requestAnimationFrame(check);
          };
          requestAnimationFrame(check);
        }),
    );
  }

  // The carousel keeps a window of slides around the current one (CSS order) and
  // turns it a moment after a scroll stops, so a card always has a neighbour on
  // both sides. True once the current review sits in the middle of that window
  async currentReviewIsInMiddleSlot(): Promise<boolean> {
    return this.reviewSlides.evaluateAll((slides) => {
      const current = slides.find(
        (slide) => slide.getAttribute('aria-hidden') === 'false',
      );
      return (
        current !== undefined &&
        Number((current as HTMLElement).style.order) ===
          Math.floor(slides.length / 2)
      );
    });
  }

  // Resolves once the carousel has its wrap-around window, which it gets when
  // the page hydrates. Before that it is a plain scroller with hard ends
  async waitForReviewsWindow(): Promise<void> {
    await this.reviewsTrack.evaluate(
      (track) =>
        new Promise<void>((resolve) => {
          const check = () => {
            const ready = Array.from(track.children).every(
              (slide) => (slide as HTMLElement).style.order !== '',
            );
            if (ready) resolve();
            else requestAnimationFrame(check);
          };
          check();
        }),
    );
  }

  // Resolves once at least half of the carousel is on screen, and React has had
  // two frames to see it and start the autoplay timer. That timer is what a fake
  // clock then jumps over
  async waitForReviewsInView(): Promise<void> {
    await this.reviewsTrack.evaluate(
      (track) =>
        new Promise<void>((resolve) => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.intersectionRatio < 0.5) return;
              observer.disconnect();
              resolve();
            },
            { threshold: [0.5] },
          );
          observer.observe(track.parentElement!);
        }),
    );
    await this.waitForFrames();
  }

  // Two animation frames: long enough for React to apply a state change and
  // start or clear a timer it asked for
  async waitForFrames(): Promise<void> {
    await this.page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
  }

  // A swipe over the track: one card's width sideways. -1 swipes back (towards
  // the previous review). By default it is a sideways wheel, which is what a
  // trackpad swipe sends. Two wheel swipes in quick succession can be read by
  // WebKit as one gesture, so a test that chains swipes asks for 'scroll': the
  // track moved the same distance, with no input device involved
  async swipeReviews(
    direction: -1 | 1,
    input: 'wheel' | 'scroll' = 'wheel',
  ): Promise<void> {
    await this.waitForReviewsWindow();
    const step = await this.reviewsTrack.evaluate((track) => {
      const slide = track.children[0] as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).columnGap);
      return slide.offsetWidth + gap;
    });
    if (input === 'scroll') {
      await this.reviewsTrack.evaluate(
        (track, distance) =>
          track.scrollTo({
            left: track.scrollLeft + distance,
            behavior: 'instant',
          }),
        direction * step,
      );
      return;
    }
    await this.reviewsTrack.hover();
    await this.page.mouse.wheel(direction * step, 0);
  }

  // The carousel moves on by itself, so a check of a still picture pauses it
  async pauseReviews(): Promise<void> {
    await this.reviewsRoot.scrollIntoViewIfNeeded();
    await this.waitForReviewsWindow();
    await this.reviewsPauseButton.click();
    await this.reviewsPlayButton.waitFor();
  }

  // The dots under the carousel
  get reviewDots(): Locator {
    return this.reviewsRoot.getByRole('button', { name: 'Show review' });
  }

  async reviewDotBars(): Promise<ReviewDot[]> {
    return this.reviewDots.evaluateAll((dots) =>
      dots.map((dot) => {
        const bar = getComputedStyle(dot, '::before');
        return {
          current: dot.getAttribute('aria-current') === 'true',
          barScale: bar.scale === 'none' ? 1 : parseFloat(bar.scale),
          barWidth: parseFloat(bar.width),
          tapWidth: dot.getBoundingClientRect().width,
        };
      }),
    );
  }

  // The slide on screen just left or right of the centred one
  async reviewIndexBeside(side: 'left' | 'right'): Promise<number> {
    return this.reviewSlides.evaluateAll((slides, wanted) => {
      const track = slides[0].parentElement as HTMLElement;
      const trackBox = track.getBoundingClientRect();
      const middle = trackBox.left + trackBox.width / 2;
      const offsets = slides.map((slide) => {
        const box = slide.getBoundingClientRect();
        return box.left + box.width / 2 - middle;
      });
      const centre = offsets.findIndex(
        (offset) => Math.abs(offset) === Math.min(...offsets.map(Math.abs)),
      );
      const beside = offsets
        .map((offset, index) => ({ offset, index }))
        .filter(({ index }) => index !== centre)
        .filter(({ offset }) => (wanted === 'left' ? offset < 0 : offset > 0))
        .sort((a, b) => Math.abs(a.offset) - Math.abs(b.offset));
      return beside[0].index;
    }, side);
  }

  async reviewDepth(index: number): Promise<ReviewDepth> {
    return this.reviewSlides.nth(index).evaluate((slide) => {
      const card = slide.firstElementChild as HTMLElement;
      const style = getComputedStyle(card);
      // 'none' is the plain value. Otherwise the first number in it
      const firstNumber = (value: string, plain: number) => {
        if (value === 'none') return plain;
        const found = value.match(/-?[\d.]+/);
        return found ? parseFloat(found[0]) : plain;
      };
      // A pseudo-element that does not exist has no content and reads opacity 1
      const overlayOpacity = (pseudo: string) => {
        const overlay = getComputedStyle(card, pseudo);
        return overlay.content === 'none' ? NaN : Number(overlay.opacity);
      };
      const slideStyle = getComputedStyle(slide);
      return {
        scale: firstNumber(style.scale, 1),
        shift: firstNumber(style.translate, 0),
        tilt: firstNumber(style.rotate, 0),
        ring: overlayOpacity('::before'),
        dim: overlayOpacity('::after'),
        stars: [...card.querySelectorAll('svg')]
          .slice(0, 5)
          .map((star) => firstNumber(getComputedStyle(star).scale, 1)),
        slideTransformed:
          slideStyle.transform !== 'none' ||
          slideStyle.scale !== 'none' ||
          slideStyle.rotate !== 'none' ||
          slideStyle.translate !== 'none',
        perspective: slideStyle.perspective,
      };
    });
  }

  // How far the card sits inside its slide, from the slide's left and right
  // edges. The slide box never changes, so a card anchored on its inner edge
  // (the side next to the centre) must show 0 there: the neighbour keeps its peek
  async reviewCardInset(
    index: number,
  ): Promise<{ left: number; right: number }> {
    return this.reviewSlides.nth(index).evaluate((slide) => {
      const slideBox = slide.getBoundingClientRect();
      const cardBox = (
        slide.firstElementChild as Element
      ).getBoundingClientRect();
      return {
        left: cardBox.left - slideBox.left,
        right: slideBox.right - cardBox.right,
      };
    });
  }

  // Scrolls so a slide's middle sits `fraction` of a card step off the middle of
  // the track (negative is left). Snapping is turned off, so it stays there.
  // Used to read the depth effect part-way through a move
  async scrollReviewsOffCentre(index: number, fraction: number): Promise<void> {
    await this.reviewsTrack.evaluate(
      (track, [slideIndex, offset]) => {
        const slide = track.children[slideIndex] as HTMLElement;
        const gap = parseFloat(getComputedStyle(track).columnGap);
        const step = slide.offsetWidth + gap;
        track.style.scrollSnapType = 'none';
        track.scrollLeft =
          slide.offsetLeft +
          slide.offsetWidth / 2 -
          track.clientWidth / 2 +
          offset * step;
      },
      [index, fraction],
    );
    await this.waitForFrames();
  }

  // Call before goto. Samples the first review's card on every frame from its
  // first paint for two seconds: it is the centred one, so it must never be
  // small or dim, not even before the page hydrates. The ring is not sampled:
  // its resting value (0) is not the centred one (1), and Chromium applies a scroll
  // timeline one frame after the first layout, long before a card below the
  // fold paints. The rest-state test covers the ring
  async trackFirstReviewFrames(trackLabel: string): Promise<void> {
    await this.page.addInitScript((label) => {
      const WINDOW_MS = 2000;
      const frames = {
        done: false,
        samples: 0,
        minScale: 1,
        maxDim: 0,
      };
      (window as unknown as { __firstReview: typeof frames }).__firstReview =
        frames;
      let startedAt = -1;
      const sample = (now: number) => {
        const track = document.querySelector(`[aria-label="${label}"]`);
        const card = track?.children[0]?.firstElementChild;
        if (!card) return requestAnimationFrame(sample);
        if (startedAt < 0) startedAt = now;
        const scale = getComputedStyle(card).scale;
        frames.minScale = Math.min(
          frames.minScale,
          scale === 'none' ? 1 : parseFloat(scale),
        );
        frames.maxDim = Math.max(
          frames.maxDim,
          Number(getComputedStyle(card, '::after').opacity),
        );
        frames.samples += 1;
        if (now - startedAt < WINDOW_MS) requestAnimationFrame(sample);
        else frames.done = true;
      };
      requestAnimationFrame(sample);
    }, trackLabel);
  }

  async firstReviewFrames(): Promise<{
    done: boolean;
    samples: number;
    minScale: number;
    maxDim: number;
  }> {
    return this.page.evaluate(
      () =>
        (
          window as unknown as {
            __firstReview: {
              done: boolean;
              samples: number;
              minScale: number;
              maxDim: number;
            };
          }
        ).__firstReview,
    );
  }

  // Starts watching, frame by frame, for the carousel to turn its window (the
  // CSS order of the slides changes). Resolves a few frames after the turn with
  // the biggest change in scale or dim of any card on screen across it. The
  // view does not move at a turn, so that change must be nil. Call it WITHOUT
  // awaiting, then do the move, then await the result
  watchReviewWindowTurn(): Promise<{ turned: boolean; worstChange: number }> {
    return this.reviewsTrack.evaluate(
      (track) =>
        new Promise<{ turned: boolean; worstChange: number }>((resolve) => {
          const FRAMES_AFTER_TURN = 4;
          const GIVE_UP_MS = 4000;
          const slides = [...track.children].filter(
            (child) => child.getAttribute('role') === 'group',
          ) as HTMLElement[];
          const read = () =>
            slides.map((slide) => {
              const box = slide.getBoundingClientRect();
              const card = slide.firstElementChild as Element;
              const scale = getComputedStyle(card).scale;
              return {
                order: slide.style.order,
                onScreen: box.right > 0 && box.left < window.innerWidth,
                scale: scale === 'none' ? 1 : parseFloat(scale),
                dim: Number(getComputedStyle(card, '::after').opacity),
              };
            });
          let previous = read();
          let turned = false;
          let framesSince = 0;
          let worstChange = 0;
          const startedAt = performance.now();
          const frame = (now: number) => {
            const current = read();
            if (!turned) {
              turned = current.some(
                (slide, i) => slide.order !== previous[i].order,
              );
              if (turned) {
                current.forEach((slide, i) => {
                  if (!slide.onScreen) return;
                  worstChange = Math.max(
                    worstChange,
                    Math.abs(slide.scale - previous[i].scale),
                    Math.abs(slide.dim - previous[i].dim),
                  );
                });
              }
            } else {
              framesSince += 1;
            }
            previous = current;
            if (
              framesSince >= FRAMES_AFTER_TURN ||
              now - startedAt > GIVE_UP_MS
            ) {
              resolve({ turned, worstChange });
            } else {
              requestAnimationFrame(frame);
            }
          };
          requestAnimationFrame(frame);
        }),
    );
  }

  // The heading block and the Google button wrapper of the reviews section: does
  // each ride a scroll (view) timeline, and does the link itself (it must not:
  // the reveal sits on the wrapper so the button keeps its press)
  async reviewsRevealTimelines(
    headingText: string,
    linkName: string,
  ): Promise<{ heading: boolean; wrapper: boolean; link: boolean }> {
    const heading = this.main.getByRole('heading', {
      level: 2,
      name: headingText,
    });
    const link = this.main.getByRole('link', { name: linkName });
    // The heading's own block is its parent (the h2 and the subtitle sit in it)
    const [headingBlock, wrapper, linkItself] = await Promise.all([
      heading.locator('..').evaluate(ridesViewTimeline),
      link.locator('..').evaluate(ridesViewTimeline),
      link.evaluate(ridesViewTimeline),
    ]);
    return { heading: headingBlock, wrapper, link: linkItself };
  }

  // How opaque the colour laid over a review is, 0 to 1. The hover tint on the
  // neighbouring reviews is an ::after overlay
  async reviewTintAlpha(index: number): Promise<number> {
    return this.reviewSlides.nth(index).evaluate((slide) => {
      const colour = getComputedStyle(slide, '::after').backgroundColor;
      if (colour === 'transparent') return 0;
      const slashAlpha = colour.match(/\/\s*([\d.]+%?)\s*\)/);
      if (slashAlpha) {
        const value = parseFloat(slashAlpha[1]);
        return slashAlpha[1].endsWith('%') ? value / 100 : value;
      }
      const commaAlpha = colour.match(/rgba\(.*,\s*([\d.]+)\)/);
      return commaAlpha ? parseFloat(commaAlpha[1]) : 1;
    });
  }
}
