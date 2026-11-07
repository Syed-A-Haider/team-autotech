// Cycling requires state
'use client';

import {
  Children,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type WheelEvent,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export const REVIEWS_CAROUSEL_LABEL = 'Customer reviews';
export const REVIEWS_TRACK_LABEL = 'Review cards';
export const PREV_REVIEW_LABEL = 'Previous review';
export const NEXT_REVIEW_LABEL = 'Next review';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

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
const SPACER_STYLES =
  'before:w-[calc((100%_-_var(--slide))_/_2_-_var(--gap))] before:shrink-0 after:w-[calc((100%_-_var(--slide))_/_2_-_var(--gap))] after:shrink-0';

// Neighbours are clickable (aria-hidden is how they are told apart). No press:
// the card gliding to the centre is the feedback
const SLIDE_STYLES =
  'w-(--slide) shrink-0 snap-center aria-hidden:cursor-pointer';

// 44px, 48px from lg. On a phone the arrows sit in the row under the track. From
// lg they move onto the track edges, centred on the track (z-10 keeps them
// above it, as the track is positioned)
const ARROW_STYLES =
  'press border-border bg-background text-foreground hover:border-accent hover:text-accent focus-visible:ring-accent focus-visible:ring-offset-background relative z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:size-12';
const PREV_PLACEMENT =
  'col-start-2 row-start-2 lg:col-start-1 lg:row-start-1 lg:ms-2 lg:justify-self-start';
const NEXT_PLACEMENT =
  'col-start-4 row-start-2 lg:col-start-5 lg:row-start-1 lg:me-2 lg:justify-self-end';

// The button is the tap target (32x44). The visible dot is its ::before, so the
// active one can be marked by size and colour without changing the layout
const DOT_STYLES =
  'press relative flex h-11 w-8 cursor-pointer items-center justify-center before:size-2 before:rounded-full before:bg-muted lg:h-12 lg:w-10 lg:before:size-3.5 aria-[current=true]:before:scale-125 aria-[current=true]:before:bg-accent focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-accent focus-visible:before:ring-offset-2 focus-visible:before:ring-offset-background';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  // The pending animation frame, so a burst of scroll events is read once
  const frameRef = useRef<number | null>(null);
  // While a button or key scrolls to a slide, the slide it is heading for.
  // Until the scroll gets there, slides passed on the way do not count
  const targetRef = useRef<number | null>(null);
  const trackId = useId();
  const slides = Children.toArray(children);
  const count = slides.length;

  // Wraps in both directions
  function goTo(index: number) {
    const next = (index + count) % count;
    setCurrentIndex(next);

    const track = trackRef.current;
    if (!track) return;
    targetRef.current = nearestSlideIndex(track) === next ? null : next;
    const slide = track.children[next] as HTMLElement;
    track.scrollTo({
      left: slideMiddle(slide) - track.clientWidth / 2,
      behavior: window.matchMedia(REDUCED_MOTION_QUERY).matches
        ? 'auto'
        : 'smooth',
    });
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
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(syncIndexFromScroll);
  }

  // The visitor took over: follow their scroll again
  function releaseTarget() {
    targetRef.current = null;
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    // Sideways, or Shift+wheel. A plain vertical wheel is the page scrolling
    if (event.deltaX !== 0 || event.shiftKey) releaseTarget();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    const target = keyTarget(event.key, currentIndex, count);
    if (target === null) return;
    // The browser would also scroll the track a step, so stop it
    event.preventDefault();
    goTo(target);
  }

  function handleSlideClick(index: number) {
    if (index === currentIndex) return;
    // Selecting text by dragging ends in a click, which is not choosing a card
    if (window.getSelection()?.isCollapsed === false) return;
    goTo(index);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={REVIEWS_CAROUSEL_LABEL}
      className={ROOT_STYLES}
    >
      {/* Track - all slides pre-rendered, the browser scrolls and snaps them */}
      <div
        ref={trackRef}
        id={trackId}
        role="region"
        aria-label={REVIEWS_TRACK_LABEL}
        aria-live="polite"
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onPointerDown={releaseTarget}
        onWheel={handleWheel}
        className={clsx(TRACK_STYLES, SPACER_STYLES)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={index !== currentIndex}
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
        onClick={() => goTo(currentIndex - 1)}
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
            onClick={() => goTo(index)}
            className={DOT_STYLES}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label={NEXT_REVIEW_LABEL}
        aria-controls={trackId}
        onClick={() => goTo(currentIndex + 1)}
        className={clsx(ARROW_STYLES, NEXT_PLACEMENT)}
      >
        <ChevronRight aria-hidden="true" size={20} className="lg:h-7 lg:w-7" />
      </button>
    </div>
  );
}
