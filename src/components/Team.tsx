"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Sadia Awan",
    role: "HR & Marketing Manager",
    languages: "English, Urdu, Punjabi",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
  },
  {
    id: 2,
    name: "Saman Imran",
    role: "Admin Executive",
    languages: "English, Urdu",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80"
  },
  {
    id: 3,
    name: "Wasi Ahmed",
    role: "Head of Operations",
    languages: "English, Urdu, Punjabi",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80"
  },
  {
    id: 4,
    name: "Naazia Khan",
    role: "Property & Investment Advisor",
    languages: "English, Urdu, Pashto",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=800&q=80"
  }
];

export default function Team() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const directorCardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Quantum Polygon Reveal & 3D Text Warp
    if (heroRef.current) {
      const heroImage = heroRef.current.querySelector("img");
      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", filter: "contrast(2) brightness(1.5)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", filter: "contrast(1) brightness(1)", duration: 2, ease: "power4.inOut" }
        );
      }
    }

    if (heroTextRef.current && heroTextRef.current.children) {
      gsap.fromTo(
        Array.from(heroTextRef.current.children),
        { opacity: 0, rotateX: -90, z: -300, filter: "blur(20px)", transformPerspective: 1000 },
        { opacity: 1, rotateX: 0, z: 0, filter: "blur(0px)", duration: 1.8, stagger: 0.2, ease: "expo.out", delay: 0.3 }
      );
    }

    // 2. Magnetic Core Expansion
    if (introRef.current) {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, scaleX: 0.2, scaleY: 0.2, filter: "blur(15px)" },
        {
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 3. Vault Door Parallax Fold
    if (directorCardRef.current) {
      gsap.fromTo(
        directorCardRef.current,
        { opacity: 0, rotateX: 45, y: 150, transformPerspective: 1200 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: {
            trigger: directorCardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      const dirImg = directorCardRef.current.querySelector("img");
      if (dirImg) {
        gsap.fromTo(
          dirImg,
          { scale: 1.5 },
          {
            scale: 1,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: directorCardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }

    // 4. 3D Domino Matrix Grid
    if (gridRef.current && gridRef.current.children) {
      gsap.fromTo(
        Array.from(gridRef.current.children),
        { opacity: 0, rotateY: 90, z: -300, transformPerspective: 1000 },
        {
          opacity: 1,
          rotateY: 0,
          z: 0,
          duration: 1.4,
          stagger: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden pb-32">
      
      {/* 1. Hero Section */}
      <div ref={heroRef} className="relative w-full overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-40 min-h-[60vh] flex items-center">
        
        {/* Full Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
            alt="Qemaat.com Team" 
            className="object-cover w-full h-full"
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 relative z-20 w-full">
          
          <div ref={heroTextRef} className="flex flex-col items-start justify-center max-w-2xl">
            <span className="text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 block">
              OUR TEAM
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">
              Meet The People Behind Qemaat.com
            </h1>
            <Link href="#contact" className="px-8 py-4 bg-white text-[#013220] font-bold text-sm tracking-wider uppercase rounded hover:bg-[#013220] hover:text-white transition-colors duration-300">
              Get started today
            </Link>
          </div>

        </div>
      </div>

      {/* 2. Intro Text */}
      <div className="w-full bg-white py-24 px-4 border-b border-gray-100">
        <div ref={introRef} className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
            Our Team Is A Dynamic And Dedicated Group Of Individuals United By A Shared Passion For Excellence. Comprising Diverse Talents And Backgrounds, We Collaborate Seamlessly To Achieve Common Goals.
          </p>
        </div>
      </div>

      {/* 3. Director Feature Card */}
      <div className="max-w-[1000px] mx-auto px-4 mt-24 mb-16">
        <div ref={directorCardRef} className="flex flex-col md:flex-row bg-[#013220] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(1,50,32,0.15)]">
          
          {/* Director Image */}
          <div className="w-full md:w-[45%] h-[400px] md:h-auto bg-gray-200 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
              alt="Yasir Irshad" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Director Details */}
          <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center relative">
            {/* Subtle background pattern element */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:10px_10px]"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Yasir Irshad</h2>
              <p className="text-[#10b981] text-lg font-medium mb-8">Director, Qemaat.com</p>
              
              <div className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-sm md:text-base">English, Urdu, Punjabi</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Team Members Grid */}
      <div className="max-w-[1000px] mx-auto px-4">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col rounded-2xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-transform duration-500">
              
              {/* Member Image Top */}
              <div className="w-full h-[350px] bg-gray-100 relative overflow-hidden flex items-end justify-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Member Details Bottom */}
              <div className="w-full bg-[#013220] p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:10px_10px]"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-gray-300 text-sm mb-6">{member.role}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-xs">{member.languages}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}