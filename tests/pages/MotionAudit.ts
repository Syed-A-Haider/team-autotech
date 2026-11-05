import type { Page } from '@playwright/test';

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
}
