import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const postsBySlug: Record<string, any> = {
    "low-maintenance-indoor-plants-lagos-under-20000": {
      title: "10 Low-Maintenance Indoor Plants You Can Buy in Lagos (Under ₦20,000)",
      author: "Favour",
      authorBio: "Ekondo writer and plant enthusiast.",
      authorImage: "/placeholder-user.jpg",
      date: "October 6, 2025",
      readTime: "8 min read",
      category: "Plant Care",
      image: "/images/Ekondo Products/Size_B_Spider_Plant_in_a_Red_Chidi-scaled.webp",
      content: `
        <p>Looking for affordable low-maintenance indoor plants in Lagos that thrive in Nigeria’s climate? 
        Discover 10 low-maintenance houseplants (under ₦20,000) you can buy at Ekondo Life, plus care tips and pot pairing ideas.</p>

        <p>Living in Lagos can feel fast-paced and hectic, but adding plants to your apartment or office is one of the simplest ways to create calm, beauty, and fresh air. 
        At Ekondo Life, we specialize in low-maintenance indoor plants for Nigeria, carefully chosen for their ability to adapt to Lagos’s humidity, heat, and small living spaces.</p>

        <h2>Why Low-Maintenance Plants Are Ideal for Lagos Apartments</h2>
        <ul>
          <li>Adaptable to Nigeria’s climate — handle humidity, heat, and dusty harmattan air.</li>
          <li>Beginner-friendly — easy to care for even with a busy schedule.</li>
          <li>Affordable & accessible — with options under ₦20,000, anyone can start a plant collection.</li>
          <li>Space-saving — fit perfectly into apartments, balconies, or office desks.</li>
        </ul>

        <h2>Top 10 Low-Maintenance Indoor Plants (Available at Ekondo Life)</h2>

        <h3>1. Snake Plant (Sansevieria)</h3>
        <p><strong>Light & Placement:</strong> Thrives in low to bright light. Great for corners.<br/>
        <strong>Care Tips:</strong> Water once every 2–3 weeks. Extremely drought-tolerant.<br/>
        <strong>Price at Ekondo Life:</strong> ₦15,000 – ₦25,000</p>

        <h3>2. Baby Rubber Plant (Peperomia obtusifolia)</h3>
        <p><strong>Light & Placement:</strong> Medium to bright indirect light.<br/>
        <strong>Care Tips:</strong> Water when topsoil feels dry; leaves store water.<br/>
        <strong>Price at Ekondo Life:</strong> ₦15,000 – ₦25,000</p>

        <h3>3. Peace Lily (Spathiphyllum)</h3>
        <p><strong>Light & Placement:</strong> Bright, indirect light.<br/>
        <strong>Care Tips:</strong> Water weekly. Leaves droop when thirsty — easy reminder!<br/>
        <strong>Price:</strong> ₦15,000 – ₦25,000</p>

        <h3>4. Aloe Vera</h3>
        <p><strong>Light & Placement:</strong> Sunny window spots.<br/>
        <strong>Care Tips:</strong> Water sparingly. Bonus: natural skin care benefits.<br/>
        <strong>Price:</strong> ₦15,000 – ₦25,000</p>

        <h3>5. Pothos (Golden / Marble Queen)</h3>
        <p><strong>Light & Placement:</strong> Hanging shelves or trailing from pots.<br/>
        <strong>Care Tips:</strong> Tolerates low light. Water when topsoil is dry.<br/>
        <strong>Price:</strong> ₦15,000 – ₦25,000</p>

        <h2>Care Tips for Indoor Plants in Lagos</h2>
        <ul>
          <li>Use well-draining soil and pots with holes.</li>
          <li>Rotate plants monthly so all sides get light.</li>
          <li>Wipe dust from leaves (especially during harmattan).</li>
          <li>Water less during rainy season to prevent root rot.</li>
        </ul>

        <h2>Where to Buy Indoor Plants in Lagos</h2>
        <p>You can buy all these plants directly from Ekondo Life:</p>
        <ul>
          <li><a href="https://ekondolife.com/plants/" target="_blank">Browse our Indoor Plant Collection</a></li>
          <li>Shop stylish Pots & Planters</li>
          <li>Join our Community Workshops</li>
        </ul>

        <h2>Why Indoor Plants Are Worth It</h2>
        <p>Indoor plants improve air quality, reduce stress, and bring nature closer to your home — even in a busy city like Lagos.</p>

        <h2>Conclusion</h2>
        <p>Ready to transform your Lagos apartment into a green sanctuary? Start small — pick one or two low-maintenance indoor plants, pair them with a beautiful pot, and watch your home come alive.</p>
      `,
    },
  }

  const fallback = {
    title: "The Ekondo Journal",
    author: "Ekondo",
    authorBio: "Community stories and plant wisdom.",
    authorImage: "/placeholder-user.jpg",
    date: "",
    readTime: "",
    category: "Plant Care",
    image: "/images/fine plant image.webp",
    content: `<p>Article coming soon.</p>`,
  }

  const post = postsBySlug[params.slug] ?? fallback

  return (
    <div className="flex flex-col bg-background">
      {/* Back Button */}
      <div className="container px-4 py-8">
        <Button variant="ghost" asChild className="organic-shape">
          <Link href="/journal">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journal
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden rounded-none">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>

      {/* Article Content */}
      <article className="py-16 bg-background/80">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            {/* Category */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full">
                {post.category}
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-center mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-10">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{post.date}</div>
              <span>•</span>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime}</div>
              <span>•</span>
              <div className="flex items-center gap-2"><User className="h-4 w-4" />{post.author}</div>
            </div>

            <Separator className="mb-10" />

            {/* Main Text */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-2xl prose-headings:mt-10 prose-headings:mb-4 prose-p:mb-6 prose-li:mb-2 prose-a:text-green-700 prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Separator className="my-12" />

            {/* Author Box */}
            <Card className="border-none shadow-md rounded-xl bg-muted/40">
              <CardContent className="p-6 flex gap-4 items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold">{post.author}</h3>
                  <p className="text-muted-foreground text-sm">{post.authorBio}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>
    </div>
  )
}
