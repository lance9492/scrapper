import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown } from "lucide-react"
import PriceChart from "@/components/price-chart"

export default function PricesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Live Scrap Metal Prices</h1>
        <p className="text-muted-foreground">
          Real-time scrap metal prices in South Africa. Updated every 15 minutes.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { metal: "Copper", price: 85, change: 2.3 },
          { metal: "Aluminum", price: 45, change: -1.2 },
          { metal: "Steel", price: 28, change: 0.8 },
          { metal: "Brass", price: 52, change: 1.5 }
        ].map(({ metal, price, change }) => (
          <Card key={metal} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">{metal}</div>
              <Badge variant={change > 0 ? "default" : "destructive"}>
                {change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(change)}%
              </Badge>
            </div>
            <div className="text-2xl font-bold">R {price}/kg</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-8">
        {["Copper", "Aluminum", "Steel", "Brass"].map((metal) => (
          <Card key={metal} className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold">{metal} Price History</h3>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
              <Badge variant="outline">Per Kilogram</Badge>
            </div>
            <div className="h-[300px]">
              <PriceChart metal={metal} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}