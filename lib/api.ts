import {
  getFeaturedListings,
  getListingReviews,
  getRatingsByUser,
  getTrustScoreHistory,
  getUserBookings,
  getUserListings,
  getUserRatings,
  getUserReviews,
  mockListings,
  mockUsers,
} from "@/lib/mock-data";
import { calculateTrustScore } from "@/lib/trust-score";
import type {
  Booking,
  BookingData,
  Listing,
  ListingData,
  ListingFilters,
  SignUpData,
  User,
} from "@/types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// User APIs
export async function getUser(id: string): Promise<User | null> {
  await delay(500);
  return mockUsers.find((user) => user.id === id) || null;
}

export async function mockSignUp(data: SignUpData): Promise<User> {
  await delay(1000);
  // Return a mock user
  return mockUsers[0];
}

export async function mockSignIn(): Promise<User> {
  await delay(1000);
  // Return a mock user
  return mockUsers[0];
}

// Listing APIs
export async function getListings(
  filters?: ListingFilters
): Promise<Listing[]> {
  await delay(500);

  if (!filters) return mockListings;

  return mockListings.filter((listing) => {
    // Apply filters
    if (
      filters.location &&
      !listing.location.city
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    if (filters.guests > listing.capacity) {
      return false;
    }

    if (
      filters.priceRange &&
      (listing.price < filters.priceRange[0] ||
        listing.price > filters.priceRange[1])
    ) {
      return false;
    }

    if (
      filters.minTrustScore > 0 &&
      listing.minTrustScore < filters.minTrustScore
    ) {
      return false;
    }

    if (filters.amenities && filters.amenities.length > 0) {
      return filters.amenities.every((amenity) =>
        listing.amenities.includes(amenity)
      );
    }

    return true;
  });
}

export async function getListingById(id: string): Promise<Listing | null> {
  await delay(500);
  return mockListings.find((listing) => listing.id === id) || null;
}

// Re-export functions from mock-data
export {
  getFeaturedListings,
  getListingReviews,
  getRatingsByUser,
  getTrustScoreHistory,
  getUserBookings,
  getUserListings,
  getUserRatings,
  getUserReviews,
};

// Booking APIs
export async function mockCreateBooking(data: BookingData): Promise<Booking> {
  await delay(1000);

  // Create a mock booking
  const listing = mockListings.find((l) => l.id === data.listingId);
  const host = mockUsers.find((u) => u.id === data.hostId);

  if (!listing || !host) {
    throw new Error("Invalid listing or host ID");
  }

  const newBooking: Booking = {
    id: `booking${Date.now()}`,
    listing: {
      id: listing.id,
      title: listing.title,
      location: listing.location,
      images: listing.images,
      price: listing.price,
    },
    host: {
      id: host.id,
      name: host.name,
      avatar: host.avatar,
    },
    checkIn: data.checkIn.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    checkOut: data.checkOut.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    guests: data.guests,
    totalPrice: data.totalPrice,
    collateralAmount: data.collateralAmount,
    status: "confirmed",
    reviewed: false,
  };

  return newBooking;
}

export async function mockCancelBooking(id: string): Promise<void> {
  await delay(1000);
  // In a real app, we would update the booking status in the database
  return;
}

export async function mockDeleteListing(id: string): Promise<void> {
  await delay(1000);
  // In a real app, we would delete the listing from the database
  return;
}

// Update the mockCreateListing function to add the new listing to mockListings
export async function mockCreateListing(data: ListingData): Promise<Listing> {
  await delay(1000);

  // Get current user for host info
  const currentUser = mockUsers[0]; // In a real app, this would be the authenticated user

  const newListing: Listing = {
    id: `listing${Date.now()}`,
    ...data,
    host: {
      id: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      trustScore: currentUser.trustScore,
    },
    rating: 0,
    reviewCount: 0,
    featured: false,
  };

  // Add the new listing to mockListings so it can be retrieved later
  mockListings.push(newListing);

  return newListing;
}

// Rating APIs
export interface RatingData {
  bookingId: string;
  userId: string;
  ratings: { [key: string]: number };
  averageRating: number;
  comments?: string;
}

export async function mockSubmitRating(
  data: RatingData
): Promise<{ success: boolean; newTrustScore: number }> {
  await delay(1000);

  try {
    // In a real app, this would update the user's trust score on the blockchain
    // and mark the booking as reviewed

    // Get user's existing ratings (would be fetched from DB)
    const existingRatings = Array(5).fill(4); // Mock 5 previous ratings with a value of 4

    // Calculate bonus/penalty
    let bonusPoints = 0;
    let penaltyPoints = 0;

    if (data.averageRating >= 4.5) {
      bonusPoints = 10;
    } else if (data.averageRating < 3.0) {
      penaltyPoints = 5;
    }

    // Get all rating values
    const ratingValues = Object.values(data.ratings);

    // Calculate new trust score
    const allRatings = [...existingRatings, ...ratingValues];
    const newTrustScore = calculateTrustScore(
      allRatings,
      bonusPoints,
      penaltyPoints
    );

    return {
      success: true,
      newTrustScore,
    };
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw new Error("Failed to submit rating");
  }
}
