"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getTrustScoreHistory } from "@/lib/api"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getTrustScoreColor } from "@/lib/trust-score"

interface TrustScoreHistoryProps {
  userId: string
}

export function TrustScoreHistory({ userId }: TrustScoreHistoryProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await getTrustScoreHistory(userId)
        setData(history)
      } catch (error) {
        console.error("Failed to fetch trust score history:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="text-muted-foreground">Loading trust score history...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="text-muted-foreground">No trust score history available yet.</div>
      </div>
    )
  }

  // Get the color for the current trust score (last data point)
  const currentScore = data[data.length - 1].score
  const scoreColor = getTrustScoreColor(currentScore, false)

  return (
    <div className="space-y-4">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, { month: "short", year: "numeric" })
              }
            />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickCount={5} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className="p-2 text-xs">
                        <div className="font-medium">
                          {new Date(payload[0].payload.date).toLocaleDateString(undefined, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Score:</span>
                          <span className="font-bold">{payload[0].value}</span>
                        </div>
                        {payload[0].payload.event && (
                          <div className="mt-1 text-muted-foreground">{payload[0].payload.event}</div>
                        )}
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              stroke={scoreColor.replace("bg-", "").replace("text-", "")}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data
          .filter((item) => item.event)
          .slice(-3)
          .reverse()
          .map((item, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</div>
                <div className="font-medium">{item.event}</div>
                <div className="mt-1 text-sm">
                  Score change:
                  <span className={item.change > 0 ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
                    {item.change > 0 ? `+${item.change}` : item.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

