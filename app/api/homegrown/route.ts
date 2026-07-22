import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      email,
      name,
      phone,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
    } = await request.json();

    if (!email || !name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY not set");
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listName = "Homegrown Workshop August 2026";

    const searchResponse = await fetch("https://api.brevo.com/v3/contacts/lists", {
      headers: { "api-key": apiKey },
    });
    const searchData = await searchResponse.json();
    let listId = searchData.lists?.find(
      (l: { name: string; id: number }) =>
        l.name.toLowerCase() === listName.toLowerCase()
    )?.id;

    if (!listId) {
      const createRes = await fetch("https://api.brevo.com/v3/contacts/lists", {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ name: listName, folderId: 1 }),
      });
      const createData = await createRes.json();
      if (createRes.ok) listId = createData.id;
    }

    const attributes: Record<string, string> = {
      NAME: name,
      PHONE: phone,
      SOURCE: "Homegrown Workshop",
      EVENT_DATE: "1 August 2026",
      AMOUNT: "5000",
    };
    if (utm_source) attributes.UTM_SOURCE = utm_source;
    if (utm_medium) attributes.UTM_MEDIUM = utm_medium;
    if (utm_campaign) attributes.UTM_CAMPAIGN = utm_campaign;
    if (utm_term) attributes.UTM_TERM = utm_term;
    if (utm_content) attributes.UTM_CONTENT = utm_content;
    if (referrer) attributes.REFERRER = referrer;

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        attributes,
        listIds: listId ? [listId] : [],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.code === "duplicate_parameter" || data.code === "invalid_parameter") {
        const updateResponse = await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
          {
            method: "PUT",
            headers: { "api-key": apiKey, "Content-Type": "application/json" },
            body: JSON.stringify({
              listIds: listId ? [listId] : [],
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

    return NextResponse.json({ ok: true, listId });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Booking failed";
    console.error("Homegrown booking error:", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
