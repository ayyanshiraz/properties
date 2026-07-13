"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function CavalryGroundCanttClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    `Highly secure environment`,
    `Premium residential blocks`,
    `Bustling main commercial boulevard`,
    `Close to Gulberg and DHA`,
    `Upscale dining and shopping`,
    `Well-maintained parks`,
    `Excellent infrastructure`,
    `Elite community lifestyle`
  ];

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 150, rotateX: -80, scale: 0.8, filter: `blur(15px)` },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: `blur(0px)`, duration: 2.5, ease: `elastic.out(1.2, 0.4)`, transformPerspective: 1000, delay: 0.2 }
    );

    if (contentRef.current && contentRef.current.children) {
      gsap.fromTo(Array.from(contentRef.current.children),
        { opacity: 0, x: -50, skewX: 10 },
        { opacity: 1, x: 0, skewX: 0, duration: 1.5, stagger: 0.15, ease: `expo.out`, delay: 0.6 }
      );
    }
  }, []);

  return (
    <main className={`w-full min-h-screen bg-white flex flex-col pt-[70px]`}>
      
      {/* Hero Section */}
      <section ref={heroRef} className={`w-full pt-20 pb-8 flex justify-center`}>
        <div className={`w-full max-w-[1200px] mx-auto px-4 md:px-8 flex justify-center`}>
          <h1 ref={titleRef} className={`text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tight text-center`}>
            Cavalry Ground Cantt
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className={`w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16 flex flex-col gap-12`}>
        
        <div ref={contentRef} className={`flex flex-col gap-6 text-gray-700 leading-relaxed text-lg font-light`}>
          <h2 className={`text-3xl md:text-4xl font-bold text-[#013220] mb-2 leading-tight`}>
            An Upscale and Secure Community
          </h2>
          
          <p>
            Cavalry Ground is one of the most prestigious and secure neighborhoods in Lahore. Located adjacent to the Cantonment area, it offers a highly peaceful and regulated environment for its residents, making it a top choice for families and professionals seeking an elite lifestyle.
          </p>
          
          <p>
            The area acts as a strategic bridge between the bustling commercial district of Gulberg and the upscale sectors of DHA. This prime location allows residents to enjoy quick access to major city landmarks while returning to a calm and secure residential haven.
          </p>
          
          <p>
            The main boulevard of Cavalry Ground is famous for its dense commercial strip. It features high-end boutiques, renowned bakeries, banks, and grocery stores. Everything you need for a comfortable urban life is available right within the neighborhood.
          </p>

          <p>
            With well-paved roads, lush green parks, and stringent security measures, Cavalry Ground provides an unmatched standard of living. The community is tight-knit, and the infrastructure is meticulously maintained.
          </p>
        </div>

        {/* Features List */}
        <div className={`flex flex-col gap-6`}>
          <h2 className={`text-3xl md:text-4xl font-bold text-[#013220]`}>
            Cavalry Ground Features:
          </h2>
          <ul className={`flex flex-col gap-4 pl-4`}>
            {features.map((feature, index) => (
              <li key={index} className={`flex items-center gap-3 text-lg text-gray-700`}>
                <div className={`w-2 h-2 rounded-full bg-[#013220]`}></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* More Text Content */}
        <div className={`flex flex-col gap-6 text-gray-700 leading-relaxed text-lg font-light pt-8 border-t border-gray-100`}>
          <h2 className={`text-3xl md:text-4xl font-bold text-[#013220] mb-2`}>
            Experience Premium Living
          </h2>
          
          <p>
            Living in Cavalry Ground means experiencing the best of Lahore in a highly secure and premium setting. The real estate here is highly valued, consisting of spacious houses with beautiful architecture and modern amenities.
          </p>
          
          <p>
            Whether you are taking a stroll in the neighborhood parks or dining at the local upscale restaurants, the environment is always welcoming and serene. It truly is a premier destination for those who value peace of mind and convenience.
          </p>
        </div>

        {/* Back Button */}
        <div className={`flex justify-center w-full pt-12 pb-20`}>
          <Link href={`/area-guides`} className={`bg-[#013220] hover:bg-[#011a11] text-white font-bold text-lg py-4 px-10 rounded shadow-lg transition-colors duration-300`}>
            Back to Area Guides
          </Link>
        </div>

      </section>

    </main>
  );
}