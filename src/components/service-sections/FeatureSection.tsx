import clsx from 'clsx';
import type { ServiceSection } from '@/types/service';

type FeatureLayout = Extract<ServiceSection, { type: 'feature' }>['layout'];

interface FeatureSectionProps {
  section: Extract<ServiceSection, { type: 'feature' }>;
}

interface GridPlan {
  sm: { cols: 1 | 2; spans: (1 | 2)[] };
  lg: { cols: 1 | 2 | 3 | 6; spans: (1 | 2 | 3)[] };
}

const MAX_PLANNED_FEATURES = 6;

// Column spans per feature count, so the last row is always full.
// Tests pack these row by row and check no row is left short
const PLANS = {
  1: {
    sm: { cols: 1, spans: [1] },
    lg: { cols: 1, spans: [1] },
  },
  2: {
    sm: { cols: 2, spans: [1, 1] },
    lg: { cols: 2, spans: [1, 1] },
  },
  3: {
    sm: { cols: 2, spans: [2, 1, 1] },
    lg: { cols: 3, spans: [1, 1, 1] },
  },
  4: {
    sm: { cols: 2, spans: [1, 1, 1, 1] },
    lg: { cols: 2, spans: [1, 1, 1, 1] },
  },
  // 6 tracks so two rows of 2 and 3 both fill exactly
  5: {
    sm: { cols: 2, spans: [2, 1, 1, 1, 1] },
    lg: { cols: 6, spans: [2, 2, 2, 3, 3] },
  },
  6: {
    sm: { cols: 2, spans: [1, 1, 1, 1, 1, 1] },
    lg: { cols: 3, spans: [1, 1, 1, 1, 1, 1] },
  },
} satisfies Record<1 | 2 | 3 | 4 | 5 | 6, GridPlan>;

export const FEATURE_GRID_PLANS: Record<number, GridPlan> = PLANS;

// Above six features a short last row is accepted
function getGridPlan(count: number): GridPlan {
  if (count in FEATURE_GRID_PLANS && count <= MAX_PLANNED_FEATURES) {
    return FEATURE_GRID_PLANS[count];
  }
  const spans = Array.from({ length: count }, () => 1 as const);
  return { sm: { cols: 2, spans }, lg: { cols: 3, spans } };
}

// Literal class strings - Tailwind cannot build these from data
const SM_COLS = {
  1: '',
  2: 'sm:grid-cols-2',
} satisfies Record<GridPlan['sm']['cols'], string>;

const LG_COLS = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  6: 'lg:grid-cols-6',
} satisfies Record<GridPlan['lg']['cols'], string>;

const SM_SPAN = {
  1: '',
  2: 'sm:col-span-2',
} satisfies Record<GridPlan['sm']['spans'][number], string>;

const LG_SPAN = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
} satisfies Record<GridPlan['lg']['spans'][number], string>;

// Grid and list rise in turn (reveal-stagger). Alternating cards reveal one by
// one, see ALTERNATING_REVEAL
const LIST_STYLES = {
  grid: 'reveal-stagger grid gap-6',
  alternating: 'flex flex-col gap-6',
  list: 'reveal-stagger divide-border divide-y',
} satisfies Record<FeatureLayout, string>;

// Racing stripe on the top edge of each card, drawn with CSS only
const CARD_STYLES =
  'border-border bg-surface relative flex gap-4 overflow-clip rounded-lg border p-6 before:absolute before:top-0 before:left-6 before:h-1 before:w-10 before:-skew-x-12 before:bg-accent';

const ITEM_STYLES = {
  grid: CARD_STYLES,
  alternating: clsx(CARD_STYLES, 'max-w-2xl'),
  list: 'flex gap-4 py-6 first:pt-0 last:pb-0',
} satisfies Record<FeatureLayout, string>;

// Alternating zig-zags down the page: every second card sits right and mirrors
const ALTERNATE_STYLES =
  'sm:ml-auto sm:flex-row-reverse sm:text-right sm:before:right-6 sm:before:left-auto';

// Cards only zig-zag from sm, so a phone gets a plain rise and sm and up slide
// in from their own side. Even cards sit left, odd cards right
const ALTERNATING_REVEAL = [
  'max-sm:reveal sm:reveal-left',
  'max-sm:reveal sm:reveal-right',
];

const ICON_TILE_STYLES =
  'border-border bg-background flex h-11 w-11 shrink-0 items-center justify-center rounded-md border';

// Feature has no image field, so alternating is a text-only layout
export function FeatureSection({ section }: FeatureSectionProps) {
  const { layout, features } = section;
  const plan = getGridPlan(features.length);
  const isCard = layout !== 'list';

  return (
    <ul
      className={clsx(
        LIST_STYLES[layout],
        layout === 'grid' && [SM_COLS[plan.sm.cols], LG_COLS[plan.lg.cols]],
      )}
    >
      {features.map(({ icon: Icon, title, description }, index) => (
        <li
          key={title}
          className={clsx(
            ITEM_STYLES[layout],
            layout === 'grid' && [
              SM_SPAN[plan.sm.spans[index]],
              LG_SPAN[plan.lg.spans[index]],
            ],
            layout === 'alternating' && [
              ALTERNATING_REVEAL[index % 2],
              index % 2 === 1 && ALTERNATE_STYLES,
            ],
          )}
        >
          {Icon && isCard && (
            <span className={ICON_TILE_STYLES}>
              <Icon aria-hidden="true" className="text-accent h-6 w-6" />
            </span>
          )}
          {Icon && !isCard && (
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
