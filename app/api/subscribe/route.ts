import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const {
      email,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
    } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Prepare attributes for Brevo
    const attributes: Record<string, string> = {}
    if (utm_source) attributes.UTM_SOURCE = utm_source
    if (utm_medium) attributes.UTM_MEDIUM = utm_medium
    if (utm_campaign) attributes.UTM_CAMPAIGN = utm_campaign
    if (utm_term) attributes.UTM_TERM = utm_term
    if (utm_content) attributes.UTM_CONTENT = utm_content
    if (referrer) attributes.REFERRER = referrer

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
        attributes,
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
