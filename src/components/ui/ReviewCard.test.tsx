import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReviewCard from './ReviewCard';
import type { Review } from '@/types/review';

const reviewWithExcerpt: Review = {
  id: 'test-with-excerpt',
  author: 'Test A.',
  rating: 4,
  text: 'This is the full review text with plenty of extra detail that would normally be truncated on the card.',
  excerpt: 'This is the excerpt.',
};

const reviewWithoutExcerpt: Review = {
  id: 'test-without-excerpt',
  author: 'Test B.',
  rating: 5,
  text: 'A short review with no curated excerpt at all.',
};

describe('ReviewCard', () => {
  it('Renders the excerpt when one is provided', () => {
    render(<ReviewCard review={reviewWithExcerpt} />);
    expect(screen.getByText('This is the excerpt.')).toBeInTheDocument();
  });

  it('Falls back to the full text when no excerpt is provided', () => {
    render(<ReviewCard review={reviewWithoutExcerpt} />);
    expect(screen.getByText(reviewWithoutExcerpt.text)).toBeInTheDocument();
  });

  it('Renders the author name', () => {
    render(<ReviewCard review={reviewWithExcerpt} />);
    expect(screen.getByText('Test A.')).toBeInTheDocument();
  });

  it('Renders generated initials when no photoUrl is present', () => {
    render(<ReviewCard review={reviewWithExcerpt} />);
    expect(screen.getByText('TA')).toBeInTheDocument();
  });

  it('Announces the rating to screen readers', () => {
    render(<ReviewCard review={reviewWithExcerpt} />);
    expect(screen.getByText('Rated 4 out of 5')).toBeInTheDocument();
  });
});
