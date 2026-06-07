import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const { registrationId, reference } = await request.json();

    if (!registrationId || !reference) {
      return NextResponse.json(
        { ok: false, error: "Missing registrationId or reference" },
        { status: 400 }
      );
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      throw new Error("PAYSTACK_SECRET_KEY not set");
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyRes.json();
    if (!verifyRes.ok || verifyData.data?.status !== "success") {
      return NextResponse.json(
        { ok: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServer();
    const { data: registration, error: fetchError } = await supabase
      .from("summer_program_registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (fetchError || !registration) {
      return NextResponse.json(
        { ok: false, error: "Registration not found" },
        { status: 404 }
      );
    }

    if (registration.payment_status === "paid") {
      return NextResponse.json({ ok: true, alreadyPaid: true });
    }

    const paidAmount = verifyData.data.amount / 100;
    if (paidAmount < registration.amount) {
      return NextResponse.json(
        { ok: false, error: "Payment amount mismatch" },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabase
      .from("summer_program_registrations")
      .update({
        payment_status: "paid",
        paystack_reference: reference,
        paid_at: new Date().toISOString(),
      })
      .eq("id", registrationId);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.json(
        { ok: false, error: "Failed to update registration" },
        { status: 500 }
      );
    }

    if (process.env.BREVO_API_KEY) {
      try {
        const apiKey = process.env.BREVO_API_KEY;
        await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(registration.parent_email)}`,
          {
            method: "PUT",
            headers: {
              "api-key": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              attributes: {
                PAYMENT_STATUS: "paid",
                PAYSTACK_REFERENCE: reference,
              },
            }),
          }
        );
      } catch (brevoErr) {
        console.error("Brevo payment update error (non-fatal):", brevoErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Confirmation failed";
    console.error("Summer program confirm error:", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
