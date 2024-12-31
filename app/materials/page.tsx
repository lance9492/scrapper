import { materials } from "@/lib/data/materials"
import { MaterialCard } from "@/components/materials/material-card"

export default function MaterialsPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Recyclable Materials Guide</h1>
        <p className="text-muted-foreground">
          Learn about different types of scrap metals, their grades, and current market values.
        </p>
      </div>

      <div className="grid gap-8">
        {materials.map((material) => (
          <MaterialCard key={material.name} {...material} />
        ))}
      </div>
    </div>
  )
}