"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import UTMFormSync from "@/components/utm-form-sync";
import {
  Calendar,
  Clock,
  MapPin,
  Leaf,
  Sprout,
  Loader2,
  Ticket,
  Check,
} from "lucide-react";
import { gsap } from "gsap";

const TICKET_PRICE = 5000;

export default function HomegrownPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const update = (fields: Partial<typeof form>) =>
    setForm((prev) => ({ ...prev, ...fields }));

  const getUtmFields = () => ({
    utm_source:
      (document.getElementById("utm_source") as HTMLInputElement)?.value || "",
    utm_medium:
      (document.getElementById("utm_medium") as HTMLInputElement)?.value || "",
    utm_campaign:
      (document.getElementById("utm_campaign") as HTMLInputElement)?.value || "",
    utm_term:
      (document.getElementById("utm_term") as HTMLInputElement)?.value || "",
    utm_content:
      (document.getElementById("utm_content") as HTMLInputElement)?.value || "",
    referrer:
      (document.getElementById("referrer") as HTMLInputElement)?.value || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in your name, email, and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      await fetch("/api/homegrown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...getUtmFields(),
        }),
      });

      const payRes = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          amount: TICKET_PRICE,
          metadata: {
            type: "homegrown",
            name: form.name,
            phone: form.phone,
            event: "Homegrown Workshop",
          },
        }),
      });

      const payData = await payRes.json();
      if (!payData.ok) throw new Error(payData.error || "Payment setup failed");

      sessionStorage.setItem(
        "homegrownBookingData",
        JSON.stringify({
          ...form,
          event: "Homegrown Workshop",
          amount: TICKET_PRICE,
        })
      );

      window.location.href = payData.data.data.authorization_url;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast({
        title: "Booking failed",
        description: message,
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-end overflow-hidden"
      >
        <Image
          src="/images/homegrown.jpg"
          alt="Homegrown workshop — grow herbs and vegetables at home"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="container relative z-10 px-4 pb-12 md:pb-16 pt-24">
          <div className="max-w-2xl">
            <p className="hero-animate text-xs md:text-sm tracking-[0.2em] uppercase text-white/80 mb-3">
              A hands-on workshop by Ekondo
            </p>
            <h1 className="hero-animate font-serif text-4xl md:text-6xl font-bold text-[#f5c842] mb-4">
              Homegrown
            </h1>
            <p className="hero-animate text-lg md:text-xl text-white/95 mb-6 max-w-xl">
              Learn how to grow your own herbs and veggies at home — no matter
              how small your space.
            </p>

            <div className="hero-animate flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white">
                <Calendar className="h-4 w-4 text-[#f5c842]" />
                1 August 2026
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white">
                <Clock className="h-4 w-4 text-[#f5c842]" />
                3 PM – 6 PM
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white">
                <MapPin className="h-4 w-4 text-[#f5c842]" />
                Whispers Art Haus, Maitama
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="hero-animate btn-gradient-clean"
            >
              <a href="#reserve">Reserve your spot</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-14 md:py-20 bg-[#faf6ef]">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a4d2e] mb-4">
            Grow your food. Grow your confidence. Grow something that lasts.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Join us for Homegrown, a hands-on workshop where you&apos;ll learn
            how to grow herbs and vegetables right from your home. You&apos;ll
            leave with practical skills, a plant to nurture, and the confidence
            to start your own edible garden.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: <Sprout className="h-5 w-5" />,
                title: "Practical skills",
                body: "Learn how to grow herbs and veggies in any space — balcony, kitchen sill, or backyard.",
              },
              {
                icon: <Leaf className="h-5 w-5" />,
                title: "Take a plant home",
                body: "Leave with something living to nurture and keep your garden journey going.",
              },
              {
                icon: <Ticket className="h-5 w-5" />,
                title: "Plant credit",
                body: "Your ₦5,000 ticket is fully redeemable as plant credit at Ekondo.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                <div className="text-primary mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#1a4d2e] mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details + Reserve */}
      <section className="py-14 md:py-20" id="reserve">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Event card */}
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="relative h-56 md:h-72">
                <Image
                  src="/images/homegrown.jpg"
                  alt="Homegrown flyer"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                      Ticket
                    </p>
                    <p className="text-3xl font-bold text-[#1a4d2e]">
                      ₦{TICKET_PRICE.toLocaleString("en-NG")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fully redeemable as plant credit
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>1 August 2026</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>3 PM – 6 PM</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Whispers Art Haus, Maitama, Abuja</span>
                  </div>
                </div>

                <ul className="space-y-2 pt-2">
                  {[
                    "Hands-on edible gardening workshop",
                    "Suitable for beginners",
                    "Limited spots available",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Booking form */}
            <Card className="border-none shadow-lg bg-[#faf6ef]">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold text-[#1a4d2e] mb-2">
                  Reserve your spot
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Fill in your details and complete payment to secure your
                  ticket.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <UTMFormSync />
                  <input type="hidden" id="utm_source" />
                  <input type="hidden" id="utm_medium" />
                  <input type="hidden" id="utm_campaign" />
                  <input type="hidden" id="utm_term" />
                  <input type="hidden" id="utm_content" />
                  <input type="hidden" id="referrer" />

                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => update({ name: e.target.value })}
                      className="mt-1"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update({ email: e.target.value })}
                      className="mt-1"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                      className="mt-1"
                      placeholder="+234 801 234 5678"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full btn-gradient-clean"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₦${TICKET_PRICE.toLocaleString("en-NG")} to reserve`
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Limited spots. Your ticket is fully redeemable as plant
                    credit.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
