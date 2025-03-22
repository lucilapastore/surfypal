import {
  getFeaturedListings,
  getListingReviews,
  getRatingsByUser,
  getTrustScoreHistory,
  getUserBookings,
  getUserListings,
  getUserRatings,
  getUserReviews,
  mockBookings,
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
export async function getUser(userId: string): Promise<User | null> {
  await delay(500);
  const user = mockUsers.find((user) => user.id === userId);
  return user || null;
}

export async function mockSignUp(data: SignUpData): Promise<User> {
  await delay(1000);
  // For demo purposes, we're just returning one of the existing users
  // based on userType, rather than creating a new one

  // Return user1 if host, user2 if surfer
  const mockUser =
    data.userType === "host"
      ? mockUsers.find((u) => u.id === "user1")
      : mockUsers.find((u) => u.id === "user2");

  if (!mockUser) throw new Error("User not found");
  return mockUser;
}

export async function mockSignIn(
  userType: "host" | "surfer" = "host"
): Promise<User> {
  await delay(1000);
  // Return user1 if host, user2 if surfer
  const user =
    userType === "host"
      ? mockUsers.find((u) => u.id === "user1")
      : mockUsers.find((u) => u.id === "user2");

  if (!user) throw new Error("User not found");
  return user;
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

  const listing = mockListings.find((l) => l.id === data.listingId);
  if (!listing) throw new Error("Listing not found");

  const host = mockUsers.find((u) => u.id === data.hostId);
  if (!host) throw new Error("Host not found");

  // Get the surfer user (hard-coded as user2 for demo)
  const surfer = mockUsers.find((u) => u.id === "user2");
  if (!surfer) throw new Error("Surfer not found");

  const newBooking: Booking = {
    id: `booking${Date.now()}`,
    listing: {
      id: listing.id,
      title: listing.title,
      location: {
        city: listing.location.city,
        country: listing.location.country,
      },
      images: [listing.images[0]],
      price: listing.price,
    },
    host: {
      id: host.id,
      name: host.name,
      avatar: host.avatar,
    },
    surfer: {
      id: surfer.id,
      name: surfer.name,
      avatar: surfer.avatar,
    },
    checkIn: data.checkIn.toDateString(),
    checkOut: data.checkOut.toDateString(),
    guests: data.guests,
    totalPrice: data.totalPrice,
    collateralAmount: data.collateralAmount,
    status: "confirmed",
    reviewed: false,
  };

  // Add the booking to mock data
  mockBookings.upcoming.push(newBooking);

  return newBooking;
}

export async function mockCancelBooking(id: string): Promise<void> {
  await delay(500);
  const bookingIndex = mockBookings.upcoming.findIndex((b) => b.id === id);
  if (bookingIndex === -1) throw new Error("Booking not found");

  const booking = mockBookings.upcoming[bookingIndex];
  mockBookings.upcoming.splice(bookingIndex, 1);
  mockBookings.cancelled.push({
    ...booking,
    status: "cancelled",
  });
}

export async function mockDeleteListing(id: string): Promise<void> {
  await delay(500);
  const index = mockListings.findIndex((listing) => listing.id === id);
  if (index === -1) throw new Error("Listing not found");
  mockListings.splice(index, 1);
}

// Update the mockCreateListing function to add the new listing to mockListings
export async function mockCreateListing(data: ListingData): Promise<Listing> {
  await delay(1000);

  // Always use user1 (Alex Johnson) as the host for demo
  const host = mockUsers.find((u) => u.id === "user1");
  if (!host) throw new Error("Host not found");

  const newListing: Listing = {
    id: `listing${Date.now()}`,
    ...data,
    host: {
      id: host.id,
      name: host.name,
      avatar: host.avatar,
      trustScore: host.trustScore,
    },
    rating: 0,
    reviewCount: 0,
  };

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

    // Mark the booking as reviewed
    const { bookingId } = data;

    // Find the booking in mock data
    let bookingFound = false;

    // Look through all booking categories (upcoming, past, cancelled)
    for (const category of ["upcoming", "past", "cancelled"]) {
      const categoryKey = category as keyof typeof mockBookings;
      const bookingIndex = mockBookings[categoryKey].findIndex(
        (b) => b.id === bookingId
      );

      if (bookingIndex !== -1) {
        // Mark as reviewed
        mockBookings[categoryKey][bookingIndex].reviewed = true;
        bookingFound = true;
        break;
      }
    }

    if (!bookingFound) {
      console.warn(
        `Booking with ID ${bookingId} not found when marking as reviewed`
      );
    }

    return {
      success: true,
      newTrustScore,
    };
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw new Error("Failed to submit rating");
  }
}
