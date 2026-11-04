import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';
import {
  ADDRESS,
  EMAIL,
  GOOGLE_PROFILE_LINK,
  MAILTO_LINK,
  OPENING_HOURS,
  SOCIAL_LINKS,
  TEL_LANDLINE_LINK,
  TEL_MOBILE_LINK,
  WHATSAPP_LINK,
  siteConfig,
} from '@/lib/constants';

describe('Footer', () => {
  it('renders a contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the business name', () => {
    render(<Footer />);
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
  });

  it('renders a footer navigation landmark with Home and About links', () => {
    render(<Footer />);
    expect(
      screen.getByRole('navigation', { name: 'Footer' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
  });

  it('renders the address text', () => {
    render(<Footer />);
    expect(screen.getByText(ADDRESS)).toBeInTheDocument();
  });

  it('renders the landline as a correct tel: link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Landline/ })).toHaveAttribute(
      'href',
      TEL_LANDLINE_LINK,
    );
  });

  it('renders the mobile number as a correct tel: link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Mobile/ })).toHaveAttribute(
      'href',
      TEL_MOBILE_LINK,
    );
  });

  it('renders a correct mailto: link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: EMAIL })).toHaveAttribute(
      'href',
      MAILTO_LINK,
    );
  });

  it('renders the WhatsApp text link (ContactLine) with correct href and safe external attributes', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'WhatsApp Us' });
    expect(link).toHaveAttribute('href', WHATSAPP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the Google profile link with correct href and safe external attributes', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Find Us on Google' });
    expect(link).toHaveAttribute('href', GOOGLE_PROFILE_LINK);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a distinct, emphasized WhatsApp icon in the social row', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Chat on WhatsApp' });
    expect(link).toHaveAttribute('href', WHATSAPP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders social links with correct hrefs and accessible labels', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
      'href',
      SOCIAL_LINKS.facebook,
    );
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      SOCIAL_LINKS.instagram,
    );
    expect(screen.getByRole('link', { name: 'Youtube' })).toHaveAttribute(
      'href',
      SOCIAL_LINKS.youtube,
    );
  });

  it('renders opening hours', () => {
    render(<Footer />);
    expect(screen.getByText(OPENING_HOURS.weekdays)).toBeInTheDocument();
    expect(screen.getByText(OPENING_HOURS.weekend)).toBeInTheDocument();
  });

  it('renders the current year in the copyright line', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
