"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function PaymentFailedPage() {
  const router = useRouter();
  const params = useSearchParams();
  const reason = params.get("reason");

  useEffect(() => {
    document.title = "Payment Failed - Lazuli By Neha";
  }, []);

  const getMessage = () => {
    switch (reason) {
      case "cancelled":
        return "You cancelled the payment. Please try again to complete your order.";
      case "verification_failed":
        return "We couldn't verify your payment. Please contact support if the amount was deducted.";
      case "network_error":
        return "There was a network issue while processing your payment.";
      default:
        return "Something went wrong during payment. Please try again.";
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-2xl font-semibold text-red-600 mb-3">Payment Failed</h1>
      <p className="text-muted-foreground mb-6">{getMessage()}</p>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/checkout")} variant="default">
          Retry Payment
        </Button>
        <Button onClick={() => router.push("/")} variant="outline">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
