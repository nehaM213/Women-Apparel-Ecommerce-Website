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
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast({ title: "Passwords do not match" });
      return;
    }

    setLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      // Auto-login
      await signIn("credentials", {
        email: form.email,
        password: form.password,
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
      email: form.email,
      password: form.password,
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
        <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Login' : 'Signup'}</h1>
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="bg-white shadow-md rounded-lg p-6  space-y-4">
          {!isLogin && (
            <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          )}
          <Input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <Input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          {!isLogin && (
            <Input type="password" placeholder="Confirm Password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required />
          )}
          <Button type="submit" disabled={loading} className="mt-4 w-full">{loading ? (isLogin ? "Logging in..." : "Creating...") : (isLogin ? "Login" : "Sign up")}</Button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <Button
            onClick={() => setIsLogin(!isLogin)}
            variant="link"
            className="underline p-0 ml-2"
          >
            {isLogin ? 'Signup' : 'Login'}
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;