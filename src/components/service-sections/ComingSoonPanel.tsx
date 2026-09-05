// components/service-sections/ComingSoonPanel.tsx
import { Phone, MessageCircle } from 'lucide-react';
import type { Service } from '@/types/service';
import LinkButton from '../ui/LinkButton';
import SectionWrapper from '../ui/SectionWrapper';
import { TEL_MOBILE_LINK, WHATSAPP_LINK } from '@/lib/constants';

interface ComingSoonPanelProps {
  service: Service;
}

// Placeholder body for a service with no page content yet
// Dashed border + smaller type signal "temporary state"
export function ComingSoonPanel({ service }: ComingSoonPanelProps) {
  return (
    <SectionWrapper as="section" className="py-16">
      <div className="border-border mx-auto max-w-xl rounded-lg border border-dashed px-8 py-10 text-center">
        <h2 className="text-foreground text-lg font-semibold">
          Full details on {service.title} are coming soon
        </h2>
        <p className="text-muted mt-2 text-sm">
          In the meantime, get in touch and we&apos;ll be happy to answer any
          questions.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LinkButton href={TEL_MOBILE_LINK} variant="primary" size="md">
            <Phone aria-hidden="true" className="h-4 w-4" />
            Call us
          </LinkButton>
          <LinkButton
            href={WHATSAPP_LINK}
            variant="secondary"
            size="md"
            external
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            WhatsApp
          </LinkButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
