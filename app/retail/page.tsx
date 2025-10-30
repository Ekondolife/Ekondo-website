"use client"

import { Filter, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabaseClient"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const plantTypeOptions = [
  "Air purifying plants",
  "Low maintenance plants",
  "Beginner friendly plants",
  "Plants for gifting",
]

export default function RetailPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedPlantTypes, setSelectedPlantTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")

  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const filterSidebarRef = useRef<HTMLDivElement>(null)
  const productGridRef = useRef<HTMLDivElement>(null)
  const trustBadgesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true })

        if (error) throw error
        console.log("Fetched products from Supabase:", data)
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Hero section animations
  useEffect(() => {
    if (heroContentRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        
        tl.from(".hero-badge", {
          opacity: 0,
          y: 30,
          duration: 0.6,
        })
        .from(".hero-title", {
          opacity: 0,
          y: 40,
          duration: 0.8,
        }, "-=0.3")
        .from(".hero-description", {
          opacity: 0,
          y: 30,
          duration: 0.6,
        }, "-=0.4")
        .from(".hero-buttons", {
          opacity: 0,
          y: 20,
          duration: 0.6,
        }, "-=0.3")

        // Floating animation for hero section
        gsap.to(heroRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        })
      }, heroContentRef)

      return () => ctx.revert()
    }
  }, [])

  // Filter sidebar animation
  useEffect(() => {
    if (filterSidebarRef.current && !loading) {
      const ctx = gsap.context(() => {
        gsap.from(filterSidebarRef.current, {
          scrollTrigger: {
            trigger: filterSidebarRef.current,
            start: "top 80%",
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
      }, filterSidebarRef)

      return () => ctx.revert()
    }
  }, [loading])

  // Product grid animations
  useEffect(() => {
    if (productGridRef.current && !loading && products.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".product-card", {
          scrollTrigger: {
            trigger: productGridRef.current,
            start: "top 80%",
            invalidateOnRefresh: true,
          },
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        })

        // Hover animations for product cards
        const cards = gsap.utils.toArray<HTMLElement>(".product-card")
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })
      }, productGridRef)

      return () => ctx.revert()
    }
  }, [loading, products, selectedCategories, selectedPriceRanges, selectedPlantTypes, sortBy])

  // Trust badges animation
  useEffect(() => {
    if (trustBadgesRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".trust-badge", {
          scrollTrigger: {
            trigger: trustBadgesRef.current,
            start: "top 90%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        })
      }, trustBadgesRef)

      return () => ctx.revert()
    }
  }, [])

  // Filter products based on selected categories, price ranges, and plant types
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)

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

    let productPlantTypes = product.plant_type || product.plantType;
    
    if (typeof productPlantTypes === 'string') {
      try {
        productPlantTypes = JSON.parse(productPlantTypes);
      } catch {
        productPlantTypes = [];
      }
    }
    
    if (!Array.isArray(productPlantTypes)) {
      productPlantTypes = [];
    }

    const plantTypeMatch =
      selectedPlantTypes.length === 0 ||
      (product.category === "Plants" &&
        productPlantTypes.length > 0 &&
        selectedPlantTypes.some(type => productPlantTypes.includes(type)))

    if (selectedPlantTypes.length > 0 && product.category === "Plants") {
      console.log("Product:", product.name, "Plant Types:", productPlantTypes, "Selected:", selectedPlantTypes, "Match:", plantTypeMatch)
    }

    const isPlantOrNoPlantTypeFilter = product.category !== "Plants" || selectedPlantTypes.length === 0 || plantTypeMatch

    return categoryMatch && priceMatch && isPlantOrNoPlantTypeFilter
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
      default:
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

  const handlePlantTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedPlantTypes(prev => [...prev, type])
    } else {
      setSelectedPlantTypes(prev => prev.filter(t => t !== type))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-20 orange-gradient-strong overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-50"></div>
        <div className="container px-4 relative z-10">
          <div ref={heroContentRef} className="max-w-3xl">
            <Badge className="hero-badge mb-4 organic-shape-soft bg-orange/20 text-orange-foreground border-orange">
              New Collection
            </Badge>
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4">
              Handcrafted for <span className="text-primary">Nature</span> Lovers
            </h1>
            <p className="hero-description text-lg md:text-xl text-muted-foreground mb-8">
              Discover our curated collection of sustainable planters, tools, and accessories handmade by African
              artisans.
            </p>
            <div className="hero-buttons flex flex-wrap gap-3">
              <Button size="lg" className="organic-shape btn-gradient">
                Shop Best Sellers
              </Button>
              <Button size="lg" variant="outline" asChild className="organic-shape bg-background">
                <Link href="/gifting">View Gifts</Link>
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

                    <Separator className="my-4" />
                    <h3 className="font-medium mb-2">Plant Types</h3>
                    <div className="space-y-2">
                      {plantTypeOptions.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`planttype-mobile-${type}`}
                            checked={selectedPlantTypes.includes(type)}
                            onCheckedChange={(checked) => handlePlantTypeChange(type, checked as boolean)}
                          />
                          <Label htmlFor={`planttype-mobile-${type}`}>{type}</Label>
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
            <div ref={filterSidebarRef} className="hidden md:block w-64 shrink-0">
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
                        <h4 className="font-medium mb-3">Plant Types</h4>
                        <div className="space-y-2">
                          {plantTypeOptions.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={`planttype-${type}`}
                                checked={selectedPlantTypes.includes(type)}
                                onCheckedChange={(checked) => handlePlantTypeChange(type, checked as boolean)}
                              />
                              <Label htmlFor={`planttype-${type}`} className="text-sm">
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div ref={productGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="product-card overflow-hidden border-none shadow-md card-organic organic-shape">
                    <Link href={`/retail/product/${product.id}`} className="relative block aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover image-clean transition-transform duration-300"
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
      <section ref={trustBadgesRef} className="py-12 border-t orange-gradient">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Discount", value: "Orders ₦50,000+" },
              { label: "Secure Payment", value: "100% Protected" },
              { label: "Easy Returns", value: "30 Days" },
              { label: "Support", value: "24/7 Help" },
            ].map((item, index) => (
              <div key={index} className="trust-badge">
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