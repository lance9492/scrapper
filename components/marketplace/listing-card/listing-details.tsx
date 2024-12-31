import { Badge } from "@/components/ui/badge"
import { Weight, Gavel } from "lucide-react"

interface ListingDetailsProps {
  weight: number
  bids: number
  metalType: string
}

export function ListingDetails({ weight, bids, metalType }: ListingDetailsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge variant="secondary">
        <Weight className="h-4 w-4 mr-1" />
        {weight}kg
      </Badge>
      <Badge variant="secondary">
        <Gavel className="h-4 w-4 mr-1" />
        {bids} bids
      </Badge>
      <Badge>{metalType}</Badge>
    </div>
  )
}