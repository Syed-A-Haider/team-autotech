import type { ServiceSection } from '@/types/service';

interface ProseSectionProps {
  section: Extract<ServiceSection, { type: 'prose' }>;
}

// Plain text block. Title and spacing come from ServiceSections
export function ProseSection({ section }: ProseSectionProps) {
  return (
    <div className="text-muted max-w-prose space-y-4">
      {section.body.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
