"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ShippingPolicyPage() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".hero-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
        gsap.from(".hero-description", { y: 20, opacity: 0, duration: 0.7, delay: 0.2, ease: "power3.out" })
      }, heroRef)
      return () => ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".ship-section", {
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        })
      }, contentRef)
      return () => ctx.revert()
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section ref={heroRef} className="py-20 md:py-28 text-center bg-primary/5">
        <div className="container px-4 max-w-3xl mx-auto">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6">Shipping Policy</h1>
          <p className="hero-description text-lg md:text-xl text-foreground/80">
            How we prepare, ship, and track orders from Ekondo Life.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="container px-4 max-w-3xl mx-auto space-y-8">
          <div className="ship-section">
            <h2 className="text-2xl font-bold mb-3">Order Processing</h2>
            <p className="text-muted-foreground">
              Orders are typically processed within 1–3 business days after payment confirmation. During peak periods or promotions processing may take longer.
            </p>
          </div>

          <div className="ship-section">
            <h2 className="text-2xl font-bold mb-3">Shipping Methods & Timing</h2>
            <p className="text-muted-foreground">
              We partner with trusted local and national couriers. Estimated delivery times are usually 3–7 business days within Nigeria, depending on your location and courier availability. Remote locations may take longer.
            </p>
          </div>

          <div className="ship-section">
            <h2 className="text-2xl font-bold mb-3">Shipping Costs</h2>
            <p className="text-muted-foreground">
              Shipping costs are calculated at checkout based on product weight, dimensions, and destination. We may offer free shipping promotions for qualifying orders.
            </p>
          </div>

          <div className="ship-section">
            <h2 className="text-2xl font-bold mb-3">Tracking</h2>
            <p className="text-muted-foreground">
              Once your order ships, we will email a tracking number. Use the courier’s tracking portal to follow delivery progress. If you don’t receive tracking information within 48 hours of shipping, contact us.
            </p>
          </div>

          <div className="ship-section">
            <h2 className="text-2xl font-bold mb-3">Delivery Issues & Damages</h2>
            <p className="text-muted-foreground">
              Inspect orders on arrival. For damaged or missing items, contact us within 7 days with photos and your order number so we can investigate and resolve the issue with the courier.
            </p>
          </div>

          <div className="ship-section">
            <h2 className="text-2xl font-bold mb-3">Shipping Restrictions</h2>
            <p className="text-muted-foreground">
              Some products or regions may have restrictions due to courier limits or regulatory rules. If delivery to your address is not possible we will notify you and offer alternatives.
            </p>
          </div>

          <div className="ship-section">
            <h2 className="text-2xl font-bold mb-3">Contact</h2>
            <p className="text-muted-foreground">
              Questions about shipping? Email <span className="font-medium">hello@ekondo.com</span>. We typically respond within 24–48 business hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
