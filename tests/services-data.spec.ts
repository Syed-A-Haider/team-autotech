// Guard against duplicate slugs
import { test, expect } from '@playwright/test';
import { getAllServices } from '@/lib/services';

test('All slugs are unique', () => {
  const services = getAllServices();
  const slugs = services.map((s) => s.slug);

  // Set removes duplicates, if any removed, length will not be the same
  expect(new Set(slugs).size).toBe(slugs.length);
});
