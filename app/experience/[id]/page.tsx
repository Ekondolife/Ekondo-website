"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { experiences } from "@/lib/experiences-data"

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const experienceId = Number(params.id)

  const experience = useMemo(() => experiences.find(exp => exp.id === experienceId), [experienceId])

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
    <div className="flex flex-col">
      {/* Back Button */}
      <div className="container px-4 py-8">
        <Button variant="ghost" asChild className="organic-shape">
          <Link href="/experience">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Experiences
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="container px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden organic-shape">
            <Image
              src={experience.image || "/placeholder.svg"}
              alt={experience.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Booking Card */}
          <Card className="border-none shadow-lg organic-shape h-fit sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded organic-shape">
                  {experience.type}
                </div>
                <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded organic-shape">
                  {experience.date}
                </div>
              </div>

              <h1 className="font-serif text-3xl font-bold mb-4">{experience.title}</h1>

              <div className="text-3xl font-bold text-primary mb-6">
                ₦{experience.price.toLocaleString()}
              </div>

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
                <div className="bg-destructive/10 text-destructive p-3 rounded organic-shape mb-6 text-sm font-medium text-center">
                  Only {experience.spotsLeft} spots remaining!
                </div>
              )}

              <Button size="lg" className="w-full organic-shape mb-3">
                Book Now - ₦{experience.price.toLocaleString()}
              </Button>

              <Button variant="outline" size="lg" className="w-full organic-shape bg-transparent">
                Gift This Experience
              </Button>

              <Separator className="my-6" />

              <div className="text-sm text-muted-foreground text-center">
                Free cancellation up to 24 hours before the event
              </div>
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
              {experience.description}
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
              <Button size="lg" className="organic-shape">
                Book Now - ₦{experience.price.toLocaleString()}
              </Button>
              <Button size="lg" variant="outline" asChild className="organic-shape bg-transparent">
                <Link href="/experience">Browse More Experiences</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
