// Smoke tests: bare minimum checks that the site is alive — page loads, correct title, no crash on render.

import { siteConfig } from '@/lib/constants';
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Team AutoTech');
});

test('Root Layout sets lang and description', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator("meta[name='description']")).toHaveAttribute(
    'content',
    siteConfig.description,
  );
});
