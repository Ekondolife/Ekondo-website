"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Sprout } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Hero animations - only start after image loads
  useEffect(() => {
    if (!imageLoaded) return

    const ctx = gsap.context(() => {
      // Hero load - start all animations together
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      
      tl.from([".js-hero-title", ".js-hero-sub"], {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      })
      .fromTo(
        ".js-hero-image",
        { scale: 1.08 },
        { scale: 1, duration: 1.4 },
        "-=0.5"
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

      // Cards / paragraphs
      gsap.utils.toArray<HTMLElement>(".js-card, .js-paragraph").forEach((el) => {
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

      // Stats count-in (subtle fade-rise)
      gsap.utils.toArray<HTMLElement>(".js-stat").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%" },
          y: 18,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        })
      })

      // Hover lift
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
  }, [imageLoaded])

  const values = [
    {
      icon: Leaf,
      title: "Slow Down",
      description:
        "Take time to appreciate the natural rhythms around us and within us. Nature teaches us patience and presence.",
    },
    {
      icon: Heart,
      title: "Give Gratitude",
      description:
        "Acknowledge and appreciate the abundance nature provides. Gratitude deepens our connection to the earth.",
    },
    {
      icon: Sprout,
      title: "Take Responsibility",
      description: "Act as stewards of our environment. Our choices today shape the world for future generations.",
    },
  ]

  const team = [
    {
      name: "Ama Kofi",
      role: "Founder & CEO",
      image: "/images/girl.jpeg",
      bio: "Environmental scientist passionate about bringing nature into urban African spaces.",
    },
    {
      name: "Chidi Okonkwo",
      role: "Head of Experiences",
      image: "/images/man.jpeg",
      bio: "Community builder and workshop facilitator with 10 years of experience.",
    },
    {
      name: "Zainab Hassan",
      role: "Creative Director",
      image: "/images/girl2.jpeg",
      bio: "Designer bringing African aesthetics and sustainable design together.",
    },
    {
      name: "Kwesi Mensah",
      role: "Head of Services",
      image: "/images/man2.jpg",
      bio: "Landscape architect specializing in urban green spaces across Africa.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-muted">
        <div className="absolute inset-0 z-10"></div>
        <Image
          src="/images/IMG_4455.JPG"
          alt="Ekondo team working with plants"
          fill
          className="object-cover image-clean js-hero-image"
          priority
          onLoad={() => setImageLoaded(true)}
        />
        <div
          className={`container relative z-20 flex h-full flex-col items-center justify-center text-center px-4 transition-all duration-700 ${
            imageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-50 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] mb-6 js-hero-title">
            Our Story
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-gray-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] js-hero-sub">
            Rooted in African creativity and growing towards a sustainable future
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8 js-section-title">Who We Are</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-6 js-paragraph">
              In the Efik language (the 4th most popular language in Nigeria),
              Ekondo means community—the cornerstone of our identity. We are a
              lifestyle brand promoting environmental sustainability and wellness
              through nature and community.              
              Our vision is Nature for everyone. That’s why it’s our goal to make
              Africans happier, kinder, and more creative by connecting them to
              Nature, themselves, and other people. We are relentless about
              bringing Nature into every space, transforming waste into wellness
              products, and cultivating a passionate community around Nature.
              </p>
              <p className="mb-6 js-paragraph">
              Our core values as a team and community are driven by The
              Framework of Nature. Drawing inspiration from plants, Nature’s
              Framework guides us to slow down, give gratitude, and take
              responsibility.
              It encourages us to be flexible, resilient, collaborative, and
              communicative in our approach towards enhancing the mindset and
              quality of life for Africans.
              From artistic pots and wellness products to educational games, our
              creations emerge from upcycled materials like plastics, bottles, and
              tires. Customizable for different audiences and occasions, our
              products bridge the gap between aesthetics and purpose.
              Our diverse team of designers and engineers enables us to cater to
              businesses, connecting people to Nature through plant installations
              and unique bonding experiences.
              </p>
              <p className="js-paragraph">
              Ekondo is a social impact company driven by a collective vision to build 
              a greener, kinder, happier, and more creative Africa. we believe in the power
              of conscious living, community, and sustainability as essential tools for shaping a better future. 
              Our work is rooted in a deep commitment to the well-being of both people 
              and the planet, with a focus on creating meaningful, lasting impact 
              across the continent. At Ekondo, our mission is guided by 8 of the United 
              Nations Sustainable Development Goals (SDGs), which shape our approach 
              to economic empowerment, environmental stewardship, and social innovation. 
              From promoting sustainable lifestyles to supporting local artisans and producers, 
              we are passionate about nurturing a culture that thrives on responsibility, creativity, and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 js-section-title">
            Nature's Framework of Intention
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-md rounded-lg text-center js-card js-hover">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 organic-shape">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section 
        className="py-16 md:py-24 bg-primary/5 relative" 
        style={{
          backgroundImage: "url('/images/impact_ekondo.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        <div className="container px-4 relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 js-section-title">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "20,000+", label: "Plants Adopted" },
              { number: "3,000+", label: "Event Participants" },
              { number: "50+", label: "Spaces Transformed" },
              { number: "12+", label: "Cities Served" },
            ].map((stat, index) => (
              <div key={index} className="text-center js-stat">
                <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 js-section-title">Join Our Journey</h2>
            <p className="text-muted-foreground mb-8 js-paragraph">
              Whether you're looking to green your space, learn new skills, or connect with like-minded people, we'd
              love to have you as part of the Ekondo community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="btn-gradient-clean js-hover">
                <Link href="/retail">Shop Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="btn-gradient-clean js-hover">
                <Link href="/experience">Join an Experience</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
