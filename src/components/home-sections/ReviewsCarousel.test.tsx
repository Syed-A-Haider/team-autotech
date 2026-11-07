import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
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

// Wrap-around. The slides are laid out with CSS order so the current one is
// always in the middle slot of the window, with a real neighbour on each side.
// jsdom has no layout, so these tests fake one that follows the order: the slide
// in slot n starts at n * 400. With 5 slides the middle slot is 2
const FIVE = 5;
const MIDDLE_SLOT = 2;
// Longer than the delay after the last scroll event before the window turns
const SETTLE_WAIT = 300;

function renderFive() {
  return render(
    <ReviewsCarousel>
      {Array.from({ length: FIVE }, (_, i) => (
        <div key={i}>Slide {i + 1}</div>
      ))}
    </ReviewsCarousel>,
  );
}

function slotOf(slide: HTMLElement) {
  if (slide.style.order !== '') return Number(slide.style.order);
  return Array.from(slide.parentElement!.children).indexOf(slide);
}

// jsdom's own scrollLeft, taken before any test spies on it
const scrollLeftProperty = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'scrollLeft',
)!;

// Installed before render, so the first layout effect sees it. With resnaps, the
// fake browser does what real ones do when the layout changes under a snapped
// scroller: the first read that forces layout (of a position or of scrollLeft
// itself) finds the scroller already moved to follow the slide it was snapped to
function fakeOrderedLayout({ resnaps = false } = {}) {
  const seenSlot = new WeakMap<HTMLElement, number>();

  function followSnappedSlide(track: HTMLElement) {
    const slides = Array.from(track.children).filter(
      (child) => child.getAttribute('role') === 'group',
    ) as HTMLElement[];
    const left = scrollLeftProperty.get!.call(track) as number;
    const viewMiddle = left + TRACK_WIDTH / 2;
    const known = slides.every((slide) => seenSlot.has(slide));
    if (known) {
      // The slide whose old place was in the middle of the view
      const snapped = slides.reduce((nearest, slide) => {
        const middle = (slot: HTMLElement) =>
          seenSlot.get(slot)! * SLIDE_STEP + SLIDE_WIDTH / 2;
        return Math.abs(middle(slide) - viewMiddle) <
          Math.abs(middle(nearest) - viewMiddle)
          ? slide
          : nearest;
      });
      const shift = (slotOf(snapped) - seenSlot.get(snapped)!) * SLIDE_STEP;
      if (shift !== 0) scrollLeftProperty.set!.call(track, left + shift);
    }
    slides.forEach((slide) => seenSlot.set(slide, slotOf(slide)));
  }

  vi.spyOn(Element.prototype, 'scrollLeft', 'get').mockImplementation(function (
    this: Element,
  ) {
    if (resnaps && this.getAttribute('aria-label') === REVIEWS_TRACK_LABEL) {
      followSnappedSlide(this as HTMLElement);
    }
    return scrollLeftProperty.get!.call(this) as number;
  });
  vi.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockImplementation(
    function (this: HTMLElement) {
      if (this.getAttribute('role') !== 'group') return 0;
      if (resnaps) followSnappedSlide(this.parentElement!);
      return slotOf(this) * SLIDE_STEP;
    },
  );
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(
    function (this: HTMLElement) {
      return this.getAttribute('role') === 'group' ? SLIDE_WIDTH : 0;
    },
  );
  vi.spyOn(Element.prototype, 'clientWidth', 'get').mockImplementation(
    function (this: Element) {
      return this.getAttribute('aria-label') === REVIEWS_TRACK_LABEL
        ? TRACK_WIDTH
        : 0;
    },
  );
}

// scrollLeft that puts the given slot in the middle of the track
function centreOfSlot(slot: number) {
  return slot * SLIDE_STEP + (SLIDE_WIDTH - TRACK_WIDTH) / 2;
}

function swipeToSlot(slot: number) {
  getTrack().scrollLeft = centreOfSlot(slot);
  fireEvent.scroll(getTrack());
}

// Lets the animation frame and the settle delay run
function settle() {
  act(() => {
    vi.advanceTimersByTime(SETTLE_WAIT);
  });
}

function slideOrders() {
  return getSlides().map((slide) => slide.style.order);
}

// Orders when slide n is the one in the middle
function ordersAround(anchor: number) {
  return Array.from({ length: FIVE }, (_, i) =>
    String((i - anchor + MIDDLE_SLOT + FIVE) % FIVE),
  );
}

function lastScrollTarget() {
  return vi.mocked(Element.prototype.scrollTo).mock.lastCall?.[0];
}

describe('ReviewsCarousel - wrap-around', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    fakeOrderedLayout();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('the window', () => {
    it('Puts the current slide in the middle, with a neighbour on each side', () => {
      renderFive();
      expect(slideOrders()).toEqual(ordersAround(0));
    });

    it('Keeps the slides in their reading order in the page', () => {
      renderFive();
      expect(getSlides().map((s) => s.getAttribute('aria-label'))).toEqual([
        '1 of 5',
        '2 of 5',
        '3 of 5',
        '4 of 5',
        '5 of 5',
      ]);
    });

    it('Starts with the first slide in the middle of the track', () => {
      renderFive();
      expect(getTrack().scrollLeft).toBe(centreOfSlot(MIDDLE_SLOT));
    });

    it('Renders the slides in their natural order on the server', () => {
      const html = renderToString(
        <ReviewsCarousel>
          {Array.from({ length: FIVE }, (_, i) => (
            <div key={i}>Slide {i + 1}</div>
          ))}
        </ReviewsCarousel>,
      );
      expect(html).not.toMatch(/style="[^"]*order:/);
    });

    it('Does not reorder fewer than three slides, there is nothing to wrap past', () => {
      render(
        <ReviewsCarousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </ReviewsCarousel>,
      );
      expect(slideOrders()).toEqual(['', '']);
    });
  });

  describe('swiping', () => {
    it('Swiping left from the first slide lands on the last', () => {
      renderFive();
      swipeToSlot(MIDDLE_SLOT - 1);
      settle();
      expect(isCurrent(getSlides()[FIVE - 1])).toBe(true);
    });

    it('Swiping right from the last slide lands on the first', () => {
      renderFive();
      fireEvent.keyDown(getTrack(), { key: 'End' });
      swipeToSlot(MIDDLE_SLOT - 1);
      settle();
      expect(isCurrent(getSlides()[FIVE - 1])).toBe(true);

      swipeToSlot(MIDDLE_SLOT + 1);
      settle();
      expect(isCurrent(getSlides()[0])).toBe(true);
    });

    it('Turns the window around the new slide once the scroll settles', () => {
      renderFive();
      swipeToSlot(MIDDLE_SLOT + 1);
      settle();
      expect(slideOrders()).toEqual(ordersAround(1));
    });

    it('Keeps the view where it was when the window turns', () => {
      renderFive();
      swipeToSlot(MIDDLE_SLOT + 1);
      settle();
      // Slide 1 moved from slot 3 to the middle slot, and the scroll followed
      expect(getTrack().scrollLeft).toBe(centreOfSlot(MIDDLE_SLOT));
    });

    it('Keeps the view where it was when the browser re-snaps by itself', () => {
      fakeOrderedLayout({ resnaps: true });
      renderFive();
      swipeToSlot(MIDDLE_SLOT + 1);
      settle();
      expect(getTrack().scrollLeft).toBe(centreOfSlot(MIDDLE_SLOT));
    });

    it('Turns the window as soon as the browser says the scroll ended', () => {
      renderFive();
      swipeToSlot(MIDDLE_SLOT + 1);
      fireEvent(getTrack(), new Event('scrollend'));
      expect(slideOrders()).toEqual(ordersAround(1));
    });

    it('Still turns the window when scrollend comes before the frame that releases a button scroll', () => {
      renderFive();
      // The scroll lands on its target and scrollend fires at once, before the
      // animation frame that notices the arrival has run
      fireEvent.click(screen.getByLabelText('Show review 2 of 5'));
      swipeToSlot(MIDDLE_SLOT + 1);
      fireEvent(getTrack(), new Event('scrollend'));
      expect(slideOrders()).toEqual(ordersAround(0));

      settle();
      expect(slideOrders()).toEqual(ordersAround(1));
    });

    it('Does not turn the window while a finger is on the track', () => {
      renderFive();
      fireEvent.touchStart(getTrack());
      swipeToSlot(MIDDLE_SLOT + 1);
      settle();
      expect(slideOrders()).toEqual(ordersAround(0));
    });

    it('Turns the window when the finger lifts after a pause', () => {
      renderFive();
      fireEvent.touchStart(getTrack());
      swipeToSlot(MIDDLE_SLOT + 1);
      settle();
      fireEvent.touchEnd(getTrack());
      settle();
      expect(slideOrders()).toEqual(ordersAround(1));
    });

    it('Does not turn the window while a button scroll is still heading for its slide', () => {
      renderFive();
      fireEvent.click(screen.getByLabelText('Show review 3 of 5'));
      // Passes slide 1 on the way and pauses there
      swipeToSlot(MIDDLE_SLOT + 1);
      settle();
      expect(slideOrders()).toEqual(ordersAround(0));
    });
  });

  describe('pressing', () => {
    it('Previous on the first slide travels one card, not four', () => {
      renderFive();
      fireEvent.click(screen.getByLabelText(PREV_REVIEW_LABEL));
      expect(isCurrent(getSlides()[FIVE - 1])).toBe(true);
      // The last slide sits in the slot just left of the middle
      expect(lastScrollTarget()).toEqual({
        left: centreOfSlot(MIDDLE_SLOT - 1),
        behavior: 'smooth',
      });
    });

    it('Next on the last slide travels one card to the first', () => {
      renderFive();
      fireEvent.keyDown(getTrack(), { key: 'End' });
      swipeToSlot(MIDDLE_SLOT - 1);
      settle();
      fireEvent.click(screen.getByLabelText(NEXT_REVIEW_LABEL));
      expect(isCurrent(getSlides()[0])).toBe(true);
      expect(lastScrollTarget()).toEqual({
        left: centreOfSlot(MIDDLE_SLOT + 1),
        behavior: 'smooth',
      });
    });

    it('ArrowLeft on the first slide travels one card to the last', () => {
      renderFive();
      fireEvent.keyDown(getTrack(), { key: 'ArrowLeft' });
      expect(isCurrent(getSlides()[FIVE - 1])).toBe(true);
      expect(lastScrollTarget()).toEqual({
        left: centreOfSlot(MIDDLE_SLOT - 1),
        behavior: 'smooth',
      });
    });

    it('Clicking the card left of the first slide centres the last', () => {
      renderFive();
      fireEvent.click(getSlides()[FIVE - 1]);
      expect(isCurrent(getSlides()[FIVE - 1])).toBe(true);
      expect(lastScrollTarget()).toEqual({
        left: centreOfSlot(MIDDLE_SLOT - 1),
        behavior: 'smooth',
      });
    });

    it('Turns the window before a press that comes while the view has moved on', () => {
      renderFive();
      fireEvent.click(screen.getByLabelText(NEXT_REVIEW_LABEL));
      // Arrives at slide 1 and the next press comes before the window turned
      swipeToSlot(MIDDLE_SLOT + 1);
      act(() => {
        vi.advanceTimersByTime(20);
      });
      fireEvent.click(screen.getByLabelText(NEXT_REVIEW_LABEL));

      expect(slideOrders()).toEqual(ordersAround(1));
      expect(getTrack().scrollLeft).toBe(centreOfSlot(MIDDLE_SLOT));
      // Slide 2 is now one slot to the right, so the press goes one card on
      expect(lastScrollTarget()).toEqual({
        left: centreOfSlot(MIDDLE_SLOT + 1),
        behavior: 'smooth',
      });
    });
  });
});
