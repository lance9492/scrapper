"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const mockListings = [
  {
    id: "1",
    title: "High-Grade Copper Wire - 500kg",
    seller: "Metro Recyclers",
    price: 85000,
    status: "pending",
    created: "2024-03-15",
  },
  {
    id: "2",
    title: "Mixed Aluminum Scrap - 1000kg",
    seller: "SA Metals",
    price: 45000,
    status: "active",
    created: "2024-03-14",
  },
  // Add more mock listings...
]

export default function AdminListings() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleAction = async (listingId: string, action: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: `Listing ${action} successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform action",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Listings</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[300px]"
            />
          </div>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.title}</TableCell>
                <TableCell>{listing.seller}</TableCell>
                <TableCell>R {listing.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={listing.status === "active" ? "default" : "secondary"}
                  >
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(listing.created).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleAction(listing.id, "approved")}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction(listing.id, "rejected")}
                        className="text-destructive"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}