"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function BrowseProperties() {
  const router = useRouter();
  const [homeTab, setHomeTab] = useState("Area Size");
  const [plotTab, setPlotTab] = useState("Area Size");
  const [commercialTab, setCommercialTab] = useState("Area Size");

  const [homePage, setHomePage] = useState(0);
  const [plotPage, setPlotPage] = useState(0);
  const [homeTypePage, setHomeTypePage] = useState(0);
  const [homeAreaPage, setHomeAreaPage] = useState(0);
  const [plotAreaPage, setPlotAreaPage] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Advanced Staggered 3D Reveal Animation triggered on scroll
    gsap.fromTo(
      [card1Ref.current, card2Ref.current, card3Ref.current],
      { y: 80, opacity: 0, rotateX: 15, transformPerspective: 1000 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        duration: 1.4, 
        stagger: 0.2, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, target: HTMLDivElement | null) => {
    if (!target) return;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = -(e.clientY - top - height / 2) / 25;
    
    gsap.to(target, {
      rotateY: x,
      rotateX: y,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      boxShadow: "0 25px 50px rgba(1,50,32,0.15)",
      borderColor: "rgba(1,50,32,0.2)"
    });
  };

  const handleMouseLeave = (target: HTMLDivElement | null) => {
    if (!target) return;
    gsap.to(target, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      borderColor: "#e5e7eb"
    });
  };

  const boxBaseClass = "border border-gray-200 rounded p-2 flex flex-col items-center justify-center text-center cursor-pointer bg-white transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(1,50,32,0.12)] hover:border-[#013220] h-16";
  const boxSingleClass = "border border-gray-200 rounded p-2 flex items-center justify-center text-center cursor-pointer bg-white transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(1,50,32,0.12)] hover:border-[#013220] h-16";

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 py-16 perspective-1000">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Homes */}
        <div 
          ref={card1Ref}
          onMouseMove={(e) => handleMouseMove(e, card1Ref.current)}
          onMouseLeave={() => handleMouseLeave(card1Ref.current)}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-hidden relative transform-gpu transition-colors duration-500"
        >
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-[#013220]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800">Homes</h3>
          </div>
          
          <div className="flex gap-6 border-b border-gray-100 mb-4 relative z-20">
            <button onClick={() => setHomeTab("Popular")} className={"text-[13px] pb-2 transition-colors " + (homeTab === "Popular" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Popular</button>
            <button onClick={() => setHomeTab("Type")} className={"text-[13px] pb-2 transition-colors " + (homeTab === "Type" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Type</button>
            <button onClick={() => setHomeTab("Area Size")} className={"text-[13px] pb-2 transition-colors " + (homeTab === "Area Size" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Area Size</button>
          </div>
          
          {homeTab === "Popular" && (
            <div className="relative">
              <button onClick={() => setHomePage(prev => prev === 0 ? 1 : 0)} className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="overflow-hidden px-1 py-1 -mx-1 -my-1">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: "translateX(-" + homePage * 100 + "%)" }}>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">5 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Houses</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">10 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Houses</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">3 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Houses</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">New</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Houses</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Low Price</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">All Homes</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Small</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Houses</span></div>
                  </div>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">On Instalments</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Houses</span></div>
                    <div onClick={() => router.push("/rent")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">1 Bedroom</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Flats</span></div>
                    <div onClick={() => router.push("/rent")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">2 Bedroom</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Flats</span></div>
                    <div onClick={() => router.push("/rent")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">3 Bedroom</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Flats</span></div>
                    <div onClick={() => router.push("/rent")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">On Instalments</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Flats</span></div>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setHomePage(prev => prev === 0 ? 1 : 0)} className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {homeTab === "Type" && (
            <div className="relative">
              <button onClick={() => setHomeTypePage(prev => prev === 0 ? 1 : 0)} className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="overflow-hidden px-1 py-1 -mx-1 -my-1">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: "translateX(-" + homeTypePage * 100 + "%)" }}>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy/homes")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Houses</span></div>
                    <div onClick={() => router.push("/rent")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Flats</span></div>
                    <div onClick={() => router.push("/rent")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Upper Portion</span></div>
                    <div onClick={() => router.push("/rent")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Lower Portion</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Farmhouse</span></div>
                    <div onClick={() => router.push("/rent")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Penthouse</span></div>
                  </div>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/rent")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Room</span></div>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setHomeTypePage(prev => prev === 0 ? 1 : 0)} className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {homeTab === "Area Size" && (
            <div className="relative">
              <button onClick={() => setHomeAreaPage(prev => prev === 0 ? 1 : 0)} className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="overflow-hidden px-1 py-1 -mx-1 -my-1">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: "translateX(-" + homeAreaPage * 100 + "%)" }}>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">5 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Homes</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">3 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Homes</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">7 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Homes</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">8 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Homes</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">10 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Homes</span></div>
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">1 Kanal</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Homes</span></div>
                  </div>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy/homes")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">2 Kanal</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Homes</span></div>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setHomeAreaPage(prev => prev === 0 ? 1 : 0)} className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          <div className="flex justify-center gap-2 mt-5">
            <div className={"w-1.5 h-1.5 rounded-full transition-colors duration-300 " + (((homeTab === "Popular" && homePage === 0) || (homeTab === "Type" && homeTypePage === 0) || (homeTab === "Area Size" && homeAreaPage === 0)) ? "bg-[#013220]" : "bg-gray-300")}></div>
            <div className={"w-1.5 h-1.5 rounded-full transition-colors duration-300 " + (((homeTab === "Popular" && homePage === 1) || (homeTab === "Type" && homeTypePage === 1) || (homeTab === "Area Size" && homeAreaPage === 1)) ? "bg-[#013220]" : "bg-gray-300")}></div>
          </div>
        </div>

        {/* Card 2: Plots */}
        <div 
          ref={card2Ref}
          onMouseMove={(e) => handleMouseMove(e, card2Ref.current)}
          onMouseLeave={() => handleMouseLeave(card2Ref.current)}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-hidden relative transform-gpu transition-colors duration-500"
        >
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-[#013220]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800">Plots</h3>
          </div>
          
          <div className="flex gap-6 border-b border-gray-100 mb-4 relative z-20">
            <button onClick={() => setPlotTab("Popular")} className={"text-[13px] pb-2 transition-colors " + (plotTab === "Popular" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Popular</button>
            <button onClick={() => setPlotTab("Type")} className={"text-[13px] pb-2 transition-colors " + (plotTab === "Type" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Type</button>
            <button onClick={() => setPlotTab("Area Size")} className={"text-[13px] pb-2 transition-colors " + (plotTab === "Area Size" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Area Size</button>
          </div>
          
          {plotTab === "Popular" && (
            <div className="relative">
              <button onClick={() => setPlotPage(prev => prev === 0 ? 1 : 0)} className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="overflow-hidden px-1 py-1 -mx-1 -my-1">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: "translateX(-" + plotPage * 100 + "%)" }}>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">5 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Residential Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">10 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Residential Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">3 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Residential Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">On Instalments</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Residential Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">On Instalments</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Commercial Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">With Possession</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Commercial Plots</span></div>
                  </div>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Developed</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Residential Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Corner</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Residential Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Low Price</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Residential Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Park Facing</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Residential Plots</span></div>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setPlotPage(prev => prev === 0 ? 1 : 0)} className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {plotTab === "Type" && (
            <div className="relative">
              <div className="grid grid-cols-3 gap-2">
                <div onClick={() => router.push("/buy")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Residential Plot</span></div>
                <div onClick={() => router.push("/buy")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Commercial Plot</span></div>
                <div onClick={() => router.push("/buy")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Plot File</span></div>
                <div onClick={() => router.push("/buy")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Plot Form</span></div>
                <div onClick={() => router.push("/buy")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Agricultural Land</span></div>
                <div onClick={() => router.push("/buy")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Industrial Land</span></div>
              </div>
            </div>
          )}

          {plotTab === "Area Size" && (
            <div className="relative">
              <button onClick={() => setPlotAreaPage(prev => prev === 0 ? 1 : 0)} className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="overflow-hidden px-1 py-1 -mx-1 -my-1">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: "translateX(-" + plotAreaPage * 100 + "%)" }}>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">3 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">5 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">7 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">8 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">10 Marla</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Plots</span></div>
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">1 Kanal</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Plots</span></div>
                  </div>
                  <div className="w-full shrink-0 grid grid-cols-3 gap-2">
                    <div onClick={() => router.push("/buy")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">2 Kanal</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Plots</span></div>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setPlotAreaPage(prev => prev === 0 ? 1 : 0)} className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow border border-gray-100 rounded-full p-1 z-10 text-[#013220] hover:bg-[#013220] hover:text-white transition-all transform hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {(plotTab === "Popular" || plotTab === "Area Size") && (
            <div className="flex justify-center gap-2 mt-5">
              <div className={"w-1.5 h-1.5 rounded-full transition-colors duration-300 " + (((plotTab === "Popular" && plotPage === 0) || (plotTab === "Area Size" && plotAreaPage === 0)) ? "bg-[#013220]" : "bg-gray-300")}></div>
              <div className={"w-1.5 h-1.5 rounded-full transition-colors duration-300 " + (((plotTab === "Popular" && plotPage === 1) || (plotTab === "Area Size" && plotAreaPage === 1)) ? "bg-[#013220]" : "bg-gray-300")}></div>
            </div>
          )}
        </div>

        {/* Card 3: Commercial */}
        <div 
          ref={card3Ref}
          onMouseMove={(e) => handleMouseMove(e, card3Ref.current)}
          onMouseLeave={() => handleMouseLeave(card3Ref.current)}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-hidden relative transform-gpu transition-colors duration-500"
        >
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-[#013220]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800">Commercial</h3>
          </div>
          
          <div className="flex gap-6 border-b border-gray-100 mb-4 relative z-20">
            <button onClick={() => setCommercialTab("Popular")} className={"text-[13px] pb-2 transition-colors " + (commercialTab === "Popular" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Popular</button>
            <button onClick={() => setCommercialTab("Type")} className={"text-[13px] pb-2 transition-colors " + (commercialTab === "Type" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Type</button>
            <button onClick={() => setCommercialTab("Area Size")} className={"text-[13px] pb-2 transition-colors " + (commercialTab === "Area Size" ? "font-bold text-[#013220] border-b-2 border-[#013220]" : "font-medium text-gray-500 hover:text-gray-800")}>Area Size</button>
          </div>
          
          {commercialTab === "Popular" && (
            <div className="relative">
              <div className="grid grid-cols-3 gap-2">
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Small</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Offices</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">New</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Offices</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">On Instalments</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Shops</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Small</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Shops</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">New</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Shops</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Running</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Shops</span></div>
              </div>
            </div>
          )}

          {commercialTab === "Type" && (
            <div className="relative">
              <div className="grid grid-cols-3 gap-2">
                <div onClick={() => router.push("/buy/commercial")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Office</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Shop</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Building</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Warehouse</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Factory</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxSingleClass}><span className="text-[11px] font-bold text-gray-800">Others</span></div>
              </div>
            </div>
          )}

          {commercialTab === "Area Size" && (
            <div className="relative">
              <div className="grid grid-cols-3 gap-2">
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">Less than 100 sq ft</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Commercial</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">100-200 sq ft</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Commercial</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">200-300 sq ft</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Commercial</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">300-400 sq ft</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Commercial</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">400-500 sq ft</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Commercial</span></div>
                <div onClick={() => router.push("/buy/commercial")} className={boxBaseClass}><span className="text-[11px] font-bold text-gray-800 leading-tight">More than 500 s...</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5">Commercial</span></div>
              </div>
            </div>
          )}

        </div>
        
      </div>
    </section>
  );
}