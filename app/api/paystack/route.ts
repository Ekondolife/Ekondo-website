import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, amount } = await request.json();

    if (!process.env.PAYSTACK_SECRET_KEY) {
      throw new Error("PAYSTACK_SECRET_KEY not set");
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
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/payment/success`,
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
