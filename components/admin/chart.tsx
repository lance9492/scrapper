"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AdminChartProps {
  type: "revenue" | "listings"
}

export function AdminChart({ type }: AdminChartProps) {
  // Mock data - replace with real data from your API
  const data = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: type === "revenue" 
      ? Math.floor(Math.random() * 10000) + 5000
      : Math.floor(Math.random() * 50) + 20
  }))

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs text-muted-foreground"
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-ZA', { 
              day: '2-digit',
              month: 'short'
            })}
          />
          <YAxis
            className="text-xs text-muted-foreground"
            tickFormatter={(value) => type === "revenue" ? `R${value}` : value}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">
                      {type === "revenue" ? "Revenue:" : "Listings:"}
                    </div>
                    <div>
                      {type === "revenue" 
                        ? `R${payload[0].value}`
                        : payload[0].value
                      }
                    </div>
                    <div className="font-medium">Date:</div>
                    <div>{new Date(payload[0].payload.date).toLocaleDateString()}</div>
                  </div>
                </div>
              )
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            className="stroke-primary"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}