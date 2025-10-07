import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExperiencePage() {
  // Sample experience data
  const experiences = [
    {
      id: 1,
      title: "Plant Styling Masterclass",
      description: "Learn the art of plant styling and create stunning arrangements for your home.",
      date: "June 15, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Ekondo Park",
      price: 45,
      capacity: 12,
      spotsLeft: 3,
      type: "Workshop",
      image: "/placeholder.svg?height=400&width=600&text=Plant+Styling",
      featured: true,
    },
    {
      id: 2,
      title: "Terrarium Building Workshop",
      description: "Create your own miniature ecosystem in a glass container.",
      date: "June 20, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Ekondo Studio",
      price: 35,
      capacity: 8,
      spotsLeft: 5,
      type: "Workshop",
      image: "/placeholder.svg?height=400&width=600&text=Terrarium",
      featured: false,
    },
    {
      id: 3,
      title: "Urban Gardening Basics",
      description: "Start your urban garden with expert tips and hands-on practice.",
      date: "June 25, 2025",
      time: "9:00 AM - 11:00 AM",
      location: "Ekondo Park",
      price: 40,
      capacity: 15,
      spotsLeft: 8,
      type: "Class",
      image: "/placeholder.svg?height=400&width=600&text=Urban+Garden",
      featured: false,
    },
    {
      id: 4,
      title: "Mindful Plant Meditation",
      description: "Connect with nature through guided meditation in our plant sanctuary.",
      date: "June 30, 2025",
      time: "6:00 PM - 7:30 PM",
      location: "Ekondo Sanctuary",
      price: 25,
      capacity: 20,
      spotsLeft: 12,
      type: "Event",
      image: "/placeholder.svg?height=400&width=600&text=Meditation",
      featured: true,
    },
    {
      id: 5,
      title: "Sustainable Living Workshop",
      description: "Discover practical ways to live more sustainably with plants and eco-friendly practices.",
      date: "July 5, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Ekondo Park",
      price: 50,
      capacity: 10,
      spotsLeft: 2,
      type: "Workshop",
      image: "/placeholder.svg?height=400&width=600&text=Sustainable",
      featured: false,
    },
    {
      id: 6,
      title: "Plant Propagation Masterclass",
      description: "Learn advanced techniques for propagating your favorite plants.",
      date: "July 10, 2025",
      time: "11:00 AM - 1:00 PM",
      location: "Ekondo Studio",
      price: 38,
      capacity: 12,
      spotsLeft: 7,
      type: "Class",
      image: "/placeholder.svg?height=400&width=600&text=Propagation",
      featured: false,
    },
  ]

  const featuredExperiences = experiences.filter((exp) => exp.featured)
  const allExperiences = experiences

  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ekondo Experiences</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our community for hands-on workshops, creative events, and transformative experiences that deepen your
          connection with nature and sustainable living.
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
                  <div className="text-2xl font-bold">${experience.price}</div>
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
            <Select defaultValue="all">
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

            <Select defaultValue="date">
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
                  <div className="font-bold">${experience.price}</div>
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
