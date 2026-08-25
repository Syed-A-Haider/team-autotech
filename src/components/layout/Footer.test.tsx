import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

const OPENING_HOURS_WEEKDAYS = 'Monday - Friday: 10:00AM - 5:30PM';
const OPENING_HOURS_WEEKEND = 'Saturday - Sunday: Closed';

describe('Footer', () => {
  it('renders a contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the business name', () => {
    render(<Footer />);
    expect(screen.getByText('Team Autotech')).toBeInTheDocument();
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
    expect(screen.getByText(/Unit 4E Wenning St/)).toBeInTheDocument();
    expect(screen.getByText(/BB9 0LE/)).toBeInTheDocument();
  });

  it('renders the landline as a correct tel: link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Landline/ })).toHaveAttribute(
      'href',
      'tel:+441282787576',
    );
  });

  it('renders the mobile number as a correct tel: link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Mobile/ })).toHaveAttribute(
      'href',
      'tel:+447515007688',
    );
  });

  it('renders a correct mailto: link', () => {
    render(<Footer />);
    expect(
      screen.getByRole('link', { name: /teamautotech@outlook.com/ }),
    ).toHaveAttribute('href', 'mailto:teamautotech@outlook.com');
  });

  it('renders the WhatsApp text link (ContactLine) with correct href and safe external attributes', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'WhatsApp Us' });
    expect(link).toHaveAttribute(
      'href',
      'https://api.whatsapp.com/send?phone=447515007688&text=Hi%2C%20How%20can%20we%20help%3F',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the Google profile link with correct href and safe external attributes', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Find Us on Google' });
    expect(link).toHaveAttribute(
      'href',
      'https://share.google/h5RwgH5kJAwaGiQWk',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a distinct, emphasized WhatsApp icon in the social row', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Chat on WhatsApp' });
    expect(link).toHaveAttribute(
      'href',
      'https://api.whatsapp.com/send?phone=447515007688&text=Hi%2C%20How%20can%20we%20help%3F',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders social links with correct hrefs and accessible labels', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
      'href',
      'https://facebook.com/teamautotechuk',
    );
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://instagram.com/teamautotech',
    );
    expect(screen.getByRole('link', { name: 'Youtube' })).toHaveAttribute(
      'href',
      'https://www.youtube.com/channel/UCokP_BpT-Yw5ANsHOAOUSnQ',
    );
  });

  it('renders opening hours', () => {
    render(<Footer />);
    expect(screen.getByText(OPENING_HOURS_WEEKDAYS)).toBeInTheDocument();
    expect(screen.getByText(OPENING_HOURS_WEEKEND)).toBeInTheDocument();
  });

  it('renders the current year in the copyright line', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
