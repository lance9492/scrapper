"use client"

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  ListChecks, 
  Users, 
  AlertTriangle, 
  Settings,
  Menu
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    title: "Listings",
    href: "/admin/listings",
    icon: ListChecks
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: AlertTriangle
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-semibold">Admin Dashboard</div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-16 flex items-center px-6 border-b font-semibold">
            Admin Dashboard
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="space-y-1 px-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                      pathname === item.href ? "bg-accent" : "transparent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all",
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}>
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}