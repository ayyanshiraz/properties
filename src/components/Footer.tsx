`use client`;

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current || !glowRef.current) return;
    const { left, top } = footerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    gsap.to(glowRef.current, {
      x: x - 300,
      y: y - 300,
      duration: 0.8,
      ease: `power3.out`
    });
  };

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.4;
    const y = (e.clientY - top - height / 2) * 0.4;
    
    gsap.to(target, { x, y, duration: 0.3, ease: `power2.out` });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    gsap.to(target, { x: 0, y: 0, duration: 0.7, ease: `elastic.out(1, 0.3)` });
  };

  return (
    <footer 
      ref={footerRef} 
      onMouseMove={handleMouseMove} 
      className={`relative w-full bg-[#013220] overflow-hidden pt-24 pb-12`}
    >
      <div 
        ref={glowRef} 
        className={`absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[180px] opacity-10 pointer-events-none -z-0`}
      ></div>

      <div className={`max-w-[1400px] mx-auto px-4 relative z-10`}>
        <div ref={contentRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16`}>
          
          <div className={`flex flex-col items-start`}>
            <Link href={`/`} className={`flex items-center gap-2 mb-6 cursor-pointer`}>
              <img src={`/logo3.png`} alt={`Qemaat Logo`} className={`w-10 h-10 object-contain bg-white rounded-lg shadow-lg`} />
              <span className={`text-2xl font-black text-white tracking-tight`}>
                Qemaat<span className={`text-gray-400`}></span>
              </span>
            </Link>
            <p className={`text-gray-300 text-sm leading-relaxed mb-8`}>
              The leading real estate portal connecting buyers sellers and investors across the nation. Experience transparent and seamless property transactions.
            </p>
          </div>

          <div className={`flex flex-col items-start`}>
            <h4 className={`text-white font-bold text-lg mb-6`}>CONTACT US</h4>
            <div className={`flex flex-col gap-5 text-sm text-white`}>
              <div>
                <span className={`font-bold block mb-1`}>Address:</span>
                <p className={`text-white leading-relaxed`}>
                 
                  50-52, E - III, Commercial Zone,<br />
                  Gulberg III, 54660, Lahore, Punjab.
                </p>
              </div>
              <div>
                <span className={`font-bold block mb-1`}>Email:</span>
                <Link href={`/`} className={`hover:text-gray-300 transition-colors cursor-pointer`}>qemaat@gmail.com</Link>
              </div>
              <div>
                <span className={`font-bold block mb-1`}>Call:</span>
                <span className={`hover:text-gray-300 transition-colors cursor-pointer`}>+92 333 4888324</span>
              </div>
            </div>
          </div>

          <div className={`flex flex-col items-start`}>
            <h4 className={`text-white font-bold text-lg mb-6`}>SERVICES</h4>
            <div className={`flex flex-col gap-4`}>
              <Link href={`/buy`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`text-white hover:text-gray-300 text-sm transition-colors cursor-pointer inline-flex items-center gap-2`}>
                <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
                Buy
              </Link>
              <Link href={`/rent`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`text-white hover:text-gray-300 text-sm transition-colors cursor-pointer inline-flex items-center gap-2`}>
                <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
                Rent
              </Link>
              
              <Link href={`/area-guides`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`text-white hover:text-gray-300 text-sm transition-colors cursor-pointer inline-flex items-center gap-2`}>
                <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
                Area Guides
              </Link>
              
            </div>
          </div>

          <div className={`flex flex-col items-start`}>
            <h4 className={`text-white font-bold text-lg mb-6`}>COMPANY</h4>
            <div className={`flex flex-col gap-4`}>
              <Link href={`/services`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`text-white hover:text-gray-300 text-sm transition-colors cursor-pointer inline-flex items-center gap-2`}>
                <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
                Services
              </Link>
              <Link href={`/plot-finder`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`text-white hover:text-gray-300 text-sm transition-colors cursor-pointer inline-flex items-center gap-2`}>
                <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
                Plot Finder
              </Link>
              <Link href={`/contact`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`text-white hover:text-gray-300 text-sm transition-colors cursor-pointer inline-flex items-center gap-2`}>
                <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
                Contact
              </Link>
              <Link href={`/blogs`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`text-white hover:text-gray-300 text-sm transition-colors cursor-pointer inline-flex items-center gap-2`}>
                <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
                Blogs 
              </Link>
              <Link href={`/privacy-policy`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`text-white hover:text-gray-300 text-sm transition-colors cursor-pointer inline-flex items-center gap-2`}>
                <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
                Privacy Policy
              </Link>
            </div>
          </div>

        </div>

        <div className={`flex flex-col md:flex-row justify-between items-center pt-8`}>
          <p className={`text-white text-sm font-medium mb-6 md:mb-0`}>
            Copyright 2026 Qemaat. All rights reserved.
          </p>
          
          <div className={`flex gap-4`}>
            <Link href={`https://www.facebook.com/profile.php?id=61591998176918`} target={`_blank`} rel={`noopener noreferrer`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#013220] transition-colors cursor-pointer`}>
              <svg className={`w-4 h-4`} fill={`currentColor`} viewBox={`0 0 24 24`}>
                <path d={`M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`} />
              </svg>
            </Link>
            
            <Link href={`https://www.instagram.com/qemaatofficial/`} target={`_blank`} rel={`noopener noreferrer`} onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticLeave} className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#013220] transition-colors cursor-pointer`}>
              <svg className={`w-4 h-4`} fill={`currentColor`} viewBox={`0 0 24 24`}>
                <path d={`M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z`} />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}