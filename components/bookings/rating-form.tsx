"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getUserBookings, mockSubmitRating, type RatingData } from "@/lib/api";
import { useSurfyPalStore } from "@/lib/store";
import type { Booking } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Loader2, Star } from "lucide-react";

interface RatingFormProps {
  bookingId: string;
}

interface RatingCriteria {
  name: string;
  label: string;
  description: string;
  score: number;
}

export function RatingForm({ bookingId }: RatingFormProps) {
  const router = useRouter();
  const { currentUser } = useSurfyPalStore();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState("");
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [bookingData, setBookingData] = useState<{
    booking: Booking | null;
    userId: string; // Current user ID
    targetUserId: string; // User to be rated
    userType: "host" | "surfer"; // User type to be rated (from current user perspective)
  }>({
    booking: null,
    userId: "",
    targetUserId: "",
    userType: "host", // default, will be updated
  });

  // Rating criteria for both host and surfer
  const [criteria, setCriteria] = useState<RatingCriteria[]>([]);

  useEffect(() => {
    // Fetch booking data
    const fetchBookingData = async () => {
      try {
        if (!currentUser) {
          throw new Error("User not logged in");
        }

        setLoading(true);
        // In a real app, we would fetch the booking data from the API
        // For this mockup, we're using the mock data

        // Get all user bookings - use current user ID
        const allBookings = await getUserBookings(currentUser.id);

        // Find the specific booking
        let booking: Booking | null = null;

        // Check in upcoming, past, and cancelled bookings
        for (const category of ["upcoming", "past", "cancelled"]) {
          const found = allBookings[category as keyof typeof allBookings].find(
            (b) => b.id === bookingId
          );
          if (found) {
            booking = found;
            break;
          }
        }

        if (!booking) {
          throw new Error("Booking not found");
        }

        // Determine if current user is rating a host or a surfer
        const isRatingHost = currentUser.id !== booking.host.id;

        // If current user is not host, they're rating the host
        // Otherwise, they're rating the surfer
        const targetUserId = isRatingHost
          ? booking.host.id
          : booking.surfer?.id || "";
        const userType = isRatingHost ? "host" : "surfer";

        if (!targetUserId) {
          throw new Error("Target user not found");
        }

        setBookingData({
          booking,
          userId: currentUser.id,
          targetUserId,
          userType,
        });

        // Set rating criteria based on user type
        setCriteria([
          {
            name: "cleanliness",
            label: "Cleanliness",
            description:
              userType === "host"
                ? "How clean and tidy was the space?"
                : "How respectful was the surfer in keeping the space clean?",
            score: 0,
          },
          {
            name: "communication",
            label: "Communication",
            description:
              "How responsive, clear, and helpful was the other party during the stay?",
            score: 0,
          },
          {
            name: "respect",
            label: "Respect",
            description: `How well did the ${userType} adhere to house rules and respect the agreement?`,
            score: 0,
          },
          {
            name: "punctuality",
            label: "Punctuality",
            description: `Was the ${userType} punctual for check-in/out times?`,
            score: 0,
          },
          {
            name: "experience",
            label: "Experience",
            description:
              "How was your overall experience and was the interaction positive?",
            score: 0,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch booking data:", error);
        toast.error("Failed to load booking information.");
        router.push("/dashboard?tab=bookings");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId && currentUser) {
      fetchBookingData();
    } else if (!currentUser) {
      router.push("/signin");
    }
  }, [bookingId, router, currentUser]);

  const handleStarClick = (criteriaIndex: number, starValue: number) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[criteriaIndex].score = starValue;
    setCriteria(updatedCriteria);
  };

  const handleSubmit = async () => {
    // Validate that all criteria have been rated
    if (criteria.some((criterion) => criterion.score === 0)) {
      toast.error("Please rate all criteria before submitting.");
      return;
    }

    setShowLoadingDialog(true);

    try {
      // Create ratings object
      const ratingsObject: { [key: string]: number } = {};
      criteria.forEach((c) => {
        ratingsObject[c.name] = c.score;
      });

      // Calculate average rating
      const ratingValues = Object.values(ratingsObject);
      const averageRating =
        ratingValues.reduce((sum, rating) => sum + rating, 0) /
        ratingValues.length;

      // Prepare rating data
      const ratingData: RatingData = {
        bookingId,
        userId: bookingData.targetUserId,
        ratings: ratingsObject,
        averageRating,
        comments: comments.trim() || undefined,
      };

      // Submit rating
      const result = await mockSubmitRating(ratingData);

      if (result.success) {
        setShowLoadingDialog(false);
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast.error("Failed to submit rating. Please try again.");
      setShowLoadingDialog(false);
    }
  };

  // Render stars for a specific criterion
  const renderStars = (criteriaIndex: number) => {
    const criterion = criteria[criteriaIndex];
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <button
            key={starValue}
            type="button"
            onClick={() => handleStarClick(criteriaIndex, starValue)}
            className={`p-0.5 hover:text-yellow-400 ${
              criterion.score >= starValue ? "text-yellow-400" : "text-gray-300"
            }`}
            aria-label={`Rate ${starValue} star${starValue !== 1 ? "s" : ""}`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  if (loading && !bookingData.booking) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="text-muted-foreground">
          Loading booking information...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {criteria.map((criterion, index) => (
          <Card key={criterion.name} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{criterion.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {criterion.description}
                  </p>
                </div>
                <div className="flex justify-center">{renderStars(index)}</div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Additional Comments</h3>
              <p className="text-sm text-muted-foreground">
                Please share any additional feedback about your experience.
              </p>
              <Textarea
                placeholder="What could be improved? What went well? (Optional)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-32"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={loading || criteria.some((c) => c.score === 0)}
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </Button>
        </div>
      </div>

      <Dialog open={showLoadingDialog} onOpenChange={setShowLoadingDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">
              Submitting Your Rating
            </DialogTitle>
            <DialogDescription className="text-center">
              Please wait while we process your feedback...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Rating Submitted Successfully!
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 pt-4 text-center">
                <div className="space-y-2">
                  <div className="mb-2 font-medium">
                    Average Rating:{" "}
                    {criteria.reduce((sum, c) => sum + c.score, 0) /
                      criteria.length}{" "}
                    / 5
                  </div>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <=
                          criteria.reduce((sum, c) => sum + c.score, 0) /
                            criteria.length
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-medium text-green-600">
                    Trust Score Impact
                  </div>
                  <div className="text-sm text-muted-foreground">
                    This rating will add{" "}
                    {Math.round(
                      (criteria.reduce((sum, c) => sum + c.score, 0) /
                        criteria.length) *
                        2
                    )}{" "}
                    points to your Trust Score and affect the{" "}
                    {bookingData.userType}&apos;s Trust Score by{" "}
                    {Math.round(
                      (criteria.reduce((sum, c) => sum + c.score, 0) /
                        criteria.length) *
                        3
                    )}{" "}
                    points.
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => router.push("/dashboard?tab=bookings")}>
              Go to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
