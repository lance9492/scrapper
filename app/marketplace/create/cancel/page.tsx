import { Card } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="container max-w-md py-20">
      <Card className="p-6 text-center">
        <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-muted-foreground mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="space-y-2">
          <Button asChild variant="outline" className="w-full">
            <Link href="/marketplace/create">Try Again</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/marketplace">Return to Marketplace</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}