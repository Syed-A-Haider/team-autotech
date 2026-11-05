import type { Locator, Page } from '@playwright/test';
import { callButtonLabel } from '../config/testData';

// What the homepage hero looked like on every frame from its first paint.
// First* values are read on the first frame the element exists
export interface HeroFrames {
  done: boolean;
  // Lowest opacity the h1 itself ever had, and with every ancestor multiplied in
  h1OwnMin: number;
  h1EffectiveMin: number;
  // True if any ancestor of the h1 was ever translated or transformed
  ancestorMoved: boolean;
  imageFirstScale: string;
  imageOwnMin: number;
  stripeFirstScale: string;
  subtitleFirstOpacity: number;
  buttonFirstOpacity: number;
  // Animations on the call button's ::after on that first frame
  sheenFirst: { count: number; iterations: number; fill: string };
  // Most animations running anywhere in main on any frame
  maxAnimations: number;
}

// Page-wide motion checks. Each reads the browser's computed state, so no test
// needs to know a class name. Header is left out: its dropdown is hidden at rest
export class MotionAudit {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  // Call before goto, so shifts are recorded from the start of the load
  async trackLayoutShift() {
    await this.page.addInitScript(() => {
      const store = window as unknown as { __cls: number };
      store.__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            value: number;
            hadRecentInput: boolean;
          };
          if (!shift.hadRecentInput) store.__cls += shift.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
  }

  async layoutShift(): Promise<number> {
    return this.page.evaluate(
      () => (window as unknown as { __cls: number }).__cls,
    );
  }

  // Scroll in steps so every scroll-driven effect gets to run, then rest at the bottom.
  // One call per step: waiting for a frame inside the page hangs with JavaScript off
  async scrollThrough() {
    const { step, bottom } = await this.page.evaluate(() => ({
      step: window.innerHeight * 0.8,
      bottom: document.documentElement.scrollHeight,
    }));
    for (let y = 0; y < bottom; y += step) {
      await this.scrollTo(y);
    }
    await this.scrollTo(bottom);
  }

  private async scrollTo(top: number) {
    await this.page.evaluate((y) => window.scrollTo(0, y), top);
  }

  // Elements in main and footer that are still see-through. The map is skipped
  // while it loads (it pulses on purpose)
  async fadedElementCount(): Promise<number> {
    return this.page.evaluate(() => {
      const elements = document.querySelectorAll(
        'main, main *, footer, footer *',
      );
      return [...elements].filter(
        (el) =>
          el.tagName !== 'IFRAME' &&
          !el.closest('[aria-busy="true"]') &&
          Number(getComputedStyle(el).opacity) < 1,
      ).length;
    });
  }

  // Scroll reveals in main, read from the browser (no class names).
  // subjects: elements driven by a scroll (view) timeline.
  // detached: subjects below the fold with no live animation on the page scroll.
  //   An overflow-hidden ancestor would capture the timeline, so call this
  //   before scrolling: past their range, finished animations are not listed
  // held: subjects whose fill keeps the end state after the range (should be none)
  async revealAudit(): Promise<{
    subjects: number;
    detached: number;
    held: number;
  }> {
    return this.page.evaluate(() => {
      type Timeline = { currentTime: unknown; source: Element | null };
      const scroller = document.scrollingElement;
      const subjects = [...document.querySelectorAll('main *')].filter((el) =>
        getComputedStyle(el)
          .getPropertyValue('animation-timeline')
          .includes('view'),
      );
      const isLive = (el: Element) =>
        el.getAnimations().some((animation) => {
          const timeline = animation.timeline as unknown as Timeline | null;
          return (
            timeline !== null &&
            timeline.currentTime !== null &&
            timeline.source === scroller
          );
        });
      const isBelowFold = (el: Element) =>
        el.getBoundingClientRect().top > window.innerHeight;
      const holdsEndState = (el: Element) =>
        /forwards|both/.test(
          getComputedStyle(el).getPropertyValue('animation-fill-mode'),
        );

      return {
        subjects: subjects.length,
        detached: subjects.filter((el) => isBelowFold(el) && !isLive(el))
          .length,
        held: subjects.filter(holdsEndState).length,
      };
    });
  }

  // The last h2 in main: far below the fold on a long page
  private lastHeading() {
    return this.page.locator('main h2').last();
  }

  async lastHeadingOpacity(): Promise<number> {
    return this.lastHeading().evaluate((el) =>
      Number(getComputedStyle(el).opacity),
    );
  }

  async lastHeadingTranslate(): Promise<string> {
    return this.lastHeading().evaluate((el) => getComputedStyle(el).translate);
  }

  // Put the heading's top edge at this fraction of the window height (0 = top, 1 = bottom)
  async scrollLastHeadingTo(viewportFraction: number) {
    await this.lastHeading().evaluate((el, fraction) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top - fraction * window.innerHeight);
    }, viewportFraction);
  }

  // Animations and transitions in progress on the page itself (not Next's dev overlay)
  async runningAnimationCount(): Promise<number> {
    return this.page.evaluate(
      () =>
        document.getAnimations().filter((animation) => {
          const target = (animation.effect as KeyframeEffect | null)?.target;
          return (
            target instanceof Element &&
            target.getRootNode() === document &&
            animation.playState === 'running'
          );
        }).length,
    );
  }

  // Elements that would fade or slide something when their state changes, on
  // the element itself or on a ::before / ::after it draws (sheen, underline,
  // pulse ring). A pseudo-element that does not exist does not count.
  // Under 10ms counts as instant (the usual "reduced motion" override)
  async transitioningElementCount(): Promise<number> {
    return this.page.evaluate(() => {
      const INSTANT_SECONDS = 0.01;
      const hasDuration = (style: CSSStyleDeclaration) => {
        if (style.transitionProperty === 'none') return false;
        return style.transitionDuration
          .split(',')
          .some((duration) => parseFloat(duration) > INSTANT_SECONDS);
      };
      const pseudoHasDuration = (el: Element, pseudo: string) => {
        const style = getComputedStyle(el, pseudo);
        return style.content !== 'none' && hasDuration(style);
      };
      return [...document.querySelectorAll('body *')].filter(
        (el) =>
          hasDuration(getComputedStyle(el)) ||
          pseudoHasDuration(el, '::before') ||
          pseudoHasDuration(el, '::after'),
      ).length;
    });
  }

  // Pixels the page is wider than the window (0 = no sideways scroll)
  async horizontalOverflow(): Promise<number> {
    return this.page.evaluate(() =>
      Math.max(
        0,
        document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    );
  }

  // Elements in main whose fill keeps an end state after the animation. A timed
  // effect that holds its fill would block hover and trap fixed children
  async heldFillCount(): Promise<number> {
    return this.page.evaluate(
      () =>
        [...document.querySelectorAll('main, main *')].filter((el) => {
          const style = getComputedStyle(el);
          return (
            style.animationName !== 'none' &&
            /forwards|both/.test(style.animationFillMode)
          );
        }).length,
    );
  }

  // Call before goto. Samples the hero on every frame from first paint, for
  // two and a half seconds after the h1 exists, because a timed effect has
  // finished by the time a test could look
  async trackHeroFrames() {
    await this.page.addInitScript(() => {
      const WINDOW_MS = 2500;
      const frames = {
        done: false,
        h1OwnMin: 1,
        h1EffectiveMin: 1,
        ancestorMoved: false,
        imageFirstScale: '',
        imageOwnMin: 1,
        stripeFirstScale: '',
        subtitleFirstOpacity: -1,
        buttonFirstOpacity: -1,
        sheenFirst: { count: -1, iterations: 0, fill: '' },
        maxAnimations: 0,
      };
      (window as unknown as { __hero: typeof frames }).__hero = frames;
      const opacityOf = (el: Element) => Number(getComputedStyle(el).opacity);
      let startedAt = -1;

      const sample = (now: number) => {
        const h1 = document.querySelector('main h1');
        if (!h1) return requestAnimationFrame(sample);
        if (startedAt < 0) startedAt = now;

        let effective = 1;
        for (let el: Element | null = h1; el; el = el.parentElement) {
          effective *= opacityOf(el);
          const style = getComputedStyle(el);
          if (
            el !== h1 &&
            (style.transform !== 'none' || style.translate !== 'none')
          ) {
            frames.ancestorMoved = true;
          }
        }
        frames.h1OwnMin = Math.min(frames.h1OwnMin, opacityOf(h1));
        frames.h1EffectiveMin = Math.min(frames.h1EffectiveMin, effective);

        const content = h1.parentElement as Element;
        const image = document.querySelector('main img') as Element;
        const stripe = content.querySelector('span');
        const subtitle = content.querySelector('p');
        const button = content.querySelector('a');
        if (frames.imageFirstScale === '') {
          frames.imageFirstScale = getComputedStyle(image).scale;
          frames.stripeFirstScale = stripe
            ? getComputedStyle(stripe).scale
            : '';
          frames.subtitleFirstOpacity = subtitle ? opacityOf(subtitle) : -1;
          frames.buttonFirstOpacity = button ? opacityOf(button) : -1;
          const sheen = (button?.getAnimations({ subtree: true }) ?? []).filter(
            (animation) =>
              (animation.effect as KeyframeEffect).pseudoElement === '::after',
          );
          const timing = sheen[0]?.effect?.getComputedTiming();
          frames.sheenFirst = {
            count: sheen.length,
            iterations: timing?.iterations ?? 0,
            fill: timing?.fill ?? '',
          };
        }
        frames.imageOwnMin = Math.min(frames.imageOwnMin, opacityOf(image));
        const main = document.querySelector('main') as Element;
        frames.maxAnimations = Math.max(
          frames.maxAnimations,
          main.getAnimations({ subtree: true }).length,
        );

        if (now - startedAt < WINDOW_MS) requestAnimationFrame(sample);
        else frames.done = true;
      };
      requestAnimationFrame(sample);
    });
  }

  async heroFrames(): Promise<HeroFrames> {
    return this.page.evaluate(
      () => (window as unknown as { __hero: HeroFrames }).__hero,
    );
  }

  // Duration in seconds of the page fade (PageTransition) around the h1, or
  // NaN if the page has none
  async pageEnterDuration(): Promise<number> {
    return this.page.getByRole('heading', { level: 1 }).evaluate((h1) => {
      for (let el = h1.parentElement; el; el = el.parentElement) {
        const style = getComputedStyle(el);
        if (style.animationName.includes('page-enter')) {
          return parseFloat(style.animationDuration);
        }
      }
      return NaN;
    });
  }

  // The hero call button, shown below lg only
  heroCallButton(): Locator {
    return this.page
      .getByRole('main')
      .getByRole('link', { name: callButtonLabel });
  }

  // Animations still running on the call button's ::after (the sheen sweep)
  async sheenAnimationCount(): Promise<number> {
    return this.heroCallButton().evaluate(
      (button) =>
        button
          .getAnimations({ subtree: true })
          .filter(
            (animation) =>
              (animation.effect as KeyframeEffect).pseudoElement === '::after',
          ).length,
    );
  }

  // Where the sheen band rests, read from the call button's ::after
  async sheenRestingTranslate(): Promise<string> {
    return this.heroCallButton().evaluate(
      (button) => getComputedStyle(button, '::after').translate,
    );
  }

  // For each service card on the homepage: does the card itself, or its
  // parent, ride a scroll (view) timeline? The reveal belongs on the parent,
  // so lift and press on the card are never fought over
  async serviceCardTimelines(): Promise<{ own: boolean; parent: boolean }[]> {
    return this.page
      .locator('#services')
      .getByRole('link')
      .evaluateAll((cards) => {
        const onViewTimeline = (el: Element) =>
          getComputedStyle(el)
            .getPropertyValue('animation-timeline')
            .includes('view');
        return cards.map((card) => ({
          own: onViewTimeline(card),
          parent: onViewTimeline(card.parentElement as Element),
        }));
      });
  }
}
