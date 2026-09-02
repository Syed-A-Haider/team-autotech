'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface MapEmbedProps {
  src: string;
  title: string;
  className?: string;
}

// Client Component: needs iframe's onLoad event to know when to hide skeleton
export default function MapEmbed({ src, title, className }: MapEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={clsx('relative', className)} aria-busy={!isLoaded}>
      {/* Skeleton covers iframe until onLoad fires */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="bg-border absolute inset-0 motion-safe:animate-pulse"
        />
      )}

      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
        className={clsx(
          'h-full w-full transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}
