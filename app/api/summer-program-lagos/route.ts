import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabaseServer";

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
      location,
      selectedDates = [],
      numberOfKids,
      discountApplied,
      amount,
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

    if (!Array.isArray(selectedDates) || selectedDates.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Please select at least one Saturday" },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount ?? 0);
    const numericKids = Number(numberOfKids ?? 1);

    const record = {
      parent_name: parentName,
      parent_phone: parentPhone,
      parent_email: parentEmail,
      parent_relationship: parentRelationship,
      child_name: childName,
      child_dob: childDob,
      child_gender: childGender || null,
      location: location || "lagos",
      selected_dates: selectedDates,
      number_of_kids: numericKids,
      discount_applied: Boolean(discountApplied),
      amount: numericAmount,
      has_allergies:
        hasAllergies === true || hasAllergies === "yes"
          ? true
          : hasAllergies === false || hasAllergies === "no"
            ? false
            : null,
      allergy_details: allergyDetails || null,
      medical_conditions: medicalConditions || null,
      comfortable_physical:
        comfortablePhysical === true || comfortablePhysical === "yes"
          ? true
          : comfortablePhysical === false || comfortablePhysical === "no"
            ? false
            : null,
      emergency_name: emergencyName,
      emergency_phone: emergencyPhone,
      emergency_relationship: emergencyRelationship,
      photo_consent: photoConsent === true || photoConsent === "yes",
      activity_consent: activityConsent === true || activityConsent === "yes",
      hear_about: hearAbout || null,
      excited_about: excitedAbout || null,
      payment_status: "pending",
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_term: utm_term || null,
      utm_content: utm_content || null,
      referrer: referrer || null,
    };

    const supabase = createSupabaseServer();
    const { data, error } = await supabase
      .from("summer_program_lagos_registrations")
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

    return NextResponse.json({
      ok: true,
      registrationId: data.id,
      amount: numericAmount,
      requiresPayment: numericAmount > 0,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Registration failed";
    console.error("Lagos summer program registration error:", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
