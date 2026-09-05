// components/service-sections/ServiceHero.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gauge } from 'lucide-react';
import { ServiceHero } from './ServiceHero';
import type { Service } from '@/types/service';
import type { CategoryTheme } from '@/lib/service-themes';
import { TEL_MOBILE_LINK } from '@/lib/constants';

const mockService: Service = {
  slug: 'stage-1-tuning',
  title: 'Stage 1 Tuning',
  category: 'Remap / Tuning',
  shortDescription: 'Performance remapping for increased power and torque',
  body: 'Placeholder content.',
  icon: Gauge,
};

const mockTheme: CategoryTheme = {
  eyebrow: 'Remap & Tuning',
  heroImage: '/images/services/tuning.jpg',
  overlayClassName: 'bg-black/50',
  motifClassName: 'bg-transparent',
};

describe('ServiceHero', () => {
  it('Renders the service title as the page h1', () => {
    render(<ServiceHero service={mockService} theme={mockTheme} />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Stage 1 Tuning' }),
    ).toBeInTheDocument();
  });

  it('Renders the category eyebrow', () => {
    render(<ServiceHero service={mockService} theme={mockTheme} />);
    expect(screen.getByText('Remap & Tuning')).toBeInTheDocument();
  });

  it('Renders the short description', () => {
    render(<ServiceHero service={mockService} theme={mockTheme} />);
    expect(
      screen.getByText('Performance remapping for increased power and torque'),
    ).toBeInTheDocument();
  });

  it('Renders a call CTA with the correct tel: href', () => {
    render(<ServiceHero service={mockService} theme={mockTheme} />);
    expect(screen.getByRole('link', { name: /call now/i })).toHaveAttribute(
      'href',
      TEL_MOBILE_LINK,
    );
  });
});
