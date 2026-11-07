import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScrollProgress } from './ScrollProgress';

describe('ScrollProgress', () => {
  it('Renders one decorative element', () => {
    const { container } = render(<ScrollProgress />);
    expect(container.children).toHaveLength(1);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('Has no text and nothing to tab to', () => {
    const { container } = render(<ScrollProgress />);
    expect(container.textContent).toBe('');
    expect(
      container.querySelectorAll('a, button, input, [tabindex]'),
    ).toHaveLength(0);
  });

  it('Passes className through', () => {
    const { container } = render(<ScrollProgress className="extra" />);
    expect(container.firstElementChild).toHaveClass('extra');
  });
});
