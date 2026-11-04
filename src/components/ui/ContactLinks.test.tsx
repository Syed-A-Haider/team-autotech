import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactLinks, CALL_LABEL, WHATSAPP_LABEL } from './ContactLinks';
import { PHONE_MOBILE, TEL_MOBILE_LINK, WHATSAPP_LINK } from '@/lib/constants';

describe('ContactLinks', () => {
  it('Renders exactly two links: Call and WhatsApp', () => {
    render(<ContactLinks />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('Links Call to the mobile number', () => {
    render(<ContactLinks />);
    const link = screen.getByRole('link', { name: new RegExp(CALL_LABEL) });
    expect(link).toHaveAttribute('href', TEL_MOBILE_LINK);
  });

  it('Puts the number in the Call link, hidden below the sm breakpoint', () => {
    render(<ContactLinks />);
    const number = screen.getByText(new RegExp(PHONE_MOBILE));
    expect(number.closest('a')).toHaveAttribute('href', TEL_MOBILE_LINK);
    expect(number).toHaveClass('hidden', 'sm:inline');
  });

  it('Opens WhatsApp in a new tab, safely', () => {
    render(<ContactLinks />);
    const link = screen.getByRole('link', {
      name: new RegExp(WHATSAPP_LABEL),
    });
    expect(link).toHaveAttribute('href', WHATSAPP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('Does not render an email link', () => {
    render(<ContactLinks />);
    expect(screen.queryByRole('link', { name: /email/i })).toBeNull();
  });

  it('Hides every icon from assistive tech', () => {
    const { container } = render(<ContactLinks />);
    const icons = container.querySelectorAll('svg');
    expect(icons).toHaveLength(2);
    icons.forEach((icon) =>
      expect(icon).toHaveAttribute('aria-hidden', 'true'),
    );
  });

  it('Passes className to the wrapper', () => {
    const { container } = render(<ContactLinks className="mt-8" />);
    expect(container.firstElementChild).toHaveClass('mt-8');
  });
});
