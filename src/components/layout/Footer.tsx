import Link from 'next/link';
import clsx from 'clsx';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import {
  siteConfig,
  PHONE_LANDLINE,
  PHONE_MOBILE,
  EMAIL,
  ADDRESS,
  WHATSAPP_LINK,
  TEL_LANDLINE_LINK,
  TEL_MOBILE_LINK,
  MAILTO_LINK,
  OPENING_HOURS,
  SOCIAL_LINKS,
  GOOGLE_PROFILE_LINK,
} from '@/lib/constants';

import SectionWrapper from '@/components/ui/SectionWrapper';

interface ContactLineProps {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function ContactLine({ icon, href, children, external }: ContactLineProps) {
  // Only spreads target/rel when external is true — internal-feeling links (tel:/mailto:) stay plain
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="text-muted hover:text-accent flex items-center gap-2 text-sm transition-colors"
    >
      <span aria-hidden="true">{icon}</span>
      {children}
    </a>
  );
}

const quickLinks = [
  { label: 'Remap and Tuning', href: '/services/stage-1-tuning' },
  { label: 'Ghost Immobiliser', href: '/services/ghost-immobiliser-ii' },
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  variant?: 'accent' | 'outline';
}

// WhatsApp uses 'accent' (filled, emphasized per business priority);
// Facebook/Instagram/Youtube default to 'outline' when variant is omitted
const socialLinks: SocialLink[] = [
  {
    label: 'Chat on WhatsApp',
    href: WHATSAPP_LINK,
    icon: <FaWhatsapp size={22} />,
    variant: 'accent',
  },
  {
    label: 'Facebook',
    href: SOCIAL_LINKS.facebook,
    icon: <FaFacebook size={20} />,
  },
  {
    label: 'Instagram',
    href: SOCIAL_LINKS.instagram,
    icon: <FaInstagram size={20} />,
  },
  {
    label: 'Youtube',
    href: SOCIAL_LINKS.youtube,
    icon: <FaYoutube size={20} />,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <SectionWrapper>
        {/* Mobile-first: 2 columns by default, 4 from lg up */}
        <div className="grid grid-cols-2 gap-6 py-8 sm:gap-8 sm:py-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-foreground text-lg font-semibold">
              {siteConfig.name}
            </p>
            <p className="text-muted mt-2 hidden text-sm sm:block">
              {siteConfig.description}
            </p>

            <div className="mt-2 flex items-center gap-2 sm:mt-3 sm:gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}

                  // Shared circle sizing/shape, only fill vs outline colours differ by variant
                  className={clsx(
                    'flex h-10 w-10 items-center justify-center rounded-full transition-colors sm:h-11 sm:w-11',
                    link.variant === 'accent'
                      ? 'bg-accent hover:bg-accent-hover text-white'
                      : 'text-muted border-border hover:border-accent hover:text-accent border',
                  )}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-foreground text-sm font-semibold">
              Quick Links
            </h2>
            <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Details */}
          <div>
            <h2 className="text-foreground text-sm font-semibold">Contact</h2>
            <address className="text-muted mt-2 text-sm not-italic sm:mt-3">
              {ADDRESS}
            </address>
            <div className="mt-1.5 space-y-1.5 sm:mt-2 sm:space-y-2">
              <ContactLine
                icon={<MapPin size={18} />}
                href={GOOGLE_PROFILE_LINK}
                external
              >
                Find Us on Google
              </ContactLine>
              <ContactLine icon={<Phone size={18} />} href={TEL_LANDLINE_LINK}>
                {PHONE_LANDLINE} (Landline)
              </ContactLine>
              <ContactLine icon={<Phone size={18} />} href={TEL_MOBILE_LINK}>
                {PHONE_MOBILE} (Mobile)
              </ContactLine>
              <ContactLine icon={<Mail size={18} />} href={MAILTO_LINK}>
                {EMAIL}
              </ContactLine>

              {/* Hide whatsapp text link on phones */}
              <div className="hidden sm:block">
                <ContactLine
                  icon={<MessageCircle size={18} />}
                  href={WHATSAPP_LINK}
                  external
                >
                  WhatsApp Us
                </ContactLine>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h2 className="text-foreground text-sm font-semibold">
              Opening Hours
            </h2>
            <ul className="text-muted mt-2 space-y-1 text-sm sm:mt-3">
              <li>{OPENING_HOURS.weekdays}</li>
              <li>{OPENING_HOURS.weekend}</li>
            </ul>
          </div>
        </div>

        {/* Copyright — full-width row below the grid, not inside it */}
        <div className="border-border text-muted border-t py-3 text-center text-sm sm:py-4">
          © {year} {siteConfig.name}. All rights reserved.
        </div>
      </SectionWrapper>
    </footer>
  );
}
