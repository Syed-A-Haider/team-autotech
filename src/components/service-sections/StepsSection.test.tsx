import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { StepsSection } from './StepsSection';

const steps = [
  { title: 'Book in', description: 'Call or message us.' },
  { title: 'Read ECU', description: 'We back up your original file.' },
  { title: 'Flash', description: 'New map written.' },
];

describe('StepsSection', () => {
  it('Renders an ordered list with one item per step, in order', () => {
    render(<StepsSection section={{ type: 'steps', steps }} />);
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(steps.length);
    steps.forEach((step, i) => {
      expect(within(items[i]).getByText(step.title)).toBeInTheDocument();
      expect(within(items[i]).getByText(step.description)).toBeInTheDocument();
    });
  });

  it('Does not crash with no steps', () => {
    render(<StepsSection section={{ type: 'steps', steps: [] }} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
