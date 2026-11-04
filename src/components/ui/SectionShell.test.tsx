import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionShell } from './SectionShell';

const TITLE = 'Who we are';
const BODY = 'Body text.';

describe('SectionShell', () => {
  it('Renders a section element holding the body', () => {
    const { container } = render(
      <SectionShell title={TITLE} number={1} layout="split">
        <p>{BODY}</p>
      </SectionShell>,
    );
    expect(container.querySelectorAll('section')).toHaveLength(1);
    expect(screen.getByText(BODY)).toBeInTheDocument();
  });

  it('Renders the title as an h2 with a padded, hidden number', () => {
    render(
      <SectionShell title={TITLE} number={2} layout="stacked">
        <p>{BODY}</p>
      </SectionShell>,
    );
    expect(
      screen.getByRole('heading', { level: 2, name: TITLE }),
    ).toBeInTheDocument();
    expect(screen.getByText('02')).toHaveAttribute('aria-hidden', 'true');
  });

  it('Keeps the h2 before the body in the DOM for every layout', () => {
    const layouts = ['split', 'split-reverse', 'stacked'] as const;
    layouts.forEach((layout) => {
      const { unmount } = render(
        <SectionShell title={TITLE} number={1} layout={layout}>
          <p>{BODY}</p>
        </SectionShell>,
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(
        heading.compareDocumentPosition(screen.getByText(BODY)) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      unmount();
    });
  });

  it('Renders the glow decoration hidden from assistive tech', () => {
    const { container } = render(
      <SectionShell title={TITLE} number={1} layout="split">
        <p>{BODY}</p>
      </SectionShell>,
    );
    expect(
      container.querySelectorAll('section [aria-hidden="true"]').length,
    ).toBeGreaterThan(0);
  });

  it('Renders no heading when there is no title', () => {
    render(
      <SectionShell layout="stacked">
        <p>{BODY}</p>
      </SectionShell>,
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText(BODY)).toBeInTheDocument();
  });

  it('Merges a passed className onto the section', () => {
    const { container } = render(
      <SectionShell title={TITLE} number={1} layout="split" className="custom">
        <p>{BODY}</p>
      </SectionShell>,
    );
    expect(container.querySelector('section')).toHaveClass('custom');
  });
});
