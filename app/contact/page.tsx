"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })

      setTimeout(() => setSuccess(false), 5000)
    }, 1500)
  }

  const locations = [
    {
      city: "Lagos, Nigeria",
      address: "123 Victoria Island, Lagos",
      phone: "+234 xxx xxx xxxx",
      email: "lagos@ekondo.com",
      hours: "Mon-Sat: 9AM-7PM",
    },
    {
      city: "Accra, Ghana",
      address: "45 East Legon, Accra",
      phone: "+233 xxx xxx xxxx",
      email: "accra@ekondo.com",
      hours: "Tue-Sat: 10AM-6PM",
    },
    {
      city: "Nairobi, Kenya",
      address: "78 Karen Road, Nairobi",
      phone: "+254 xxx xxx xxxx",
      email: "nairobi@ekondo.com",
      hours: "Mon-Sun: 8AM-8PM",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden leaf-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1920&h=1080&fit=crop&crop=center"
          alt="Contact Ekondo"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">Get in Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl text-foreground/80">
            We'd love to hear from you. Let's grow something beautiful together.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1 organic-shape"
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
                    className="mt-1 organic-shape"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 organic-shape"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger className="mt-1 organic-shape">
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
                    className="mt-1 organic-shape"
                  />
                </div>

                {success && (
                  <div className="bg-primary/10 text-primary p-4 rounded organic-shape">
                    Thank you! We'll get back to you within 24 hours.
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full organic-shape" size="lg">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Our Locations</h2>
                <div className="space-y-6">
                  {locations.map((location, index) => (
                    <Card key={index} className="border-none shadow-md organic-shape">
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

              <Card className="border-none shadow-md organic-shape bg-primary/5">
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
                    <div>
                      <span className="font-medium">Partnerships:</span> partners@ekondo.com
                    </div>
                    <div>
                      <span className="font-medium">Press:</span> press@ekondo.com
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Do you ship products internationally?",
                  answer:
                    "Currently, we ship within African countries where we operate. We're working on expanding our shipping to other regions soon.",
                },
                {
                  question: "Can I visit your spaces without booking?",
                  answer:
                    "Yes! Our retail areas are open during business hours. However, we recommend booking for workshops and private events.",
                },
                {
                  question: "Do you offer plant care consultations?",
                  answer:
                    "Yes, we offer both in-person and virtual plant care consultations. Book through our Services page or contact us directly.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept mobile money, bank transfers, and major credit/debit cards through our secure payment partners.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-none shadow-md organic-shape">
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
