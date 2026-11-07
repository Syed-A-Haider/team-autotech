import { ChevronDown } from 'lucide-react';
import type { ServiceSection } from '@/types/service';

interface FaqSectionProps {
  section: Extract<ServiceSection, { type: 'faq' }>;
}

// details-expand (motion.css) animates the answer. The before: bar is an accent
// edge that grows when the row is open. It ignores the pointer so a tap on it
// still reaches the summary
const rowClasses =
  'details-expand group relative before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1 before:scale-y-0 before:bg-accent open:before:scale-y-100 motion-safe:before:transition-[scale] motion-safe:before:duration-(--motion-base) motion-safe:before:ease-(--ease-settle)';

// The padding lives here, not on the row, so the whole row is the click target
const summaryClasses =
  'text-foreground hover:bg-surface focus-visible:ring-accent flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-semibold focus-visible:ring-2 focus-visible:ring-inset focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-(--motion-fast) motion-safe:ease-(--ease-standard) [&::-webkit-details-marker]:hidden';

// Decorative: the summary is the control
const chipClasses =
  'border-border text-accent group-open:border-accent flex size-8 shrink-0 items-center justify-center rounded-full border group-open:rotate-180 motion-safe:transition-[rotate,border-color] motion-safe:duration-(--motion-base) motion-safe:ease-(--ease-settle)';

// Native <details>, so it works with zero JS. All items start closed
export function FaqSection({ section }: FaqSectionProps) {
  return (
    <div className="divide-border border-border divide-y overflow-clip rounded-lg border">
      {section.items.map((item) => (
        <details key={item.question} className={rowClasses}>
          <summary className={summaryClasses}>
            {item.question}
            <span aria-hidden="true" className={chipClasses}>
              <ChevronDown className="h-5 w-5" />
            </span>
          </summary>
          <p className="text-muted px-6 pt-4 pb-6">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
