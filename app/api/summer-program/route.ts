import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";
import { calculateAmount, ProgramOption } from "@/lib/summer-program-data";

async function syncToBrevo(data: Record<string, unknown>, paymentStatus: string) {
  if (!process.env.BREVO_API_KEY) return;

  const apiKey = process.env.BREVO_API_KEY;
  const listName = "Ekondo Kids Summer Program 2026";

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
    NAME: String(data.parent_name || ""),
    PHONE: String(data.parent_phone || ""),
    CHILD_NAME: String(data.child_name || ""),
    PROGRAM_OPTION: String(data.program_option || ""),
    PAYMENT_STATUS: paymentStatus,
    SOURCE: "Summer Program Registration",
  };

  if (data.child_dob) attributes.CHILD_DOB = String(data.child_dob);
  if (data.amount) attributes.AMOUNT = String(data.amount);
  if (data.daily_pass_dates)
    attributes.DAILY_DATES = (data.daily_pass_dates as string[]).join(", ");
  if (data.utm_source) attributes.UTM_SOURCE = String(data.utm_source);

  const email = String(data.parent_email);
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

  if (!response.ok) {
    const err = await response.json();
    if (err.code === "duplicate_parameter" || err.code === "invalid_parameter") {
      await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ listIds: listId ? [listId] : [], attributes }),
      });
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      parentName,
      parentPhone,
      parentEmail,
      parentRelationship,
      childName,
      childDob,
      childGender,
      programOption,
      dailyPassDates = [],
      hasAllergies,
      allergyDetails,
      medicalConditions,
      comfortablePhysical,
      emergencyName,
      emergencyPhone,
      emergencyRelationship,
      photoConsent,
      activityConsent,
      hearAbout,
      excitedAbout,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
    } = body;

    if (
      !parentName ||
      !parentPhone ||
      !parentEmail ||
      !parentRelationship ||
      !childName ||
      !childDob ||
      !programOption ||
      !emergencyName ||
      !emergencyPhone ||
      !emergencyRelationship ||
      photoConsent === undefined ||
      activityConsent === undefined
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (programOption === "daily_pass" && dailyPassDates.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Please select at least one date for the Daily Pass" },
        { status: 400 }
      );
    }

    const amount = calculateAmount(programOption as ProgramOption, dailyPassDates);
    const paymentStatus = programOption === "not_sure" ? "interest_only" : "pending";

    const record = {
      parent_name: parentName,
      parent_phone: parentPhone,
      parent_email: parentEmail,
      parent_relationship: parentRelationship,
      child_name: childName,
      child_dob: childDob,
      child_gender: childGender || null,
      program_option: programOption,
      daily_pass_dates: dailyPassDates,
      amount,
      has_allergies: hasAllergies ?? null,
      allergy_details: allergyDetails || null,
      medical_conditions: medicalConditions || null,
      comfortable_physical: comfortablePhysical ?? null,
      emergency_name: emergencyName,
      emergency_phone: emergencyPhone,
      emergency_relationship: emergencyRelationship,
      photo_consent: photoConsent,
      activity_consent: activityConsent,
      hear_about: hearAbout || null,
      excited_about: excitedAbout || null,
      payment_status: paymentStatus,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_term: utm_term || null,
      utm_content: utm_content || null,
      referrer: referrer || null,
    };

    const supabase = createSupabaseServer();
    const { data, error } = await supabase
      .from("summer_program_registrations")
      .insert([record])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to save registration. Please try again." },
        { status: 500 }
      );
    }

    try {
      await syncToBrevo(record, paymentStatus);
    } catch (brevoErr) {
      console.error("Brevo sync error (non-fatal):", brevoErr);
    }

    return NextResponse.json({
      ok: true,
      registrationId: data.id,
      amount,
      requiresPayment: amount > 0,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Registration failed";
    console.error("Summer program registration error:", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
