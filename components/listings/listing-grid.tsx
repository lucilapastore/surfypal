import { ListingCard } from "@/components/listings/listing-card"
import type { Listing } from "@/types"

interface ListingGridProps {
  listings: Listing[]
}

export function ListingGrid({ listings }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border bg-muted/50">
        <div className="text-center">
          <h3 className="text-lg font-medium">No listings found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
        </div>
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

