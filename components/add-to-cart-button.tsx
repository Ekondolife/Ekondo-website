"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import { supabase } from "@/lib/supabaseClient"
import { auth } from "@/lib/firebaseClient"
import { useEffect, useState } from "react"

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
  const [syncing, setSyncing] = useState(false)

  const handleAddToCart = async () => {
    addItem(product)

    // If user is logged in, sync with Supabase
    const user = auth.currentUser
    if (user) {
      setSyncing(true)
      try {
        // Check if item already exists
        const { data: existingItem } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_uid", user.uid)
          .eq("product_id", product.id)
          .single()

        if (existingItem) {
          // Update quantity
          await supabase
            .from("cart_items")
            .update({ quantity: existingItem.quantity + 1 })
            .eq("user_uid", user.uid)
            .eq("product_id", product.id)
        } else {
          // Insert new item
          await supabase.from("cart_items").insert({
            user_uid: user.uid,
            product_id: product.id,
            quantity: 1,
          })
        }
      } catch (error) {
        console.error("Error syncing cart to Supabase:", error)
      } finally {
        setSyncing(false)
      }
    }
  }

  return (
    <Button
      {...props}
      size={size}
      variant={variant}
      className={`btn-gradient-clean ${className || ""}`}
      onClick={handleAddToCart}
      disabled={syncing}
    >
      {syncing ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
