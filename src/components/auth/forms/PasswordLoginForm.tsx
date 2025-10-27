"use client";
import React, { FC, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface PasswordLoginFormProps {
  onSuccess?: () => void;
  checkout?: boolean;
}

const PasswordLoginForm: FC<PasswordLoginFormProps> = ({ checkout, onSuccess }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: identifier,
        password,
        redirect: false,
      });
      if (res?.ok) {
        if (checkout) {
          if (onSuccess) onSuccess();
          router.push("/checkout");
        } else {
          router.push("/user/profile");
        }
      } else {
        toast({ title: "Invalid email or password" });
      }
    } finally {
      setLoading(false);
    }
  }, [identifier, password, checkout, onSuccess, router, toast]);

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Password login form"
      className="space-y-4"
    >
      <Input
        type="email"
        placeholder="Email"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        required
        aria-label="Email address"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        aria-label="Password"
        autoComplete="current-password"
      />
      <Button type="submit" disabled={loading} className="mt-4 w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default PasswordLoginForm;
