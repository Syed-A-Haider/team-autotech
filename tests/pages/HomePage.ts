import type { Locator, Page } from '@playwright/test';
import { sectionHeading as whyChooseUsHeading } from '@/components/home-sections/WhyChooseUsSection';
import {
  FIND_US_SECTION_HEADING,
  FIND_US_DIRECTIONS_LABEL,
} from '@/components/home-sections/FindUsSection';
import {
  ABOUT_HEADLINE,
  ABOUT_CTA_LABEL,
} from '@/components/home-sections/AboutSnippet';
import { MENU_TOGGLE_OPEN_LABEL } from '@/components/layout/MobileMenu';
import { routes } from '../config/testData';

export class HomePage {
  readonly page: Page;
  readonly main: Locator;
  readonly h1: Locator;
  readonly firstServiceLink: Locator;
  readonly aboutCtaLink: Locator;
  readonly directionsLink: Locator;
  readonly menuToggleButton: Locator;

  readonly sectionHeadings = {
    whyChooseUs: whyChooseUsHeading,
    findUs: FIND_US_SECTION_HEADING,
    about: ABOUT_HEADLINE,
  };

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');
    this.h1 = page.getByRole('heading', { level: 1 });
    this.firstServiceLink = this.main
      .locator(`a[href^="${routes.servicesPrefix}"]`)
      .first();
    this.aboutCtaLink = this.main.getByRole('link', {
      name: ABOUT_CTA_LABEL,
    });
    this.directionsLink = page.getByRole('link', {
      name: FIND_US_DIRECTIONS_LABEL,
    });
    this.menuToggleButton = page.getByRole('button', {
      name: MENU_TOGGLE_OPEN_LABEL,
    });
  }

  async goto() {
    await this.page.goto(routes.home);
  }

  async allSectionHeadings(): Promise<string[]> {
    return this.page.getByRole('heading', { level: 2 }).allTextContents();
  }
}
