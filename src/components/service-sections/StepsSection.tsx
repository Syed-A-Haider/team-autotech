import type { ServiceSection } from '@/types/service';

interface StepsSectionProps {
  section: Extract<ServiceSection, { type: 'steps' }>;
}

// role="list" keeps list semantics in Safari, which drops them with list-none
export function StepsSection({ section }: StepsSectionProps) {
  return (
    <ol role="list" className="space-y-6">
      {section.steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span
            aria-hidden="true"
            className="bg-accent text-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
          >
            {index + 1}
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
