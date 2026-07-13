"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted or rejected cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    
    // If no consent is found, show the banner after a short delay
    if (!cookieConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  // Do not render anything if the banner is not visible
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] z-[99999] px-4 py-6 md:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            We value your privacy
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/privacy-policy" className="text-[#013220] font-bold md:hover:underline">Privacy Policy</Link> for more information.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button 
            onClick={handleReject}
            className="flex-1 lg:flex-none px-6 py-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-md md:hover:bg-gray-200 active:scale-95 transition-all"
          >
            Reject All
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 lg:flex-none px-6 py-3 text-sm font-bold text-white bg-[#013220] rounded-md md:hover:bg-[#011a11] shadow-lg md:hover:shadow-xl active:scale-95 transition-all"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}