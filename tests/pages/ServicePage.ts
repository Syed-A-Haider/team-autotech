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
