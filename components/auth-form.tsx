"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, Phone, ImageIcon, User } from "lucide-react";

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // ✅ NEW FIELD
  const [phone, setPhone] = useState(""); // ✅ NEW FIELD
  const [profileImage, setProfileImage] = useState(""); // ✅ NEW FIELD
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        await loginUser(email, password);
        setSuccess("Signed in successfully!");
        setTimeout(() => router.push("/"), 1500);
      } else {
        // ✅ Include fullname, phone and profile image in signup
        await registerUser(email, password, fullName, phone || "", profileImage || "");
        setSuccess("Account created successfully!");
        setTimeout(() => router.push("/"), 1500);
      }

      setEmail("");
      setPassword("");
      setFullName("");
      setPhone("");
      setProfileImage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-lg organic-shape">
      <CardHeader className="text-center pb-4">
        <CardTitle className="font-serif text-2xl font-bold text-primary">
          {isLogin ? "Welcome Back" : "Join Ekondo"}
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          {isLogin ? "Sign in to your account" : "Create your account to get started"}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="pl-10 organic-shape"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 pr-10 organic-shape"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* ✅ Show only when signing up */}
          {!isLogin && (
            <>
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10 organic-shape"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="pl-10 organic-shape"
                    required
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image (URL)</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profileImage"
                    type="url"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="pl-10 organic-shape"
                  />
                </div>
              </div>
            </>
          )}

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="p-3 rounded-md bg-green-100 border border-green-300">
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <Button type="submit" className="w-full btn-gradient organic-shape" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <Separator className="my-6" />

        <div className="text-center">
          <button
            className="text-sm text-primary hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don’t have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
