import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculateCollateralAmount(totalPrice: number, trustScore: number): number {
  // Calculate collateral percentage based on trust score
  let collateralPercentage: number

  if (trustScore >= 75) {
    // Green tier: 5-10%
    collateralPercentage = 0.1 - (trustScore - 75) * 0.002 // Scales from 10% to 5%
  } else if (trustScore >= 50) {
    // Yellow tier: 20%
    collateralPercentage = 0.2
  } else {
    // Red tier: 50% or more
    collateralPercentage = 0.5 + (50 - trustScore) * 0.01 // Scales from 50% to 100%
  }

  return Math.round(totalPrice * collateralPercentage)
}

