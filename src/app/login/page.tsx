"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function LoginPage() {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
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
        body: JSON.stringify({ email, password }),
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
    <main className={`min-h-screen w-full flex bg-[#f8fafc]`}>
      
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
            <span className={`text-white font-bold tracking-widest text-sm uppercase`}>Qeemat Portal</span>
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

          <div className={`flex flex-col gap-4`}>
            <button className={`w-full flex items-center justify-center gap-3 border-2 border-gray-100 rounded-xl py-3.5 text-gray-700 font-bold hover:border-[#1877f2] hover:text-[#1877f2] hover:bg-blue-50/50 transition-all active:scale-[0.98]`}>
              <svg className={`w-5 h-5`} fill={`currentColor`} viewBox={`0 0 24 24`}>
                <path d={`M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z`} />
              </svg>
              Continue with Facebook
            </button>
            
            <button className={`w-full flex items-center justify-center gap-3 border-2 border-gray-100 rounded-xl py-3.5 text-gray-700 font-bold hover:border-gray-300 hover:bg-gray-50 transition-all active:scale-[0.98]`}>
              <svg className={`w-5 h-5`} viewBox={`0 0 24 24`}>
                <path fill={`#4285F4`} d={`M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z`} />
                <path fill={`#34A853`} d={`M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z`} />
                <path fill={`#FBBC05`} d={`M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z`} />
                <path fill={`#EA4335`} d={`M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z`} />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className={`flex items-center gap-4 my-8`}>
            <div className={`flex-1 h-px bg-gray-200`}></div>
            <span className={`text-xs font-bold text-gray-400 uppercase tracking-widest`}>Or continue with email</span>
            <div className={`flex-1 h-px bg-gray-200`}></div>
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
                className={`w-full border-2 border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-[#013220] focus:bg-white transition-all`} 
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
                className={`w-full border-2 border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-[#013220] focus:bg-white transition-all`} 
                required 
              />
            </div>

            <div className={`flex justify-between items-center mt-1`}>
              <label className={`flex items-center gap-2 text-sm text-gray-600 cursor-pointer font-medium group`}>
                <input type={`checkbox`} className={`w-4 h-4 rounded border-gray-300 text-[#013220] focus:ring-[#013220]`} />
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