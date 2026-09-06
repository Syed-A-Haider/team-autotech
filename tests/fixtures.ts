import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/ServicePage';

interface Fixtures {
  homePage: HomePage;
  servicePage: ServicePage;
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
});

export { expect } from '@playwright/test';
