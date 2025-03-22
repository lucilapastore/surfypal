import { RatingForm } from "@/components/bookings/rating-form";

export default async function RatePage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-3xl font-bold">Rate Your Experience</h1>
        <p className="text-muted-foreground">
          Your rating will help improve the community by impacting the user's
          Trust Score. Please rate honestly based on your experience.
        </p>
      </div>

      <RatingForm bookingId={bookingId} />
    </div>
  );
}
