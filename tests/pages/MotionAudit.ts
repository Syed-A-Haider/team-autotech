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

  // Scroll in steps so every scroll-driven effect gets to run, then rest at the bottom
  async scrollThrough() {
    await this.page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      const bottom = document.documentElement.scrollHeight;
      for (let y = 0; y < bottom; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      window.scrollTo(0, bottom);
    });
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

  // Elements that would fade or slide something when their state changes.
  // Under 10ms counts as instant (the usual "reduced motion" override)
  async transitioningElementCount(): Promise<number> {
    return this.page.evaluate(() => {
      const INSTANT_SECONDS = 0.01;
      const hasDuration = (el: Element) => {
        const style = getComputedStyle(el);
        if (style.transitionProperty === 'none') return false;
        return style.transitionDuration
          .split(',')
          .some((duration) => parseFloat(duration) > INSTANT_SECONDS);
      };
      return [...document.querySelectorAll('body *')].filter(hasDuration)
        .length;
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
