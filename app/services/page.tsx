import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, MapPin, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Plant Maintenance",
      description: "Keep your plants healthy and thriving with our expert care services.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&crop=center",
      price: "From $50/month",
      features: [
        "Weekly or bi-weekly visits",
        "Watering and feeding",
        "Pruning and pest control",
        "Health assessments",
        "Replacement guarantee",
      ],
      popular: false,
    },
    {
      id: 2,
      title: "Landscape Design & Installation",
      description: "Transform your outdoor space with custom landscape design tailored to African climates.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
      price: "From $500",
      features: [
        "Custom design consultation",
        "Native plant selection",
        "Professional installation",
        "Irrigation systems",
        "3-month maintenance included",
      ],
      popular: true,
    },
    {
      id: 3,
      title: "Indoor Plant Styling",
      description: "Professional styling services to create stunning indoor green spaces.",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop&crop=center",
      price: "From $200",
      features: [
        "Space assessment",
        "Plant selection and sourcing",
        "Pot and planter curation",
        "Professional placement",
        "Care instructions",
      ],
      popular: false,
    },
    {
      id: 4,
      title: "Corporate Green Spaces",
      description: "Enhance your workplace with biophilic design that boosts productivity and wellness.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center",
      price: "Custom Quote",
      features: [
        "Workspace analysis",
        "Biophilic design plan",
        "Installation and setup",
        "Ongoing maintenance",
        "Employee wellness workshops",
      ],
      popular: false,
    },
    {
      id: 5,
      title: "Garden Consultation",
      description: "Get expert advice on planning and maintaining your garden.",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop&crop=center",
      price: "From $100/session",
      features: [
        "Site visit and assessment",
        "Personalized recommendations",
        "Plant and material suggestions",
        "Maintenance schedule",
        "Follow-up support",
      ],
      popular: false,
    },
    {
      id: 6,
      title: "Vertical Garden Installation",
      description: "Maximize your space with beautiful living walls and vertical gardens.",
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&h=400&fit=crop&crop=center",
      price: "From $400",
      features: [
        "Custom design",
        "Structural assessment",
        "Irrigation system setup",
        "Plant installation",
        "Maintenance training",
      ],
      popular: false,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden leaf-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&crop=center"
          alt="Professional landscaping services"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">Professional Services</h1>
          <p className="text-lg md:text-xl max-w-2xl text-foreground/80">
            Transform your spaces with expert plant care, design, and landscaping services
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`border-none shadow-md organic-shape overflow-hidden ${
                  service.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {service.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="relative h-48">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full organic-shape">
                    <Link href={`/services/${service.id}`}>Book Service</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Where We Serve</h2>
              <p className="text-muted-foreground">We provide services across major African cities</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Lagos, Nigeria",
                "Accra, Ghana",
                "Nairobi, Kenya",
                "Cape Town, South Africa",
                "Addis Ababa, Ethiopia",
                "Kigali, Rwanda",
              ].map((city, index) => (
                <Card key={index} className="border-none shadow-md organic-shape">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{city}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Don't see your city? We're expanding!</p>
              <Button variant="outline" asChild className="organic-shape bg-transparent">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Book Consultation",
                description: "Schedule a free consultation to discuss your needs and vision.",
              },
              {
                step: "2",
                title: "Get Custom Quote",
                description: "Receive a detailed proposal and pricing tailored to your space.",
              },
              {
                step: "3",
                title: "Professional Service",
                description: "Our expert team delivers quality work on schedule.",
              },
              {
                step: "4",
                title: "Ongoing Support",
                description: "Enjoy continued care and support for lasting results.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 organic-shape">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 leaf-pattern">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-muted-foreground mb-8">
              Book a free consultation with our expert team to discuss your project
            </p>
            <Button size="lg" asChild className="organic-shape">
              <Link href="/contact">
                Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
