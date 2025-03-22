"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSurfyPalStore } from "@/lib/store"
import { formatCurrency } from "@/lib/utils"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function DashboardListings() {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { userListings, deleteListing } = useSurfyPalStore()

  const handleDelete = async (id: string) => {
    setIsDeleting(id)
    try {
      await deleteListing(id)
    } catch (error) {
      console.error("Failed to delete listing:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  if (userListings.length === 0) {
    return (
      <div className="flex h-[200px] flex-col items-center justify-center gap-4 rounded-lg border bg-muted/50 p-8 text-center">
        <h3 className="text-lg font-medium">No listings yet</h3>
        <p className="text-muted-foreground">Create your first listing to start hosting guests.</p>
        <Button asChild>
          <Link href="/create-listing">Create a Listing</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {userListings.map((listing) => (
        <Card key={listing.id}>
          <div className="relative aspect-video w-full overflow-hidden">
            <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
            {listing.featured && <Badge className="absolute left-2 top-2">Featured</Badge>}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="line-clamp-1">{listing.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">{formatCurrency(listing.price)}/night</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Min Trust Score:</span>
                <span className="font-medium">{listing.minTrustScore}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bookings:</span>
                <span className="font-medium">5 total</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/listings/${listing.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/listings/edit/${listing.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => handleDelete(listing.id)}
              disabled={isDeleting === listing.id}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting === listing.id ? "Deleting..." : "Delete"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

