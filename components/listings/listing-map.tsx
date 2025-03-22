import type { Listing } from "@/types"

interface ListingMapProps {
  listings: Listing[]
}

export function ListingMap({ listings }: ListingMapProps) {
  return (
    <div className="relative h-[600px] rounded-lg border bg-muted/50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium">Map View</h3>
          <p className="text-muted-foreground">
            Interactive map would be displayed here with {listings.length} listings
          </p>
        </div>
      </div>
    </div>
  )
}

