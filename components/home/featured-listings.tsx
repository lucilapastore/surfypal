"use client"

import { useEffect, useState } from "react"
import { ListingCard } from "@/components/listings/listing-card"
import { getFeaturedListings } from "@/lib/api"
import type { Listing } from "@/types"

export function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getFeaturedListings()
        setListings(data)
      } catch (error) {
        console.error("Failed to fetch featured listings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[350px] animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}

