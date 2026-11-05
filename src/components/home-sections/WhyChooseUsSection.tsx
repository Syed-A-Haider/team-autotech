import { Award, ShieldCheck, BadgeCheck, type LucideIcon } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT_DISPLAY } from '@/lib/reviews';
import { WhyChooseUsCard } from './WhyChooseUsCard';

// Exported so WhyChooseUsCard can use the same shape
export interface WhyChooseUsItem {
  id: string;
  icon: LucideIcon | IconType;
  title: string;
  description: string;
}

export const sectionHeading = 'Built different. Driven by results.';
export const sectionSubheading =
  'Fifteen years tuning, securing and fixing vehicles across Lancashire - the numbers back it up.';

export const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    id: 'experience',
    icon: Award,
    title: '15+ Years of Experience',
    description:
      'Over 15 years remapping, tuning and repairing vehicles across all major makes.',
  },
  {
    id: 'ghost-installer',
    icon: ShieldCheck,
    title: 'Authorised Ghost Immobiliser II Installer',
    description:
      "Officially authorised to fit the UK's leading stealth immobiliser system.",
  },
  {
    id: 'guarantee',
    icon: BadgeCheck,
    title: "We'll Fix It If It's Wrong",
    description:
      "If something's not right, we'll put it right — every job is backed by our guarantee.",
  },
  {
    id: 'google-rating',
    icon: SiGoogle,
    title: `${GOOGLE_RATING}★ Google Rating`,
    description: `Rated ${GOOGLE_RATING} stars from ${GOOGLE_REVIEW_COUNT_DISPLAY}+ customers on Google.`,
  },
];

export function WhyChooseUsSection() {
  return (
    <section>
      <SectionWrapper as="div" className="pt-10 pb-8 sm:pt-14 sm:pb-10">
        <h2 className="text-foreground text-center text-2xl font-semibold sm:text-3xl">
          {sectionHeading}
        </h2>
        <p className="text-muted mt-2 text-center text-sm sm:text-base">
          {sectionSubheading}
        </p>
      </SectionWrapper>

      {/* Full-bleed band - deliberately NOT inside SectionWrapper. Top border
          only: the page's divide-y already draws the line under the section */}
      <div className="bg-surface border-border border-t">
        <SectionWrapper as="div" className="py-10 sm:py-14">
          {/* 1 column on phones, 2 from sm, 4 from lg. reveal-stagger fades each
              list item in turn. The item takes the reveal and its one-cell grid
              stretches the card, so rows stay equal height. role="list" keeps
              list semantics in Safari, which drops them with list-none */}
          <ul
            role="list"
            className="reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {whyChooseUsItems.map((item) => (
              <li key={item.id} className="grid">
                <WhyChooseUsCard item={item} />
              </li>
            ))}
          </ul>
        </SectionWrapper>
      </div>
    </section>
  );
}
