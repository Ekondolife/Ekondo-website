import { Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"

export default function RetailPage() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Handwoven Basket Planter",
      description: "Traditional African weaving",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center",
      category: "Pots",
      featured: true,
      discount: 10,
    },
    {
      id: 2,
      name: "Ceramic Plant Pot - Terracotta",
      description: "Locally crafted ceramic",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center",
      category: "Pots",
      featured: false,
    },
    {
      id: 3,
      name: "Succulent Collection",
      description: "Drought-resistant plants",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=400&fit=crop&crop=center",
      category: "Plants",
      featured: false,
      newArrival: true,
    },
    {
      id: 4,
      name: "Bamboo Plant Stand",
      description: "Sustainable bamboo design",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      category: "Accessories",
      featured: true,
    },
    {
      id: 5,
      name: "Hanging Planter Set",
      description: "Set of 3 macramé planters",
      price: 44.99,
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=400&fit=crop&crop=center",
      category: "Pots",
      featured: false,
    },
    {
      id: 6,
      name: "African Violet Plant",
      description: "Indoor flowering plant",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=center",
      category: "Plants",
      featured: false,
      newArrival: true,
    },
    {
      id: 7,
      name: "Watering Can - Copper",
      description: "Handcrafted copper finish",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center",
      category: "Tools",
      featured: false,
    },
    {
      id: 8,
      name: "Plant Food Organic Set",
      description: "Natural plant nutrition",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1616627188467-fac8d174d157?w=400&h=400&fit=crop&crop=center",
      category: "Tools",
      featured: false,
    },
    {
      id: 9,
      name: "Monstera Deliciosa",
      description: "Large tropical plant",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=400&fit=crop&crop=center",
      category: "Plants",
      featured: true,
    },
    {
      id: 10,
      name: "Clay Pot Trio",
      description: "Set of 3 terracotta pots",
      price: 54.99,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center",
      category: "Pots",
      featured: false,
      discount: 15,
    },
    {
      id: 11,
      name: "LED Grow Light",
      description: "Full spectrum plant light",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      category: "Lighting",
      featured: false,
      newArrival: true,
    },
    {
      id: 12,
      name: "Potting Mix - Organic",
      description: "Premium soil blend",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center",
      category: "Tools",
      featured: false,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 orange-gradient-strong overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-50"></div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 organic-shape-soft bg-orange/20 text-orange-foreground border-orange">
              New Collection
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Handcrafted for <span className="text-primary">Nature</span> Lovers
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discover our curated collection of sustainable planters, tools, and accessories handmade by African
              artisans.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="organic-shape btn-gradient">
                Shop Best Sellers
              </Button>
              <Button size="lg" variant="outline" className="organic-shape bg-background">
                View New Arrivals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">All Products</h2>
              <p className="text-muted-foreground">Handcrafted with love and care</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden organic-shape bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>Narrow down your product search</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      {["Pots", "Plants", "Lighting", "Accessories", "Tools"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={`category-mobile-${category}`} />
                          <Label htmlFor={`category-mobile-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="space-y-2">
                      {["Under $25", "$25 - $50", "$50 - $100", "Over $100"].map((range) => (
                        <div key={range} className="flex items-center space-x-2">
                          <Checkbox id={`price-mobile-${range}`} />
                          <Label htmlFor={`price-mobile-${range}`}>{range}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select defaultValue="featured">
                <SelectTrigger className="w-full md:w-[180px] organic-shape">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="sticky top-24">
                <Card className="border-none shadow-md organic-shape orange-gradient">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Filters</h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Categories</h4>
                        <div className="space-y-2">
                          {["Pots", "Plants", "Lighting", "Accessories", "Tools"].map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox id={`category-${category}`} />
                              <Label htmlFor={`category-${category}`} className="text-sm">
                                {category}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-3">Price Range</h4>
                        <div className="space-y-2">
                          {["Under $25", "$25 - $50", "$50 - $100", "Over $100"].map((range) => (
                            <div key={range} className="flex items-center space-x-2">
                              <Checkbox id={`price-${range}`} />
                              <Label htmlFor={`price-${range}`} className="text-sm">
                                {range}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-3">Special Offers</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="on-sale" />
                            <Label htmlFor="on-sale" className="text-sm">
                              On Sale
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="new-arrivals" />
                            <Label htmlFor="new-arrivals" className="text-sm">
                              New Arrivals
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden border-none shadow-md card-organic organic-shape">
                    <Link href={`/retail/product/${product.id}`} className="relative block aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover image-clean transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.discount && (
                        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground organic-shape-soft">
                          -{product.discount}%
                        </Badge>
                      )}
                      {product.newArrival && (
                        <Badge className="absolute top-3 right-3 bg-orange text-orange-foreground organic-shape-soft">
                          New
                        </Badge>
                      )}
                      {product.featured && !product.discount && !product.newArrival && (
                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground organic-shape-soft">
                          Featured
                        </Badge>
                      )}
                    </Link>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs organic-shape-soft">
                          {product.category}
                        </Badge>
                      </div>
                      <Link href={`/retail/product/${product.id}`}>
                        <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-1">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          {product.discount ? (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg text-primary">
                                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <AddToCartButton
                          product={product}
                          size="sm"
                          variant="outline"
                          className="organic-shape btn-gradient"
                        />
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
                  <Button size="sm" className="organic-shape btn-gradient">
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
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t orange-gradient">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Free Shipping", value: "Orders $75+" },
              { label: "Secure Payment", value: "100% Protected" },
              { label: "Easy Returns", value: "30 Days" },
              { label: "Support", value: "24/7 Help" },
            ].map((item, index) => (
              <div key={index}>
                <div className="font-bold text-lg mb-1">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
