"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"
import { getProducts } from "@/lib/getProducts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Plant Desk Sets", value: "desk_set" },
  { label: "Medium Herb Set", value: "herb_set" },
  { label: "Air-purifying Bundles", value: "air_purify" },
  { label: "For Office", value: "office" },
  { label: "For Home", value: "home" }
];

export default function GiftingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  // GSAP animations
  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
      );
    }
    const nodes = cardRefs.current.filter(Boolean);
    if (nodes.length > 0) {
      gsap.fromTo(
        nodes,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.10, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );
    }
  }, [products, activeFilter]);

  const filteredProducts = products.filter(product => {
    if (activeFilter === "all") return true;
    if (activeFilter === "desk_set") return product.tags?.includes("desk") || product.name?.toLowerCase().includes("desk");
    if (activeFilter === "herb_set") return product.tags?.includes("herb") || product.name?.toLowerCase().includes("herb");
    if (activeFilter === "air_purify") return product.tags?.includes("air") || product.name?.toLowerCase().includes("air");
    if (activeFilter === "office") return (product.tags?.includes("office") || product.name?.toLowerCase().includes("office"));
    if (activeFilter === "home") return (product.tags?.includes("home") || product.name?.toLowerCase().includes("home"));
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background/95">
      <section className="orange-gradient-strong pt-20 pb-12 md:py-24 relative overflow-hidden">
        <div className="container px-4 relative z-10">
          <h1 ref={headingRef} className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4 text-center drop-shadow-lg">Send a Plant Gift</h1>
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Treat someone to a beautiful plant surprise, delivered with your custom note. Perfect for birthdays, thank-yous, celebrations, or just because.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {FILTERS.map(f => (
              <Button key={f.value} variant={activeFilter === f.value ? "default" : "outline"} onClick={() => setActiveFilter(f.value)}>{f.label}</Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => { cardRefs.current = []; return null })()}
            {loading
              ? Array(6).fill(0).map((_, i) => (
                  <div key={i} className="h-96 bg-background rounded-lg animate-pulse" />
                ))
              : filteredProducts.map((product, i) => (
                  <div ref={el => { cardRefs.current[i] = el }} key={product.id} className="rounded-2xl border-none shadow-xl bg-card overflow-hidden flex flex-col transition duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105">
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between items-center text-center">
                      <h2 className="font-serif text-xl font-bold mb-1 text-primary">{product.name}</h2>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      <span className="block font-semibold text-lg mb-4">₦{product.price?.toLocaleString()}</span>
                      <Button asChild size="lg" className="btn-gradient-clean mt-auto w-full" >
                        <Link href={{ pathname: "/checkout", query: { productId: product.id, isGift: 1 }}}>Gift This</Link>
                      </Button>
                    </CardContent>
                  </div>
                ))}
          </div>
        </div>
        <div className="absolute left-0 right-0 top-0 h-40 opacity-40"></div>
      </section>
    </div>
  );
}
