import clsx from 'clsx';
import type { ServiceSection } from '@/types/service';

type FeatureLayout = Extract<ServiceSection, { type: 'feature' }>['layout'];

interface FeatureSectionProps {
  section: Extract<ServiceSection, { type: 'feature' }>;
}

// Literal class strings per layout - Tailwind cannot build these from data
const LIST_STYLES: Record<FeatureLayout, string> = {
  grid: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
  alternating: 'flex flex-col gap-6',
  list: 'divide-border divide-y',
};

const ITEM_STYLES: Record<FeatureLayout, string> = {
  grid: 'border-border bg-surface flex gap-4 rounded-lg border p-6',
  alternating:
    'border-border bg-surface flex max-w-2xl gap-4 rounded-lg border p-6',
  list: 'flex gap-4 py-6 first:pt-0 last:pb-0',
};

// Alternating zig-zags down the page by pushing every second item right
const ALTERNATE_OFFSET = 'sm:ml-auto';

// Feature has no image field, so alternating is a text-only layout
export function FeatureSection({ section }: FeatureSectionProps) {
  const { layout, features } = section;

  return (
    <ul className={LIST_STYLES[layout]}>
      {features.map(({ icon: Icon, title, description }, index) => (
        <li
          key={title}
          className={clsx(
            ITEM_STYLES[layout],
            layout === 'alternating' && index % 2 === 1 && ALTERNATE_OFFSET,
          )}
        >
          {Icon && (
            <Icon aria-hidden="true" className="text-accent h-6 w-6 shrink-0" />
          )}
          <div>
            <h3 className="text-foreground text-lg font-semibold">{title}</h3>
            <p className="text-muted mt-2">{description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
