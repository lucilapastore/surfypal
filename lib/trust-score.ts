export const TRUST_SCORE_TIERS = {
  RED: { min: 0, max: 49 },
  YELLOW: { min: 50, max: 74 },
  GREEN: { min: 75, max: 100 },
}

// Get the tier based on score
export function getTrustScoreTier(score: number): "red" | "yellow" | "green" {
  if (score >= TRUST_SCORE_TIERS.GREEN.min) return "green"
  if (score >= TRUST_SCORE_TIERS.YELLOW.min) return "yellow"
  return "red"
}

// Get color class based on score
export function getTrustScoreColor(score: number, isBg = true): string {
  const tier = getTrustScoreTier(score)

  if (isBg) {
    switch (tier) {
      case "green":
        return "bg-green-100 text-green-700"
      case "yellow":
        return "bg-yellow-100 text-yellow-700"
      case "red":
        return "bg-red-100 text-red-700"
    }
  } else {
    switch (tier) {
      case "green":
        return "text-green-600"
      case "yellow":
        return "text-yellow-600"
      case "red":
        return "text-red-600"
    }
  }
}

// Calculate Trust Score based on the formula
export function calculateTrustScore(ratings: number[], bonusPoints: number, penaltyPoints: number): number {
  if (ratings.length === 0) return 50 // Default score for new users

  // Calculate average rating
  const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length

  // Apply logarithmic scaling based on number of reviews
  const reviewsScaling = Math.log(ratings.length + 1)

  // Calculate base score (0-100 scale)
  let score = (averageRating / 5) * 100 * reviewsScaling

  // Add bonus points
  score += bonusPoints

  // Subtract penalty points
  score -= penaltyPoints

  // Ensure score is within 0-100 range
  return Math.min(Math.max(Math.round(score), 0), 100)
}

