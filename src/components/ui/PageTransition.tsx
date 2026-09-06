import type { ReactNode } from 'react';
import clsx from 'clsx';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Replays on fresh mount
// Callers must pass "key" if route doesn't
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <div className={clsx('motion-safe:animate-page-enter', className)}>
      {children}
    </div>
  );
}
