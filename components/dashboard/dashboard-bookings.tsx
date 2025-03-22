"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSurfyPalStore } from "@/lib/store"
import { formatCurrency } from "@/lib/utils"
import { CalendarDays, MessageSquare, X } from "lucide-react"
import Link from "next/link"

export function DashboardBookings() {
  const { userBookings, cancelBooking } = useSurfyPalStore()
  const [isCancelling, setIsCancelling] = useState<string | null>(null)

  const handleCancel = async (id: string) => {
    setIsCancelling(id)
    try {
      await cancelBooking(id)
    } catch (error) {
      console.error("Failed to cancel booking:", error)
    } finally {
      setIsCancelling(null)
    }
  }

  const renderBookings = (bookings: typeof userBookings.upcoming) => {
    if (bookings.length === 0) {
      return (
        <div className="flex h-[200px] items-center justify-center rounded-lg border bg-muted/50">
          <div className="text-center">
            <h3 className="text-lg font-medium">No bookings found</h3>
            <p className="text-muted-foreground">Browse listings to make a booking</p>
          </div>
        </div>
      )
    }

    return (
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="line-clamp-1">{booking.listing.title}</CardTitle>
                <Badge
                  variant={
                    booking.status === "confirmed"
                      ? "default"
                      : booking.status === "completed"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {booking.checkIn} - {booking.checkOut}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium">{formatCurrency(booking.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Collateral:</span>
                  <span className="font-medium">{formatCurrency(booking.collateralAmount)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/listings/${booking.listing.id}`}>View Listing</Link>
              </Button>
              {booking.status === "confirmed" && (
                <>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/messages/${booking.host.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Host
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleCancel(booking.id)}
                    disabled={isCancelling === booking.id}
                  >
                    <X className="mr-2 h-4 w-4" />
                    {isCancelling === booking.id ? "Cancelling..." : "Cancel"}
                  </Button>
                </>
              )}
              {booking.status === "completed" && !booking.reviewed && <Button size="sm">Leave Review</Button>}
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="upcoming">Upcoming ({userBookings.upcoming.length})</TabsTrigger>
        <TabsTrigger value="past">Past ({userBookings.past.length})</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled ({userBookings.cancelled.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="mt-6">
        {renderBookings(userBookings.upcoming)}
      </TabsContent>
      <TabsContent value="past" className="mt-6">
        {renderBookings(userBookings.past)}
      </TabsContent>
      <TabsContent value="cancelled" className="mt-6">
        {renderBookings(userBookings.cancelled)}
      </TabsContent>
    </Tabs>
  )
}

