"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsletterSignup from "@/components/newsletter-signup"
import TestimonialCarousel from "@/components/testimonial-carousel"
import BlogPreview from "@/components/blog-preview"
import InstagramFeed from "@/components/instagram-feed"
import PartnersCarousel from "@/components/partners-carousel"
import { PlantDoctorChat } from "@/components/plant-doctor-chat"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { getFeaturedExperiences } from "@/lib/experiences-data"
import { experiences } from "@/lib/experiences-data"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Updated heroSlides with explicit links for the background image
  const heroSlides = [
    {
      image: "/images/homepage.webp",
      title: "Connect to Nature and Community",
      link: "/", // Landing page (not clickable, or link to home)
      showTitle: true,
    },
    {
      image: "/images/Gift_plant.webp",
      title: "",
      link: "/gifting", // Link for "Send a Gift"
      showTitle: false,
    },
    {
      image: "/images/soilmate.webp",
      title: "",
      link: "https://v0-remix-of-plant-matching-app.vercel.app/", // Link for "Find your Soilmate"
      showTitle: false,
    },
  ]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroSlides.length])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000) // Resume after 3 seconds
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // On-load hero text
      gsap.from(".js-hero-title", {
        y: 24,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      })

      // Section headers fade-up on scroll
      gsap.utils.toArray<HTMLElement>(".js-section-title").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        })
      })

      // Cards smooth rise + blur fade on scroll
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

      // Parallax subtle image motion
      gsap.utils.toArray<HTMLElement>(".js-parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", scrub: 0.3 },
        })
      })

      // Hover micro-interactions for buttons and cards
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

  // Helper component for internal/external linking
  const ClickableSlide = ({ link, children }: { link: string; children: React.ReactNode }) => {
    if (link.startsWith("http")) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 block cursor-pointer">
          {children}
        </a>
      )
    }
    if (link !== "/") { // Prevent linking to home from the home page (unless it's a specific requirement)
      return (
        <Link href={link} className="absolute inset-0 block cursor-pointer">
          {children}
        </Link>
      )
    }
    return <>{children}</> // If link is '/', just render the children without a link
  }

  return (
    <div className="flex flex-col">
 {/* Hero Section Carousel — MODIFIED BLOCK */}
<section
  className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[320px] w-full overflow-hidden"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  {/* subtle gradient overlay — pointer-events-none so it doesn't block clicks */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10 pointer-events-none" />

  {/* Slides */}
  <div className="relative w-full h-full">
    {heroSlides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
        }`}
        aria-hidden={index !== currentSlide}
      >
        <ClickableSlide link={slide.link}>
          <Image
            src={slide.image}
            alt={slide.title || `Hero slide ${index + 1}`}
            fill
            priority={index === 0}
            className="object-contain md:object-cover w-full h-full"
          />

          {/* Content overlay: centered title */}
          {slide.showTitle && (
            <div className="container relative z-30 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white drop-shadow-lg mb-6 js-hero-title">
                {slide.title}
              </h1>
            </div>
          )}
        </ClickableSlide>
      </div>
    ))}
  </div>

  {/* Navigation Arrows (smaller on mobile) */}
  <button
    onClick={prevSlide}
    className="absolute left-3 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-2.5 md:p-3 rounded-full transition-all backdrop-blur-sm"
    aria-label="Previous slide"
  >
    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-3 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-2.5 md:p-3 rounded-full transition-all backdrop-blur-sm"
    aria-label="Next slide"
  >
    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
  </button>

  {/* Dots Indicator (smaller on mobile) */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
    {heroSlides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`rounded-full transition-all ${
          index === currentSlide ? "h-2 w-8 bg-white" : "h-2 w-2 bg-white/50 hover:bg-white/75"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</section>
{/* End MODIFIED replacement */}



      {/* Four Branches Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 js-section-title">Discover Our Four Branches</h2>

          <Tabs defaultValue="retail" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto mb-8 bg-primary/5">
              <TabsTrigger value="retail" className="py-3 data-[state=active]:bg-primary/20 btn-gradient-clean js-hover m-4">
                Shop
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="py-3 data-[state=active]:bg-primary/20 btn-gradient-clean js-hover m-4"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="py-3 data-[state=active]:bg-primary/20 btn-gradient-clean js-hover m-4" m-4
              >
                Services
              </TabsTrigger>
              <TabsTrigger value="spaces" className="py-3 data-[state=active]:bg-primary/20 btn-gradient-clean js-hover m-4">
                Spaces
              </TabsTrigger>
            </TabsList>

            <TabsContent value="retail" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="./images/Ekondo-pot.JPG"
                    alt="Young African woman with beautiful plants"
                    width={800}
                    height={600}
                    className="object-cover aspect-[4/3] image-clean js-parallax"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 js-section-title">Handcrafted Products</h3>
                  <p className="mb-6 text-muted-foreground">
                    Discover our collection of handcrafted pots, plants, lighting, tools, and accessories. Each piece is
                    thoughtfully designed to bring nature into your space while supporting sustainable practices.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Ethically sourced materials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Plant and pot pairing suggestions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Monthly subscription options</span>
                    </li>
                  </ul>
                  <Button asChild className="btn-gradient-clean js-hover">
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
                    src="./images/two_girls.webp"
                    alt="Young African people participating in plant workshop"
                    width={800}
                    height={600}
                    className="object-cover aspect-[4/3] image-clean js-parallax"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 js-section-title">Immersive Experiences</h3>
                  <p className="mb-6 text-muted-foreground">
                    Join our plant games, workshops, creative events, and collaborations. Our experiences are designed
                    to connect you with nature and community through hands-on learning and creative expression.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Workshops and creative events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Plant care and styling classes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Community gatherings</span>
                    </li>
                  </ul>
                  <Button asChild className="btn-gradient-clean js-hover">
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
                    className="object-cover aspect-[4/3] image-clean js-parallax"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 js-section-title">Professional Services</h3>
                  <p className="mb-6 text-muted-foreground">
                    Our expert team offers plant maintenance, landscaping, installations, and home styling services. We
                    bring our knowledge and passion to transform your spaces with the beauty and benefits of nature.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Plant maintenance and care</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Landscape design and installation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Biophilic space styling</span>
                    </li>
                  </ul>
                  <Button asChild className="btn-gradient-clean js-hover">
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
                    className="object-cover aspect-[4/3] image-clean js-parallax"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 js-section-title">Community Spaces</h3>
                  <p className="mb-6 text-muted-foreground">
                    Visit our physical locations including Ekondo Park, pop-up shops, and wellness sanctuaries. Our
                    spaces are designed to foster community, creativity, and connection with nature.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Ekondo Park - our flagship location</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Pop-up shops and installations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Rentable community spaces</span>
                    </li>
                  </ul>
                  <Button asChild className="btn-gradient-clean js-hover">
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
            <h2 className="text-3xl md:text-4xl font-bold js-section-title">Featured Products</h2>
            <Link href="/retail" className="text-primary hover:underline mt-4 md:mt-0 js-hover">
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
              <Card key={item.id} className="overflow-hidden border-none shadow-md card-organic js-card js-hover">
                <div className="relative aspect-square">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">₦{item.price.toLocaleString()}</span>
              <AddToCartButton 
                product={item} 
                size="sm" 
                variant="outline" 
                className="bg-transparent" 
              />
            </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Experiences Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold js-section-title">Upcoming Experiences</h2>
            <Link href="/experience" className="text-primary hover:underline mt-4 md:mt-0 js-hover">
              View all experiences <ArrowRight className="inline-block ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {getFeaturedExperiences().slice(0, 3).map((item) => (
              <Card key={item.id} className="overflow-hidden border-none shadow-md card-organic js-card js-hover">
                <div className="relative h-96">
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
                  <Button size="sm" className="w-full btn-gradient-clean js-hover">
                    <Link href={`/experience/${item.id}`}>Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Nature Host Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/images/two_girls.webp"
                alt="Nature Hosts at Ekondo event"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 js-section-title">Become a Nature Host</h2>
              <p className="text-muted-foreground mb-6">
                Be the warm, welcoming face of Ekondo at events and pop-ups. Create meaningful experiences that introduce people to our world of plants, wellness, and community. Earn rewards while helping others connect with nature.
              </p>
              <Button asChild size="lg" className="btn-gradient-clean js-hover">
                <Link href="/nature-host">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 js-section-title">What Our Community Says</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
        <div className="flex md:flex-row items-center md:items-center justify-between mb-12">
          <h2 className="text-2xl md:text-4xl font-bold js-section-title">From Our Journal</h2>
          <Link
            href="/journal"
            className="
              btn-gradient-clean rounded-lg px-6 py-3 font-semibold text-white text-lg
              inline-block js-hover
              w-auto max-w-[160px] mx-auto md:mx-0
            "
          >
            Read More
          </Link>
        </div>
          <BlogPreview />
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 js-section-title">Follow Our Journey</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join our community on Instagram and share your Ekondo experiences with us.
          </p>
          <InstagramFeed />
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild className="btn-gradient-clean js-hover">
              <a href="https://www.instagram.com/ekondolife/" target="_blank" rel="noopener noreferrer">
                Follow @ekondolife
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 js-section-title">Meet Our Partners</h2>
          <PartnersCarousel />
        </div>
      </section>

      {/* Plant Doctor Chat */}
      <PlantDoctorChat />

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-primary/5 ">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 js-section-title">Stay Connected</h2>
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