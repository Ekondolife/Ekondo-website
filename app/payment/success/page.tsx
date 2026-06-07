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
  const [isSummerProgram, setIsSummerProgram] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      const experienceId = searchParams.get("experienceId");
      const experienceName = searchParams.get("experienceName");
      const registrationId =
        searchParams.get("registrationId") ||
        sessionStorage.getItem("summerProgramRegistrationId");
      const paymentType = searchParams.get("type");
      const reference =
        searchParams.get("reference") ||
        searchParams.get("trxref");

      const isSummer =
        paymentType === "summer-program" || !!registrationId;

      if (isSummer && registrationId && reference) {
        setIsSummerProgram(true);
        try {
          const confirmRes = await fetch("/api/summer-program/confirm", {
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
        }
      }

      if (experienceId && email && displayName) {
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

      if (!experienceId && !isSummer) {
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
      setIsProcessing(false);

      const timer = setTimeout(() => {
        if (isSummer) {
          router.push("/summer-program?registered=true");
        } else if (experienceId) {
          router.push("/experience");
        } else {
          router.push("/retail");
        }
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
        <p className="text-lg mb-8 text-muted-foreground">
          {isSummerProgram
            ? "Your child is registered for the Ekondo Kids Summer Program! We'll be in touch with camp details soon."
            : "Thank you for your purchase! You will receive a confirmation email shortly."}
        </p>
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
