import { LinkButton } from '../ui/LinkButton';
import { SectionWrapper } from '../ui/SectionWrapper';
import { YEARS_EXPERIENCE } from '@/lib/constants';

// Exported for tests to assert on
export const ABOUT_EYEBROW = 'About Team Autotech';
export const ABOUT_HEADLINE = 'Not Just Tuned. Track-Tested.';
export const ABOUT_BLURB = `We're a family-run workshop in Nelson, Lancashire, built on more than ${YEARS_EXPERIENCE} years of remapping, tuning and vehicle security work. We use genuine manufacturer-grade tools - not the cheap clones - because your car deserves it done right the first time.`;
export const ABOUT_CTA_LABEL = 'More About Us';

export function AboutSnippet() {
  return (
    <section>
      {/* reveal-stagger: the heading block, text and button rise in turn */}
      <SectionWrapper
        as="div"
        className="reveal-stagger py-12 text-center sm:py-16"
      >
        <div>
          {/* Small angled accent bar - motorsport motif, drawn out on scroll */}
          <div
            aria-hidden="true"
            className="stripe-draw bg-accent mx-auto mb-4 h-1 w-24 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]"
          />

          {/* Details */}
          <span className="text-accent text-xs font-semibold tracking-widest uppercase">
            {ABOUT_EYEBROW}
          </span>
          <h2 className="text-foreground mx-auto mt-2 max-w-2xl text-2xl font-semibold sm:text-3xl">
            {ABOUT_HEADLINE}
          </h2>
        </div>
        <p className="text-muted mx-auto mt-4 max-w-2xl text-sm sm:text-base">
          {ABOUT_BLURB}
        </p>
        {/* The wrapper takes the reveal, the button keeps its press */}
        <div className="mt-6 flex justify-center">
          <LinkButton href="/about" variant="secondary">
            {ABOUT_CTA_LABEL}
          </LinkButton>
        </div>
      </SectionWrapper>
    </section>
  );
}
