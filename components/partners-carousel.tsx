"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const partnerLogos: string[] = [
  "/images/EKONDO Partners/Afex.png",
  "/images/EKONDO Partners/Artboard Copy 53.png",
  "/images/EKONDO Partners/Artboard Copy 54.png",
  "/images/EKONDO Partners/Artboard Copy 55.png",
  "/images/EKONDO Partners/Artboard Copy 65.png",
  "/images/EKONDO Partners/CW.png",
  "/images/EKONDO Partners/Eden.png",
  "/images/EKONDO Partners/French Embassy.png",
  "/images/EKONDO Partners/Giz.png",
  "/images/EKONDO Partners/Institute Francaus.png",
  "/images/EKONDO Partners/Kokari.png",
  "/images/EKONDO Partners/Mint.png",
  "/images/EKONDO Partners/Nigeria Health Watch.png",
  "/images/EKONDO Partners/Sahel.png",
  "/images/EKONDO Partners/Urban Shelter.png",
  "/images/EKONDO Partners/Ventures Park.png",
  "/images/EKONDO Partners/Weir Capacity.png",
]

export default function PartnersCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = useMemo(() => {
    const chunkSize = 4
    const chunks: string[][] = []
    for (let i = 0; i < partnerLogos.length; i += chunkSize) {
      chunks.push(partnerLogos.slice(i, i + chunkSize))
    }
    return chunks
  }, [])

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((group, idx) => (
            <div key={idx} className="flex-shrink-0 w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {group.map((src, i) => (
                  <Card key={i} className=" overflow-hidden border-none shadow-md organic-shape p-6 flex items-center justify-center bg-white">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={src}
                        alt="Partner logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        priority={idx === 0}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <Button variant="outline" size="icon" onClick={goPrev} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous partners</span>
        </Button>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full ${currentSlide === i ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={goNext} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next partners</span>
        </Button>
      </div>
    </div>
  )
}


