"use client"

import { Recycle } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
      <div className="relative">
        <Recycle className="h-8 w-8 text-primary" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-none">MetalXchange</span>
        <span className="text-xs text-muted-foreground">South Africa's Premier Marketplace</span>
      </div>
    </Link>
  )
}