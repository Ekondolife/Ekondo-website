"use client"

import { Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  // Real Ekondo product data with Naira pricing
  const products = [
    // Plants
    {
      id: 1,
      name: "Baby Rubber Plant",
      description: "Size B in Purple Chidi pot",
      price: 25000, // Plants in Chidi pots are 25k
      image: "/images/Ekondo Products/Size_B_Baby_Rubber_in_a_Purple_Chidi-scaled.webp",
      category: "Plants",
      featured: true,
    },
    {
      id: 2,
      name: "Aglaonema Plant",
      description: "Beautiful foliage in Blue Mide pot",
      price: 25000, // Plants in Mide pots are 25k
      image: "/images/Ekondo Products/Aglaonema__Blue_Mide-scaled.webp",
      category: "Plants",
      featured: true,
    },
    {
      id: 3,
      name: "Sansevieria Plant",
      description: "Yellow and Green in Green Edak pot",
      price: 15000, // Plants in Edak pots are 15k
      image: "/images/Ekondo Products/Size_A_Yellow_and_Green_san_in_Green_Edak-scaled.webp",
      category: "Plants",
      featured: false,
      newArrival: true,
    },
    {
      id: 4,
      name: "Sansevieria Plant",
      description: "Yellow and Green in Yellow Mide pot",
      price: 25000, // Plants in Mide pots are 25k
      image: "/images/Ekondo Products/Size_B_Yellow_and_Green_san_in_a_Yellow_Mide-scaled.webp",
      category: "Plants",
      featured: false,
    },
    {
      id: 5,
      name: "Spider Plant",
      description: "Size B in Red Chidi pot",
      price: 25000, // Plants in Chidi pots are 25k
      image: "/images/Ekondo Products/Size_B_Spider_Plant_in_a_Red_Chidi-scaled.webp",
      category: "Plants",
      featured: false,
    },
    {
      id: 6,
      name: "Syngonium Plant",
      description: "Brown variety in Murna pot",
      price: 20000, // Plants in Murna pots are 20k
      image: "/images/Ekondo Products/Syngonium__Brown_Murna-scaled.webp",
      category: "Plants",
      featured: false,
      newArrival: true,
    },
    // Pots
    {
      id: 7,
      name: "Blue Chidi Pot",
      description: "Handcrafted ceramic planter",
      price: 15000, // Chidi pots are 15k
      image: "/images/Ekondo Products/Blue-Chidi.webp",
      category: "Pots",
      featured: true,
    },
    {
      id: 8,
      name: "Yellow Edak Pot",
      description: "Traditional African design",
      price: 9000, // Edak pots are 9k
      image: "/images/Ekondo Products/Yellow-Edak-1-scaled.webp",
      category: "Pots",
      featured: true,
    },
    {
      id: 9,
      name: "Blue Mini Edak Pot",
      description: "Compact ceramic planter",
      price: 5000, // All mini pots are 5k
      image: "/images/Ekondo Products/Blue-Mini-Edak.webp",
      category: "Pots",
      featured: false,
    },
    {
      id: 10,
      name: "Green Mini Murna Pot",
      description: "Small green ceramic pot",
      price: 5000, // All mini pots are 5k
      image: "/images/Ekondo Products/Green-Mini-Murna-scaled.webp",
      category: "Pots",
      featured: false,
    },
    {
      id: 11,
      name: "Orange Mini Mide Pot",
      description: "Vibrant orange ceramic planter",
      price: 5000, // All mini pots are 5k
      image: "/images/Ekondo Products/Orange-Mini-Mide-1-scaled.webp",
      category: "Pots",
      featured: false,
      newArrival: true,
    },
    {
      id: 12,
      name: "Orange Murna Pot",
      description: "Large orange ceramic pot",
      price: 12000, // Murna pots are 12k
      image: "/images/Ekondo Products/Orange-Murna-1-scaled.webp",
      category: "Pots",
      featured: false,
    },
    {
      id: 13,
      name: "Pink Mide Pot",
      description: "Elegant pink ceramic planter",
      price: 15000, // Mide pots are 15k
      image: "/images/Ekondo Products/Pink-Mide.webp",
      category: "Pots",
      featured: false,
    },
    // Accessories
    {
      id: 14,
      name: "Yellow Nala Tray",
      description: "Traditional serving tray",
      price: 5000, // Nala tray is 5k
      image: "/images/Ekondo Products/Yellow-Nala-scaled.webp",
      category: "Accessories",
      featured: false,
      newArrival: true,
    },
  ]

  // Filter products based on selected categories and price ranges
  const filteredProducts = products.filter(product => {
    // Category filter
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    
    // Price range filter
    const priceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
      switch (range) {
        case "Under ₦10,000":
          return product.price < 10000
        case "₦10,000 - ₦15,000":
          return product.price >= 10000 && product.price <= 15000
        case "₦20,000 - ₦25,000":
          return product.price >= 20000 && product.price <= 25000
        default:
          return true
      }
    })
    
    return categoryMatch && priceMatch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "popular":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      default: // featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category])
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category))
    }
  }

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges(prev => [...prev, range])
    } else {
      setSelectedPriceRanges(prev => prev.filter(r => r !== range))
    }
  }

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
                      {["Pots", "Plants", "Accessories"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-mobile-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                          />
                          <Label htmlFor={`category-mobile-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="space-y-2">
                      {["Under ₦10,000", "₦10,000 - ₦15,000", "₦20,000 - ₦25,000"].map((range) => (
                        <div key={range} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`price-mobile-${range}`}
                            checked={selectedPriceRanges.includes(range)}
                            onCheckedChange={(checked) => handlePriceRangeChange(range, checked as boolean)}
                          />
                          <Label htmlFor={`price-mobile-${range}`}>{range}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
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
                          {["Pots", "Plants", "Accessories"].map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                              />
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
                          {["Under ₦10,000", "₦10,000 - ₦15,000", "₦20,000 - ₦25,000"].map((range) => (
                            <div key={range} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`price-${range}`}
                                checked={selectedPriceRanges.includes(range)}
                                onCheckedChange={(checked) => handlePriceRangeChange(range, checked as boolean)}
                              />
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
                {sortedProducts.map((product) => (
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
                                ₦{(product.price * (1 - product.discount / 100)).toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                ₦{product.price.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg">₦{product.price.toLocaleString()}</span>
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
