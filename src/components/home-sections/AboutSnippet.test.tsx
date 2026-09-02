import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutSnippet, {
  ABOUT_EYEBROW,
  ABOUT_HEADLINE,
  ABOUT_BLURB,
  ABOUT_CTA_LABEL,
} from './AboutSnippet';

describe('AboutSnippet', () => {
  it('Renders the eyebrow label', () => {
    render(<AboutSnippet />);
    expect(screen.getByText(ABOUT_EYEBROW)).toBeInTheDocument();
  });

  it('Renders the headline as a heading', () => {
    render(<AboutSnippet />);
    expect(
      screen.getByRole('heading', { name: ABOUT_HEADLINE }),
    ).toBeInTheDocument();
  });

  it('Renders the blurb text', () => {
    render(<AboutSnippet />);
    expect(screen.getByText(ABOUT_BLURB)).toBeInTheDocument();
  });

  it('Renders a link to the About page', () => {
    render(<AboutSnippet />);
    const link = screen.getByRole('link', { name: ABOUT_CTA_LABEL });
    expect(link).toHaveAttribute('href', '/about');
  });
});
