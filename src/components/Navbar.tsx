"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.1 }
    );

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = "fixed left-0 w-full z-[100] transition-all duration-500 " + (isScrolled ? "top-0 bg-white/95 backdrop-blur-md shadow-md py-2" : "top-0 bg-white py-3");

  return (
    <nav ref={navRef} className={navClass}>
      <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center">
        
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 bg-[#013220] rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            Qeemat<span className="text-[#013220]">.com</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          
          <Link href="/" className="text-[14px] font-bold text-gray-700 hover:text-[#013220] transition-colors py-3 uppercase cursor-pointer">HOME</Link>
          
          <Link href="/services" className="text-[14px] font-bold text-gray-700 hover:text-[#013220] transition-colors py-3 uppercase cursor-pointer">SERVICES</Link>

          <div className="relative group">
            <Link href="/buy" className="text-[14px] font-bold text-gray-700 group-hover:text-[#013220] transition-colors flex items-center gap-1 py-3 uppercase cursor-pointer">
              BUY
              <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </Link>
            <div className="absolute top-full right-0 w-40 bg-white border border-gray-100 shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 z-50">
              <Link href="/buy/homes" className="px-4 py-2 text-[14px] font-bold text-gray-700 hover:bg-[#013220] hover:text-white transition-colors cursor-pointer">Homes</Link>
              <Link href="/" className="px-4 py-2 text-[14px] font-bold text-gray-700 hover:bg-[#013220] hover:text-white transition-colors cursor-pointer">Plots</Link>
              <Link href="/buy/commercial" className="px-4 py-2 text-[14px] font-bold text-gray-700 hover:bg-[#013220] hover:text-white transition-colors cursor-pointer">Commercial</Link>
            </div>
          </div>

          <Link href="/rent" className="text-[14px] font-bold text-gray-700 hover:text-[#013220] transition-colors py-3 uppercase cursor-pointer">RENT</Link>
          <Link href="/" className="text-[14px] font-bold text-gray-700 hover:text-[#013220] transition-colors py-3 uppercase cursor-pointer">AGENTS</Link>
          <Link href="/area-guides" className="text-[14px] font-bold text-gray-700 hover:text-[#013220] transition-colors py-3 uppercase cursor-pointer">AREA GUIDES</Link>

          <Link href="/contact" className="text-[14px] font-bold text-gray-700 hover:text-[#013220] transition-colors py-3 uppercase cursor-pointer">CONTACT</Link>
        </div>

      </div>
    </nav>
  );
}