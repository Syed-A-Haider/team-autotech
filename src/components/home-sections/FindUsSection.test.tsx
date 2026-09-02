import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FindUsSection, {
  FIND_US_SECTION_HEADING,
  FIND_US_SECTION_INTRO,
} from './FindUsSection';
import {
  ADDRESS,
  OPENING_HOURS,
  MAPS_DIRECTIONS_LINK,
  MAPS_EMBED_SRC,
} from '@/lib/constants';

describe('FindUsSection', () => {
  it('Renders the section heading and intro', () => {
    render(<FindUsSection />);
    expect(
      screen.getByRole('heading', { name: FIND_US_SECTION_HEADING }),
    ).toBeInTheDocument();
    expect(screen.getByText(FIND_US_SECTION_INTRO)).toBeInTheDocument();
  });

  it('Renders the address linking to directions', () => {
    render(<FindUsSection />);
    expect(screen.getByRole('link', { name: ADDRESS })).toHaveAttribute(
      'href',
      MAPS_DIRECTIONS_LINK,
    );
  });

  it('Renders both opening hours lines', () => {
    render(<FindUsSection />);
    expect(screen.getByText(OPENING_HOURS.weekdays)).toBeInTheDocument();
    expect(screen.getByText(OPENING_HOURS.weekend)).toBeInTheDocument();
  });

  it('Renders a Get Directions button linking to directions', () => {
    render(<FindUsSection />);
    expect(
      screen.getByRole('link', { name: /get directions/i }),
    ).toHaveAttribute('href', MAPS_DIRECTIONS_LINK);
  });

  it('Embeds the map with an accessible title', () => {
    render(<FindUsSection />);
    expect(screen.getByTitle(/map showing/i)).toHaveAttribute(
      'src',
      MAPS_EMBED_SRC,
    );
  });
});
