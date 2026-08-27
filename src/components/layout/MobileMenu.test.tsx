import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MobileMenu, { type MobileMenuCategories } from './MobileMenu';

const mockCategories: MobileMenuCategories = {
  'Remap / Tuning': [{ slug: 'stage-1-tuning', title: 'Stage 1 Tuning' }],
  'Auto Security': [
    { slug: 'ghost-immobiliser-ii', title: 'Ghost Immobiliser II' },
  ],
};

describe('MobileMenu', () => {
  it('Renders closed by default', () => {
    render(<MobileMenu categories={mockCategories} />);

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('Marks the panel inert while closed', () => {
    render(<MobileMenu categories={mockCategories} />);

    expect(document.getElementById('mobile-menu-panel')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('Opens on trigger click and reveals top-level links', async () => {
    const user = userEvent.setup();
    render(<MobileMenu categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('Renders every category as an accordion summary', async () => {
    const user = userEvent.setup();
    render(<MobileMenu categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(screen.getByText('Remap / Tuning')).toBeInTheDocument();
    expect(screen.getByText('Auto Security')).toBeInTheDocument();
  });

  it('Renders each service as a link to its slug', async () => {
    const user = userEvent.setup();
    render(<MobileMenu categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(
      screen.getByRole('link', { name: 'Stage 1 Tuning' }),
    ).toHaveAttribute('href', '/services/stage-1-tuning');
    expect(
      screen.getByRole('link', { name: 'Ghost Immobiliser II' }),
    ).toHaveAttribute('href', '/services/ghost-immobiliser-ii');
  });

  it('Closes when a top-level link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileMenu categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('link', { name: 'Home' }));

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('Closes when a service link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileMenu categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('link', { name: 'Stage 1 Tuning' }));

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('Closes when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<MobileMenu categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.keyboard('{Escape}');

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('Closes when the trigger is clicked again while open', async () => {
    const user = userEvent.setup();
    render(<MobileMenu categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('button', { name: 'Close menu' }));

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('Includes the phone CTA but no WhatsApp link', async () => {
    const user = userEvent.setup();
    render(<MobileMenu categories={mockCategories} />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(screen.getByText(/Get a Quote/i)).toBeInTheDocument();
    expect(screen.queryByText(/whatsapp/i)).not.toBeInTheDocument();
  });
});
