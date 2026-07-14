"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function PrivacyPolicyClient() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );

    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#fafafa] flex flex-col pt-[120px] pb-20 overflow-x-hidden">
      
      <div ref={headerRef} className="w-full max-w-4xl mx-auto px-4 md:px-8 mb-12 text-center flex flex-col items-center">
        <div className="bg-[#013220] text-white text-xs font-black px-4 py-2 uppercase tracking-widest rounded shadow-md mb-6 w-max">
          Legal Information
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          Last updated: July 2026
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
        
        <div ref={contentRef} className="w-full flex flex-col gap-8">
          
          <div className="text-sm text-gray-500 font-medium flex items-center justify-center gap-2 mb-2">
            <Link href="/" className="hover:text-[#013220] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Privacy Policy</span>
          </div>

          <div className="bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-8 md:p-14 rounded-3xl flex flex-col gap-10">
            
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight border-b border-gray-100 pb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-light">
                Welcome to Qemaat. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight border-b border-gray-100 pb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-light">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows. Identity Data includes first name, last name, and username. Contact Data includes email address and telephone numbers. Technical Data includes internet protocol address, browser type and version, time zone setting, and operating system.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight border-b border-gray-100 pb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-light">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to process your real estate inquiries, manage our relationship with you, and improve our website, products, services, marketing, and customer experiences. We do not sell your data to outside parties.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight border-b border-gray-100 pb-4">
                4. Data Security
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-light">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight border-b border-gray-100 pb-4">
                5. Contact Us
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-light">
                If you have any questions about this privacy policy or our privacy practices, please contact us by visiting the contact page on our website or by reaching out to our customer support team directly. We are always ready to assist you with any concerns you may have.
              </p>
            </div>

          </div>
        </div>

      </div>

    </main>
  );
}