import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/ServicePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

interface Fixtures {
  homePage: HomePage;
  servicePage: ServicePage;
  aboutPage: AboutPage;
  notFoundPage: NotFoundPage;
}

export const test = base.extend<Fixtures>({
  homePage: [
    async ({ page }, use) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await use(homePage);
    },
    { auto: true },
  ],
  // Non-auto: Each service test navigates to different slug
  servicePage: async ({ page }, use) => {
    await use(new ServicePage(page));
  },
  // Non-auto: Only the About tests need it
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  // Non-auto: Only the not-found tests need it
  notFoundPage: async ({ page }, use) => {
    await use(new NotFoundPage(page));
  },
});

export { expect } from '@playwright/test';
