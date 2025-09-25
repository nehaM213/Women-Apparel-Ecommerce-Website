"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Script from "next/script";

interface LoginRegisterProps {
  checkout?: boolean;
  onSuccess?: () => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ checkout, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Get cart data for Razorpay
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

  const startRazorpay = async () => {
    try {
      if (!razorpayLoaded || !window.Razorpay) {
        console.error('Razorpay not loaded yet');
        return;
      }

      const razorpayRes = await fetch('/api/payment/razorpay/create-order', {
        method: 'POST',
      });
      const razorpayData = await razorpayRes.json();
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: totalAmount * 100,
        currency: "INR",
        name: 'Lazuli By Neha',
        description: 'Checkout',
        order_id: razorpayData.id,
        handler: function (response: any) {
          console.log('Payment successful:', response);
        },
        theme: { color: "#3399cc" }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      
      // Call onSuccess to close the dialog
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Razorpay init error:', err);
    }
  };

  // Handle authentication success
  useEffect(() => {
    if (status === "authenticated" && checkout) {
      // Check if this is from OAuth or direct login
      const isFromOAuth = typeof window !== "undefined" && 
        localStorage.getItem("checkout_after_oauth") === "1";
      
      if (isFromOAuth) {
        localStorage.removeItem("checkout_after_oauth");
        localStorage.removeItem("checkout_return_url");
        
        // Wait for Razorpay to be loaded
        const checkRazorpay = () => {
          if (razorpayLoaded && window.Razorpay) {
            setTimeout(() => {
              startRazorpay();
            }, 100);
          } else {
            setTimeout(checkRazorpay, 100);
          }
        };
        checkRazorpay();
      }
    }
  }, [status, checkout, razorpayLoaded]);

  const sendOtp = async () => {
    setMessage("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164 format for international numbers

    // Validation
    if (isMobile && !phoneRegex.test(identifier)) {
      console.log(identifier);
      setMessage("Please enter a valid phone number with country code.");
      return;
    }

    if (!isMobile && !emailRegex.test(identifier)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, isMobile }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.message || "Failed to send OTP");
      }
      setOtpSent(true);
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, otp, isMobile }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setMessage(`Logged in as ${data.user.identifier}`);
      if (checkout && onSuccess) {
        onSuccess();
      }
    } else {
      const data = await res.json();
      setMessage(data.message || "Failed to verify OTP");
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Requesting OTP for:", identifier);
    await sendOtp();
    setLoading(false);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    console.log("pass");
    e.preventDefault();

    setLoading(true);

    const res = await signIn("credentials", {
      email: identifier,
      password,
      redirect: false,
    });
    console.log("response", res);
    if (res?.ok) {
      if (checkout && onSuccess) {
        onSuccess();
      } else {
        console.log("dashboard");
        router.push("/user/profile");
      }
    } else {
      toast({ title: "Invalid email or password" });
    }

    setLoading(false);
  };

  return (
    <>
      {checkout && (
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js" 
          onLoad={() => setRazorpayLoaded(true)}
          onError={() => console.error('Failed to load Razorpay script')}
        />
      )}
      
      <div className={checkout ? "w-full max-w-md mx-auto" : "container mx-auto p-4 flex flex-col md:flex-row"}>
        {!checkout && (
          <div className="flex-1 flex justify-center items-start pt-6">
            <Image
              height={1000}
              width={1000}
              src="/sareeBanner.webp"
              alt="Advertisement"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}
        <div className={checkout ? "w-full" : "flex-1 flex flex-col justify-center align-top p-4"}>
          <h1 className={checkout ? "text-xl font-bold mb-4 text-center" : "text-3xl font-bold mb-6"}>
            {isPasswordLogin ? "Login with password" : "Login/Signup With OTP"}
          </h1>
          <form
            onSubmit={isPasswordLogin ? handlePasswordLogin : handleRequestOTP}
            className={checkout ? "space-y-4" : "bg-white shadow-md rounded-lg p-6 space-y-4"}
          >
            {isPasswordLogin ? (
              <>
                <Input
                  type="email"
                  placeholder="Email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" disabled={loading} className="mt-4 w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="mobile"
                    name="identifierType"
                    checked={isMobile}
                    onChange={() => setIsMobile(true)}
                    className="mr-2"
                  />
                  <label htmlFor="mobile" className="mr-4">
                    Mobile
                  </label>
                  <input
                    type="radio"
                    id="email"
                    name="identifierType"
                    checked={!isMobile}
                    onChange={() => setIsMobile(false)}
                    className="mr-2"
                  />
                  <label htmlFor="email">Email</label>
                </div>
                {isMobile ? (
                  <PhoneInput
                    country={"in"}
                    value={identifier}
                    onChange={(phone) =>
                      setIdentifier(phone.startsWith("+") ? phone : "+" + phone)
                    }
                    inputClass="!w-full !text-black !border-none bg-white text-sm placeholder:text-gray-400"
                    containerClass="!w-full h-10 rounded-md border border-gray-300 bg-white pr-10 py-0.5 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    inputStyle={{ width: "100%" }}
                    placeholder="Phone Number"
                  />
                ) : (
                  <Input
                    placeholder="Email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                )}
                {!otpSent ? (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full"
                  >
                    {loading ? "Requesting OTP..." : "Request OTP"}
                  </Button>
                ) : (
                  <>
                    <Input
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        verifyOtp();
                      }}
                      className="mt-4 w-full"
                    >
                      Verify OTP
                    </Button>
                  </>
                )}
              </>
            )}
          </form>
          <p className="mt-4 text-center">Or continue with</p>
          <div className="flex justify-center space-x-4">
            {/* <Button variant="outline">Facebook</Button> */}
            <Button
              variant="outline"
              onClick={() => {
                if (checkout) {
                  try {
                    if (typeof window !== "undefined") {
                      localStorage.setItem("checkout_after_oauth", "1");
                    }
                  } catch {}
                  signIn("google", { 
                    callbackUrl: window.location.href
                  });
                } else {
                  signIn("google", { callbackUrl: "/user/profile" });
                }
              }}
            >
              Google
            </Button>
          </div>
          <p className="mt-4 text-center">
            <Button
              variant="link"
              className="underline p-0"
              onClick={(e) => {
                e.preventDefault();
                setIsPasswordLogin(!isPasswordLogin);
              }}
            >
              {isPasswordLogin ? "Login/Signup with otp" : "Login with email & password"}
            </Button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
