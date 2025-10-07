"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Package, Calendar, Heart, MapPin } from "lucide-react"

export default function AccountPage() {
  const [user] = useState({
    name: "Amara Okafor",
    email: "amara@example.com",
    phone: "+234 xxx xxx xxxx",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
  })

  const orders = [
    {
      id: "ORD-001",
      date: "June 1, 2025",
      status: "Delivered",
      total: 89.98,
      items: 2,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: "ORD-002",
      date: "May 25, 2025",
      status: "In Transit",
      total: 49.99,
      items: 1,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop&crop=center",
    },
  ]

  const upcomingEvents = [
    {
      title: "Plant Styling Workshop",
      date: "June 15, 2025",
      time: "2:00 PM",
      location: "Ekondo Park Lagos",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=center",
    },
  ]

  const wishlist = [
    {
      id: 1,
      name: "Bamboo Plant Stand",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Succulent Collection",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=100&h=100&fit=crop&crop=center",
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-16">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative w-24 h-24 rounded-full overflow-hidden organic-shape">
          <Image src={user.image || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold mb-1">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto mb-8 bg-primary/5">
          <TabsTrigger value="orders" className="py-3 organic-shape">
            <Package className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="events" className="py-3 organic-shape">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="py-3 organic-shape">
            <Heart className="h-4 w-4 mr-2" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="profile" className="py-3 organic-shape">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="mt-0">
          <h2 className="font-serif text-2xl font-bold mb-6">Order History</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-none shadow-md organic-shape">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden organic-shape flex-shrink-0">
                      <Image src={order.image || "/placeholder.svg"} alt="Order" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                        </div>
                        <div
                          className={`text-sm font-medium px-3 py-1 rounded organic-shape ${
                            order.status === "Delivered"
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {order.status}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{order.date}</span>
                        <span className="font-bold">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-0">
          <h2 className="font-serif text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-none shadow-md organic-shape">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden organic-shape flex-shrink-0">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {event.date} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist" className="mt-0">
          <h2 className="font-serif text-2xl font-bold mb-6">My Wishlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="border-none shadow-md organic-shape">
                <div className="relative aspect-square">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${item.price}</span>
                    <Button size="sm" className="organic-shape">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-0">
          <h2 className="font-serif text-2xl font-bold mb-6">Profile Settings</h2>
          <Card className="border-none shadow-md organic-shape max-w-2xl">
            <CardContent className="p-6">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} className="mt-1 organic-shape" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} className="mt-1 organic-shape" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue={user.phone} className="mt-1 organic-shape" />
                </div>
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input id="address" placeholder="Enter your address" className="mt-1 organic-shape" />
                </div>
                <Button className="organic-shape">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
