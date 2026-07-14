"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);
  const cardsSectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Hyper-Warp & Matrix Reveal
    if (heroRef.current && heroTextRef.current) {
      gsap.fromTo(
        heroRef.current,
        { filter: "blur(30px) brightness(2) contrast(1.5)" },
        { filter: "blur(0px) brightness(1) contrast(1)", duration: 2.5, ease: "power4.out" }
      );

      gsap.fromTo(
        Array.from(heroTextRef.current.children),
        { y: 150, opacity: 0, rotateX: 90, rotateY: 45, transformPerspective: 1200 },
        { y: 0, opacity: 1, rotateX: 0, rotateY: 0, duration: 1.8, stagger: 0.2, ease: "back.out(1.4)", delay: 0.4 }
      );
    }

    // 2. Story Thermal Snap Reveal
    if (storyRef.current) {
      gsap.fromTo(
        storyRef.current,
        { y: 80, opacity: 0, filter: "blur(15px) brightness(1.5)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 3. Kinetic Gravity Stats & Real-Time Counters
    if (statsRef.current && statsRef.current.children) {
      const statNodes = statsRef.current.querySelectorAll("h3");
      
      // Gravitational Box Drop
      gsap.fromTo(
        Array.from(statsRef.current.children),
        { y: -120, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Kinetic Number Engine
      const counts = { a: 0, b: 0, c: 0, d: 0 };
      gsap.to(counts, {
        a: 25,
        b: 50,
        c: 7,
        d: 2100,
        duration: 2.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          if (statNodes[0]) statNodes[0].innerText = Math.floor(counts.a) + "+";
          if (statNodes[1]) statNodes[1].innerText = Math.floor(counts.b) + "B+";
          if (statNodes[2]) statNodes[2].innerText = String(Math.floor(counts.c));
          if (statNodes[3]) statNodes[3].innerText = Math.floor(counts.d).toLocaleString() + "+";
        }
      });
    }

    // 4. CEO Cinematic Iris & Holographic Text Reveal
    if (ceoRef.current && ceoRef.current.children) {
      const ceoImage = ceoRef.current.children[0];
      const ceoText = ceoRef.current.children[1];

      gsap.fromTo(ceoImage,
        { clipPath: "circle(0% at 50% 50%)", scale: 1.2, filter: "grayscale(100%) blur(10px)" },
        {
          clipPath: "circle(100% at 50% 50%)",
          scale: 1,
          filter: "grayscale(0%) blur(0px)",
          duration: 2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ceoRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      if (ceoText && ceoText.children) {
        gsap.fromTo(Array.from(ceoText.children),
          { x: 100, opacity: 0, filter: "drop-shadow(0px 0px 20px #10b981) blur(5px)" },
          {
            x: 0,
            opacity: 1,
            filter: "drop-shadow(0px 0px 0px transparent) blur(0px)",
            duration: 1.5,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ceoRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }

    // Removed the HUD 3D Matrix Cascade for Cards so hover effects function natively
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden">
      
      {/* 1. Hero Section */}
      <div 
        ref={heroRef}
        className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div ref={heroTextRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-white text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4 block">
            Real Estate Agency In Pakistan
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight">
            Qemaat
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#team" className="px-8 py-3 border-2 border-white text-white font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-[#013220] transition-colors duration-300">
              Our Team
            </Link>
            <Link href="#contact" className="px-8 py-3 border-2 border-white text-white font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-[#013220] transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Our Story & Stats Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          
          <div ref={storyRef} className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#013220] mb-8 uppercase tracking-wide">
              Our Story
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2024, Qemaat has quickly established itself as a leader in the Pakistan real estate market. Since our inception, we have consistently upheld a standard of excellence and a commitment to providing our clients with unparalleled service.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our committed team is dedicated to meeting client needs with innovative solutions, and extensive knowledge of Pakistan Real Estate facilitates seamless transactions that align with their pace and requirements.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200">
            <div className="flex flex-col items-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-[#013220] mb-2">0+</h3>
              <p className="text-gray-500 font-medium">Real Estate Agents</p>
            </div>
            <div className="flex flex-col items-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-[#013220] mb-2">0B+</h3>
              <p className="text-gray-500 font-medium">Worth of Sales</p>
            </div>
            <div className="flex flex-col items-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-[#013220] mb-2">0</h3>
              <p className="text-gray-500 font-medium">Cities Covered</p>
            </div>
            <div className="flex flex-col items-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-[#013220] mb-2">0+</h3>
              <p className="text-gray-500 font-medium">Transactions</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CEO Message Section */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-100">
        <div ref={ceoRef} className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-[#10b981] translate-x-4 translate-y-4 rounded-xl z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
              alt="Yasir Irshad - Director" 
              className="relative z-10 w-full h-[500px] object-cover rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="text-6xl text-[#10b981] font-serif leading-none mb-6"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At Qemaat, we believe that real estate is more than just a transaction; it is the foundation upon which dreams are built and ambitions are realized. We bring over a decade of market leadership in Pakistan, having proudly served this dynamic region since our beginning.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              In today fast paced and ever evolving real estate landscape, a one size fits all approach is no longer enough. We recognize that every client journey is unique, which is why our mission is to provide a truly personalized and consultative experience. Whether you are buying, selling, or investing, our commitment is to understand your vision first, then meticulously tailor our services to achieve a successful outcome.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Our team of dedicated agents leverages deep local knowledge, cutting edge technology, and real time market insights to uncover opportunities that align perfectly with your goals. Our practice is built on a foundation of unwavering core values: transparency, integrity, and collaboration.
            </p>
            
            <div>
              <h4 className="text-2xl font-bold text-[#013220] mb-1">Yasir Irshad</h4>
              <p className="text-[#10b981] font-medium uppercase tracking-wider text-sm">Director, Qemaat</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Core Values Cards Section */}
      <section ref={cardsSectionRef} className="relative py-32 w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80)] bg-cover bg-center bg-fixed z-0"></div>
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        
        <div className="relative z-20 max-w-[1400px] mx-auto px-4">
          <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#013220] p-12 text-center text-white rounded-xl shadow-2xl border border-white/10 hover:-translate-y-4 hover:shadow-[#10b981]/20 transition-all duration-500">
              <div className="flex justify-center mb-6">
                <svg className="w-12 h-12 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6">Our Approach</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                We deliver unparalleled services to clients looking to buy, sell, rent, or manage their properties. At Qemaat, we are sure to guide you toward the right Real Estate investment opportunity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#013220] p-12 text-center text-white rounded-xl shadow-2xl border border-white/10 hover:-translate-y-4 hover:shadow-[#10b981]/20 transition-all duration-500">
              <div className="flex justify-center mb-6">
                <svg className="w-12 h-12 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6">Our Goal</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                We are an innovative real estate brokerage concept. Our goal is to become one of Pakistan top real estate brokerage companies and to make a substantial and enduring impact on the marketplace.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#013220] p-12 text-center text-white rounded-xl shadow-2xl border border-white/10 hover:-translate-y-4 hover:shadow-[#10b981]/20 transition-all duration-500">
              <div className="flex justify-center mb-6">
                <svg className="w-12 h-12 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6">Our Experts</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Our team is a synergy of dedicated experts who work collaboratively to deliver professional services to our clients with a commitment to excellence, striving to set new standards in the industry.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}