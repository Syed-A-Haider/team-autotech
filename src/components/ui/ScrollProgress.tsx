import clsx from 'clsx';

interface ScrollProgressProps {
  className?: string;
}

// scroll-progress (motion.css) fills the bar with the page scroll. It sits at
// z-20, under the sticky header (z-30), so an open menu or dropdown covers it.
// top-16 plus mt-px is the header's height with its 1px border
const BAR_STYLES =
  'scroll-progress bg-accent pointer-events-none fixed inset-x-0 top-16 z-20 mt-px h-0.5 origin-left print:hidden';

// Decorative reading-progress line for service pages
export function ScrollProgress({ className }: ScrollProgressProps) {
  return <div aria-hidden="true" className={clsx(BAR_STYLES, className)} />;
}
