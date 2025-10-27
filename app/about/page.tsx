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
      image: "/images/girl.jpeg",
      bio: "Environmental scientist passionate about bringing nature into urban African spaces.",
    },
    {
      name: "Chidi Okonkwo",
      role: "Head of Experiences",
      image: "/images/man.jpeg",
      bio: "Community builder and workshop facilitator with 10 years of experience.",
    },
    {
      name: "Zainab Hassan",
      role: "Creative Director",
      image: "/images/girl2.jpeg",
      bio: "Designer bringing African aesthetics and sustainable design together.",
    },
    {
      name: "Kwesi Mensah",
      role: "Head of Services",
      image: "/images/man2.jpg",
      bio: "Landscape architect specializing in urban green spaces across Africa.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden leaf-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <Image
          src="/images/group pic.JPG"
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
              In the Efik language (the 4th most popular language in Nigeria),
              Ekondo means community—the cornerstone of our identity. We are a
              lifestyle brand promoting environmental sustainability and wellness
              through nature and community.              
              Our vision is Nature for everyone. That’s why it’s our goal to make
              Africans happier, kinder, and more creative by connecting them to
              Nature, themselves, and other people. We are relentless about
              bringing Nature into every space, transforming waste into wellness
              products, and cultivating a passionate community around Nature.
              </p>
              <p className="mb-6">
              Our core values as a team and community are driven by The
              Framework of Nature. Drawing inspiration from plants, Nature’s
              Framework guides us to slow down, give gratitude, and take
              responsibility.
              It encourages us to be flexible, resilient, collaborative, and
              communicative in our approach towards enhancing the mindset and
              quality of life for Africans.
              From artistic pots and wellness products to educational games, our
              creations emerge from upcycled materials like plastics, bottles, and
              tires. Customizable for different audiences and occasions, our
              products bridge the gap between aesthetics and purpose.
              Our diverse team of designers and engineers enables us to cater to
              businesses, connecting people to Nature through plant installations
              and unique bonding experiences.
              </p>
              <p>
              Ekondo is a social impact company driven by a collective vision to build 
              a greener, kinder, happier, and more creative Africa. we believe in the power
              of conscious living, community, and sustainability as essential tools for shaping a better future. 
              Our work is rooted in a deep commitment to the well-being of both people 
              and the planet, with a focus on creating meaningful, lasting impact 
              across the continent. At Ekondo, our mission is guided by 8 of the United 
              Nations Sustainable Development Goals (SDGs), which shape our approach 
              to economic empowerment, environmental stewardship, and social innovation. 
              From promoting sustainable lifestyles to supporting local artisans and producers, 
              we are passionate about nurturing a culture that thrives on responsibility, creativity, and connection.
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
