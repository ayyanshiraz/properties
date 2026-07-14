"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  {
    id: 1,
    name: "Fatima Al Salem",
    avatar: "F",
    bgColor: "bg-purple-700",
    text: "Their knowledge of off-plan projects is impressive. The team provided a clear and honest assessment of various opportunities, helping us make a confident and profitable investment. Thank you, Qemaat!",
    stars: 5
  },
  {
    id: 2,
    name: "Ahmad Khan",
    avatar: "A",
    bgColor: "bg-blue-600",
    text: "Outstanding professionalism and dedication. They guided us through every single step of buying our new home in DHA. Highly recommended for anyone looking to invest in real estate.",
    stars: 5
  },
  {
    id: 3,
    name: "Sarah Zafar",
    avatar: "S",
    bgColor: "bg-emerald-600",
    text: "The best real estate agency we have ever worked with. The process was completely seamless and transparent from start to finish. We found the perfect apartment within a week.",
    stars: 5
  }
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reviewCardRef = useRef<HTMLDivElement>(null);
  
  const stat1Ref = useRef<HTMLHeadingElement>(null);
  const stat2Ref = useRef<HTMLHeadingElement>(null);
  const stat3Ref = useRef<HTMLHeadingElement>(null);
  const stat4Ref = useRef<HTMLHeadingElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Quantum Vault Split Reveal
    tl.fromTo(leftPanelRef.current,
      { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
      { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.4, ease: "power4.inOut" }
    );

    tl.fromTo(rightPanelRef.current,
      { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
      { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.4, ease: "power4.inOut" },
      "-=1.4"
    );

    // 2. Cascading Stats Grid Base with Lens Blur
    if (statsRef.current && statsRef.current.children) {
      tl.fromTo(Array.from(statsRef.current.children),
        { scale: 0.8, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" },
        "-=0.8"
      );
    }

    // 3. Kinetic Data Engine (Real-time Number Counting)
    const counts = { a: 0, b: 0, c: 0, d: 0 };
    tl.to(counts, {
      a: 25,
      b: 50,
      c: 7,
      d: 2100,
      duration: 2.5,
      ease: "expo.out",
      onUpdate: () => {
        if (stat1Ref.current) stat1Ref.current.innerText = Math.floor(counts.a) + " +";
        if (stat2Ref.current) stat2Ref.current.innerText = Math.floor(counts.b) + " B +";
        if (stat3Ref.current) stat3Ref.current.innerText = String(Math.floor(counts.c));
        if (stat4Ref.current) stat4Ref.current.innerText = Math.floor(counts.d).toLocaleString() + " +";
      }
    }, "-=1.0");

  }, []);

  const changeReview = (direction: "next" | "prev") => {
    if (reviewCardRef.current) {
      const tl = gsap.timeline();
      
      // Compress and Blur Out
      tl.to(reviewCardRef.current, {
        opacity: 0,
        filter: "blur(15px)",
        scale: 0.95,
        x: direction === "next" ? -40 : 40,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => {
            if (direction === "next") return (prev + 1) % reviewsData.length;
            return prev === 0 ? reviewsData.length - 1 : prev - 1;
          });
        }
      })
      // Snap and Focus In
      .to(reviewCardRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        x: 0,
        duration: 0.4,
        ease: "back.out(1.5)"
      });
    }
  };

  const currentReview = reviewsData[currentIndex];

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Panel - Why Choose Us */}
          <div ref={leftPanelRef} className="relative rounded-3xl overflow-hidden flex flex-col justify-between min-h-[500px] bg-[#013220] p-10 lg:p-14 shadow-2xl">
            {/* Background Image & Overlay */}
            <img 
              src="/home/3.webp" 
              alt="Luxury Living" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#013220]/90 via-[#013220]/70 to-transparent"></div>

            {/* Content Top */}
            <div className="relative z-10 max-w-md">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Why Choose <span className="text-[#10b981]">Qemaat?</span>
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                Introducing to you an exceptional luxury residence- among the finest and most contemporary real estate offerings to date.
              </p>
            </div>

            {/* Content Bottom - Stats Grid */}
            <div ref={statsRef} className="relative z-10 grid grid-cols-2 gap-4 mt-12">
              
              <div className="border border-white/20 rounded-xl p-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
                <h4 ref={stat1Ref} className="text-2xl font-bold text-white mb-1">0 +</h4>
                <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Real Estate Agents</p>
              </div>

              <div className="border border-white/20 rounded-xl p-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
                <h4 ref={stat2Ref} className="text-2xl font-bold text-white mb-1">0 B +</h4>
                <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Worth of Sales</p>
              </div>

              <div className="border border-white/20 rounded-xl p-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
                <h4 ref={stat3Ref} className="text-2xl font-bold text-white mb-1">0</h4>
                <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Cities Covered</p>
              </div>

              <div className="border border-white/20 rounded-xl p-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors">
                <h4 ref={stat4Ref} className="text-2xl font-bold text-white mb-1">0 +</h4>
                <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Transactions</p>
              </div>

            </div>
          </div>

          {/* Right Panel - Google Reviews */}
          <div ref={rightPanelRef} className="flex flex-col justify-center px-4 lg:px-12 py-8">
            
            {/* Header Area */}
            <div className="flex items-center gap-4 mb-8">
              {/* Custom SVG Google Icon */}
              <svg viewBox="0 0 24 24" className="w-10 h-10">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Reviews On Google</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-700">5.0</span>
                  <div className="flex gap-1 text-[#FBBC05]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <a href="#" className="text-sm text-gray-500 hover:text-[#10b981] transition-colors mt-1 inline-block">See All Our Reviews</a>
              </div>
            </div>

            {/* Active Review Card */}
            <div ref={reviewCardRef} className="bg-white rounded-2xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 relative">
              
              {/* User Info Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={"w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl " + currentReview.bgColor}>
                    {currentReview.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{currentReview.name}</h4>
                    <p className="text-xs text-gray-500">Google Review</p>
                  </div>
                </div>
                {/* Small Google Icon */}
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed mb-8 min-h-[90px]">
                {currentReview.text}
              </p>

              {/* Footer: Stars and Nav */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-[#FBBC05]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Arrow Nav */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => changeReview("prev")}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#013220] hover:border-[#013220] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => changeReview("next")}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#013220] hover:border-[#013220] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}