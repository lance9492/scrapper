import { Card } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminMetricCardProps {
  title: string
  value: string
  change: number
  icon: LucideIcon
}

export function AdminMetricCard({
  title,
  value,
  change,
  icon: Icon
}: AdminMetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-muted-foreground" />
        {change !== 0 && (
          <div
            className={cn(
              "flex items-center text-sm",
              change > 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {change > 0 ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </Card>
  )
}