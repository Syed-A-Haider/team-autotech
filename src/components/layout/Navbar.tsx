import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Phone } from 'lucide-react';
import LinkButton from '../ui/LinkButton';
import ServicesDropdown from './ServicesDropdown';
import { siteConfig, TEL_MOBILE_LINK, PHONE_MOBILE } from '@/lib/constants';
import type { ServiceCategories } from '@/types/service';
import MobileMenu, { type MobileMenuCategories } from './MobileMenu';

interface NavbarProps {
  categories: ServiceCategories;
}

export default function Navbar({ categories }: NavbarProps) {
  // MobileMenu = Client Component
  // Strip service to serializable fields to pass down
  const mobileNavCategories: MobileMenuCategories = Object.fromEntries(
    Object.entries(categories).map(([category, services]) => [
      category,
      services.map(({ slug, title }) => ({ slug, title })),
    ]),
  );

  // TODO: RELOCATE BACKDROP BLUR
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
                className="text-muted hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors duration-150"
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
            <Link
              href="/about"
              className="text-muted hover:text-foreground text-sm font-medium transition-colors duration-150"
            >
              About
            </Link>
          </nav>

          {/* Direct link to phone calls */}
          <LinkButton href={TEL_MOBILE_LINK} variant="primary" size="md">
            <Phone aria-hidden="true" size={16} className="mr-2" />
            Get a Quote: {PHONE_MOBILE}
          </LinkButton>
        </div>

        {/* Mobile Hamburger trigger + full screen panel */}
        <MobileMenu categories={mobileNavCategories} />
      </div>
    </header>
  );
}
