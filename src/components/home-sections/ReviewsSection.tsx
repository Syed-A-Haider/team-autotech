// Server wrapper - fetches reviews, renders card, passes into Client carousel
import {
  getAllReviews,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT_DISPLAY,
} from '@/lib/reviews';
import { GOOGLE_PROFILE_LINK } from '@/lib/constants';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { LinkButton } from '@/components/ui/LinkButton';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { ReviewsCarousel } from './ReviewsCarousel';

export const REVIEWS_SECTION_HEADING = 'What Our Customers Say';
export const REVIEWS_SECTION_SUBHEADING = `Rated ${GOOGLE_RATING} out of 5 from ${GOOGLE_REVIEW_COUNT_DISPLAY}+ Google reviews`;

export function ReviewsSection() {
  const reviews = getAllReviews();

  return (
    <SectionWrapper className="flex flex-col items-center gap-6 py-12 sm:py-16 lg:gap-8">
      {/* Heading + Subtitle */}
      <div className="reveal flex flex-col items-center gap-2 text-center">
        <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
          {REVIEWS_SECTION_HEADING}
        </h2>
        <p className="text-muted text-sm">{REVIEWS_SECTION_SUBHEADING}</p>
      </div>

      {/* Bleeds into the section padding so the track runs edge to edge, and
          the side cards and arrows have room. Mirrors SectionWrapper's padding */}
      <div className="-mx-4 self-stretch sm:-mx-6 lg:-mx-8">
        <ReviewsCarousel>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ReviewsCarousel>
      </div>
      {/* lg size from the desktop breakpoint, to match the larger card */}
      {/* The wrapper reveals, the button keeps its own press and sheen. A grid,
          so the inline button adds no line-box height */}
      <div className="reveal grid">
        <LinkButton
          href={GOOGLE_PROFILE_LINK}
          variant="primary"
          external
          className="lg:px-7 lg:py-3.5 lg:text-lg"
        >
          See all our reviews on Google
        </LinkButton>
      </div>
    </SectionWrapper>
  );
}
