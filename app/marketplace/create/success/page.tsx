import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="container max-w-md py-20">
      <Card className="p-6 text-center">
        <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6">
          Your listing has been created and will be visible to buyers shortly.
        </p>
        <Button asChild className="w-full">
          <Link href="/marketplace">View Marketplace</Link>
        </Button>
      </Card>
    </div>
  )
}