import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrustScoreBadge } from "@/components/trust-score/trust-score-badge"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from "lucide-react"
import type { Listing } from "@/types"
import { formatCurrency } from "@/lib/utils"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={listing.images[0] || "/placeholder.svg"}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {listing.featured && <Badge className="absolute left-2 top-2">Featured</Badge>}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{listing.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({listing.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{listing.location.city}</span>
          </div>
        </div>
        <Link href={`/listings/${listing.id}`} className="block">
          <h3 className="line-clamp-1 font-semibold hover:underline">{listing.title}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Up to {listing.capacity} guests</span>
        </div>
        <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">{listing.description}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={listing.host.avatar} alt={listing.host.name} />
            <AvatarFallback>{listing.host.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1 text-sm">
            <span>{listing.host.name}</span>
            <TrustScoreBadge score={listing.host.trustScore} size="sm" />
          </div>
        </div>
        <div className="font-medium">
          {formatCurrency(listing.price)}
          <span className="text-sm font-normal text-muted-foreground">/night</span>
        </div>
      </CardFooter>
    </Card>
  )
}

