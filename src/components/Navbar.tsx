"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);

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

        {/* Mobile Menu Toggle Button */}
        <button 
          className="lg:hidden p-2 text-gray-700 active:text-[#013220] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`${isMobileMenuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none items-center gap-4 lg:gap-7 py-4 lg:py-0 border-t lg:border-none border-gray-100`}>
          
          <Link href="/" className="text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer">HOME</Link>
          
          <Link href="/services" className="text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer">SERVICES</Link>

          <div className="relative group">
            <Link 
              href="/buy" 
              className="text-[14px] font-bold text-gray-700 lg:group-hover:text-[#013220] active:text-[#013220] transition-colors flex items-center justify-center gap-1 py-2 lg:py-3 uppercase cursor-pointer"
            >
              BUY
              <span 
                onClick={(e) => {
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsBuyDropdownOpen(!isBuyDropdownOpen);
                  }
                }}
                className="p-2 -m-2 cursor-pointer"
              >
                <svg className={`w-3.5 h-3.5 transition-transform ${isBuyDropdownOpen ? "rotate-180" : ""} lg:group-hover:rotate-180`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
            </Link>
            
            <div className={`${isBuyDropdownOpen ? "flex" : "hidden"} lg:flex lg:absolute lg:top-full lg:right-0 w-full lg:w-40 bg-white lg:border border-gray-100 lg:shadow-xl rounded-md transition-all duration-300 flex-col py-2 z-50 lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible`}>
              <Link href="/buy/homes" className="px-4 py-2 text-[14px] font-bold text-gray-700 md:hover:bg-[#013220] md:hover:text-white active:bg-[#013220] active:text-white transition-colors cursor-pointer text-center lg:text-left">Homes</Link>
              <Link href="/" className="px-4 py-2 text-[14px] font-bold text-gray-700 md:hover:bg-[#013220] md:hover:text-white active:bg-[#013220] active:text-white transition-colors cursor-pointer text-center lg:text-left">Plots</Link>
              <Link href="/buy/commercial" className="px-4 py-2 text-[14px] font-bold text-gray-700 md:hover:bg-[#013220] md:hover:text-white active:bg-[#013220] active:text-white transition-colors cursor-pointer text-center lg:text-left">Commercial</Link>
            </div>
          </div>

          <Link href="/rent" className="text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer">RENT</Link>
          
          <Link href="/area-guides" className="text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer">AREA GUIDES</Link>

          <Link href="/add-property" className="text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer">ADD PROPERTY</Link>

          <Link href="/login" className="text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer">LOGIN</Link>

          <Link href="/contact" className="text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer">CONTACT</Link>
          
        </div>

      </div>
    </nav>
  );
}