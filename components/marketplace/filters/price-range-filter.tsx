"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PriceRangeFilterProps {
  minPrice: number
  maxPrice: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Price Range</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="min-price" className="sr-only">Minimum Price</Label>
          <Input
            id="min-price"
            type="number"
            placeholder="Min"
            value={minPrice || ""}
            onChange={(e) => onMinChange(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="max-price" className="sr-only">Maximum Price</Label>
          <Input
            id="max-price"
            type="number"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={(e) => onMaxChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}