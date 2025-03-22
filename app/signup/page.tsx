"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSurfyPalStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorldIdButton } from "@/components/auth/world-id-button"
import { TrustScoreExplainer } from "@/components/home/trust-score-explainer"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<"surfer" | "host" | "both">("both")
  const { signUp } = useSurfyPalStore()
  const router = useRouter()

  const handleSignUp = () => {
    signUp({
      name: "New User",
      email: "user@example.com",
      userType,
    })
    router.push("/dashboard")
  }

  return (
    <div className="container py-8 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-center text-3xl font-bold tracking-tight">
          Join SurfyPal – Verified Travel Community
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          Connect with locals worldwide and experience authentic travel with our trust-based community.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              Step {step} of 3:{" "}
              {step === 1 ? "Verify Identity" : step === 2 ? "Choose Account Type" : "Complete Profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <h2 className="mb-2 text-xl font-semibold">Verify with World ID</h2>
                  <p className="mb-6 text-muted-foreground">
                    SurfyPal uses World ID to verify your identity and ensure trust in our community.
                  </p>
                </div>

                <WorldIdButton onSuccess={() => setStep(2)} />

                <div className="mt-4 grid w-full gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <span className="font-medium">Secure Verification</span>
                      <p className="text-muted-foreground">
                        Your identity is verified without sharing personal information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <span className="font-medium">One-Time Process</span>
                      <p className="text-muted-foreground">Verify once and use your World ID across all platforms.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <span className="font-medium">Trust Score Boost</span>
                      <p className="text-muted-foreground">Start with a higher Trust Score as a verified user.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Choose Your Account Type</h2>
                <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="surfer">Surfer</TabsTrigger>
                    <TabsTrigger value="host">Host</TabsTrigger>
                    <TabsTrigger value="both">Both</TabsTrigger>
                  </TabsList>
                  <TabsContent value="surfer" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">As a Surfer, you can:</h3>
                      <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                        <li>Find and book stays with trusted local hosts</li>
                        <li>Build your Trust Score through positive interactions</li>
                        <li>Pay lower collateral as your Trust Score increases</li>
                        <li>Experience authentic local cultures worldwide</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="host" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">As a Host, you can:</h3>
                      <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                        <li>List your space and welcome travelers from around the world</li>
                        <li>Set your own availability and house rules</li>
                        <li>Require minimum Trust Scores for booking eligibility</li>
                        <li>Build your Trust Score through positive hosting experiences</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="both" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">As both a Surfer and Host, you can:</h3>
                      <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                        <li>Enjoy all the benefits of both account types</li>
                        <li>Build your Trust Score faster through both hosting and traveling</li>
                        <li>Create a more well-rounded profile in the community</li>
                        <li>Switch between hosting and traveling seamlessly</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Complete Your Profile</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, Country" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell the community about yourself..." className="min-h-[100px]" />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleSignUp}>Create Account</Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 border-t p-6">
            <div className="text-sm text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </div>
            <div className="text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>

        <Separator className="my-12" />

        <div>
          <h2 className="mb-6 text-center text-2xl font-bold">Understanding the Trust Score System</h2>
          <TrustScoreExplainer />
        </div>
      </div>
    </div>
  )
}

