import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Phone } from 'lucide-react';
import ContactLine from './ContactLine';

describe('ContactLine', () => {
  it('Renders the link text and href', () => {
    render(
      <ContactLine icon={<Phone />} href="tel:+441234567890">
        01234 567890
      </ContactLine>,
    );
    expect(screen.getByRole('link', { name: '01234 567890' })).toHaveAttribute(
      'href',
      'tel:+441234567890',
    );
  });

  it('Does not open in a new tab by default', () => {
    render(
      <ContactLine icon={<Phone />} href="tel:+441234567890">
        01234 567890
      </ContactLine>,
    );
    expect(
      screen.getByRole('link', { name: '01234 567890' }),
    ).not.toHaveAttribute('target');
  });

  it('Opens in a new tab when external is set', () => {
    render(
      <ContactLine icon={<Phone />} href="https://example.com" external>
        Visit
      </ContactLine>,
    );
    const link = screen.getByRole('link', { name: 'Visit' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
