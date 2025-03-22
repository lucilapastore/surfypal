"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface WorldIdButtonProps {
  onSuccess: () => void
}

export function WorldIdButton({ onSuccess }: WorldIdButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleVerify = () => {
    setLoading(true)

    // Simulate World ID verification
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 1500)
  }

  return (
    <Button onClick={handleVerify} disabled={loading} className="w-full gap-2 bg-white text-black hover:bg-gray-100">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
        <div className="h-3 w-3 rounded-full bg-white" />
      </div>
      <span>{loading ? "Verifying..." : "Verify with World ID"}</span>
    </Button>
  )
}

