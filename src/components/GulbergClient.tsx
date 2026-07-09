"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function GulbergClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    "Urban commercial lifestyle",
    "Liberty Market and MM Alam Road",
    "Luxury high rise apartments",
    "Premium dining and cafes",
    "Central business district",
    "Advanced healthcare facilities",
    "Top tier educational institutes",
    "Secure community environment"
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
      <section ref={heroRef} className="relative w-full h-[60vh] flex items-end justify-start overflow-hidden pb-12">
        <div className="absolute inset-0 z-0">
          <img src="/areaguides/gulberg.webp" alt="Gulberg Lahore" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0"></div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8">
          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight drop-shadow-2xl">
            Gulberg Lahore
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16 flex flex-col gap-12">
        
        <div ref={contentRef} className="flex flex-col gap-6 text-gray-700 leading-relaxed text-lg font-light">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013220] mb-2 leading-tight">
            The Commercial and Entertainment Heart of the City: Gulberg
          </h2>
          
          <p>
            Gulberg is situated in the very center of Lahore. It stretches from the main Canal Bank Road to the bustling commercial zones of Main Boulevard. Potential residents of Gulberg can expect their neighbors to be successful professionals and families seeking a premium urban lifestyle.
          </p>
          
          <p>
            This sophisticated, upscale community is extremely popular with those who commute to the central business district. The strategic location allows for a highly feasible commute to and from major workplaces, making it the most sought after address in the city.
          </p>
          
          <p>
            Getting around the Gulberg area is simple via the wide network of interconnected roads and underpasses. Public transport and ride sharing services provide an excellent way to get around the neighborhood and head off into the rest of Lahore.
          </p>

          <p>
            In terms of residential facilities, most apartment complexes provide quality amenities for their residents. Swimming pools, fitness centers, and fully equipped community gyms are a fairly common sight in modern Gulberg residences.
          </p>
        </div>

        {/* Features List */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013220]">
            Gulberg Location Features:
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
            Experience the Gulberg Lifestyle
          </h2>
          
          <p>
            Liberty Market and MM Alam Road offer residents a wide array of retail outlets and dining venues. From high end fashion brands to local boutiques, the shopping experience is unmatched. The dining scene is equally spectacular, providing culinary delights from all over the world.
          </p>
          
          <p>
            Residents who like to keep fit can make use of the space along the nearby parks for physical activities like walking, jogging, and cycling. Dotted between the commercial buildings, you will find lush green spaces and outdoor gymnasiums.
          </p>

          <p>
            This Gulberg guide has been crafted to help residents make an informed decision about their future home in the most vibrant city in the country.
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