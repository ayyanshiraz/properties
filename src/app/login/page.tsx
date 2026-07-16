"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function LoginPage() {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);
  const router = useRouter();
  
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const isFormValid = email.length > 0 && password.length > 0;

  useEffect(() => {
    gsap.fromTo(leftPanelRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: `power4.out` }
    );
    gsap.fromTo(rightPanelRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.2, ease: `power4.out`, delay: 0.2 }
    );
  }, []);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMessage(``);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: `POST`,
        headers: { [`Content-Type`]: `application/json` },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(`user`, JSON.stringify(data.user));
        router.push(`/`);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || `Authentication failed`);
      }
    } catch (error) {
      setErrorMessage(`Network error occurred`);
    }
  };

  return (
    <main className={`min-h-screen w-full flex bg-[#f8fafc] overflow-x-hidden`}>
      
      <div ref={leftPanelRef} className={`hidden lg:flex w-1/2 relative bg-[#013220] overflow-hidden items-center justify-center p-12 shadow-2xl z-10`}>
        <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#025a3a] blur-[120px] opacity-60`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#000000] blur-[150px] opacity-40`}></div>
        
        <div className={`relative z-10 flex flex-col gap-6 max-w-lg`}>
          <h1 className={`text-5xl font-black text-white leading-tight tracking-tight`}>
            Unlock Your Real Estate Journey
          </h1>
          <p className={`text-lg text-gray-300 font-medium leading-relaxed`}>
            Experience a seamless platform designed to connect you with premium properties. Log in to manage your listings and discover new opportunities.
          </p>
          <div className={`mt-8 flex items-center gap-4`}>
            <div className={`h-1 w-12 bg-white rounded-full`}></div>
            <span className={`text-white font-bold tracking-widest text-sm uppercase`}>Qemaat Portal</span>
          </div>
        </div>
      </div>

      <div ref={rightPanelRef} className={`w-full lg:w-1/2 flex justify-center p-6 sm:p-12 relative overflow-y-auto`}>
        <Link href={`/`} className={`absolute top-8 right-8 text-gray-400 hover:text-[#013220] transition-colors bg-gray-100 hover:bg-gray-200 p-3 rounded-full z-20`}>
          <svg className={`w-5 h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M6 18L18 6M6 6l12 12`}></path></svg>
        </Link>

        <div className={`w-full max-w-[440px] flex flex-col my-auto py-12`}>
          <div className={`mb-10 text-center lg:text-left`}>
            <h2 className={`text-3xl font-black text-gray-900 tracking-tight mb-2`}>Welcome Back</h2>
            <p className={`text-gray-500 font-medium text-sm`}>Please enter your details to sign in.</p>
          </div>

          {errorMessage && (
            <div className={`mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-semibold rounded-r-md`}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className={`flex flex-col gap-5`}>
            <div className={`flex flex-col gap-1.5`}>
              <label className={`text-sm font-bold text-gray-700`}>Email Address</label>
              <input 
                type={`email`} 
                placeholder={`hello@example.com`} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border-2 border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-[#013220] focus:bg-white transition-all text-black`} 
                required 
              />
            </div>
            
            <div className={`flex flex-col gap-1.5`}>
              <label className={`text-sm font-bold text-gray-700`}>Password</label>
              <input 
                type={`password`} 
                placeholder={`••••••••`} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border-2 border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-[#013220] focus:bg-white transition-all text-black`} 
                required 
              />
            </div>

            <div className={`flex justify-between items-center mt-1`}>
              <label className={`flex items-center gap-2 text-sm text-gray-600 cursor-pointer font-medium group`}>
                <input 
                  type={`checkbox`} 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`w-4 h-4 rounded border-gray-300 text-[#013220] focus:ring-[#013220]`} 
                />
                <span className={`group-hover:text-gray-900 transition-colors`}>Remember Me</span>
              </label>
              <Link href={`/forgot-password`} className={`text-sm text-[#013220] font-bold hover:underline`}>
                Forgot Password?
              </Link>
            </div>

            <button 
              type={`submit`} 
              disabled={!isFormValid}
              className={`w-full bg-[#013220] text-white font-bold py-4 rounded-xl mt-2 shadow-lg shadow-[#013220]/20 hover:shadow-xl hover:shadow-[#013220]/30 hover:bg-[#011a11] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Log In Securely
            </button>
          </form>

          <div className={`mt-10 text-center`}>
            <p className={`text-sm font-medium text-gray-600`}>
              Do not have an account yet?{` `}
              <Link href={`/signup`} className={`text-[#013220] font-black hover:underline`}>
                Create an account
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </main>
  );
}