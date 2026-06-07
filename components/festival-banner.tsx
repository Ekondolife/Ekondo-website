"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FestivalBanner() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  // Don't show banner on login page
  if (pathname === "/login") {
    return null
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="relative z-50 w-full bg-gradient-to-r from-primary via-green-500 to-orange-500 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-slide-pattern" />
      </div>
      <div className="container flex items-center justify-between gap-3 px-4 py-2.5 md:py-3">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center gap-10 whitespace-nowrap animate-scroll-banner text-xs sm:text-sm md:text-base font-medium">
            <span>Ekondo Kids Summer Program — Aug 3–28 · Register now 🌱</span>
            <span>Plants, paint, pottery &amp; play for ages 5–15 at Whispers Art Haus, Maitama</span>
            <span>Ekondo Kids Summer Program — Aug 3–28 · Register now 🌱</span>
            <span>Plants, paint, pottery &amp; play for ages 5–15 at Whispers Art Haus, Maitama</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button asChild size="sm" className="bg-white text-primary hover:bg-white/90 font-semibold h-8 px-3">
            <Link href="/summer-program">Register</Link>
          </Button>
          <button onClick={handleDismiss} className="rounded-full p-1 hover:bg-white/15 transition-colors" aria-label="Dismiss banner">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}