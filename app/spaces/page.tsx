import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Users, Calendar, Phone } from "lucide-react"

export default function SpacesPage() {
  const spaces = [
    {
      id: 1,
      name: "Ekondo Park Lagos",
      description:
        "Our flagship location in the heart of Lagos. A 5,000 sq ft green oasis featuring a retail shop, workshop space, and community garden.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center",
      location: "Victoria Island, Lagos, Nigeria",
      hours: "Mon-Sat: 9AM-7PM, Sun: 10AM-5PM",
      capacity: "Up to 50 people",
      amenities: ["Retail Shop", "Workshop Space", "Community Garden", "Cafe", "Parking"],
      featured: true,
    },
    {
      id: 2,
      name: "Ekondo Studio Accra",
      description:
        "An intimate creative space for workshops and private events, surrounded by tropical plants and natural light.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop&crop=center",
      location: "East Legon, Accra, Ghana",
      hours: "Tue-Sat: 10AM-6PM",
      capacity: "Up to 25 people",
      amenities: ["Workshop Tables", "Natural Light", "Plant Library", "Refreshments", "WiFi"],
      featured: false,
    },
    {
      id: 3,
      name: "Ekondo Sanctuary Nairobi",
      description:
        "A tranquil wellness space offering meditation gardens, plant therapy sessions, and holistic experiences.",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop&crop=center",
      location: "Karen, Nairobi, Kenya",
      hours: "Mon-Sun: 8AM-8PM",
      capacity: "Up to 30 people",
      amenities: ["Meditation Garden", "Yoga Space", "Private Rooms", "Organic Cafe", "Parking"],
      featured: false,
    },
  ]

  const upcomingEvents = [
    {
      title: "Sunday Plant Market",
      location: "Ekondo Park Lagos",
      date: "Every Sunday",
      time: "10:00 AM - 4:00 PM",
      image: "https://images.unsplash.com/photo-1616627188467-fac8d174d157?w=400&h=300&fit=crop&crop=center",
    },
    {
      title: "Wellness Wednesday",
      location: "Ekondo Sanctuary Nairobi",
      date: "Every Wednesday",
      time: "6:00 PM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop&crop=center",
    },
    {
      title: "Creative Workshop Series",
      location: "Ekondo Studio Accra",
      date: "Bi-weekly Saturdays",
      time: "2:00 PM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=center",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden leaf-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&crop=center"
          alt="Ekondo spaces community area"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">Our Spaces</h1>
          <p className="text-lg md:text-xl max-w-2xl text-foreground/80">
            Community hubs where nature, creativity, and wellness come together
          </p>
        </div>
      </section>

      {/* Spaces Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
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
                    className="rounded-lg object-cover aspect-[4/3] organic-shape"
                  />
                </div>
                <div className={index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                  {space.featured && (
                    <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded organic-shape mb-4">
                      Flagship Location
                    </div>
                  )}
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{space.name}</h2>
                  <p className="text-muted-foreground mb-6">{space.description}</p>

                  <div className="space-y-3 mb-6">
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

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {space.amenities.map((amenity, i) => (
                        <div key={i} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded organic-shape">
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="organic-shape">
                      <Link href={`/spaces/${space.id}`}>Book This Space</Link>
                    </Button>
                    <Button variant="outline" asChild className="organic-shape bg-transparent">
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

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Recurring Events at Our Spaces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-none shadow-md organic-shape overflow-hidden">
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full organic-shape bg-transparent" asChild>
                    <Link href="/experience">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Space Rental */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">Rent Our Spaces</h2>
            <p className="text-center text-muted-foreground mb-12">
              Perfect for events, workshops, photoshoots, and private gatherings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-md organic-shape">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-4">Hourly Rental</h3>
                  <div className="text-3xl font-bold text-primary mb-4">From $50/hour</div>
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
                  <Button variant="outline" className="w-full organic-shape bg-transparent" asChild>
                    <Link href="/contact">Inquire</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md organic-shape ring-2 ring-primary">
                <CardContent className="p-6">
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium rounded organic-shape mb-4">
                    Most Popular
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-4">Full Day Rental</h3>
                  <div className="text-3xl font-bold text-primary mb-4">From $300/day</div>
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
                  <Button className="w-full organic-shape" asChild>
                    <Link href="/contact">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Board */}
      <section className="py-16 md:py-24 bg-primary/5 leaf-pattern">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-8">
              Share your experiences, connect with fellow plant lovers, and stay updated on events happening at our
              spaces
            </p>
            <Button size="lg" asChild className="organic-shape">
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
