import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // This would normally fetch the post based on the slug
  const post = {
    title: "The Rise of Urban Farming in African Cities",
    author: "Ama Kofi",
    authorBio: "Founder & CEO of Ekondo. Environmental scientist passionate about urban sustainability.",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face",
    date: "June 5, 2025",
    readTime: "8 min read",
    category: "Urban Farming",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop&crop=center",
    content: `
      <p>Urban farming is transforming the landscape of African cities. From Lagos to Nairobi, young Africans are reclaiming rooftops, balconies, and unused spaces to grow food and create sustainable urban ecosystems.</p>

      <p>This movement isn't just about food production—it's about reimagining our relationship with the environment, building community resilience, and creating sustainable solutions for rapidly growing cities.</p>

      <h2>Why Urban Farming Matters in Africa</h2>

      <p>With Africa's urban population expected to triple by 2050, cities are facing unprecedented challenges in food security, environmental sustainability, and community well-being. Urban farming offers innovative solutions to these complex issues.</p>

      <p>Studies show that urban agriculture can provide up to 15% of food needs in major African cities while reducing the carbon footprint of food transportation and improving air quality in dense urban areas.</p>

      <h2>Success Stories Across the Continent</h2>

      <p>In Lagos, community rooftop gardens are producing fresh vegetables for hundreds of families while creating green jobs for young people. These spaces have become hubs for environmental education and community gathering.</p>

      <p>Nairobi's vertical farming initiatives are showing how technology and tradition can merge to create efficient food production systems adapted to urban constraints. Young entrepreneurs are using hydroponics and vertical growing systems to maximize limited space.</p>

      <h2>Getting Started with Urban Farming</h2>

      <p>You don't need acres of land to start urban farming. Begin with container gardens on your balcony, or join a community garden initiative. Many cities now have programs supporting urban agriculture through land access, resources, and training.</p>

      <p>Start small with herbs and leafy greens, which are forgiving for beginners and provide quick harvests. As you gain confidence, expand to vegetables and fruits suited to your climate.</p>

      <h2>Challenges and Solutions</h2>

      <p>Urban farming in Africa faces unique challenges: limited water access, soil contamination, and space constraints. However, innovative farmers are developing solutions using rainwater harvesting, container growing, and companion planting techniques.</p>

      <p>Climate-smart agriculture practices are being adapted for urban contexts, helping farmers work with natural systems rather than against them. This includes using indigenous plants that are naturally adapted to local conditions.</p>

      <h2>The Future of Urban Farming</h2>

      <p>As technology becomes more accessible, we're seeing exciting innovations in urban agriculture. Mobile apps help farmers optimize growing conditions, connect with markets, and share knowledge across the continent.</p>

      <p>The future of African cities is green—not just in rhetoric, but in practice. Urban farming is proving that sustainability, food security, and community building can grow together, one garden at a time.</p>
    `,
  }

  const relatedPosts = [
    {
      title: "10 Low-Maintenance Plants for Busy Urban Professionals",
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop&crop=center",
      slug: "low-maintenance-plants",
    },
    {
      title: "Creating Community Gardens in Urban Africa",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop&crop=center",
      slug: "community-gardens",
    },
    {
      title: "Sustainable Living: Small Changes, Big Impact",
      image: "https://images.unsplash.com/photo-1616627188467-fac8d174d157?w=400&h=300&fit=crop&crop=center",
      slug: "sustainable-living-tips",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <div className="container px-4 py-8">
        <Button variant="ghost" asChild className="organic-shape">
          <Link href="/journal">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journal
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            {/* Category Badge */}
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded organic-shape">
                {post.category}
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-center mb-6">{post.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex justify-center mb-12">
              <Button variant="outline" size="sm" className="organic-shape bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>

            <Separator className="mb-12" />

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: "1.8",
              }}
            />

            <Separator className="mb-12" />

            {/* Author Bio */}
            <Card className="border-none shadow-md organic-shape">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 organic-shape">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-1">{post.author}</h3>
                    <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 md:py-24 leaf-pattern-dense">
        <div className="container px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {relatedPosts.map((relatedPost, index) => (
              <Card key={index} className="border-none shadow-md organic-shape overflow-hidden group">
                <Link href={`/journal/${relatedPost.slug}`}>
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/journal/${relatedPost.slug}`}>
                    <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
