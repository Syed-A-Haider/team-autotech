// components/service-sections/ServicePageTemplate.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gauge, Filter } from 'lucide-react';
import { ServicePageTemplate } from './ServicePageTemplate';
import type { Service } from '@/types/service';
import type { CategoryTheme } from '@/lib/service-themes';

const mockService: Service = {
  slug: 'stage-1-tuning',
  title: 'Stage 1 Tuning',
  category: 'Remap / Tuning',
  shortDescription: 'Performance remapping.',
  body: 'Placeholder content.',
  icon: Gauge,
};

const mockTheme: CategoryTheme = {
  eyebrow: 'Remap & Tuning',
  heroImage: '/images/services/tuning.jpg',
  overlayClassName: 'bg-black/50',
  motifClassName: 'bg-transparent',
};

describe('ServicePageTemplate', () => {
  it('Renders exactly one h1, from the hero', () => {
    render(
      <ServicePageTemplate
        service={mockService}
        theme={mockTheme}
        relatedServices={[]}
      >
        <p>Body content</p>
      </ServicePageTemplate>,
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('Renders the children passed in as the main body', () => {
    render(
      <ServicePageTemplate
        service={mockService}
        theme={mockTheme}
        relatedServices={[]}
      >
        <p>Coming soon content</p>
      </ServicePageTemplate>,
    );
    expect(screen.getByText('Coming soon content')).toBeInTheDocument();
  });

  it('Does not render the CTA band when the service is coming-soon', () => {
    render(
      <ServicePageTemplate
        service={mockService}
        theme={mockTheme}
        relatedServices={[]}
      >
        <p>Body</p>
      </ServicePageTemplate>,
    );
    expect(
      screen.queryByRole('heading', { name: /interested in stage 1 tuning/i }),
    ).not.toBeInTheDocument();
  });

  it('Renders the CTA band when the service is live', () => {
    const liveService: Service = { ...mockService, status: 'live' };
    render(
      <ServicePageTemplate
        service={liveService}
        theme={mockTheme}
        relatedServices={[]}
      >
        <p>Body</p>
      </ServicePageTemplate>,
    );
    expect(
      screen.getByRole('heading', { name: /interested in stage 1 tuning/i }),
    ).toBeInTheDocument();
  });

  it('Renders the related services below the body', () => {
    const related: Service[] = [
      {
        slug: 'dpf-egr-solutions',
        title: 'DPF / EGR Solutions',
        category: 'Remap / Tuning',
        shortDescription: 'Diagnostics.',
        body: 'Placeholder content.',
        icon: Filter,
      },
    ];
    render(
      <ServicePageTemplate
        service={mockService}
        theme={mockTheme}
        relatedServices={related}
      >
        <p>Body</p>
      </ServicePageTemplate>,
    );
    expect(
      screen.getByRole('link', { name: /dpf \/ egr solutions/i }),
    ).toBeInTheDocument();
  });
});
