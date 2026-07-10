"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface AreaItem {
  name: string;
  image: string;
  desc: string;
}

interface AreaGuidesClientProps {
  areas: AreaItem[];
}

export default function AreaGuidesClient({ areas }: AreaGuidesClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(textRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
    );

    if (gridRef.current && gridRef.current.children) {
      gsap.fromTo(Array.from(gridRef.current.children),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <main className="w-full min-h-screen bg-gray-50 flex flex-col pt-[70px] overflow-x-hidden">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-[70vh] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 bg-[url(/areaguides/area.webp)] bg-cover bg-center bg-no-repeat transform scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

        <div ref={textRef} className="relative z-10 flex flex-col items-start justify-center w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-4 uppercase drop-shadow-2xl flex flex-wrap gap-x-3">
            <span>LAHORE AREA</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">GUIDES</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl drop-shadow-md">
            Explore the city using our Area Guides.
          </p>
        </div>
      </section>

      {/* Area Grid Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-20">
         <div className="flex flex-col mb-12">
           <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">
             Popular <span className="text-[#013220]">Neighborhoods</span>
           </h2>
           <div className="w-24 h-1.5 bg-[#013220] rounded-full"></div>
         </div>

         <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
           {areas.map((area, index) => (
             <Link 
              href={`/area-guides/` + area.name.toLowerCase().replaceAll(` `, `-`)}
               key={index} 
               className="group relative block h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-lg md:hover:shadow-2xl active:shadow-2xl transition-all duration-500"
             >
               <div className="absolute inset-0 bg-gray-900">
                 <img src={area.image} alt={area.name} className="w-full h-full object-cover opacity-70 md:group-hover:scale-110 md:group-hover:opacity-90 group-active:scale-110 group-active:opacity-90 transition-all duration-700 ease-in-out" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#013220]/90 via-black/40 to-transparent opacity-80 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"></div>
               
               <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col transform translate-y-6 md:group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500">
                 <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">{area.name}</h3>
                 <p className="text-sm text-gray-200 opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                   {area.desc}
                 </p>
                 <div className="mt-4 flex items-center gap-2 text-white font-semibold text-xs tracking-widest uppercase opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 delay-200">
                   Explore Area 
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 </div>
               </div>
             </Link>
           ))}
         </div>
      </section>

    </main>
  );
}