"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSurfyPalStore } from "@/lib/store";
import { calculateCollateralAmount, formatCurrency } from "@/lib/utils";
import type { Listing } from "@/types";
import { MiniKit } from "@worldcoin/minikit-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

// Add a function to trigger haptic feedback for successful booking
const sendSuccessHapticFeedback = () => {
  if (MiniKit.isInstalled()) {
    MiniKit.commands.sendHapticFeedback({
      hapticsType: "notification",
      style: "success",
    });
  }
};

interface BookingFormProps {
  listing: Listing;
  onCancel: () => void;
}

export function BookingForm({ listing, onCancel }: BookingFormProps) {
  const [dates, setDates] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const { currentUser, createBooking } = useSurfyPalStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dates.from || !dates.to || !currentUser) {
      return;
    }

    setIsSubmitting(true);
    setShowLoadingDialog(true);

    try {
      // Calculate number of nights
      const nights = Math.ceil(
        (dates.to.getTime() - dates.from.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Calculate total price
      const totalPrice = listing.price * nights;

      // Calculate collateral amount based on trust score
      const collateralAmount = calculateCollateralAmount(
        totalPrice,
        currentUser.trustScore
      );

      // Create booking
      const newBooking = await createBooking({
        listingId: listing.id,
        hostId: listing.host.id,
        checkIn: dates.from,
        checkOut: dates.to,
        guests,
        totalPrice,
        collateralAmount,
      });

      // Send haptic feedback for successful booking
      sendSuccessHapticFeedback();

      // Store the booking ID and show success dialog
      setBookingId(newBooking.id);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Failed to create booking:", error);
    } finally {
      setIsSubmitting(false);
      setShowLoadingDialog(false);
    }
  };

  // Calculate booking details if dates are selected
  const nights =
    dates.from && dates.to
      ? Math.ceil(
          (dates.to.getTime() - dates.from.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = nights * listing.price;

  const collateralAmount = currentUser
    ? calculateCollateralAmount(totalPrice, currentUser.trustScore)
    : 0;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dates">Dates</Label>
          <div className="rounded-md border">
            <Calendar
              id="dates"
              mode="range"
              selected={{
                from: dates.from,
                to: dates.to,
              }}
              onSelect={(range) =>
                setDates({ from: range?.from, to: range?.to })
              }
              disabled={(date) => date < new Date()}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <Select
            value={guests.toString()}
            onValueChange={(value) => setGuests(Number.parseInt(value))}
          >
            <SelectTrigger id="guests">
              <SelectValue placeholder="Select number of guests" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(listing.capacity)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1} {i === 0 ? "guest" : "guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {dates.from && dates.to && (
          <>
            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>
                  {formatCurrency(listing.price)} x {nights} nights
                </span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Collateral required</span>
                <span>{formatCurrency(collateralAmount)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                The collateral amount is based on your Trust Score and will be
                returned after your stay.
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </>
        )}

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={!dates.from || !dates.to || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Book Now"}
          </Button>
        </div>
      </form>

      <Dialog open={showLoadingDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">
              Processing Your Booking
            </DialogTitle>
            <DialogDescription className="text-center">
              Please wait while we confirm your reservation...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your booking has been confirmed. You can view your upcoming stays
              in your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowSuccessDialog(false)}
            >
              Close
            </Button>
            <Button asChild>
              <Link href="/dashboard?tab=bookings">View Bookings</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
