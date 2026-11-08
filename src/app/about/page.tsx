import type { Metadata } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import { Check, Clock, MapPin } from 'lucide-react';
import { LinkButton } from '@/components/ui/LinkButton';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { EnquiryBand } from '@/components/ui/EnquiryBand';
import { PageTransition } from '@/components/ui/PageTransition';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { groupServicesByCategory } from '@/lib/services';
import { serviceHref } from '@/lib/routes';
import {
  ADDRESS,
  MAPS_DIRECTIONS_LINK,
  OPENING_HOURS,
  YEARS_EXPERIENCE,
  siteConfig,
} from '@/lib/constants';

export const dynamic = 'error';

export const ABOUT_META_TITLE = 'About';
export const ABOUT_META_DESCRIPTION = `About ${siteConfig.name}: remapping, ECU programming, vehicle security, auto electrical, mechanical and customisation specialists in Nelson, Lancashire.`;
export const ABOUT_PAGE_TITLE = `About ${siteConfig.name}`;
export const ABOUT_PAGE_SUBTITLE =
  'Remapping, ECU programming, vehicle security, auto electrical, mechanical and customisation specialists in Nelson, Lancashire.';

export const ABOUT_INTRO_HEADING = 'Who We Are';
export const ABOUT_INTRO_BODY: readonly string[] = [
  `${siteConfig.name} is based in Nelson, Lancashire. We look after remapping and tuning, ECU programming, vehicle security, and auto electrical, mechanical and customisation work.`,
  `With more than ${YEARS_EXPERIENCE} years of experience, we use genuine Alientech tools, not cheap and dangerous clones. We keep all our hardware up to date and offer a brilliant after-sales service.`,
];
export const ABOUT_EXPERIENCE_STAT = `${YEARS_EXPERIENCE}+`;
export const ABOUT_EXPERIENCE_LABEL = 'Years of experience';
export const ABOUT_HIGHLIGHTS: readonly string[] = [
  'Genuine Alientech tools',
  'Hardware kept up to date',
  'After-sales service',
];

export const ABOUT_SERVICES_HEADING = 'What We Do';

export const ABOUT_VISIT_HEADING = 'Find Us';
export const ABOUT_VISIT_INTRO =
  "We're based in Nelson, Lancashire. Here's how to find us.";
export const ABOUT_DIRECTIONS_LABEL = 'Get Directions';

export const ABOUT_ENQUIRY_HEADING = 'Talk to Us About Your Vehicle';
export const ABOUT_ENQUIRY_PITCH =
  'Call or message us on WhatsApp for a free, no-obligation quote. Pricing depends on your vehicle and spec.';

export const metadata: Metadata = {
  title: ABOUT_META_TITLE,
  description: ABOUT_META_DESCRIPTION,
};

// First paragraph is the lead, as in ProseSection
const LEAD_STYLES = 'text-foreground text-lg leading-relaxed sm:text-xl';
const BODY_STYLES = 'text-muted leading-relaxed';
// Racing stripe on the top edge, drawn with CSS only, as in FeatureSection.
// overflow-clip, not hidden: hidden would capture the Find Us heading's reveal.
// reveal: each panel rises once, plain (no stagger, no side slide)
const PANEL_STYLES =
  'reveal bg-surface border-border relative overflow-clip rounded-lg border before:absolute before:top-0 before:left-6 before:h-1 before:w-10 before:-skew-x-12 before:bg-accent';
// Five cards on a six-column grid: 3 then 2 on desktop, and on tablet the
// last card spans both columns so none sits alone. Literal strings for Tailwind
const CATEGORY_CARD_SPANS = [
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'sm:col-span-2 lg:col-span-3',
];
const SERVICE_LINK_STYLES =
  'group text-foreground hover:bg-background hover:text-accent flex items-start gap-2 rounded-md px-2 py-2 text-sm motion-safe:transition-colors focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-inset focus-visible:outline-none';

// Placeholder copy until Syd supplies the real story
export default function AboutPage() {
  const categories = Object.entries(groupServicesByCategory());

  return (
    <PageTransition>
      <PageHero title={ABOUT_PAGE_TITLE} subtitle={ABOUT_PAGE_SUBTITLE} />
      <div className="divide-border divide-y">
        <SectionWrapper as="section" className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-5 lg:items-center lg:gap-16">
            <div className="lg:col-span-3">
              <SectionHeading title={ABOUT_INTRO_HEADING} align="start" />
              <div className="mt-8 max-w-prose space-y-5">
                {ABOUT_INTRO_BODY.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={clsx(index === 0 ? LEAD_STYLES : BODY_STYLES)}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className={clsx(PANEL_STYLES, 'p-6 sm:p-8 lg:col-span-2')}>
              <div className="sm:grid sm:grid-cols-2 sm:items-center sm:gap-8 lg:block">
                <p>
                  <span className="text-accent block text-6xl leading-none font-black tabular-nums">
                    {ABOUT_EXPERIENCE_STAT}
                  </span>
                  <span className="text-foreground mt-2 block font-semibold">
                    {ABOUT_EXPERIENCE_LABEL}
                  </span>
                </p>
                <ul className="mt-6 space-y-3 sm:mt-0 lg:mt-6">
                  {ABOUT_HIGHLIGHTS.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <Check
                        aria-hidden="true"
                        size={18}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <span className="text-muted">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper as="section" className="py-16 lg:py-24">
          <SectionHeading
            title={ABOUT_SERVICES_HEADING}
            align="center"
            className="mx-auto mb-12 max-w-3xl"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {categories.map(([category, categoryServices], index) => (
              <div
                key={category}
                className={clsx(
                  PANEL_STYLES,
                  'p-6',
                  CATEGORY_CARD_SPANS[index],
                )}
              >
                <h3 className="text-foreground text-lg font-semibold">
                  {category}
                </h3>
                <ul className="-mx-2 mt-3 space-y-1">
                  {categoryServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li key={service.slug}>
                        <Link
                          href={serviceHref(service.slug)}
                          className={SERVICE_LINK_STYLES}
                        >
                          <Icon
                            aria-hidden="true"
                            size={16}
                            className="text-muted group-hover:text-accent mt-0.5 shrink-0"
                          />
                          <span className="leading-snug">{service.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper as="section" className="py-16 lg:py-24">
          <div
            className={clsx(
              PANEL_STYLES,
              'grid gap-8 p-6 sm:p-8 md:grid-cols-2 md:items-center md:gap-12 lg:p-10',
            )}
          >
            <div>
              <SectionHeading
                title={ABOUT_VISIT_HEADING}
                align="start"
                stripe={false}
              />
              <p className="text-muted mt-6 max-w-prose leading-relaxed">
                {ABOUT_VISIT_INTRO}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <address className="flex items-start gap-2 not-italic">
                <MapPin
                  aria-hidden="true"
                  className="text-accent mt-0.5 h-4.5 w-4.5 shrink-0"
                />
                <span className="text-foreground">{ADDRESS}</span>
              </address>

              {/* Opening Hours */}
              <div className="flex items-start gap-2">
                <Clock
                  aria-hidden="true"
                  className="text-accent mt-0.5 h-4.5 w-4.5 shrink-0"
                />
                <div className="text-muted text-sm">
                  <p>{OPENING_HOURS.weekdays}</p>
                  <p>{OPENING_HOURS.weekend}</p>
                </div>
              </div>

              <LinkButton
                href={MAPS_DIRECTIONS_LINK}
                variant="secondary"
                external
                className="w-full sm:w-auto sm:self-start"
              >
                {ABOUT_DIRECTIONS_LABEL}
              </LinkButton>
            </div>
          </div>
        </SectionWrapper>

        <EnquiryBand
          title={ABOUT_ENQUIRY_HEADING}
          pitch={ABOUT_ENQUIRY_PITCH}
        />
      </div>
    </PageTransition>
  );
}
