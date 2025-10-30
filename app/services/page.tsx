"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, MapPin, ArrowRight } from "lucide-react"
import { services } from "@/lib/services-data"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ServicesPage() {
  // Refs for animations
  const heroRef = useRef<HTMLElement>(null)
  const servicesGridRef = useRef<HTMLElement>(null)
  const serviceAreaRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  // Hero section animations - gentle fade in
  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } })
        
        tl.from(".hero-title", {
          y: 40,
          opacity: 0,
          duration: 0.8,
        })
        .from(".hero-description", {
          y: 30,
          opacity: 0,
          duration: 0.7,
        }, "-=0.4")
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  // Services grid animations - subtle stagger
  useEffect(() => {
    if (servicesGridRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".service-card", {
          scrollTrigger: {
            trigger: servicesGridRef.current,
            start: "top 75%",
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        })

        // Gentle hover effects for service cards
        const cards = gsap.utils.toArray<HTMLElement>(".service-card")
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -6,
              scale: 1.01,
              duration: 0.3,
              ease: "power1.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power1.out",
            })
          })
        })
      }, servicesGridRef)

      return () => ctx.revert()
    }
  }, [])

  // Service area animations - fade and slide
  useEffect(() => {
    if (serviceAreaRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".area-title", {
          scrollTrigger: {
            trigger: serviceAreaRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        })

        gsap.from(".city-card", {
          scrollTrigger: {
            trigger: ".city-card",
            start: "top 85%",
          },
          x: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        })

        gsap.from(".area-cta", {
          scrollTrigger: {
            trigger: ".area-cta",
            start: "top 90%",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
      }, serviceAreaRef)

      return () => ctx.revert()
    }
  }, [])

  // How It Works animations - sequential reveal
  useEffect(() => {
    if (howItWorksRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".how-it-works-title", {
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        })

        gsap.from(".step-card", {
          scrollTrigger: {
            trigger: ".step-card",
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        })

        // Subtle pulse for step numbers
        const stepNumbers = gsap.utils.toArray<HTMLElement>(".step-number")
        stepNumbers.forEach((num) => {
          gsap.to(num, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        })
      }, howItWorksRef)

      return () => ctx.revert()
    }
  }, [])

  // CTA section animations - gentle zoom
  useEffect(() => {
    if (ctaRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".cta-content", {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        })
      }, ctaRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] w-full overflow-hidden leaf-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <Image
          src="/images/guy working.jpg"
          alt="Professional landscaping services"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="hero-title font-serif text-4xl md:text-6xl font-bold text-primary mb-6">
            Professional Services
          </h1>
          <p className="hero-description text-lg md:text-xl max-w-2xl text-foreground/80">
            Transform your spaces with expert plant care, design, and landscaping services
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesGridRef} className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`service-card border-none shadow-md organic-shape p-10 overflow-hidden ${
                  service.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {service.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={service.image || "/placeholder.svg"} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-500" 
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full organic-shape">
                    <Link href={`/services/${service.id}`}>Book Service</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section ref={serviceAreaRef} className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="area-title font-serif text-3xl md:text-4xl font-bold mb-4">Where We Serve</h2>
              <p className="area-title text-muted-foreground">We provide services across major African cities</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Lagos, Nigeria",
                "Abuja, Nigeria",
                "Port Harcourt, Nigeria",
              ].map((city, index) => (
                <Card key={index} className="city-card border-none shadow-md organic-shape">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{city}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="area-cta text-center mt-8">
              <p className="text-muted-foreground mb-4">Don't see your city? We're expanding!</p>
              <Button variant="outline" asChild className="organic-shape bg-transparent">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="how-it-works-title font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Book Consultation",
                description: "Schedule a free consultation to discuss your needs and vision.",
              },
              {
                step: "2",
                title: "Get Custom Quote",
                description: "Receive a detailed proposal and pricing tailored to your space.",
              },
              {
                step: "3",
                title: "Professional Service",
                description: "Our expert team delivers quality work on schedule.",
              },
              {
                step: "4",
                title: "Ongoing Support",
                description: "Enjoy continued care and support for lasting results.",
              },
            ].map((item, index) => (
              <div key={index} className="step-card text-center">
                <div className="step-number inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 organic-shape">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 md:py-24 bg-primary/5 leaf-pattern">
        <div className="container px-4">
          <div className="cta-content max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a free consultation with our expert team to discuss your project
            </p>
            <Button size="lg" asChild className="organic-shape">
              <Link href="/contact">
                Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}