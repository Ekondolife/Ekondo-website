"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { getUserProfile, updateUserProfile, UserProfile } from "@/lib/userService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Package, Calendar, Heart, MapPin, Save, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    profileImage: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profileData = await getUserProfile(firebaseUser.uid);
        if (profileData) {
          setUser({
            ...profileData,
            email: firebaseUser.email,
          });
          setFormData({
            fullName: profileData.fullName || "",
            phone: profileData.phone || "",
            profileImage: profileData.profileImage || "",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await updateUserProfile(user.uid, {
        fullName: formData.fullName,
        phone: formData.phone,
        profileImage: formData.profileImage,
      });
      
      // Update local user state
      setUser((prev: UserProfile | null) => prev ? ({
        ...prev,
        fullName: formData.fullName,
        phone: formData.phone,
        profileImage: formData.profileImage,
      }) : null);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Loading account...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="font-serif text-3xl font-bold mb-4">You're not signed in</h1>
        <p className="text-muted-foreground mb-6">Please sign in to access your account.</p>
        <Button onClick={() => (window.location.href = "/login")}>Go to Login</Button>
      </div>
    );
  }

  // Dummy order/event/wishlist data for now
  const orders = [
    {
      id: "ORD-001",
      date: "June 1, 2025",
      status: "Delivered",
      total: 89.98,
      items: 2,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop&crop=center",
    },
  ];

  const upcomingEvents = [
    {
      title: "Plant Styling Workshop",
      date: "June 15, 2025",
      time: "2:00 PM",
      location: "Ekondo Park Lagos",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=center",
    },
  ];

  const wishlist = [
    {
      id: 1,
      name: "Bamboo Plant Stand",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
    },
  ];

  return (
    <div className="container px-4 py-12 md:py-16">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative w-24 h-24 rounded-full overflow-hidden organic-shape">
          {user.profileImage && user.profileImage.trim() !== "" ? (
            <Image 
              src={user.profileImage} 
              alt={user.fullName || "User"} 
              fill 
              className="object-cover"
              onError={(e) => {
                // Fallback to avatar if image fails to load
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.email || "User")}&background=random`;
              }}
            />
          ) : (
            <Image 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.email || "User")}&background=random`}
              alt={user.fullName || "User"} 
              fill 
              className="object-cover" 
            />
          )}
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold mb-1">{user.fullName || "Unnamed User"}</h1>
          <p className="text-muted-foreground">{user.email || "No email"}</p>
          {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto mb-8 bg-primary/5">
          <TabsTrigger value="orders"><Package className="h-4 w-4 mr-2" /> Orders</TabsTrigger>
          <TabsTrigger value="events"><Calendar className="h-4 w-4 mr-2" /> Events</TabsTrigger>
          <TabsTrigger value="wishlist"><Heart className="h-4 w-4 mr-2" /> Wishlist</TabsTrigger>
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" /> Profile</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <h2 className="font-serif text-2xl font-bold mb-6">Order History</h2>
          {orders.map((order) => (
            <Card key={order.id} className="border-none shadow-md organic-shape mb-4">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden organic-shape flex-shrink-0">
                  <Image src={order.image} alt="Order" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{order.id}</h3>
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded organic-shape">{order.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <h2 className="font-serif text-2xl font-bold mb-6">Profile Settings</h2>
          <Card className="border-none shadow-md organic-shape max-w-2xl">
            <CardContent className="p-6">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={formData.fullName} 
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="mt-1 organic-shape" 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email || ""} className="mt-1 organic-shape" disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 organic-shape" 
                  />
                </div>
                <div>
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input 
                    id="profileImage" 
                    type="url" 
                    value={formData.profileImage} 
                    onChange={(e) => setFormData(prev => ({ ...prev, profileImage: e.target.value }))}
                    placeholder="https://example.com/photo.jpg"
                    className="mt-1 organic-shape" 
                  />
                  {formData.profileImage && formData.profileImage.trim() !== "" && (
                    <div className="mt-2">
                      <Label className="text-sm text-muted-foreground">Preview:</Label>
                      <div className="relative w-16 h-16 rounded-full overflow-hidden organic-shape mt-1">
                        <Image 
                          src={formData.profileImage} 
                          alt="Preview" 
                          fill 
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <Button 
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="organic-shape btn-gradient"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
