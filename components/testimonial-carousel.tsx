"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Anonymous Customer",
    role: "",
    content:
      "Omo the mood changed in my house since those plants entered. Yes o, make e no cause pressure.",
    rating: 5,
    image: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Anonymous Customer",
    role: "",
    content:
      "I fell in love with experience ekondo because of the versatility of the brand. They constantly produce products that people truly want and need without compromising on quality. It truly is an experience with ekondo.",
    rating: 5,
    image: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Favour Ojo",
    role: "",
    content:
      "Adding Ekondo plants to my home genuinely elevated the entire aura and vibe. Caring for them gives me the same sense of responsibility and joy as having a pet. I deeply appreciate the satisfaction and wellness these plants bring to my space.",
    rating: 5,
    image: "/placeholder-user.jpg",
  },
]


export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex-shrink-0 w-full border-none shadow-md organic-shape">
              <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 relative">
                  <Image
                    src={testimonial.image || "/placeholder-user.jpg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-primary fill-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <blockquote className="mb-6 text-lg italic">"{testimonial.content}"</blockquote>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-2 h-2 p-0 rounded-full ${currentIndex === index ? "bg-primary" : "bg-muted"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to testimonial {index + 1}</span>
          </Button>
        ))}
        <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  )
}
