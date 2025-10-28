"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UTMFormSync from "./utm-form-sync"

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
      const utm = {
        utm_source: (document.getElementById("utm_source") as HTMLInputElement)?.value,
        utm_medium: (document.getElementById("utm_medium") as HTMLInputElement)?.value,
        utm_campaign: (document.getElementById("utm_campaign") as HTMLInputElement)?.value,
        utm_term: (document.getElementById("utm_term") as HTMLInputElement)?.value,
        utm_content: (document.getElementById("utm_content") as HTMLInputElement)?.value,
        referrer: (document.getElementById("referrer") as HTMLInputElement)?.value,
      }

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...utm }),
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
        <UTMFormSync />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background"
        />
        <input type="hidden" name="UTM_SOURCE" id="utm_source" />
        <input type="hidden" name="UTM_MEDIUM" id="utm_medium" />
        <input type="hidden" name="UTM_CAMPAIGN" id="utm_campaign" />
        <input type="hidden" name="UTM_TERM" id="utm_term" />
        <input type="hidden" name="UTM_CONTENT" id="utm_content" />
        <input type="hidden" name="REFERRER" id="referrer" />

        <Button type="submit" disabled={loading} className="btn-gradient bg-transparent organic-shape">
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {message && <p className="mt-3 text-sm text-center text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-3 text-sm text-center text-red-600 font-medium">{error}</p>}
    </div>
  )
}
