import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ReviewsCarousel from './ReviewsCarousel';

function renderCarousel() {
  return render(
    <ReviewsCarousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </ReviewsCarousel>,
  );
}

describe('ReviewsCarousel', () => {
  it('Shows the first slide on initial render', () => {
    renderCarousel();
    const slides = screen.getAllByRole('group', { hidden: true });
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
    expect(slides[2]).toHaveAttribute('aria-hidden', 'true');
  });

  it('Moves to the next slide when the next button is clicked', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByLabelText('Next review'));
    expect(screen.getAllByRole('group', { hidden: true })[1]).toHaveAttribute(
      'aria-hidden',
      'false',
    );
  });

  it('Wraps around to the last slide when previous is clicked on the first slide', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByLabelText('Previous review'));
    expect(screen.getAllByRole('group', { hidden: true })[2]).toHaveAttribute(
      'aria-hidden',
      'false',
    );
  });

  it('Jumps to a specific slide when its dot is clicked', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByLabelText('Show review 3 of 3'));
    expect(screen.getAllByRole('group', { hidden: true })[2]).toHaveAttribute(
      'aria-hidden',
      'false',
    );
  });
});
