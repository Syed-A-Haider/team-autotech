import { Award, ShieldCheck, BadgeCheck, type LucideIcon } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
import type { IconType } from 'react-icons';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/reviews';
import WhyChooseUsCard from './WhyChooseUsCard';
import styles from './WhyChooseUsSection.module.css';

// Exported so WhyChooseUsCard can use the same shape
export interface WhyChooseUsItem {
  id: string;
  icon: LucideIcon | IconType;
  title: string;
  description: string;
  // Which edge the icon/wedge slides to on hover
  iconAlign: 'left' | 'right';
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
    iconAlign: 'left',
  },
  {
    id: 'ghost-installer',
    icon: ShieldCheck,
    title: 'Authorised Ghost Immobiliser II Installer',
    description:
      "Officially authorised to fit the UK's leading stealth immobiliser system.",
    iconAlign: 'left',
  },
  {
    id: 'guarantee',
    icon: BadgeCheck,
    title: "We'll Fix It If It's Wrong",
    description:
      "If something's not right, we'll put it right — every job is backed by our guarantee.",
    iconAlign: 'right',
  },
  {
    id: 'google-rating',
    icon: SiGoogle,
    title: `${GOOGLE_RATING}★ Google Rating`,
    description: `Rated ${GOOGLE_RATING} stars from ${Math.floor(GOOGLE_REVIEW_COUNT / 10) * 10}+ customers on Google.`,
    iconAlign: 'right',
  },
];

export default function WhyChooseUsSection() {
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

      {/* Full-bleed - deliberately NOT inside SectionWrapper*/}
      <div className={styles.row}>
        {whyChooseUsItems.map((item) => (
          <WhyChooseUsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
