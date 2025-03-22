"use client"

import { useState } from "react"
import { ListingFilters } from "@/components/listings/listing-filters"
import { ListingGrid } from "@/components/listings/listing-grid"
import { ListingMap } from "@/components/listings/listing-map"
import { Button } from "@/components/ui/button"
import { MapIcon, GridIcon } from "lucide-react"
import { useListings } from "@/hooks/use-listings"

export default function ListingsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const { listings, filters, setFilters } = useListings()

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Find Trusted Local Stays</h1>
        <p className="text-muted-foreground">
          Browse accommodations from verified Hosts, filter by price, availability, and reviews, and book your next stay
          securely.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ListingFilters filters={filters} setFilters={setFilters} />

        <div className="flex items-center gap-2 self-end">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-10 w-10 p-0"
          >
            <GridIcon className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="h-10 w-10 p-0"
          >
            <MapIcon className="h-4 w-4" />
            <span className="sr-only">Map view</span>
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? <ListingGrid listings={listings} /> : <ListingMap listings={listings} />}
    </div>
  )
}

