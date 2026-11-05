import clsx from 'clsx';
import type { ReactNode } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { SectionHeading, GLOW_STYLES } from './SectionHeading';

export type SectionLayout = 'split' | 'split-reverse' | 'stacked';

interface SectionShellProps {
  title?: string;
  number?: number;
  layout: SectionLayout;
  className?: string;
  children: ReactNode;
}

interface LayoutStyles {
  grid: string;
  header: string;
  body: string;
  glow: string;
  align: 'start' | 'end' | 'center';
}

// Literal class strings per layout - Tailwind cannot build these from data.
// The mirrored layout only flips order in CSS, so the h2 stays first in the DOM
const SPLIT_GRID = 'lg:grid lg:grid-cols-5 lg:gap-16';
const SPLIT_BODY = 'lg:col-span-3';

const LAYOUT_STYLES: Record<SectionLayout, LayoutStyles> = {
  split: {
    grid: SPLIT_GRID,
    header: 'mb-8 lg:col-span-2 lg:mb-0',
    body: SPLIT_BODY,
    glow: '-top-48 -left-48',
    align: 'start',
  },
  'split-reverse': {
    grid: SPLIT_GRID,
    header: 'mb-8 lg:order-last lg:col-span-2 lg:mb-0',
    body: SPLIT_BODY,
    glow: '-top-48 -right-48',
    align: 'end',
  },
  stacked: {
    grid: '',
    header: 'mx-auto mb-12 max-w-3xl',
    body: '',
    glow: '-top-64 left-1/2 -translate-x-1/2',
    align: 'center',
  },
};

// Numbered section: glow, stripe heading and body in a split or stacked layout.
// Without a title and number it is only padding around the body.
// overflow-clip, not hidden: hidden would capture the heading's scroll reveal
export function SectionShell({
  title,
  number,
  layout,
  className,
  children,
}: SectionShellProps) {
  const styles = LAYOUT_STYLES[layout];
  const hasHeading = Boolean(title) && number !== undefined;

  return (
    <section className={clsx('relative isolate overflow-clip', className)}>
      <SectionWrapper
        as="div"
        className={clsx('relative py-16 lg:py-24', hasHeading && styles.grid)}
      >
        {hasHeading && (
          <div aria-hidden="true" className={clsx(GLOW_STYLES, styles.glow)} />
        )}
        {title && number !== undefined && (
          <SectionHeading
            title={title}
            number={number}
            align={styles.align}
            className={styles.header}
          />
        )}
        <div className={hasHeading ? styles.body : undefined}>{children}</div>
      </SectionWrapper>
    </section>
  );
}
