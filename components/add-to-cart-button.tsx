"use client"

import { useState } from "react"
import { ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    image: string
    category?: string
  }
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline"
  className?: string
}

export function AddToCartButton({ product, size = "default", variant = "default", className }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })

    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={`btn-gradient organic-shape ${className}`}
      onClick={handleAddToCart}
      disabled={added}
    >
      {added ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added!
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
