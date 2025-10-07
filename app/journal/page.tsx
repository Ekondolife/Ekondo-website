import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function JournalPage() {
  const featuredPost = {
    title: "The Rise of Urban Farming in African Cities",
    excerpt:
      "How young Africans are transforming rooftops, balconies, and empty lots into thriving food gardens, creating sustainable food systems in the heart of our cities.",
    author: "Ama Kofi",
    date: "June 5, 2025",
    readTime: "8 min read",
    category: "Urban Farming",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop&crop=center",
    slug: "urban-farming-african-cities",
  }

  const posts = [
    {
      title: "10 Low-Maintenance Plants for Busy Urban Professionals",
      excerpt: "Discover hardy plants that thrive with minimal care, perfect for Lagos, Nairobi, and Accra climates.",
      author: "Chidi Okonkwo",
      date: "June 2, 2025",
      readTime: "5 min read",
      category: "Plant Care",
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&h=400&fit=crop&crop=center",
      slug: "low-maintenance-plants",
    },
    {
      title: "Biophilic Design: Traditional African Wisdom Meets Modern Spaces",
      excerpt: "How ancient African building practices are inspiring contemporary green architecture.",
      author: "Zainab Hassan",
      date: "May 28, 2025",
      readTime: "7 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
      slug: "biophilic-design-african-homes",
    },
    {
      title: "The Healing Power of African Indigenous Plants",
      excerpt: "Exploring traditional plant medicine and its integration into modern wellness practices.",
      author: "Kwesi Mensah",
      date: "May 25, 2025",
      readTime: "6 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop&crop=center",
      slug: "traditional-plant-medicine",
    },
    {
      title: "Creating Community Gardens in Urban Africa",
      excerpt: "Success stories and practical guides for starting community gardens in your neighborhood.",
      author: "Ama Kofi",
      date: "May 20, 2025",
      readTime: "9 min read",
      category: "Community",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop&crop=center",
      slug: "community-gardens",
    },
    {
      title: "Sustainable Living: Small Changes, Big Impact",
      excerpt: "Practical tips for reducing your environmental footprint while living in African cities.",
      author: "Zara Mwangi",
      date: "May 15, 2025",
      readTime: "5 min read",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1616627188467-fac8d174d157?w=600&h=400&fit=crop&crop=center",
      slug: "sustainable-living-tips",
    },
    {
      title: "Plant Styling Tips from African Interior Designers",
      excerpt: "How to incorporate plants into your home décor with African aesthetic sensibilities.",
      author: "Chidi Okonkwo",
      date: "May 10, 2025",
      readTime: "6 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop&crop=center",
      slug: "plant-styling-tips",
    },
  ]

  const categories = ["All", "Urban Farming", "Plant Care", "Design", "Wellness", "Community", "Sustainability"]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 leaf-pattern">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">The Ekondo Journal</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Stories, insights, and inspiration for sustainable living in urban Africa
            </p>
          </div>

          {/* Featured Post */}
          <Card className="border-none shadow-lg organic-shape overflow-hidden max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded organic-shape">
                    Featured
                  </div>
                  <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded organic-shape">
                    {featuredPost.category}
                  </div>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button asChild className="organic-shape">
                  <Link href={`/journal/${featuredPost.slug}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-96">
              <Input placeholder="Search articles..." className="organic-shape" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="organic-shape"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-12">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="border-none shadow-md organic-shape overflow-hidden group">
                <Link href={`/journal/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </Link>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded organic-shape">
                      {post.category}
                    </div>
                  </div>
                  <Link href={`/journal/${post.slug}`}>
                    <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                    <Link href={`/journal/${post.slug}`}>
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="organic-shape bg-transparent">
                Previous
              </Button>
              <Button variant="default" size="sm" className="organic-shape">
                1
              </Button>
              <Button variant="outline" size="sm" className="organic-shape bg-transparent">
                2
              </Button>
              <Button variant="outline" size="sm" className="organic-shape bg-transparent">
                3
              </Button>
              <Button variant="outline" size="sm" className="organic-shape bg-transparent">
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-primary/5 leaf-pattern">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles, tips, and inspiration delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="bg-background organic-shape" />
              <Button className="organic-shape">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
