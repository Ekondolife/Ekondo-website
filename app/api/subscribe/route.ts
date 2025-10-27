import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Send request to Brevo API
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY as string,
      },
      body: JSON.stringify({
        email,
        listIds: [14], 
        updateEnabled: true, 
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to subscribe" },
        { status: response.status }
      )
    }

    return NextResponse.json({ message: "Successfully subscribed!" })
  } catch (error) {
    console.error("Brevo error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
