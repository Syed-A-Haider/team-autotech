import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection, HERO_HEADLINE, HERO_SUBTITLE } from './HeroSection';
import { TEL_LANDLINE_LINK, PHONE_LANDLINE } from '@/lib/constants';

describe('HeroSection', () => {
  it('Renders the single page heading', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      HERO_HEADLINE,
    );
  });

  it('Renders the "Home of Auto Solutions" subtitle', () => {
    render(<HeroSection />);
    expect(screen.getByText(HERO_SUBTITLE)).toBeInTheDocument();
  });

  it('Renders a CTA linking to the landline', () => {
    render(<HeroSection />);
    const cta = screen.getByRole('link', {
      name: (name) => name.startsWith('Get a Quote'),
    });
    expect(cta).toHaveTextContent(PHONE_LANDLINE);
    expect(cta).toHaveAttribute('href', TEL_LANDLINE_LINK);
  });

  it('Renders a decorative background image with no announced alt text', () => {
    const { container } = render(<HeroSection />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt', '');
  });
});
