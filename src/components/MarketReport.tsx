"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarketReport() {
  const sectionRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const val1Ref = useRef<HTMLHeadingElement>(null);
  const val2Ref = useRef<HTMLHeadingElement>(null);

  // Chart 1 Refs
  const chart1OuterRef = useRef<SVGCircleElement>(null);
  const chart1InnerRef = useRef<SVGCircleElement>(null);
  const chart1GroupRef = useRef<SVGGElement>(null);

  // Chart 2 Refs
  const chart2OuterRef = useRef<SVGCircleElement>(null);
  const chart2InnerRef = useRef<SVGCircleElement>(null);
  const chart2GroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Core Card Smooth Entry
    mainTimeline.fromTo(dashboardRef.current,
      { y: 100, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );

    // 2. Cinematic Blur and Tracking Expansion Engine
    const counts = { num1: 0, num2: 0 };
    
    // Animate the physical DOM elements (Blur, Scale, and Offset)
    mainTimeline.fromTo([val1Ref.current, val2Ref.current],
      { filter: "blur(20px)", scale: 1.1, opacity: 0, x: -30 },
      { filter: "blur(0px)", scale: 1, opacity: 1, x: 0, duration: 2, ease: "expo.out", stagger: 0.15 },
      "-=1.2"
    );

    // Animate the actual numeric values seamlessly
    mainTimeline.to(counts, {
      num1: 850.5,
      num2: 45230,
      duration: 3.5,
      ease: "expo.out",
      onUpdate: () => {
        if (val1Ref.current) {
          val1Ref.current.innerText = counts.num1.toFixed(1) + "B";
        }
        if (val2Ref.current) {
          val2Ref.current.innerText = Math.floor(counts.num2).toLocaleString();
        }
      }
    }, "-=2");

    // 3. Kinetic Cascade Multi-Ring Layout Loading
    if (chart1OuterRef.current) {
      mainTimeline.fromTo(chart1OuterRef.current,
        { strokeDashoffset: 251.3 },
        { strokeDashoffset: 75.4, duration: 2.4, ease: "elastic.out(1, 0.75)" },
        "-=2.6"
      );
    }
    if (chart1InnerRef.current) {
      mainTimeline.fromTo(chart1InnerRef.current,
        { strokeDashoffset: 175.9 },
        { strokeDashoffset: 123.1, duration: 2.2, ease: "elastic.out(1, 0.8)" },
        "-=2.2"
      );
    }
    if (chart1GroupRef.current) {
      mainTimeline.fromTo(chart1GroupRef.current,
        { rotation: -270, transformOrigin: "50% 50%" },
        { rotation: 0, duration: 2.8, ease: "power3.out" },
        "-=2.8"
      );
    }

    if (chart2OuterRef.current) {
      mainTimeline.fromTo(chart2OuterRef.current,
        { strokeDashoffset: 251.3 },
        { strokeDashoffset: 57.8, duration: 2.4, ease: "elastic.out(1, 0.75)" },
        "-=2.4"
      );
    }
    if (chart2InnerRef.current) {
      mainTimeline.fromTo(chart2InnerRef.current,
        { strokeDashoffset: 175.9 },
        { strokeDashoffset: 135.4, duration: 2.2, ease: "elastic.out(1, 0.8)" },
        "-=2.0"
      );
    }
    if (chart2GroupRef.current) {
      mainTimeline.fromTo(chart2GroupRef.current,
        { rotation: 270, transformOrigin: "50% 50%" },
        { rotation: 0, duration: 2.8, ease: "power3.out" },
        "-=2.8"
      );
    }

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 overflow-visible bg-transparent">
      
      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        
        {/* Title Area - Kept dark so it shows on the white section background */}
        <div className="text-center mb-16 relative">
          <span className="inline-block bg-[#013220]/10 border border-[#10b981]/30 text-[#013220] px-5 py-1.5 rounded-full text-[12px] font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_4px_12px_rgba(1,50,32,0.05)]">
            Market Intelligence
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Pakistan Real Estate Market Report</h2>
          <p className="text-gray-600 text-lg font-medium">Q2 2026 Comprehensive Overview</p>
        </div>

        {/* Dashboard Stable Container - Updated to Deep Green */}
        <div 
          ref={dashboardRef}
          className="bg-[#013220] border border-[#10b981]/20 rounded-3xl p-10 lg:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row gap-16 lg:gap-8 items-center"
        >

          {/* Left Column - Live Stats */}
          <div className="flex flex-col gap-16 w-full lg:w-1/2">
            
            {/* Stat Box 1 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#10b981]/0 via-[#10b981]/5 to-[#10b981]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-lg z-0"></div>
              <div className="relative z-10">
                <h3 ref={val1Ref} className="text-6xl md:text-7xl font-black text-white mb-2 drop-shadow-sm">0.0B</h3>
                <p className="text-gray-300 text-xs font-bold tracking-[0.15em] uppercase mb-4">TOTAL SALES VALUE IN PKR</p>
                <div className="flex items-center gap-2 text-[#10b981] text-sm font-semibold bg-[#10b981]/10 w-fit px-3 py-1.5 rounded-lg border border-[#10b981]/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span>38.2% surge compared to Q2 2025</span>
                </div>
              </div>
            </div>

            {/* Stat Box 2 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#10b981]/0 via-[#10b981]/5 to-[#10b981]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-lg z-0"></div>
              <div className="relative z-10">
                <h3 ref={val2Ref} className="text-6xl md:text-7xl font-black text-white mb-2 drop-shadow-sm">0</h3>
                <p className="text-gray-300 text-xs font-bold tracking-[0.15em] uppercase mb-4">TOTAL SALES TRANSACTIONS</p>
                <div className="flex items-center gap-2 text-[#10b981] text-sm font-semibold bg-[#10b981]/10 w-fit px-3 py-1.5 rounded-lg border border-[#10b981]/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span>18.7% surge compared to Q2 2025</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Holographic Dual-Ring HUDs */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 w-full lg:w-1/2">
            
            {/* Chart 1 - VALUE */}
            <div className="flex flex-col items-center">
              <div className="relative w-56 h-56 mb-8 group cursor-crosshair">
                <div className="absolute inset-0 bg-[#10b981]/5 rounded-full blur-2xl group-hover:bg-[#10b981]/20 transition-all duration-500"></div>
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_4px_12px_rgba(16,185,129,0.15)] relative z-10">
                  <g ref={chart1GroupRef}>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="8" />
                    <circle cx="50" cy="50" r="28" fill="transparent" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="8" />
                    <circle ref={chart1OuterRef} cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="251.3" strokeDashoffset="251.3" strokeLinecap="round" />
                    <circle ref={chart1InnerRef} cx="50" cy="50" r="28" fill="transparent" stroke="#050505" strokeWidth="8" strokeDasharray="175.9" strokeDashoffset="175.9" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-lg tracking-widest">VALUE</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 text-sm w-full px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#10b981] shadow-[0_0_8px_#10b981]"></span>
                    <span className="text-gray-300 font-bold uppercase tracking-wider text-[11px]">RESIDENTIAL</span>
                  </div>
                  <span className="text-white font-black">600.0B</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#050505]"></span>
                    <span className="text-gray-300 font-bold uppercase tracking-wider text-[11px]">COMMERCIAL</span>
                  </div>
                  <span className="text-white font-black">250.5B</span>
                </div>
              </div>
            </div>

            {/* Chart 2 - VOLUME */}
            <div className="flex flex-col items-center">
              <div className="relative w-56 h-56 mb-8 group cursor-crosshair">
                <div className="absolute inset-0 bg-[#10b981]/5 rounded-full blur-2xl group-hover:bg-[#10b981]/20 transition-all duration-500"></div>
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_4px_12px_rgba(1,50,32,0.1)] relative z-10">
                  <g ref={chart2GroupRef}>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="8" />
                    <circle cx="50" cy="50" r="28" fill="transparent" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="8" />
                    <circle ref={chart2OuterRef} cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="251.3" strokeDashoffset="251.3" strokeLinecap="round" />
                    <circle ref={chart2InnerRef} cx="50" cy="50" r="28" fill="transparent" stroke="#050505" strokeWidth="8" strokeDasharray="175.9" strokeDashoffset="175.9" strokeLinecap="round" />
                  </g>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-bold text-lg tracking-widest">VOLUME</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 text-sm w-full px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#10b981] shadow-[0_0_8px_#10b981]"></span>
                    <span className="text-gray-300 font-bold uppercase tracking-wider text-[11px]">RESIDENTIAL</span>
                  </div>
                  <span className="text-white font-black">35,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#050505]"></span>
                    <span className="text-gray-300 font-bold uppercase tracking-wider text-[11px]">COMMERCIAL</span>
                  </div>
                  <span className="text-white font-black">10,230</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}