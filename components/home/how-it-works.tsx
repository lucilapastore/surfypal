import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Star, CreditCard } from "lucide-react"

export function HowItWorks() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <Shield className="h-10 w-10 text-primary" />
          <CardTitle className="mt-4">Verify Identity</CardTitle>
          <CardDescription>Sign up with World ID for secure, privacy-preserving verification</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your identity is verified without sharing personal information, ensuring trust and safety in our community.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <Users className="h-10 w-10 text-primary" />
          <CardTitle className="mt-4">Connect with Locals</CardTitle>
          <CardDescription>Browse listings from verified hosts worldwide</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Find authentic stays with local hosts who share your interests and can provide a genuine cultural
            experience.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CreditCard className="h-10 w-10 text-primary" />
          <CardTitle className="mt-4">Secure Booking</CardTitle>
          <CardDescription>Book with confidence using our collateral system</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Our Trust Score-based collateral system protects both hosts and travelers, with lower deposits for trusted
            users.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <Star className="h-10 w-10 text-primary" />
          <CardTitle className="mt-4">Build Trust</CardTitle>
          <CardDescription>Earn a higher Trust Score through positive interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Every positive review improves your Trust Score, unlocking benefits like lower collateral requirements and
            increased visibility.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

