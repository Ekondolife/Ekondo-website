"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function JournalPage() {
  const featuredPost = {
    title: "10 Low-Maintenance Indoor Plants You Can Buy in Lagos (Under ₦20,000)",
    excerpt:
      "Looking for affordable low-maintenance indoor plants in Lagos that thrive in Nigeria’s climate? Discover 10 low-maintenance houseplants (under ₦20,000)…",
    author: "Favour",
    date: "October 6, 2025",
    readTime: "6 min read",
    category: "Plant Care",
    image: "/images/Ekondo Products/Size_B_Spider_Plant_in_a_Red_Chidi-scaled.webp",
    slug: "low-maintenance-indoor-plants-lagos-under-20000",
  }

  const posts = [
    {
      title: "DETERMINING THE RIGHT LIGHT OF YOUR SPACE FOR YOUR PLANT.",
      excerpt:
        "This article helps you evaluate light conditions so you can place your plants where they will flourish.",
      author: "Favour",
      date: "August 20, 2025",
      readTime: "5 min read",
      category: "Plant Care",
      image: "/images/fine plant image.webp",
      slug: "determining-right-light-for-your-plant",
    },
    {
      title: "5 essential tips for keeping your plants alive",
      excerpt:
        "Embarking on your journey as a plant parent can be exciting—start here with five essential tips to keep your plants thriving.",
      author: "Favour",
      date: "August 20, 2025",
      readTime: "4 min read",
      category: "Plant Care",
      image: "/images/sans img.jpg",
      slug: "essential-tips-for-keeping-plants-alive",
    },
    {
      title: "EKONDO- COMMUNITY HERALDING CONTENTMENT",
      excerpt:
        "A heartfelt look at how Ekondo fosters contentment and togetherness through community and creativity.",
      author: "Favour",
      date: "August 20, 2025",
      readTime: "6 min read",
      category: "Community",
      image: "/images/two women.JPG",
      slug: "ekondo-community-heralding-contentment",
    },
  ]

  const categories = ["All", "Plant Care", "Community", "Urban Farming", "Design", "Wellness", "Sustainability"]

  const [activeCategory, setActiveCategory] = useState<string>("All")

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts
    return posts.filter((p) => p.category === activeCategory)
  }, [posts, activeCategory])

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
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className="organic-shape"
                  onClick={() => setActiveCategory(category)}
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
            {filteredPosts.map((post) => (
              <Card key={post.slug} className="border-none shadow-md organic-shape overflow-hidden group h-full">
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
                <CardContent className="p-6 flex flex-col h-full">
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
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
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
                  <div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                      <Link href={`/journal/${post.slug}`}>
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
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
