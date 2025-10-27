"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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

export default function CheckoutPage() {
  const { items: cartItems, subtotal, total: cartTotal } = useCart()
  const router = useRouter()
  const [tabValue, setTabValue] = useState("delivery")
  const [isProcessing, setIsProcessing] = useState(false)

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

  const shipping = tabValue === "pickup" ? 0 : 6000 // Free shipping for pickup, ₦6,000 for delivery
  const total = subtotal + shipping

  const handleDeliveryChange = (field: string, value: string) => {
    setDeliveryData(prev => ({ ...prev, [field]: value }))
  }

  const isDeliveryFormValid = () => {
    return (
      deliveryData.email &&
      deliveryData.firstName &&
      deliveryData.lastName &&
      deliveryData.streetAddress &&
      deliveryData.townCity &&
      deliveryData.state &&
      deliveryData.phone
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
        email: "pickup@ekondolife.com", // Default for pickup
        metadata: {
          type: "pickup",
          locationId: pickupLocation,
          locationName: selectedLocation?.name || "",
          locationAddress: selectedLocation?.address || "",
          phone: "", // Can be optional for pickup
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
        }),
      })
      const data = await res.json()

      if (!data.ok) throw new Error(data.error || "Payment init failed")

      // Redirect user to Paystack checkout
      window.location.href = data.data.data.authorization_url
    } catch (err: any) {
      alert("Payment failed: " + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
    }
  }, [cartItems.length, router])

  if (cartItems.length === 0) {
    return null
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
            <Card className="border-none shadow-md organic-shape">
              <CardContent className="p-6">
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
                          className="mt-1 organic-shape"
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
                          className="mt-1 organic-shape"
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
                          className="mt-1 organic-shape"
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
                          className="mt-1 organic-shape"
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
                        className="mt-1 organic-shape"
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
                          className="mt-1 organic-shape"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-medium">
                          State <span className="text-destructive">*</span>
                        </Label>
                        <Select value={deliveryData.state} onValueChange={(value) => handleDeliveryChange("state", value)}>
                          <SelectTrigger className="mt-1 organic-shape">
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
                        className="mt-1 organic-shape"
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
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors organic-shape ${
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
            <Card className="border-none shadow-lg organic-shape sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden organic-shape flex-shrink-0">
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
                  className="w-full organic-shape btn-gradient"
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

