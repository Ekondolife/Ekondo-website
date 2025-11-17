"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Sparkles, Gift, Calendar, MapPin, Heart, TrendingUp } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function NatureHostPage() {
  const heroRef = useRef<HTMLElement>(null)
  const benefitsRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)

  // Hero animations
  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".hero-title", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        gsap.from(".hero-description", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        })
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  // Benefits section animations
  useEffect(() => {
    if (benefitsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".benefit-card", {
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 75%",
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        })
      }, benefitsRef)

      return () => ctx.revert()
    }
  }, [])

  // Process section animations
  useEffect(() => {
    if (processRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".process-step", {
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
          },
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        })
      }, processRef)

      return () => ctx.revert()
    }
  }, [])

  const benefits = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Be Part of Something Bigger",
      description: "Welcome people into a lifestyle that blends Nature, wellness, and community. Represent a brand redefining how cities connect to Nature.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Grow While Helping Others",
      description: "Learn communication, hosting, and storytelling skills. Build confidence in sales, public speaking, and people engagement.",
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Earn & Enjoy Rewards",
      description: "Paid opportunities at events (stipends + commissions). Free plants, discounts, and exclusive perks for your home.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Join a Community",
      description: "Connect with like-minded people across Lagos, Abuja, Port Harcourt, and Ibadan. Monthly check-ins and shared experiences.",
    },
  ]

  const processSteps = [
    {
      number: "1",
      title: "Apply",
      description: "Fill out a simple form sharing why you want to be a Nature Host.",
    },
    {
      number: "2",
      title: "Get Selected",
      description: "Quick screening call to check communication and enthusiasm.",
    },
    {
      number: "3",
      title: "Train",
      description: "One-day training on Ekondo's story, products, and hosting skills.",
    },
    {
      number: "4",
      title: "Start Hosting",
      description: "Begin at events and pop-ups, earning while creating experiences.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-10"></div>
        <Image
          src="/images/two_girls.webp"
          alt="Nature Hosts at Ekondo event"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6">
            Become a <span className="text-primary">Nature Host</span>
          </h1>
          <p className="hero-description text-lg md:text-xl max-w-2xl text-foreground/90">
            Be the warm, welcoming face of Ekondo at events and pop-ups. Create experiences, not just sales.
          </p>
        </div>
      </section>

      {/* Who is a Nature Host */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who is a Nature Host?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nature Hosts are the warm, welcoming faces of Ekondo. You don't just sell products—you create meaningful experiences that introduce people to our world of plants, wellness, and community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Where You'll Be
                  </h3>
                  <p className="text-muted-foreground">
                    Pop-ups, festivals, events, and partner activations across Lagos, Abuja, Calabar, Port Harcourt, and Ibadan.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Your Commitment
                  </h3>
                  <p className="text-muted-foreground">
                    Part-time, event-based work (weekends, evenings, festivals). 3–6 month renewable membership.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Join as a Nature Host?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="benefit-card border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-primary mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={processRef} className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Do */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You'll Do</h2>
            <div className="space-y-4">
              {[
                "Represent Ekondo at pop-ups, festivals, and events",
                "Share the Ekondo story and introduce products (plants, pots, bundles, experiences)",
                "Create a welcoming atmosphere where customers feel cared for",
                "Support with sales, lead collection, and event logistics",
                "Capture photos/videos/testimonials for Ekondo's storytelling",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-green-500/10 to-orange-500/10">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Become a Nature Host?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community and help bring Nature, wellness, and community to cities across Africa.
            </p>
            <Button size="lg" asChild className="btn-gradient-clean">
              <a
                href="https://docs.google.com/forms/d/1qdVx572VlBkgZg8-VTUgPuuZINzqMKyyfjThUBJTRcg/preview"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Apply Now <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Applications are open for Lagos, Abuja, Port Harcourt, Calabar, and Ibadan
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

