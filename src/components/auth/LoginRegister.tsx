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

  const renderBanner = () => (
    <div className="flex-1 flex justify-center items-start pt-6">
      <Image
        height={1000}
        width={1000}
        src="/sareeBanner.webp"
        alt="Advertisement"
        className="w-full h-auto rounded-lg object-cover"
        priority={false}
      />
    </div>
  );

  return (
    <>
      <div className={checkout ? "w-full max-w-md mx-auto" : "container mx-auto p-4 flex flex-col md:flex-row"}>
        {!checkout && renderBanner()}
        <div className={checkout ? "w-full" : "flex-1 flex flex-col justify-center align-top p-4"}>
          <h1 className={checkout ? "text-xl font-bold mb-4 text-center" : "text-3xl font-bold mb-6"}>
            {isPasswordLogin ? "Login with password" : "Login/Signup With OTP"}
          </h1>
          {isPasswordLogin ? (
            <PasswordLoginForm checkout={checkout} onSuccess={onSuccess} />
          ) : (
            <OtpLoginForm checkout={checkout} onSuccess={onSuccess} />
          )}
          <p className="mt-4 text-center">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
            >
              Google
            </Button>
          </div>
          <p className="mt-4 text-center">
            <Button
              type="button"
              variant="link"
              className="underline p-0"
              onClick={() => setIsPasswordLogin((prev) => !prev)}
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
