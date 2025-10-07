import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "Urban Farming in African Cities",
    excerpt: "Discover how young Africans are revolutionizing urban agriculture with innovative growing techniques.",
    date: "June 2, 2025",
    category: "Urban Farming",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&crop=center",
    slug: "urban-farming-african-cities",
  },
  {
    id: 2,
    title: "Biophilic Design for African Homes",
    excerpt:
      "Learn how incorporating indigenous plants and natural elements can transform modern African living spaces.",
    date: "May 28, 2025",
    category: "Design",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    slug: "biophilic-design-african-homes",
  },
  {
    id: 3,
    title: "Traditional Plant Medicine Meets Modern Wellness",
    excerpt: "Explore how ancient African plant knowledge is being integrated into contemporary wellness practices.",
    date: "May 15, 2025",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop&crop=center",
    slug: "traditional-plant-medicine",
  },
]

export default function BlogPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden border-none shadow-md organic-shape">
          <div className="relative h-48">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded organic-shape">
                {post.category}
              </div>
              <div className="text-xs text-muted-foreground">{post.date}</div>
            </div>
            <h3 className="font-medium text-lg mb-2">{post.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
            <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
              <Link href={`/journal/${post.slug}`}>
                Read more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
