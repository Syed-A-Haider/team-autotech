// components/service-sections/ComingSoonPanel.tsx
import type { Service } from '@/types/service';
import { EnquiryBand } from './EnquiryBand';

export const COMING_SOON_BADGE = 'Coming soon';
export const COMING_SOON_HEADING_PREFIX = 'Ask us about';
export const COMING_SOON_PITCH =
  "Full details are on their way. In the meantime, call or WhatsApp us and we'll be happy to answer any questions.";

interface ComingSoonPanelProps {
  service: Service;
}

// Placeholder body for a service with no page content yet
export function ComingSoonPanel({ service }: ComingSoonPanelProps) {
  return (
    <EnquiryBand
      title={`${COMING_SOON_HEADING_PREFIX} ${service.title}`}
      pitch={COMING_SOON_PITCH}
      badge={COMING_SOON_BADGE}
    />
  );
}
