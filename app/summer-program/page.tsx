"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import UTMFormSync from "@/components/utm-form-sync";
import {
  ACTIVITIES,
  PROGRAM_OPTIONS,
  HEAR_ABOUT_OPTIONS,
  getAvailableCampDates,
  calculateAmount,
  formatNaira,
  ProgramOption,
} from "@/lib/summer-program-data";
import {
  Calendar,
  Clock,
  MapPin,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";

const STEPS = [
  "Parent & Child",
  "Program",
  "Health & Safety",
  "Final Details",
];

const RELATIONSHIPS = [
  "Mother",
  "Father",
  "Guardian",
  "Aunt",
  "Uncle",
  "Grandparent",
  "Other",
];

export default function SummerProgramPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SummerProgramContent />
    </Suspense>
  );
}

function SummerProgramContent() {
  const searchParams = useSearchParams();
  const heroRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [completedWithoutPayment, setCompletedWithoutPayment] = useState(false);

  const campDates = getAvailableCampDates();

  const [form, setForm] = useState({
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    parentRelationship: "",
    childName: "",
    childDob: "",
    childGender: "",
    programOption: "" as ProgramOption | "",
    dailyPassDates: [] as string[],
    hasAllergies: "" as "" | "yes" | "no",
    allergyDetails: "",
    medicalConditions: "",
    comfortablePhysical: "" as "" | "yes" | "no",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    photoConsent: "" as "" | "yes" | "no",
    activityConsent: "" as "" | "yes" | "no",
    hearAbout: "",
    excitedAbout: "",
  });

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setIsComplete(true);
      setCompletedWithoutPayment(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".hero-animate", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      }, heroRef);
      return () => ctx.revert();
    }
  }, []);

  const update = (fields: Partial<typeof form>) =>
    setForm((prev) => ({ ...prev, ...fields }));

  const toggleDate = (date: string) => {
    setForm((prev) => ({
      ...prev,
      dailyPassDates: prev.dailyPassDates.includes(date)
        ? prev.dailyPassDates.filter((d) => d !== date)
        : [...prev.dailyPassDates, date],
    }));
  };

  const amount = form.programOption
    ? calculateAmount(form.programOption, form.dailyPassDates)
    : 0;

  const validateStep = (): boolean => {
    switch (step) {
      case 0:
        if (
          !form.parentName ||
          !form.parentPhone ||
          !form.parentEmail ||
          !form.parentRelationship ||
          !form.childName ||
          !form.childDob
        ) {
          toast({
            title: "Missing information",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 1:
        if (!form.programOption) {
          toast({
            title: "Select a program",
            description: "Please choose a registration option.",
            variant: "destructive",
          });
          return false;
        }
        if (
          form.programOption === "daily_pass" &&
          form.dailyPassDates.length === 0
        ) {
          toast({
            title: "Select dates",
            description: "Please pick at least one day for the Daily Pass.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (
          !form.hasAllergies ||
          !form.comfortablePhysical ||
          !form.emergencyName ||
          !form.emergencyPhone ||
          !form.emergencyRelationship
        ) {
          toast({
            title: "Missing information",
            description: "Please complete all health & emergency fields.",
            variant: "destructive",
          });
          return false;
        }
        if (form.hasAllergies === "yes" && !form.allergyDetails.trim()) {
          toast({
            title: "Allergy details needed",
            description: "Please specify your child's allergies.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 3:
        if (!form.photoConsent || !form.activityConsent) {
          toast({
            title: "Consent required",
            description: "Please answer both permission questions.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

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

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsProcessing(true);

    try {
      const payload = {
        parentName: form.parentName,
        parentPhone: form.parentPhone,
        parentEmail: form.parentEmail,
        parentRelationship: form.parentRelationship,
        childName: form.childName,
        childDob: form.childDob,
        childGender: form.childGender || undefined,
        programOption: form.programOption,
        dailyPassDates: form.dailyPassDates,
        hasAllergies: form.hasAllergies === "yes",
        allergyDetails: form.allergyDetails,
        medicalConditions: form.medicalConditions,
        comfortablePhysical: form.comfortablePhysical === "yes",
        emergencyName: form.emergencyName,
        emergencyPhone: form.emergencyPhone,
        emergencyRelationship: form.emergencyRelationship,
        photoConsent: form.photoConsent === "yes",
        activityConsent: form.activityConsent === "yes",
        hearAbout: form.hearAbout,
        excitedAbout: form.excitedAbout,
        ...getUtmFields(),
      };

      const regRes = await fetch("/api/summer-program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const regData = await regRes.json();
      if (!regData.ok) throw new Error(regData.error || "Registration failed");

      if (!regData.requiresPayment) {
        setCompletedWithoutPayment(true);
        setIsComplete(true);
        setIsProcessing(false);
        return;
      }

      const payRes = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.parentEmail,
          amount: regData.amount,
          registrationId: regData.registrationId,
          metadata: {
            childName: form.childName,
            programOption: form.programOption,
            parentName: form.parentName,
          },
        }),
      });

      const payData = await payRes.json();
      if (!payData.ok) throw new Error(payData.error || "Payment setup failed");

      sessionStorage.setItem(
        "summerProgramRegistrationId",
        regData.registrationId
      );

      window.location.href = payData.data.data.authorization_url;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast({
        title: "Registration failed",
        description: message,
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const formatDateLabel = (iso: string) => {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-NG", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (isComplete) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#1a4d2e] px-4">
        <Card className="max-w-lg w-full border-none shadow-2xl bg-[#faf6ef]">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="text-4xl mb-4">💚</div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1a4d2e] mb-4">
              {completedWithoutPayment
                ? "Thank you for registering your interest!"
                : "Registration received!"}
            </h1>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {completedWithoutPayment
                ? "We'll contact you shortly with payment details and next steps."
                : "Your payment was successful. We'll be in touch with camp details soon."}
            </p>
            <div className="space-y-2 text-sm text-[#1a4d2e]/80 mb-8">
              <p>📍 Whispers Art Haus, Maitama</p>
              <p>🗓 August 3rd – August 28th, 2026</p>
              <p>⏰ 9AM – 1PM</p>
            </div>
            <p className="text-[#1a4d2e] font-medium">
              As always, we&apos;re rooting for you 💚🪴
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative bg-[#1a4d2e] text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 leaf-pattern pointer-events-none" />
        <div className="container px-4 py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div>
              <p className="hero-animate text-xs md:text-sm tracking-widest uppercase text-white/70 mb-2">
                — A Hands-On Creative Nature Camp
              </p>
              <h1 className="hero-animate font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Ekondo Kids Summer{" "}
                <span className="text-[#f5c842] italic font-normal">
                  program.
                </span>
              </h1>
              <p className="hero-animate text-base md:text-lg text-white/90 mb-6 max-w-xl">
                Four weeks of{" "}
                <span className="underline decoration-[#f5c842] decoration-2 underline-offset-4">
                  plants, paint, pottery &amp; play
                </span>{" "}
                — where children learn to grow things, make things, and find
                their crew in the garden.
              </p>

              <div className="hero-animate flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                  <Calendar className="h-4 w-4 text-[#f5c842]" />
                  Aug 3 — Aug 28, 2026
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                  <Clock className="h-4 w-4 text-[#f5c842]" />
                  Mon — Sat · 9 AM — 1 PM
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                  <MapPin className="h-4 w-4 text-[#f5c842]" />
                  Whispers Art Haus, Maitama
                </div>
              </div>

              <div className="hero-animate inline-flex items-center gap-2 bg-[#e84393] text-white font-bold text-sm px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4" />
                AGES 5 — 15 YEARS
              </div>
            </div>

            <div className="hero-animate relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/summer_updated_poster.png"
                  alt="Ekondo Kids Summer Program"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-10 bg-primary/5">
        <div className="container px-4 max-w-6xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-6 text-center">
            What they&apos;ll explore —
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {ACTIVITIES.map((activity) => (
              <span
                key={activity.label}
                className={`${activity.color} text-primary text-sm font-medium px-4 py-2 rounded-full`}
              >
                {activity.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing strip */}
      <section className="py-8 bg-[#1a4d2e]/95 text-white">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="font-serif text-2xl font-bold">Program Fees</h2>
            <span className="bg-[#f5c842] text-[#1a4d2e] text-xs font-bold px-3 py-1 rounded-full">
              20% OFF for families with 2+ children
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROGRAM_OPTIONS.filter((o) => o.id !== "not_sure").map((opt) => (
              <div
                key={opt.id}
                className="bg-[#faf6ef] text-[#1a4d2e] rounded-2xl p-5 relative"
              >
                {opt.badge && (
                  <span className="absolute -top-2 right-3 bg-[#e84393] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {opt.badge}
                  </span>
                )}
                <p className="text-xs uppercase tracking-wide font-semibold opacity-70">
                  {opt.label}
                </p>
                <p className="text-2xl font-bold mt-1">
                  {formatNaira(opt.price)}
                  {opt.id === "daily_pass" && (
                    <span className="text-sm font-normal">/day</span>
                  )}
                </p>
                <p className="text-sm mt-1 opacity-80">{opt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 md:py-16 bg-primary/5" id="register">
        <div className="container px-4 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-[#1a4d2e] mb-2">
              Register Your Child
            </h2>
            <p className="text-muted-foreground">
              Fill in the details below — payment comes at the end
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-8 px-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    i <= step
                      ? "bg-[#1a4d2e] text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className="text-xs mt-1 text-center hidden sm:block text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Card className="border-none shadow-lg ">
            <CardContent className="p-6 md:p-10">
              <UTMFormSync />
              <input type="hidden" id="utm_source" />
              <input type="hidden" id="utm_medium" />
              <input type="hidden" id="utm_campaign" />
              <input type="hidden" id="utm_term" />
              <input type="hidden" id="utm_content" />
              <input type="hidden" id="referrer" />

              {/* Step 0: Parent & Child */}
              {step === 0 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-[#1a4d2e]">
                    Parent / Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="parentName">Full Name *</Label>
                      <Input
                        id="parentName"
                        value={form.parentName}
                        onChange={(e) =>
                          update({ parentName: e.target.value })
                        }
                        className="mt-1 "
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentPhone">Phone Number *</Label>
                      <Input
                        id="parentPhone"
                        type="tel"
                        value={form.parentPhone}
                        onChange={(e) =>
                          update({ parentPhone: e.target.value })
                        }
                        className="mt-1 "
                        placeholder="+234 801 234 5678"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentEmail">Email Address *</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        value={form.parentEmail}
                        onChange={(e) =>
                          update({ parentEmail: e.target.value })
                        }
                        className="mt-1 "
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Relationship to Child *</Label>
                      <Select
                        value={form.parentRelationship}
                        onValueChange={(v) =>
                          update({ parentRelationship: v })
                        }
                      >
                        <SelectTrigger className="mt-1 ">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {RELATIONSHIPS.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1a4d2e] pt-4">
                    Child Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="childName">Child&apos;s Full Name *</Label>
                      <Input
                        id="childName"
                        value={form.childName}
                        onChange={(e) => update({ childName: e.target.value })}
                        className="mt-1 "
                        placeholder="Child's full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="childDob">Date of Birth *</Label>
                      <Input
                        id="childDob"
                        type="date"
                        value={form.childDob}
                        onChange={(e) => update({ childDob: e.target.value })}
                        className="mt-1 "
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label>Gender (Optional)</Label>
                      <Select
                        value={form.childGender}
                        onValueChange={(v) => update({ childGender: v })}
                      >
                        <SelectTrigger className="mt-1 ">
                          <SelectValue placeholder="Select (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Prefer not to say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Program Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-[#1a4d2e]">
                    Which option would you like?
                  </h3>
                  <div className="space-y-3">
                    {PROGRAM_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          update({
                            programOption: opt.id,
                            dailyPassDates:
                              opt.id !== "daily_pass"
                                ? []
                                : form.dailyPassDates,
                          })
                        }
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                          form.programOption === opt.id
                            ? "border-[#1a4d2e] bg-[#1a4d2e]/5"
                            : "border-transparent bg-white hover:border-[#1a4d2e]/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-[#1a4d2e]">
                              {opt.label}
                              {opt.badge && (
                                <span className="ml-2 text-xs bg-[#e84393] text-white px-2 py-0.5 rounded-full">
                                  {opt.badge}
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {opt.description}
                            </p>
                          </div>
                          {opt.price > 0 && (
                            <span className="font-bold text-[#1a4d2e] shrink-0">
                              {formatNaira(opt.price)}
                              {opt.id === "daily_pass" && "/day"}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {form.programOption === "daily_pass" && (
                    <div>
                      <Label className="mb-3 block">
                        Select date(s) to attend *
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
                        {campDates.map((date) => {
                          const selected = form.dailyPassDates.includes(date);
                          return (
                            <button
                              key={date}
                              type="button"
                              onClick={() => toggleDate(date)}
                              className={`flex items-center gap-2 p-2 rounded-xl text-sm transition-colors ${
                                selected
                                  ? "bg-[#1a4d2e] text-white"
                                  : "bg-white hover:bg-[#1a4d2e]/10"
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                  selected
                                    ? "bg-white border-white text-[#1a4d2e]"
                                    : "border-[#1a4d2e]/40"
                                }`}
                              >
                                {selected && <Check className="h-3 w-3" />}
                              </span>
                              {formatDateLabel(date)}
                            </button>
                          );
                        })}
                      </div>
                      {form.dailyPassDates.length > 0 && (
                        <p className="mt-3 text-sm font-medium text-[#1a4d2e]">
                          Total: {formatNaira(amount)} (
                          {form.dailyPassDates.length} day
                          {form.dailyPassDates.length !== 1 ? "s" : ""})
                        </p>
                      )}
                    </div>
                  )}

                  {form.programOption && form.programOption !== "daily_pass" && (
                    <p className="text-sm font-medium text-[#1a4d2e] bg-white rounded-xl p-3">
                      Total: {formatNaira(amount)}
                    </p>
                  )}
                </div>
              )}

              {/* Step 2: Health & Safety */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-[#1a4d2e]">
                    Health &amp; Safety
                  </h3>

                  <YesNoField
                    label="Does your child have any allergies?"
                    value={form.hasAllergies}
                    onChange={(v) => update({ hasAllergies: v })}
                  />
                  {form.hasAllergies === "yes" && (
                    <div>
                      <Label htmlFor="allergyDetails">
                        Please specify allergies *
                      </Label>
                      <Textarea
                        id="allergyDetails"
                        value={form.allergyDetails}
                        onChange={(e) =>
                          update({ allergyDetails: e.target.value })
                        }
                        className="mt-1 "
                        rows={2}
                        placeholder="List any allergies..."
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="medicalConditions">
                      Medical conditions or special needs (optional)
                    </Label>
                    <Textarea
                      id="medicalConditions"
                      value={form.medicalConditions}
                      onChange={(e) =>
                        update({ medicalConditions: e.target.value })
                      }
                      className="mt-1 "
                      rows={2}
                      placeholder="Anything we should know..."
                    />
                  </div>

                  <YesNoField
                    label="Is your child comfortable with physical activities like swimming and outdoor games?"
                    value={form.comfortablePhysical}
                    onChange={(v) => update({ comfortablePhysical: v })}
                  />

                  <h3 className="font-serif text-xl font-bold text-[#1a4d2e] pt-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="emergencyName">Full Name *</Label>
                      <Input
                        id="emergencyName"
                        value={form.emergencyName}
                        onChange={(e) =>
                          update({ emergencyName: e.target.value })
                        }
                        className="mt-1 "
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Phone Number *</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={form.emergencyPhone}
                        onChange={(e) =>
                          update({ emergencyPhone: e.target.value })
                        }
                        className="mt-1 "
                      />
                    </div>
                    <div>
                      <Label>Relationship to Child *</Label>
                      <Select
                        value={form.emergencyRelationship}
                        onValueChange={(v) =>
                          update({ emergencyRelationship: v })
                        }
                      >
                        <SelectTrigger className="mt-1 ">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {RELATIONSHIPS.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Final Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-[#1a4d2e]">
                    Permissions
                  </h3>

                  <YesNoField
                    label="Do you consent to your child being photographed or recorded for Ekondo's marketing and documentation?"
                    value={form.photoConsent}
                    onChange={(v) => update({ photoConsent: v })}
                  />
                  <YesNoField
                    label="Do you consent to your child participating in all scheduled camp activities?"
                    value={form.activityConsent}
                    onChange={(v) => update({ activityConsent: v })}
                  />

                  <div>
                    <Label>How did you hear about us?</Label>
                    <Select
                      value={form.hearAbout}
                      onValueChange={(v) => update({ hearAbout: v })}
                    >
                      <SelectTrigger className="mt-1 ">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {HEAR_ABOUT_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="excitedAbout">
                      What are you most excited for your child to gain from this
                      experience? 🌱
                    </Label>
                    <Textarea
                      id="excitedAbout"
                      value={form.excitedAbout}
                      onChange={(e) =>
                        update({ excitedAbout: e.target.value })
                      }
                      className="mt-1 "
                      rows={3}
                      placeholder="Tell us what you're hoping for..."
                    />
                  </div>

                  {/* Summary */}
                  <div className="rounded-2xl p-4 space-y-2 text-sm">
                    <p className="font-bold text-[#1a4d2e]">Registration Summary</p>
                    <p>
                      <span className="text-muted-foreground">Child:</span>{" "}
                      {form.childName}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Program:</span>{" "}
                      {PROGRAM_OPTIONS.find((o) => o.id === form.programOption)
                        ?.label || "—"}
                    </p>
                    {form.programOption === "daily_pass" &&
                      form.dailyPassDates.length > 0 && (
                        <p>
                          <span className="text-muted-foreground">Dates:</span>{" "}
                          {form.dailyPassDates
                            .map(formatDateLabel)
                            .join(", ")}
                        </p>
                      )}
                    {amount > 0 && (
                      <p className="font-bold text-[#1a4d2e] text-base pt-1">
                        Total: {formatNaira(amount)}
                      </p>
                    )}
                    {form.programOption === "not_sure" && (
                      <p className="text-muted-foreground italic">
                        No payment required — we&apos;ll follow up with you.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(s - 1, 0))}
                  disabled={step === 0 || isProcessing}
                  className=""
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>

                {step < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#1a4d2e] hover:bg-[#1a4d2e]/90"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="btn-gradient-clean min-w-[160px]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : form.programOption === "not_sure" ? (
                      "Submit Interest"
                    ) : (
                      `Pay ${formatNaira(amount)}`
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function YesNoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: "" | "yes" | "no";
  onChange: (v: "yes" | "no") => void;
}) {
  return (
    <div>
      <Label className="mb-3 block">{label} *</Label>
      <div className="flex gap-3">
        {(["yes", "no"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
              value === opt
                ? "bg-[#1a4d2e] text-white"
                : "bg-white text-[#1a4d2e] hover:bg-[#1a4d2e]/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
