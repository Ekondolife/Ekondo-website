import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "10 Low-Maintenance Indoor Plants You Can Buy in Lagos (Under ₦20,000)",
    excerpt:
      "Looking for affordable low-maintenance indoor plants in Lagos that thrive in Nigeria’s climate? Discover 10 options under ₦20,000.",
    date: "October 6, 2025",
    category: "Plant Care",
    image: "/images/Ekondo Products/Size_B_Spider_Plant_in_a_Red_Chidi-scaled.webp",
    slug: "low-maintenance-indoor-plants-lagos-under-20000",
  },
  {
    id: 2,
    title: "DETERMINING THE RIGHT LIGHT OF YOUR SPACE FOR YOUR PLANT.",
    excerpt:
      "Understand how to assess light in your space so your plant thrives with the right placement and care.",
    date: "August 20, 2025",
    category: "Plant Care",
    image: "/images/fine plant image.webp",
    slug: "determining-right-light-for-your-plant",
  },
  {
    id: 3,
    title: "5 essential tips for keeping your plants alive",
    excerpt:
      "New to plant care? Start with these five essential, practical tips to keep your plants healthy.",
    date: "August 20, 2025",
    category: "Plant Care",
    image: "/images/sans img.jpg",
    slug: "essential-tips-for-keeping-plants-alive",
  },
  {
    id: 4,
    title: "EKONDO- COMMUNITY HERALDING CONTENTMENT",
    excerpt:
      "A reflection on community, creativity, and contentment at Ekondo—moments that bring people together.",
    date: "August 20, 2025",
    category: "Community",
    image: "/images/two women.JPG",
    slug: "ekondo-community-heralding-contentment",
  },
]

export default function BlogPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogPosts.slice(0, 3).map((post) => (
       <Card key={post.id} className="overflow-visible border-none shadow-md organic-shape min-h-[460px]">
       <div className="relative h-72 organic-shape">
         <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
       </div>
       <CardContent className="p-6 flex flex-col h-auto">
         <div className="flex items-center gap-2 mb-2">
           <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded organic-shape">
             {post.category}
           </div>
           <div className="text-xs text-muted-foreground">{post.date}</div>
         </div>
         <h3 className="font-medium text-lg mb-2">{post.title}</h3>
         <p className="text-muted-foreground text-sm mb-4 flex-1">{post.excerpt}</p>
          <div className="mt-auto">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 transition-all duration-300 rounded-md hover:px-3 hover:bg-primary/10 text-white hover:text-white"
              asChild
            >
             <Link href={`/journal/${post.slug}`}>
               Read more <ArrowRight className="ml-1 h-4 w-4" />
             </Link>
           </Button>
         </div>
       </CardContent>
     </Card>
     
      ))}
    </div>
  )
}
