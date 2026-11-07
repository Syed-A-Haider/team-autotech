import type { Locator, Page } from '@playwright/test';
import { routes } from '../config/testData';

// No auto-navigation on construction — slug varies per test,
// unlike HomePage which always goes to the same URL.
export class ServicePage {
  readonly page: Page;
  readonly h1: Locator;
  // Scoped to main: the header menus have their own details elements
  readonly faqRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h1 = page.getByRole('heading', { level: 1 });
    this.faqRows = page.locator('main details');
  }

  async goto(slug: string) {
    return this.page.goto(routes.service(slug));
  }

  // The hero text column: the eyebrow, h1, description and call button
  // share it. The hero box is its parent
  heroText(): Locator {
    return this.h1.locator('..');
  }

  heroEyebrow(): Locator {
    return this.heroText().locator(':scope > p').first();
  }

  heroDescription(): Locator {
    return this.heroText().locator(':scope > p').nth(1);
  }

  heroCallButton(): Locator {
    return this.heroText().locator(':scope > a');
  }

  heroImage(): Locator {
    return this.heroText().locator('..').locator(':scope > img');
  }

  // The category motif is the second decorative layer over the image
  heroMotif(): Locator {
    return this.heroText()
      .locator('..')
      .locator(':scope > div[aria-hidden="true"]')
      .nth(1);
  }

  // Animations running on the call button's ::after (the sheen sweep)
  async heroSheenCount(): Promise<number> {
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

  // A numbered section, found by its h2
  section(title: string): Locator {
    return this.page.locator('main section', {
      has: this.page.getByRole('heading', { level: 2, name: title }),
    });
  }

  // The body of a prose section: its parent holds the paragraphs
  proseBlock(): Locator {
    return this.page.locator('main section p').first().locator('..');
  }

  stepsList(title: string): Locator {
    return this.section(title).getByRole('list');
  }

  // The skewed number badge of a step, and the number inside it
  stepBadge(title: string, index: number): Locator {
    return this.stepsList(title)
      .getByRole('listitem')
      .nth(index)
      .locator(':scope > span');
  }

  stepNumber(title: string, index: number): Locator {
    return this.stepBadge(title, index).locator(':scope > span');
  }

  featureList(title: string): Locator {
    return this.section(title).getByRole('list');
  }

  // The reveal wrapper around the player: the figure's first child
  videoWrapper(): Locator {
    return this.page.locator('main figure').locator(':scope > div').first();
  }

  videoCaption(): Locator {
    return this.page.locator('main figure figcaption');
  }

  faqRow(index: number): Locator {
    return this.faqRows.nth(index);
  }

  // summary has no ARIA role, so it is found by tag within its row
  faqSummary(index: number): Locator {
    return this.faqRow(index).locator('summary');
  }

  // Everything in the row except the summary
  faqAnswer(index: number): Locator {
    return this.faqRow(index).locator(':scope > :not(summary)');
  }

  // Animations running on the answer itself, so the chevron's own
  // transition cannot stand in for the answer's motion
  async faqAnswerAnimationCount(index: number): Promise<number> {
    return this.faqAnswer(index).evaluate((el) => el.getAnimations().length);
  }
}
