"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// TODO: Replace with real image paths when provided
const placeholderImages: string[] = [
  "/images/Ekondo Products/Blue-Chidi.webp",
  "/images/Ekondo Products/Yellow-Edak-1-scaled.webp",
  "/images/Ekondo Products/Aglaonema__Blue_Mide-scaled.webp",
  "/images/Ekondo Products/Size_B_Baby_Rubber_in_a_Purple_Chidi-scaled.webp",
]

type RetailShowcaseCarouselProps = {
  images?: string[]
}

export default function RetailShowcaseCarousel({ images }: RetailShowcaseCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = useMemo(() => {
    const list = images && images.length > 0 ? images : placeholderImages
    const chunkSize = 4
    const chunks: string[][] = []
    for (let i = 0; i < list.length; i += chunkSize) {
      chunks.push(list.slice(i, i + chunkSize))
    }
    return chunks
  }, [images])

  const goNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  if (slides.length === 0) return null

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
                  <Card key={i} className="border-none shadow-md organic-shape p-4 flex items-center justify-center">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={src}
                        alt="Retail showcase"
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
          <span className="sr-only">Previous</span>
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
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}


