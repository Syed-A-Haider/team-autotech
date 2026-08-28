import Link from 'next/link';
import clsx from 'clsx';
import type { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
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
      href={`/services/${slug}`}
      className={clsx(
        'bg-surface hover:border-accent-hover flex flex-col gap-4 rounded-lg border-2 p-4 transition-colors sm:p-6',
        // If featured, give accent
        featured ? 'border-accent' : 'border-border',
      )}
    >
      {/* Icon + Popular tag if featured */}
      <div className="flex items-start justify-between">
        <Icon aria-hidden="true" className="text-accent h-8 w-8" />
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
