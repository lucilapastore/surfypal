import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Listing, Booking, Review, SignUpData, BookingData, ListingData } from "@/types"
import {
  getUser,
  getUserListings,
  getUserBookings,
  getUserReviews,
  mockSignUp,
  mockSignIn,
  mockCreateBooking,
  mockCancelBooking,
  mockDeleteListing,
  mockCreateListing,
} from "@/lib/api"

interface SurfyPalState {
  // User state
  currentUser: User | null
  userListings: Listing[]
  userBookings: {
    upcoming: Booking[]
    past: Booking[]
    cancelled: Booking[]
  }
  userReviews: {
    received: Review[]
    given: Review[]
  }

  // Actions
  signUp: (data: SignUpData) => Promise<void>
  signIn: () => Promise<void>
  signOut: () => void
  createBooking: (data: BookingData) => Promise<void>
  cancelBooking: (id: string) => Promise<void>
  createListing: (data: ListingData) => Promise<Listing>
  deleteListing: (id: string) => Promise<void>

  // UI state
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useSurfyPalStore = create<SurfyPalState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      userListings: [],
      userBookings: {
        upcoming: [],
        past: [],
        cancelled: [],
      },
      userReviews: {
        received: [],
        given: [],
      },
      isLoading: false,

      // Actions
      setIsLoading: (loading) => set({ isLoading: loading }),

      signUp: async (data) => {
        set({ isLoading: true })
        try {
          const user = await mockSignUp(data)
          set({ currentUser: user })
          await get().loadUserData(user.id)
        } catch (error) {
          console.error("Failed to sign up:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      signIn: async () => {
        set({ isLoading: true })
        try {
          const user = await mockSignIn()
          set({ currentUser: user })
          await get().loadUserData(user.id)
        } catch (error) {
          console.error("Failed to sign in:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      signOut: () => {
        set({
          currentUser: null,
          userListings: [],
          userBookings: {
            upcoming: [],
            past: [],
            cancelled: [],
          },
          userReviews: {
            received: [],
            given: [],
          },
        })
      },

      createBooking: async (data) => {
        set({ isLoading: true })
        try {
          const booking = await mockCreateBooking(data)
          set((state) => ({
            userBookings: {
              ...state.userBookings,
              upcoming: [...state.userBookings.upcoming, booking],
            },
          }))
        } catch (error) {
          console.error("Failed to create booking:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      cancelBooking: async (id) => {
        set({ isLoading: true })
        try {
          await mockCancelBooking(id)

          set((state) => {
            const booking = state.userBookings.upcoming.find((b) => b.id === id)
            if (!booking) return state

            return {
              userBookings: {
                ...state.userBookings,
                upcoming: state.userBookings.upcoming.filter((b) => b.id !== id),
                cancelled: [...state.userBookings.cancelled, { ...booking, status: "cancelled" }],
              },
            }
          })
        } catch (error) {
          console.error("Failed to cancel booking:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      createListing: async (data) => {
        set({ isLoading: true })
        try {
          const newListing = await mockCreateListing(data)
          set((state) => ({
            userListings: [...state.userListings, newListing],
          }))
          return newListing
        } catch (error) {
          console.error("Failed to create listing:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      deleteListing: async (id) => {
        set({ isLoading: true })
        try {
          await mockDeleteListing(id)
          set((state) => ({
            userListings: state.userListings.filter((listing) => listing.id !== id),
          }))
        } catch (error) {
          console.error("Failed to delete listing:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Helper function to load user data
      loadUserData: async (userId: string) => {
        try {
          const user = await getUser(userId)
          set({ currentUser: user })

          if (user) {
            const [listings, bookings, reviews] = await Promise.all([
              getUserListings(userId),
              getUserBookings(userId),
              getUserReviews(userId),
            ])

            set({
              userListings: listings,
              userBookings: bookings,
              userReviews: reviews,
            })
          }
        } catch (error) {
          console.error("Failed to load user data:", error)
        }
      },
    }),
    {
      name: "surfypal-storage",
      partialize: (state) => ({ currentUser: state.currentUser }),
    },
  ),
)

// Initialize user data if there's a stored user
if (typeof window !== "undefined") {
  const { currentUser, loadUserData } = useSurfyPalStore.getState()
  if (currentUser) {
    loadUserData(currentUser.id)
  }
}

