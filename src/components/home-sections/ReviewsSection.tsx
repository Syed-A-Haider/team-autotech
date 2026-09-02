// Server wrapper - fetches reviews, renders card, passes into Client carousel
import {
  getAllReviews,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT_DISPLAY,
} from '@/lib/reviews';
import { GOOGLE_PROFILE_LINK } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import LinkButton from '@/components/ui/LinkButton';
import ReviewCard from '@/components/ui/ReviewCard';
import ReviewsCarousel from './ReviewsCarousel';

export const REVIEWS_SECTION_HEADING = 'What Our Customers Say';
export const REVIEWS_SECTION_SUBHEADING = `Rated ${GOOGLE_RATING} out of 5 from ${GOOGLE_REVIEW_COUNT_DISPLAY}+ Google reviews`;

export default function ReviewsSection() {
  const reviews = getAllReviews();

  return (
    <SectionWrapper className="flex flex-col items-center gap-6 py-12 sm:py-16">
      {/* Heading + Subtitle */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
          {REVIEWS_SECTION_HEADING}
        </h2>
        <p className="text-muted text-sm">{REVIEWS_SECTION_SUBHEADING}</p>
      </div>

      <div className="w-full max-w-2xl">
        <ReviewsCarousel>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ReviewsCarousel>
      </div>
      <LinkButton href={GOOGLE_PROFILE_LINK} variant="primary" external>
        See all our reviews on Google
      </LinkButton>
    </SectionWrapper>
  );
}
