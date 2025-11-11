"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Users, Calendar, Phone } from "lucide-react"
import { getRecurringEvents } from "@/lib/experiences-data"
import { spaces } from "@/lib/spaces-data"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SpacesPage() {

  // Dynamic recurring events pulled from shared experiences data
  const upcomingEvents = getRecurringEvents().slice(0, 3) // Show max 3 events

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from([".js-hero-title", ".js-hero-sub"], {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      })
      gsap.fromTo(
        ".js-hero-image",
        { scale: 1.08 },
        { scale: 1, duration: 1.4, ease: "power3.out" }
      )

      // Section titles
      gsap.utils.toArray<HTMLElement>(".js-section-title").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        })
      })

      // Space/event cards
      gsap.utils.toArray<HTMLElement>(".js-card").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0, filter: "blur(6px)" },
          {
            scrollTrigger: { trigger: el, start: "top 90%" },
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          }
        )
      })

      // Hover micro-lift
      const lift = (selector: string) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.addEventListener("mouseenter", () => {
            gsap.to(el, { y: -2, scale: 1.02, duration: 0.25, ease: "power2.out" })
          })
          el.addEventListener("mouseleave", () => {
            gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" })
          })
        })
      }
      lift(".js-hover, .js-card")
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <Image
          src="/images/ekondo event.jpg"
          alt="Ekondo spaces community area"
          fill
          className="object-cover js-hero-image"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6 js-hero-title">Our Spaces</h1>
          <p className="text-lg md:text-xl max-w-2xl  text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] js-hero-sub">
            Community hubs where nature, creativity, and wellness come together
          </p>
        </div>
      </section>

      {/* Spaces Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 js-section-title">Explore Our Spaces</h2>
          <div className="space-y-16">
            {spaces.map((space, index) => (
              <div
                key={space.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <Image
                    src={space.image || "/placeholder.svg"}
                    alt={space.name}
                    width={800}
                    height={600}
                    className="rounded-lg object-cover aspect-[4/3] js-card"
                  />
                </div>
                <div className={index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                  {space.featured && (
                    <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded organic-shape mb-4 js-card">
                      Retail outlet
                    </div>
                  )}
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 js-section-title">{space.name}</h2>
                  <p className="text-muted-foreground mb-6 js-card">{space.description}</p>

                  <div className="space-y-3 mb-6 js-card">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{space.location}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{space.hours}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{space.capacity}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="js-hover">
                      <Link href={`/spaces/${space.id}`}>Book This Space</Link>
                    </Button>
                    <Button variant="outline" asChild className="bg-transparent js-hover">
                      <Link href="/contact">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  

      {/* Space Rental */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 js-section-title">Rent Our Spaces</h2>
            <p className="text-center text-muted-foreground mb-12">
              Perfect for events, workshops, photoshoots, and private gatherings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-md js-card">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-4">Hourly Rental</h3>
                  <div className="text-3xl font-bold text-primary mb-4">From ₦15,000/hour</div>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                      <span>Perfect for workshops and small events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                      <span>Basic amenities included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                      <span>Flexible booking times</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full bg-transparent js-hover" asChild>
                    <Link href="/contact">Inquire</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md ring-2 ring-primary js-card js-hover">
                <CardContent className="p-6">
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium rounded mb-4">
                    Most Popular
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-4">Full Day Rental</h3>
                  <div className="text-3xl font-bold text-primary mb-4">From ₦90,000/day</div>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                      <span>8 hours of access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                      <span>All amenities included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                      <span>Setup and cleanup assistance</span>
                    </li>
                  </ul>
                  <Button className="w-full js-hover" asChild>
                    <Link href="/contact">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Board */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 js-section-title">Join Our Community</h2>
            <p className="text-muted-foreground mb-8">
              Share your experiences, connect with fellow plant lovers, and stay updated on events happening at our
              spaces
            </p>
            <Button size="lg" asChild className="js-hover">
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
