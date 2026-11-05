import type { Locator, Page } from '@playwright/test';
import {
  sectionHeading as whyChooseUsHeading,
  whyChooseUsItems,
} from '@/components/home-sections/WhyChooseUsSection';
import {
  FIND_US_SECTION_HEADING,
  FIND_US_DIRECTIONS_LABEL,
} from '@/components/home-sections/FindUsSection';
import {
  ABOUT_HEADLINE,
  ABOUT_CTA_LABEL,
} from '@/components/home-sections/AboutSnippet';
import { MENU_TOGGLE_OPEN_LABEL } from '@/components/layout/MobileMenu';
import { WHATSAPP_WIDGET_LABEL } from '@/components/layout/WhatsAppWidget';
import {
  callButtonLabel,
  footerSocialLabel,
  navLabels,
  routes,
} from '../config/testData';

export class HomePage {
  readonly page: Page;
  readonly main: Locator;
  readonly html: Locator;
  readonly metaDescription: Locator;
  readonly h1: Locator;
  readonly firstServiceLink: Locator;
  readonly aboutCtaLink: Locator;
  readonly navAboutLink: Locator;
  readonly navServicesButton: Locator;
  // First row of the Services dropdown (hidden until the button is hovered)
  readonly navDropdownLink: Locator;
  // Header call button on desktop, hidden below lg
  readonly headerCallLink: Locator;
  // Hero call button, shown below lg only
  readonly heroCallLink: Locator;
  readonly footerSocialLink: Locator;
  readonly whatsAppWidget: Locator;
  readonly directionsLink: Locator;
  readonly menuToggleButton: Locator;
  readonly header: Locator;
  readonly servicesSection: Locator;
  // The four Why Choose Us items, found by their copy. The h3 title is the
  // anchor: its parent is the card
  readonly whyChooseUsDescriptions: Locator;
  readonly whyChooseUsTitles: Locator;
  readonly whyChooseUsCards: Locator;

  readonly sectionHeadings = {
    whyChooseUs: whyChooseUsHeading,
    findUs: FIND_US_SECTION_HEADING,
    about: ABOUT_HEADLINE,
  };

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');
    this.html = page.locator('html');
    this.metaDescription = page.locator('meta[name="description"]');
    this.h1 = page.getByRole('heading', { level: 1 });
    this.firstServiceLink = this.main
      .locator(`a[href^="${routes.servicesPrefix}"]`)
      .first();
    this.aboutCtaLink = this.main.getByRole('link', {
      name: ABOUT_CTA_LABEL,
    });
    const mainNav = page.getByRole('navigation', { name: navLabels.main });
    this.navAboutLink = mainNav.getByRole('link', { name: navLabels.about });
    this.navServicesButton = mainNav.getByRole('button', {
      name: navLabels.services,
    });
    this.navDropdownLink = mainNav.getByRole('link').first();
    this.headerCallLink = page
      .getByRole('banner')
      .getByRole('link', { name: callButtonLabel });
    this.heroCallLink = page
      .getByRole('main')
      .getByRole('link', { name: callButtonLabel });
    this.footerSocialLink = page
      .getByRole('contentinfo')
      .getByRole('link', { name: footerSocialLabel });
    this.whatsAppWidget = page.getByRole('link', {
      name: WHATSAPP_WIDGET_LABEL,
    });
    this.directionsLink = page.getByRole('link', {
      name: FIND_US_DIRECTIONS_LABEL,
    });
    this.menuToggleButton = page.getByRole('button', {
      name: MENU_TOGGLE_OPEN_LABEL,
    });
    this.header = page.getByRole('banner');
    this.servicesSection = page.locator('#services');
    this.whyChooseUsDescriptions = this.anyOf(
      whyChooseUsItems.map(({ description }) =>
        this.main.getByText(description, { exact: true }),
      ),
    );
    this.whyChooseUsTitles = this.anyOf(
      whyChooseUsItems.map(({ title }) =>
        this.main.getByRole('heading', { level: 3, name: title, exact: true }),
      ),
    );
    this.whyChooseUsCards = this.whyChooseUsTitles.locator('..');
  }

  // One locator that matches any of the given ones
  private anyOf(locators: Locator[]): Locator {
    return locators.reduce((all, next) => all.or(next));
  }

  async goto() {
    await this.page.goto(routes.home);
  }

  async gotoServicesAnchor() {
    await this.page.goto(routes.homeServices);
  }

  // Pixels between the bottom of the sticky header and the top of the services
  // section. Negative means the header covers the start of the section
  async servicesGapBelowHeader(): Promise<number> {
    const headerBottom = await this.header.evaluate(
      (el) => el.getBoundingClientRect().bottom,
    );
    const sectionTop = await this.servicesSection.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    return sectionTop - headerBottom;
  }

  async allSectionHeadings(): Promise<string[]> {
    return this.page.getByRole('heading', { level: 2 }).allTextContents();
  }
}
