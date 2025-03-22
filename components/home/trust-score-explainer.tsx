import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrustScoreBadge } from "@/components/trust-score/trust-score-badge"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

export function TrustScoreExplainer() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-xl font-semibold">How Trust Scores Work</h3>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our Trust Score system is the backbone of SurfyPal, creating a safe and transparent community for travelers
            and hosts.
          </p>
          <p>
            Your Trust Score is calculated using a sophisticated formula that considers your reviews, activity history,
            and community interactions.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="font-mono text-sm">Trust Score = (Average Rating) × ln(Reviews + 1) + Bonus - Penalty</p>
          </div>
          <p>
            New users start with a <strong>Yellow Tier</strong> score of 50 points, with "New User Protection" for your
            first 3 reviews to help you get started.
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Trust Score Tiers</h3>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrustScoreBadge score={85} />
                  Green Tier
                </CardTitle>
                <CardDescription>75-100 points</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-green-600" />
                <span>Low collateral (5-10% of booking price)</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span>Highest visibility in search results</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span>Access to exclusive perks</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrustScoreBadge score={65} />
                  Yellow Tier
                </CardTitle>
                <CardDescription>50-74 points</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-yellow-600" />
                <span>Moderate collateral (20% of booking price)</span>
              </div>
              <div className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-yellow-600" />
                <span>Standard visibility in search results</span>
              </div>
              <div className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-yellow-600" />
                <span>Basic platform features</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrustScoreBadge score={35} />
                  Red Tier
                </CardTitle>
                <CardDescription>0-49 points</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-red-600" />
                <span>High collateral (50%+ of booking price)</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-red-600" />
                <span>Limited visibility in search results</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-red-600" />
                <span>Restricted access to some listings</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

