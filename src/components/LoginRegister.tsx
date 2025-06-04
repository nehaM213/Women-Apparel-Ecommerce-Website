"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const [password, setPassword] = useState("");

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

  // const handleSignup = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   const res = await fetch("/api/signup", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
  //   });

  //   if (res.ok) {
  //     // Auto-login
  //     await signIn("credentials", {
  //       email: form.identifier,
  //       // password: form.password,
  //       redirect: false,
  //     });
  //     router.push("/dashboard");
  //   } else {
  //     const data = await res.json();
  //     toast({ title: data.message || "Something went wrong" });
  //   }
  //   setLoading(false);
  // }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    console.log("pass");
    e.preventDefault();
    
    setLoading(true);

    const res = await signIn("credentials", {
      email: identifier,
      password,
      redirect: false,
    });
    console.log("response",res);
    if (res?.ok) {
      console.log("dashboard");
      router.push("/user");
    } else {
      toast({ title: "Invalid email or password" });
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="flex-1 flex justify-center items-start pt-6">
        <Image
          height={1000}
          width={1000}
          src="/sareeBanner.webp"
          alt="Advertisement"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center align-top p-4">
        <h1 className="text-3xl font-bold mb-6">Login/Signup With OTP</h1>
        <form
          onSubmit={isPasswordLogin ? handlePasswordLogin : handleRequestOTP}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
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
          <Button variant="outline" onClick={() => signIn("google")}>
            Google
          </Button>
        </div>
        <p className="mt-4 text-center">
          <Button
            variant="link"
            className="underline p-0"
            onClick={(e) => {
              e.preventDefault();
              setIsPasswordLogin(true);
            }}
          >
            Login with email & password
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
