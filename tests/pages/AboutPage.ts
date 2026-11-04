import type { Locator, Page } from '@playwright/test';
import { routes } from '../config/testData';

// No auto-navigation on construction: the About tests also start from the homepage
export class AboutPage {
  readonly page: Page;
  readonly h1: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h1 = page.getByRole('heading', { level: 1 });
  }

  async goto() {
    return this.page.goto(routes.about);
  }
}
