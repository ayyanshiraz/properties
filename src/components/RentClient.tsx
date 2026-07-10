"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

interface PropertyItem {
  id: number;
  title: string;
  location: string;
  price: number;
  priceStr: string;
  image: string;
}

interface RentClientProps {
  properties: PropertyItem[];
}

export default function RentClient({ properties }: RentClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [sortOrder, setSortOrder] = useState("Default Order");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    gsap.fromTo(heroTextRef.current,
      { opacity: 0, scale: 0.5, rotateZ: 3, filter: "blur(20px)" },
      { opacity: 1, scale: 1, rotateZ: 0, filter: "blur(0px)", duration: 2.2, ease: "elastic.out(1.2, 0.4)", delay: 0.1 }
    );

    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 150, rotateX: 25 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: "power4.out", transformPerspective: 1200, delay: 0.4 }
    );
  }, []);

  const handleSort = (order: string) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  const sortedProperties = [...properties].sort((a, b) => {
    if (sortOrder === "Price: Low to High") return a.price - b.price;
    if (sortOrder === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  return (
    <main className="w-full min-h-screen bg-[#fafafa] flex flex-col pt-[70px] overflow-hidden">
      
      <section ref={heroRef} className="relative w-full h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url(/rent/rent.webp)] bg-cover bg-center bg-no-repeat transform scale-110"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

        <div ref={heroTextRef} className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-wider drop-shadow-2xl">
            Properties For Rent
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-light drop-shadow-lg">
            Luxury Living: Browse Our Exclusive Properties for Rent
          </p>
        </div>
      </section>

      <section ref={contentRef} className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-6">
          
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 font-medium">
              <Link href="/" className="hover:text-[#013220] transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-bold">For Rent</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">For Rent</h2>
            <p className="text-sm text-gray-500 font-bold">{properties.length} Properties</p>
          </div>

          <div className="flex items-center gap-6">
            
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
              <button 
                onClick={() => setViewMode("grid")}
                className={"p-2 rounded-md transition-all duration-300 " + (viewMode === "grid" ? "bg-[#013220] text-white shadow-md transform scale-105" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50")}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"></path></svg>
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={"p-2 rounded-md transition-all duration-300 " + (viewMode === "list" ? "bg-[#013220] text-white shadow-md transform scale-105" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50")}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"></path></svg>
              </button>
            </div>

            <div className="flex items-center gap-3 relative">
              <span className="text-sm text-gray-600 font-bold uppercase tracking-wider">Sort by:</span>
              <div 
                className="relative w-52 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer select-none hover:border-[#013220] transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="px-4 py-2.5 text-sm text-gray-800 font-bold flex justify-between items-center">
                  {sortOrder}
                  <svg className={"w-4 h-4 text-[#013220] transform transition-transform duration-300 " + (isDropdownOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
                    {["Default Order", "Price: Low to High", "Price: High to Low"].map((option) => (
                      <div 
                        key={option}
                        onClick={(e) => { e.stopPropagation(); handleSort(option); }}
                        className={"px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200 " + (sortOrder === option ? "bg-[#013220] text-white pl-6" : "text-gray-700 hover:bg-gray-50 hover:text-[#013220] hover:pl-6")}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className={"w-full gap-8 " + (viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col")}>
          {sortedProperties.map((property) => (
            <Link 
              href={"/rent/" + property.id} 
              key={property.id} 
              className={"bg-[#013220] rounded-xl overflow-hidden shadow-lg hover:shadow-[0_25px_50px_rgba(1,50,32,0.4)] hover:-translate-y-3 hover:scale-[1.03] transition-all duration-400 ease-out flex group relative z-10 hover:z-20 " + (viewMode === "grid" ? "flex-col" : "flex-row h-[260px]")}
            >
              
              <div className={"relative overflow-hidden " + (viewMode === "grid" ? "w-full h-[250px]" : "w-[40%] h-full")}>
                <img src={property.image} alt="Property" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                
                <div className="absolute top-4 right-4 bg-white shadow-lg text-[#013220] text-[10px] font-black px-4 py-1.5 uppercase tracking-widest rounded-sm transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  FOR RENT
                </div>

                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-5 left-5 text-white font-extrabold text-xl drop-shadow-md transform group-hover:-translate-y-1 transition-transform duration-300">
                  Start From {property.priceStr}
                </div>
              </div>

              <div className={"flex flex-col justify-between p-6 " + (viewMode === "grid" ? "w-full" : "w-[60%]")}>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-[17px] font-black text-white leading-tight truncate group-hover:text-gray-200 transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-300 font-medium">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {property.location}
                  </div>
                </div>

              </div>

            </Link>
          ))}
        </div>

      </section>

    </main>
  );
}