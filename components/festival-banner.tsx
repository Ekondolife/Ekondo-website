"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { X, Sparkles, Calendar, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FestivalBanner() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  // Don't show banner on login page
  if (pathname === "/login") {
    return null
  }

  const handleDismiss = () => {
    // hide only for the current render/session — do NOT persist
    setIsVisible(false)
  }

  // only respect current visibility state; banner will reappear on reload / new page
  if (!isVisible) return null

  return (
    <div className="relative w-full bg-gradient-to-r from-primary via-green-500 to-orange-500 overflow-hidden z-50">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-slide-pattern"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 flex items-center justify-between px-4 py-2.5 md:py-3">
        {/* Left side - Animated text */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-white animate-pulse" />
            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          
          {/* Scrolling text */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex items-center gap-8 animate-scroll-banner whitespace-nowrap">
              <span className="text-white font-bold text-sm md:text-base">
                🎉 SOUTHSIDE FESTIVAL IS COMING! 🎉
              </span>
              <span className="text-white/90 text-xs md:text-sm">
                Join us for an unforgettable experience
              </span>
              <span className="text-white font-bold text-sm md:text-base">
                🎉 SOUTHSIDE FESTIVAL IS COMING! 🎉
              </span>
              <span className="text-white/90 text-xs md:text-sm">
                Join us for an unforgettable experience
              </span>
              <span className="text-white font-bold text-sm md:text-base">
                🎉 SOUTHSIDE FESTIVAL IS COMING! 🎉
              </span>
              <span className="text-white/90 text-xs md:text-sm">
                Join us for an unforgettable experience
              </span>
            </div>
          </div>
        </div>

        {/* Right side - CTA and Close */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <Button
            asChild
            size="sm"
            className="bg-white text-primary hover:bg-white/90 font-bold text-xs md:text-sm px-3 md:px-5 h-7 md:h-8 rounded-md shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/experience/5" className="flex items-center gap-1.5">
              <Ticket className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Get Early Bird Tickets</span>
              <span className="sm:hidden">Tickets</span>
            </Link>
          </Button>
          <button
            onClick={handleDismiss}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  )
}

