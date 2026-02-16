import { useEffect } from "react"

export default function InstagramFeed() {
  // Load Elfsight script once on the client
  useEffect(() => {
    if (typeof document === "undefined") return

    const existingScript = document.querySelector(
      'script[src="https://elfsightcdn.com/platform.js"]'
    )

    if (existingScript) return

    const script = document.createElement("script")
    script.src = "https://elfsightcdn.com/platform.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="w-full">
      {/* Elfsight Instagram Feed | Ekondo instagram */}
      <div
        className="elfsight-app-9edd2dc4-e7ba-4f2a-9ca3-9c37f0e5216c"
        data-elfsight-app-lazy
      />
    </div>
  )
}
