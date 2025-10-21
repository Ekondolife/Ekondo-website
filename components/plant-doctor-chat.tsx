"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PlantDoctorChat() {
  const handleWhatsAppClick = () => {
    const message = "Hi Ekondo! I need help with my plants 🌿"
    const whatsappUrl = `https://wa.me/2348176267792?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-green-500 hover:bg-green-600 z-50 hover:scale-110 transition-transform organic-shape p-0"
    >
      <Image
        src="/images/whatsapp.png"
        alt="WhatsApp"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="sr-only">Chat with Ekondo on WhatsApp</span>
    </Button>
  )
}
