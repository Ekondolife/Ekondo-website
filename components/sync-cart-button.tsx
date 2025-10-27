"use client"

import { useState } from "react"
import { useCart } from "./cart-context"
import { supabase } from "@/lib/supabaseClient"
import { auth } from "@/lib/firebaseClient"

export function useSyncCart() {
  const [syncing, setSyncing] = useState(false)

  const syncRemoveItem = async (productId: number) => {
    const user = auth.currentUser
    if (user) {
      setSyncing(true)
      try {
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_uid", user.uid)
          .eq("product_id", productId)
      } catch (error) {
        console.error("Error removing cart item from Supabase:", error)
      } finally {
        setSyncing(false)
      }
    }
  }

  const syncUpdateQuantity = async (productId: number, quantity: number) => {
    const user = auth.currentUser
    if (user) {
      setSyncing(true)
      try {
        if (quantity <= 0) {
          await supabase
            .from("cart_items")
            .delete()
            .eq("user_uid", user.uid)
            .eq("product_id", productId)
        } else {
          await supabase
            .from("cart_items")
            .update({ quantity })
            .eq("user_uid", user.uid)
            .eq("product_id", productId)
        }
      } catch (error) {
        console.error("Error updating cart item in Supabase:", error)
      } finally {
        setSyncing(false)
      }
    }
  }

  return { syncRemoveItem, syncUpdateQuantity, syncing }
}

