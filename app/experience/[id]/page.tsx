import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  // This would normally fetch experience data based on the ID
  const experience = {
    id: params.id,
    title: "Plant Styling Masterclass",
    description:
      "Learn the art of plant styling and create stunning arrangements for your home. This hands-on workshop covers plant selection, pot pairing, arrangement techniques, and care tips.",
    longDescription: `Join us for an immersive 2-hour workshop where you'll discover the secrets of professional plant styling. Whether you're decorating a small apartment or a large home, you'll learn how to create beautiful, sustainable plant displays that thrive.

    Our expert instructors will guide you through the fundamentals of biophilic design, teaching you how to select plants that complement your space and lifestyle. You'll also learn about the cultural significance of plants in African traditions and how to incorporate these elements into modern design.

    This workshop is perfect for beginners and plant enthusiasts alike. All materials are provided, and you'll take home your own styled plant arrangement.`,
    instructor: "Zainab Hassan",
    instructorBio: "Creative Director at Ekondo with 10 years of experience in biophilic design.",
    instructorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    date: "June 15, 2025",
    time: "2:00 PM - 4:00 PM",
    duration: "2 hours",
    location: "Ekondo Park Lagos",
    address: "123 Victoria Island, Lagos, Nigeria",
    price: 45,
    capacity: 12,
    spotsLeft: 3,
    type: "Workshop",
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1616627188467-fac8d174d157?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop&crop=center",
    ],
    included: [
      "All materials and plants",
      "Professional instruction",
      "Take-home plant arrangement",
      "Care guide and tips",
      "Refreshments",
      "Certificate of completion",
    ],
    whatToBring: ["Comfortable clothing", "Notebook (optional)", "Camera for photos"],
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
            <Image src={experience.image || "/placeholder.svg"} alt={experience.title} fill className="object-cover" />
          </div>

          {/* Booking Card */}
          <Card className="border-none shadow-lg organic-shape h-fit sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded organic-shape">
                  {experience.type}
                </div>
                <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded organic-shape">
                  {experience.level}
                </div>
              </div>

              <h1 className="font-serif text-3xl font-bold mb-4">{experience.title}</h1>

              <div className="text-3xl font-bold text-primary mb-6">${experience.price}</div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{experience.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{experience.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{experience.location}</div>
                    <div className="text-sm text-muted-foreground">{experience.address}</div>
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
                Book Now - ${experience.price}
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

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            {/* Description */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">About This Experience</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {experience.longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            <Separator className="mb-12" />

            {/* What's Included */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {experience.included.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="mb-12" />

            {/* What to Bring */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">What to Bring</h2>
              <ul className="space-y-2">
                {experience.whatToBring.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="mb-12" />

            {/* Instructor */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Meet Your Instructor</h2>
              <Card className="border-none shadow-md organic-shape">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 organic-shape">
                      <Image
                        src={experience.instructorImage || "/placeholder.svg"}
                        alt={experience.instructor}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-1">{experience.instructor}</h3>
                      <p className="text-muted-foreground">{experience.instructorBio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gallery */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {experience.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden organic-shape">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 leaf-pattern">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-muted-foreground mb-8">
              Secure your spot in this popular workshop. Limited spaces available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="organic-shape">
                Book Now - ${experience.price}
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
