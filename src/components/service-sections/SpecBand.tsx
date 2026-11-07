import clsx from 'clsx';
import type { ServiceSection } from '@/types/service';

interface SpecBandProps {
  section: Extract<ServiceSection, { type: 'specband' }>;
}

// Columns chosen by count so the last row is never left with one tile
const COLUMN_STYLES: Record<number, string> = {
  1: '',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'sm:grid-cols-3',
};
const FALLBACK_COLUMNS = 'sm:grid-cols-2 lg:grid-cols-4';

const TILE_STYLES =
  'border-accent bg-surface rounded-r-lg border-l-2 px-6 py-5';
const LABEL_STYLES = 'text-muted text-xs font-medium tracking-wider uppercase';
const VALUE_STYLES = 'text-foreground mt-2 text-2xl font-bold tabular-nums';

// Key facts as label/value pairs
export function SpecBand({ section }: SpecBandProps) {
  const columns = COLUMN_STYLES[section.specs.length] ?? FALLBACK_COLUMNS;

  return (
    <dl className={clsx('reveal-stagger grid gap-6', columns)}>
      {section.specs.map((spec) => (
        <div key={spec.label} className={TILE_STYLES}>
          <dt className={LABEL_STYLES}>{spec.label}</dt>
          <dd className={VALUE_STYLES}>{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
