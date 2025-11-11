"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getServiceById } from "@/lib/services-data";
import { useUser } from "@/components/user-provider";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import UTMFormSync from "@/components/utm-form-sync";

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const serviceId = Number(params.id);
  const service = getServiceById(serviceId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const { uid, email: userEmail, displayName } = useUser();
  const { toast } = useToast();

  // Pre-fill form with user data if logged in
  useState(() => {
    if (userEmail && displayName) {
      setFormData(prev => ({
        ...prev,
        email: userEmail,
        name: displayName || "",
      }));
    }
  });

  // Handle invalid service ID
  if (!service) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find this service.</p>
        <Button onClick={() => router.push("/services")}>Back to Services</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      // Extract price from string (e.g., "From ₦25,000/month" -> 25000)
      const priceMatch = service.price.match(/₦([\d,]+)/);
      let basePrice = 0;
      if (priceMatch) {
        basePrice = parseInt(priceMatch[1].replace(/,/g, '')) || 0;
      }

      // Get UTM values from hidden fields
      const utm = {
        utm_source: (document.getElementById("utm_source") as HTMLInputElement)?.value || "",
        utm_medium: (document.getElementById("utm_medium") as HTMLInputElement)?.value || "",
        utm_campaign: (document.getElementById("utm_campaign") as HTMLInputElement)?.value || "",
        utm_term: (document.getElementById("utm_term") as HTMLInputElement)?.value || "",
        utm_content: (document.getElementById("utm_content") as HTMLInputElement)?.value || "",
        referrer: (document.getElementById("referrer") as HTMLInputElement)?.value || "",
      };

      // Send to Brevo via API route
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          preferredDate: formData.preferredDate,
          message: formData.message,
          serviceId: service.id,
          serviceName: service.title,
          ...utm,
        }),
      });

      // Initialize Paystack payment
      const response = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          amount: basePrice,
          metadata: {
            name: formData.name,
            phone: formData.phone,
            serviceId: service.id,
            serviceName: service.title,
            preferredDate: formData.preferredDate,
            message: formData.message,
          },
        }),
      });

      const data = await response.json();

      if (!data.ok) throw new Error(data.error || "Payment initialization failed");

      // Store form data in sessionStorage to retrieve after payment
      sessionStorage.setItem("serviceBookingData", JSON.stringify({
        ...formData,
        serviceId: service.id,
        serviceName: service.title,
      }));

      // Redirect to Paystack checkout
      window.location.href = data.data.data.authorization_url;
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <div className="container px-4 py-8">
        <Button variant="ghost" asChild className="organic-shape">
          <Link href="/services">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="container px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden organic-shape">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Booking Card */}
          <Card className="border-none shadow-lg organic-shape h-fit sticky top-24">
            <CardHeader>
              <CardTitle className="font-serif text-2xl font-bold">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-6">{service.price}</div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Expert Service</div>
                    <p className="text-sm text-muted-foreground">Professional team with years of experience</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Satisfaction Guaranteed</div>
                    <p className="text-sm text-muted-foreground">We ensure quality work or your money back</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="text-sm text-muted-foreground text-center">
                Book now to secure your consultation slot
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">About This Service</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {service.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container px-4">
          <div className="w-full max-w-[90vw] sm:max-w-2xl mx-auto">
            <Card className="border-none shadow-lg organic-shape p-6 sm:p-24 w-full max-w-[90vw] sm:max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="font-serif text-xl font-bold">Book {service.title}</CardTitle>
                <p className="text-muted-foreground">Fill in your details to schedule your consultation</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <UTMFormSync />
                  <input type="hidden" name="UTM_SOURCE" id="utm_source" />
                  <input type="hidden" name="UTM_MEDIUM" id="utm_medium" />
                  <input type="hidden" name="UTM_CAMPAIGN" id="utm_campaign" />
                  <input type="hidden" name="UTM_TERM" id="utm_term" />
                  <input type="hidden" name="UTM_CONTENT" id="utm_content" />
                  <input type="hidden" name="REFERRER" id="referrer" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="mt-1 organic-shape"
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
                        className="mt-1 organic-shape"
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
                      className="mt-1 organic-shape"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                      className="mt-1 organic-shape"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your specific needs or requirements..."
                      className="mt-1 p-4 min-h-[100px]"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full organic-shape btn-gradient"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ${service.price} to Book`
                    )}
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    By booking, you agree to our terms and conditions. A consultant will contact you within 24 hours.
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
              Contact us directly for more information about this service
            </p>
            <Button size="lg" asChild className="organic-shape">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

