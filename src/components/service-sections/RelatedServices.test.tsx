// components/service-sections/RelatedServices.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Filter, Cpu } from 'lucide-react';
import { RelatedServices } from './RelatedServices';
import type { Service } from '@/types/service';

const mockRelatedServices: Service[] = [
  {
    slug: 'dpf-egr-solutions',
    title: 'DPF / EGR Solutions',
    category: 'Remap / Tuning',
    shortDescription: 'Diagnostics and solutions.',
    body: 'Placeholder content.',
    icon: Filter,
  },
  {
    slug: 'tuning-freaks-bootmod',
    title: 'Tuning Freaks Bootmod',
    category: 'Remap / Tuning',
    shortDescription: 'Bootmod3 tuning.',
    body: 'Placeholder content.',
    icon: Cpu,
  },
];

describe('RelatedServices', () => {
  it('Renders a link for every related service', () => {
    render(<RelatedServices relatedServices={mockRelatedServices} />);
    expect(
      screen.getByRole('link', { name: /dpf \/ egr solutions/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /tuning freaks bootmod/i }),
    ).toBeInTheDocument();
  });

  it('Renders nothing when there are no related services', () => {
    const { container } = render(<RelatedServices relatedServices={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
