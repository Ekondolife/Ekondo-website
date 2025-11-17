"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function TermsOfServicePage() {
  const heroRef = useRef<HTMLElement>(null)
  const sectionsRef = useRef<HTMLElement>(null)

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
    if (sectionsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".tos-section", {
          scrollTrigger: { trigger: sectionsRef.current, start: "top 80%" },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        })
      }, sectionsRef)
      return () => ctx.revert()
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section ref={heroRef} className="py-20 md:py-28 text-center bg-primary/5">
        <div className="container px-4 max-w-3xl mx-auto">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
          <p className="hero-description text-lg md:text-xl text-foreground/80">
            The rules and guidelines for using Ekondo Life’s website, products, and services.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section ref={sectionsRef} className="py-16 md:py-24">
        <div className="container px-4 max-w-3xl mx-auto space-y-10">
          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">1. Agreement</h2>
            <p className="text-muted-foreground">
              By accessing or using ekondolife.com and our services, you agree to these Terms. If you do not agree, please do not use our site.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">2. Services</h2>
            <p className="text-muted-foreground">
              Ekondo Life offers plants, wellness products, curated bundles, and experiences. All product descriptions and availability are subject to change.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">3. Accounts</h2>
            <p className="text-muted-foreground">
              When you create an account, you are responsible for the security of your credentials and for all activity under your account. Notify us immediately of any unauthorized use.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">4. Orders & Payments</h2>
            <p className="text-muted-foreground">
              Orders are an offer to purchase and are subject to acceptance. Payments are processed via third-party providers. We do not store full card details on our servers.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">5. Pricing & Promotions</h2>
            <p className="text-muted-foreground">
              Prices and promotions may change. Errors on the site will be corrected where discovered, and we may cancel or refuse orders resulting from such errors.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">6. Shipping</h2>
            <p className="text-muted-foreground">
              Shipping timelines, costs, and policies are described in our Shipping Policy. Delays due to courier partners or external factors may occur.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">7. Returns & Refunds</h2>
            <p className="text-muted-foreground">
              Our Refund Policy governs returns and refunds. For damaged or defective items, contact us promptly with photos and your order number.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">8. Acceptable Use</h2>
            <p className="text-muted-foreground">
              You agree to use the site lawfully and not to post harmful, abusive, or illegal content or attempt to disrupt site operations.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">9. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on Ekondo Life (text, images, logos) is owned by or licensed to us. You may not reproduce or redistribute content without permission.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">10. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, Ekondo Life is not liable for indirect, incidental, or consequential damages arising from using our services.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of Nigeria. Any disputes will be subject to the competent courts in Nigeria.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">12. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these Terms occasionally; the latest version will be posted here. Continued use after changes constitutes acceptance.
            </p>
          </div>

          <div className="tos-section">
            <h2 className="text-2xl font-bold mb-3">13. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, contact us at <span className="font-medium">hello@ekondo.com</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
