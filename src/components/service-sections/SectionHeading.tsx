import clsx from 'clsx';

type HeadingAlign = 'start' | 'end' | 'center';

interface SectionHeadingProps {
  title: string;
  number: number;
  align: HeadingAlign;
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

// Short slanted accent bar, the racing stripe
const STRIPE_STYLES = 'mt-4 block h-1 w-12 -skew-x-12 bg-accent';

// Decorative number and stripe above the section h2
export function SectionHeading({
  title,
  number,
  align,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx(ALIGN_STYLES[align], className)}>
      <span aria-hidden="true" className={NUMBER_STYLES}>
        {String(number).padStart(SECTION_NUMBER_DIGITS, '0')}
      </span>
      <span
        aria-hidden="true"
        className={clsx(STRIPE_STYLES, STRIPE_ALIGN[align])}
      />
      <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
