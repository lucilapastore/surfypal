"use client";

import { UserBookings } from "@/components/profile/user-bookings";
import { UserListings } from "@/components/profile/user-listings";
import { UserReviews } from "@/components/profile/user-reviews";
import { TrustScoreDisplay } from "@/components/trust-score/trust-score-display";
import { TrustScoreHistory } from "@/components/trust-score/trust-score-history";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorldcoinValidationButton from "@/components/worldcoin-validation-button";
import { useUserById } from "@/hooks/use-users";
import { useSurfyPalStore } from "@/lib/store";
import { Award, CalendarDays, CheckCircle, MapPin, Shield } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const params = useParams();
  const { id } = params;
  const user = useUserById(id as string);
  const { currentUser } = useSurfyPalStore();
  const isOwnProfile = currentUser?.id === id;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="mt-4 text-muted-foreground">
          The user profile you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 flex items-center justify-center gap-2">
                {user.name}
                {user.worldIdVerified && (
                  <CheckCircle size={16} className="text-blue-500" />
                )}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <MapPin className="h-3 w-3" />
                {user.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <TrustScoreDisplay score={user.trustScore} />
              </div>

              <div className="mb-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {user.joinedDate}</span>
                </div>
                {user.worldIdVerified ? (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-500 font-medium">
                      Verified with World ID
                    </span>
                  </div>
                ) : (
                  isOwnProfile && (
                    <WorldcoinValidationButton
                      user={user}
                      onSuccess={() => setShowSuccessModal(true)}
                    />
                  )
                )}
                {user.isSuperhost && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Superhost</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">About</h3>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>

              {isOwnProfile && (
                <Button className="mt-6 w-full" variant="outline" asChild>
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="trust-score">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trust-score">Trust Score</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              {isOwnProfile && (
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="trust-score" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trust Score History</CardTitle>
                  <CardDescription>
                    See how {isOwnProfile ? "your" : `${user.name}'s`} Trust
                    Score has evolved over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TrustScoreHistory userId={user.id} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings" className="mt-6">
              <UserListings userId={user.id} />
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <UserReviews userId={user.id} />
            </TabsContent>

            {isOwnProfile && (
              <TabsContent value="bookings" className="mt-6">
                <UserBookings userId={user.id} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>

      {showSuccessModal && (
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md transition-all duration-300 ease-in-out transform">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Verification Successful!
              </DialogTitle>
              <DialogDescription className="pt-2 space-y-4">
                <p>
                  Congratulations! SurfyPal has validated that you are a real
                  human. Your profile now has enhanced trust and credibility.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/listings">Explore Listings</Link>
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
