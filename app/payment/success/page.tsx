"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useUser } from "@/components/user-provider";
import { supabase } from "@/lib/supabaseClient";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { email, displayName, uid } = useUser();
  const [isProcessing, setIsProcessing] = useState(true);
  const [successMessage, setSuccessMessage] = useState(
    "Thank you for your purchase! You will receive a confirmation email shortly."
  );

  useEffect(() => {
    const processPayment = async () => {
      const experienceId = searchParams.get("experienceId");
      const experienceName = searchParams.get("experienceName");
      const summerProgramRegistrationId = sessionStorage.getItem("summerProgramRegistrationId");
      const summerProgramLagosRegistrationId = sessionStorage.getItem("summerProgramLagosRegistrationId");
      const registrationId =
        searchParams.get("registrationId") ||
        summerProgramRegistrationId ||
        summerProgramLagosRegistrationId;
      const paymentType = searchParams.get("type") ||
        (summerProgramLagosRegistrationId ? "summer-program-lagos" : undefined);
      const reference =
        searchParams.get("reference") || searchParams.get("trxref");

      const isSummerProgramLagos = paymentType === "summer-program-lagos";
      const isSummer =
        paymentType === "summer-program" ||
        isSummerProgramLagos ||
        (!!registrationId && paymentType !== "homegrown");
      const isHomegrown =
        paymentType === "homegrown" ||
        !!sessionStorage.getItem("homegrownBookingData");

      let nextPath = "/retail";
      let message =
        "Thank you for your purchase! You will receive a confirmation email shortly.";

      if (isSummer && registrationId && reference) {
        const confirmRoute = isSummerProgramLagos
          ? "/api/summer-program-lagos/confirm"
          : "/api/summer-program/confirm";
        const successPath = isSummerProgramLagos
          ? "/summer-program-lagos?registered=true"
          : "/summer-program?registered=true";

        message =
          "Your child is registered for the Ekondo Kids Summer Program! We'll be in touch with camp details soon.";
        nextPath = successPath;
        try {
          const confirmRes = await fetch(confirmRoute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ registrationId, reference }),
          });
          const confirmData = await confirmRes.json();
          if (confirmData.ok) {
            console.log("Summer program registration confirmed");
          }
        } catch (error) {
          console.error("Failed to confirm summer program payment:", error);
        } finally {
          sessionStorage.removeItem("summerProgramRegistrationId");
          sessionStorage.removeItem("summerProgramLagosRegistrationId");
        }
      }

      if (isHomegrown) {
        message =
          "You're booked for Homegrown! See you on 1 August at Whispers Art Haus, Maitama. Your ticket is fully redeemable as plant credit.";
        nextPath = "/homegrown";
        sessionStorage.removeItem("homegrownBookingData");
      }

      if (experienceId && email && displayName) {
        nextPath = "/experience";
        try {
          const brevoListId = experienceId === "5" ? 15 : null;

          const response = await fetch("/api/brevo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              firstName: displayName || "User",
              experienceName: experienceName || "Experience",
              listId: brevoListId,
            }),
          });

          const data = await response.json();
          if (data.ok) {
            console.log("Successfully added to Brevo list:", data.listId);
          }
        } catch (error) {
          console.error("Failed to add to Brevo:", error);
        }
      }

      if (!experienceId && !isSummer && !isHomegrown) {
        const bookingData = sessionStorage.getItem("serviceBookingData");
        if (bookingData && email) {
          try {
            const booking = JSON.parse(bookingData);

            const response = await fetch("/api/brevo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                firstName: displayName || booking.name || "User",
                experienceName: booking.serviceName || "Service",
                listId: null,
              }),
            });

            const data = await response.json();
            if (data.ok) {
              console.log(
                "Successfully added service booking to Brevo list:",
                data.listId
              );
            }
          } catch (error) {
            console.error("Failed to add service booking to Brevo:", error);
          } finally {
            sessionStorage.removeItem("serviceBookingData");
          }
        }
      }

      if (
        !experienceId &&
        !isSummer &&
        !isHomegrown &&
        !sessionStorage.getItem("serviceBookingData") &&
        uid
      ) {
        const cartData = localStorage.getItem("ekondo-cart");
        if (cartData) {
          try {
            const cartItems = JSON.parse(cartData);

            for (const item of cartItems) {
              await supabase.from("orders").insert([
                {
                  user_uid: uid,
                  product_id: item.id,
                  product_name: item.name,
                  product_image: item.image || "/placeholder.svg",
                  quantity: item.quantity,
                  total_price: item.price * item.quantity,
                  status: "completed",
                },
              ]);
            }
            console.log("Order recorded in Supabase");
          } catch (error) {
            console.error("Failed to record order in Supabase:", error);
          }
        }
      }

      localStorage.removeItem("ekondo-cart");
      setSuccessMessage(message);
      setIsProcessing(false);

      const timer = setTimeout(() => {
        router.push(nextPath);
      }, 4000);

      return () => clearTimeout(timer);
    };

    processPayment();
  }, [router, searchParams, email, displayName, uid]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg mb-8 text-muted-foreground">{successMessage}</p>
        {isProcessing && (
          <p className="text-sm text-muted-foreground mb-4">
            Processing your booking...
          </p>
        )}
        <p className="text-sm text-muted-foreground">Redirecting you...</p>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
