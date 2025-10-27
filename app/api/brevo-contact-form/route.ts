import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, phone, message } = await request.json();

    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY not set");
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = 18; // Contact form submissions list

    // Add contact to Brevo list
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstName: name,
        attributes: {
          PHONE: phone || "",
          MESSAGE: message || "",
          SOURCE: "Contact Form",
        },
        listIds: [listId],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If contact already exists, update it
      if (data.code === "duplicate_parameter" || data.code === "invalid_parameter") {
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: "PUT",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listIds: [listId],
            attributes: {
              PHONE: phone || "",
              MESSAGE: message || "",
              SOURCE: "Contact Form",
            },
          }),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update contact in Brevo");
        }
      } else {
        throw new Error(data.message || "Brevo API failed");
      }
    }

    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    console.error("💥 Brevo contact form error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

