"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ListingCard } from "@/components/marketplace/listing-card"
import { MetalTypeFilter } from "@/components/marketplace/filters/metal-type-filter"
import { LocationFilter } from "@/components/marketplace/filters/location-filter"
import { PriceRangeFilter } from "@/components/marketplace/filters/price-range-filter"
import { SearchBar } from "@/components/marketplace/search-sort/search-bar"
import { SortSelect } from "@/components/marketplace/search-sort/sort-select"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [selectedMetalTypes, setSelectedMetalTypes] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Scrap Metal Marketplace</h1>
          <p className="text-muted-foreground">Browse and bid on verified scrap metal listings</p>
        </div>
        <Button size="lg">+ Post Listing (R10.00)</Button>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        {/* Filters Sidebar */}
        <Card className="p-4 h-fit space-y-6">
          <MetalTypeFilter
            selectedTypes={selectedMetalTypes}
            onChange={setSelectedMetalTypes}
          />
          <LocationFilter
            value={selectedLocation}
            onChange={setSelectedLocation}
          />
          <PriceRangeFilter
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
            onMinChange={(min) => setPriceRange(prev => ({ ...prev, min }))}
            onMaxChange={(max) => setPriceRange(prev => ({ ...prev, max }))}
          />
        </Card>

        {/* Listings */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>

          <div className="grid gap-4">
            <ListingCard
              title="High-Grade Copper Wire - 500kg"
              description="Clean copper wire scrap, stripped and sorted. Ideal for recycling."
              price={85000}
              location="Cape Town, Western Cape"
              metalType="Copper"
              weight={500}
              bids={8}
              imageUrl="https://images.unsplash.com/photo-1605557202138-097824c3f8c7?auto=format&fit=crop&q=80"
              seller={{
                name: "Metro Recyclers",
                verified: true,
                rating: 4.8
              }}
            />
            {/* Add more listings as needed */}
          </div>
        </div>
      </div>
    </div>
  )
}