// Cycling requires state
'use client';

import {
  Children,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
  type WheelEvent,
} from 'react';
import { flushSync } from 'react-dom';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import clsx from 'clsx';
import { REDUCED_MOTION_QUERY, useReviewsAutoplay } from './useReviewsAutoplay';

export const REVIEWS_CAROUSEL_LABEL = 'Customer reviews';
export const REVIEWS_TRACK_LABEL = 'Review cards';
export const PREV_REVIEW_LABEL = 'Previous review';
export const NEXT_REVIEW_LABEL = 'Next review';
export const PAUSE_REVIEWS_LABEL = 'Pause automatic review rotation';
export const PLAY_REVIEWS_LABEL = 'Play automatic review rotation';
// How long a review stays before the carousel moves on by itself. Short on
// purpose: it is a glance on a homepage, not something to read
export const AUTOPLAY_INTERVAL_MS = 3000;

const FIRST_SLIDE = 0;
// Milliseconds with no scroll event before a scroll counts as finished, for
// browsers without the scrollend event
const SETTLE_DELAY = 150;
// With fewer slides there is nothing to wrap past
const MIN_WRAP_SLIDES = 3;

// The server has no script, so it renders the slides in plain order and the
// browser takes over after hydration (see the wrap-around note in the component)
const subscribeToNothing = () => () => {};
const getIsClient = () => true;
const getIsServer = () => false;

// --slide and --gap are read by the track, the spacers and the slides. From lg
// the slide is a fixed 56rem, so the centre card is never under 896px
const ROOT_STYLES = clsx(
  'grid grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-x-2 gap-y-4',
  '[--slide:85%] [--gap:--spacing(3)]',
  'md:[--slide:60%] md:[--gap:--spacing(4)]',
  'lg:[--slide:56rem] lg:[--gap:--spacing(6)]',
);

// The native scroller: snap points do the swiping, the scrollbar is hidden and
// overscroll-x-contain stops a sideways scroll chaining to the page. overflow-y
// is hidden (not the auto that overflow-x forces) and the padding leaves room
// for the focus outline
const TRACK_STYLES =
  'relative col-span-full row-start-1 flex gap-(--gap) snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain py-3 scrollbar-none lg:py-6 [&::-webkit-scrollbar]:hidden focus-visible:outline-accent focus-visible:outline-2 focus-visible:-outline-offset-2';

// Empty spaces at both ends, each half the free room minus the gap, so the first
// and last card can sit in the middle without any scrolling
// order-first and order-last keep them at the two ends of the reordered slides
const SPACER_STYLES =
  'before:order-first before:w-[calc((100%_-_var(--slide))_/_2_-_var(--gap))] before:shrink-0 after:order-last after:w-[calc((100%_-_var(--slide))_/_2_-_var(--gap))] after:shrink-0';

// Neighbours are clickable (aria-hidden is how they are told apart) and a faint
// tint on hover says so. It is a colour on an overlay the size of the card and
// not opacity, which the faded-element guard would flag. No press: the card
// gliding to the centre is the feedback. carousel-depth (motion.css) scales,
// dims and tilts the card and the tint, never the slide itself
const SLIDE_STYLES = clsx(
  'carousel-depth relative w-(--slide) shrink-0 snap-center aria-hidden:cursor-pointer',
  'aria-hidden:after:absolute aria-hidden:after:inset-0 aria-hidden:after:rounded-lg aria-hidden:after:bg-transparent aria-hidden:hover:after:bg-foreground/8 motion-safe:aria-hidden:after:transition-colors',
);

// 44px, 48px from lg. On a phone the arrows sit in the row under the track. From
// lg they move onto the track edges, centred on the track (z-10 keeps them
// above it, as the track is positioned)
const ARROW_STYLES =
  'press border-border bg-background text-foreground hover:border-accent hover:text-accent focus-visible:ring-accent focus-visible:ring-offset-background relative z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:size-12';
const PREV_PLACEMENT =
  'col-start-2 row-start-2 lg:col-start-1 lg:row-start-1 lg:ms-2 lg:justify-self-start';
const NEXT_PLACEMENT =
  'col-start-4 row-start-2 lg:col-start-5 lg:row-start-1 lg:me-2 lg:justify-self-end';
// The pause button has a row of its own on a phone (the arrows and dots fill
// the first one, and 44px more does not fit at 320px). From sm it sits in the
// row beside the dots
const ROTATION_PLACEMENT =
  'col-span-full row-start-3 justify-self-center sm:col-span-1 sm:col-start-5 sm:row-start-2 sm:justify-self-start';

// The button is the tap target (32x44). The visible dot is its ::before, so the
// active one is stretched into a short bar by scaling it (never its width, which
// would move the other dots). 2.5x of 8px (14px from lg) stays inside the tap
// target. The pseudo-element has its own transition, press owns the button's
const DOT_STYLES =
  'press relative flex h-11 w-8 cursor-pointer items-center justify-center before:size-2 before:rounded-full before:bg-muted motion-safe:before:transition-[scale,background-color] motion-safe:before:duration-(--motion-base) motion-safe:before:ease-(--ease-settle) lg:h-12 lg:w-10 lg:before:size-3.5 aria-[current=true]:before:scale-x-250 aria-[current=true]:before:bg-accent focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-accent focus-visible:before:ring-offset-2 focus-visible:before:ring-offset-background';

// Where a slide's middle is along the track's full scrollable width
function slideMiddle(slide: HTMLElement) {
  return slide.offsetLeft + slide.offsetWidth / 2;
}

// The slide whose middle is closest to the middle of what the track shows
function nearestSlideIndex(track: HTMLElement) {
  const viewMiddle = track.scrollLeft + track.clientWidth / 2;
  let nearest = 0;
  let nearestDistance = Infinity;
  (Array.from(track.children) as HTMLElement[]).forEach((slide, index) => {
    const distance = Math.abs(slideMiddle(slide) - viewMiddle);
    if (distance < nearestDistance) {
      nearest = index;
      nearestDistance = distance;
    }
  });
  return nearest;
}

// The scrollLeft that puts a slide in the middle of what the track shows
function centredScrollLeft(track: HTMLElement, index: number) {
  return (
    slideMiddle(track.children[index] as HTMLElement) - track.clientWidth / 2
  );
}

// Scrolls a slide to the middle of the track. The target lock stops the slides
// passed on the way from counting as current
function scrollToSlide(
  track: HTMLElement,
  index: number,
  target: RefObject<number | null>,
) {
  target.current = nearestSlideIndex(track) === index ? null : index;
  track.scrollTo({
    left: centredScrollLeft(track, index),
    behavior: window.matchMedia(REDUCED_MOTION_QUERY).matches
      ? 'auto'
      : 'smooth',
  });
}

// The slide a key points at, or null for any other key
function keyTarget(key: string, current: number, count: number) {
  if (key === 'ArrowLeft') return current - 1;
  if (key === 'ArrowRight') return current + 1;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  return null;
}

interface ReviewsCarouselProps {
  children: ReactNode[];
}

export function ReviewsCarousel({ children }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(FIRST_SLIDE);
  // Wrap-around: a scroll track has hard ends, so the slides are laid out in a
  // window with CSS order. The anchor is the slide in the middle slot, so there
  // is always a real card on both sides of it. When a scroll settles on another
  // slide the window turns around that one and the scroll follows by the same
  // amount, so the view does not move. Nothing is cloned. The DOM order, and so
  // the reading order, never changes
  const [anchor, setAnchor] = useState(FIRST_SLIDE);
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    getIsClient,
    getIsServer,
  );
  const trackRef = useRef<HTMLDivElement>(null);
  // The pending animation frame, so a burst of scroll events is read once
  const frameRef = useRef<number | null>(null);
  // While a button or key scrolls to a slide, the slide it is heading for.
  // Until the scroll gets there, slides passed on the way do not count
  const targetRef = useRef<number | null>(null);
  // The pending check that a scroll has finished
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True while a finger is on the track
  const touchingRef = useRef(false);
  // A press can come before the window is on: React replays a click made during
  // hydration ahead of the render that turns it on. The slide it chose waits here
  const pendingRef = useRef<number | null>(null);
  const trackId = useId();
  const slides = Children.toArray(children);
  const count = slides.length;
  const middleSlot = Math.floor(count / 2);
  const isWindowed = isClient && count >= MIN_WRAP_SLIDES;
  const waitsForWindow = !isClient && count >= MIN_WRAP_SLIDES;
  const rotationButtonRef = useRef<HTMLButtonElement>(null);
  const autoplay = useReviewsAutoplay({
    count,
    anchor,
    isClient,
    intervalMs: AUTOPLAY_INTERVAL_MS,
    advance: () => goTo(currentIndex + 1),
  });

  // The first slide starts in the middle slot, which is not scroll position 0.
  // Then any press that was waiting for the window gets its scroll
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!isWindowed || !track) return;
    track.scrollLeft = centredScrollLeft(track, FIRST_SLIDE);
    if (pendingRef.current === null) return;
    scrollToSlide(track, pendingRef.current, targetRef);
    pendingRef.current = null;
  }, [isWindowed]);

  useEffect(() => clearSettleTimer, []);

  function clearSettleTimer() {
    if (settleTimerRef.current === null) return;
    clearTimeout(settleTimerRef.current);
    settleTimerRef.current = null;
  }

  // Turns the window around a slide. Every slide in view moves by the same
  // amount, so the scroll position moves with them. The new layout is needed
  // to measure that, so React is made to apply it now
  function turnWindowTo(track: HTMLElement, index: number) {
    if (!isWindowed) return;
    const slide = track.children[index] as HTMLElement;
    const slideBefore = slide.offsetLeft;
    const scrollBefore = track.scrollLeft;
    flushSync(() => setAnchor(index));
    // Set outright, not added on. After a layout change the browser may already
    // have re-snapped to the slide, and reading scrollLeft would include that
    track.scrollLeft = scrollBefore + slide.offsetLeft - slideBefore;
  }

  // The scroll has finished. Not while a finger is on the track (moving the
  // layout under it would break the swipe) or a button scroll is still heading
  // for its slide
  function settleWindow() {
    const track = trackRef.current;
    if (!track || touchingRef.current || targetRef.current !== null) return;
    // Only now, so a scrollend that comes before the frame that releases the
    // target does not cancel the check that follows it
    clearSettleTimer();
    turnWindowTo(track, nearestSlideIndex(track));
  }

  function scheduleSettle() {
    clearSettleTimer();
    settleTimerRef.current = setTimeout(settleWindow, SETTLE_DELAY);
  }

  // Wraps in both directions
  function goTo(index: number) {
    const next = (index + count) % count;
    setCurrentIndex(next);
    if (waitsForWindow) {
      pendingRef.current = next;
      return;
    }

    const track = trackRef.current;
    if (!track) return;
    // Turn the window around the slide in view first, so the target is never
    // more than half a window away, even when presses come before a scroll ended
    turnWindowTo(track, nearestSlideIndex(track));
    scrollToSlide(track, next, targetRef);
  }

  // A choice by the visitor ends autoplay, which would move the carousel from
  // under them
  function goByVisitor(index: number) {
    autoplay.stop();
    goTo(index);
  }

  function syncIndexFromScroll() {
    frameRef.current = null;
    const track = trackRef.current;
    if (!track) return;

    const nearest = nearestSlideIndex(track);
    if (targetRef.current !== null && nearest !== targetRef.current) return;
    targetRef.current = null;
    setCurrentIndex(nearest);
  }

  function handleScroll() {
    // The track moving under a finger is the visitor swiping it. A scroll with
    // no finger on it is autoplay's own, or a button's
    if (touchingRef.current) autoplay.stop();
    scheduleSettle();
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(syncIndexFromScroll);
  }

  function handleTouchStart() {
    touchingRef.current = true;
  }

  // The scroll may already have stopped, so there is no event to wait for
  function handleTouchEnd() {
    touchingRef.current = false;
    scheduleSettle();
  }

  // The visitor took over: follow their scroll again
  function releaseTarget() {
    targetRef.current = null;
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    releaseTarget();
    // A finger landing on the track is usually a thumb scrolling the page, as
    // the carousel fills much of a phone's screen. Stopping then meant autoplay
    // was already paused when the visitor reached it. For touch it stops once
    // the track itself scrolls (handleScroll). A mouse press stops it at once
    if (event.pointerType !== 'touch') autoplay.stop();
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    // Sideways, or Shift+wheel. A plain vertical wheel is the page scrolling
    if (event.deltaX === 0 && !event.shiftKey) return;
    releaseTarget();
    autoplay.stop();
  }

  // Focus anywhere in the carousel but the pause button ends autoplay
  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    if (!rotationButtonRef.current?.contains(event.target)) autoplay.stop();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    const target = keyTarget(event.key, currentIndex, count);
    if (target === null) return;
    // The browser would also scroll the track a step, so stop it
    event.preventDefault();
    goByVisitor(target);
  }

  function handleSlideClick(index: number) {
    if (index === currentIndex) return;
    // Selecting text by dragging ends in a click, which is not choosing a card
    if (window.getSelection()?.isCollapsed === false) return;
    goByVisitor(index);
  }

  return (
    <div
      ref={autoplay.rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={REVIEWS_CAROUSEL_LABEL}
      data-autoplay={autoplay.isRunning ? 'running' : 'held'}
      onFocus={handleFocus}
      className={ROOT_STYLES}
    >
      {/* Track - all slides pre-rendered, the browser scrolls and snaps them */}
      <div
        ref={trackRef}
        id={trackId}
        role="region"
        aria-label={REVIEWS_TRACK_LABEL}
        aria-live={autoplay.isPlaying ? 'off' : 'polite'}
        tabIndex={0}
        onScroll={handleScroll}
        onScrollEnd={settleWindow}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={clsx(TRACK_STYLES, SPACER_STYLES)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={index !== currentIndex}
            style={
              isWindowed
                ? { order: (index - anchor + middleSlot + count) % count }
                : undefined
            }
            onClick={() => handleSlideClick(index)}
            className={SLIDE_STYLES}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        type="button"
        aria-label={PREV_REVIEW_LABEL}
        aria-controls={trackId}
        onClick={() => goByVisitor(currentIndex - 1)}
        className={clsx(ARROW_STYLES, PREV_PLACEMENT)}
      >
        <ChevronLeft aria-hidden="true" size={20} className="lg:h-7 lg:w-7" />
      </button>

      <div className="col-start-3 row-start-2 flex items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show review ${index + 1} of ${count}`}
            aria-current={index === currentIndex}
            onClick={() => goByVisitor(index)}
            className={DOT_STYLES}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label={NEXT_REVIEW_LABEL}
        aria-controls={trackId}
        onClick={() => goByVisitor(currentIndex + 1)}
        className={clsx(ARROW_STYLES, NEXT_PLACEMENT)}
      >
        <ChevronRight aria-hidden="true" size={20} className="lg:h-7 lg:w-7" />
      </button>

      {/* Last in the page, so the first tab stop is still the track. Only where
          autoplay can run: not on the server, with reduced motion or with one review */}
      {autoplay.isAvailable && (
        <button
          ref={rotationButtonRef}
          type="button"
          aria-label={
            autoplay.isPlaying ? PAUSE_REVIEWS_LABEL : PLAY_REVIEWS_LABEL
          }
          aria-controls={trackId}
          onClick={autoplay.toggle}
          className={clsx(ARROW_STYLES, ROTATION_PLACEMENT)}
        >
          {autoplay.isPlaying ? (
            <Pause aria-hidden="true" size={20} className="lg:h-6 lg:w-6" />
          ) : (
            <Play aria-hidden="true" size={20} className="lg:h-6 lg:w-6" />
          )}
        </button>
      )}
    </div>
  );
}
