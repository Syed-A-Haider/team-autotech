// components/service-sections/ServiceCtaBand.tsx
import { Phone, MessageCircle } from 'lucide-react';
import type { Service } from '@/types/service';
import LinkButton from '../ui/LinkButton';
import SectionWrapper from '../ui/SectionWrapper';
import { TEL_MOBILE_LINK, WHATSAPP_LINK } from '@/lib/constants';

interface ServiceCtaBandProps {
  service: Service;
}

// Closing, personalised CTA for a live service page. Only rendered by
// Left-aligned (not centered) is the deliberate distinction from
// ComingSoonPanel's centered placeholder box.
export function ServiceCtaBand({ service }: ServiceCtaBandProps) {
  return (
    <SectionWrapper as="section" className="py-16">
      <h2 className="text-foreground text-2xl font-semibold">
        Interested in {service.title}?
      </h2>
      <p className="text-muted mt-3 max-w-prose">
        Get in touch for a free, no-obligation quote - pricing depends on your
        vehicle and spec.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton href={TEL_MOBILE_LINK} variant="primary" size="md">
          <Phone aria-hidden="true" className="h-4 w-4" />
          Call us
        </LinkButton>
        <LinkButton href={WHATSAPP_LINK} variant="secondary" size="md" external>
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          WhatsApp
        </LinkButton>
      </div>
    </SectionWrapper>
  );
}
