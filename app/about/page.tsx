import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Sprout } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: "Slow Down",
      description:
        "Take time to appreciate the natural rhythms around us and within us. Nature teaches us patience and presence.",
    },
    {
      icon: Heart,
      title: "Give Gratitude",
      description:
        "Acknowledge and appreciate the abundance nature provides. Gratitude deepens our connection to the earth.",
    },
    {
      icon: Sprout,
      title: "Take Responsibility",
      description: "Act as stewards of our environment. Our choices today shape the world for future generations.",
    },
  ]

  const team = [
    {
      name: "Ama Kofi",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
      bio: "Environmental scientist passionate about bringing nature into urban African spaces.",
    },
    {
      name: "Chidi Okonkwo",
      role: "Head of Experiences",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Community builder and workshop facilitator with 10 years of experience.",
    },
    {
      name: "Zainab Hassan",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Designer bringing African aesthetics and sustainable design together.",
    },
    {
      name: "Kwesi Mensah",
      role: "Head of Services",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Landscape architect specializing in urban green spaces across Africa.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden leaf-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1920&h=1080&fit=crop&crop=center"
          alt="Ekondo team working with plants"
          fill
          className="object-cover image-clean"
          priority
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">Our Story</h1>
          <p className="text-lg md:text-xl max-w-2xl text-foreground/80">
            Rooted in African creativity and growing towards a sustainable future
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-8">Who We Are</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p className="mb-6">
                Ekondo was born from a simple observation: young urban Africans were craving connection with nature in
                their increasingly concrete environments. In 2020, founder Ama Kofi started with a small pop-up shop in
                Lagos, selling handcrafted planters and teaching plant care workshops.
              </p>
              <p className="mb-6">
                What began as a passion project quickly grew into a movement. We realized that bringing nature into
                urban spaces wasn't just about plants—it was about community, creativity, sustainability, and wellness.
                Today, Ekondo serves thousands of customers across major African cities, offering products, experiences,
                services, and spaces that help people live more connected, sustainable lives.
              </p>
              <p>
                Our name, "Ekondo," comes from the Efik word meaning "to plant" or "to cultivate." It represents not
                just our work with plants, but our commitment to cultivating community, creativity, and a more
                sustainable future for Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Nature's Framework of Intention
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-md organic-shape text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 organic-shape">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-none shadow-md organic-shape overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover image-clean"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-serif text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-primary/5 leaf-pattern">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Plants Adopted" },
              { number: "5,000+", label: "Workshop Participants" },
              { number: "200+", label: "Spaces Transformed" },
              { number: "15", label: "Cities Served" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground mb-8">
              Whether you're looking to green your space, learn new skills, or connect with like-minded people, we'd
              love to have you as part of the Ekondo community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="btn-gradient organic-shape">
                <Link href="/retail">Shop Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="btn-gradient bg-transparent organic-shape">
                <Link href="/experience">Join an Experience</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
