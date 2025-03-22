"use client"

import { useState, useEffect } from "react"
import { getUser } from "@/lib/api"
import type { User } from "@/types"

export function useUserById(id: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const data = await getUser(id)
        setUser(data)
      } catch (error) {
        console.error(`Failed to fetch user with id ${id}:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  return user
}

