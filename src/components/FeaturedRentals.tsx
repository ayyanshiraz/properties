"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const rentalProperties = [
  {
    id: 1001,
    title: "Furnished 2 Bed Apartment (Without Bills)",
    location: "Gulberg, Lahore",
    price: "PKR 160,000 / Month",
    image: "/rent/6.webp",
    badges: ["FEATURED", "FOR RENT"],
    link: "/rent/1001"
  },
  {
    id: 1002,
    title: "Non Furnished Apartment (Without Bills)",
    location: "Gulberg, Lahore",
    price: "PKR 150,000 / Month",
    image: "/rent/14.webp",
    badges: ["FEATURED", "FOR RENT"],
    link: "/rent/1002"
  },
  {
    id: 1003,
    title: "2 Bed Apartment in Zameen Aurum",
    location: "Gulberg, Lahore",
    price: "PKR 520,000 / Month",
    image: "/rent/8.webp",
    badges: ["FEATURED", "FOR RENT"],
    link: "/rent/1003"
  },
  {
    id: 1004,
    title: "1 Kanal Portion on MM Alam Road",
    location: "MM Alam Road, Gulberg, Lahore",
    price: "PKR 250,000 / Month",
    image: "/rent/22.webp",
    badges: ["FEATURED", "FOR RENT"],
    link: "/rent/1004"
  },
  {
    id: 1005,
    title: "House for rent",
    location: "Cavlary ground cant Lahore",
    price:  "PKR 150,000 / Month",
    image: "/rent/46.webp",
    badges: ["FEATURED", "FOR RENT"],
    link: "/rent/1005"
  },
  {
    id: 1006,
    title: "Commercial rent property main bolevard valenciaa",
    location: "Main Boulevard Valencia",
    price:  "PKR  650,000 / Month",
    image: "/rent/87.webp",
    badges: ["FEATURED", "FOR RENT"],
    link: "/rent/1006"
  }
];

export default function FeaturedRentals() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [dbRentals, setDbRentals] = useState<any[]>([]);

  // Database se naye For Rent properties fetch karein
  useEffect(() => {
    const fetchNewRentals = async () => {
      try {
        const res = await fetch("/api/properties");
        const result = await res.json();
        if (result.success) {
          const rentals = result.data.filter((p: any) => p.status === "APPROVED" && p.type === "For Rent");
          const formatted = rentals.map((p: any) => ({
            id: `db-${p.id}`,
            title: p.title,
            location: p.location,
            price: `PKR ${p.price} / Month`, // Rent ke format ke mutabiq price
            image: p.images && p.images.length > 0 ? p.images[0] : "/rent/6.webp",
            badges: ["NEW", "FOR RENT"],
            link: `/rent/${p.id}`
          }));
          setDbRentals(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch featured rentals:", error);
      }
    };
    fetchNewRentals();
  }, []);

  // Purani properties aur nayi database properties ko mila dein
  const allRentals = [...rentalProperties, ...dbRentals];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Header Fade Up
      if (headerRef.current && headerRef.current.children) {
        tl.fromTo(
          Array.from(headerRef.current.children),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
      }

      // 3D Horizon Fold Reveal for Cards
      if (cardsRef.current && cardsRef.current.children) {
        tl.fromTo(
          Array.from(cardsRef.current.children),
          { y: 100, opacity: 0, rotateX: -30, transformPerspective: 1000 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.2, ease: "expo.out" },
          "-=0.6"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [dbRentals]); // GSAP animation ko nayi properties load hone par update karein

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 relative">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#013220] mb-4 tracking-tight">
            Featured Properties For Rent
          </h2>
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
            Discover exclusive rental opportunities with our curated selection of premium homes in Pakistan most desirable locations.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Arrow */}
          <button 
            onClick={slideLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-30 w-12 h-12 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#013220] hover:bg-[#013220] hover:text-white transition-colors cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          {/* Scrollable Track */}
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 pt-4 px-4 -mx-4 relative z-20 items-stretch"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div ref={cardsRef} className="flex gap-8 items-stretch">
              {allRentals.map((property) => (
                <Link 
                  href={property.link}
                  key={property.id} 
                  className="w-[340px] md:w-[400px] shrink-0 h-full flex flex-col bg-[#013220] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(1,50,32,0.12)] transition-all duration-500 snap-center group/card cursor-pointer border border-[#013220] transform hover:-translate-y-3 relative"
                >
                  
                  {/* Flat 2D Light Glare Sweep Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out z-40 pointer-events-none"></div>

                  {/* Image Container */}
                  <div className="relative h-[240px] w-full shrink-0 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt="Property" 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-[1.15]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 z-10"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                      {property.badges.map((badge: string, index: number) => {
                        let bgColor = "bg-[#013220]";
                        if (badge === "FEATURED") bgColor = "bg-[#fbbf24] text-black";
                        else if (badge === "FOR RENT") bgColor = "bg-[#10b981]";
                        else if (badge === "NEW") bgColor = "bg-red-600";
                        
                        return (
                          <span 
                            key={index} 
                            className={"px-3 py-1 text-[11px] font-bold uppercase rounded text-white shadow-md w-fit " + bgColor}
                          >
                            {badge}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative z-20 bg-[#013220] flex flex-col flex-grow">
                    {/* Metrics Row */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                      <div className="flex items-center gap-2 text-white text-sm font-medium">
                        <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm font-medium">
                        <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-white text-sm font-medium">Rent </span>
                      <span className="text-xl font-black text-white">{property.price}</span>
                    </div>

                    {/* Title & Location (Pushed to bottom naturally if needed, or kept consistent) */}
                    <div className="mt-auto">
                      <h3 className="text-lg font-bold text-white mb-1 truncate">
                        {property.title}
                      </h3>
                      <p className="text-sm text-white font-medium truncate">
                        {property.location}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={slideRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-30 w-12 h-12 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#013220] hover:bg-[#013220] hover:text-white transition-colors cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}