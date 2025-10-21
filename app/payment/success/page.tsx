"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem("ekondo-cart");
    
    // Redirect to retail page after 2 seconds
    const timer = setTimeout(() => {
      router.push("/retail");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

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
        <p className="text-sm text-muted-foreground">
          Redirecting to our products page...
        </p>
      </div>
    </div>
  );
}
