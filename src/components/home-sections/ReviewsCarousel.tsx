// Cycling requires state
'use client';

import { useState, Children, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface ReviewsCarouselProps {
  children: ReactNode[];
}

export default function ReviewsCarousel({ children }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = Children.toArray(children);
  const count = slides.length;

  // Wraps in both directions
  function goTo(index: number) {
    setCurrentIndex((index + count) % count);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      className="flex flex-col gap-4"
    >
      {/* Track - all slides pre-rendered, only transform moves */}
      <div className="overflow-hidden">
        <div
          aria-live="polite"
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              aria-hidden={index !== currentIndex}
              className="w-full shrink-0 px-1"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => goTo(currentIndex - 1)}
          className="text-muted hover:text-accent flex h-9 w-9 items-center justify-center rounded-full transition-colors"
        >
          <ChevronLeft aria-hidden="true" size={20} />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show review ${index + 1} of ${count}`}
              aria-current={index === currentIndex}
              onClick={() => goTo(index)}
              className={clsx(
                'h-2 w-2 rounded-full transition-colors',
                index === currentIndex ? 'bg-accent' : 'bg-border',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next review"
          onClick={() => goTo(currentIndex + 1)}
          className="text-muted hover:text-accent flex h-9 w-9 items-center justify-center rounded-full transition-colors"
        >
          <ChevronRight aria-hidden="true" size={20} />
        </button>
      </div>
    </div>
  );
}
