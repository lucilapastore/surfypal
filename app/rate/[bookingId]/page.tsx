import { RatingForm } from "@/components/bookings/rating-form";

export default async function RatePage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Rate Your Experience
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Your rating will help improve the community by impacting the user's
            Trust Score. Please rate honestly based on your experience.
          </p>
        </div>

        <RatingForm bookingId={bookingId} />
      </div>
    </div>
  );
}
