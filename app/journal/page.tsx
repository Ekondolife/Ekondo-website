"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import NewsletterSignup from "@/components/newsletter-signup"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function JournalPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      gsap.from([".js-hero-title", ".js-hero-sub"], {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      })

      // Section titles
      gsap.utils.toArray<HTMLElement>(".js-section-title").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        })
      })

      // Cards
      gsap.utils.toArray<HTMLElement>(".js-card").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0, filter: "blur(6px)" },
          {
            scrollTrigger: { trigger: el, start: "top 92%" },
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          }
        )
      })

      // Hover lift
      const lift = (selector: string) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.addEventListener("mouseenter", () => {
            gsap.to(el, { y: -2, scale: 1.02, duration: 0.25, ease: "power2.out" })
          })
          el.addEventListener("mouseleave", () => {
            gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" })
          })
        })
      }
      lift(".js-hover, .js-card")
    })
    return () => ctx.revert()
  }, [])

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

  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const perPage = 3

  const filteredPosts = useMemo(() => {
    let result = posts
    if (activeCategory !== "All") result = result.filter((p) => p.category === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          (p.author && p.author.toLowerCase().includes(q))
      )
    }
    return result
  }, [posts, activeCategory, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / perPage))
  const startIdx = (currentPage - 1) * perPage
  const paginatedPosts = filteredPosts.slice(startIdx, startIdx + perPage)

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6 js-hero-title">The Ekondo Journal</h1>
            <p className="text-lg md:text-xl text-muted-foreground js-hero-sub">
              Stories, insights, and inspiration for sustainable living in urban Africa
            </p>
          </div>

          {/* Featured Post */}
          <Card className="border-none shadow-lg overflow-hidden max-w-5xl mx-auto js-card">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-16 flex flex-col justify-center">
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
                <Button asChild className="js-hover">
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
              <Input placeholder="Search articles..."  value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className="js-hover"
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
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-12 js-section-title">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <Card key={post.slug} className="border-none shadow-md overflow-hidden group h-full max-w-[95vw] w-full mx-auto  js-card js-hover">
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
                    <Button variant="ghost" size="sm" className="p-0 h-auto js-hover" asChild>
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
              <Button
                variant="outline"
                size="sm"
                className="organic-shape bg-transparent js-hover"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="organic-shape js-hover"
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="organic-shape bg-transparent js-hover"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 js-section-title">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles, tips, and inspiration delivered to your inbox
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  )
}
