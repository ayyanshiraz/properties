"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function WaltonRoadClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    "Direct link between DHA and Ferozpur Road",
    "Bustling retail and wholesale markets",
    "Proximity to Walton Railway Station",
    "Established residential neighborhoods",
    "Accessible public transportation networks",
    "Close to major commercial hubs",
    "Diverse community environment",
    "Active local business economy"
  ];

  useEffect(() => {
    // Unique 3D Elastic Title Entrance
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 150, rotateX: -80, scale: 0.8, filter: "blur(15px)" },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)", duration: 2.5, ease: "elastic.out(1.2, 0.4)", transformPerspective: 1000, delay: 0.2 }
    );

    // Staggered Skewed Content Reveal
    if (contentRef.current && contentRef.current.children) {
      gsap.fromTo(Array.from(contentRef.current.children),
        { opacity: 0, x: -50, skewX: 10 },
        { opacity: 1, x: 0, skewX: 0, duration: 1.5, stagger: 0.15, ease: "expo.out", delay: 0.6 }
      );
    }
  }, []);

  return (
    <main className="w-full min-h-screen bg-white flex flex-col pt-[70px]">
      
     {/* Hero Section */}
      <section ref={heroRef} className={`w-full pt-20 pb-8 flex justify-center`}>
        <div className={`w-full max-w-[1200px] mx-auto px-4 md:px-8 flex justify-center`}>
          <h1 ref={titleRef} className={`text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tight text-center`}>
            Walton Road
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16 flex flex-col gap-12">
        
        <div ref={contentRef} className="flex flex-col gap-6 text-gray-700 leading-relaxed text-lg font-light">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013220] mb-2 leading-tight">
            A Vibrant Corridor Blending Residential and Commercial Zones
          </h2>
          
          <p>
            Walton Road serves as a crucial connective artery bridging Ferozpur Road with the upscale sectors of DHA Lahore and Lahore Cantonment. This unique position makes it an incredibly important and busy thoroughfare that blends diverse lifestyles and business opportunities.
          </p>
          
          <p>
            The road is highly celebrated for its bustling local markets that cater to a massive daily volume of shoppers. Whether you are looking for electronics, building materials, or everyday consumer goods, the markets along Walton Road provide unmatched variety and competitive pricing.
          </p>
          
          <p>
            Behind the commercial fronts lie deeply established residential neighborhoods. These communities have grown organically over decades, resulting in a culturally rich and dense environment. The availability of affordable housing options right next to premium societies makes this area uniquely diverse.
          </p>

          <p>
            Transportation is highly convenient, with multiple local transit routes intersecting here. The historic Walton Railway Station also adds to the rich heritage and connectivity profile of this bustling neighborhood.
          </p>
        </div>

        {/* Features List */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013220]">
            Walton Road Location Features:
          </h2>
          <ul className="flex flex-col gap-4 pl-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-lg text-gray-700">
                <div className="w-2 h-2 rounded-full bg-[#013220]"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* More Text Content */}
        <div className="flex flex-col gap-6 text-gray-700 leading-relaxed text-lg font-light pt-8 border-t border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013220] mb-2">
            Experience the Walton Lifestyle
          </h2>
          
          <p>
            The lifestyle around Walton Road is fast paced and lively. Residents enjoy immediate access to commercial hubs without having to travel long distances. The proximity to DHA also means that premium dining and entertainment facilities are just a short drive away.
          </p>
          
          <p>
            For investors, the commercial properties situated directly on the main road offer excellent foot traffic and high visibility. The constant flow of commuters between Ferozpur Road and Cantonment ensures that businesses here remain highly active throughout the week.
          </p>

          <p>
            This Walton Road guide is designed to highlight the immense practical benefits and investment potential of one of the most active commercial corridors in the city.
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center w-full pt-12 pb-20">
          <Link href="/area-guides" className="bg-[#013220] hover:bg-[#011a11] text-white font-bold text-lg py-4 px-10 rounded shadow-lg transition-colors duration-300">
            Back to Area Guides
          </Link>
        </div>

      </section>

    </main>
  );
}