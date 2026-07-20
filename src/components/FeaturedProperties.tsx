"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: `2001`,
    title: `2 Kanal Commercial Building`,
    location: `Mehmood Kasuri Road, Gulberg, Lahore`,
    price: `100 Crore`,
    beds: `Commercial`,
    area: `2 Kanal (59x150)`,
    image: `/buy/1.webp`,
    badges: [`FEATURED`, `FOR SALE`],
    link: `/buy/2001`
  },
  {
    id: `2002`,
    title: `2 Kanal Commercial House Kothi`,
    location: `Mehmood Kasuri Road, Gulberg, Lahore`,
    price: `90 Crore`,
    beds: `Commercial`,
    area: `2 Kanal (59x150)`,
    image: `/buy/2.webp`,
    badges: [`FEATURED`, `FOR SALE`],
    link: `/buy/2002`
  },
  {
    id: `2003`,
    title: `3.5 Marla House`,
    location: `Main Ferozpur Road, Lahore`,
    price: `1.25 Crore`,
    beds: `Residential`,
    area: `3.5 Marla (26 ft front)`,
    image: `/buy/9.webp`,
    badges: [`FEATURED`, `FOR SALE`],
    link: `/buy/2003`
  },
  {
    id: `2004`,
    title: `6 Marla Shiraz Villas House`,
    location: `Shiraz Villas, Main Walton Road, Lahore`,
    price: `3 Crore`,
    beds: `Residential`,
    area: `6 Marla (25 ft front)`,
    image: `/buy/8.webp`,
    badges: [`FEATURED`, `FOR SALE`],
    link: `/buy/2004`
  },
  {
    id: `2005`,
    title: `1 Kanal 3 Marla Commercial Building`,
    location: `Mehmood Kasuri Road, Gulberg, Lahore`,
    price: `90 Crore`,
    beds: `Commercial`,
    area: `1 Kanal 3 Marla`,
    image: `/buy/1.webp`,
    badges: [`FEATURED`, `FOR SALE`],
    link: `/buy/2005`
  },
  { id: `2006`,
    title: `34 Marla House in Prime Location Gulberg`,
    location: `Gulberg, Lahore`,
    price: `16 Crore`,
    beds: `Residential`,
    area: `34 Marla`,
    image: `/buy/14.webp`,
    badges: [`FEATURED`, `FOR SALE`],
    link: `/buy/2006`}
];

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [dbProps, setDbProps] = useState<any[]>([]);

  useEffect(() => {
    const fetchNewProperties = async () => {
      try {
        const res = await fetch(`/api/properties`);
        const result = await res.json();
        if (result.success) {
          const sales = result.data.filter((p: any) => p.status === `APPROVED` && p.type === `For Sale`);
          const formatted = sales.map((p: any) => ({
            id: `db-` + p.id,
            title: p.title,
            location: p.location,
            price: p.price,
            beds: p.category || `Residential`,
            area: p.area || `Not Specified`,
            image: p.images && p.images.length > 0 ? p.images[0] : `/buy/1.webp`,
            badges: [`NEW`, `FOR SALE`],
            link: p.category === `Commercial` ? `/buy/commercial/` + p.id : `/buy/homes/` + p.id
          }));
          setDbProps(formatted);
        }
      } catch (error) {
        console.error(`Failed to fetch featured properties:`, error);
      }
    };
    fetchNewProperties();
  }, []);

  const allProperties = [...properties, ...dbProps];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top 75%`,
          toggleActions: `play none none reverse`
        }
      });

      if (headerRef.current && headerRef.current.children) {
        tl.fromTo(
          Array.from(headerRef.current.children),
          { y: 60, opacity: 0, filter: `blur(8px)` },
          { y: 0, opacity: 1, filter: `blur(0px)`, duration: 1.2, stagger: 0.15, ease: `power4.out` }
        );
      }

      if (cardsRef.current && cardsRef.current.children) {
        tl.fromTo(
          Array.from(cardsRef.current.children),
          { y: 120, opacity: 0, filter: `blur(20px) brightness(1.5)` },
          { y: 0, opacity: 1, filter: `blur(0px) brightness(1)`, duration: 1.5, stagger: 0.15, ease: `expo.out` },
          `-=.8`
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [dbProps]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: `smooth` });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: `smooth` });
    }
  };

  return (
    <section ref={sectionRef} className={`relative w-full py-24 bg-gray-50 overflow-hidden`}>
      <div className={`max-w-[1400px] mx-auto px-4 relative`}>
        
        <div ref={headerRef} className={`text-center mb-16`}>
          <h2 className={`text-4xl md:text-5xl font-black text-[#013220] mb-4 tracking-tight`}>
            Featured Properties For Sale
          </h2>
          <p className={`text-gray-600 text-lg font-medium`}>
            Explore a curated selection of premium properties available for immediate purchase.
          </p>
        </div>

        <div className={`relative group`}>
          
          <button 
            onClick={slideLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-30 w-12 h-12 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#013220] hover:bg-[#013220] hover:text-white transition-colors cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
          >
            <svg className={`w-6 h-6`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}>
              <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M15 19l-7-7 7-7`}></path>
            </svg>
          </button>

          <div 
            ref={sliderRef}
            className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 pt-4 px-4 -mx-4 relative z-20 items-stretch`}
            style={{ scrollbarWidth: `none`, msOverflowStyle: `none` }}
          >
            <div ref={cardsRef} className={`flex gap-6 items-stretch`}>
              {allProperties.map((property) => (
                <Link 
                  href={property.link}
                  key={property.id} 
                  className={`w-[340px] md:w-[400px] shrink-0 h-full flex flex-col bg-[#013220] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(1,50,32,0.12)] transition-all duration-500 snap-center group/card cursor-pointer border border-[#013220] transform hover:-translate-y-3 relative`}
                >
                  
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] ease-in-out z-40 pointer-events-none`}></div>

                  <div className={`relative h-[240px] w-full shrink-0 overflow-hidden`}>
                    <img 
                      src={property.image} 
                      alt={`Property`} 
                      className={`w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-[1.15]`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 z-10`}></div>
                    
                    <div className={`absolute top-4 left-4 flex flex-col gap-2 z-20`}>
                      {property.badges.map((badge: string, index: number) => {
                        let bgColor = `bg-[#013220]`;
                        if (badge === `FEATURED`) bgColor = `bg-[#fbbf24] text-black`;
                        else if (badge === `FOR SALE`) bgColor = `bg-[#10b981]`;
                        else if (badge === `READY`) bgColor = `bg-blue-600`;
                        else if (badge === `NEW`) bgColor = `bg-red-600`;
                        
                        return (
                          <span 
                            key={index} 
                            className={`px-3 py-1 text-[11px] font-bold uppercase rounded text-white shadow-md w-fit ` + bgColor}
                          >
                            {badge}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className={`p-6 relative z-20 bg-[#013220] flex flex-col flex-grow`}>
                    <div className={`flex items-center justify-between border-b border-white/10 pb-4 mb-4`}>
                      <div className={`flex items-center gap-2 text-white text-sm font-medium`}>
                        <svg className={`w-5 h-5 text-[#10b981]`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}>
                          <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6`}></path>
                        </svg>
                        {property.beds}
                      </div>
                      <div className={`flex items-center gap-2 text-white text-sm font-medium`}>
                        <svg className={`w-5 h-5 text-[#10b981]`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}>
                          <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z`}></path>
                        </svg>
                        {property.area}
                      </div>
                    </div>

                    <div className={`mb-4`}>
                      <span className={`text-white text-sm font-medium`}>Price </span>
                      <span className={`text-xl font-black text-white`}>PKR {property.price}</span>
                    </div>

                    <div className={`mt-auto`}>
                      <h3 className={`text-lg font-bold text-white mb-1 truncate`}>
                        {property.title}
                      </h3>
                      <p className={`text-sm text-white font-medium truncate`}>
                        {property.location}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button 
            onClick={slideRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-30 w-12 h-12 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#013220] hover:bg-[#013220] hover:text-white transition-colors cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
          >
            <svg className={`w-6 h-6`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}>
              <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path>
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}