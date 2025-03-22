"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getUserListings } from "@/lib/api"
import { ListingCard } from "@/components/listings/listing-card"
import type { Listing } from "@/types"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

interface UserListingsProps {
  userId: string
}

export function UserListings({ userId }: UserListingsProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getUserListings(userId)
        setListings(data)
      } catch (error) {
        console.error("Failed to fetch user listings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [userId])

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-muted-foreground">Loading listings...</div>
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="flex h-[200px] flex-col items-center justify-center gap-4 rounded-lg border bg-muted/50 p-8 text-center">
        <h3 className="text-lg font-medium">No listings yet</h3>
        <p className="text-muted-foreground">This user hasn't created any listings yet.</p>
        <Button asChild>
          <Link href="/create-listing">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create a Listing
          </Link>
        </Button>
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

