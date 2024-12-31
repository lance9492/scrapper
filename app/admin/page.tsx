import { Card } from "@/components/ui/card"
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  DollarSign,
  Package,
  Users,
  AlertTriangle
} from "lucide-react"
import { AdminMetricCard } from "@/components/admin/metric-card"
import { AdminChart } from "@/components/admin/chart"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard
          title="Total Revenue"
          value="R 45,231"
          change={12.5}
          icon={DollarSign}
        />
        <AdminMetricCard
          title="Active Listings"
          value="142"
          change={-2.3}
          icon={Package}
        />
        <AdminMetricCard
          title="Total Users"
          value="1,234"
          change={5.7}
          icon={Users}
        />
        <AdminMetricCard
          title="Pending Reports"
          value="8"
          change={0}
          icon={AlertTriangle}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <AdminChart type="revenue" />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Listing Activity</h2>
          <AdminChart type="listings" />
        </Card>
      </div>
    </div>
  )
}