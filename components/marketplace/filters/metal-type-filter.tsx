"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const METAL_TYPES = ["Copper", "Aluminum", "Steel", "Brass", "Iron"]

interface MetalTypeFilterProps {
  selectedTypes: string[]
  onChange: (types: string[]) => void
}

export function MetalTypeFilter({ selectedTypes, onChange }: MetalTypeFilterProps) {
  const handleChange = (type: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedTypes, type])
    } else {
      onChange(selectedTypes.filter(t => t !== type))
    }
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Metal Type</h3>
      <div className="space-y-2">
        {METAL_TYPES.map((metal) => (
          <div key={metal} className="flex items-center space-x-2">
            <Checkbox
              id={metal}
              checked={selectedTypes.includes(metal)}
              onCheckedChange={(checked) => handleChange(metal, checked as boolean)}
            />
            <Label htmlFor={metal} className="text-sm">{metal}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}