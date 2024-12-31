import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface SellerInfoProps {
  name: string
  verified: boolean
  rating: number
}

export function SellerInfo({ name, verified, rating }: SellerInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-medium">{name}</div>
      {verified && (
        <CheckCircle2 className="h-4 w-4 text-primary" />
      )}
      <Badge variant="secondary">{rating} ★</Badge>
    </div>
  )
}