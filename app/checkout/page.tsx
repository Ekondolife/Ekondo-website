"use client"

export const dynamic = "force-dynamic"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-context"
import { CreditCard, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const nigerianStates = [
  "Abuja FCT", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", 
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", 
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
]

// Gift note categories and messages
const giftNoteCategories = {
  birthday: {
    label: "🎉 Birthday",
    messages: [
      "May your new year bloom! Happy Birthday to someone truly special.",
      "Just like a great plant, you keep growing and thriving. Happy Birthday!",
      "Wishing you a day as vibrant and full of life as a beautiful garden."
    ]
  },
  newJob: {
    label: "💼 New Job",
    messages: [
      "Congratulations! Time to put down new roots and watch your career flourish.",
      "We're so excited for your new role! Grow big, shine bright.",
      "Here's to the seeds you're sowing in this next big venture. Best of luck!"
    ]
  },
  newHome: {
    label: "🏡 New Home",
    messages: [
      "May your new space be a place where happiness takes root. Welcome home!",
      "A little gift to help you cultivate beauty in your new surroundings.",
      "Wishing you a home filled with light and warmth—may you flourish here!"
    ]
  },
  anniversary: {
    label: "💕 Anniversary",
    messages: [
      "Happy Anniversary! Your love is an inspiration—it just keeps growing stronger.",
      "Like a treasured tree, may your relationship be deeply rooted and enduring.",
      "Celebrating the amazing life you've grown together. Cheers to many more seasons!"
    ]
  },
  justBecause: {
    label: "🌿 Just Because",
    messages: [
      "Just a little reminder to take a moment and breathe. Sending you good vibes!",
      "Hope this brightens your day. Keep shining, friend!",
      "No special reason needed—just wanted to send you a little life and light."
    ]
  }
}

export default function CheckoutPage() {
  const { items: cartItems, subtotal, addItem: addCartItem, clearCart } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tabValue, setTabValue] = useState("delivery")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGift, setIsGift] = useState(false)
  const [productId, setProductId] = useState<string | null>(null)
  const [giftNote, setGiftNote] = useState("")
  const [giftProductAdded, setGiftProductAdded] = useState(false)
  const [isLoadingGift, setIsLoadingGift] = useState(false)
  
  // Gift note selection state
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedMessage, setSelectedMessage] = useState<string>("")
  const [useCustomMessage, setUseCustomMessage] = useState(false)

  // Read query params on client only - check both useSearchParams and window.location as fallback
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      const giftParam = searchParams.get("isGift") === "1" || searchParams.get("isGift") === "true"
      const prodId = searchParams.get("productId")
        
      if (giftParam) {
        setIsGift(true)
      }
      if (prodId) {
        setProductId(prodId)
      }
        
      if (giftParam && prodId) {
        setIsLoadingGift(true)
      }
    }
  }, [])

  const getSearchParam = (param: string): string | null => {
    if (typeof window === 'undefined') return null
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get(param)
  }
  // CheckoutPage.tsx (Refactored useEffect, starting around line 97)

  useEffect(() => {
    const isGiftFromUrl = getSearchParam("isGift") === "1" || getSearchParam("isGift") === "true"
    const productIdFromUrl = getSearchParam("productId")
  
    if (isGiftFromUrl && productIdFromUrl && !giftProductAdded && cartItems.length === 0) {
      setIsLoadingGift(true)
      ;(async () => {
        try {
          const res = await fetch(`/api/gift-product?productId=${productIdFromUrl}`)
          const data = await res.json()
  
          if (!res.ok || data.error) {
            throw new Error(data.error || "Failed to load gift product.")
          }
          
          const giftProduct = data.data
  
          if (giftProduct) {
            clearCart();
            addCartItem({
              id: giftProduct.id,
              name: giftProduct.name,
              description: giftProduct.description,
              price: giftProduct.price,
              image: giftProduct.image,
              category: giftProduct.category,
            })
            setGiftProductAdded(true)
            setIsLoadingGift(false)
          } else {
            alert("Sorry, this gift product could not be loaded.");
            router.push("/gifting")
          }
        } catch (e: any) {
          alert("Error loading product for gift checkout: " + e.message);
          router.push("/gifting")
        } finally {
          setIsLoadingGift(false)
        }
      })()
    }
  }, [isGift, productId, giftProductAdded, cartItems.length, addCartItem, clearCart, router])
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedMessage("") // Reset message when category changes
    setGiftNote("") // Clear gift note
    setUseCustomMessage(false)
  }

  // Handle message selection
  const handleMessageChange = (messageIndex: string) => {
    setSelectedMessage(messageIndex)
    if (selectedCategory && messageIndex) {
      const categoryKey = selectedCategory as keyof typeof giftNoteCategories
      const message = giftNoteCategories[categoryKey].messages[parseInt(messageIndex)]
      setGiftNote(message)
      setUseCustomMessage(false)
    }
  }

  // Handle custom message toggle
  const handleCustomMessageToggle = () => {
    setUseCustomMessage(true)
    setSelectedCategory("")
    setSelectedMessage("")
    setGiftNote("")
  }

  // Delivery form state
  const [deliveryData, setDeliveryData] = useState({
    email: "",
    country: "Nigeria",
    firstName: "",
    lastName: "",
    streetAddress: "",
    townCity: "",
    state: "",
    phone: "",
  })

  // Pickup form state
  const [pickupLocation, setPickupLocation] = useState("")

  const pickupLocations = [
    {
      id: "abuja",
      name: "Ekondo Park",
      address: "Mama village garden, beside Sharon rose garden, Utako, Gwarinpa 900108, Federal Capital Territory, Abuja",
    },
    {
      id: "lagos",
      name: "Locale Lagos",
      address: "2 Saka Jojo St, Victoria Island, Lagos 101241, Lagos",
    },
  ]

  const shipping = tabValue === "pickup" ? 0 : 6000
  const total = subtotal + shipping

  const handleDeliveryChange = (field: string, value: string) => {
    setDeliveryData(prev => ({ ...prev, [field]: value }))
  }

  const isDeliveryFormValid = () => {
    return (
      !!deliveryData.email &&
      !!deliveryData.firstName &&
      !!deliveryData.lastName &&
      !!deliveryData.streetAddress &&
      !!deliveryData.townCity &&
      !!deliveryData.state &&
      !!deliveryData.phone
    )
  }

  const isPickupFormValid = () => {
    return pickupLocation !== ""
  }

  const handleCheckout = async () => {
    let isValid = false
    let customerData: any = {}

    if (tabValue === "delivery") {
      isValid = isDeliveryFormValid()
      customerData = {
        email: deliveryData.email,
        metadata: {
          type: "delivery",
          firstName: deliveryData.firstName,
          lastName: deliveryData.lastName,
          streetAddress: deliveryData.streetAddress,
          townCity: deliveryData.townCity,
          state: deliveryData.state,
          country: deliveryData.country,
          phone: deliveryData.phone,
        },
      }
    } else {
      isValid = isPickupFormValid()
      const selectedLocation = pickupLocations.find(loc => loc.id === pickupLocation)
      customerData = {
        email: "pickup@ekondolife.com",
        metadata: {
          type: "pickup",
          locationId: pickupLocation,
          locationName: selectedLocation?.name || "",
          locationAddress: selectedLocation?.address || "",
          phone: "",
        },
      }
    }

    if (!isValid) {
      alert("Please fill in all required fields")
      return
    }

    setIsProcessing(true)
    try {
      const res = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: tabValue === "delivery" ? deliveryData.email : "pickup@ekondolife.com",
          amount: total,
          ...customerData,
          ...(isGift ? { giftNote } : {}),
        }),
      })
      const data = await res.json()

      if (!data.ok) throw new Error(data.error || "Payment init failed")

      window.location.href = data.data.data.authorization_url
    } catch (err: any) {
      alert("Payment failed: " + err.message)
    } finally {
      setIsProcessing(false)
    }
  }


  useEffect(() => {
    const isGiftFromUrl = getSearchParam("isGift") === "1" || getSearchParam("isGift") === "true"
    const hasProductId = getSearchParam("productId") !== null
      
    // NEVER redirect if this is a gift flow
    if (isGiftFromUrl || hasProductId) {
      return // Don't redirect, this is a gift flow
    }
      
    // Only redirect to cart if: cart is empty AND we're not loading a gift product
    if (cartItems.length === 0 && !isLoadingGift) {
      router.push("/cart")
    }
  }, [cartItems.length, router, isLoadingGift])

  // Show loading state while gift product is being added
  if (isLoadingGift && cartItems.length === 0) {
    return (
      <div className="container px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Preparing your gift...</p>
          </div>
        </div>
      </div>
    )
  }

// Check URL params directly to avoid race conditions
const isGiftFromUrl = getSearchParam("isGift") === "1" || getSearchParam("isGift") === "true"
const hasProductId = getSearchParam("productId") !== null

// Don't render checkout if cart is empty and it's not a gift flow
if (cartItems.length === 0 && !isGiftFromUrl && !hasProductId && !isLoadingGift) {
  return null
}

// Allow rendering if it's a gift (even if cart is temporarily empty while loading)
if (cartItems.length === 0 && (isGiftFromUrl || hasProductId) && !isLoadingGift && !giftProductAdded) {
  // This is a gift flow, allow it to render while product is being added
  // The loading state will be shown by the useEffect that adds the product
}

  return (
    <div className="container px-4 py-12 md:py-16">
      <Link href="/cart" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Link>

      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                {(isGift || searchParams.get("isGift") === "1" || searchParams.get("isGift") === "true") && (
                  <div className="mb-6 space-y-4">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h3 className="font-medium text-lg text-primary mb-2 flex items-center gap-2">
                        🎁 Add a Gift Note
                      </h3>
                      <p className="text-sm text-orange-700">
                        Choose from our plant-inspired messages or write your own. We'll print it beautifully with the order!
                      </p>
                    </div>

                    {!useCustomMessage ? (
                      <>
                        {/* Category Dropdown */}
                        <div>
                          <Label htmlFor="gift-category" className="text-sm font-medium mb-2 block">
                            Select Message Category
                          </Label>
                          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                            <SelectTrigger id="gift-category" className="w-full">
                              <SelectValue placeholder="Choose a category..." />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(giftNoteCategories).map(([key, category]) => (
                                <SelectItem key={key} value={key}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Message Dropdown - Only shows when category is selected */}
                        {selectedCategory && (
                          <div>
                            <Label htmlFor="gift-message" className="text-sm font-medium mb-2 block">
                              Select Your Message
                            </Label>
                            <Select value={selectedMessage} onValueChange={handleMessageChange}>
                              <SelectTrigger id="gift-message" className="w-full">
                                <SelectValue placeholder="Choose a message..." />
                              </SelectTrigger>
                              <SelectContent>
                                {giftNoteCategories[selectedCategory as keyof typeof giftNoteCategories].messages.map((message, idx) => (
                                  <SelectItem key={idx} value={idx.toString()}>
                                    {message.substring(0, 50)}{message.length > 50 ? "..." : ""}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Preview of selected message */}
                        {giftNote && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm font-medium text-green-800 mb-1">Your gift note:</p>
                            <p className="text-sm text-green-700 italic">"{giftNote}"</p>
                          </div>
                        )}

                        {/* Option to write custom message */}
                        <div className="text-center pt-2">
                          <button
                            type="button"
                            onClick={handleCustomMessageToggle}
                            className="text-sm text-primary hover:underline font-medium"
                          >
                            Or write your own custom message
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Custom Message Textbox */}
                        <div>
                          <Label htmlFor="custom-gift-note" className="text-sm font-medium mb-2 block">
                            Write Your Custom Message
                          </Label>
                          <textarea
                            id="custom-gift-note"
                            value={giftNote}
                            onChange={(e) => setGiftNote(e.target.value)}
                            className="w-full p-4 min-h-[100px] border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Write a heartfelt message for your recipient..."
                            maxLength={250}
                          />
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">
                              {giftNote.length}/250 characters
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setUseCustomMessage(false)
                                setGiftNote("")
                              }}
                              className="text-xs text-primary hover:underline"
                            >
                              Choose from templates instead
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <Tabs value={tabValue} onValueChange={setTabValue}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="delivery">Delivery</TabsTrigger>
                    <TabsTrigger value="pickup">Pickup</TabsTrigger>
                  </TabsList>

                  {/* Delivery Tab */}
                  <TabsContent value="delivery" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={deliveryData.email}
                          onChange={(e) => handleDeliveryChange("email", e.target.value)}
                          className="mt-1"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-sm font-medium">
                          Country <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="country"
                          value={deliveryData.country}
                          onChange={(e) => handleDeliveryChange("country", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={deliveryData.firstName}
                          onChange={(e) => handleDeliveryChange("firstName", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={deliveryData.lastName}
                          onChange={(e) => handleDeliveryChange("lastName", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="streetAddress" className="text-sm font-medium">
                        Street Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="streetAddress"
                        value={deliveryData.streetAddress}
                        onChange={(e) => handleDeliveryChange("streetAddress", e.target.value)}
                        className="mt-1"
                        placeholder="House number and street name"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="townCity" className="text-sm font-medium">
                          Town / City <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="townCity"
                          value={deliveryData.townCity}
                          onChange={(e) => handleDeliveryChange("townCity", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium">
                          State <span className="text-destructive">*</span>
                        </Label>
                        <Select value={deliveryData.state} onValueChange={(value) => handleDeliveryChange("state", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {nigerianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={deliveryData.phone}
                        onChange={(e) => handleDeliveryChange("phone", e.target.value)}
                        className="mt-1"
                        placeholder="08012345678"
                        required
                      />
                    </div>
                  </TabsContent>

                  {/* Pickup Tab */}
                  <TabsContent value="pickup" className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-4 block">
                        Select Pickup Location <span className="text-destructive">*</span>
                      </Label>
                      <div className="space-y-3">
                        {pickupLocations.map((location) => (
                          <div
                            key={location.id}
                            onClick={() => setPickupLocation(location.id)}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                              pickupLocation === location.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  pickupLocation === location.id
                                    ? "border-primary bg-primary"
                                    : "border-gray-300"
                                }`}
                              >
                                {pickupLocation === location.id && (
                                  <div className="w-3 h-3 rounded-full bg-white"></div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{location.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{location.address}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-none shadow-lg sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-medium text-sm">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {(isGift || searchParams.get("isGift") === "1" || searchParams.get("isGift") === "true") && !!giftNote && (
                  <div className="mb-3 p-3 rounded bg-orange-50 border border-orange-100">
                    <p className="text-xs font-semibold text-orange-800 mb-1">Gift Note:</p>
                    <p className="text-xs text-orange-700 italic">"{giftNote}"</p>
                  </div>
                )}

                <Separator className="my-6" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {tabValue === "pickup" ? "Pickup" : "Delivery"} Fee
                    </span>
                    <span className="font-medium">{shipping === 0 ? "FREE" : `₦${shipping.toLocaleString()}`}</span>
                  </div>
                </div>

                <Separator className="mb-6" />

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">₦{total.toLocaleString()}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full btn-gradient-clean"
                  onClick={handleCheckout}
                  disabled={isProcessing || (tabValue === "delivery" ? !isDeliveryFormValid() : !isPickupFormValid())}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay with Paystack
                    </>
                  )}
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
    </div>
  )
}