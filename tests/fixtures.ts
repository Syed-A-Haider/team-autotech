import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/ServicePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MotionAudit } from './pages/MotionAudit';

interface Fixtures {
  homePage: HomePage;
  servicePage: ServicePage;
  aboutPage: AboutPage;
  notFoundPage: NotFoundPage;
  motionAudit: MotionAudit;
}

export const test = base.extend<Fixtures>({
  // Navigates to '/' on first use, so only tests that ask for it load the homepage
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
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
  // Non-auto: Only the motion guard tests need it
  motionAudit: async ({ page }, use) => {
    await use(new MotionAudit(page));
  },
});

export { expect } from '@playwright/test';
