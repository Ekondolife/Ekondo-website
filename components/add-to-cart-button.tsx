"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"

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

export function AddToCartButton({ product, size = "default", variant = "default", className, ...props }: AddToCartButtonProps) {
  const { addItem } = useCart()
  return (
    <Button
      {...props}
      size={size}
      variant={variant}
      className={`btn-gradient organic-shape ${className}`}
      onClick={() => addItem(product)}
    >
      Add to Cart
    </Button>
  )
}
