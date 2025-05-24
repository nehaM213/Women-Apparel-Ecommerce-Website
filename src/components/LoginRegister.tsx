"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [form, setForm] = useState({ identifier: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();
  const { toast } = useToast()
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  

  const sendOtp = async () => {
    try{
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier }),
    });

    if(!res.ok){
      const data = await res.json();
      setMessage(data.message || "Failed to send OTP");
    }
    setOtpSent(true);
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, otp }),
    });
    if (res.ok) {
      const data = await res.json();
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (form.password !== form.confirm) {
    //   toast({ title: "Passwords do not match" });
    //   return;
    // }

    setLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      // Auto-login
      await signIn("credentials", {
        email: form.identifier,
        // password: form.password,
        redirect: false,
      });
      router.push("/dashboard");
    } else {
      const data = await res.json();
      toast({ title: data.message || "Something went wrong" });
    }
    setLoading(false);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email: form.identifier,
      // password: form.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      toast({ title: "Invalid credentials" });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="flex-1 flex justify-center items-start pt-6">
        <Image 
          height={1000}
          width={1000}
          src="/sareeBanner.webp" // Replace with the actual path to your advertisement image
          alt="Advertisement"
          className="w-full h-auto rounded-lg object-cover" // Changed w-1/2 to w-full
        />
      </div>
      <div className="flex-1 flex flex-col justify-center align-top p-4">
        <h1 className="text-3xl font-bold mb-6">Login/Signup With OTP</h1>
        <form onSubmit={handleRequestOTP} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="mobile"
              name="identifierType"
              checked={isMobile}
              onChange={() => setIsMobile(true)}
              className="mr-2"
            />
            <label htmlFor="mobile" className="mr-4">Mobile</label>
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
          <Input
            placeholder={isMobile ? "Phone Number" : "Email"}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          {!otpSent ? (
            <Button type="submit" disabled={loading} className="mt-4 w-full">
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
                  e.preventDefault(); // Prevent form submission
                  verifyOtp(); // Call verifyOtp function
                }} 
                className="mt-4 w-full"
              >
                Verify OTP
              </Button>
            </>
          )}
          <p>{message}</p>
          <p className="mt-4 text-center">
            A 4 digit OTP will be sent to your {isMobile ? "phone number" : "email"}.
          </p>
        </form>
        <p className="mt-4 text-center">Or continue with</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">Facebook</Button>
          <Button variant="outline">Google</Button>
        </div>
        <p className="mt-4 text-center">
          <Button variant="link" className="underline p-0">
            Login with email & password
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;