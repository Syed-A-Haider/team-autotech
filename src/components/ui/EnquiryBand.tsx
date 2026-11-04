import clsx from 'clsx';
import SectionWrapper from './SectionWrapper';
import { SectionHeading, GLOW_STYLES } from './SectionHeading';
import { ContactLinks } from './ContactLinks';

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

// Slanted solid chip, the first thing seen in the band. The text is skewed back upright
const BADGE_CHIP_STYLES =
  'bg-accent inline-block -skew-x-12 px-5 py-2 sm:px-7 sm:py-2.5';
const BADGE_TEXT_STYLES =
  'text-background inline-block skew-x-12 text-base font-extrabold tracking-widest uppercase sm:text-xl';

// Stacked full-width on mobile, one centred row from sm
const CONTACT_LINKS_STYLES = 'mt-8 flex-col sm:flex-row sm:justify-center';

// Shared closing band: stripe heading, pitch and the contact buttons.
// Powers both ComingSoonPanel and ServiceCtaBand
export function EnquiryBand({ title, pitch, badge }: EnquiryBandProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <SectionWrapper as="div" className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div aria-hidden="true" className={BAND_GLOW_STYLES} />
          {badge && (
            <p className="mb-6">
              <span className={BADGE_CHIP_STYLES}>
                <span className={BADGE_TEXT_STYLES}>{badge}</span>
              </span>
            </p>
          )}
          <SectionHeading title={title} align="center" />
          <p className="text-muted mx-auto mt-4 max-w-prose text-lg text-pretty">
            {pitch}
          </p>
          <ContactLinks className={CONTACT_LINKS_STYLES} />
        </div>
      </SectionWrapper>
    </section>
  );
}
