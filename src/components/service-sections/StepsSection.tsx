import type { ServiceSection } from '@/types/service';

interface StepsSectionProps {
  section: Extract<ServiceSection, { type: 'steps' }>;
}

// Slanted badge, the inner span un-slants the number
const BADGE_STYLES =
  'bg-accent flex h-9 w-9 shrink-0 -skew-x-12 items-center justify-center rounded-sm';
const BADGE_NUMBER_STYLES =
  'text-background skew-x-12 text-sm font-bold tabular-nums';

// role="list" keeps list semantics in Safari, which drops them with list-none
export function StepsSection({ section }: StepsSectionProps) {
  return (
    <ol role="list" className="space-y-6">
      {section.steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span aria-hidden="true" className={BADGE_STYLES}>
            <span className={BADGE_NUMBER_STYLES}>{index + 1}</span>
          </span>
          <div>
            <h3 className="text-foreground text-lg font-semibold">
              {step.title}
            </h3>
            <p className="text-muted mt-1">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
