"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

function PaymentCallbackContent() {
  const [status, setStatus] = useState("Verifying...");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (!reference) {
      setStatus("❌ No payment reference found");
      setIsLoading(false);
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${reference}`);
        const data = await res.json();

        if (data.ok && data.data.status === "success") {
          setStatus("✅ Payment successful!");
          // Clear cart after successful payment
          localStorage.removeItem("ekondo-cart");
          // Redirect to retail page after showing success
          setTimeout(() => {
            window.location.href = "/retail";
          }, 3000);
        } else {
          setStatus("❌ Payment verification failed.");
        }
      } catch (err) {
        setStatus("⚠️ Error verifying payment.");
      } finally {
        setIsLoading(false);
      }
    }

    verifyPayment();
  }, [reference]);

  const getStatusIcon = () => {
    if (isLoading) return <AlertCircle className="h-8 w-8 text-yellow-500 animate-spin" />;
    if (status.includes("✅")) return <CheckCircle className="h-8 w-8 text-green-500" />;
    if (status.includes("❌")) return <XCircle className="h-8 w-8 text-red-500" />;
    return <AlertCircle className="h-8 w-8 text-yellow-500" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-6">
          {getStatusIcon()}
        </div>
        <h1 className="font-serif text-2xl font-bold mb-4">Payment Status</h1>
        <p className="text-lg mb-8">{status}</p>
        
        {status.includes("✅") && (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Thank you for your purchase! You will receive a confirmation email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="organic-shape">
                <Link href="/retail">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild className="organic-shape bg-transparent">
                <Link href="/account">View Orders</Link>
              </Button>
            </div>
          </div>
        )}
        
        {!status.includes("✅") && (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              There was an issue with your payment. Please try again or contact support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="organic-shape">
                <Link href="/cart">Try Again</Link>
              </Button>
              <Button variant="outline" asChild className="organic-shape bg-transparent">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-yellow-500 animate-spin mx-auto mb-4" />
          <p>Loading payment status...</p>
        </div>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
