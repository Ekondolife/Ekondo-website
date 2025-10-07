"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, X, History, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

interface SearchResult {
  id: number
  title: string
  type: "product" | "article" | "experience" | "service" | "space"
  description: string
  image: string
  price?: number
  url: string
  category?: string
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ekondo-recent-searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Save search to recent searches
  const saveSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    const updated = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("ekondo-recent-searches", JSON.stringify(updated))
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("ekondo-recent-searches")
  }

  // Simulate search (in production, this would be an API call)
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    const timer = setTimeout(() => {
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: 1,
          title: "Handwoven Basket Planter",
          type: "product",
          description: "Traditional African weaving",
          image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop",
          price: 49.99,
          url: "/retail/product/1",
          category: "Pots",
        },
        {
          id: 2,
          title: "Urban Farming in African Cities",
          type: "article",
          description: "How young Africans are revolutionizing urban agriculture",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop",
          url: "/journal/urban-farming-african-cities",
          category: "Urban Farming",
        },
        {
          id: 3,
          title: "Plant Styling Masterclass",
          type: "experience",
          description: "Learn the art of plant styling",
          image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop",
          price: 45,
          url: "/experience/1",
          category: "Workshop",
        },
        {
          id: 4,
          title: "Landscape Design & Installation",
          type: "service",
          description: "Transform your outdoor space",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
          price: 500,
          url: "/services/2",
          category: "Services",
        },
        {
          id: 5,
          title: "Ekondo Park Lagos",
          type: "space",
          description: "Our flagship location in Lagos",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
          url: "/spaces/1",
          category: "Community Space",
        },
      ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))

      setResults(mockResults)
      setIsSearching(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const popularSearches = [
    "Succulent plants",
    "Ceramic pots",
    "Plant care tips",
    "Urban gardening",
    "African plants",
    "Workshop schedule",
  ]

  const typeIcons = {
    product: "🛍️",
    article: "📰",
    experience: "🎨",
    service: "🔧",
    space: "🏢",
  }

  const handleSearchSubmit = (searchQuery: string) => {
    saveSearch(searchQuery)
    setOpen(false)
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative w-full md:w-64 justify-start text-sm text-muted-foreground bg-transparent organic-shape"
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="hidden md:inline-flex">Search products, articles...</span>
          <span className="md:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center gap-2 border-b pb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products, articles, experiences..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  handleSearchSubmit(query)
                }
              }}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            {query && (
              <Button variant="ghost" size="icon" onClick={() => setQuery("")} className="organic-shape">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[500px]">
          <div className="p-4">
            {!query && (
              <>
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <History className="h-4 w-4" />
                        Recent Searches
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearRecentSearches} className="h-auto p-0 text-xs">
                        Clear all
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer organic-shape-soft hover:bg-primary/10"
                          onClick={() => setQuery(search)}
                        >
                          {search}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm font-medium mb-3">
                    <TrendingUp className="h-4 w-4" />
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer organic-shape-soft hover:bg-primary/10"
                        onClick={() => setQuery(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <div className="text-sm font-medium mb-3">Quick Links</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Shop All Products", url: "/retail" },
                      { label: "Upcoming Events", url: "/experience" },
                      { label: "Book a Service", url: "/services" },
                      { label: "Visit Our Spaces", url: "/spaces" },
                    ].map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between p-3 border hover:border-primary hover:bg-primary/5 transition-colors organic-shape-soft"
                      >
                        <span className="text-sm">{link.label}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Search Results */}
            {query && (
              <>
                {isSearching && (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p>Searching...</p>
                  </div>
                )}

                {!isSearching && results.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-2">No results found for "{query}"</p>
                    <p className="text-sm">Try different keywords or browse our categories</p>
                  </div>
                )}

                {!isSearching && results.length > 0 && (
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 mb-4">
                      <TabsTrigger value="all">All ({results.length})</TabsTrigger>
                      <TabsTrigger value="product">Products</TabsTrigger>
                      <TabsTrigger value="article">Articles</TabsTrigger>
                      <TabsTrigger value="experience">Events</TabsTrigger>
                      <TabsTrigger value="service">Services</TabsTrigger>
                      <TabsTrigger value="space">Spaces</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-2">
                      {results.map((result) => (
                        <Link
                          key={result.id}
                          href={result.url}
                          onClick={() => {
                            saveSearch(query)
                            setOpen(false)
                          }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors rounded-xl group"
                        >
                          <div className="relative w-16 h-16 overflow-hidden flex-shrink-0 organic-shape-soft">
                            <Image
                              src={result.image || "/placeholder.svg"}
                              alt={result.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{typeIcons[result.type]}</span>
                              <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                {result.title}
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                            {result.category && (
                              <Badge variant="secondary" className="text-xs mt-1 organic-shape-soft">
                                {result.category}
                              </Badge>
                            )}
                          </div>
                          {result.price && <div className="font-bold text-sm text-primary">${result.price}</div>}
                        </Link>
                      ))}
                    </TabsContent>

                    {["product", "article", "experience", "service", "space"].map((type) => (
                      <TabsContent key={type} value={type} className="space-y-2">
                        {results
                          .filter((r) => r.type === type)
                          .map((result) => (
                            <Link
                              key={result.id}
                              href={result.url}
                              onClick={() => {
                                saveSearch(query)
                                setOpen(false)
                              }}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors rounded-xl group"
                            >
                              <div className="relative w-16 h-16 overflow-hidden flex-shrink-0 organic-shape-soft">
                                <Image
                                  src={result.image || "/placeholder.svg"}
                                  alt={result.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                  {result.title}
                                </h4>
                                <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                                {result.category && (
                                  <Badge variant="secondary" className="text-xs mt-1 organic-shape-soft">
                                    {result.category}
                                  </Badge>
                                )}
                              </div>
                              {result.price && <div className="font-bold text-sm text-primary">${result.price}</div>}
                            </Link>
                          ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                )}

                {results.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full organic-shape bg-transparent"
                      onClick={() => handleSearchSubmit(query)}
                    >
                      See all results for "{query}"
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
