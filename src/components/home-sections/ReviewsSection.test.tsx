import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReviewsSection, {
  REVIEWS_SECTION_HEADING,
  REVIEWS_SECTION_SUBHEADING,
} from './ReviewsSection';
import { getAllReviews } from '@/lib/reviews';
import { GOOGLE_PROFILE_LINK } from '@/lib/constants';

describe('ReviewsSection', () => {
  it('Renders the section heading', () => {
    render(<ReviewsSection />);
    expect(
      screen.getByRole('heading', { name: REVIEWS_SECTION_HEADING }),
    ).toBeInTheDocument();
  });

  it('Renders the rating subheading', () => {
    render(<ReviewsSection />);
    expect(screen.getByText(REVIEWS_SECTION_SUBHEADING)).toBeInTheDocument();
  });

  it('Renders every curated review', () => {
    render(<ReviewsSection />);
    getAllReviews().forEach((review) => {
      expect(screen.getByText(review.author)).toBeInTheDocument();
    });
  });

  it('Links out to the Google Business Profile', () => {
    render(<ReviewsSection />);
    const link = screen.getByRole('link', {
      name: /see all our reviews on google/i,
    });
    expect(link).toHaveAttribute('href', GOOGLE_PROFILE_LINK);
  });
});
