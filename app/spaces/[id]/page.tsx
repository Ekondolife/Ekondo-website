"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Users, ArrowLeft, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getSpaceById } from "@/lib/spaces-data";
import { useUser } from "@/components/user-provider";
import { useToast } from "@/components/ui/use-toast";
import UTMFormSync from "@/components/utm-form-sync";

export default function SpaceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const spaceId = Number(params.id);
  const space = getSpaceById(spaceId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    numberOfGuests: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingType, setBookingType] = useState<"hourly" | "daily">("daily");

  const { uid, email: userEmail, displayName } = useUser();
  const { toast } = useToast();

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (userEmail && displayName) {
      setFormData(prev => ({
        ...prev,
        email: userEmail,
        name: displayName || "",
      }));
    }
  }, [userEmail, displayName]);

  // Handle invalid space ID
  if (!space) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Space Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find this space.</p>
        <Button onClick={() => router.push("/spaces")}>Back to Spaces</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Get UTM values from hidden fields
      const utm = {
        utm_source: (document.getElementById("utm_source") as HTMLInputElement)?.value || "",
        utm_medium: (document.getElementById("utm_medium") as HTMLInputElement)?.value || "",
        utm_campaign: (document.getElementById("utm_campaign") as HTMLInputElement)?.value || "",
        utm_term: (document.getElementById("utm_term") as HTMLInputElement)?.value || "",
        utm_content: (document.getElementById("utm_content") as HTMLInputElement)?.value || "",
        referrer: (document.getElementById("referrer") as HTMLInputElement)?.value || "",
      };

      // Send booking details to Brevo
      const response = await fetch("/api/brevo-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.name,
          phone: formData.phone,
          message: `Booking Type: ${bookingType === "hourly" ? "Hourly Rental" : "Full Day Rental"}
Preferred Date: ${formData.preferredDate}
Preferred Time: ${formData.preferredTime || "Not specified"}
Number of Guests: ${formData.numberOfGuests || "Not specified"}
Additional Message: ${formData.message || "None"}`,
          location: space.name,
          bookingType: bookingType === "hourly" ? "Hourly Rental" : "Full Day Rental",
          ...utm,
        }),
      });

      const data = await response.json();

      if (!data.ok) throw new Error(data.error || "Failed to submit booking");

      toast({
        title: "Booking Request Submitted!",
        description: `We've received your request for ${space.name}. Our team will contact you within 24 hours.`,
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        numberOfGuests: "",
        message: "",
      });

      // Redirect to spaces page after 2 seconds
      setTimeout(() => {
        router.push("/spaces");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <div className="container px-4 py-8">
        <Button variant="ghost" asChild className="">
          <Link href="/spaces">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Spaces
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="container px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={space.image || "/placeholder.svg"}
              alt={space.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info Card */}
          <Card className="border-none shadow-lg rounded-lg p-10 h-fit sticky top-24">
            <CardHeader>
              {space.featured && (
                <div className="inline-block bg-primary/10 text-primary text-sm font-medium rounded-lg mb-4 p-4">
                  Flagship Location
                </div>
              )}
              <CardTitle className="font-serif text-2xl font-bold">{space.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{space.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{space.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{space.hours}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{space.capacity}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {space.amenities.map((amenity, i) => (
                    <div key={i} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded organic-shape">
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="text-2xl font-bold text-primary text-center">
                {bookingType === "hourly" 
                  ? `₦${space.hourlyPrice.toLocaleString()}/hour`
                  : `₦${space.dailyPrice.toLocaleString()}/day`}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">About This Space</h2>
            <p className="text-muted-foreground leading-relaxed">
              {space.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container px-4">
          <div className="w-full max-w-[90vw] sm:max-w-2xl mx-auto">
            <Card className="border-none shadow-lg p-6 sm:p-24 w-full max-w-[90vw] sm:max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="font-serif text-2xl font-bold">Book {space.name}</CardTitle>
                <p className="text-muted-foreground">Fill in your details and we'll get back to you within 24 hours</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* UTM Hidden Fields */}
                  <UTMFormSync />
                  <input type="hidden" name="UTM_SOURCE" id="utm_source" />
                  <input type="hidden" name="UTM_MEDIUM" id="utm_medium" />
                  <input type="hidden" name="UTM_CAMPAIGN" id="utm_campaign" />
                  <input type="hidden" name="UTM_TERM" id="utm_term" />
                  <input type="hidden" name="UTM_CONTENT" id="utm_content" />
                  <input type="hidden" name="REFERRER" id="referrer" />

                  {/* Booking Type Selection */}
                  <div>
                    <Label>Rental Type *</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        type="button"
                        variant={bookingType === "hourly" ? "default" : "outline"}
                        className={` ${bookingType === "hourly" ? "btn-gradient-clean" : "bg-transparent"}`}
                        onClick={() => setBookingType("hourly")}
                      >
                        Hourly
                      </Button>
                      <Button
                        type="button"
                        variant={bookingType === "daily" ? "default" : "outline"}
                        className={` ${bookingType === "daily" ? "btn-gradient-clean" : "bg-transparent"}`}
                        onClick={() => setBookingType("daily")}
                      >
                        Full Day
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {bookingType === "hourly" 
                        ? `₦${space.hourlyPrice.toLocaleString()} per hour`
                        : `₦${space.dailyPrice.toLocaleString()} for 8 hours`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="mt-1 "
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+234 801 234 5678"
                        className="mt-1 "
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="mt-1 "
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                        className="mt-1 "
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Input
                        id="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                        className="mt-1 "
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="numberOfGuests">Number of Guests</Label>
                    <Input
                      id="numberOfGuests"
                      type="number"
                      value={formData.numberOfGuests}
                      onChange={(e) => setFormData(prev => ({ ...prev, numberOfGuests: e.target.value }))}
                      placeholder="e.g., 20"
                      className="mt-1  p-4"
                      min="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Requirements</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your event, any specific requirements, or special requests..."
                      className="mt-1 min-h-[100px]"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full  btn-gradient-clean"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Booking Request"
                    )}
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to our terms and conditions. We'll contact you within 24 hours to confirm your booking.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Contact us directly for more information about this space
            </p>
            <Button size="lg" asChild className="">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

