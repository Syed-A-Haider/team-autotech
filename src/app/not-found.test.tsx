import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound, {
  metadata,
  NOT_FOUND_CODE,
  NOT_FOUND_TITLE,
  NOT_FOUND_BODY,
  NOT_FOUND_HOME_LABEL,
} from './not-found';

describe('NotFound', () => {
  it('Renders exactly one heading, a level 1 with the title', () => {
    render(<NotFound />);
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
    expect(headings[0].tagName).toBe('H1');
    expect(headings[0]).toHaveTextContent(NOT_FOUND_TITLE);
  });

  it('Renders the explanation', () => {
    render(<NotFound />);
    expect(screen.getByText(NOT_FOUND_BODY)).toBeInTheDocument();
  });

  it('Hides the decorative 404 from assistive tech, outside the h1', () => {
    render(<NotFound />);
    const code = screen.getByText(NOT_FOUND_CODE);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(code).toHaveAttribute('aria-hidden', 'true');
    expect(h1).not.toContainElement(code);
  });

  it('Links back to the home page', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('link', { name: NOT_FOUND_HOME_LABEL }),
    ).toHaveAttribute('href', '/');
  });

  it('Has no main landmark, as the root layout provides one', () => {
    render(<NotFound />);
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });

  it('Uses the title constant as the page title', () => {
    expect(metadata.title).toBe(NOT_FOUND_TITLE);
  });
});
