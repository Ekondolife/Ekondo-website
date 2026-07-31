import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, amount, experienceId, experienceName, ticketType, userId, registrationId, metadata: customerMetadata } = await request.json();

    if (!process.env.PAYSTACK_SECRET_KEY) {
      throw new Error("PAYSTACK_SECRET_KEY not set");
    }

    const isHomegrown = customerMetadata?.type === "homegrown";
    const paymentType = customerMetadata?.type || (registrationId ? "summer-program" : undefined);

    // Build callback URL based on whether it's a checkout or experience payment
    let callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/payment/success`;
    if (experienceId) {
      callbackUrl += `?experienceId=${experienceId}&experienceName=${encodeURIComponent(experienceName)}&ticketType=${encodeURIComponent(ticketType || "")}&userId=${userId || ""}`;
    } else if (registrationId) {
      callbackUrl += `?registrationId=${registrationId}&type=${encodeURIComponent(paymentType || "summer-program")}`;
    } else if (isHomegrown) {
      callbackUrl += `?type=homegrown`;
    }

    // Build metadata object
    const paymentMetadata: any = {};
    
    if (experienceId) {
      paymentMetadata.experienceId = experienceId;
      paymentMetadata.experienceName = experienceName;
      paymentMetadata.ticketType = ticketType;
      paymentMetadata.userId = userId;
    }
    
    // Add customer metadata from checkout
    if (registrationId) {
      paymentMetadata.registrationId = registrationId;
      paymentMetadata.type = paymentType || "summer-program";
    }

    if (customerMetadata) {
      Object.assign(paymentMetadata, customerMetadata);
    }

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack uses kobo
        callback_url: callbackUrl,
        metadata: paymentMetadata,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Paystack init failed");

    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    console.error("💥 Paystack init error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
