"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserReviews } from "@/lib/api"
import type { Review } from "@/types"
import { Star } from "lucide-react"
import Link from "next/link"

interface UserReviewsProps {
  userId: string
}

export function UserReviews({ userId }: UserReviewsProps) {
  const [reviews, setReviews] = useState<{
    received: Review[]
    given: Review[]
  }>({
    received: [],
    given: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getUserReviews(userId)
        setReviews(data)
      } catch (error) {
        console.error("Failed to fetch user reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [userId])

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-muted-foreground">Loading reviews...</div>
      </div>
    )
  }

  const renderReviews = (reviewList: Review[]) => {
    if (reviewList.length === 0) {
      return (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No reviews yet</p>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="grid gap-6">
        {reviewList.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.author.avatar} alt={review.author.name} />
                    <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/profile/${review.author.id}`} className="font-medium hover:underline">
                      {review.author.name}
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{review.rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <p className="text-muted-foreground">{review.content}</p>
              {review.listingTitle && (
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">For: </span>
                  <Link href={`/listings/${review.listingId}`} className="font-medium text-primary hover:underline">
                    {review.listingTitle}
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="received">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="received">Reviews Received ({reviews.received.length})</TabsTrigger>
        <TabsTrigger value="given">Reviews Given ({reviews.given.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="received" className="mt-6">
        {renderReviews(reviews.received)}
      </TabsContent>
      <TabsContent value="given" className="mt-6">
        {renderReviews(reviews.given)}
      </TabsContent>
    </Tabs>
  )
}

