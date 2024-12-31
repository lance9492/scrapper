"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ListingHeader } from "./listing-header"
import { ListingDetails } from "./listing-details"
import { SellerInfo } from "./seller-info"
import BidDialog from "@/components/bid-dialog"

interface ListingCardProps {
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

export function ListingCard({
  title,
  description,
  price,
  location,
  metalType,
  weight,
  bids,
  imageUrl,
  seller,
}: ListingCardProps) {
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
            <ListingHeader
              title={title}
              price={price}
              location={location}
            />
            <p className="text-muted-foreground mb-4">{description}</p>
            <ListingDetails
              weight={weight}
              bids={bids}
              metalType={metalType}
            />
            <div className="flex items-center justify-between">
              <SellerInfo {...seller} />
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