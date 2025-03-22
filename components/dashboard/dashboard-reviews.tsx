"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSurfyPal } from "@/context/surfypal-context"
import { Star } from "lucide-react"
import Link from "next/link"

export function DashboardReviews() {
  const { userReviews } = useSurfyPal()
  const [activeTab, setActiveTab] = useState("received")

  const renderReviews = (reviews: typeof userReviews.received) => {
    if (reviews.length === 0) {
      return (
        <div className="flex h-[200px] items-center justify-center rounded-lg border bg-muted/50">
          <div className="text-center">
            <h3 className="text-lg font-medium">No reviews yet</h3>
            <p className="text-muted-foreground">
              {activeTab === "received"
                ? "Complete more stays to receive reviews"
                : "Leave reviews for your past stays"}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.author.avatar} alt={review.author.name} />
                    <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-base">
                    {activeTab === "received" ? "From" : "To"}{" "}
                    <Link href={`/profile/${review.author.id}`} className="hover:underline">
                      {review.author.name}
                    </Link>
                  </CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{review.rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground">{review.content}</p>
              {review.listingTitle && (
                <div className="mt-2 text-xs text-muted-foreground">
                  For:{" "}
                  <Link href={`/listings/${review.listingId}`} className="font-medium text-primary hover:underline">
                    {review.listingTitle}
                  </Link>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">{review.date}</CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="received" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="received">Reviews Received ({userReviews.received.length})</TabsTrigger>
        <TabsTrigger value="given">Reviews Given ({userReviews.given.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="received" className="mt-6">
        {renderReviews(userReviews.received)}
      </TabsContent>
      <TabsContent value="given" className="mt-6">
        {renderReviews(userReviews.given)}
      </TabsContent>
    </Tabs>
  )
}

