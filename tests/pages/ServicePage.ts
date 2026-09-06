import type { Locator, Page } from '@playwright/test';
import { routes } from '../config/testData';

// No auto-navigation on construction — slug varies per test,
// unlike HomePage which always goes to the same URL.
export class ServicePage {
  readonly page: Page;
  readonly h1: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h1 = page.getByRole('heading', { level: 1 });
  }

  async goto(slug: string) {
    return this.page.goto(routes.service(slug));
  }
}
