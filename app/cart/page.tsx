"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { useSyncCart } from "@/components/sync-cart-button"

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, subtotal, clearCart } = useCart()
  const { syncRemoveItem, syncUpdateQuantity } = useSyncCart()

  const handleRemoveItem = async (id: number) => {
    removeItem(id)
    await syncRemoveItem(id)
  }

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    updateQuantity(id, quantity)
    await syncUpdateQuantity(id, quantity)
  }

  const shipping = subtotal > 50000 ? 0 : 5000 // Free shipping over ₦50,000
  const total = subtotal + shipping

  // Debug: Log cart items to console
  console.log("Cart items:", cartItems)

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart()
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6 ">
            <ShoppingBag className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some beautiful plants and products to get started!</p>
          <Button size="lg" asChild className="">
            <Link href="/retail">Shop Now</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold">Shopping Cart</h1>
        {cartItems.length > 0 && (
          <Button 
            variant="outline" 
            onClick={handleClearCart}
            className=" bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="border-none shadow-md ">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden ">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="border-none shadow-lg  sticky top-24">
            <CardContent className="p-6">
              <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "FREE" : `₦${shipping.toLocaleString()}`}</span>
                </div>
                {subtotal < 50000 && (
                  <div className="text-xs text-muted-foreground">
                    Add ₦{(50000 - subtotal).toLocaleString()} more for free shipping!
                  </div>
                )}
              </div>

              <Separator className="mb-6" />

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">₦{total.toLocaleString()}</span>
              </div>

              <Button 
                size="lg" 
                className="w-full mb-3  btn-gradient-clean"
                asChild
              >
                <Link href="/checkout">
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                <Link href="/retail">Continue Shopping</Link>
              </Button>

              <Separator className="my-6" />

              <div className="space-y-3 text-sm text-muted-foreground">
                <p>✓ Secure checkout</p>
                <p>✓ Free returns within 30 days</p>
                <p>✓ Plant care instructions included</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
