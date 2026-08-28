import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Gauge } from 'lucide-react';
import Navbar from './Navbar';
import { TEL_MOBILE_LINK, PHONE_MOBILE } from '@/lib/constants';
import type { ServiceCategories } from '@/types/service';
import userEvent from '@testing-library/user-event';

// Use mock services to show
const mockCategories: ServiceCategories = {
  'Remap / Tuning': [
    {
      slug: 'stage-1-tuning',
      title: 'Stage 1 Tuning',
      category: 'Remap / Tuning',
      shortDescription: 'Performance remapping',
      body: 'Placeholder',
      icon: Gauge,
      popular: true,
    },
  ],
};

describe('Navbar', () => {
  it('Renders the logo linking home', () => {
    render(<Navbar categories={mockCategories} />);
    expect(screen.getByRole('link', { name: /logo/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('Renders the Services trigger', () => {
    render(<Navbar categories={mockCategories} />);
    expect(
      screen.getByRole('button', { name: 'Services' }),
    ).toBeInTheDocument();
  });

  it('Renders the About link', () => {
    render(<Navbar categories={mockCategories} />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
  });

  it('Renders the CTA with the phone number and correct href', () => {
    render(<Navbar categories={mockCategories} />);
    const cta = screen.getByRole('link', {
      name: new RegExp(`Get a Quote.*${PHONE_MOBILE}`),
    });
    expect(cta).toHaveAttribute('href', TEL_MOBILE_LINK);
  });

  it('Renders the mobile menu button', () => {
    render(<Navbar categories={mockCategories} />);
    expect(
      screen.getByRole('button', { name: 'Open menu' }),
    ).toBeInTheDocument();
  });

  it('Passes serializable category data through to MobileMenu', async () => {
    const user = userEvent.setup();
    render(<Navbar categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    // Restrict query to mobile panel
    const mobileNav = within(
      screen.getByRole('navigation', { name: 'Mobile' }),
    );

    expect(mobileNav.getByText('Remap / Tuning')).toBeInTheDocument();
    expect(
      mobileNav.getByRole('link', { name: 'Stage 1 Tuning' }),
    ).toHaveAttribute('href', '/services/stage-1-tuning');
  });
});
