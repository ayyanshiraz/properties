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
    <main className={`min-h-screen w-full flex bg-[#f8fafc]`}>
      
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
            <span className={`text-white font-bold tracking-widest text-sm uppercase`}>Qeemat Portal</span>
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

          <div className={`flex flex-col gap-3 mb-6`}>
            <button className={`w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-lg py-3 text-[#1877f2] font-bold hover:bg-gray-50 transition-all active:scale-[0.98]`}>
              <svg className={`w-5 h-5`} fill={`currentColor`} viewBox={`0 0 24 24`}>
                <path d={`M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z`} />
              </svg>
              Continue with Facebook
            </button>
            
            <button className={`w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-lg py-3 text-gray-700 font-bold hover:bg-gray-50 transition-all active:scale-[0.98]`}>
              <svg className={`w-5 h-5`} viewBox={`0 0 24 24`}>
                <path fill={`#4285F4`} d={`M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z`} />
                <path fill={`#34A853`} d={`M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z`} />
                <path fill={`#FBBC05`} d={`M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z`} />
                <path fill={`#EA4335`} d={`M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z`} />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className={`flex items-center gap-4 my-6`}>
            <div className={`flex-1 h-px bg-gray-200`}></div>
            <span className={`text-xs font-bold text-gray-500 uppercase tracking-widest`}>OR</span>
            <div className={`flex-1 h-px bg-gray-200`}></div>
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
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#4caf50] transition-colors`} 
              required 
            />

            <input 
              type={`email`} 
              placeholder={`Email*`} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#4caf50] transition-colors`} 
              required 
            />
            
            <input 
              type={`password`} 
              placeholder={`Password*`} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#4caf50] transition-colors`} 
              required 
            />

            <div className={`flex flex-col gap-1`}>
              <input 
                type={`password`} 
                placeholder={`Confirm Password*`} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-[15px] outline-none focus:border-[#4caf50] transition-colors`} 
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
                className={`w-full px-3 py-3 text-[15px] outline-none`} 
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
                <span className={`leading-relaxed`}>Yes, I would like to receive marketing communication from Qeemat.com</span>
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
                  I have read and I agree to the Qeemat.com <Link href={`/terms`} className={`text-[#013220] hover:underline`}>Terms and Conditions</Link>
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