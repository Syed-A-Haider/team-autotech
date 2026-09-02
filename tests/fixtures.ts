import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';

interface Fixtures {
  homePage: HomePage;
}

// Wraps HomePage init + navigation so every test starts from a ready page,
// no repeated goto()/beforeEach boilerplate per test.
export const test = base.extend<Fixtures>({
  homePage: [
    async ({ page }, use) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await use(homePage);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
