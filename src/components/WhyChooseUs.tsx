"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Scroll-triggered timeline that resets every time you scroll past it
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reset"
      }
    });

    // 1. Whole section slides in from the far left
    tl.fromTo(contentRef.current, 
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
    );

    // 2. Image animation: elegant scale-down and straighten
    tl.fromTo(imageRef.current,
      { scale: 1.5, rotation: 3 },
      { scale: 1.05, rotation: 0, duration: 1.8, ease: "power3.out" },
      "-=1.3"
    );

    // 3. Text content staggers in from the left to follow the momentum
    if (textRef.current && textRef.current.children) {
      tl.fromTo(Array.from(textRef.current.children),
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=1.4"
      );
    }
  }, []);

  // Simple Pop-Up Hover Effect
  const handleImageMouseEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!imageWrapperRef.current) return;
    
    gsap.to(imageWrapperRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
      boxShadow: "0 30px 60px rgba(1,50,32,0.2)"
    });
  };

  const handleImageMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!imageWrapperRef.current) return;
    
    gsap.to(imageWrapperRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    });
  };

  // Magnetic Physics Button
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;

    gsap.to(btnRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleBtnMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 py-24 relative overflow-visible perspective-1000">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#013220] rounded-full blur-[150px] opacity-10 pointer-events-none -translate-y-1/2 -z-10"></div>

      <div ref={contentRef} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Interactive Image Pop Up Side */}
        <div className="w-full lg:w-1/2 relative flex flex-col gap-6">
          {/* Mobile Label Layout */}
          <span className="lg:hidden inline-block bg-[#013220]/10 text-[#013220] px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase shadow-sm self-start">
            Why Choose Qemaat Real Estate?
          </span>
          <div 
            ref={imageWrapperRef}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            className="relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] aspect-[4/3] border border-gray-100 bg-white transform-gpu"
          >
            <img 
              ref={imageRef}
              src="/home/2.webp" 
              alt="Pakistan Skyline" 
              className="absolute inset-0 w-full h-full object-cover origin-center scale-105"
            />
            {/* Glassmorphism accent overlay */}
            <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg text-white font-medium text-sm shadow-xl pointer-events-none">
              Premium Listings
            </div>
          </div>
        </div>

        {/* Text Content Side */}
        <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-start">
          {/* Desktop Label Layout */}
          <span className="hidden lg:inline-block bg-[#013220]/10 text-[#013220] px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-6 shadow-sm">
            Why Choose Qemaat Real Estate?
          </span>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-[#013220] leading-[1.15] mb-6">
            Qemaat Real Estate is your ultimate gateway to finding the perfect property.
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-10 text-base md:text-lg">
            We bring you a massive selection of verified residential and commercial listings across the nation. Our expert team ensures a completely transparent and hassle free journey whether you are looking to buy sell or rent. Partner with us to discover highly lucrative investment opportunities and secure your ideal home.
          </p>
          
          <div className="relative inline-block">
            <button 
              ref={btnRef}
              onClick={() => router.push("/services")}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              className="border-2 border-[#013220] text-[#013220] font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-[#013220] hover:text-white hover:shadow-[0_10px_20px_rgba(1,50,32,0.3)] transition-all duration-300 relative z-10"
            >
              FIND OUT MORE
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}