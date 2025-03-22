"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrustScoreBadge } from "@/components/trust-score/trust-score-badge"
import { getListingReviews } from "@/lib/api"
import type { Review } from "@/types"
import { Star } from "lucide-react"
import Link from "next/link"

interface ListingReviewsProps {
  listingId: string
}

export function ListingReviews({ listingId }: ListingReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getListingReviews(listingId)
        setReviews(data)
      } catch (error) {
        console.error("Failed to fetch reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [listingId])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex h-[200px] items-center justify-center">
          <div className="text-muted-foreground">Loading reviews...</div>
        </div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No reviews yet</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Reviews ({reviews.length})</h2>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">
            {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.author.avatar} alt={review.author.name} />
                <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <Link href={`/profile/${review.author.id}`} className="font-medium hover:underline">
                    {review.author.name}
                  </Link>
                  <TrustScoreBadge score={review.author.trustScore} size="sm" />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span>·</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">{review.content}</p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <Button variant="outline" onClick={() => setShowAll(!showAll)} className="w-full">
          {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
        </Button>
      )}
    </div>
  )
}

