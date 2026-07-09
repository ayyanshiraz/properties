"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Quantum Hologram Assembly (Hero Animation)
    if (heroRef.current) {
      const heroImage = heroRef.current.querySelector("img");
      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { filter: "hue-rotate(180deg) saturate(3) blur(20px)", scale: 2 },
          { filter: "hue-rotate(0deg) saturate(1) blur(0px)", scale: 1, duration: 2.5, ease: "power4.out" }
        );
      }
    }

    if (heroTextRef.current && heroTextRef.current.children) {
      gsap.fromTo(
        Array.from(heroTextRef.current.children),
        { opacity: 0, z: 800, rotateX: 90, rotateY: 45, filter: "blur(20px)", transformPerspective: 1200 },
        { opacity: 1, z: 0, rotateX: 0, rotateY: 0, filter: "blur(0px)", duration: 2, stagger: 0.2, ease: "expo.out", delay: 0.3 }
      );
    }

    // 2. Gravity Well Inversion (Intro Section)
    if (introRef.current) {
      gsap.fromTo(
        introRef.current,
        { scale: 0.4, rotateY: 90, opacity: 0, transformPerspective: 1500, filter: "blur(30px)" },
        {
          scale: 1,
          rotateY: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 3. Tesseract Fold & Kinetic Slice (Services Alternating List)
    if (servicesContainerRef.current && servicesContainerRef.current.children) {
      const sections = Array.from(servicesContainerRef.current.children);
      
      sections.forEach((section, index) => {
        const isEven = index % 2 === 0;
        const textElement = section.querySelector(".service-text");
        const imageElement = section.querySelector(".service-image");

        // The entire container folds in 3D
        gsap.fromTo(
          section,
          { rotateX: -60, y: 200, opacity: 0, transformPerspective: 1500 },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 1.6,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Text slices in kinetically with skew
        if (textElement) {
          gsap.fromTo(
            textElement,
            { x: isEven ? -200 : 200, opacity: 0, skewX: isEven ? 25 : -25 },
            {
              x: 0,
              opacity: 1,
              skewX: 0,
              duration: 1.4,
              delay: 0.2,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Image counter-rotates and executes a deep parallax zoom
        if (imageElement) {
          gsap.fromTo(
            imageElement,
            { scale: 1.6, rotateY: isEven ? 35 : -35, filter: "sepia(80%) blur(10px)" },
            {
              scale: 1,
              rotateY: 0,
              filter: "sepia(0%) blur(0px)",
              duration: 2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }

    // 4. Cybernetic Drop Cascade (Form Section)
    if (formRef.current && formRef.current.children) {
      gsap.fromTo(
        Array.from(formRef.current.children),
        { opacity: 0, y: 120, rotateX: 45, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.5,
          stagger: 0.25,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden pb-32">
      
      {/* 1. Hero Section */}
      <div ref={heroRef} className="relative w-full min-h-[70vh] flex items-center justify-center pt-40 pb-32 lg:pt-48">
        <div className="absolute inset-0 z-0">
          <img 
            src="/services/services.webp" 
            alt="City Skyline" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#013220]/70 z-10 pointer-events-none"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 relative z-20 w-full">
          <div ref={heroTextRef} className="flex flex-col items-start justify-center max-w-3xl">
            <span className="text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 block">
              REAL ESTATE SERVICE
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">
              Our expert service offers guidance, listings, and support for a seamless experience
            </h1>
            <Link href="#contact" className="px-8 py-4 border-2 border-white text-white font-bold text-sm tracking-wider uppercase rounded hover:bg-[#013220] hover:border-[#013220] transition-colors duration-300">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Intro Section */}
      <div ref={introRef} className="max-w-[1400px] mx-auto px-4 py-24">
        <div className="bg-gray-50 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 border border-gray-100 shadow-xl">
          <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
              alt="Real Estate Agents" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#013220] mb-6">Extraordinary Real Estate Service</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our reputation is built on delivering unparalleled real estate services that consistently surpass client expectations. By fostering strong alliances with the most respected property developers across Pakistan, we guarantee a premium experience.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our core mission is to cultivate lasting relationships founded on trust, ensuring every client feels valued and receives the highest standard of care in their real estate journey.
            </p>
            <Link href="#contact" className="self-start px-8 py-4 border-2 border-[#013220] text-[#013220] font-bold text-sm tracking-wider uppercase rounded hover:bg-[#013220] hover:text-white transition-colors duration-300">
              Schedule Your Meeting NOW!
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Services Alternating List */}
      <div ref={servicesContainerRef} className="max-w-[1400px] mx-auto px-4 flex flex-col gap-32 py-16">
        
        {/* Service 1: Buy */}
        <div className="flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
          <div className="w-full lg:w-1/2 service-text flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#013220] mb-6">Buy Property</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Your new home address is here: Qemaat.com expert will guide you to bespoke property investments that perfectly match your needs.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Unlock Your new home address: Schedule a meeting with us. Join our exclusive offers community, and benefit from our top real estate developers alliance and our reputation.
            </p>
            <Link href="#contact" className="self-start px-8 py-4 border-2 border-[#013220] text-[#013220] font-bold text-sm tracking-wider uppercase rounded hover:bg-[#013220] hover:text-white transition-colors duration-300">
              Schedule Your Meeting NOW!
            </Link>
          </div>
          <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl h-[450px]">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80" alt="Buy Property" className="service-image w-full h-full object-cover" />
          </div>
        </div>

        {/* Service 2: Sell */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 overflow-hidden">
          <div className="w-full lg:w-1/2 service-text flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#013220] mb-6">Sell Property</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Effortless For You. Our dedicated area specialist, daily buyers registrations, Real Estate portal exposure, professional videography photography creation, VIP concierge service, SEO PPC SMM, automated messaging emails, and our real estate investors database all ensure your property stands out to interested buyers.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Unlock the True Value of Your Property: Schedule a valuation with us. Join our exclusive client list, and benefit from our marketing exposure.
            </p>
            <Link href="#contact" className="self-start px-8 py-4 border-2 border-[#013220] text-[#013220] font-bold text-sm tracking-wider uppercase rounded hover:bg-[#013220] hover:text-white transition-colors duration-300">
              Schedule Your Meeting NOW!
            </Link>
          </div>
          <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl h-[450px]">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&q=80" alt="Sell Property" className="service-image w-full h-full object-cover" />
          </div>
        </div>

        {/* Service 3: Management */}
        <div className="flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
          <div className="w-full lg:w-1/2 service-text flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#013220] mb-6">Property Management</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Effortless For You. Our dedicated area specialist, daily buyers registrations, Real Estate portal exposure, professional videography photography creation, VIP concierge service, SEO PPC SMM, automated messaging emails, and our real estate investors database all ensure your property stands out to interested buyers.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Unlock the True Value of Your Property: Schedule a valuation with us. Join our exclusive client list, and benefit from our marketing exposure.
            </p>
            <Link href="#contact" className="self-start px-8 py-4 border-2 border-[#013220] text-[#013220] font-bold text-sm tracking-wider uppercase rounded hover:bg-[#013220] hover:text-white transition-colors duration-300">
              Schedule Your Meeting NOW!
            </Link>
          </div>
          <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl h-[450px]">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80" alt="Property Management" className="service-image w-full h-full object-cover" />
          </div>
        </div>

        {/* Service 4: Concierge */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 overflow-hidden">
          <div className="w-full lg:w-1/2 service-text flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#013220] mb-6">Concierge Services</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At Qemaat.com, our concierge services are designed to meet your expectations in every aspect of your real estate experience with us.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We prioritize your comfort by arranging for one of our luxurious vehicles to pick you up from your residence or workplace, ensuring a comfortable trip to your property. Following your coordinated viewing, your assigned chauffeur will efficiently transport you to your next destination, reflecting our dedication to providing the utmost convenience and sophistication in your real estate journey.
            </p>
            <Link href="#contact" className="self-start px-8 py-4 border-2 border-[#013220] text-[#013220] font-bold text-sm tracking-wider uppercase rounded hover:bg-[#013220] hover:text-white transition-colors duration-300">
              Schedule Your Meeting NOW!
            </Link>
          </div>
          <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl h-[450px]">
            <img src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=1000&q=80" alt="Concierge Services" className="service-image w-full h-full object-cover" />
          </div>
        </div>

      </div>

      {/* 4. Contact Form Section */}
      <div id="contact" ref={formRef} className="max-w-[1000px] mx-auto px-4 py-32">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#013220] mb-4">Contact Us</h2>
        </div>
        
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="px-6 py-4 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400 w-full" />
            <input type="text" placeholder="Last Name" className="px-6 py-4 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="email" placeholder="Email" className="px-6 py-4 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400 w-full" />
            <input type="text" placeholder="Phone" className="px-6 py-4 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400 w-full" />
          </div>

          <select className="px-6 py-4 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black w-full appearance-none">
            <option value="">Select a service</option>
            <option value="buy">Buy Property</option>
            <option value="sell">Sell Property</option>
            <option value="manage">Property Management</option>
            <option value="concierge">Concierge Services</option>
            <option value="general">General Inquiry</option>
          </select>

          <textarea rows={6} placeholder="Your Message" className="px-6 py-4 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors resize-none text-black placeholder:text-gray-400 w-full"></textarea>

          <button type="button" className="mt-2 px-8 py-5 bg-[#013220] text-white font-bold tracking-wider uppercase rounded hover:bg-[#013220] hover:opacity-90 transition-all duration-300 w-full text-lg shadow-lg">
            Submit
          </button>
        </form>

        <div className="text-center mt-32">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013220] mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-gray-600 mb-10 text-lg">Partner with us for expert real estate services that drive results.</p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-[#013220] text-white font-bold tracking-wider rounded hover:bg-[#013220] hover:opacity-90 transition-all duration-300 shadow-lg">
            Contact Our Team
          </Link>
        </div>
      </div>

    </div>
  );
}