"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function FerozpurRoadClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    "Major transit route via Metrobus",
    "High density commercial markets",
    "Direct access to central and southern Lahore",
    "Established healthcare centers like General Hospital",
    "Proximity to Model Town and Kalma Chowk",
    "Diverse range of housing societies nearby",
    "Heavy footfall for retail businesses",
    "Excellent connectivity for daily commuters"
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
            Ferozpur Road
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16 flex flex-col gap-12">
        
        <div ref={contentRef} className="flex flex-col gap-6 text-gray-700 leading-relaxed text-lg font-light">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013220] mb-2 leading-tight">
            A Major Commercial Artery and Connectivity Hub
          </h2>
          
          <p>
            Ferozpur Road is one of the longest and busiest thoroughfares in Lahore. It acts as a vital lifeline that connects the central districts of the city to the rapidly expanding southern suburbs. Businesses and investors highly value this location due to its massive daily traffic and strategic importance.
          </p>
          
          <p>
            The introduction of the Metrobus system transformed Ferozpur Road into a highly accessible transit corridor. Residents and workers can easily navigate the length of the city without facing the usual traffic hurdles. This accessibility has triggered significant commercial growth along the entire route.
          </p>
          
          <p>
            You will find everything from massive wholesale markets to specialized retail hubs dotting the roadside. Major intersections like Kalma Chowk and Chungi Amar Sidhu serve as key landmarks linking Ferozpur Road to other prominent neighborhoods.
          </p>

          <p>
            Healthcare is also a prominent feature of this area. Establishments like the Lahore General Hospital and various specialized clinics ensure that top tier medical facilities are always within reach for the surrounding communities.
          </p>
        </div>

        {/* Features List */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013220]">
            Ferozpur Road Location Features:
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
            Experience the Dynamic Environment
          </h2>
          
          <p>
            Living or working near Ferozpur Road means you are always close to the action. The adjacent residential areas offer varying levels of affordability, making it an attractive zone for a wide demographic of people. The constant hum of activity ensures that commercial ventures thrive here.
          </p>
          
          <p>
            From hardware markets to electronic hubs, shoppers can find virtually anything along this massive stretch. The robust local economy provides endless opportunities for entrepreneurs and property investors looking for strong rental yields.
          </p>

          <p>
            This Ferozpur Road guide has been crafted to help investors and potential residents navigate the endless possibilities this primary Lahore artery has to offer.
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