import Image from 'next/image';
import clsx from 'clsx';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import type { Review } from '@/types/review';
import { getReviewInitials } from '@/lib/reviews';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const { author, rating, text, excerpt: exerpt, photoUrl } = review;

  return (
    <div
      className={clsx(
        'bg-surface border-border flex h-full flex-col gap-4 rounded-lg border-2 p-6 lg:gap-6 lg:p-10',
        className,
      )}
    >
      {/* Rating + Source */}
      <div className="flex items-center justify-between">
        {/* star-pop only does anything inside a carousel-depth slide */}
        <div className="star-pop flex items-center gap-0.5">
          {/* Render the stars */}
          {Array.from({ length: 5 }, (_, i) =>
            i < rating ? (
              <FaStar
                key={i}
                aria-hidden="true"
                className="text-accent h-4 w-4 lg:h-6 lg:w-6"
              />
            ) : (
              <FaRegStar
                key={i}
                aria-hidden="true"
                className="text-muted h-4 w-4 lg:h-6 lg:w-6"
              />
            ),
          )}
          <span className="sr-only">Rated {rating} out of 5</span>
        </div>

        <SiGoogle
          aria-hidden="true"
          className="text-muted h-4 w-4 lg:h-6 lg:w-6"
        />
      </div>

      {/* Curated exerpt where available */}
      <p className="text-foreground line-clamp-6 text-sm lg:text-xl lg:leading-relaxed">
        {exerpt ?? text}
      </p>

      {/* Avatar + author */}
      {/* Render photo if url given, else show initials */}
      <div className="mt-auto flex items-center gap-3">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="bg-accent text-foreground flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
          >
            {getReviewInitials(author)}
          </span>
        )}
        <span className="text-foreground text-sm font-medium lg:text-base">
          {author}
        </span>
      </div>
    </div>
  );
}
