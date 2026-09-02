// Shape of curated customer review, quoted from Google with attribution
export interface Review {
  id: string;
  author: string; // Pre-truncated display name
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  excerpt?: string; // Manually curated short version highlighting key praise
  photoUrl?: string; // Populated only if a reviewer gives explicit consent
}
