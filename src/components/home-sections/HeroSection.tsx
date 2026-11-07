import Image from 'next/image';
import { Phone } from 'lucide-react';
import { LinkButton } from '../ui/LinkButton';
import { TEL_LANDLINE_LINK, PHONE_LANDLINE } from '@/lib/constants';

export const HERO_HEADLINE =
  'Vehicle Remapping, Auto Electrical & Tuning Specialists in Nelson';
export const HERO_SUBTITLE = 'Home of Auto Solutions';

// Load-in (motion.css). The image settles, the text rises in steps (hero-in-N),
// the stripe draws with the subtitle and the call button gets one sheen sweep.
// hero-solid: the h1 is the LCP text, so it rises but never fades
const IMAGE_STYLES = 'hero-settle object-cover';
const HEADLINE_STYLES =
  'hero-in-1 hero-solid text-foreground max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl';
const SUBTITLE_STYLES = 'hero-in-2 text-muted text-lg sm:text-xl';
// Same racing stripe as SectionHeading, with no margin: the flex gap spaces it
const STRIPE_STYLES = 'hero-draw-2 bg-accent block h-1 w-12 -skew-x-12';
const CALL_BUTTON_STYLES = 'hero-in-3 sheen-once lg:hidden';
// A phone dials on a tap, so the number is only text from sm up (as on the Call
// button in ContactLinks)
const CALL_NUMBER_STYLES = 'hidden sm:inline';

export function HeroSection() {
  return (
    <div className="relative h-125 max-h-[85dvh] overflow-hidden sm:h-150">
      {/* Decorative background image - alt left empty */}
      <Image
        src="/images/hero-background.jpg"
        alt=""
        fill
        priority
        className={IMAGE_STYLES}
      />

      {/* Dark gradient overlay so text is readable over photo */}
      <div className="from-background via-background/70 absolute inset-0 bg-linear-to-t to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className={HEADLINE_STYLES}>{HERO_HEADLINE}</h1>

        <span aria-hidden="true" className={STRIPE_STYLES} />

        <p className={SUBTITLE_STYLES}>{HERO_SUBTITLE}</p>

        {/* Mobile Only - replaces CTA in navbar */}
        <LinkButton
          href={TEL_LANDLINE_LINK}
          variant="primary"
          size="md"
          className={CALL_BUTTON_STYLES}
        >
          <Phone aria-hidden="true" size={16} />
          <span>
            Get a Quote
            <span className={CALL_NUMBER_STYLES}>: {PHONE_LANDLINE}</span>
          </span>
        </LinkButton>
      </div>
    </div>
  );
}
