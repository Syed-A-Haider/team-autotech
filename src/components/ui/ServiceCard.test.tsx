import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Wrench } from 'lucide-react';
import ServiceCard from './ServiceCard';
import type { Service } from '@/types/service';

// Don't rely on changing real service, use mock instead
const mockService: Service = {
  slug: 'stage-1-tuning',
  title: 'Stage 1 Tuning',
  category: 'Remap / Tuning',
  shortDescription: 'Unlock more power and torque from your engine.',
  body: 'Placeholder body copy.',
  icon: Wrench,
};

describe('ServiceCard', () => {
  it('Renders the title', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Stage 1 Tuning')).toBeInTheDocument();
  });

  it('Renders the short description', () => {
    render(<ServiceCard service={mockService} />);
    expect(
      screen.getByText('Unlock more power and torque from your engine.'),
    ).toBeInTheDocument();
  });

  it('Renders the category', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Remap / Tuning')).toBeInTheDocument();
  });

  it('Links to the correct service page', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/services/stage-1-tuning',
    );
  });

  it('Does not show a "Popular" badge when not featured', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.queryByText('Popular')).not.toBeInTheDocument();
  });

  it('Shows a "Popular" badge when featured', () => {
    // Render the mockservice, keeping all values the same except for featured
    render(<ServiceCard service={{ ...mockService, featured: true }} />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });
});
