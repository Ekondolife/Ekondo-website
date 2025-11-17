"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function PrivacyPolicyPage() {
  const heroRef = useRef<HTMLElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".hero-title", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        gsap.from(".hero-description", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
        })
      }, heroRef)
      return () => ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".policy-section", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        })
      }, sectionRef)
      return () => ctx.revert()
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section ref={heroRef} className="py-20 md:py-28 text-center bg-primary/5">
        <div className="container px-4 max-w-3xl mx-auto">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="hero-description text-lg md:text-xl text-foreground/80">
            How Ekondo collects, uses, and protects your information.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section ref={sectionRef} className="py-16 md:py-24">
        <div className="container px-4 max-w-3xl mx-auto space-y-12">

          {/* Introduction */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              Ekondo Life (“we”, “our”, “us”) values your privacy. This policy explains how we collect, use, and safeguard your personal information when you use ekondolife.com or our services.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-2">
              We collect information to help us deliver products, improve experiences, and communicate with you.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Personal details — name, email, address, phone number.</li>
              <li>• Order details — items purchased, payment method, delivery info.</li>
              <li>• Technical data — device type, IP address, pages visited, interactions.</li>
              <li>• Optional marketing preferences if you subscribe to updates.</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• To process and deliver your orders.</li>
              <li>• To communicate about purchases, support, or account-related matters.</li>
              <li>• To improve our website, products, and customer experience.</li>
              <li>• To send marketing messages only if you opt in.</li>
              <li>• To prevent fraud or unauthorized activities.</li>
            </ul>
          </div>

          {/* Sharing Your Information */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
            <p className="text-muted-foreground mb-2">
              We do not sell your personal information. However, we may share data with:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Payment processors to complete your transactions.</li>
              <li>• Delivery partners to ship your orders.</li>
              <li>• Service providers that help operate our website.</li>
              <li>• Legal authorities when required by law.</li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">5. Cookies & Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies to improve performance, personalize your experience, and analyze usage. You may control cookie settings through your browser.
            </p>
          </div>

          {/* Data Security */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
            <p className="text-muted-foreground">
              We implement technical and organizational measures to keep your information secure. However, no online system is perfectly secure, and we encourage you to safeguard your account credentials.
            </p>
          </div>

          {/* Your Rights */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground mb-2">
              Depending on your location and local laws, you may request to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Access or update your personal data.</li>
              <li>• Request deletion of your data.</li>
              <li>• Opt out of marketing communications.</li>
              <li>• Request a copy of your stored information.</li>
            </ul>
          </div>

          {/* Children */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">8. Children’s Privacy</h2>
            <p className="text-muted-foreground">
              Ekondo Life does not knowingly collect data from children under 13. If we discover such data, we will delete it promptly.
            </p>
          </div>

          {/* Updates */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy occasionally. All updates will be posted on this page with a revised “Last Updated” date.
            </p>
          </div>

          {/* Contact */}
          <div className="policy-section">
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy questions or data requests, contact us at:  
              <br />
              <span className="font-medium">hello@ekondo.com</span>
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
