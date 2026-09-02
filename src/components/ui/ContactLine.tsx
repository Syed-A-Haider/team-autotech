// Icon + Link + Label row - shared by Footer and FindUsSection
import type { ReactNode } from 'react';

export interface ContactLineProps {
  icon: ReactNode;
  href: string;
  children: ReactNode;
  external?: boolean;
}

export default function ContactLine({
  icon,
  href,
  children,
  external,
}: ContactLineProps) {
  // When external - applies target and rel
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
