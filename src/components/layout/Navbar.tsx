import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronDown, Phone } from 'lucide-react';
import { LinkButton } from '../ui/LinkButton';
import { ServicesDropdown } from './ServicesDropdown';
import { ShopLabel } from './ShopLabel';
import { siteConfig, TEL_LANDLINE_LINK, PHONE_LANDLINE } from '@/lib/constants';
import type { ServiceCategories } from '@/types/service';
import { MobileMenu, type MobileMenuCategories } from './MobileMenu';

interface NavbarProps {
  categories: ServiceCategories;
}

// Top-level nav item. underline-draw (motion.css) draws a line on hover and focus
const navItemClasses =
  'underline-draw text-muted hover:text-foreground text-sm font-medium motion-safe:transition-colors motion-safe:duration-150';

// Services is a button, so it needs a pointer cursor. Its underline stays drawn
// while the dropdown is open: the pointer may be on a row, not the button
const servicesButtonClasses = clsx(
  navItemClasses,
  'flex cursor-pointer items-center gap-1',
  'group-hover:[--underline:1] group-focus-within:[--underline:1]',
);

// The call button sits at the right edge, so any change in its width moves its
// left edge. Its text is about 5px narrower in Inter (271px) than in the fallback
// font (276px), which shifted the button when Inter loaded (CLS on desktop).
// A minimum width above both (280px) keeps the box the same size in either font
const callButtonClasses = 'min-w-70';

export function Navbar({ categories }: NavbarProps) {
  // MobileMenu = Client Component
  // Strip service to serializable fields to pass down
  const mobileNavCategories: MobileMenuCategories = Object.fromEntries(
    Object.entries(categories).map(([category, services]) => [
      category,
      services.map(({ slug, title }) => ({ slug, title })),
    ]),
  );

  return (
    <header className="border-border bg-background sticky top-0 z-30 border-b">
      {/* max-w-6xl matches SectionWrapper's max-width for page-content alignment */}
      {/* relative: positions ServicesDropdown against this full-width row, not just the Services button */}
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo that links to homepage */}
        <Link href="/" className="flex h-10 w-40 shrink-0 items-center">
          <Image
            src="/images/logo.jpg"
            alt={`${siteConfig.name} logo`}
            width={160}
            height={40}
            priority
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <nav aria-label="Main" className="flex items-center gap-8">
            {/* Services + Button to show categories - add hitbox to prevent closing on hover */}
            <div className="group flex h-16 items-center">
              {/* Button to open a service category */}
              <button
                type="button"
                aria-haspopup="true"
                className={servicesButtonClasses}
              >
                Services
                <ChevronDown
                  aria-hidden="true"
                  size={14}
                  className="group-focus-within:rotate-180 group-hover:rotate-180 motion-safe:transition-transform motion-safe:duration-150"
                />
              </button>
              <ServicesDropdown categories={categories} />
            </div>

            {/* Link to About Page */}
            <Link href="/about" className={navItemClasses}>
              About
            </Link>

            {/* Shop is coming (Phase 8): a status, not a link */}
            <ShopLabel className="text-sm font-medium" />
          </nav>

          {/* Direct link to phone calls */}
          <LinkButton
            href={TEL_LANDLINE_LINK}
            variant="primary"
            size="md"
            className={callButtonClasses}
          >
            <Phone aria-hidden="true" size={16} />
            Get a Quote: {PHONE_LANDLINE}
          </LinkButton>
        </div>

        {/* Mobile Hamburger trigger + full screen panel */}
        <MobileMenu categories={mobileNavCategories} />
      </div>
    </header>
  );
}
