import type { Review } from '@/types/review';

export const GOOGLE_RATING = '4.8';
// Update on milestones - 200+ etc
export const GOOGLE_REVIEW_COUNT = 172;
// Rounded down to nearest 10 for display copy
export const GOOGLE_REVIEW_COUNT_DISPLAY =
  Math.floor(GOOGLE_REVIEW_COUNT / 10) * 10;

// Curated from team Autotech's Google Business Profile
// Author names truncated to First name + Surname initial for privacy
// Not exported - encapsulation = only accessible through functions
const reviews: Review[] = [
  {
    id: 'nichola-d',
    author: 'Nichola D.',
    rating: 5,
    text: "Absolutely fantastic service from start to finish. After getting a ridiculous quote from another garage and needing my car fixing quickly I approached Team AutoTech and I'm so glad I did. My car was fixed the same day and at a very reasonable price. Syd is such a helpful, friendly, knowledgeable, efficient and genuine person who goes out of his way to help you. I highly recommend Team AutoTech to anyone wanting auto mechanical or electrical work. Thank you Syd for getting my car back on the road quickly and for not ripping me off.",
    excerpt:
      'Absolutely fantastic service from start to finish. My car was fixed the same day and at a very reasonable price. I highly recommend Team AutoTech to anyone wanting auto mechanical or electrical work.',
  },
  {
    id: 'mohammed',
    author: 'Mohammed',
    rating: 5,
    text: 'Sid and the team at Autotech fitted reverse camera with android head unit and parking sensors for me. Very good job. I have also used Sid and the team for vehicle maintenance work too. Highly recommend them to everyone.',
  },
  {
    id: 'abdoulaye-m',
    author: 'Abdoulaye M.',
    rating: 5,
    text: 'These guys are the best in the business. I have been using them for several years. I trust them with my life, they have got me out of many bad situations with my car. They service and maintain my cars. I know they will be honest and hassle free. Thank you Syd.',
  },
  {
    id: 'james-n',
    author: 'James N.',
    rating: 5,
    text: 'The guys did a great job at a reasonable price replacing my exhaust with a catback system on a BMW M135i. Highly recommend and will definitely use them again.',
  },
  {
    id: 'femi-l',
    author: 'Femi L.',
    rating: 5,
    text: "Team Auto Tech has consistently delivered excellent service in fixing my VW Tiguan. Affordable repairs but excellent work. I'll recommend this place to anyone looking for the best auto mechanic shop.",
  },
];

export function getAllReviews(): Review[] {
  return reviews;
}

// Derives up to 2 uppercase initials for avatar fallback
export function getReviewInitials(author: string): string {
  return (
    author
      .trim()
      // Split on whitespaces - first and last name
      .split(/\s+/)
      // Keep first 2 split parts
      .slice(0, 2)
      // Return the first character in uppercase
      .map((part) => part.charAt(0).toUpperCase())
      // Join initials together
      .join('')
  );
}
