import clsx from 'clsx';
import { Phone, MessageCircle } from 'lucide-react';
import LinkButton from '../ui/LinkButton';
import SectionWrapper from '../ui/SectionWrapper';
import { SectionHeading, GLOW_STYLES } from './SectionHeading';
import { TEL_MOBILE_LINK, WHATSAPP_LINK } from '@/lib/constants';

export const CALL_LABEL = 'Call us';
export const WHATSAPP_LABEL = 'WhatsApp';

interface EnquiryBandProps {
  title: string;
  pitch: string;
  badge?: string;
}

// Centred behind the heading, inside the section's isolate
const BAND_GLOW_STYLES = clsx(
  GLOW_STYLES,
  'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
);

// Slanted chip, the text is skewed back upright
const BADGE_CHIP_STYLES =
  'border-accent/40 bg-accent/10 inline-block -skew-x-12 border px-3 py-1';
const BADGE_TEXT_STYLES =
  'text-accent inline-block skew-x-12 text-xs font-semibold tracking-widest uppercase';

const CTA_BUTTON_STYLES = 'w-full sm:w-auto';

// Shared closing band: stripe heading, pitch and the two contact buttons.
// Powers both ComingSoonPanel and ServiceCtaBand
export function EnquiryBand({ title, pitch, badge }: EnquiryBandProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <SectionWrapper as="div" className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div aria-hidden="true" className={BAND_GLOW_STYLES} />
          {badge && (
            <p className="mb-4">
              <span className={BADGE_CHIP_STYLES}>
                <span className={BADGE_TEXT_STYLES}>{badge}</span>
              </span>
            </p>
          )}
          <SectionHeading title={title} align="center" />
          <p className="text-muted mx-auto mt-4 max-w-prose text-lg text-pretty">
            {pitch}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <LinkButton
              href={TEL_MOBILE_LINK}
              variant="primary"
              size="lg"
              className={CTA_BUTTON_STYLES}
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
              {CALL_LABEL}
            </LinkButton>
            <LinkButton
              href={WHATSAPP_LINK}
              variant="secondary"
              size="lg"
              external
              className={CTA_BUTTON_STYLES}
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              {WHATSAPP_LABEL}
            </LinkButton>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
