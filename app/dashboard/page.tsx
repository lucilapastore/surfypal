"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSurfyPalStore } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrustScoreDisplay } from "@/components/trust-score/trust-score-display"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardListings } from "@/components/dashboard/dashboard-listings"
import { DashboardBookings } from "@/components/dashboard/dashboard-bookings"
import { DashboardReviews } from "@/components/dashboard/dashboard-reviews"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { currentUser } = useSurfyPalStore()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push("/signin")
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your stays, track your Trust Score, and showcase your reputation.
          </p>
        </div>
        <Button asChild>
          <Link href="/create-listing">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Listing
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Trust Score</CardTitle>
              <CardDescription>Higher scores mean more visibility and lower collateral requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <TrustScoreDisplay score={currentUser.trustScore} showDetails />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <DashboardStats />
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="listings">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-6">
            <DashboardListings />
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <DashboardBookings />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <DashboardReviews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

