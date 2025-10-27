"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Subscription failed")

      setMessage("🎉 Success! You've been subscribed to our newsletter.")
      setEmail("")
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
      setTimeout(() => {
        setMessage("")
        setError("")
      }, 4000)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {message && <p className="mt-3 text-sm text-center text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-3 text-sm text-center text-red-600 font-medium">{error}</p>}
    </div>
  )
}
