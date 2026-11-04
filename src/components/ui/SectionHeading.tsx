import clsx from 'clsx';

type HeadingAlign = 'start' | 'end' | 'center';

interface SectionHeadingProps {
  title: string;
  number?: number;
  align: HeadingAlign;
  stripe?: boolean;
  className?: string;
}

const SECTION_NUMBER_DIGITS = 2;

// Text and stripe position per alignment. Mirrored text is right-aligned from lg
const ALIGN_STYLES: Record<HeadingAlign, string> = {
  start: '',
  end: 'lg:text-right',
  center: 'text-center',
};

const STRIPE_ALIGN: Record<HeadingAlign, string> = {
  start: '',
  end: 'lg:ml-auto',
  center: 'mx-auto',
};

// Faded race number. Normal Inter only, so no italic. A fill, not a text
// stroke: the variable font's overlapping contours show through a stroke
const NUMBER_STYLES =
  'text-accent/25 block text-6xl leading-none font-black tabular-nums lg:text-8xl';

// Short slanted accent bar, the racing stripe. first:mt-0 drops the gap when
// there is no number above it
const STRIPE_STYLES = 'mt-4 first:mt-0 block h-1 w-12 -skew-x-12 bg-accent';

// Gradient, not blur or filter: a filter would trap fixed children
export const GLOW_STYLES =
  'pointer-events-none absolute -z-10 size-[36rem] rounded-full bg-radial from-accent/10 to-transparent to-70%';

// Decorative number and stripe above the section h2. stripe={false} drops the
// stripe when a parent panel already has one
export function SectionHeading({
  title,
  number,
  align,
  stripe = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx(ALIGN_STYLES[align], className)}>
      {number !== undefined && (
        <span aria-hidden="true" className={NUMBER_STYLES}>
          {String(number).padStart(SECTION_NUMBER_DIGITS, '0')}
        </span>
      )}
      {stripe && (
        <span
          aria-hidden="true"
          className={clsx(STRIPE_STYLES, STRIPE_ALIGN[align])}
        />
      )}
      <h2
        className={clsx(
          'text-foreground text-3xl font-bold tracking-tight text-balance sm:text-4xl',
          stripe && 'mt-4',
        )}
      >
        {title}
      </h2>
    </div>
  );
}
