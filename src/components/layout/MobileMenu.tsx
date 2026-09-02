// Requires interactivity and saving state - so Client Component
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import LinkButton from '../ui/LinkButton';
import { TEL_MOBILE_LINK, PHONE_MOBILE } from '@/lib/constants';
import clsx from 'clsx';

// Smaller then 'Service' - Client Component so props passed from Server Component must be serializable
// Service.icon = function reference - cannot cross boundary
export interface MobileMenuLink {
  slug: string;
  title: string;
}

export type MobileMenuCategories = Record<string, MobileMenuLink[]>;
// Exported so tests can assert on the toggle without duplicating this string
export const MENU_TOGGLE_OPEN_LABEL = 'Open menu';
export const MENU_TOGGLE_CLOSE_LABEL = 'Close menu';

interface MobileMenuProps {
  categories: MobileMenuCategories;
}

// Shared by Home and About
const topLevelLinkClasses =
  'border-border text-foreground border-b py-3 text-base font-medium';

// Only client piece in layout - owns own toggle state + panel it controls.
// Navbar (server component) cannot hold
export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock background scroll while panel is open
  // Function only runs when [isOpen] changes value - dependency
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    // When down key pressed --> runs function
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      {/* Open/Close Button */}
      <button
        type="button"
        aria-label={isOpen ? MENU_TOGGLE_CLOSE_LABEL : MENU_TOGGLE_OPEN_LABEL}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-foreground flex h-10 w-10 items-center justify-center"
      >
        {isOpen ? (
          <X aria-hidden="true" size={24} />
        ) : (
          <Menu aria-hidden="true" size={24} />
        )}
      </button>

      {/* Full-screen panel - slides below h-16 navbar */}
      <div
        id="mobile-menu-panel"
        aria-hidden={!isOpen}
        // Prevents focus/pointer events when closed --> can't tab onto hidden links
        inert={!isOpen}
        className={clsx(
          'bg-background fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-4 py-6">
          {/* Home Button */}
          <Link href="/" onClick={close} className={topLevelLinkClasses}>
            Home
          </Link>

          {/* Services as Collapsed Accordion */}
          {Object.entries(categories).map(([category, services]) => (
            <details key={category} className="group border-border border-b">
              {/* webkit = hides chrome/safari disclosure triangle on summary */}
              <summary className="text-foreground flex cursor-pointer list-none items-center justify-between py-3 text-base font-medium [&::-webkit-details-marker]:hidden">
                {category}
                <ChevronDown
                  aria-hidden="true"
                  size={16}
                  className="group-open:rotate-180 motion-safe:transition-transform motion-safe:duration-150"
                />
              </summary>

              {/* List of all services for current category */}
              <ul className="pb-2 pl-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={close}
                      className="text-muted hover:text-foreground flex items-center gap-2 py-2 text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}

          {/* Link to About Page */}
          <Link href="/about" onClick={close} className={topLevelLinkClasses}>
            About
          </Link>

          {/* Direct link to call */}
          <LinkButton
            href={TEL_MOBILE_LINK}
            variant="primary"
            size="md"
            className="mt-6"
          >
            <Phone aria-hidden="true" size={16} className="mr-2" />
            Get a Quote: {PHONE_MOBILE}
          </LinkButton>
        </nav>
      </div>
    </div>
  );
}
