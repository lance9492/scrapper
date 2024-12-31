"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, MapPin, Weight, Timer, Gavel } from "lucide-react"
import BidDialog from './bid-dialog'

interface ScrapListingProps {
  title: string
  description: string
  price: number
  location: string
  metalType: string
  weight: number
  bids: number
  imageUrl: string
  seller: {
    name: string
    verified: boolean
    rating: number
  }
}

export default function ScrapListing({
  title,
  description,
  price,
  location,
  metalType,
  weight,
  bids,
  imageUrl,
  seller
}: ScrapListingProps) {
  const [showBidDialog, setShowBidDialog] = useState(false)

  return (
    <>
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-[300px_1fr] gap-4">
          <div className="relative h-[200px] md:h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  {location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">R {price.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Current Highest Bid</div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">
                <Weight className="h-4 w-4 mr-1" />
                {weight}kg
              </Badge>
              <Badge variant="secondary">
                <Gavel className="h-4 w-4 mr-1" />
                {bids} bids
              </Badge>
              <Badge>{metalType}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{seller.name}</div>
                {seller.verified && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
                <Badge variant="secondary">{seller.rating} ★</Badge>
              </div>

              <Button onClick={() => setShowBidDialog(true)}>
                Place Bid
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <BidDialog
        isOpen={showBidDialog}
        onClose={() => setShowBidDialog(false)}
        listingTitle={title}
        currentPrice={price}
        minBidIncrement={100}
      />
    </>
  )
}