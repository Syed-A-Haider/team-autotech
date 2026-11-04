import { describe, it, expect } from 'vitest';
import { serviceHref } from './routes';

describe('serviceHref', () => {
  it('builds the service page path from a slug', () => {
    expect(serviceHref('stage-1-tuning')).toBe('/services/stage-1-tuning');
  });
});
