import { describe, it, expect } from 'vitest';
import { getAllReviews, getReviewInitials } from './reviews';

describe('getAllReviews', () => {
  it('Returns a non-empty array of reviews', () => {
    expect(getAllReviews().length).toBeGreaterThan(0);
  });

  it('Every review has required fields populated', () => {
    getAllReviews().forEach((review) => {
      expect(review.id).toBeTruthy();
      expect(review.author).toBeTruthy();
      expect(review.text).toBeTruthy();
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
    });
  });

  it('Every review has a unique id', () => {
    const ids = getAllReviews().map((review) => review.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('getReviewInitials', () => {
  it('Returns two initials for a first name + surname initial', () => {
    expect(getReviewInitials('Nichola D.')).toBe('ND');
  });

  it('Returns a single initial for a single-word name', () => {
    expect(getReviewInitials('Mohammed')).toBe('M');
  });

  it('Ignores extra whitespace', () => {
    expect(getReviewInitials('  James   N.  ')).toBe('JN');
  });
});
