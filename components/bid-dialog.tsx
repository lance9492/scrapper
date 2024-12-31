"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface BidDialogProps {
  isOpen: boolean
  onClose: () => void
  listingTitle: string
  currentPrice: number
  minBidIncrement: number
}

export default function BidDialog({
  isOpen,
  onClose,
  listingTitle,
  currentPrice,
  minBidIncrement,
}: BidDialogProps) {
  const [bidAmount, setBidAmount] = useState(currentPrice + minBidIncrement)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate bid amount
      if (bidAmount <= currentPrice) {
        throw new Error(`Bid must be higher than R${currentPrice}`)
      }

      if (bidAmount < currentPrice + minBidIncrement) {
        throw new Error(`Minimum bid increment is R${minBidIncrement}`)
      }

      // Simulate bid submission
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Bid Placed Successfully",
        description: `Your bid of R${bidAmount} has been placed.`,
      })

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to place bid",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            Enter your bid amount for {listingTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Price</Label>
              <div className="text-2xl font-bold">R {currentPrice}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bidAmount">Your Bid (R)</Label>
              <Input
                id="bidAmount"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                min={currentPrice + minBidIncrement}
                step={minBidIncrement}
                required
              />
              <p className="text-sm text-muted-foreground">
                Minimum bid: R{currentPrice + minBidIncrement}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Placing Bid..." : "Place Bid"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}