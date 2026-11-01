import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProseSection } from './ProseSection';

describe('ProseSection', () => {
  it('Renders one paragraph per body entry, in order', () => {
    const { container } = render(
      <ProseSection
        section={{ type: 'prose', body: ['First text.', 'Second text.'] }}
      />,
    );
    const paragraphs = container.querySelectorAll('p');
    expect(Array.from(paragraphs).map((p) => p.textContent)).toEqual([
      'First text.',
      'Second text.',
    ]);
    expect(screen.getByText('First text.')).toBeInTheDocument();
  });

  it('Does not crash with an empty body', () => {
    const { container } = render(
      <ProseSection section={{ type: 'prose', body: [] }} />,
    );
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });
});
