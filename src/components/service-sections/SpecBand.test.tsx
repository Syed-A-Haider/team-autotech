import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpecBand } from './SpecBand';

const specs = [
  { label: 'Turnaround', value: 'Same day' },
  { label: 'Warranty', value: '12 months' },
];

describe('SpecBand', () => {
  it('Renders each spec as a term and its value, in order', () => {
    render(<SpecBand section={{ type: 'specband', specs }} />);
    expect(screen.getAllByRole('term').map((t) => t.textContent)).toEqual(
      specs.map((s) => s.label),
    );
    expect(screen.getAllByRole('definition').map((d) => d.textContent)).toEqual(
      specs.map((s) => s.value),
    );
  });

  it('Does not crash with no specs', () => {
    render(<SpecBand section={{ type: 'specband', specs: [] }} />);
    expect(screen.queryAllByRole('term')).toHaveLength(0);
  });
});
