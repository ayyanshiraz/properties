"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function SignupPage() {
  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);
  const [phone, setPhone] = useState(``);
  const [marketing, setMarketing] = useState(true);
  const [terms, setTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);
  
  const router = useRouter();
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const isFormValid = name.length > 0 && email.length > 0 && password.length > 0 && password === confirmPassword && terms;

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

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMessage(``);

    if (password !== confirmPassword) {
      setErrorMessage(`Passwords do not match`);
      return;
    }

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: `POST`,
        headers: { [`Content-Type`]: `application/json` },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (response.ok) {
        router.push(`/login`);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || `Registration failed`);
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
            Experience a seamless platform designed to connect you with premium properties. Register today to manage your listings and discover new opportunities.
          </p>
          <div className={`mt-8 flex items-center gap-4`}>
            <div className={`h-1 w-12 bg-white rounded-full`}></div>
            <span className={`text-white font-bold tracking-widest text-sm uppercase`}>Qemaat Portal</span>
          </div>
        </div>
      </div>

      <div ref={rightPanelRef} className={`w-full lg:w-1/2 flex justify-center p-6 sm:p-12 relative overflow-y-auto`}>
        <div className={`w-full max-w-[440px] flex flex-col my-auto py-8`}>
          
          <div className={`mb-8 relative flex items-center justify-center lg:justify-start`}>
             <Link href={`/login`} className={`absolute left-0 text-gray-900 hover:text-[#013220] transition-colors`}>
               <svg className={`w-6 h-6`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`} strokeWidth={`2.5`}>
                 <path strokeLinecap={`round`} strokeLinejoin={`round`} d={`M15 19l-7-7 7-7`} />
               </svg>
             </Link>
          </div>

          {errorMessage && (
            <div className={`mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-semibold`}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignup} className={`flex flex-col gap-4`}>
            <input 
              type={`text`} 
              placeholder={`Name*`} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#4caf50] transition-colors text-black`} 
              required 
            />

            <input 
              type={`email`} 
              placeholder={`Email*`} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#4caf50] transition-colors text-black`} 
              required 
            />
            
            <input 
              type={`password`} 
              placeholder={`Password*`} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#4caf50] transition-colors text-black`} 
              required 
            />

            <div className={`flex flex-col gap-1`}>
              <input 
                type={`password`} 
                placeholder={`Confirm Password*`} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#4caf50] transition-colors text-black`} 
                required 
              />
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <span className={`text-red-500 text-xs font-bold px-1`}>Passwords do not match</span>
              )}
            </div>

            <div className={`flex items-center border-2 border-gray-200 rounded-lg focus-within:border-[#4caf50] transition-colors overflow-hidden bg-white`}>
              <div className={`flex items-center gap-2 px-3 py-3 border-r-2 border-gray-200 bg-gray-50 text-gray-700 font-medium`}>
                <img src={`https://flagcdn.com/w20/pk.png`} srcSet={`https://flagcdn.com/w40/pk.png 2x`} width={`20`} alt={`Pakistan Flag`} className={`rounded-sm`} />
                <span>+92</span>
              </div>
              <input 
                type={`tel`} 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-3 py-3 text-[15px] outline-none text-black`} 
              />
            </div>

            <div className={`flex flex-col gap-3 mt-2`}>
              <label className={`flex items-start gap-3 text-sm text-gray-700 cursor-pointer`}>
                <input 
                  type={`checkbox`} 
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className={`mt-1 w-4 h-4 rounded border-gray-300 text-[#4caf50] focus:ring-[#4caf50]`} 
                />
                <span className={`leading-relaxed`}>Yes, I would like to receive marketing communication from Qemaat</span>
              </label>

              <label className={`flex items-start gap-3 text-sm text-gray-700 cursor-pointer`}>
                <input 
                  type={`checkbox`} 
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className={`mt-1 w-4 h-4 rounded border-gray-300 text-[#4caf50] focus:ring-[#4caf50]`} 
                  required
                />
                <span className={`leading-relaxed`}>
                  I have read and I agree to the Qemaat <Link href={`/terms`} className={`text-[#013220] hover:underline`}>Terms and Conditions</Link>
                </span>
              </label>
            </div>

            <button 
              type={`submit`} 
              disabled={!isFormValid}
              className={`w-full bg-[#f3f4f6] text-gray-400 font-bold py-4 rounded-lg mt-4 transition-all disabled:opacity-70 data-[valid=true]:bg-[#4caf50] data-[valid=true]:text-white data-[valid=true]:hover:bg-[#439c47]`}
              data-valid={isFormValid}
            >
              Continue
            </button>
          </form>
          
        </div>
      </div>
    </main>
  );
}