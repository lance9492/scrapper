import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  UserCheck, 
  ListChecks, 
  Gavel, 
  TruckIcon, 
  BadgeCheck,
  ShieldCheck,
  Banknote,
  Users
} from "lucide-react"

const benefits = {
  sellers: [
    {
      title: "Access to Verified Buyers",
      description: "Connect with a network of pre-verified buyers, ensuring secure and reliable transactions.",
      icon: UserCheck
    },
    {
      title: "Real-time Market Prices",
      description: "Stay informed with up-to-date scrap metal prices to maximize your profits.",
      icon: Banknote
    },
    {
      title: "Competitive Bidding",
      description: "Get the best price for your scrap through our competitive bidding system.",
      icon: Gavel
    },
    {
      title: "Secure Payments",
      description: "Receive payments securely through our trusted payment system.",
      icon: ShieldCheck
    }
  ],
  buyers: [
    {
      title: "Quality Assurance",
      description: "All listings are verified to ensure quality and accuracy of materials.",
      icon: BadgeCheck
    },
    {
      title: "Wide Selection",
      description: "Access a diverse range of scrap metal listings from across South Africa.",
      icon: ListChecks
    },
    {
      title: "Direct Communication",
      description: "Communicate directly with sellers through our secure messaging system.",
      icon: Users
    },
    {
      title: "Efficient Logistics",
      description: "Coordinate pickup and delivery through our network of trusted transporters.",
      icon: TruckIcon
    }
  ]
}

const steps = [
  {
    number: 1,
    title: "Create an Account",
    description: "Register as a buyer or seller. Verify your identity and business documents."
  },
  {
    number: 2,
    title: "List or Browse",
    description: "Sellers can list their scrap metal for R10 per listing. Buyers can browse and filter listings."
  },
  {
    number: 3,
    title: "Bid and Negotiate",
    description: "Place bids on listings or negotiate directly through our secure messaging system."
  },
  {
    number: 4,
    title: "Complete Transaction",
    description: "Finalize the deal, arrange logistics, and complete the secure payment process."
  }
]

export default function HowItWorksPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">How Scrapper.co.za Works</h1>
        <p className="text-xl text-muted-foreground">
          Your trusted platform for buying and selling scrap metal in South Africa
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {steps.map((step) => (
          <Card key={step.number} className="p-6 text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        {/* Sellers Benefits */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Benefits for Sellers</h2>
          <div className="grid gap-6">
            {benefits.sellers.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Buyers Benefits */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Benefits for Buyers</h2>
          <div className="grid gap-6">
            {benefits.buyers.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6">
          Join South Africa's fastest-growing scrap metal marketplace today.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/register">Create Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/marketplace">Browse Listings</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}