import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      email,
      name,
      phone,
      preferredDate,
      message,
      serviceId,
      serviceName,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
    } = await request.json();

    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY not set");
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = 19; 

    // Prepare attributes for Brevo
    const attributes: Record<string, string> = {
      NAME: name || "",
      PHONE: phone || "",
      SERVICE_ID: String(serviceId || ""),
      SERVICE_NAME: serviceName || "",
      PREFERRED_DATE: preferredDate || "",
      MESSAGE: message || "",
      SOURCE: "Service Booking",
    };
    if (utm_source) attributes.UTM_SOURCE = utm_source;
    if (utm_medium) attributes.UTM_MEDIUM = utm_medium;
    if (utm_campaign) attributes.UTM_CAMPAIGN = utm_campaign;
    if (utm_term) attributes.UTM_TERM = utm_term;
    if (utm_content) attributes.UTM_CONTENT = utm_content;
    if (referrer) attributes.REFERRER = referrer;

    // Add contact to Brevo list
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If contact already exists, update it
      if (data.code === "duplicate_parameter" || data.code === "invalid_parameter") {
        const updateResponse = await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
          {
            method: "PUT",
            headers: {
              "api-key": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              listIds: [listId],
              attributes,
            }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error("Failed to update contact in Brevo");
        }
      } else {
        throw new Error(data.message || "Brevo API failed");
      }
    }

    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    console.error("💥 Brevo service booking error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}