import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageTransition } from './PageTransition';

describe('PageTransition', () => {
  it('Renders its children', () => {
    render(<PageTransition>Content</PageTransition>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('Merges a passed className', () => {
    render(<PageTransition className="custom">Content</PageTransition>);
    expect(screen.getByText('Content')).toHaveClass('custom');
  });
});
