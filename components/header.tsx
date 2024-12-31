"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/marketplace" className="text-foreground/60 hover:text-foreground">
            Marketplace
          </Link>
          <Link href="/materials" className="text-foreground/60 hover:text-foreground">
            Materials
          </Link>
          <Link href="/recyclers" className="text-foreground/60 hover:text-foreground">
            Recyclers
          </Link>
          <Link href="/prices" className="text-foreground/60 hover:text-foreground">
            Live Prices
          </Link>
          <Link href="/how-it-works" className="text-foreground/60 hover:text-foreground">
            How It Works
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}