"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Check, CheckCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { experiences } from "@/lib/experiences-data"
import { useUser } from "@/components/user-provider"
import { useToast } from "@/components/ui/use-toast"

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const experienceId = Number(params.id)

  const experience = useMemo(() => experiences.find(exp => exp.id === experienceId), [experienceId])

  // For Southside Festival, handle ticket types
  const isSouthside = experience?.id === 5
  const ticketTypes = isSouthside ? experience.ticketTypes : null
  const [selectedTicket, setSelectedTicket] = useState(ticketTypes ? ticketTypes[0] : null)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Location selection
  const availableLocations = experience?.availableLocations || ["Abuja", "Lagos"] // Default to both if not specified
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  
  const { uid, email, displayName } = useUser()
  const { toast } = useToast()

  const handleBookNow = async () => {
    // Debug: Log user info
    console.log("=== BOOKING DEBUG ===")
    console.log("User ID:", uid)
    console.log("Email:", email)
    console.log("Display Name:", displayName)
    console.log("Experience:", experience?.title)
    console.log("Selected Ticket:", selectedTicket)
    console.log("====================")

    // Check if user is logged in
    if (!uid || !email) {
      toast({
        title: "Please Sign In",
        description: "You need to sign in to book an experience.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Check if a ticket is selected (for Southside)
    if (isSouthside && !selectedTicket) {
      toast({
        title: "Select a Ticket",
        description: "Please select a ticket type before booking.",
        variant: "destructive",
      })
      return
    }

    // Show location selection dialog if location not selected
    if (!selectedLocation) {
      setShowLocationDialog(true)
      return
    }

    // Validate location for restricted experiences
    if (availableLocations.length < 2 && !availableLocations.includes(selectedLocation)) {
      toast({
        title: "Location Not Available",
        description: `This experience is only available in ${availableLocations.join(" and ")}. Please select a valid location.`,
        variant: "destructive",
      })
      setShowLocationDialog(true)
      return
    }

    // Proceed with booking
    proceedToPayment()
  }

  const proceedToPayment = async () => {

    setIsProcessing(true)

    try {
      const price = isSouthside && selectedTicket ? selectedTicket.price : (experience?.price || 0)
      const ticketTypeName = selectedTicket ? selectedTicket.name : ""

      // 1️⃣ Get UTM values from localStorage
      let utm = {}
      if (typeof window !== "undefined") {
        try {
          utm = JSON.parse(localStorage.getItem("ekondo_utm") || "{}")
        } catch {}
      }

      // 2️⃣ Send to Brevo for tracking (await here)
      await fetch("/api/brevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, // from useUser()
          firstName: displayName || "",
          experienceName: experience?.title,
          listId: isSouthside ? 15 : undefined,
          ...utm,
        }),
      })

      // 3️⃣ Initialize Paystack payment
      const response = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: price,
          experienceId: experience?.id,
          experienceName: experience?.title,
          ticketType: ticketTypeName,
          userId: uid,
          location: selectedLocation, // Include selected location
        }),
      })

      const data = await response.json()

      if (!data.ok) throw new Error(data.error || "Payment initialization failed")

      // Redirect to Paystack checkout
      window.location.href = data.data.data.authorization_url
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
    setShowLocationDialog(false)
    
    // Validate location for restricted experiences
    if (availableLocations.length < 2 && !availableLocations.includes(location)) {
      toast({
        title: "Location Not Available",
        description: `Sorry, ${experience?.title} is currently only available in ${availableLocations.join(" and ")}. We're working on bringing it to more cities soon!`,
        variant: "destructive",
      })
      setSelectedLocation("")
      return
    }
    
    // If location is valid, proceed to payment
    proceedToPayment()
  }

  // Handle invalid or missing ID
  if (!experience) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Experience Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn’t find this experience.</p>
        <Button onClick={() => router.push("/experience")}>Back to Experiences</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Back Button */}
      <div className="container px-4 py-8">
        <Button variant="ghost" asChild className="">
          <Link href="/experience">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Experiences
          </Link>
        </Button>
      </div>


      {/* Hero Section */}
      <section className="container px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative w-full h-48 xs:h-56 sm:h-[360px] lg:h-[500px] rounded-lg overflow-hidden max-w-[100vw] mx-auto">
            <Image
              src={experience.image || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Booking Card */}
          <Card className="border-none shadow-lg  h-fit sticky top-24 w-full max-w-[100vw] lg:max-w-none mx-auto">
            <CardContent className="p-6 w-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded ">
                  {experience.type}
                </div>
                <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded ">
                  {experience.date}
                </div>
              </div>

              <h1 className="font-serif text-3xl font-bold mb-4">{experience.title}</h1>

              {/* Ticket Type Variants for Southside */}
              {isSouthside && ticketTypes ? (
                <div className="mb-6">
                  <div className="font-semibold mb-2">Choose your ticket:</div>
                  <div className="flex flex-col gap-2">
                    {ticketTypes.map((ticket) => (
                      <Button
                        key={ticket.name}
                        variant={selectedTicket?.name === ticket.name ? "default" : "outline"}
                        className="justify-between w-full"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <span>
                          {ticket.name} <span className="text-xs text-muted-foreground">({ticket.description})</span>
                        </span>
                        <span className="font-bold">₦{ticket.price.toLocaleString()}</span>
                        {selectedTicket?.name === ticket.name && (
                          <Check className="ml-2 h-4 w-4 text-primary" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-3xl font-bold text-primary mb-6">
                  ₦{experience.price.toLocaleString()}
                </div>
              )}

              <div className="space-y-3 mb-6">
                {experience.date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{experience.date}</div>
                    </div>
                  </div>
                )}
                {experience.time && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{experience.time}</span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{experience.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    {experience.spotsLeft} spots left of {experience.capacity}
                  </span>
                </div>
              </div>

              {experience.spotsLeft <= 3 && (
                <div className="bg-destructive/10 text-destructive p-3 rounded  mb-6 text-sm font-medium text-center">
                  Only {experience.spotsLeft} spots remaining!
                </div>
              )}

              <Button size="lg" className="w-full btn-gradient-clean mb-3" onClick={handleBookNow} disabled={isProcessing}>
                {isProcessing ? "Processing..." : isSouthside && selectedTicket
                  ? `Book Now - ₦${selectedTicket.price.toLocaleString()}`
                  : `Book Now - ₦${experience.price.toLocaleString()}`}
              </Button>
              
              {selectedLocation && (
                <p className="text-sm text-muted-foreground text-center">
                  Location: <span className="font-medium">{selectedLocation}</span>
                </p>
              )}

              <Separator className="my-6" />

            </CardContent>
          </Card>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">About This Experience</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isSouthside && experience.longDescription
                ? experience.longDescription
                : experience.description}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 leaf-pattern">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-muted-foreground mb-8">
              Secure your spot in this popular experience. Limited spaces available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="" onClick={handleBookNow} disabled={isProcessing}>
                {isProcessing ? "Processing..." : isSouthside && selectedTicket
                  ? `Book Now - ₦${selectedTicket.price.toLocaleString()}`
                  : `Book Now - ₦${experience.price.toLocaleString()}`}
              </Button>
              <Button size="lg" variant="outline" asChild className=" bg-transparent">
                <Link href="/experience">Browse More Experiences</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Selection Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Your Location</DialogTitle>
            <DialogDescription>
              Choose the city where you'd like to attend this experience.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {["Abuja", "Lagos"].map((location) => (
              <Button
                key={location}
                variant={selectedLocation === location ? "default" : "outline"}
                className="justify-between w-full h-auto py-4"
                onClick={() => handleLocationSelect(location)}
                disabled={availableLocations.length < 2 && !availableLocations.includes(location)}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span className="font-semibold">{location}</span>
                </div>
                {availableLocations.length < 2 && !availableLocations.includes(location) && (
                  <span className="text-xs text-muted-foreground">Not available</span>
                )}
                {selectedLocation === location && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </Button>
            ))}
          </div>
          {availableLocations.length < 2 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm text-muted-foreground">
              <p className="font-medium text-primary mb-1">Note:</p>
              <p>This experience is currently only available in {availableLocations.join(" and ")}.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLocationDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
