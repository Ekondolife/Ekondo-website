"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function RefundPolicyPage() {
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
        gsap.from(".refund-section", {
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
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6">Refund Policy</h1>
          <p className="hero-description text-lg md:text-xl text-foreground/80">
            Guidelines for returns, exchanges, and refunds at Ekondo Life.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="container px-4 max-w-3xl mx-auto space-y-8">

          <div className="refund-section">
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-muted-foreground">
              We aim for your satisfaction. If you receive a damaged or defective item, or your order was incorrect, we will work to resolve it quickly.
            </p>
          </div>

          <div className="refund-section">
            <h2 className="text-2xl font-bold mb-3">Eligibility</h2>
            <p className="text-muted-foreground">
              Contact us within 14 days of delivery to request a refund or return. Items must be unused and in original packaging unless the item arrived damaged.
            </p>
          </div>

          <div className="refund-section">
            <h2 className="text-2xl font-bold mb-3">Damaged or Defective Items</h2>
            <p className="text-muted-foreground">
              For damaged or defective items, send photos and your order number within 7 days. We will assess and offer a replacement, repair, or refund depending on the case.
            </p>
          </div>

          <div className="refund-section">
            <h2 className="text-2xl font-bold mb-3">Process</h2>
            <ol className="list-decimal ml-5 space-y-2 text-muted-foreground">
              <li>Contact support at <span className="font-medium">support@ekondolife.com</span> with your order number and details.</li>
              <li>Wait for confirmation and return instructions before sending items back (if a return is required).</li>
              <li>Approved refunds are processed within 7 business days and issued to the original payment method.</li>
            </ol>
          </div>

          <div className="refund-section">
            <h2 className="text-2xl font-bold mb-3">Return Shipping Costs</h2>
            <p className="text-muted-foreground">
              If the return is due to our error (defect/damage), we cover the return shipping. For change-of-mind returns, you may be responsible for return shipping unless otherwise stated.
            </p>
          </div>

          <div className="refund-section">
            <h2 className="text-2xl font-bold mb-3">Non-Refundable Items</h2>
            <p className="text-muted-foreground">
              Certain sale items, gift cards, and living plants may have specific refund rules. Live plants are refundable only when they arrive in clearly unhealthy condition.
            </p>
          </div>

          <div className="refund-section">
            <h2 className="text-2xl font-bold mb-3">Further Help</h2>
            <p className="text-muted-foreground">
              If you have questions or need help with a return, email <span className="font-medium">hello@ekondo.com</span>. We aim to respond within 24–48 business hours.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
