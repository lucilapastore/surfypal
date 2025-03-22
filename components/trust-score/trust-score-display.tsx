"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TrustScoreBadge } from "@/components/trust-score/trust-score-badge"
import { getTrustScoreTier, getTrustScoreColor } from "@/lib/trust-score"
import { Info } from "lucide-react"

interface TrustScoreDisplayProps {
  score: number
  showDetails?: boolean
}

export function TrustScoreDisplay({ score, showDetails = false }: TrustScoreDisplayProps) {
  const [showExplanation, setShowExplanation] = useState(false)
  const tier = getTrustScoreTier(score)
  const color = getTrustScoreColor(score)

  // Calculate percentage for progress bar (0-100 scale)
  const progressPercentage = Math.min(Math.max((score / 100) * 100, 0), 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Trust Score</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Info className="h-4 w-4" />
                <span className="sr-only">Trust Score Info</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">About Trust Scores</h4>
                <p className="text-sm text-muted-foreground">
                  Your Trust Score reflects your reputation in the SurfyPal community. It's calculated based on reviews,
                  activity, and interactions.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="rounded-md bg-red-100 p-2 text-center text-xs font-medium text-red-700">
                    Red: 0-49
                  </div>
                  <div className="rounded-md bg-yellow-100 p-2 text-center text-xs font-medium text-yellow-700">
                    Yellow: 50-74
                  </div>
                  <div className="rounded-md bg-green-100 p-2 text-center text-xs font-medium text-green-700">
                    Green: 75-100
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <TrustScoreBadge score={score} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>0</span>
          <span>100</span>
        </div>
        <Progress value={progressPercentage} className="h-2" indicatorClassName={color} />
      </div>

      {showDetails && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-sm"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? "Hide Details" : "View Score Details"}
          </Button>

          {showExplanation && (
            <Card className="mt-4">
              <CardContent className="p-4 text-sm">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Trust Score Formula</h4>
                    <p className="text-muted-foreground">
                      Trust Score = (Average Rating) × ln(Reviews + 1) + Bonus - Penalty
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span>Average Rating:</span>
                      <span className="font-medium">4.7/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of Reviews:</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bonus Points:</span>
                      <span className="font-medium text-green-600">+15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Penalty Points:</span>
                      <span className="font-medium text-red-600">-0</span>
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-3">
                    <h4 className="font-medium">How to Improve Your Score</h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                      <li>Complete more stays or host more guests</li>
                      <li>Maintain high ratings in all review categories</li>
                      <li>Respond promptly to messages</li>
                      <li>Follow community guidelines</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

