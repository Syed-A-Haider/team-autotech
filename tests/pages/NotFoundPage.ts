import type { Locator, Page } from '@playwright/test';
import { NOT_FOUND_HOME_LABEL } from '@/app/not-found';

// No auto-navigation on construction: the path varies per test
export class NotFoundPage {
  readonly page: Page;
  readonly h1: Locator;
  readonly main: Locator;
  readonly banner: Locator;
  readonly footer: Locator;
  readonly homeLink: Locator;
  readonly robotsMeta: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h1 = page.getByRole('heading', { level: 1 });
    this.main = page.getByRole('main');
    this.banner = page.getByRole('banner');
    this.footer = page.getByRole('contentinfo');
    // Scoped to main: the Navbar logo also links home
    this.homeLink = this.main.getByRole('link', { name: NOT_FOUND_HOME_LABEL });
    this.robotsMeta = page.locator('meta[name="robots"]');
  }

  async goto(path: string) {
    return this.page.goto(path);
  }
}
