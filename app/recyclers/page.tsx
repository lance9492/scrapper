"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, ExternalLink, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RecyclersMap } from "@/components/maps/recyclers-map"
import { recyclers } from "@/lib/data/recyclers"
import Link from "next/link"

export default function RecyclersPage() {
  const [province, setProvince] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthenticated] = useState(false) // This would come from your auth state

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Registered Recyclers</h1>
        <p className="text-muted-foreground">
          Find verified scrap metal recyclers across South Africa.
          {!isAuthenticated && (
            <span className="block mt-2 text-sm">
              <Lock className="inline-block h-4 w-4 mr-1" />
              Login to view contact details
            </span>
          )}
        </p>
      </div>

      {/* Map Section */}
      <Card className="mb-8 p-4">
        <h2 className="text-xl font-semibold mb-4">Recycler Locations</h2>
        <RecyclersMap />
      </Card>

      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        {/* Filters */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Search</label>
            <Input
              placeholder="Search recyclers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Province</label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                <SelectItem value="western-cape">Western Cape</SelectItem>
                <SelectItem value="gauteng">Gauteng</SelectItem>
                <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
                <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recyclers List */}
        <div className="space-y-6">
          {recyclers.map((recycler) => (
            <Card key={recycler.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{recycler.name}</h2>
                  <p className="text-muted-foreground">{recycler.description}</p>
                </div>
                {recycler.verified && (
                  <Button variant="outline" size="sm">Verified</Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {recycler.address}
                  </div>
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {recycler.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {recycler.email}
                      </div>
                      {recycler.website && (
                        <div className="flex items-center gap-2 text-sm">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          <a href={recycler.website} target="_blank" rel="noopener noreferrer" 
                             className="text-primary hover:underline">
                            Visit Website
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <Button asChild variant="outline" size="sm">
                      <Link href="/auth/login">Login to View Contact Details</Link>
                    </Button>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Accepted Materials:</div>
                  <div className="flex flex-wrap gap-2">
                    {recycler.materials.map((material) => (
                      <div key={material} className="bg-muted px-2 py-1 rounded text-sm">
                        {material}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}