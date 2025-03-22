"use client"

import type React from "react"

// This file is kept for backward compatibility
// It re-exports the Zustand store to maintain compatibility with existing components
import { useSurfyPalStore } from "@/lib/store"

export function useSurfyPal() {
  return useSurfyPalStore()
}

export function SurfyPalProvider({ children }: { children: React.ReactNode }) {
  // This is now just a passthrough component for backward compatibility
  return <>{children}</>
}

