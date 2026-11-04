import type { Metadata } from 'next';
import clsx from 'clsx';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import ContactLine from '@/components/ui/ContactLine';
import LinkButton from '@/components/ui/LinkButton';
import PageHero from '@/components/ui/PageHero';
import { EnquiryBand } from '@/components/ui/EnquiryBand';
import { PageTransition } from '@/components/ui/PageTransition';
import { SectionShell } from '@/components/ui/SectionShell';
import { groupServicesByCategory } from '@/lib/services';
import {
  ADDRESS,
  EMAIL,
  MAILTO_LINK,
  MAPS_DIRECTIONS_LINK,
  OPENING_HOURS,
  PHONE_LANDLINE,
  PHONE_MOBILE,
  TEL_LANDLINE_LINK,
  TEL_MOBILE_LINK,
  YEARS_EXPERIENCE,
  siteConfig,
} from '@/lib/constants';

export const dynamic = 'error';

export const ABOUT_META_TITLE = 'About';
export const ABOUT_META_DESCRIPTION = `About ${siteConfig.name}: remapping, ECU programming, vehicle security and auto electrical specialists in Nelson, Lancashire.`;
export const ABOUT_PAGE_TITLE = `About ${siteConfig.name}`;
export const ABOUT_PAGE_SUBTITLE =
  'Remapping, ECU programming, vehicle security and auto electrical specialists in Nelson, Lancashire.';

export const ABOUT_INTRO_HEADING = 'Who We Are';
export const ABOUT_INTRO_BODY: readonly string[] = [
  `${siteConfig.name} is based in Nelson, Lancashire. We look after remapping and tuning, ECU programming, vehicle security and auto electrical work.`,
  `With more than ${YEARS_EXPERIENCE} years of experience, we use genuine Alientech tools, not cheap and dangerous clones. We keep all our hardware up to date and offer a brilliant after-sales service.`,
];

export const ABOUT_SERVICES_HEADING = 'What We Do';
export const ABOUT_SERVICES_CTA_LABEL = 'View our services';

export const ABOUT_VISIT_HEADING = 'Find Us and Get in Touch';
export const ABOUT_VISIT_INTRO =
  "We're based in Nelson, Lancashire. Here's how to find us and get in touch.";

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
const CARD_STYLES = 'bg-surface border-border rounded-lg border p-6';

// Placeholder copy until Syd supplies the real story
export default function AboutPage() {
  const categories = Object.entries(groupServicesByCategory());

  return (
    <PageTransition>
      <PageHero title={ABOUT_PAGE_TITLE} subtitle={ABOUT_PAGE_SUBTITLE} />
      <div className="divide-border divide-y">
        <SectionShell title={ABOUT_INTRO_HEADING} number={1} layout="split">
          <div className="max-w-prose space-y-5">
            {ABOUT_INTRO_BODY.map((paragraph, index) => (
              <p
                key={paragraph}
                className={clsx(index === 0 ? LEAD_STYLES : BODY_STYLES)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          title={ABOUT_SERVICES_HEADING}
          number={2}
          layout="stacked"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(([category, categoryServices]) => (
              <div key={category} className={CARD_STYLES}>
                <h3 className="text-foreground text-lg font-semibold">
                  {category}
                </h3>
                <ul className="text-muted mt-3 space-y-2 text-sm">
                  {categoryServices.map((service) => (
                    <li key={service.slug}>{service.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <LinkButton href="/#services" variant="secondary">
              {ABOUT_SERVICES_CTA_LABEL}
            </LinkButton>
          </div>
        </SectionShell>

        <SectionShell
          title={ABOUT_VISIT_HEADING}
          number={3}
          layout="split-reverse"
        >
          <p className="text-muted mb-6 max-w-prose leading-relaxed">
            {ABOUT_VISIT_INTRO}
          </p>
          <address className="flex flex-col gap-3 not-italic">
            <ContactLine
              href={MAPS_DIRECTIONS_LINK}
              icon={<MapPin size={18} />}
              external
            >
              {ADDRESS}
            </ContactLine>
            <ContactLine href={TEL_MOBILE_LINK} icon={<Phone size={18} />}>
              {PHONE_MOBILE} (Mobile)
            </ContactLine>
            <ContactLine href={TEL_LANDLINE_LINK} icon={<Phone size={18} />}>
              {PHONE_LANDLINE} (Landline)
            </ContactLine>
            <ContactLine href={MAILTO_LINK} icon={<Mail size={18} />}>
              {EMAIL}
            </ContactLine>
          </address>

          {/* Opening Hours */}
          <div className="mt-6 flex items-start gap-2">
            <Clock
              aria-hidden="true"
              className="text-accent mt-0.5 h-4.5 w-4.5 shrink-0"
            />
            <div className="text-muted text-sm">
              <p>{OPENING_HOURS.weekdays}</p>
              <p>{OPENING_HOURS.weekend}</p>
            </div>
          </div>
        </SectionShell>

        <EnquiryBand
          title={ABOUT_ENQUIRY_HEADING}
          pitch={ABOUT_ENQUIRY_PITCH}
        />
      </div>
    </PageTransition>
  );
}
