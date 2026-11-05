import type { Locator, Page } from '@playwright/test';

type Pseudo = '::before' | '::after';

interface PulseTiming {
  iterations: number;
  delay: number;
  fill: string;
}

// Hover, press and pulse checks. Each reads the browser's computed state (the
// element or its ::before / ::after), so no test needs a class name.
// Distances come from the design tokens in globals.css, so retuning a token
// does not break a test
export class InteractionAudit {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private async rawToken(name: string): Promise<string> {
    const raw = await this.page.evaluate(
      (property) =>
        getComputedStyle(document.documentElement).getPropertyValue(property),
      name,
    );
    if (raw.trim() === '') throw new Error(`Token ${name} is not defined`);
    return raw.trim();
  }

  // Number value of a token on :root, such as --press-scale
  async token(name: string): Promise<number> {
    return parseFloat(await this.rawToken(name));
  }

  // A time token in seconds. The build may write 150ms as .15s, so read the unit
  async durationToken(name: string): Promise<number> {
    const raw = await this.rawToken(name);
    return raw.endsWith('ms') ? parseFloat(raw) / 1000 : parseFloat(raw);
  }

  // How far a card rises on hover (--lift-y is in rem) in pixels
  async liftDistance(): Promise<number> {
    const rem = await this.token('--lift-y');
    const rootFontSize = await this.page.evaluate(() =>
      parseFloat(getComputedStyle(document.documentElement).fontSize),
    );
    return rem * rootFontSize;
  }

  // Computed value of one property, on the element or on a pseudo-element
  async style(
    target: Locator,
    property: string,
    pseudo?: Pseudo,
  ): Promise<string> {
    return target.evaluate(
      (el, args) =>
        getComputedStyle(el, args.pseudo ?? null).getPropertyValue(
          args.property,
        ),
      { property, pseudo },
    );
  }

  // True when the pseudo-element exists (content is set), false when absent
  async hasPseudo(target: Locator, pseudo: Pseudo): Promise<boolean> {
    const content = await this.style(target, 'content', pseudo);
    return content !== 'none' && content !== 'normal';
  }

  // Horizontal scale of the element or pseudo-element. 'none' means no scale, so 1.
  // A pseudo-element that does not exist gives NaN, so a missing effect can
  // never pass as "fully drawn"
  async scaleX(target: Locator, pseudo?: Pseudo): Promise<number> {
    if (pseudo && !(await this.hasPseudo(target, pseudo))) return NaN;
    const value = await this.style(target, 'scale', pseudo);
    return value === 'none' ? 1 : parseFloat(value.split(' ')[0]);
  }

  // Vertical shift in pixels. 'none' means no shift, so 0
  async translateY(target: Locator): Promise<number> {
    const value = await this.style(target, 'translate');
    const parts = value.split(' ');
    return value === 'none' || parts.length < 2 ? 0 : parseFloat(parts[1]);
  }

  async isFocusVisible(target: Locator): Promise<boolean> {
    return target.evaluate((el) => el.matches(':focus-visible'));
  }

  // Whether the primary pointer can hover (false on phones and tablets)
  async canHover(): Promise<boolean> {
    return this.page.evaluate(() => matchMedia('(hover: hover)').matches);
  }

  // Hold the pointer down on the element so its :active style applies. The
  // page is never clicked, so nothing navigates
  async hold(target: Locator) {
    await target.hover();
    await this.page.mouse.down();
  }

  // A key press first, so the browser treats the next focus() as keyboard focus
  async focusByKeyboard(target: Locator) {
    await this.page.keyboard.press('Tab');
    await target.focus();
  }

  // Wait for a few frames so styles have been recalculated after an action.
  // For checking that something did NOT change, where polling passes at once
  async settleFrames() {
    await this.page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          let frames = 3;
          const tick = () => {
            frames -= 1;
            if (frames === 0) resolve();
            else requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
    );
  }

  // Timing of the pulse animation on the widget's ::before
  async pulseTimings(widget: Locator): Promise<PulseTiming[]> {
    return widget.evaluate((el) =>
      el
        .getAnimations({ subtree: true })
        .filter(
          (animation) =>
            (animation.effect as KeyframeEffect).pseudoElement === '::before',
        )
        .map((animation) => {
          const timing = (animation.effect as KeyframeEffect).getTiming();
          return {
            iterations: Number(timing.iterations),
            delay: Number(timing.delay),
            fill: String(timing.fill),
          };
        }),
    );
  }

  // Jump every pulse animation on the widget to its end, as if it had played out
  async finishPulse(widget: Locator) {
    await widget.evaluate((el) => {
      el.getAnimations({ subtree: true }).forEach((animation) =>
        animation.finish(),
      );
    });
  }

  // Freeze the pulse at the widest point of its last cycle
  async freezePulseNearEnd(widget: Locator) {
    await widget.evaluate((el) => {
      const NEAR_END = 0.95;
      el.getAnimations({ subtree: true }).forEach((animation) => {
        const timing = (animation.effect as KeyframeEffect).getComputedTiming();
        animation.pause();
        animation.currentTime =
          Number(timing.delay) + Number(timing.activeDuration) * NEAR_END;
      });
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
