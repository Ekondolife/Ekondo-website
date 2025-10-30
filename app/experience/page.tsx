"use client"

import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { experiences, getFeaturedExperiences } from "@/lib/experiences-data"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ExperiencePage() {
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [dateSort, setDateSort] = useState<string>("date")

  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null)
  const featuredSectionRef = useRef<HTMLElement>(null)
  const allExperiencesSectionRef = useRef<HTMLElement>(null)

  const featuredExperiences = getFeaturedExperiences()

  const allExperiences = useMemo(() => {
    const filtered = experiences.filter((exp) => {
      if (typeFilter === "all") return true
      return exp.type.toLowerCase() === typeFilter
    })

    const getDatePriority = (dateStr: string): number => {
      if (!dateStr) return 999999
      const lower = dateStr.toLowerCase()
      if (lower.includes("every friday")) return 0
      if (lower.includes("on-demand")) return 2
      const parsed = Date.parse(dateStr)
      if (!Number.isNaN(parsed)) return parsed
      return 1
    }

    const sorted = [...filtered].sort((a, b) => {
      if (dateSort === "date") {
        return getDatePriority(a.date) - getDatePriority(b.date)
      }
      return 0
    })

    return sorted
  }, [typeFilter, dateSort])

  // Hero section animations - more dramatic entrance
  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
        
        tl.from(".hero-title", {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        })
        .from(".hero-description", {
          y: 50,
          opacity: 0,
          duration: 0.8,
        }, "-=0.5")

        // Pulse animation for hero text
        gsap.to(".hero-title", {
          scale: 1.02,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  // Featured experiences animations - dramatic reveal
  useEffect(() => {
    if (featuredSectionRef.current && featuredExperiences.length > 0) {
      const ctx = gsap.context(() => {
        // Section title animation
        gsap.from(".featured-title", {
          scrollTrigger: {
            trigger: ".featured-title",
            start: "top 85%",
          },
          x: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })

        // Featured cards with dramatic entrance
        gsap.from(".featured-card", {
          scrollTrigger: {
            trigger: featuredSectionRef.current,
            start: "top 70%",
          },
          scale: 0.8,
          opacity: 0,
          y: 100,
          rotation: -5,
          duration: 1,
          stagger: 0.3,
          ease: "back.out(1.5)",
        })

        // Continuous subtle animation for featured cards
        const featuredCards = gsap.utils.toArray<HTMLElement>(".featured-card")
        featuredCards.forEach((card, index) => {
          // Floating effect with different delays
          gsap.to(card, {
            y: -15,
            duration: 2.5 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          })

          // Enhanced hover effect
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              y: -20,
              rotation: 2,
              duration: 0.4,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotation: 0,
              duration: 0.4,
              ease: "power2.out",
            })
          })
        })
      }, featuredSectionRef)

      return () => ctx.revert()
    }
  }, [featuredExperiences])

  // All experiences animations - wave effect
  useEffect(() => {
    if (allExperiencesSectionRef.current) {
      const ctx = gsap.context(() => {
        // Section header animation
        gsap.from(".all-experiences-header", {
          scrollTrigger: {
            trigger: ".all-experiences-header",
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })

        // Filter controls slide in
        gsap.from(".filter-controls", {
          scrollTrigger: {
            trigger: ".filter-controls",
            start: "top 85%",
          },
          x: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })

        // Experience cards with wave stagger
        gsap.from(".experience-card", {
          scrollTrigger: {
            trigger: allExperiencesSectionRef.current,
            start: "top 75%",
            invalidateOnRefresh: true,
          },
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          stagger: {
            amount: 0.6,
            from: "start",
          },
          ease: "power3.out",
        })

        // Hover effects for all experience cards
        const cards = gsap.utils.toArray<HTMLElement>(".experience-card")
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -12,
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              duration: 0.3,
              ease: "power2.out",
            })

            // Animate the image inside
            const img = card.querySelector("img")
            if (img) {
              gsap.to(img, {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out",
              })
            }
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              duration: 0.3,
              ease: "power2.out",
            })

            const img = card.querySelector("img")
            if (img) {
              gsap.to(img, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
              })
            }
          })
        })

        // Animate badges on hover
        const badges = gsap.utils.toArray<HTMLElement>(".experience-card .badge-animate")
        badges.forEach((badge) => {
          badge.addEventListener("mouseenter", () => {
            gsap.to(badge, {
              scale: 1.15,
              rotation: 5,
              duration: 0.2,
              ease: "back.out(2)",
            })
          })

          badge.addEventListener("mouseleave", () => {
            gsap.to(badge, {
              scale: 1,
              rotation: 0,
              duration: 0.2,
              ease: "power2.out",
            })
          })
        })
      }, allExperiencesSectionRef)

      return () => ctx.revert()
    }
  }, [allExperiences, typeFilter, dateSort])

  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div ref={heroRef} className="text-center mb-12">
        <h1 className="hero-title font-serif text-3xl md:text-4xl font-bold mb-4">Ekondo Experiences</h1>
        <p className="hero-description text-muted-foreground max-w-2xl mx-auto">
          Looking to connect with your friends, family, colleagues, or community?
          Join our nature-inspired experiences, designed to spark joy and meaningful connection.
        </p>
      </div>

      {/* Featured Experiences */}
      <section ref={featuredSectionRef} className="mb-16">
        <h2 className="featured-title font-serif text-2xl font-bold mb-8">Featured Experiences</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredExperiences.map((experience) => (
            <Card key={experience.id} className="featured-card overflow-hidden border-none shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="badge-animate bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="badge-animate bg-background/90">
                    {experience.type}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2">{experience.title}</h3>
                <p className="text-muted-foreground mb-4">{experience.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{experience.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{experience.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{experience.spotsLeft} spots left</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">₦{experience.price.toLocaleString()}</div>
                  <Button asChild>
                    <Link 
                       href={`/experience/${experience.id}`}  
                       className="btn-gradient organic-shape px-6 py-3 font-semibold text-white text-lg inline-block mt-6"
                    >
                      Book Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Experiences */}
      <section ref={allExperiencesSectionRef}>
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
          <h2 className="all-experiences-header font-serif text-2xl font-bold">All Experiences</h2>

          <div className="filter-controls flex items-center gap-4 w-full md:w-auto">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="class">Classes</SelectItem>
                <SelectItem value="event">Events</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateSort} onValueChange={setDateSort}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="spots">Spots Available</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allExperiences.map((experience) => (
            <Card key={experience.id} className="experience-card overflow-hidden border-none shadow-md transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="badge-animate bg-background/90">
                    {experience.type}
                  </Badge>
                </div>
                {experience.spotsLeft <= 3 && (
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="destructive" className="badge-animate">
                      Only {experience.spotsLeft} spots left!
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">{experience.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{experience.description}</p>

                <div className="space-y-1 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-primary" />
                    <span>{experience.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-primary" />
                    <span>{experience.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span>{experience.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-bold">₦{experience.price.toLocaleString()}</div>
                  <Button size="sm" asChild>
                    <Link 
                      href={`/experience/${experience.id}`} 
                      className="btn-gradient organic-shape px-6 py-3 font-semibold text-white text-lg inline-block mt-6"
                    >
                      Book Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}