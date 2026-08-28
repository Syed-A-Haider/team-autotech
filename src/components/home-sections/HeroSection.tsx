import Image from 'next/image';
import { Phone } from 'lucide-react';
import LinkButton from '../ui/LinkButton';
import { TEL_MOBILE_LINK, PHONE_MOBILE } from '@/lib/constants';

export const HERO_HEADLINE =
  'Vehicle Remapping, Auto Electrical & Tuning Specialists in Nelson';
export const HERO_SUBTITLE = 'Home of Auto Solutions';

export default function HeroSection() {
  return (
    <div className="relative h-125 overflow-hidden sm:h-150">
      {/* Decorative background image - alt left empty */}
      <Image
        src="/images/hero-background.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Dark gradient overlay so text is readable over photo */}
      <div className="from-background via-background/70 absolute inset-0 bg-linear-to-t to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-foreground max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {HERO_HEADLINE}
        </h1>

        <p className="text-muted text-lg sm:text-xl">{HERO_SUBTITLE}</p>

        {/* Mobile Only - replaces CTA in navbar */}
        <LinkButton
          href={TEL_MOBILE_LINK}
          variant="primary"
          size="md"
          className="lg:hidden"
        >
          <Phone aria-hidden="true" size={16} className="mr-2" />
          Get a Quote: {PHONE_MOBILE}
        </LinkButton>
      </div>
    </div>
  );
}
