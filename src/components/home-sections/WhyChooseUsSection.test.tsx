import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  WhyChooseUsSection,
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

  // The cards do nothing when activated, so they must not be tab stops
  it('Makes no item a tab stop', async () => {
    const user = userEvent.setup();
    render(<WhyChooseUsSection />);

    await user.tab();

    expect(document.body).toHaveFocus();
  });

  it('Gives every item a level-3 title', () => {
    render(<WhyChooseUsSection />);
    whyChooseUsItems.forEach(({ title }) => {
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
    });
  });

  it('Renders the items as one list', () => {
    render(<WhyChooseUsSection />);
    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(
      whyChooseUsItems.length,
    );
  });
});
