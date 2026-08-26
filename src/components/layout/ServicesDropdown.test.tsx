import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Gauge, ShieldCheck } from 'lucide-react';
import ServicesDropdown from './ServicesDropdown';
import type { ServiceCategories } from '@/types/service';

// Use mock services for testing purposes
const mockCategories: ServiceCategories = {
  'Remap / Tuning': [
    {
      slug: 'stage-1-tuning',
      title: 'Stage 1 Tuning',
      category: 'Remap / Tuning',
      shortDescription: 'Performance remapping',
      body: 'Placeholder',
      icon: Gauge,
      featured: true,
    },
  ],
  'Auto Security': [
    {
      slug: 'ghost-immobiliser-ii',
      title: 'Ghost Immobiliser II',
      category: 'Auto Security',
      shortDescription: 'CAN bus immobiliser',
      body: 'Placeholder',
      icon: ShieldCheck,
    },
  ],
};

describe('ServicesDropdown', () => {
  it('Renders a heading for each category', () => {
    render(<ServicesDropdown categories={mockCategories} />);
    expect(screen.getByText('Remap / Tuning')).toBeInTheDocument();
    expect(screen.getByText('Auto Security')).toBeInTheDocument();
  });

  it('Links each service to its page', () => {
    render(<ServicesDropdown categories={mockCategories} />);
    expect(
      screen.getByRole('link', { name: /Stage 1 Tuning/ }),
    ).toHaveAttribute('href', '/services/stage-1-tuning');
  });

  it('Shows a Popular tag only on featured services', () => {
    render(<ServicesDropdown categories={mockCategories} />);
    expect(
      screen.getByRole('link', { name: /Stage 1 Tuning/ }),
    ).toHaveTextContent('Popular');
    expect(
      screen.getByRole('link', { name: /Ghost Immobiliser II/ }),
    ).not.toHaveTextContent('Popular');
  });
});
