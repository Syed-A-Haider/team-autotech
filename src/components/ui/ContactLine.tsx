// Icon + Link + Label row - shared by Footer and FindUsSection
import type { ReactNode } from 'react';
import clsx from 'clsx';

interface ContactLineProps {
  icon: ReactNode;
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

export function ContactLine({
  icon,
  href,
  children,
  external,
  className,
}: ContactLineProps) {
  return (
    // When external - applies target and rel
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className={clsx(
        'text-muted hover:text-accent flex items-center gap-2 text-sm transition-colors',
        className,
      )}
    >
      <span aria-hidden="true">{icon}</span>
      {children}
    </a>
  );
}
