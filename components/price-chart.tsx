"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PriceChartProps {
  metal: string
}

export default function PriceChart({ metal }: PriceChartProps) {
  // This would normally fetch real data
  const data = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    price: Math.random() * (metal === 'Copper' ? 30 : 20) + (metal === 'Copper' ? 70 : 30)
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="date"
          className="text-xs text-muted-foreground"
          tickFormatter={(value) => new Date(value).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short' })}
        />
        <YAxis
          className="text-xs text-muted-foreground"
          tickFormatter={(value) => `R${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Price:</div>
                  <div>R{payload[0].value.toFixed(2)}</div>
                  <div className="font-medium">Date:</div>
                  <div>{new Date(payload[0].payload.date).toLocaleDateString()}</div>
                </div>
              </div>
            )
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          className="stroke-primary"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}