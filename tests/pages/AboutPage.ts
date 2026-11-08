import type { Locator, Page } from '@playwright/test';
import { routes } from '../config/testData';
import { ABOUT_EXPERIENCE_LABEL, ABOUT_VISIT_HEADING } from '@/app/about/page';

// No auto-navigation on construction: the About tests also start from the homepage
export class AboutPage {
  readonly page: Page;
  readonly h1: Locator;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h1 = page.getByRole('heading', { level: 1 });
    this.main = page.getByRole('main');
  }

  // Scoped to main: the Navbar dropdown has links with the same names
  serviceLink(title: string): Locator {
    return this.main.getByRole('link', { name: title, exact: true });
  }

  async goto() {
    return this.page.goto(routes.about);
  }

  // The facts panel beside the intro: the label sits three levels inside it
  introPanel(): Locator {
    return this.main
      .getByText(ABOUT_EXPERIENCE_LABEL, { exact: true })
      .locator('../../..');
  }

  // The category cards' grid: the parent of the cards, each led by an h3
  categoryGrid(): Locator {
    return this.main
      .getByRole('heading', { level: 3 })
      .first()
      .locator('../..');
  }

  categoryCards(): Locator {
    return this.categoryGrid().locator(':scope > *');
  }

  // The Find Us panel: its h2 sits three levels inside it
  findUsPanel(): Locator {
    return this.main
      .getByRole('heading', { level: 2, name: ABOUT_VISIT_HEADING })
      .locator('../../..');
  }
}
