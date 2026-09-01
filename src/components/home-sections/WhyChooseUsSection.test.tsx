import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhyChooseUsSection, {
  sectionHeading,
  sectionSubheading,
  whyChooseUsItems,
} from './WhyChooseUsSection';

describe('WhyChooseUsSection', () => {
  it('Renders the section heading and subheading', () => {
    render(<WhyChooseUsSection />);
    expect(
      screen.getByRole('heading', { name: sectionHeading }),
    ).toBeInTheDocument();
    expect(screen.getByText(sectionSubheading)).toBeInTheDocument();
  });

  it('Renders every USP item title', () => {
    render(<WhyChooseUsSection />);
    whyChooseUsItems.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('Renders every USP item description', () => {
    render(<WhyChooseUsSection />);
    whyChooseUsItems.forEach(({ description }) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('Renders one decorative icon per item', () => {
    const { container } = render(<WhyChooseUsSection />);
    const icons = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(icons).toHaveLength(whyChooseUsItems.length);
  });

  it('Makes every item keyboard-focusable', () => {
    render(<WhyChooseUsSection />);
    whyChooseUsItems.forEach(({ title }) => {
      const heading = screen.getByText(title);
      const item = heading.closest('[tabindex]');
      expect(item).toHaveAttribute('tabindex', '0');
    });
  });
});
