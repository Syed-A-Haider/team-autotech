import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SectionWrapper from './SectionWrapper';

describe('SectionWrapper', () => {
  it('Renders its children', () => {
    render(<SectionWrapper>Content</SectionWrapper>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('Renders a section element by default', () => {
    const { container } = render(<SectionWrapper>Content</SectionWrapper>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('Renders a div when as="div" is passed', () => {
    const { container } = render(
      <SectionWrapper as="div">Content</SectionWrapper>,
    );
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('section')).not.toBeInTheDocument();
  });

  it('Merges a custom className with the default classes', () => {
    const { container } = render(
      <SectionWrapper className="custom-class">Content</SectionWrapper>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('max-w-6xl');
  });
});
