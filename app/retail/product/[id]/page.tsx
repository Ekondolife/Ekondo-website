import { Heart, Leaf, Minus, Plus, ShoppingBag, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // This would normally fetch product data based on the ID
  const product = {
    id: params.id,
    name: "Terracotta Plant Pot",
    description: "Handcrafted terracotta pot with a natural finish, perfect for indoor plants.",
    longDescription:
      "Our Terracotta Plant Pot is handcrafted by skilled artisans using traditional techniques. Made from high-quality clay sourced from sustainable suppliers, each pot has unique characteristics that make it one-of-a-kind. The natural terracotta material allows your plants to breathe, preventing root rot and promoting healthy growth. The simple, timeless design complements any interior style, from minimalist to bohemian.",
    price: 49.99,
    images: [
      "/placeholder.svg?height=600&width=600&text=Product+Image+1",
      "/placeholder.svg?height=600&width=600&text=Product+Image+2",
      "/placeholder.svg?height=600&width=600&text=Product+Image+3",
      "/placeholder.svg?height=600&width=600&text=Product+Image+4",
    ],
    category: "Pots",
    material: "Terracotta",
    dimensions: '8" diameter x 7" height',
    weight: "2.5 lbs",
    care: "Wipe with a damp cloth. Avoid harsh chemicals.",
    inStock: true,
    relatedProducts: [
      {
        id: "2",
        name: "Ceramic Vase",
        price: 39.99,
        image: "/placeholder.svg?height=300&width=300&text=Related+1",
      },
      {
        id: "3",
        name: "Hanging Planter",
        price: 29.99,
        image: "/placeholder.svg?height=300&width=300&text=Related+2",
      },
      {
        id: "4",
        name: "Bamboo Plant Stand",
        price: 59.99,
        image: "/placeholder.svg?height=300&width=300&text=Related+3",
      },
    ],
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="w-full lg:w-3/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className={`relative ${index === 0 ? "md:col-span-2" : ""}`}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={600}
                  height={600}
                  className="rounded-lg object-cover aspect-square"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-2/5">
          <div className="sticky top-24">
            <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded inline-block mb-4">
              {product.category}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

            <div className="text-2xl font-bold mb-4">${product.price}</div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="rounded-none">
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-12 text-center">1</span>
                <Button variant="ghost" size="icon" className="rounded-none">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>

              <Button size="lg" className="flex-1">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Leaf className="h-4 w-4 text-primary" />
                <span>Sustainably sourced materials</span>
              </div>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="care">Care</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span>{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span>{product.weight}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="care" className="mt-4">
                <p className="text-sm text-muted-foreground">{product.care}</p>
              </TabsContent>

              <TabsContent value="shipping" className="mt-4">
                <div className="space-y-2 text-sm">
                  <p>Standard shipping: 3-5 business days</p>
                  <p>Express shipping: 1-2 business days</p>
                  <p>Free shipping on orders over $75</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-16">
        <h2 className="font-serif text-2xl font-bold mb-4">About This Product</h2>
        <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="font-serif text-2xl font-bold mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden border-none shadow-md">
              <Link href={`/retail/product/${relatedProduct.id}`} className="relative block aspect-square">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <CardContent className="p-4">
                <Link href={`/retail/product/${relatedProduct.id}`}>
                  <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h3>
                </Link>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${relatedProduct.price}</span>
                  <Button size="sm" variant="outline">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
