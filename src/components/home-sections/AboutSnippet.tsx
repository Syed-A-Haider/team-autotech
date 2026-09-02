import LinkButton from '../ui/LinkButton';
import SectionWrapper from '../ui/SectionWrapper';

// Exported for tests to assert on
export const ABOUT_EYEBROW = 'About Team Autotech';
export const ABOUT_HEADLINE = 'Not Just Tuned. Track-Tested.';
export const ABOUT_BLURB =
  "We're a family-run workshop in Nelson, Lancashire, built on more than 15 years of remapping, tuning and vehicle security work. We use genuine manufacturer-grade tools - not the cheap clones - because your car deserves it done right the first time.";
export const ABOUT_CTA_LABEL = 'Meet The Team';

export default function AboutSnippet() {
  return (
    <section>
      <SectionWrapper as="div" className="py-12 text-center sm:py-16">
        {/* Small angled accent bar - motorsport motif */}
        <div
          aria-hidden="true"
          className="bg-accent mx-auto mb-4 h-1 w-24 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]"
        />

        {/* Details */}
        <span className="text-accent text-xs font-semibold tracking-widest uppercase">
          {ABOUT_EYEBROW}
        </span>
        <h2 className="text-foreground mx-auto mt-2 max-w-2xl text-2xl font-semibold sm:text-3xl">
          {ABOUT_HEADLINE}
        </h2>
        <p className="text-muted mx-auto mt-4 max-w-2xl text-sm sm:text-base">
          {ABOUT_BLURB}
        </p>
        <LinkButton href="/about" variant="secondary" className="mt-6">
          {ABOUT_CTA_LABEL}
        </LinkButton>
      </SectionWrapper>
    </section>
  );
}
