"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      <div className="hidden md:flex flex-col justify-center w-1/2 bg-[#013220] p-12 lg:p-24 text-white">
        <h1 className="text-5xl font-black mb-6 leading-tight">Unlock Your Real Estate Journey</h1>
        <p className="text-lg text-gray-200 mb-12">Experience a seamless platform designed to connect you with premium properties. Recover your account and continue discovering new opportunities.</p>
        <div className="flex items-center gap-4 mt-auto">
          <div className="w-12 h-1 bg-white"></div>
          <span className="font-bold tracking-widest uppercase">QEMAAT PORTAL</span>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-black font-medium mb-8">Enter your email address to receive a secure password reset link.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#013220] transition-colors text-black placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#013220] hover:bg-[#013220] text-white font-bold py-4 rounded-xl transition-colors mt-2"
            >
              {isLoading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 rounded-xl text-center font-bold text-sm bg-gray-100 text-[#013220]">
              {message}
            </div>
          )}

          <div className="mt-10 text-center">
            <span className="text-black font-medium">Remember your password? </span>
            <Link href="/login" className="text-[#013220] font-bold hover:underline">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}