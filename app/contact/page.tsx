"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import UTMFormSync from "@/components/utm-form-sync"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero load
      gsap.from([".js-hero-title", ".js-hero-sub"], {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      })
      gsap.fromTo(
        ".js-hero-image",
        { scale: 1.08 },
        { scale: 1, duration: 1.4, ease: "power3.out" }
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

      // Cards and form container
      gsap.utils.toArray<HTMLElement>(".js-card").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0, filter: "blur(6px)" },
          {
            scrollTrigger: { trigger: el, start: "top 92%" },
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          }
        )
      })

      // Hover micro-lift
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Get UTM values from hidden fields
    const utm = {
      utm_source: (document.getElementById("utm_source") as HTMLInputElement)?.value || "",
      utm_medium: (document.getElementById("utm_medium") as HTMLInputElement)?.value || "",
      utm_campaign: (document.getElementById("utm_campaign") as HTMLInputElement)?.value || "",
      utm_term: (document.getElementById("utm_term") as HTMLInputElement)?.value || "",
      utm_content: (document.getElementById("utm_content") as HTMLInputElement)?.value || "",
      referrer: (document.getElementById("referrer") as HTMLInputElement)?.value || "",
    }

    try {
      // 1️⃣ Send to Brevo first
      const brevoResponse = await fetch("/api/brevo-contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
          ...utm,
        }),
      })

      const brevoData = await brevoResponse.json()
      if (!brevoResponse.ok || !brevoData.ok) {
        console.warn("Brevo failed:", brevoData)
      }

      // 2️⃣ Also send via Formly
      const formDataToSend = new FormData()
      formDataToSend.append("access_key", process.env.NEXT_PUBLIC_FORMLY_KEY || "")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("subject", formData.subject)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("to", "hello@ekondolife.com")

      const formlyResponse = await fetch("https://formly.email/submit", {
        method: "POST",
        body: formDataToSend,
      })

      if (!formlyResponse.ok) throw new Error("Formly submission failed")

      setSuccess(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error: any) {
      alert("Failed to submit form: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const locations = [
    {
      city: "Abuja, Nigeria",
      address: "Whispers Art Haus Maitama, Abuja, Nigeria",
      phone: "09162358827",
      email: "hello@ekondolife.com",
      hours: "Mon-Sat: 9AM-7PM",
    },
    {
      city: "Lagos, Nigeria",
      address: "2 Saka Jojo St, Victoria Island, Lagos, Nigeria",
      phone: "09162358827",
      email: "hello@ekondolife.com",
      hours: "Mon-Sat: 9AM-7PM",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <Image
          src="/images/two women.JPG"
          alt="Contact Ekondo"
          fill
          className="object-cover js-hero-image"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6 js-hero-title">Get in Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl text-foreground/80 js-hero-sub">
            We'd love to hear from you. Let's grow something beautiful together.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="js-card">
              <h2 className="font-serif text-3xl font-bold mb-6 js-section-title">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <UTMFormSync />
                <input type="hidden" name="UTM_SOURCE" id="utm_source" />
                <input type="hidden" name="UTM_MEDIUM" id="utm_medium" />
                <input type="hidden" name="UTM_CAMPAIGN" id="utm_campaign" />
                <input type="hidden" name="UTM_TERM" id="utm_term" />
                <input type="hidden" name="UTM_CONTENT" id="utm_content" />
                <input type="hidden" name="REFERRER" id="referrer" />

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1 "
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1 "
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 "
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger className="mt-1 ">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="retail">Product Question</SelectItem>
                      <SelectItem value="experience">Experience Booking</SelectItem>
                      <SelectItem value="services">Service Request</SelectItem>
                      <SelectItem value="spaces">Space Rental</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="mt-1"
                  />
                </div>

                {success && (
                  <div className="bg-primary/10 text-primary p-4 rounded ">
                    Thank you! We'll get back to you within 24 hours.
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full  js-hover" size="lg">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6 js-section-title">Our Locations</h2>
                <div className="space-y-6">
                  {locations.map((location, index) => (
                    <Card key={index} className="border-none shadow-md  js-card">
                      <CardContent className="p-6">
                        <h3 className="font-serif text-xl font-bold mb-4">{location.city}</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{location.address}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{location.phone}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{location.email}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{location.hours}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="border-none shadow-md  bg-primary/5 js-card js-hover">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-4">Quick Response</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We typically respond to all inquiries within 24 hours during business days. For urgent matters,
                    please call us directly.
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div>
                      <span className="font-medium">General:</span> hello@ekondo.com
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
