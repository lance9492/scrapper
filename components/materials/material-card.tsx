import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface MaterialType {
  name: string
  description: string
  price: string
  grade: string
}

interface MaterialCardProps {
  name: string
  description: string
  image: string
  types: MaterialType[]
}

export function MaterialCard({ name, description, image, types }: MaterialCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <div className="relative h-[300px] md:h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>
          
          <div className="space-y-4">
            {types.map((type) => (
              <div key={type.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{type.name}</h3>
                    <Badge variant={
                      type.grade.includes('+') ? "default" :
                      type.grade === 'A' ? "secondary" :
                      type.grade === 'B' ? "outline" : "destructive"
                    }>
                      Grade {type.grade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">R {type.price}</div>
                  <div className="text-xs text-muted-foreground">per kg</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}