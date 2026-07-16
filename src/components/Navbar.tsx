"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(``);
  const [userId, setUserId] = useState<number | null>(null);
  const [hasAlerts, setHasAlerts] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: `power4.out`, delay: 0.1 }
    );

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener(`scroll`, handleScroll);
    return () => window.removeEventListener(`scroll`, handleScroll);
  }, []);

  // User Authentication Check
  useEffect(() => {
    const storedUser = localStorage.getItem(`user`);
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name || parsed.email || `Alishba Zia`);
      setUserId(parsed.id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  // Fetch properties to check for Approved status alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/properties`, { cache: `no-store` });
        const result = await res.json();
        if (result.success) {
          const myProps = result.data.filter((prop: any) => prop.userId === userId);
          // Agar koi property APPROVED ho chuki hai toh dot show karein
          const hasApproved = myProps.some((prop: any) => prop.status === `APPROVED`);
          setHasAlerts(hasApproved);
        }
      } catch (error) {
        console.error(`Failed to fetch alerts for navbar:`, error);
      }
    };
    fetchAlerts();
  }, [userId, pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    
    document.addEventListener(`mousedown`, handleClickOutside);
    return () => document.removeEventListener(`mousedown`, handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(`user`);
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
  };

  const navClass = `fixed left-0 w-full z-[100] transition-all duration-500 ` + (isScrolled ? `top-0 bg-white/95 backdrop-blur-md shadow-md py-2` : `top-0 bg-white py-3`);

  return (
    <nav ref={navRef} className={navClass}>
      <div className={`max-w-[1400px] mx-auto px-4 flex justify-between items-center`}>
        
        <Link href={`/`} className={`flex items-center gap-1 cursor-pointer`}>
          <img src={`/logo3.png`} alt={`Qemaat Logo`} className={`w-9 h-9 object-contain rounded-lg shadow-lg`} />
          <span className={`text-2xl font-black text-gray-900 tracking-tight`}>
            Qemaat
          </span>
        </Link>

        <button 
          className={`lg:hidden p-2 text-gray-700 active:text-[#013220] transition-colors`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className={`w-6 h-6`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}>
            {isMobileMenuOpen ? (
              <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M6 18L18 6M6 6l12 12`} />
            ) : (
              <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M4 6h16M4 12h16M4 18h16`} />
            )}
          </svg>
        </button>

        <div className={`${isMobileMenuOpen ? `flex` : `hidden`} lg:flex flex-col lg:flex-row absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none items-center gap-4 lg:gap-7 py-4 lg:py-0 border-t lg:border-none border-gray-100`}>
          
          <Link href={`/`} className={`text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer`}>HOME</Link>
          
          <Link href={`/services`} className={`text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer`}>SERVICES</Link>

          <div className={`relative group`}>
            <Link 
              href={`/buy`} 
              className={`text-[14px] font-bold text-gray-700 lg:group-hover:text-[#013220] active:text-[#013220] transition-colors flex items-center justify-center gap-1 py-2 lg:py-3 uppercase cursor-pointer`}
            >
              BUY
              <span 
                onClick={(e) => {
                  if (typeof window !== `undefined` && window.innerWidth < 1024) {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsBuyDropdownOpen(!isBuyDropdownOpen);
                  }
                }}
                className={`p-2 -m-2 cursor-pointer`}
              >
                <svg className={`w-3.5 h-3.5 transition-transform ` + (isBuyDropdownOpen ? `rotate-180` : ``) + ` lg:group-hover:rotate-180`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M19 9l-7 7-7-7`}></path></svg>
              </span>
            </Link>
            
            <div className={`${isBuyDropdownOpen ? `flex` : `hidden`} lg:flex lg:absolute lg:top-full lg:right-0 w-full lg:w-40 bg-white lg:border border-gray-100 lg:shadow-xl rounded-md transition-all duration-300 flex-col py-2 z-50 lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible`}>
              <Link href={`/buy/homes`} className={`px-4 py-2 text-[14px] font-bold text-gray-700 md:hover:bg-[#013220] md:hover:text-white active:bg-[#013220] active:text-white transition-colors cursor-pointer text-center lg:text-left`}>Homes</Link>
              <Link href={`/`} className={`px-4 py-2 text-[14px] font-bold text-gray-700 md:hover:bg-[#013220] md:hover:text-white active:bg-[#013220] active:text-white transition-colors cursor-pointer text-center lg:text-left`}>Plots</Link>
              <Link href={`/buy/commercial`} className={`px-4 py-2 text-[14px] font-bold text-gray-700 md:hover:bg-[#013220] md:hover:text-white active:bg-[#013220] active:text-white transition-colors cursor-pointer text-center lg:text-left`}>Commercial</Link>
            </div>
          </div>

          <Link href={`/rent`} className={`text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer`}>RENT</Link>
          <Link href={`/co-working`} className={`text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer`}>CO Working Space</Link>
          
          <Link href={`/area-guides`} className={`text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer`}>AREA GUIDES</Link>

          <Link href={`/contact`} className={`text-[14px] font-bold text-gray-700 md:hover:text-[#013220] active:text-[#013220] transition-colors py-2 lg:py-3 uppercase cursor-pointer`}>CONTACT</Link>

          <Link href={`/add-property`} className={`flex items-center justify-center gap-2 text-[15px] font-bold text-white bg-[#013220] md:hover:bg-[#011a11] active:scale-95 transition-all px-4 py-2 rounded-md cursor-pointer`}>
            <svg className={`w-5 h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`3`} d={`M12 4v16m8-8H4`}></path></svg>
            Add Property
          </Link>

          {isLoggedIn ? (
            <div className={`relative lg:-ml-4`} ref={profileDropdownRef}>
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-[#013220] text-white md:hover:bg-[#011a11] active:scale-95 transition-all cursor-pointer`}
              >
                <svg className={`w-6 h-6`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z`}></path></svg>
                
                {/* Red Dot on Profile Icon */}
                {hasAlerts && (
                  <span className={`absolute top-0 right-0 flex h-3 w-3`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white`}></span>
                  </span>
                )}
              </button>

              {isProfileDropdownOpen && (
                <div className={`absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-5 z-50 flex flex-col gap-3`}>
                  <div className={`text-center pb-3`}>
                    <span className={`text-[#013220] font-bold text-lg`}>{userName}</span>
                  </div>
                  <Link 
                    href={`/account`} 
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className={`w-full text-left px-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm text-[#013220] font-medium hover:bg-gray-100 transition-colors block`}
                  >
                    My Account
                  </Link>
                  
                  {/* Manage Alerts Button in Dropdown */}
                  <Link 
                    href={`/alerts`} 
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm text-[#013220] font-medium hover:bg-gray-100 transition-colors`}
                  >
                    <span>Manage Alerts</span>
                    {hasAlerts && (
                      <span className={`flex h-2.5 w-2.5 relative`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500`}></span>
                      </span>
                    )}
                  </Link>

                  <button 
                    onClick={handleLogout} 
                    className={`w-full text-left px-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm text-[#013220] font-medium hover:bg-gray-100 transition-colors block`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={`/login`} className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#013220] text-white md:hover:bg-[#011a11] active:scale-95 transition-all cursor-pointer lg:-ml-4`}>
              <svg className={`w-6 h-6`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z`}></path></svg>
            </Link>
          )}
          
        </div>

      </div>
    </nav>
  );
}