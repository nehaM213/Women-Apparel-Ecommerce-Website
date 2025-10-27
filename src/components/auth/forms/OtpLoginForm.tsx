"use client";
import React, { FC, useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+[1-9]\d{1,14}$/;

interface OtpLoginFormProps {
  onSuccess?: () => void;
  checkout?: boolean;
}

const OtpLoginForm: FC<OtpLoginFormProps> = ({ checkout, onSuccess }) => {
  const [isMobile, setIsMobile] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🧹 Clear input when switching between mobile/email
  useEffect(() => {
    setIdentifier("");
    setOtp("");
    setOtpSent(false);
    setMessage("");
  }, [isMobile]);

  const validate = useCallback(() => {
    if (isMobile && !PHONE_REGEX.test(identifier)) {
      setMessage("Please enter a valid phone number with country code.");
      return false;
    }
    if (!isMobile && !EMAIL_REGEX.test(identifier)) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  }, [identifier, isMobile]);

  const sendOtp = useCallback(async () => {
    setMessage("");
    if (!validate()) return;
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, isMobile }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.message || "Failed to send OTP");
        return;
      }
      setOtpSent(true);
    } catch (error: any) {
      setMessage(`Error: ${error?.message || "Unknown error"}`);
    }
  }, [identifier, isMobile, validate]);

  const verifyOtp = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp, isMobile }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Logged in as ${data.user?.identifier || identifier}`);
        if (checkout && onSuccess) onSuccess();
      } else {
        setMessage(data.message || "Failed to verify OTP");
      }
    } catch (error: any) {
      setMessage(`Error: ${error?.message || "Unknown error"}`);
    }
  }, [identifier, otp, isMobile, checkout, onSuccess]);

  const handleRequestOTP = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await sendOtp();
    setLoading(false);
  }, [sendOtp]);

  return (
    <form
      onSubmit={handleRequestOTP}
      className="bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      {/* Mobile / Email Toggle */}
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

      {/* Input Field */}
      {isMobile ? (
        <PhoneInput
          country={"in"}
          value={identifier}
          onChange={(phone) => {
            if (!phone.startsWith("+")) phone = "+" + phone;
            setIdentifier(phone);
          }}
          inputClass="!w-full !text-black !border-none bg-white text-sm placeholder:text-gray-400"
          containerClass="!w-full h-10 rounded-md border border-gray-300 bg-white pr-10 py-0.5 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Phone Number"
        />
      ) : (
        <Input
          placeholder="Email"
          type="email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      )}

      {/* OTP Flow */}
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
            type="button"
            onClick={verifyOtp}
            className="mt-4 w-full"
          >
            Verify OTP
          </Button>
        </>
      )}

      {message && (
        <div className="mt-2 text-sm text-center text-red-600">{message}</div>
      )}
    </form>
  );
};

export default OtpLoginForm;
