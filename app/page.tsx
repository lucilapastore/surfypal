import { Button } from "@/components/ui/button"
import { HowItWorks } from "@/components/home/how-it-works"
import { TrustScoreExplainer } from "@/components/home/trust-score-explainer"
import { FeaturedListings } from "@/components/home/featured-listings"
import { Testimonials } from "@/components/home/testimonials"
import { WorldIdBanner } from "@/components/home/world-id-banner"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="People traveling and connecting with locals"
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
        </div>
        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center md:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Stay with Locals, Explore the World
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/90">
            Connect with trusted hosts worldwide, experience authentic cultures, and create meaningful connections
            through our decentralized travel platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/listings">Find a Stay</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Link href="/signup">Become a Host</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">How SurfyPal Works</h2>
        <HowItWorks />
      </section>

      {/* Trust Score Section */}
      <section className="bg-muted/50 py-16">
        <div className="container px-4 md:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Our Trust Score System</h2>
          <TrustScoreExplainer />
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container px-4 md:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Featured Places to Stay</h2>
          <Button asChild variant="outline">
            <Link href="/listings">View All Listings</Link>
          </Button>
        </div>
        <FeaturedListings />
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-16">
        <div className="container px-4 md:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">What Our Community Says</h2>
          <Testimonials />
        </div>
      </section>

      {/* World ID Banner */}
      <section className="container px-4 md:px-6 lg:px-8">
        <WorldIdBanner />
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container px-4 md:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
            Join our community of travelers and hosts today. Create your profile, build your Trust Score, and discover
            authentic stays worldwide.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-12 px-8">
            <Link href="/signup">Sign Up with World ID</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

