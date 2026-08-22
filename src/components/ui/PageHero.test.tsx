import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PageHero from './PageHero';

describe('PageHero', () => {
  it('Renders the title as a level 1 heading', () => {
    render(<PageHero title="Stage 1 Tuning" />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Stage 1 Tuning' }),
    ).toBeInTheDocument();
  });

  it('Renders the subtitle when provided', () => {
    render(<PageHero title="Stage 1 Tuning" subtitle="Unlock more power" />);
    expect(screen.getByText('Unlock more power')).toBeInTheDocument();
  });

  it('Does not render a subtitle when none is provided', () => {
    render(<PageHero title="Stage 1 Tuning" />);
    expect(screen.queryByText('Unlock more power')).not.toBeInTheDocument();
  });
});
