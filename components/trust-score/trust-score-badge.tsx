import { cn } from "@/lib/utils"
import { getTrustScoreTier, getTrustScoreColor } from "@/lib/trust-score"

interface TrustScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function TrustScoreBadge({ score, size = "md", className }: TrustScoreBadgeProps) {
  const tier = getTrustScoreTier(score)
  const color = getTrustScoreColor(score)

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-0.5",
    lg: "text-base px-2.5 py-1",
  }

  return (
    <div className={cn("inline-flex items-center rounded-full font-medium", sizeClasses[size], color, className)}>
      {score.toFixed(0)}
    </div>
  )
}

