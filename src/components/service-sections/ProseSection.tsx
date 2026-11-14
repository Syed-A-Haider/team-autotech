import clsx from 'clsx';
import type { ServiceSection } from '@/types/service';

interface ProseSectionProps {
  section: Extract<ServiceSection, { type: 'prose' }>;
  // The first section under a service hero: plays in at hero step 6 (T5.13)
  lead?: boolean;
}

// First paragraph is the lead, so a single paragraph reads as deliberate
const LEAD_STYLES = 'text-foreground text-lg leading-relaxed sm:text-xl';
const BODY_STYLES = 'text-muted leading-relaxed';

// Plain text block, revealed as one. Title and spacing come from ServiceSections
export function ProseSection({ section, lead = false }: ProseSectionProps) {
  return (
    <div
      className={clsx(lead ? 'lead-in-6' : 'reveal', 'max-w-prose space-y-5')}
    >
      {section.body.map((paragraph, index) => (
        <p
          key={index}
          className={clsx(index === 0 ? LEAD_STYLES : BODY_STYLES)}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
