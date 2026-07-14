"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Hero Reveal Animation
    if (heroTextRef.current && heroTextRef.current.children) {
      gsap.fromTo(
        Array.from(heroTextRef.current.children),
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.2, ease: "power3.out" }
      );
    }

    // Info Cards Magnetic Snap
    if (infoCardsRef.current && infoCardsRef.current.children) {
      gsap.fromTo(
        Array.from(infoCardsRef.current.children),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: infoCardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Digital Blueprint Form Reveal
    if (formRef.current && formRef.current.children) {
      gsap.fromTo(
        Array.from(formRef.current.children),
        { opacity: 0, scaleX: 0.8, transformOrigin: "left center" },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Map Reveal Animation
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResultMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Append Web3Forms access key
    formData.append("access_key", "aa704be0-d1e0-4db0-b375-de47c9d583db");
    formData.append("from_name", "Qemaat Website Contact");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setResultMessage("Message sent successfully! We will get back to you soon.");
        form.reset();
      } else {
        setIsSuccess(false);
        setResultMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setResultMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setResultMessage("");
      }, 5000);
    }
  };

  return (
    <div className="w-full bg-gray-50 overflow-hidden pb-32">
      
      {/* 1. Hero Section */}
      <div ref={heroRef} className="relative w-full bg-[#013220] overflow-hidden pt-40 pb-32 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        <div ref={heroTextRef} className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#10b981] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 block">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Contact Qemaat
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            We are ready to assist you with all your real estate needs. Reach out to our dedicated team of experts today.
          </p>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Side - Contact Information */}
          <div className="w-full lg:w-[40%] bg-[#013220] p-10 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981] opacity-20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10b981] opacity-20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-3xl font-bold mb-10 relative z-10">Contact Information</h2>
            
            <div ref={infoCardsRef} className="flex flex-col gap-8 relative z-10">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Office Address</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    50-52, E - III, Commercial Zone,<br />
                    Gulberg III, 54660, Lahore, Punjab.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Phone Number</h4>
                  <p className="text-gray-300 text-sm">+92 333 4888324</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Address</h4>
                  <p className="text-gray-300 text-sm">Qemaatdotcom@gmail.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:w-[60%] p-10 md:p-16 bg-white">
            <h2 className="text-3xl font-bold text-[#013220] mb-8">Send Us A Message</h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-bold text-black mb-2">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-sm font-bold text-black mb-2">Phone Number</label>
                  <input type="text" id="phone" name="phone" placeholder="+92 000 0000000" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400" />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-bold text-black mb-2">Email Address</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="text-sm font-bold text-black mb-2">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="How can we help you?" required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm font-bold text-black mb-2">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Write your message here..." required className="px-4 py-3 bg-gray-50 border border-gray-200 rounded outline-none focus:border-[#013220] transition-colors resize-none text-black placeholder:text-gray-400"></textarea>
              </div>

              {/* Status Message */}
              {resultMessage && (
                <div className={`p-4 rounded-md text-sm font-medium ${isSuccess ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {resultMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 px-8 py-4 bg-[#013220] text-white font-bold tracking-wider uppercase rounded hover:bg-[#013220] hover:opacity-90 transition-all duration-300 w-full md:w-auto self-start disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* 3. Location Map Section */}
      <div ref={mapRef} className="max-w-[1400px] mx-auto px-4 mt-12 relative z-20">
        <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 bg-gray-200">
          <iframe
            src="https://maps.google.com/maps?q=Hotel%20MayFair%20Lahore&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      
    </div>
  );
}