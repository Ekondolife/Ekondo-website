import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsletterSignup from "@/components/newsletter-signup"
import TestimonialCarousel from "@/components/testimonial-carousel"
import BlogPreview from "@/components/blog-preview"
import InstagramFeed from "@/components/instagram-feed"
import { PlantDoctorChat } from "@/components/plant-doctor-chat"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden leaf-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <Image
          src="./images/Ekondo-14.JPG"
          alt="Young African woman tending to plants in urban setting"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6">
            Connect to Nature <br className="hidden md:block" />
            and Community
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-foreground/80">
            Ekondo brings sustainability and wellness through our retail products, immersive experiences, professional
            services, and community spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="btn-gradient organic-shape">
              <Link href="/retail">Explore Our Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="btn-gradient bg-transparent organic-shape">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Four Branches Section */}
      <section className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Discover Our Four Branches</h2>

          <Tabs defaultValue="retail" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto mb-8 bg-primary/5">
              <TabsTrigger value="retail" className="py-3 data-[state=active]:bg-primary/20 btn-gradient organic-shape">
                Retail
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="py-3 data-[state=active]:bg-primary/20 btn-gradient organic-shape"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="py-3 data-[state=active]:bg-primary/20 btn-gradient organic-shape"
              >
                Services
              </TabsTrigger>
              <TabsTrigger value="spaces" className="py-3 data-[state=active]:bg-primary/20 btn-gradient organic-shape">
                Spaces
              </TabsTrigger>
            </TabsList>

            <TabsContent value="retail" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="./images/girl2.jpeg"
                    alt="Young African woman with beautiful plants"
                    width={800}
                    height={600}
                    className="object-cover aspect-[4/3] image-clean"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Handcrafted Products</h3>
                  <p className="mb-6 text-muted-foreground">
                    Discover our collection of handcrafted pots, plants, lighting, tools, and accessories. Each piece is
                    thoughtfully designed to bring nature into your space while supporting sustainable practices.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-float"></div>
                      <span>Ethically sourced materials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-float"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <span>Plant and pot pairing suggestions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-float"
                        style={{ animationDelay: "2s" }}
                      ></div>
                      <span>Monthly subscription options</span>
                    </li>
                  </ul>
                  <Button asChild className="btn-gradient organic-shape">
                    <Link href="/retail">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="./images/two girls.jpg"
                    alt="Young African people participating in plant workshop"
                    width={800}
                    height={600}
                    className="object-cover aspect-[4/3] image-clean"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Immersive Experiences</h3>
                  <p className="mb-6 text-muted-foreground">
                    Join our plant games, workshops, creative events, and collaborations. Our experiences are designed
                    to connect you with nature and community through hands-on learning and creative expression.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-float"></div>
                      <span>Workshops and creative events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-float"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <span>Plant care and styling classes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-float"
                        style={{ animationDelay: "2s" }}
                      ></div>
                      <span>Community gatherings</span>
                    </li>
                  </ul>
                  <Button asChild className="btn-gradient organic-shape">
                    <Link href="/experience">
                      Explore Experiences <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="./images/guy working.jpg"
                    alt="Professional working on plants maintenance"
                    width={800}
                    height={600}
                    className="object-cover aspect-[4/3] image-clean"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Professional Services</h3>
                  <p className="mb-6 text-muted-foreground">
                    Our expert team offers plant maintenance, landscaping, installations, and home styling services. We
                    bring our knowledge and passion to transform your spaces with the beauty and benefits of nature.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-float"></div>
                      <span>Plant maintenance and care</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-float"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <span>Landscape design and installation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-float"
                        style={{ animationDelay: "2s" }}
                      ></div>
                      <span>Biophilic space styling</span>
                    </li>
                  </ul>
                  <Button asChild className="btn-gradient organic-shape">
                    <Link href="/services">
                      Book a Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="spaces" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="./images/ekondo event.jpg"
                    alt="Ekondo Park Event"
                    width={800}
                    height={600}
                    className="object-cover aspect-[4/3] image-clean"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Community Spaces</h3>
                  <p className="mb-6 text-muted-foreground">
                    Visit our physical locations including Ekondo Park, pop-up shops, and wellness sanctuaries. Our
                    spaces are designed to foster community, creativity, and connection with nature.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-float"></div>
                      <span>Ekondo Park - our flagship location</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-float"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <span>Pop-up shops and installations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-float"
                        style={{ animationDelay: "2s" }}
                      ></div>
                      <span>Rentable community spaces</span>
                    </li>
                  </ul>
                  <Button asChild className="btn-gradient organic-shape">
                    <Link href="/spaces">
                      Discover Our Spaces <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Featured Products</h2>
            <Link href="/retail" className="text-primary hover:underline mt-4 md:mt-0">
              View all products <ArrowRight className="inline-block ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                image: "/images/Ekondo Products/Size_B_Baby_Rubber_in_a_Purple_Chidi-scaled.webp",
                name: "Baby Rubber Plant",
                description: "Size B in Purple Chidi pot",
                price: 25000,
              },
              {
                id: 2,
                image: "/images/Ekondo Products/Aglaonema__Blue_Mide-scaled.webp",
                name: "Aglaonema Plant",
                description: "Beautiful foliage in Blue Mide pot",
                price: 25000,
              },
              {
                id: 3,
                image: "/images/Ekondo Products/Blue-Chidi.webp",
                name: "Blue Chidi Pot",
                description: "Handcrafted ceramic planter",
                price: 15000,
              },
              {
                id: 4,
                image: "/images/Ekondo Products/Yellow-Edak-1-scaled.webp",
                name: "Yellow Edak Pot",
                description: "Traditional African design",
                price: 9000,
              },
            ].map((item) => (
              <Card key={item.id} className="overflow-hidden border-none shadow-md card-organic">
                <div className="relative aspect-square">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">₦{item.price.toLocaleString()}</span>
                    <Button size="sm" variant="outline" className="btn-gradient bg-transparent organic-shape">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Experiences Section */}
      <section className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Upcoming Experiences</h2>
            <Link href="/experience" className="text-primary hover:underline mt-4 md:mt-0">
              View all experiences <ArrowRight className="inline-block ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                image: "/images/pot design.jpeg",
                title: "Paint & Plant Pottery Experience",
                type: "Workshop",
                date: "On-Demand",
                description:
                  "Step away from the daily hustle and reconnect through creativity. Decorate your own pot and plant something meaningful inside.",
              },
              {
                id: 2,
                image: "/images/table tennis game.jpg",
                title: "Play 4 Wellness",
                type: "Event",
                date: "On-Demand",
                description:
                  "Wellness starts with play—active games, mindful group activities, and moments of shared joy for all ages.",
              },
              {
                id: 3,
                image: "/images/ekondo event.jpg",
                title: "Fridays at Ekondo",
                type: "Event",
                date: "Every Friday",
                description:
                  "Music, games, creativity, and community—unwind, meet new people, and try something joyful at Ekondo Park.",
              },
              {
                id: 4,
                image: "/images/two women.JPG",
                title: "Creative Upcycling",
                type: "Workshop",
                date: "On-Demand",
                description:
                  "Blend art and sustainability—reimagine waste into beautiful, practical creations that inspire greener living.",
              },
            ].slice(0, 3).map((item) => (
              <Card key={item.id} className="overflow-hidden border-none shadow-md card-organic">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded btn-gradient organic-shape-soft">
                      {item.type}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                  </div>
                  <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  <Button size="sm" className="w-full btn-gradient organic-shape">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">What Our Community Says</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">From Our Journal</h2>
            <Link href="/journal" className="text-primary hover:underline mt-4 md:mt-0">
              View all articles <ArrowRight className="inline-block ml-1 h-4 w-4" />
            </Link>
          </div>
          <BlogPreview />
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">Follow Our Journey</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join our community on Instagram and share your Ekondo experiences with us.
          </p>
          <InstagramFeed />
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild className="btn-gradient bg-transparent organic-shape">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Follow @ekondo
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Plant Doctor Chat */}
      <PlantDoctorChat />

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-primary/5 leaf-pattern">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for exclusive offers, events, and sustainability tips.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  )
}
