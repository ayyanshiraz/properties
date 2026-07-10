`use client`;

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function DashboardClient() {
  const [userName, setUserName] = useState(`Alishba Zia`);
  const [graphFilter, setGraphFilter] = useState(`Month`);
  // Naya state database ki properties save karne ke liye
  const [properties, setProperties] = useState<any[]>([]);
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const emptyStateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(`user`);
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name || parsed.email || `Alishba Zia`);
    } else {
      router.push(`/login`);
    }
  }, [router]);

  // Database se properties lane ke liye naya useEffect
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`/api/properties`);
        const result = await response.json();
        if (result.success) {
          setProperties(result.data);
        }
      } catch (error) {
        console.error(`Failed to fetch properties:`, error);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(headerRef.current, 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: `power3.out` }
      );

      tl.fromTo(titleRef.current, 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: `elastic.out(1, 0.7)` }, 
        `-=.3`
      );

      tl.fromTo(cardsRef.current, 
        { y: 60, rotationX: -25, rotationY: 10, opacity: 0, transformPerspective: 1000, transformOrigin: `bottom center` },
        { y: 0, rotationX: 0, rotationY: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: `back.out(1.4)` }, 
        `-=.6`
      );

      tl.fromTo(graphContainerRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: `power3.out` }, 
        `-=.4`
      );

      tl.fromTo(barsRef.current, 
        { scaleY: 0, transformOrigin: `bottom` },
        { scaleY: 1, duration: 0.8, stagger: 0.1, ease: `elastic.out(1, 0.8)` }, 
        `-=.4`
      );

      tl.fromTo(emptyStateRef.current, 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: `back.out(1.5)` }, 
        `-=.5`
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  const setBarRef = (el: HTMLDivElement | null, index: number) => {
    barsRef.current[index] = el;
  };

  return (
    <main ref={containerRef} className={`flex-1 flex flex-col h-screen overflow-hidden bg-[#f8fafc] perspective-1000`}>
      
      <header ref={headerRef} className={`h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-50`}>
        <div className={`flex items-center gap-4`}>
          <h1 className={`text-xl font-bold text-gray-800`}>Dashboard</h1>
          <Link href={`/`} className={`hidden md:flex text-sm font-semibold text-gray-500 hover:text-[#013220] items-center gap-1 transition-colors group`}>
            <svg className={`w-4 h-4 group-hover:-translate-x-1 transition-transform`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14`}></path></svg>
            Go to Qeemat.com
          </Link>
        </div>

        <div className={`flex items-center gap-4`}>
          <Link href={`/add-property`} className={`hidden md:flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-[#013220] to-[#025a3a] hover:from-[#011a11] hover:to-[#013220] active:scale-95 transition-all px-5 py-2.5 rounded-lg shadow-lg hover:shadow-[#013220]/30`}>
            <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`3`} d={`M12 4v16m8-8H4`}></path></svg>
            List Property
          </Link>
          <div className={`w-px h-6 bg-gray-200 hidden md:block`}></div>
          <div className={`flex items-center gap-3 group cursor-pointer`}>
            <span className={`text-sm font-bold text-gray-700 hidden sm:block group-hover:text-[#013220] transition-colors`}>{userName}</span>
            <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 group-hover:border-[#013220] group-hover:bg-[#e8f0ec] transition-all duration-300`}>
               <svg className={`w-5 h-5 text-gray-500 group-hover:text-[#013220] transition-colors`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z`}></path></svg>
            </div>
          </div>
        </div>
      </header>

      <div className={`flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
        
        <div className={`mb-10`} ref={titleRef}>
          <h2 className={`font-black text-gray-900 text-3xl mb-2 tracking-tight`}>What would you like to list today?</h2>
          <p className={`text-gray-500 font-medium mb-8 text-lg`}>Choose a category below to start adding your property details.</p>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8`}>
            
            <div ref={(el) => setCardRef(el, 0)} className={`relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500`}></div>
              <div className={`w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner`}>
                <svg className={`w-7 h-7`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6`}></path></svg>
              </div>
              <h3 className={`text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors`}>For Sale (Buy)</h3>
              <p className={`text-sm text-gray-500 mb-6 leading-relaxed`}>List a Home, Plot, or Commercial property for potential buyers across the network.</p>
              <Link href={`/add-property?type=sale`} className={`text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all`}>
                Start Listing <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2.5`} d={`M9 5l7 7-7 7`}></path></svg>
              </Link>
            </div>

            <div ref={(el) => setCardRef(el, 1)} className={`relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors duration-500`}></div>
              <div className={`w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner`}>
                <svg className={`w-7 h-7`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z`}></path></svg>
              </div>
              <h3 className={`text-xl font-black text-gray-900 mb-3 group-hover:text-orange-500 transition-colors`}>For Rent</h3>
              <p className={`text-sm text-gray-500 mb-6 leading-relaxed`}>List residential or commercial properties to find verified tenants quickly.</p>
              <Link href={`/add-property?type=rent`} className={`text-orange-500 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all`}>
                Start Listing <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2.5`} d={`M9 5l7 7-7 7`}></path></svg>
              </Link>
            </div>

            <div ref={(el) => setCardRef(el, 2)} className={`relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500`}></div>
              <div className={`w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner`}>
                <svg className={`w-7 h-7`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z`}></path></svg>
              </div>
              <h3 className={`text-xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors`}>Co-Working Space</h3>
              <p className={`text-sm text-gray-500 mb-6 leading-relaxed`}>List shared offices, premium meeting rooms, or dedicated quiet desks.</p>
              <Link href={`/add-property?type=coworking`} className={`text-purple-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all`}>
                Start Listing <svg className={`w-4 h-4`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2.5`} d={`M9 5l7 7-7 7`}></path></svg>
              </Link>
            </div>
          </div>
        </div>

        <div ref={graphContainerRef} className={`bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mb-10 relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#e8f0ec] to-transparent rounded-full blur-3xl opacity-50`}></div>
          
          <div className={`relative flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 z-10`}>
            <div>
              <h2 className={`font-black text-gray-900 text-2xl mb-1`}>Properties Listed on Qeemat</h2>
              <p className={`text-sm text-gray-500 font-medium`}>Total listings added by users across the platform.</p>
            </div>
            
            <div className={`flex bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-inner`}>
              {[`Week`, `Month`, `Year`].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setGraphFilter(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 ` + (graphFilter === tab ? `bg-[#013220] text-white shadow-md scale-105` : `text-gray-500 hover:text-gray-900 hover:bg-gray-200/50`)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className={`h-72 w-full flex items-end justify-between gap-3 px-2 pb-8 border-b-2 border-gray-100 relative z-10`}>
            <div className={`absolute top-0 left-0 w-full h-full flex flex-col justify-between pb-8 pointer-events-none opacity-40`}>
               <div className={`border-t border-dashed border-gray-300 w-full`}></div>
               <div className={`border-t border-dashed border-gray-300 w-full`}></div>
               <div className={`border-t border-dashed border-gray-300 w-full`}></div>
               <div className={`border-t border-dashed border-gray-300 w-full`}></div>
            </div>

            {[40, 65, 45, 80, 55, 95, 70].map((height, index) => (
              <div 
                key={index}
                ref={(el) => setBarRef(el, index)} 
                className={`w-full transition-all duration-300 rounded-t-lg relative group cursor-crosshair ` + (index === 5 ? `bg-gradient-to-t from-[#013220] to-[#025a3a] shadow-lg shadow-[#013220]/20` : `bg-[#e8f0ec] hover:bg-[#cde0d5]`)}
                style={{ height: height + `%` }}
              >
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap transform group-hover:-translate-y-1 shadow-xl pointer-events-none`}>
                  {index === 5 ? `Peak Data` : height * 12 + ` Listings`}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45`}></div>
                </div>
              </div>
            ))}
          </div>
          <div className={`flex justify-between mt-4 text-sm font-bold text-gray-400 px-4`}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span className={`text-[#013220] bg-[#e8f0ec] px-3 py-1 rounded-md -mt-1`}>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div ref={emptyStateRef} className={`bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative overflow-hidden group`}>
          <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 z-0`}></div>
          
          <div className={`relative z-10 flex justify-between items-center mb-8`}>
            <h2 className={`font-black text-gray-900 text-2xl`}>Your Listed Properties</h2>
          </div>
          
          {/* Conditional Rendering: Agar properties hain toh list show karo, warna wahi purana empty state */}
          {properties.length > 0 ? (
            <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
              {properties.map((prop: any) => (
                <div key={prop.id} className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group/card`}>
                  <div className={`flex justify-between items-start mb-4`}>
                    <span className={`px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg`}>{prop.type}</span>
                    <span className={`text-lg font-black text-gray-900`}>PKR {prop.price}</span>
                  </div>
                  <h3 className={`font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover/card:text-[#013220] transition-colors`}>{prop.title}</h3>
                  <p className={`text-sm text-gray-500 mb-4 flex items-center gap-1 line-clamp-1`}>
                    <svg className={`w-4 h-4 flex-shrink-0 text-gray-400`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z`}></path><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M15 11a3 3 0 11-6 0 3 3 0 016 0z`}></path></svg>
                    {prop.location}
                  </p>
                  {prop.category && (
                    <div className={`mt-auto inline-block px-3 py-1.5 bg-[#f8fafc] text-gray-600 border border-gray-100 text-xs font-bold rounded-lg w-max`}>
                      {prop.category}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={`relative z-10 flex flex-col items-center justify-center text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-200 group-hover:border-[#013220]/30 transition-colors duration-500`}>
              <div className={`mb-6 transform group-hover:scale-110 transition-transform duration-700 ease-out`}>
                <div className={`w-24 h-24 bg-[#e8f0ec] rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <svg className={`w-12 h-12 text-[#013220]`} fill={`currentColor`} viewBox={`0 0 24 24`}>
                    <path d={`M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z`}/>
                    <path d={`M7 12h2v5H7zm4-3h2v8h-2zm4-4h2v12h-2z`}/>
                  </svg>
                </div>
              </div>
              <h3 className={`font-black text-gray-900 text-xl mb-2 tracking-tight`}>No Properties Added Yet</h3>
              <p className={`text-base text-gray-500 mb-8 max-w-md font-medium leading-relaxed`}>You have not listed any properties for sale or rent. Click the button below to expand your real estate portfolio.</p>
              
              <Link href={`/add-property`} className={`flex items-center justify-center gap-2 text-sm font-bold text-white bg-gray-900 hover:bg-black transition-all duration-300 px-8 py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1`}>
                <svg className={`w-5 h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`3`} d={`M12 4v16m8-8H4`}></path></svg>
                List a Property Now
              </Link>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}