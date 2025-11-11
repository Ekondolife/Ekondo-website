"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PlantDoctorChat() {
  const handleWhatsAppClick = () => {
    const message = "Hi Ekondo! I need help with my plants 🌿"
    const whatsappUrl = `https://wa.me/2348176267792?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      // remove hover bg, remove default shadow/border, make button slightly larger and use group for child hover
      className="fixed bottom-6 right-6 h-20 w-20 rounded-full z-50 p-0 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent border-0 shadow-none group"
      aria-label="Chat with Ekondo on WhatsApp"
    >
      <div className="flex items-center justify-center h-full w-full">
        <Image
          src="/images/whatsapp.png"
          alt="WhatsApp"
          width={44}
          height={44}
          // image expands on hover via group-hover, no background on button
          className="rounded-full transform transition-transform duration-200 ease-out group-hover:scale-110"
        />
      </div>
      <span className="sr-only">Chat with Ekondo on WhatsApp</span>
    </Button>
  )
}
