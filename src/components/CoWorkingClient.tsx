"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function CoWorkingClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    `High-speed dedicated internet`,
    `24/7 secure building access`,
    `Fully equipped meeting rooms`,
    `Ergonomic furniture and layout`,
    `Complimentary tea and coffee`,
    `Uninterrupted power backup`,
    `Prime commercial location`,
    `Flexible daily and monthly plans`
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
        <div className={`w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col items-center justify-center`}>
          <h1 ref={titleRef} className={`text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tight text-center`}>
            Co-Working Space
          </h1>
          <p className={`text-lg md:text-2xl text-gray-600 font-light mt-6 text-center max-w-2xl opacity-90`}>
            Premium shared office environments for professionals and growing teams in Lahore.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className={`w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16 flex flex-col gap-12`}>
        
        <div ref={contentRef} className={`flex flex-col gap-6 text-gray-700 leading-relaxed text-lg font-light`}>
          <h2 className={`text-3xl md:text-4xl font-bold text-[#013220] mb-2 leading-tight`}>
            Elevate Your Work Experience
          </h2>
          
          <p>
            Our co-working spaces are designed to foster creativity, collaboration, and productivity. Whether you are a freelance professional, a startup founder, or a remote team, we provide the perfect infrastructure to support your daily operations without the massive overhead of a traditional office lease.
          </p>
          
          <p>
            Located in the heart of the city, our facilities offer seamless connectivity to major business hubs. You can network with like-minded individuals, host clients in professional meeting rooms, and focus entirely on growing your enterprise while we handle the facility management.
          </p>
        </div>

        {/* Features List */}
        <div className={`flex flex-col gap-6`}>
          <h2 className={`text-3xl md:text-4xl font-bold text-[#013220]`}>
            Workspace Amenities:
          </h2>
          <ul className={`grid grid-cols-1 md:grid-cols-2 gap-6 pl-2`}>
            {features.map((feature, index) => (
              <li key={index} className={`flex items-center gap-3 text-lg text-gray-700`}>
                <div className={`w-2 h-2 rounded-full bg-[#013220]`}></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className={`flex flex-col gap-6 text-gray-700 leading-relaxed text-lg font-light pt-8 border-t border-gray-100`}>
          <h2 className={`text-3xl md:text-4xl font-bold text-[#013220] mb-2`}>
            Ready to get started?
          </h2>
          <p>
            Drop by for a tour of our facilities or contact our team to discuss customized floor plans and dedicated desks that fit your exact business needs.
          </p>
        </div>

        {/* Contact Button */}
        <div className={`flex justify-center w-full pt-8 pb-20`}>
          <Link href={`/contact`} className={`bg-[#013220] hover:bg-[#011a11] text-white font-bold text-lg py-4 px-10 rounded shadow-lg transition-colors duration-300`}>
            Contact Us
          </Link>
        </div>

      </section>

    </main>
  );
}