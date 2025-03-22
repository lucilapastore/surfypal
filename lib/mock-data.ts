import type { Booking, Listing, Rating, Review, User } from "@/types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Alex Johnson (Host)",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Digital nomad and travel enthusiast. I love exploring new cultures and meeting people from around the world.",
    location: "San Francisco, USA",
    joinedDate: "January 2023",
    trustScore: 85,
    isSuperhost: true,
    userType: "host",
  },
  {
    id: "user2",
    name: "Maria Garcia (Surfer)",
    email: "maria@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Passionate about sustainable travel and authentic experiences. I enjoy exploring new places and meeting locals.",
    location: "Barcelona, Spain",
    joinedDate: "March 2023",
    trustScore: 92,
    isSuperhost: false,
    userType: "surfer",
  },
  {
    id: "user3",
    name: "Raj Patel",
    email: "raj@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Adventure seeker and photography enthusiast. I'm always looking for unique places to stay during my travels.",
    location: "Mumbai, India",
    joinedDate: "June 2023",
    trustScore: 78,
    isSuperhost: false,
    userType: "surfer",
  },
  {
    id: "user4",
    name: "Sophie Chen",
    email: "sophie@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Food lover and cultural explorer. I believe the best way to experience a new place is through its local cuisine and people.",
    location: "Tokyo, Japan",
    joinedDate: "April 2023",
    trustScore: 65,
    isSuperhost: false,
    userType: "both",
  },
  {
    id: "user5",
    name: "David Kim",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Tech professional by day, host by night. I enjoy sharing my city with travelers and helping them discover hidden gems.",
    location: "Seoul, South Korea",
    joinedDate: "February 2023",
    trustScore: 88,
    isSuperhost: true,
    userType: "host",
  },
];

// Mock Listings
export const mockListings: Listing[] = [
  {
    id: "listing1",
    title: "Cozy Apartment in Downtown",
    description:
      "Experience city living in this modern apartment located in the heart of downtown. Walking distance to restaurants, shops, and public transportation.",
    price: 120,
    images: [
      "https://a0.muscache.com/im/pictures/66218abc-988b-4442-9c28-cb6a1952fbf3.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/100714692/0b3d03a3_original.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/100714449/64c53048_original.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-6760181/original/d031288a-9d30-4773-885b-ede19650fc35.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-6760181/original/28702f03-97f3-4618-abdc-bbf8c37a2cc9.jpeg?im_w=720",
    ],
    location: {
      city: "San Francisco",
      country: "USA",
      address: "123 Main St",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    host: {
      id: "user1",
      name: "Alex Johnson (Host)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 85,
    },
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: [
      "Wifi",
      "Kitchen",
      "Air conditioning",
      "Heating",
      "TV",
      "Coffee maker",
    ],
    rating: 4.8,
    reviewCount: 24,
    minTrustScore: 50,
    featured: true,
  },
  {
    id: "listing2",
    title: "Beachfront Villa with Ocean Views",
    description:
      "Wake up to stunning ocean views in this beautiful beachfront villa. Perfect for a relaxing getaway with direct beach access and a private pool.",
    price: 350,
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-44566584/original/7a0bbe51-2e52-4100-8050-ddf20d9f9c0c.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-44566584/original/489a4f93-fef0-48aa-80de-a09ef9b78364.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-44566584/original/b439a068-04ef-4aa9-a8d5-6072aa8d1e0b.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-44566584/original/136d5037-fbe1-43d6-bf14-ed8c784a9983.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-44566584/original/3647b707-6510-4031-af56-e6c7a3dde7d7.jpeg?im_w=720",
    ],
    location: {
      city: "Barcelona",
      country: "Spain",
      address: "45 Beach Road",
      coordinates: {
        lat: 41.3851,
        lng: 2.1734,
      },
    },
    host: {
      id: "user1",
      name: "Alex Johnson (Host)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 85,
    },
    capacity: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: [
      "Wifi",
      "Pool",
      "Kitchen",
      "Air conditioning",
      "Heating",
      "TV",
      "Free parking",
    ],
    rating: 4.9,
    reviewCount: 36,
    minTrustScore: 70,
    featured: true,
  },
  {
    id: "listing3",
    title: "Traditional Home in Historic District",
    description:
      "Stay in a beautifully preserved traditional home in the heart of the historic district. Experience authentic local culture and architecture.",
    price: 180,
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-46677436/original/bde5a123-9e69-49a1-b633-d96735350e20.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46677436/original/9d2d984e-a5ae-4115-a55f-faca136986fc.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46677436/original/1f3ce2a2-c269-42e4-ab4b-d9671bd65f28.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46677436/original/6c068f91-2700-49bd-8356-335320a0c518.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46677436/original/4a2d843c-62bd-4a94-8c25-35a5c822a851.jpeg?im_w=720",
    ],
    location: {
      city: "Kyoto",
      country: "Japan",
      address: "78 Heritage Lane",
      coordinates: {
        lat: 35.0116,
        lng: 135.7681,
      },
    },
    host: {
      id: "user1",
      name: "Alex Johnson (Host)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 85,
    },
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Wifi", "Kitchen", "Heating", "TV", "Garden"],
    rating: 4.7,
    reviewCount: 18,
    minTrustScore: 60,
    featured: false,
  },
  {
    id: "listing4",
    title: "Modern Loft in Tech District",
    description:
      "Stay in this stylish loft apartment in the heart of the tech district. Perfect for digital nomads with high-speed internet and a dedicated workspace.",
    price: 150,
    images: [
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyMTE0NjM4NzQ5NDgxNTM4Mg==/original/c84a251e-ae33-4796-b322-6e79ce12b4a3.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyMTE0NjM4NzQ5NDgxNTM4Mg==/original/9973c645-c173-4d8f-9ee4-ff9645eb8b5b.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyMTE0NjM4NzQ5NDgxNTM4Mg==/original/b0f130c5-ac6a-41d2-b516-1518f20ec7f4.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyMTE0NjM4NzQ5NDgxNTM4Mg==/original/d32a0c66-633a-4b8f-9b8c-e7bf953f0030.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyMTE0NjM4NzQ5NDgxNTM4Mg==/original/5bcb8cef-6284-41ff-ac69-ab2dc7226707.jpeg?im_w=720",
    ],
    location: {
      city: "Seoul",
      country: "South Korea",
      address: "56 Tech Avenue",
      coordinates: {
        lat: 37.5665,
        lng: 126.978,
      },
    },
    host: {
      id: "user1",
      name: "Alex Johnson (Host)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 85,
    },
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [
      "Wifi",
      "Kitchen",
      "Air conditioning",
      "Heating",
      "TV",
      "Workspace",
    ],
    rating: 4.6,
    reviewCount: 15,
    minTrustScore: 50,
    featured: false,
  },
  {
    id: "listing5",
    title: "Charming Cottage in the Countryside",
    description:
      "Escape the city in this peaceful cottage surrounded by nature. Enjoy hiking trails, fresh air, and stargazing at night.",
    price: 200,
    images: [
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-44113492/original/956a12e0-d7ad-4a0f-b051-5a39cde69df0.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-44113492/original/ef421b24-d432-410d-aca2-827e143fbe62.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-44113492/original/37507257-46be-4496-bf9d-1bbe77d4bbf4.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-44113492/original/ddedb6cb-d538-4895-a76d-250292c10e25.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-44113492/original/07012049-fc93-4862-be33-eb520226d361.jpeg?im_w=720",
    ],
    location: {
      city: "Cotswolds",
      country: "United Kingdom",
      address: "12 Meadow Lane",
      coordinates: {
        lat: 51.833,
        lng: -1.8433,
      },
    },
    host: {
      id: "user1",
      name: "Alex Johnson (Host)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 85,
    },
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: [
      "Wifi",
      "Kitchen",
      "Heating",
      "Free parking",
      "Garden",
      "Fireplace",
    ],
    rating: 4.9,
    reviewCount: 22,
    minTrustScore: 65,
    featured: true,
  },
  {
    id: "listing6",
    title: "Urban Treehouse with City Views",
    description:
      "A unique treehouse experience in the middle of the city. Enjoy the best of both worlds with nature and urban convenience.",
    price: 220,
    images: [
      "https://a0.muscache.com/im/pictures/a896028e-a95e-44e0-bc7d-d21f13898b25.jpg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/7d972ba5-1ea8-48e2-a646-793e68fe0129.jpg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/c85da145-7f47-4b3e-b495-eddeaaffd5f7.jpg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/f7fd4341-2a4e-4df7-b8f7-8bcf1156a886.jpg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/cfdc0fd1-a062-49e4-b0e1-5f71c54c62e5.jpg?im_w=720",
    ],
    location: {
      city: "Portland",
      country: "USA",
      address: "89 Pine Street",
      coordinates: {
        lat: 45.5051,
        lng: -122.675,
      },
    },
    host: {
      id: "user1",
      name: "Alex Johnson (Host)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 85,
    },
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [
      "Wifi",
      "Kitchen",
      "Heating",
      "Air conditioning",
      "TV",
      "Unique experience",
    ],
    rating: 4.8,
    reviewCount: 19,
    minTrustScore: 55,
    featured: false,
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: "review1",
    listingId: "listing1",
    listingTitle: "Cozy Apartment in Downtown",
    author: {
      id: "user2",
      name: "Maria Garcia (Surfer)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 92,
    },
    rating: 5,
    content:
      "Amazing location and beautiful apartment! Alex was a fantastic host, providing great local recommendations and making sure we had everything we needed. The apartment was clean, comfortable, and exactly as described. Would definitely stay here again!",
    date: "August 15, 2023",
  },
  {
    id: "review2",
    listingId: "listing1",
    listingTitle: "Cozy Apartment in Downtown",
    author: {
      id: "user4",
      name: "Sophie Chen",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 65,
    },
    rating: 4,
    content:
      "Great apartment in a convenient location. Everything was clean and comfortable. The only minor issue was some street noise at night, but that's expected in a downtown location. Alex was responsive and helpful throughout our stay.",
    date: "July 22, 2023",
  },
  {
    id: "review3",
    listingId: "listing2",
    listingTitle: "Beachfront Villa with Ocean Views",
    author: {
      id: "user1",
      name: "Alex Johnson (Host)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 85,
    },
    rating: 5,
    content:
      "This villa exceeded all our expectations! The views are even more stunning than in the photos, and the private beach access was perfect. Maria was an exceptional host, arranging a welcome basket and providing detailed information about the area. The house was immaculate and beautifully designed. A truly luxurious experience!",
    date: "September 5, 2023",
  },
  {
    id: "review4",
    listingId: "listing3",
    listingTitle: "Traditional Home in Historic District",
    author: {
      id: "user5",
      name: "David Kim",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 88,
    },
    rating: 5,
    content:
      "Staying in this traditional home was the highlight of our trip to Kyoto. The architecture and details are beautiful, and the location is perfect for exploring the historic district. Sophie provided excellent recommendations for local restaurants and activities. A truly authentic experience!",
    date: "August 30, 2023",
  },
  {
    id: "review5",
    listingId: "listing4",
    listingTitle: "Modern Loft in Tech District",
    author: {
      id: "user2",
      name: "Maria Garcia (Surfer)",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 92,
    },
    rating: 4,
    content:
      "The loft was stylish and comfortable, with all the amenities needed for a productive work trip. The high-speed internet was reliable, and the workspace was well-designed. David was responsive and provided clear check-in instructions. The only reason for 4 stars instead of 5 is that the area gets a bit noisy during weekdays.",
    date: "July 15, 2023",
  },
  {
    id: "review6",
    listingId: "listing5",
    listingTitle: "Charming Cottage in the Countryside",
    author: {
      id: "user4",
      name: "Sophie Chen",
      avatar: "/placeholder.svg?height=200&width=200",
      trustScore: 65,
    },
    rating: 5,
    content:
      "This cottage is a perfect countryside retreat! We loved the peaceful surroundings, beautiful garden, and cozy interior. The fireplace made evenings special, and the kitchen was well-equipped for cooking. Raj provided excellent hiking recommendations and was a thoughtful host. We're already planning our return visit!",
    date: "September 10, 2023",
  },
];

// Mock Bookings
export const mockBookings: {
  upcoming: Booking[];
  past: Booking[];
  cancelled: Booking[];
} = {
  upcoming: [],
  past: [
    {
      id: "booking1",
      listing: {
        id: "listing1",
        title: "Cozy Apartment in Downtown",
        location: {
          city: "San Francisco",
          country: "USA",
        },
        images: [
          "https://a0.muscache.com/im/pictures/66218abc-988b-4442-9c28-cb6a1952fbf3.jpg?im_w=720",
        ],
        price: 120,
      },
      host: {
        id: "user1",
        name: "Alex Johnson (Host)",
        avatar: "/placeholder.svg?height=200&width=200",
      },
      surfer: {
        id: "user2",
        name: "Maria Garcia (Surfer)",
        avatar: "/placeholder.svg?height=200&width=200",
      },
      checkIn: "August 10, 2023",
      checkOut: "August 15, 2023",
      guests: 2,
      totalPrice: 600,
      collateralAmount: 60,
      status: "completed",
      reviewed: true,
    },
    {
      id: "booking2",
      listing: {
        id: "listing2",
        title: "Beachfront Villa with Ocean Views",
        location: {
          city: "Barcelona",
          country: "Spain",
        },
        images: [
          "https://a0.muscache.com/im/pictures/miso/Hosting-44566584/original/7a0bbe51-2e52-4100-8050-ddf20d9f9c0c.jpeg?im_w=720",
        ],
        price: 350,
      },
      host: {
        id: "user1",
        name: "Alex Johnson (Host)",
        avatar: "/placeholder.svg?height=200&width=200",
      },
      surfer: {
        id: "user2",
        name: "Maria Garcia (Surfer)",
        avatar: "/placeholder.svg?height=200&width=200",
      },
      checkIn: "July 5, 2023",
      checkOut: "July 12, 2023",
      guests: 3,
      totalPrice: 2450,
      collateralAmount: 245,
      status: "completed",
      reviewed: false,
    },
  ],
  cancelled: [],
};

// Mock Ratings
export const mockRatings: Rating[] = [
  {
    id: "rating1",
    bookingId: "booking1",
    userId: "user1", // Host being rated
    raterId: "user2", // Surfer who submitted the rating
    criteria: {
      cleanliness: 5,
      communication: 4,
      respect: 5,
      punctuality: 4,
      experience: 5,
    },
    averageRating: 4.6,
    comments: "Great host, very welcoming and accommodating!",
    date: "August 16, 2023",
    affectedTrustScore: 3,
  },
  {
    id: "rating2",
    bookingId: "booking1",
    userId: "user2", // Surfer being rated
    raterId: "user1", // Host who submitted the rating
    criteria: {
      cleanliness: 4,
      communication: 5,
      respect: 5,
      punctuality: 3,
      experience: 4,
    },
    averageRating: 4.2,
    comments:
      "Great surfer, left the place clean and followed all house rules.",
    date: "August 16, 2023",
    affectedTrustScore: 2,
  },
];

// Helper functions for mock data
export function getFeaturedListings(): Promise<Listing[]> {
  return Promise.resolve(mockListings.filter((listing) => listing.featured));
}

export function getListingReviews(listingId: string): Promise<Review[]> {
  return Promise.resolve(
    mockReviews.filter((review) => review.listingId === listingId)
  );
}

export function getTrustScoreHistory(userId: string): Promise<any[]> {
  // Generate mock trust score history
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) return Promise.resolve([]);

  const currentScore = user.trustScore;
  const history = [];

  // Generate data points for the last 12 months
  const now = new Date();
  let score = Math.max(currentScore - 25, 40); // Start lower than current

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    // Random increase between 0-5 points
    const change = Math.floor(Math.random() * 6);
    score += change;

    // Cap at current score
    if (i === 0) score = currentScore;

    // Add events for significant changes
    let event = "";
    if (change >= 4) {
      const events = [
        "Received 5-star review",
        "Completed verified stay",
        "Hosted successful guest",
        "Identity verification bonus",
        "Prompt response rate bonus",
      ];
      event = events[Math.floor(Math.random() * events.length)];
    }

    history.push({
      date: date.toISOString(),
      score: Math.min(score, 100),
      change: change,
      event: event,
    });
  }

  return Promise.resolve(history);
}

export function getUserListings(userId: string): Promise<Listing[]> {
  // Only user1 (host) should have listings
  if (userId === "user1") {
    return Promise.resolve(
      mockListings.filter((listing) => listing.host.id === userId)
    );
  }

  // For user2 (surfer) and other users, return empty array
  return Promise.resolve([]);
}

export function getUserReviews(userId: string): Promise<{
  received: Review[];
  given: Review[];
}> {
  // For host (user1), received reviews are reviews on their listings
  if (userId === "user1") {
    const received = mockReviews.filter((review) =>
      mockListings.some(
        (listing) =>
          listing.host.id === userId && listing.id === review.listingId
      )
    );

    // Given reviews are from the host to surfers
    const given = mockReviews.filter((review) => review.author.id === userId);

    return Promise.resolve({ received, given });
  }

  // For surfer (user2), received reviews are those given by hosts about them as surfers
  // Given reviews are those written by the surfer about listings they stayed at
  if (userId === "user2") {
    const received: Review[] = []; // In a real app, this would be reviews about the surfer
    const given = mockReviews.filter((review) => review.author.id === userId);

    return Promise.resolve({ received, given });
  }

  // For other users, return empty arrays
  return Promise.resolve({ received: [], given: [] });
}

export function getUserBookings(userId: string): Promise<{
  upcoming: Booking[];
  past: Booking[];
  cancelled: Booking[];
}> {
  // For user1 (host), return bookings where they are the host
  if (userId === "user1") {
    return Promise.resolve({
      upcoming: mockBookings.upcoming.filter(
        (booking) => booking.host.id === userId
      ),
      past: mockBookings.past.filter((booking) => booking.host.id === userId),
      cancelled: mockBookings.cancelled.filter(
        (booking) => booking.host.id === userId
      ),
    });
  }
  // For user2 (surfer), return bookings where they are the surfer
  if (userId === "user2") {
    return Promise.resolve({
      upcoming: mockBookings.upcoming.filter(
        (booking) => booking.surfer && booking.surfer.id === userId
      ),
      past: mockBookings.past.filter(
        (booking) => booking.surfer && booking.surfer.id === userId
      ),
      cancelled: mockBookings.cancelled.filter(
        (booking) => booking.surfer && booking.surfer.id === userId
      ),
    });
  }
  // For other users, return empty bookings
  return Promise.resolve({
    upcoming: [],
    past: [],
    cancelled: [],
  });
}

// Get user ratings (ratings received by a user)
export async function getUserRatings(userId: string): Promise<Rating[]> {
  await delay(500);
  return mockRatings.filter((rating) => rating.userId === userId);
}

// Get ratings submitted by a user
export async function getRatingsByUser(userId: string): Promise<Rating[]> {
  await delay(500);
  return mockRatings.filter((rating) => rating.raterId === userId);
}
