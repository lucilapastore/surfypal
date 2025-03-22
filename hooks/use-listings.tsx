"use client"

import { useState, useEffect } from "react"
import { getListings, getListingById } from "@/lib/api"
import type { Listing, ListingFilters } from "@/types"

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<ListingFilters>({
    location: "",
    dates: { from: undefined, to: undefined },
    guests: 1,
    priceRange: [0, 1000],
    minTrustScore: 0,
    amenities: [],
  })

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        const data = await getListings(filters)
        setListings(data)
      } catch (error) {
        console.error("Failed to fetch listings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [filters])

  return { listings, loading, filters, setFilters }
}

export function useListingById(id: string) {
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const data = await getListingById(id)
        setListing(data)
      } catch (error) {
        console.error(`Failed to fetch listing with id ${id}:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [id])

  return listing
}

