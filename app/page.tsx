import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Banknote } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590502160462-58b41354f588?auto=format&fit=crop&q=80"
            alt="Scrap Metal Background"
            fill
            className="object-cover brightness-[0.2]"
            priority
          />
        </div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            South Africa's Premier Scrap Metal Marketplace
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with verified buyers and sellers. Get real-time scrap metal prices. 
            Trade with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100" asChild>
              <Link href="/auth/register">Start Trading <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/prices">View Live Prices</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Scrapper.co.za?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-lg bg-background shadow-sm transition-all hover:shadow-lg">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80"
                  alt="Security"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
              <div className="relative p-6 text-white">
                <Shield className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Verified Users</h3>
                <p className="text-gray-200">
                  All users undergo thorough verification including ID and company document checks.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg bg-background shadow-sm transition-all hover:shadow-lg">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80"
                  alt="Community"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
              <div className="relative p-6 text-white">
                <Users className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                <p className="text-gray-200">
                  Protected communication and transactions between buyers and sellers.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg bg-background shadow-sm transition-all hover:shadow-lg">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80"
                  alt="Pricing"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
              <div className="relative p-6 text-white">
                <Banknote className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Live Pricing</h3>
                <p className="text-gray-200">
                  Access real-time scrap metal prices to make informed trading decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80"
            alt="Scrap Metal Yard"
            fill
            className="object-cover brightness-[0.2]"
          />
        </div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join South Africa's fastest-growing scrap metal marketplace today.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100" asChild>
            <Link href="/auth/register">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}