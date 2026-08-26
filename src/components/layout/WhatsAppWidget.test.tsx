import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhatsAppWidget from './WhatsAppWidget';
import { WHATSAPP_LINK } from '@/lib/constants';

describe('WhatsAppWidget', () => {
  it('Renders a link', () => {
    render(<WhatsAppWidget />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Links to the correct WhatsApp URL', () => {
    render(<WhatsAppWidget />);
    expect(screen.getByRole('link')).toHaveAttribute('href', WHATSAPP_LINK);
  });

  it('Has an accessible label', () => {
    render(<WhatsAppWidget />);
    expect(
      screen.getByRole('link', { name: 'Chat with us on WhatsApp' }),
    ).toBeInTheDocument();
  });

  it('Opens in a new tab safely', () => {
    render(<WhatsAppWidget />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('Hides the icon from screen readers', () => {
    const { container } = render(<WhatsAppWidget />);
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});
