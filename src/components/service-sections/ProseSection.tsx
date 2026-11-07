import clsx from 'clsx';
import type { ServiceSection } from '@/types/service';

interface ProseSectionProps {
  section: Extract<ServiceSection, { type: 'prose' }>;
}

// First paragraph is the lead, so a single paragraph reads as deliberate
const LEAD_STYLES = 'text-foreground text-lg leading-relaxed sm:text-xl';
const BODY_STYLES = 'text-muted leading-relaxed';

// Plain text block, revealed as one. Title and spacing come from ServiceSections
export function ProseSection({ section }: ProseSectionProps) {
  return (
    <div className="reveal max-w-prose space-y-5">
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
