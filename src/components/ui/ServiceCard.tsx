import Link from 'next/link';
import clsx from 'clsx';
import type { Service } from '@/types/service';
import { serviceHref } from '@/lib/routes';

interface ServiceCardProps {
  service: Service;
}

// press = shrink on tap, lift = rise on hover (both motion.css, press owns the
// transition). group lets the icon react when the card is hovered
const cardClasses =
  'press lift group bg-surface hover:border-accent-hover flex flex-col gap-4 rounded-lg border-2 p-4 sm:p-6';

// Same ring as LinkButton, so keyboard users can see which card has focus
const cardFocusClasses =
  'focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

// Icon tilts and grows a little when the card is hovered
const iconNudgeClasses =
  'text-accent h-8 w-8 motion-safe:transition-transform motion-safe:duration-(--motion-base) motion-safe:ease-(--ease-settle) motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110';

export function ServiceCard({ service }: ServiceCardProps) {
  // Deserialise all future props
  const {
    slug,
    title,
    category,
    shortDescription,
    // Renamed as Icon to work as JSX tag (capitalised)
    icon: Icon,
    popular: featured,
  } = service;

  return (
    <Link
      href={serviceHref(slug)}
      className={clsx(
        cardClasses,
        cardFocusClasses,
        // If featured, give accent
        featured ? 'border-accent' : 'border-border',
      )}
    >
      {/* Icon + Popular tag */}
      <div className="flex items-start justify-between">
        <Icon aria-hidden="true" className={iconNudgeClasses} />
        {featured && (
          <span className="bg-accent text-foreground rounded-full px-3 py-1 text-xs font-medium">
            Popular
          </span>
        )}
      </div>

      {/* Category and Title */}
      <div className="flex flex-col gap-1">
        <span className="text-muted text-xs font-medium tracking-wide uppercase">
          {category}
        </span>
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-muted line-clamp-2 text-sm">{shortDescription}</p>
    </Link>
  );
}
