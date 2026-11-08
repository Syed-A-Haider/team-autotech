import { describe, it, expect, vi } from 'vitest';
import { Wrench } from 'lucide-react';
import { generateStaticParams, generateMetadata } from './page';
import { getAllServices, getServiceBySlug } from '@/lib/services';
import type { Service } from '@/types/service';

// Keeps the real getters, so a test can swap in a fixture for one call
vi.mock('@/lib/services', { spy: true });

function makeService(status?: Service['status']): Service {
  return {
    slug: 'fixture-service',
    title: 'Fixture Service',
    category: 'Programming',
    shortDescription: 'Fixture',
    icon: Wrench,
    status,
  };
}

async function metadataFor(service: Service) {
  vi.mocked(getServiceBySlug).mockReturnValueOnce(service);
  return generateMetadata({ params: Promise.resolve({ slug: service.slug }) });
}

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

  // A fixture, so these still test the rule once every real page is live
  it('Sets noindex robots for a coming-soon service', async () => {
    const metadata = await metadataFor(makeService('coming-soon'));

    expect(metadata.robots).toEqual({ index: false });
  });

  it('Treats a service with no status as coming-soon and sets noindex', async () => {
    const metadata = await metadataFor(makeService());

    expect(metadata.robots).toEqual({ index: false });
  });

  it('Leaves a live service indexable by setting no robots rule', async () => {
    const metadata = await metadataFor(makeService('live'));

    expect(metadata).not.toHaveProperty('robots');
  });

  it('Returns empty metadata for an unknown slug', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'not-a-real-service' }),
    });

    expect(metadata).toEqual({});
  });
});
