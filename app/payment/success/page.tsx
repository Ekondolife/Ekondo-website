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

  useEffect(() => {
    const processPayment = async () => {
      const experienceId = searchParams.get("experienceId");
      const experienceName = searchParams.get("experienceName");
      const ticketType = searchParams.get("ticketType");

      // If this is an experience booking, add to Brevo list
      if (experienceId && email && displayName) {
        try {
          const brevoListId = experienceId === "5" ? 15 : null; // Southside Festival has specific list ID
          
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

      // If this is a service booking, add to Brevo list
      if (!experienceId) {
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
                listId: null, // Create new list for the service
              }),
            });

            const data = await response.json();
            if (data.ok) {
              console.log("Successfully added service booking to Brevo list:", data.listId);
            }
          } catch (error) {
            console.error("Failed to add service booking to Brevo:", error);
          } finally {
            sessionStorage.removeItem("serviceBookingData");
          }
        }
      }

      // Record order in Supabase if this is a cart payment (not experience/service)
      if (!experienceId && !sessionStorage.getItem("serviceBookingData") && uid) {
        const cartData = localStorage.getItem("ekondo-cart");
        if (cartData) {
          try {
            const cartItems = JSON.parse(cartData);
            
            // Record each product in the order
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

      // Clear cart after successful payment
      localStorage.removeItem("ekondo-cart");
      setIsProcessing(false);

      // Redirect based on what was purchased
      const timer = setTimeout(() => {
        if (experienceId) {
          router.push("/experience");
        } else {
          router.push("/retail");
        }
      }, 3000);

      return () => clearTimeout(timer);
    };

    processPayment();
  }, [router, searchParams, email, displayName]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-8 text-muted-foreground">
          Thank you for your purchase! You will receive a confirmation email shortly.
        </p>
        {isProcessing && <p className="text-sm text-muted-foreground mb-4">Processing your booking...</p>}
        <p className="text-sm text-muted-foreground">
          Redirecting you...
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
