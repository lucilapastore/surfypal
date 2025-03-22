"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserBookings } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import type { Booking } from "@/types";
import { CalendarDays, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserBookingsProps {
  userId: string;
}

export function UserBookings({ userId }: UserBookingsProps) {
  const [bookings, setBookings] = useState<{
    upcoming: Booking[];
    past: Booking[];
    cancelled: Booking[];
  }>({
    upcoming: [],
    past: [],
    cancelled: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getUserBookings(userId);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch user bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-muted-foreground">Loading bookings...</div>
      </div>
    );
  }

  const renderBookings = (bookingList: Booking[]) => {
    if (bookingList.length === 0) {
      return (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No bookings found</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid gap-4">
        {bookingList.map((booking) => (
          <Card key={booking.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">
                  {booking.listing.title}
                </CardTitle>
                <Badge
                  variant={
                    booking.status === "confirmed"
                      ? "default"
                      : booking.status === "completed"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {booking.checkIn} - {booking.checkOut}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {booking.listing.location.city},{" "}
                      {booking.listing.location.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.guests} guests</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={booking.host.avatar}
                        alt={booking.host.name}
                      />
                      <AvatarFallback>
                        {booking.host.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">
                        Hosted by {booking.host.name}
                      </div>
                      <Link
                        href={`/profile/${booking.host.id}`}
                        className="text-xs text-primary hover:underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Total:</span>{" "}
                    {formatCurrency(booking.totalPrice)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Collateral:</span>{" "}
                    {formatCurrency(booking.collateralAmount)}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/listings/${booking.listing.id}`}>
                  View Listing
                </Link>
              </Button>
              {booking.status === "confirmed" && (
                <Button size="sm">Contact Host</Button>
              )}
              {booking.status === "completed" && !booking.reviewed && (
                <Button asChild size="sm">
                  <Link href={`/rate/${booking.id}`}>
                    {booking.host.id === userId ? "Rate Surfer" : "Rate Host"}
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="upcoming">
          Upcoming ({bookings.upcoming.length})
        </TabsTrigger>
        <TabsTrigger value="past">Past ({bookings.past.length})</TabsTrigger>
        <TabsTrigger value="cancelled">
          Cancelled ({bookings.cancelled.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="mt-6">
        {renderBookings(bookings.upcoming)}
      </TabsContent>
      <TabsContent value="past" className="mt-6">
        {renderBookings(bookings.past)}
      </TabsContent>
      <TabsContent value="cancelled" className="mt-6">
        {renderBookings(bookings.cancelled)}
      </TabsContent>
    </Tabs>
  );
}
