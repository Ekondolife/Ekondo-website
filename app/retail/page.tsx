"use client"

import { Filter, Loader2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
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
import RetailShowcaseCarousel from "@/components/retail-showcase-carousel"

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
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const heroSlides = [
    {
      image: "/images/Ekondo-110 2.webp",
      badge: "",
      title: "Handcrafted for Nature Lovers",
      description: "Discover our curated collection of sustainable planters, tools, and accessories handmade by African artisans.",
      showContent: true,
      ctaText: "",
      ctaLink: "",
    },
    {
      image: "/images/Gift_plant.webp",
      badge: "",
      title: "",
      description: "",
      showContent: false,
      ctaText: "Send a Gift",
      ctaLink: "/gifting",
    },
    {
      image: "/images/soilmate.webp",
      badge: "",
      title: "",
      description: "",
      showContent: false,
      ctaText: "Find your Soilmate",
      ctaLink: "https://v0-remix-of-plant-matching-app.vercel.app/",
    },
  ]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroSlides.length])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000) // Resume after 3 seconds
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

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
      {/* Hero Section Carousel */}
      <section
        ref={heroRef}
        className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[320px] w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10 pointer-events-none" />

        {/* Slides */}
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => {
            const isExternal = slide.ctaLink.startsWith("http")
            const isRetail = slide.ctaLink === "/retail"
            const isFirstSlide = slide.showContent

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
                aria-hidden={index !== currentSlide}
              >
                {/* Clickable wrapper for slides 2-4 (non-first slides) */}
                {!isFirstSlide && (
                  <>
                    {isExternal ? (
                      <a
                        href={slide.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 block cursor-pointer"
                      >
                        <Image
                          src={slide.image}
                          alt={slide.ctaText || `Hero slide ${index + 1}`}
                          fill
                          priority={index === 0}
                          className="object-contain md:object-cover w-full h-full"
                        />
                      </a>
                    ) : !isRetail ? (
                      <Link href={slide.ctaLink} className="absolute inset-0 block cursor-pointer">
                        <Image
                          src={slide.image}
                          alt={slide.ctaText || `Hero slide ${index + 1}`}
                          fill
                          priority={index === 0}
                          className="object-contain md:object-cover w-full h-full"
                        />
                      </Link>
                    ) : (
                      <div className="absolute inset-0">
                        <Image
                          src={slide.image}
                          alt={slide.ctaText || `Hero slide ${index + 1}`}
                          fill
                          priority={index === 0}
                          className="object-contain md:object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </>
                )}

                {/* First slide with content and buttons (not clickable) */}
                {isFirstSlide && (
                  <>
                    <div className="absolute inset-0">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority
                        className="object-contain md:object-cover w-full h-full"
                      />
                    </div>

                    {/* Content overlay */}
                    <div className="container relative z-30 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
                      <div ref={heroContentRef} className="max-w-3xl w-full">
                        {slide.badge && (
                          <Badge className="hero-badge mb-3 md:mb-4 organic-shape-soft bg-orange/20 text-white border-orange text-xs sm:text-sm pointer-events-none">
                            {slide.badge}
                          </Badge>
                        )}
                        <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 text-white drop-shadow-lg leading-tight">
                          Handcrafted for <span className="text-primary">Nature</span> Lovers
                        </h1>
                        <p className="hero-description text-sm sm:text-base md:text-lg lg:text-xl text-white mb-4 md:mb-6 lg:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                          {slide.description}
                        </p>
                        <div className="hero-buttons flex flex-wrap gap-2 sm:gap-3 justify-center pointer-events-auto">
                          <Button size="sm" className="btn-gradient-clean text-sm sm:text-base sm:px-6 sm:py-3">
                            Shop Best Sellers
                          </Button>
                          <Button size="sm" variant="outline" asChild className="bg-background text-sm sm:text-base sm:px-6 sm:py-3">
                            <Link href="/gifting">View Gifts</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation Arrows (smaller on mobile) */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-2.5 md:p-3 rounded-full transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-2.5 md:p-3 rounded-full transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Dots Indicator (smaller on mobile) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentSlide ? "h-2 w-8 bg-white" : "h-2 w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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
                  <Button variant="outline" className="md:hidden bg-transparent">
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
                      {["Pots", "Plants", "Accessories", "Christmas"].map((category) => (
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
                <SelectTrigger className="w-full md:w-[180px]">
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
              {/* keep sticky but allow internal scrolling when content is tall */}
              <div
                className="sticky top-24 pr-2"
                style={{ maxHeight: "calc(100vh - 6rem)", overflow: "auto" }}
              >
                <Card className="border-none shadow-md orange-gradient">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Filters</h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Categories</h4>
                        <div className="space-y-2">
                          {["Pots", "Plants", "Accessories", "Christmas"].map((category) => (
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
                  <Card key={product.id} className="product-card overflow-hidden border-none shadow-md card-organic">
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
                        <Badge variant="secondary" className="text-xs">
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
                          className="btn-gradient-clean"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled className="bg-transparent">
                    Previous
                  </Button>
                  <Button size="sm" className="btn-gradient-clean">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
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