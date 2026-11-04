import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('Renders the title as an h2', () => {
    render(<SectionHeading title="Our process" number={3} align="start" />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Our process' }),
    ).toBeInTheDocument();
  });

  it('Pads the number to two digits and hides it from assistive tech', () => {
    render(<SectionHeading title="Our process" number={3} align="start" />);
    expect(screen.getByText('03')).toHaveAttribute('aria-hidden', 'true');
  });

  it('Shows no number text when none is given', () => {
    const { container } = render(
      <SectionHeading title="Our process" align="center" />,
    );
    expect(container).toHaveTextContent(/^Our process$/);
    expect(screen.getAllByRole('heading')).toHaveLength(1);
  });
});
