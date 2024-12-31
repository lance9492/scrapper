"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PROVINCES = [
  "All Provinces",
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Mpumalanga",
  "North West",
  "Limpopo",
  "Northern Cape"
]

interface LocationFilterProps {
  value: string
  onChange: (value: string) => void
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Location</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select province" />
        </SelectTrigger>
        <SelectContent>
          {PROVINCES.map((province) => (
            <SelectItem
              key={province}
              value={province.toLowerCase().replace(" ", "-")}
            >
              {province}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}