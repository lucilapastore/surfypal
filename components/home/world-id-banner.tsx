import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WorldIdBanner() {
  return (
    <div className="rounded-lg border bg-muted/50 p-6 text-center sm:p-8">
      <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 p-2">
        <div className="h-full w-full rounded-full bg-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">Verified with World ID</h3>
      <p className="mx-auto mb-6 max-w-md text-muted-foreground">
        SurfyPal uses World ID for secure, privacy-preserving verification. Verify your identity once and build trust in
        our community.
      </p>
      <Button asChild>
        <Link href="/signup">Get Started with World ID</Link>
      </Button>
    </div>
  )
}

