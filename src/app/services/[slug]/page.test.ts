import { describe, it, expect } from 'vitest';
import { generateStaticParams, generateMetadata } from './page';
import { getAllServices } from '@/lib/services';

describe('services/[slug] route', () => {
  it('Generates one static param per service', () => {
    const params = generateStaticParams();
    expect(params).toEqual(
      getAllServices().map((service) => ({ slug: service.slug })),
    );
  });

  it('Builds metadata from the matching service', async () => {
    const service = getAllServices()[0];
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: service.slug }),
    });

    expect(metadata.title).toBe(service.title);
    expect(metadata.description).toBe(service.shortDescription);
  });

  it('Sets noindex robots for a coming-soon service', async () => {
    const comingSoon = getAllServices().find((s) => s.status !== 'live');
    if (!comingSoon) return;

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: comingSoon.slug }),
    });

    expect(metadata.robots).toEqual({ index: false });
  });

  it('Returns empty metadata for an unknown slug', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'not-a-real-service' }),
    });

    expect(metadata).toEqual({});
  });
});
