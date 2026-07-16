"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
      });
      
      const data = await res.json();
      setMessage(data.message);
      
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-black text-red-600 mb-2">Invalid Link</h2>
          <p className="text-black font-medium mb-6">This password reset link is invalid or missing the security token.</p>
          <Link href="/forgot-password" className="bg-[#013220] text-white font-bold py-3 px-6 rounded-lg transition-colors hover:bg-[#011a11]">
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-white">
      <div className="hidden md:flex flex-col justify-center w-1/2 bg-[#013220] p-12 lg:p-24 text-white">
        <h1 className="text-5xl font-black mb-6 leading-tight">Secure Your Account</h1>
        <p className="text-lg text-gray-200 mb-12">Please choose a strong and secure password to protect your real estate portfolio on the Qemaat Portal.</p>
        <div className="flex items-center gap-4 mt-auto">
          <div className="w-12 h-1 bg-white"></div>
          <span className="font-bold tracking-widest uppercase">QEMAAT PORTAL</span>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Create New Password</h2>
          <p className="text-black font-medium mb-8">Type and confirm your new password below to regain access.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900">New Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#013220] transition-colors text-black placeholder-gray-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#013220] transition-colors text-black placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full bg-[#829e92] hover:bg-[#013220] text-white font-bold py-4 rounded-xl transition-colors mt-2"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>

          {message && (
            <div className={"mt-6 p-4 rounded-xl text-center font-bold text-sm " + (isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}