// components/service-sections/ServiceCtaBand.tsx
import type { Service } from '@/types/service';
import { EnquiryBand } from '../ui/EnquiryBand';

export const CTA_HEADING_PREFIX = 'Interested in';
export const CTA_PITCH =
  'Get in touch for a free, no-obligation quote - pricing depends on your vehicle and spec.';

interface ServiceCtaBandProps {
  service: Service;
}

// Closing, personalised CTA for a live service page. Only rendered by
// ServicePageTemplate, for live services
export function ServiceCtaBand({ service }: ServiceCtaBandProps) {
  return (
    <EnquiryBand
      title={`${CTA_HEADING_PREFIX} ${service.title}?`}
      pitch={CTA_PITCH}
    />
  );
}
