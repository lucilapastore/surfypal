"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSurfyPalStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { Listing } from "@/types"
import { formatCurrency, calculateCollateralAmount } from "@/lib/utils"

interface BookingFormProps {
  listing: Listing
  onCancel: () => void
}

export function BookingForm({ listing, onCancel }: BookingFormProps) {
  const [dates, setDates] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [guests, setGuests] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { currentUser, createBooking } = useSurfyPalStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dates.from || !dates.to || !currentUser) {
      return
    }

    setIsSubmitting(true)

    try {
      // Calculate number of nights
      const nights = Math.ceil((dates.to.getTime() - dates.from.getTime()) / (1000 * 60 * 60 * 24))

      // Calculate total price
      const totalPrice = listing.price * nights

      // Calculate collateral amount based on trust score
      const collateralAmount = calculateCollateralAmount(totalPrice, currentUser.trustScore)

      // Create booking
      await createBooking({
        listingId: listing.id,
        hostId: listing.host.id,
        checkIn: dates.from,
        checkOut: dates.to,
        guests,
        totalPrice,
        collateralAmount,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to create booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate booking details if dates are selected
  const nights =
    dates.from && dates.to ? Math.ceil((dates.to.getTime() - dates.from.getTime()) / (1000 * 60 * 60 * 24)) : 0

  const totalPrice = nights * listing.price

  const collateralAmount = currentUser ? calculateCollateralAmount(totalPrice, currentUser.trustScore) : 0

  return (
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
            onSelect={(range) => setDates({ from: range?.from, to: range?.to })}
            disabled={(date) => date < new Date()}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Guests</Label>
        <Select value={guests.toString()} onValueChange={(value) => setGuests(Number.parseInt(value))}>
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
              The collateral amount is based on your Trust Score and will be returned after your stay.
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </>
      )}

      <div className="flex gap-2">
        <Button type="button" variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="w-full" disabled={!dates.from || !dates.to || isSubmitting}>
          {isSubmitting ? "Processing..." : "Book Now"}
        </Button>
      </div>
    </form>
  )
}

