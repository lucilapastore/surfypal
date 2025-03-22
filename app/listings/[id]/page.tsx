"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { useListingById } from "@/hooks/use-listings"
import { useSurfyPalStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrustScoreBadge } from "@/components/trust-score/trust-score-badge"
import { ListingGallery } from "@/components/listings/listing-gallery"
import { ListingAmenities } from "@/components/listings/listing-amenities"
import { ListingReviews } from "@/components/listings/listing-reviews"
import { BookingForm } from "@/components/bookings/booking-form"
import { MapPin, Star, Users, Info } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

export default function ListingDetailPage() {
  const params = useParams()
  const { id } = params

  // No need to handle the "create" path anymore since we've moved it to a different route
  const listing = useListingById(id as string)
  const { currentUser } = useSurfyPalStore()
  const [showBookingForm, setShowBookingForm] = useState(false)

  if (!listing) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <p className="mt-4 text-muted-foreground">The listing you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-8">
          <Link href="/listings">Browse Listings</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold tracking-tight">{listing.title}</h1>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{listing.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({listing.reviewCount} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>
            {listing.location.city}, {listing.location.country}
          </span>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>Hosted by {listing.host.name}</span>
        </Badge>
      </div>

      <ListingGallery images={listing.images} />

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-8 flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={listing.host.avatar} alt={listing.host.name} />
              <AvatarFallback>{listing.host.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Hosted by {listing.host.name}</h2>
              <div className="flex items-center gap-2">
                <TrustScoreBadge score={listing.host.trustScore} size="sm" />
                <Link href={`/profile/${listing.host.id}`} className="text-sm font-medium text-primary hover:underline">
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">About this place</h2>
            <p className="text-muted-foreground">{listing.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground">Guests</div>
                <div className="font-medium">{listing.capacity} max</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground">Bedrooms</div>
                <div className="font-medium">{listing.bedrooms}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground">Bathrooms</div>
                <div className="font-medium">{listing.bathrooms}</div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <ListingAmenities amenities={listing.amenities} />

          <Separator className="my-8" />

          <ListingReviews listingId={listing.id} />
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <span>{formatCurrency(listing.price)}</span>
                <span className="text-sm font-normal text-muted-foreground">/ night</span>
              </CardTitle>
              <CardDescription>Minimum Trust Score: {listing.minTrustScore}</CardDescription>
            </CardHeader>
            <CardContent>
              {showBookingForm ? (
                <BookingForm listing={listing} onCancel={() => setShowBookingForm(false)} />
              ) : (
                <>
                  <div className="mb-4 rounded-lg border">
                    <Calendar mode="range" className="rounded-md" disabled={(date) => date < new Date()} />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setShowBookingForm(true)}
                    disabled={!currentUser || currentUser.trustScore < listing.minTrustScore}
                  >
                    {currentUser ? "Book Now" : "Sign in to Book"}
                  </Button>
                  {currentUser && currentUser.trustScore < listing.minTrustScore && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-yellow-600">
                      <Info className="h-4 w-4" />
                      <span>Your Trust Score doesn't meet the minimum requirement</span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 text-sm">
              <div className="flex w-full justify-between">
                <span>Collateral required:</span>
                <span className="font-medium">
                  {currentUser
                    ? formatCurrency(listing.price * 0.2) // This would be calculated based on trust score
                    : "Sign in to see"}
                </span>
              </div>
              <div className="text-muted-foreground">
                The collateral amount is based on your Trust Score and will be returned after your stay.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

