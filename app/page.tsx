import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/home/how-it-works";
import { TrustScoreExplainer } from "@/components/home/trust-score-explainer";
import { FeaturedListings } from "@/components/home/featured-listings";
import { Testimonials } from "@/components/home/testimonials";
import { WorldIdBanner } from "@/components/home/world-id-banner";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="-mt-[5.5rem] flex flex-col gap-16">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] w-full overflow-hidden">
        {/* Light theme gradient - subtle earth tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-teal-50/50 to-sky-50 dark:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
        </div>
        {/* Dark theme gradient - deeper earth tones */}
        <div className="absolute inset-0 hidden bg-gradient-to-br from-teal-950 via-emerald-900 to-blue-900 dark:block">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center md:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Stay with Locals, Explore the World
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
            Connect with trusted hosts worldwide, experience authentic cultures,
            and create meaningful connections through our decentralized travel
            platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/listings">Find a Stay</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link href="/signup">Become a Host</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          How SurfyPal Works
        </h2>
        <HowItWorks />
      </section>

      {/* Trust Score Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Our Trust Score System
          </h2>
          <TrustScoreExplainer />
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Places to Stay
          </h2>
          <Button asChild variant="outline">
            <Link href="/listings">View All Listings</Link>
          </Button>
        </div>
        <FeaturedListings />
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Community Says
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* World ID Banner */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8">
        <WorldIdBanner />
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
            Join our community of travelers and hosts today. Create your
            profile, build your Trust Score, and discover authentic stays
            worldwide.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-12 px-8">
            <Link href="/signup">Sign Up with World ID</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
