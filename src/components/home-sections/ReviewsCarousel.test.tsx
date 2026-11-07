import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  NEXT_REVIEW_LABEL,
  PREV_REVIEW_LABEL,
  REVIEWS_TRACK_LABEL,
  ReviewsCarousel,
} from './ReviewsCarousel';

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
// jsdom has no layout, so the geometry is faked: slide i is 300 wide and starts
// at i * 400, and the track is 400 wide. Slide i is centred at scrollLeft i * 400
const SLIDE_WIDTH = 300;
const SLIDE_STEP = 400;
const TRACK_WIDTH = 400;

function getTrack() {
  return screen.getByRole('region', { name: REVIEWS_TRACK_LABEL });
}

function getSlides() {
  return screen.getAllByRole('group', { hidden: true });
}

function isCurrent(slide: HTMLElement) {
  return slide.getAttribute('aria-hidden') === 'false';
}

function fakeLayout() {
  const track = getTrack();
  Object.defineProperty(track, 'clientWidth', { value: TRACK_WIDTH });
  getSlides().forEach((slide, index) => {
    Object.defineProperty(slide, 'offsetLeft', { value: index * SLIDE_STEP });
    Object.defineProperty(slide, 'offsetWidth', { value: SLIDE_WIDTH });
  });
}

function scrollTrackTo(scrollLeft: number) {
  const track = getTrack();
  Object.defineProperty(track, 'scrollLeft', {
    value: scrollLeft,
    configurable: true,
  });
  fireEvent.scroll(track);
}

// The scroll handler runs on the next animation frame
function nextFrame() {
  return act(
    () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
  );
}

function setReducedMotion(reduced: boolean) {
  vi.mocked(window.matchMedia).mockImplementation(
    (query) =>
      ({
        matches: reduced && query.includes('prefers-reduced-motion'),
      }) as MediaQueryList,
  );
}

describe('ReviewsCarousel - keyboard', () => {
  it('Moves with the arrow keys once the track is focused', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.tab();
    expect(getTrack()).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(isCurrent(getSlides()[1])).toBe(true);

    await user.keyboard('{ArrowLeft}');
    expect(isCurrent(getSlides()[0])).toBe(true);
  });

  it('Wraps from the first slide to the last with ArrowLeft', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.tab();
    await user.keyboard('{ArrowLeft}');
    expect(isCurrent(getSlides()[2])).toBe(true);
  });

  it('Jumps to the first and last slide with Home and End', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.tab();

    await user.keyboard('{End}');
    expect(isCurrent(getSlides()[2])).toBe(true);

    await user.keyboard('{Home}');
    expect(isCurrent(getSlides()[0])).toBe(true);
  });

  it('Ignores arrow keys held with a modifier (Alt+Left is browser Back)', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.tab();
    await user.keyboard('{Alt>}{ArrowRight}{/Alt}');
    expect(isCurrent(getSlides()[0])).toBe(true);
  });

  it('Stops the browser scrolling the track as well, so it never moves twice', () => {
    renderCarousel();
    // fireEvent returns false when the event was default-prevented
    expect(fireEvent.keyDown(getTrack(), { key: 'ArrowRight' })).toBe(false);
    expect(fireEvent.keyDown(getTrack(), { key: 'a' })).toBe(true);
  });
});

describe('ReviewsCarousel - clicking a slide', () => {
  it('Centres a neighbouring slide when it is clicked', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(getSlides()[1]);
    expect(isCurrent(getSlides()[1])).toBe(true);
  });

  it('Does nothing when the current slide is clicked', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(getSlides()[0]);
    expect(isCurrent(getSlides()[0])).toBe(true);
    expect(Element.prototype.scrollTo).not.toHaveBeenCalled();
  });

  it('Ignores a click that ended a text selection', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'getSelection').mockReturnValue({
      isCollapsed: false,
    } as Selection);
    renderCarousel();
    await user.click(getSlides()[1]);
    expect(isCurrent(getSlides()[0])).toBe(true);
  });
});

describe('ReviewsCarousel - scrolling', () => {
  it('Scrolls the chosen slide to the centre of the track', async () => {
    const user = userEvent.setup();
    renderCarousel();
    fakeLayout();
    await user.click(screen.getByLabelText(NEXT_REVIEW_LABEL));
    // Slide 1 starts at 400 and is 300 wide: its centre (550) minus half the track
    expect(Element.prototype.scrollTo).toHaveBeenCalledWith({
      left: 550 - TRACK_WIDTH / 2,
      behavior: 'smooth',
    });
  });

  it('Scrolls without animation when the visitor prefers reduced motion', async () => {
    const user = userEvent.setup();
    setReducedMotion(true);
    renderCarousel();
    await user.click(screen.getByLabelText(NEXT_REVIEW_LABEL));
    expect(Element.prototype.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'auto' }),
    );
  });

  it('Follows a swipe: the slide nearest the centre becomes current', async () => {
    renderCarousel();
    fakeLayout();
    scrollTrackTo(SLIDE_STEP);
    await waitFor(() => expect(isCurrent(getSlides()[1])).toBe(true));
  });

  it('Reads the scroll position once per frame, however many scroll events fire', async () => {
    const frame = vi.spyOn(window, 'requestAnimationFrame');
    renderCarousel();
    fakeLayout();
    scrollTrackTo(SLIDE_STEP);
    scrollTrackTo(SLIDE_STEP);
    scrollTrackTo(SLIDE_STEP);
    // Counted before nextFrame, which asks for a frame of its own
    expect(frame).toHaveBeenCalledTimes(1);
    await nextFrame();
  });
});

describe('ReviewsCarousel - a button-driven scroll', () => {
  // Dot 3 starts a long smooth scroll. The index must not flicker through
  // slide 2 on the way, so scroll events short of the target are ignored
  async function startJumpToLast() {
    const user = userEvent.setup();
    renderCarousel();
    fakeLayout();
    await user.click(screen.getByLabelText('Show review 3 of 3'));
    return getTrack();
  }

  it('Ignores slides passed on the way to the target', async () => {
    await startJumpToLast();
    scrollTrackTo(SLIDE_STEP);
    await nextFrame();
    expect(isCurrent(getSlides()[2])).toBe(true);
  });

  it('Follows the scroll again once the target is reached', async () => {
    await startJumpToLast();
    scrollTrackTo(2 * SLIDE_STEP);
    await nextFrame();
    scrollTrackTo(SLIDE_STEP);
    await waitFor(() => expect(isCurrent(getSlides()[1])).toBe(true));
  });

  it('Hands over to the visitor when they touch the track', async () => {
    const track = await startJumpToLast();
    fireEvent.pointerDown(track);
    scrollTrackTo(SLIDE_STEP);
    await waitFor(() => expect(isCurrent(getSlides()[1])).toBe(true));
  });

  it('Hands over to the visitor on a sideways wheel or trackpad swipe', async () => {
    const track = await startJumpToLast();
    fireEvent.wheel(track, { deltaX: 40 });
    scrollTrackTo(SLIDE_STEP);
    await waitFor(() => expect(isCurrent(getSlides()[1])).toBe(true));
  });

  it('Keeps the lock on a plain vertical wheel (the page scrolling)', async () => {
    const track = await startJumpToLast();
    fireEvent.wheel(track, { deltaY: 40 });
    scrollTrackTo(SLIDE_STEP);
    await nextFrame();
    expect(isCurrent(getSlides()[2])).toBe(true);
  });
});

describe('ReviewsCarousel - controls', () => {
  it('Gives the track a tab stop, so the keyboard can scroll it', () => {
    renderCarousel();
    expect(getTrack()).toHaveAttribute('tabindex', '0');
  });

  it('Points both arrows at the track they control', () => {
    renderCarousel();
    const trackId = getTrack().id;
    expect(trackId).not.toBe('');
    expect(screen.getByLabelText(PREV_REVIEW_LABEL)).toHaveAttribute(
      'aria-controls',
      trackId,
    );
    expect(screen.getByLabelText(NEXT_REVIEW_LABEL)).toHaveAttribute(
      'aria-controls',
      trackId,
    );
  });

  it('Marks only the current slide with aria-current on its dot', async () => {
    const user = userEvent.setup();
    renderCarousel();
    await user.click(screen.getByLabelText(NEXT_REVIEW_LABEL));
    const dots = screen.getAllByLabelText(/^Show review/);
    expect(dots.map((dot) => dot.getAttribute('aria-current'))).toEqual([
      'false',
      'true',
      'false',
    ]);
  });
});
