import clsx from 'clsx';
import { SectionWrapper } from './SectionWrapper';
import { SectionHeading, GLOW_STYLES } from './SectionHeading';
import { ContactLinks } from './ContactLinks';

interface EnquiryBandProps {
  title: string;
  pitch: string;
  badge?: string;
  // The first section under a service hero (the coming-soon panel, T5.13)
  lead?: boolean;
}

// Centred behind the heading, inside the section's isolate
const BAND_GLOW_STYLES = clsx(
  GLOW_STYLES,
  'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
);

// Slanted solid chip, the first thing seen in the band. The text is skewed back upright.
// pop-once: it pops into place once at load (scale and rotate, never opacity)
const BADGE_CHIP_STYLES =
  'pop-once bg-accent inline-block -skew-x-12 px-5 py-2 sm:px-7 sm:py-2.5';
const BADGE_TEXT_STYLES =
  'text-background inline-block skew-x-12 text-base font-extrabold tracking-widest uppercase sm:text-xl';

// Stacked full-width on mobile, one centred row from sm. The row rises as one
// (reveal, or lead-in-7 under a hero), the buttons keep their own press and sheen
const CONTACT_LINKS_STYLES = 'mt-8 flex-col sm:flex-row sm:justify-center';

// Shared closing band: stripe heading, pitch and the contact buttons.
// Powers both ComingSoonPanel and ServiceCtaBand.
// overflow-clip, not hidden: hidden would capture the heading's scroll reveal
export function EnquiryBand({
  title,
  pitch,
  badge,
  lead = false,
}: EnquiryBandProps) {
  return (
    <section className="relative isolate overflow-clip">
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
          <SectionHeading title={title} align="center" lead={lead} />
          <p
            className={clsx(
              lead ? 'lead-in-6' : 'reveal',
              'text-muted mx-auto mt-4 max-w-prose text-lg text-pretty',
            )}
          >
            {pitch}
          </p>
          <ContactLinks
            className={clsx(
              CONTACT_LINKS_STYLES,
              lead ? 'lead-in-7' : 'reveal',
            )}
          />
        </div>
      </SectionWrapper>
    </section>
  );
}
