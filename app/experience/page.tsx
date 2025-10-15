"use client"

import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExperiencePage() {
  // Real Ekondo experiences data (₦15,000 default price)
  const experiences = [
    {
      id: 1,
      title: "Paint & Plant Pottery Experience",
      description:
        "Step away from the daily hustle and reconnect through creativity. Paint and Plant offers a calming, hands-on experience where you’ll decorate your own pot and plant something meaningful inside.",
      date: "On-Demand",
      time: "",
      location: "Ekondo Park",
      price: 15000,
      capacity: 20,
      spotsLeft: 12,
      type: "Workshop",
      image: "/images/pot design.jpeg",
      featured: true,
    },
    {
      id: 2,
      title: "Play 4 Wellness",
      description:
        "Wellness starts with play, and Play 4 Wellness is your invitation to move, laugh, and connect, no matter your age. These sessions are a refreshing break from routine, filled with active games, mindful group activities, and moments of shared joy.",
      date: "On-Demand",
      time: "",
      location: "Ekondo Park",
      price: 15000,
      capacity: 30,
      spotsLeft: 18,
      type: "Event",
      image: "/images/table tennis game.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "Fridays at Ekondo",
      description:
        "Every Friday, Ekondo Park transforms into a space of music, games, creativity, and community. Unwind, meet new people, and try something joyful.",
      date: "Every Friday",
      time: "",
      location: "Ekondo Park",
      price: 15000,
      capacity: 100,
      spotsLeft: 50,
      type: "Event",
      image: "/images/ekondo event.jpg",
      featured: true,
    },
    {
      id: 4,
      title: "Creative Upcycling",
      description:
        "Rediscover the magic in everyday materials. Blend art and sustainability to reimagine waste into beautiful, practical creations.",
      date: "On-Demand",
      time: "",
      location: "Ekondo Park",
      price: 15000,
      capacity: 16,
      spotsLeft: 10,
      type: "Workshop",
      image: "/images/two women.JPG",
      featured: false,
    },
  ]

  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [dateSort, setDateSort] = useState<string>("date")

  const featuredExperiences = experiences.filter((exp) => exp.featured)

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
  }, [experiences, typeFilter, dateSort])

  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ekondo Experiences</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Looking to connect with your friends, family, colleagues, or community?
          Join our nature-inspired experiences, designed to spark joy and meaningful connection.
        </p>
      </div>

      {/* Featured Experiences */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl font-bold mb-8">Featured Experiences</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredExperiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden border-none shadow-lg">
              <div className="relative h-64">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-background/90">
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
                    <Link href={`/experience/${experience.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Experiences */}
      <section>
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
          <h2 className="font-serif text-2xl font-bold">All Experiences</h2>

          <div className="flex items-center gap-4 w-full md:w-auto">
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
            <Card key={experience.id} className="overflow-hidden border-none shadow-md">
              <div className="relative h-48">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-background/90">
                    {experience.type}
                  </Badge>
                </div>
                {experience.spotsLeft <= 3 && (
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="destructive">Only {experience.spotsLeft} spots left!</Badge>
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
                    <Link href={`/experience/${experience.id}`}>Book Now</Link>
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
