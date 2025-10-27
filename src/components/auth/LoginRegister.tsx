"use client";
import React, { FC, useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PasswordLoginForm from "./forms/PasswordLoginForm";
import OtpLoginForm from "./forms/OtpLoginForm";
import { FcGoogle } from 'react-icons/fc';

interface LoginRegisterProps {
  checkout?: boolean;
  onSuccess?: () => void;
}

const LoginRegister: FC<LoginRegisterProps> = ({ checkout, onSuccess }) => {
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  useEffect(() => {
    if (status === "authenticated" && checkout) {
      if (onSuccess) onSuccess();
      router.push("/checkout");
    }
  }, [status, checkout, onSuccess, router]);

  const handleGoogleLogin = useCallback(() => {
    signIn("google", {
      callbackUrl: checkout ? "/checkout" : "/user/profile",
    });
  }, [checkout]);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      {/* Left Banner Section */}
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

      {/* Right Login/Signup Form */}
      <div className={checkout ? "w-full" : "flex-1 flex flex-col justify-center align-top p-4"}>
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          {isPasswordLogin ? "Login with password" : "Login/Signup With OTP"}
        </h1>

        {isPasswordLogin ? (
          <PasswordLoginForm checkout={checkout} onSuccess={onSuccess} />
        ) : (
          <OtpLoginForm checkout={checkout} onSuccess={onSuccess} />
        )}

        {/* Divider */}
        <p className="mt-4 text-center text-gray-600">Or continue with</p>

        {/* Google Login */}
        <div className="flex justify-center space-x-4 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 border-gray-300"
          >
            <FcGoogle size={22} />
            Google
          </Button>
        </div>

        {/* Toggle between Login Types */}
        <p className="mt-4 text-center">
          <Button
            type="button"
            variant="link"
            className="underline p-0"
            onClick={() => setIsPasswordLogin((prev) => !prev)}
          >
            {isPasswordLogin
              ? "Login/Signup with OTP"
              : "Login with email & password"}
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
