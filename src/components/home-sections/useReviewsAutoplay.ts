import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from 'react';

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// How much of the carousel must be on screen before it moves on by itself
const VISIBLE_SHARE = 0.5;

// The server never autoplays: it reports reduced motion and a hidden page
function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener?.('change', onChange);
  return () => query.removeEventListener?.('change', onChange);
}
const getPrefersReducedMotion = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => true;

function subscribeToVisibility(onChange: () => void) {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}
const getPageVisible = () => document.visibilityState === 'visible';
const getServerPageVisible = () => false;

interface ReviewsAutoplayOptions {
  count: number;
  // The slide in the middle slot. It changes once a move has settled, so each
  // interval is counted from the moment the last move landed
  anchor: number;
  isClient: boolean;
  intervalMs: number;
  advance: () => void;
}

// Moves a carousel on by itself, one slide per interval. It runs only while the
// carousel is on screen, the page is visible and a mouse is not over it, and it
// stops for good once the visitor uses the carousel (until they press play).
// Nothing moves for reduced motion
export function useReviewsAutoplay({
  count,
  anchor,
  isClient,
  intervalMs,
  advance,
}: ReviewsAutoplayOptions) {
  const rootRef = useRef<HTMLDivElement>(null);
  // The visitor's choice: false once they use the carousel or press pause
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getPrefersReducedMotion,
    getServerReducedMotion,
  );
  const pageVisible = useSyncExternalStore(
    subscribeToVisibility,
    getPageVisible,
    getServerPageVisible,
  );
  const moveOn = useEffectEvent(advance);

  const isAvailable = isClient && !reducedMotion && count > 1;
  const isPlaying = isAvailable && playing;
  const isRunning = isPlaying && pageVisible && inView && !hovered;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const latest = entries[entries.length - 1];
        setInView(latest.intersectionRatio >= VISIBLE_SHARE);
      },
      { threshold: VISIBLE_SHARE },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setTimeout(() => moveOn(), intervalMs);
    return () => clearTimeout(timer);
  }, [isRunning, anchor, intervalMs]);

  // A touch fires pointerenter too and never fires a leave until the next tap,
  // so only a mouse counts as hovering
  function handlePointerEnter(event: PointerEvent) {
    if (event.pointerType === 'mouse') setHovered(true);
  }

  function handlePointerLeave() {
    setHovered(false);
  }

  return {
    rootRef,
    isAvailable,
    isPlaying,
    isRunning,
    toggle: () => setPlaying((current) => !current),
    stop: () => setPlaying(false),
    handlePointerEnter,
    handlePointerLeave,
  };
}
