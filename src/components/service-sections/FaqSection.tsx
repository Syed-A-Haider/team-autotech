import { ChevronDown } from 'lucide-react';
import type { ServiceSection } from '@/types/service';

interface FaqSectionProps {
  section: Extract<ServiceSection, { type: 'faq' }>;
}

// Native <details>, so it works with zero JS. All items start closed
export function FaqSection({ section }: FaqSectionProps) {
  return (
    <div className="divide-border border-border divide-y rounded-lg border">
      {section.items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="text-accent h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="text-muted mt-4">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
