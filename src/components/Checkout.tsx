"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Script from "next/script";
import AddAddressModal from "@/components/user/AddAddressModal";
import { clearCart } from "@/store/cartSlice";
import LoginRegister from "@/components/auth/LoginRegister";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Address = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  company?: string;
  postalCode?: string;
  contactNumber?: string;
  city?: string;
  country?: string;
  default?: boolean;
};

type CheckoutProps = {
  initialAddresses?: Address[];
};

const Checkout: React.FC<CheckoutProps> = ({ initialAddresses = [] }) => {
  const router = useRouter();
  const { status } = useSession();
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const totalAmount = cartItems.reduce(
    (total: any, item: any) => total + item.price * item.quantity,
    0
  );

  const [addresses, setAddresses] = React.useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = React.useState<
    string | null
  >(() => {
    const def = initialAddresses.find((a) => a.default);
    return def?._id ?? initialAddresses[0]?._id ?? null;
  });
  useEffect(() => {
    if (status === "unauthenticated") {
      setShowLoginModal(true);
    }
  }, [status]);
  if (showLoginModal) {
    return (
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent aria-modal="true">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please login to continue checkout
            </DialogDescription>
          </DialogHeader>
          <LoginRegister checkout onSuccess={() => setShowLoginModal(false)} />
        </DialogContent>
      </Dialog>
    );
  }
  const [loadingAddresses, setLoadingAddresses] =
    React.useState<boolean>(false);
  const [razorpayLoaded, setRazorpayLoaded] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState<boolean>(true);
  const [showAddressList, setShowAddressList] = React.useState<boolean>(false);
  const [isAddAddressOpen, setIsAddAddressOpen] =
    React.useState<boolean>(false);
  const [savingAddress, setSavingAddress] = React.useState<boolean>(false);
  const [addressError, setAddressError] = React.useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [pendingOrderId, setPendingOrderId] = React.useState<string | null>(
    null
  );
  const [isProcessingPayment, setIsProcessingPayment] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }
    const src = "https://checkout.razorpay.com/v1/checkout.js";
    let script = document.querySelector(
      `script[src="${src}"]`
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay script");
      document.body.appendChild(script);
    }
    const t = setInterval(() => {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        clearInterval(t);
      }
    }, 200);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    // If no addresses preloaded, try fetching after auth
    if (status !== "authenticated" || addresses.length > 0) return;
    const fetchAddresses = async () => {
      try {
        setLoadingAddresses(true);
        const res = await fetch("/api/user/address");
        const data = await res.json();
        if (res.ok && Array.isArray(data.addresses)) {
          const normalized = data.addresses.map((a: any) => ({
            ...a,
            _id: a._id?.toString?.() || a._id,
          }));
          setAddresses(normalized);
          const def = normalized.find((a: Address) => a.default);
          setSelectedAddressId(def?._id ?? normalized[0]?._id ?? null);
        }
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, [status, addresses.length]);

  const handleAddAddress = async (addr: Address) => {
    try {
      setSavingAddress(true);
      setAddressError(null);
      const res = await fetch("/api/user/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addr),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.addresses)) {
        const normalized = data.addresses.map((a: any) => ({
          ...a,
          _id: a._id?.toString?.() || a._id,
        }));
        setAddresses(normalized);
        const def = normalized.find((a: Address) => a.default);
        setSelectedAddressId(
          def?._id ?? normalized[normalized.length - 1]?._id ?? null
        );
        setShowAddressList(false);
      } else {
        setAddressError(data.error || "Failed to add address");
      }
    } catch (e) {
      setAddressError("Failed to add address");
    } finally {
      setSavingAddress(false);
      setIsAddAddressOpen(false);
    }
  };

  const startRazorpay = async () => {
    try {
      if (isProcessingPayment) {
        return;
      }
      if (!razorpayLoaded || !window.Razorpay) {
        console.error("Razorpay not loaded yet");
        return;
      }
      if (!selectedAddressId) {
        alert("Please select a delivery address first.");
        return;
      }

      // Create order in our DB only if we don't already have a pending one
      let createData: any = { orderId: pendingOrderId };
      if (!pendingOrderId) {
        const createRes = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: selectedAddress || undefined,
            items: cartItems,
            subtotal: totalAmount,
          }),
        });
        createData = await createRes.json();
        console.log("createData", createData);
        if (!createRes.ok) {
          alert(createData.error || "Failed to create order");
          return;
        }
        setPendingOrderId(createData.orderId);
      }

      // Create Razorpay order
      const res = await fetch("/api/payment/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100),
          orderId: createData.orderId || pendingOrderId,
        }),
      });
      const order = await res.json();

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        name: "Lazuli By Neha",
        description: "Checkout",
        image: "/logo.png",
        order_id: order.id,
        theme: { color: "#3399cc" },
        notes: {
          addressId: selectedAddressId,
          orderId: createData.orderId || pendingOrderId,
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
            try { rzp.close(); } catch(e) {}
            window.location.href = "/payment-failed?reason=cancelled";
          },
        },
        handler: async function (response: any) {
          try {
            // ✅ This is where Razorpay sends you payment_id, order_id, signature
            console.log("Payment Response:", response);

            // Now send it to your backend for verification
            setIsProcessingPayment(true);
            const verifyRes = await fetch("/api/payment/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                orderId: createData.orderId || pendingOrderId,
              }), // includes payment_id, order_id, signature, and our MongoDB orderId
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              // Payment verified ✅
              const finalOrderId = createData.orderId || pendingOrderId;
              setPendingOrderId(null);
              setIsProcessingPayment(false);
              // Clear cart after successful payment verification
              dispatch(clearCart());
              router.push("/order-confirmation/" + finalOrderId);
            } else {
              setIsProcessingPayment(false);
              try { rzp.close(); } catch(e) {}
              window.location.href = "/payment-failed?reason=verification_failed";
              return;
            }
          } catch (err) {
            console.error("Verification error:", err);
            setIsProcessingPayment(false);
            router.push(`/payment-failed?reason=network_error`);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.log("Payment Failed:", response);
      
        setIsProcessingPayment(false);
      
        // Mark failed order (optional but recommended)
        if (createData?.orderId || pendingOrderId) {
          fetch("/api/payment/razorpay/mark-failed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: createData.orderId || pendingOrderId,
              reason: response.error?.description || "Payment failed",
            }),
          });
        }
      
        // Close Razorpay window
        try { rzp.close(); } catch(e) {}
      
        // Hard redirect (fixes your issue)
        window.location.href = `/payment-failed?reason=payment_failed`;
      });
      setIsProcessingPayment(true);
      rzp.open();
    } catch (err) {
      console.error("Razorpay init error:", err);
      setIsProcessingPayment(false);
    }
  };

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  const AddressCard: React.FC<{ addr: Address }> = ({ addr }) => (
    <label className="border rounded p-4 bg-white shadow cursor-pointer flex gap-3">
      <input
        type="radio"
        className="mt-1"
        name="selectedAddress"
        checked={selectedAddressId === addr._id}
        onChange={() => setSelectedAddressId(addr._id ?? null)}
      />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold truncate">
            {addr.firstName} {addr.lastName}
          </span>
          {addr.default && (
            <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded">
              Default
            </span>
          )}
        </div>
        <div className="text-sm text-muted-foreground truncate">
          {addr.company}
        </div>
        <div className="text-sm truncate">{addr.addressLine1}</div>
        <div className="text-sm truncate">{addr.addressLine2}</div>
        <div className="text-sm truncate">
          {addr.city}, {addr.country} {addr.postalCode}
        </div>
        <div className="text-sm truncate">Contact: {addr.contactNumber}</div>
      </div>
    </label>
  );

  const Summary: React.FC = () => (
    <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="grid grid-cols-1 gap-4">
        {isMounted ? (
          cartItems.map((item: any) => (
            <div key={item.id} className="flex items-center border-b py-2">
              <Image
                src={item.images[0]}
                alt={item.title}
                width={72}
                height={72}
                className="rounded-md mr-3 w-18 h-18 object-cover"
              />
              <div className="flex-grow min-w-0">
                <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <div className="h-24 bg-gray-100 rounded animate-pulse" />
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <h2 className="text-xl font-bold">Total:</h2>
        <p className="text-xl font-bold">
          ₹{isMounted ? totalAmount.toFixed(2) : (0).toFixed(2)}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => console.error("Failed to load Razorpay script")}
      />

      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Button variant="outline" onClick={() => setShowSummary((s) => !s)}>
            {showSummary ? "Hide Order Summary" : "Show Order Summary"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Address + Payment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Delivery Address</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddressList((s) => !s)}
                  >
                    {showAddressList ? "Hide list" : "Change"}
                  </Button>
                  <Button onClick={() => setIsAddAddressOpen(true)}>
                    Add New
                  </Button>
                </div>
              </div>

              {loadingAddresses ? (
                <p className="text-sm text-muted-foreground">
                  Loading addresses...
                </p>
              ) : addresses.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No addresses found. Please add one.
                </p>
              ) : (
                <>
                  {selectedAddress && (
                    <div className="mt-2">
                      <div className="border rounded p-4 bg-gray-50">
                        <div className="font-semibold">
                          {selectedAddress.firstName} {selectedAddress.lastName}
                        </div>
                        <div className="text-sm">
                          {selectedAddress.addressLine1}
                        </div>
                        {selectedAddress.addressLine2 && (
                          <div className="text-sm">
                            {selectedAddress.addressLine2}
                          </div>
                        )}
                        <div className="text-sm">
                          {selectedAddress.city}, {selectedAddress.country}{" "}
                          {selectedAddress.postalCode}
                        </div>
                        <div className="text-sm">
                          Contact: {selectedAddress.contactNumber}
                        </div>
                      </div>
                    </div>
                  )}

                  {showAddressList && (
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      {addresses.map((addr: Address) => (
                        <AddressCard key={addr._id} addr={addr} />
                      ))}
                    </div>
                  )}

                  {addressError && (
                    <div className="text-red-600 mt-2">{addressError}</div>
                  )}
                </>
              )}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Payment</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Pay securely with Razorpay. Ensure you have selected a delivery
                address.
              </p>
              <Button
                className="w-full"
                onClick={startRazorpay}
                disabled={!razorpayLoaded || cartItems.length === 0}
              >
                {razorpayLoaded
                  ? savingAddress
                    ? "Please wait..."
                    : "Proceed to Payment"
                  : "Preparing payment..."}
              </Button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">{showSummary && <Summary />}</div>
        </div>
      </div>

      <AddAddressModal
        open={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        onAddAddress={handleAddAddress}
      />
    </>
  );
};

export default Checkout;
