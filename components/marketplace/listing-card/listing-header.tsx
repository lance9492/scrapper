import { formatCurrency } from "@/lib/utils/format"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface ListingHeaderProps {
  title: string
  price: number
  location: string
}

export function ListingHeader({ title, price, location }: ListingHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {location}
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold">{formatCurrency(price)}</div>
        <div className="text-sm text-muted-foreground">Current Highest Bid</div>
      </div>
    </div>
  )
}