import type React from "react"
import { Check, Wifi, Car, Tv, Utensils, Snowflake, Wind, Waves, Coffee } from "lucide-react"

interface ListingAmenitiesProps {
  amenities: string[]
}

export function ListingAmenities({ amenities }: ListingAmenitiesProps) {
  const amenityIcons: Record<string, React.ReactNode> = {
    Wifi: <Wifi className="h-4 w-4" />,
    "Free parking": <Car className="h-4 w-4" />,
    TV: <Tv className="h-4 w-4" />,
    Kitchen: <Utensils className="h-4 w-4" />,
    "Air conditioning": <Snowflake className="h-4 w-4" />,
    Heating: <Wind className="h-4 w-4" />,
    Pool: <Waves className="h-4 w-4" />,
    "Coffee maker": <Coffee className="h-4 w-4" />,
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            {amenityIcons[amenity] || <Check className="h-4 w-4" />}
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

