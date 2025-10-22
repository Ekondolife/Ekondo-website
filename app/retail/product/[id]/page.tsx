"use client"

import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === Number(params.id))

  if (!product) {
    notFound()
  }

  // Get related products from same category (excluding self)
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3)

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.newArrival && (
            <Badge className="absolute top-3 left-3 bg-orange text-orange-foreground organic-shape-soft">
              New
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="mb-3 w-fit">
            {product.category}
          </Badge>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <div className="text-2xl font-bold mb-6">₦{product.price.toLocaleString()}</div>

          <div className="flex gap-3 mb-8">
            <AddToCartButton
              product={product}
              size="lg"
              className="organic-shape btn-gradient flex-1"
            />
          </div>

          <Separator className="my-6" />

          <div className="text-sm text-muted-foreground">
            <p>Each Ekondo product is handcrafted with love and care by African artisans.</p>
            <p>Expect small variations that make every piece unique.</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} href={`/retail/product/${r.id}`}>
                <div className="rounded-lg overflow-hidden border hover:shadow-lg transition-all">
                  <div className="relative aspect-square">
                    <Image src={r.image} alt={r.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{r.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{r.description}</p>
                    <div className="font-semibold mt-2">₦{r.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
