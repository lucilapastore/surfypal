export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  trustScore: number;
  isSuperhost: boolean;
  userType: "host" | "surfer" | "both";
}

export interface SignUpData {
  name: string;
  email: string;
  userType: "host" | "surfer" | "both";
}

// Listing Types
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: {
    city: string;
    country: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  host: {
    id: string;
    name: string;
    avatar: string;
    trustScore: number;
  };
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  rating: number;
  reviewCount: number;
  minTrustScore: number;
  featured?: boolean;
}

export interface ListingData {
  title: string;
  description: string;
  price: number;
  images: string[];
  location: {
    city: string;
    country: string;
    address?: string;
  };
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  minTrustScore: number;
}

export interface ListingFilters {
  location: string;
  dates: {
    from: Date | undefined;
    to: Date | undefined;
  };
  guests: number;
  priceRange: [number, number];
  minTrustScore: number;
  amenities: string[];
}

// Review Types
export interface Review {
  id: string;
  listingId: string;
  listingTitle?: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    trustScore: number;
  };
  rating: number;
  content: string;
  date: string;
}

// Booking Types
export interface Booking {
  id: string;
  listing: {
    id: string;
    title: string;
    location: {
      city: string;
      country: string;
    };
    images: string[];
    price: number;
  };
  host: {
    id: string;
    name: string;
    avatar: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  collateralAmount: number;
  status: "confirmed" | "completed" | "cancelled";
  reviewed: boolean;
}

export interface BookingData {
  listingId: string;
  hostId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  collateralAmount: number;
}

// Rating Types
export interface Rating {
  id: string;
  bookingId: string;
  userId: string; // User who is being rated
  raterId: string; // User who submitted the rating
  criteria: {
    cleanliness: number;
    communication: number;
    respect: number;
    punctuality: number;
    experience: number;
  };
  averageRating: number;
  comments?: string;
  date: string;
  affectedTrustScore: number;
}
