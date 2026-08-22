import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LinkButton from './LinkButton';

describe('LinkButton', () => {
  it('Renders its children', () => {
    render(<LinkButton href="/services">Book Now</LinkButton>);
    expect(screen.getByText('Book Now')).toBeInTheDocument();
  });

  it('Links to the correct href', () => {
    render(<LinkButton href="/services">Book Now</LinkButton>);
    expect(screen.getByRole('link', { name: 'Book Now' })).toHaveAttribute(
      'href',
      '/services',
    );
  });

  it('Defaults to the primary variant', () => {
    render(<LinkButton href="/services">Book Now</LinkButton>);
    expect(screen.getByRole('link')).toHaveClass('bg-accent');
  });

  it('Applies secondary variant classes', () => {
    render(
      <LinkButton href="/services" variant="secondary">
        Book Now
      </LinkButton>,
    );
    expect(screen.getByRole('link')).toHaveClass('border');
  });

  it('Applies ghost variant classes', () => {
    render(
      <LinkButton href="/services" variant="ghost">
        Book Now
      </LinkButton>,
    );
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('bg-accent');
    expect(link).not.toHaveClass('border');
  });

  it('Defaults to medium size', () => {
    render(<LinkButton href="/services">Book Now</LinkButton>);
    expect(screen.getByRole('link')).toHaveClass('text-base');
  });

  it('Applies small and large size classes', () => {
    render(
      <LinkButton href="/services" size="sm">
        Book Now
      </LinkButton>,
    );
    expect(screen.getByRole('link')).toHaveClass('text-sm');
  });

  it('Adds target and rel attributes when external', () => {
    render(
      <LinkButton href="https://wa.me/447515007688" external>
        WhatsApp Us
      </LinkButton>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('Does not add target attribute for internal links', () => {
    render(<LinkButton href="/services">Book Now</LinkButton>);
    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });

  it('Applies fullWidth class when specified', () => {
    render(
      <LinkButton href="/services" fullWidth>
        Book Now
      </LinkButton>,
    );
    expect(screen.getByRole('link')).toHaveClass('w-full');
  });
});
