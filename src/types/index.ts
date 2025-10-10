export interface Trek {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  image: string;
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  bestTimeToVisit: string;
  maxGroupSize: number;
  rating: number;
  reviews: Review[];
  earlyBirdDeadline?: Date;
  limitedSeats?: number;
  seatsRemaining?: number;
  // Optional structured duration fields
  days?: number;
  nights?: number;
  // Optional ISO start date string (if provided, UI will use this instead of computing next weekend)
  startDate?: string;
}

export interface Adventure {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'Skiing' | 'River Rafting' | 'Paragliding' | 'Rock Climbing' | 'Camping' | 'Wildlife Safari' | 'Cultural Trek' | 'Cultural Experience';
  location: string;
  duration: string;
  price: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Easy' | 'Moderate' | 'Challenging';
  image: string;
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
  equipment: string[];
  highlights: string[];
  itinerary: {
    title: string;
    description: string;
  }[];
  bestTimeToVisit: string;
  maxGroupSize: number;
  rating: number;
  reviews: Review[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  meals: string[];
  accommodation: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  groupType: 'Solo' | 'Group' | 'Family' | 'Couple';
  trekJoined: string;
  quote: string;
  rating: number;
  videoUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: string;
  specialization: string[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
  bestTimeToVisit: string;
  climate: string;
  culture: string;
  activities: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}