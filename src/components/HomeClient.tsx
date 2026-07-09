"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import WhyChooseUs from "./WhyChooseUs";
import MarketReport from "../components/MarketReport";
import FeaturedProperties from "../components/FeaturedProperties";
import FeaturedRentals from "../components/FeaturedRentals";
import Reviews from "../components/Reviews";

type MainTab = "Homes" | "Plots" | "Commercial";

export default function HomeClient() {
  const router = useRouter();
  const [purpose, setPurpose] = useState("buy");
  const [city, setCity] = useState("Lahore");
  const [location, setLocation] = useState("");
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [priceMin, setPriceMin] = useState("0");
  const [priceMax, setPriceMax] = useState("Any");
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const [areaMin, setAreaMin] = useState("0");
  const [areaMax, setAreaMax] = useState("Any");
  const [isAreaOpen, setIsAreaOpen] = useState(false);

  const [beds, setBeds] = useState("All");
  const [isBedsOpen, setIsBedsOpen] = useState(false);

  const [isCityOpen, setIsCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  
  const [isPropTypeOpen, setIsPropTypeOpen] = useState(false);
  const [activePropTab, setActivePropTab] = useState<MainTab>("Homes");
  const [selectedSubCategory, setSelectedSubCategory] = useState("House");
  const [displayPropType, setDisplayPropType] = useState("Homes");

  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("Pakistan (PKR)");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [selectedAreaUnit, setSelectedAreaUnit] = useState("Marla");
  const [isAreaDropdownModalOpen, setIsAreaDropdownModalOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const advancedSectionRef = useRef<HTMLDivElement>(null);

  const cityList = [
    "Lahore"
  ];

  const subCategories: Record<MainTab, string[]> = {
    Homes: ["House", "Flat", "Apartment", "Upper Portion", "Lower Portion", "Portion", "Farm House", "Room", "Penthouse"],
    Plots: ["Residential Plot", "Commercial Plot", "Agricultural Land", "Industrial Land", "Plot File", "Plot Form"],
    Commercial: ["Office", "Shop", "Warehouse", "Factory", "Building", "Commercial Building", "Commercial House Kothi", "Other"]
  };

  const currencyPricingData: Record<string, { min: string[], max: string[] }> = {
    "Pakistan (PKR)": {
      min: ["0", "500,000", "1,000,000", "2,000,000", "3,500,000", "5,000,000", "10,000,000", "50,000,000", "100,000,000", "500,000,000", "1,000,000,000"],
      max: ["Any", "500,000", "1,000,000", "2,000,000", "3,500,000", "5,000,000", "10,000,000", "50,000,000", "100,000,000", "500,000,000", "1,000,000,000", "5,000,000,000"]
    },
    "Canadian dollar (CAD)": {
      min: ["0", "10,000", "25,000", "50,000", "75,000", "100,000", "150,000", "177,400"],
      max: ["Any", "10,000", "25,000", "50,000", "75,000", "100,000", "150,000", "177,400", "250,000", "300,000", "355,200"]
    },
    "Saudi Arabia (SAR)": {
      min: ["0", "10,000", "25,000", "50,000", "75,000", "100,000", "150,000", "177,400"],
      max: ["Any", "10,000", "25,000", "50,000", "75,000", "100,000", "150,000", "177,400", "250,000", "300,000", "355,200"]
    },
    "United Arab Emirates (AED)": {
      min: ["0", "10,000", "25,000", "50,000", "75,000", "100,000", "150,000", "173,600"],
      max: ["Any", "10,000", "25,000", "50,000", "75,000", "100,000", "150,000", "173,600", "250,000", "300,000", "347,600"]
    },
    "United Kingdom (GBP)": {
      min: ["0", "5,000", "10,000", "15,000", "20,000", "25,000", "30,000", "34,500"],
      max: ["Any", "5,000", "10,000", "15,000", "20,000", "25,000", "30,000", "34,500", "45,000", "55,000", "70,000"]
    },
    "United States of America (USD)": {
      min: ["0", "5,000", "10,000", "15,000", "20,000", "30,000", "40,000", "47,300"],
      max: ["Any", "5,000", "10,000", "15,000", "20,000", "30,000", "40,000", "47,300", "60,000", "75,000", "94,700"]
    }
  };

  const areaUnitData: Record<string, { min: string[], max: string[] }> = {
    "Marla": {
      min: ["0", "2", "3", "5", "8", "10", "15", "20", "25", "30", "35", "40"],
      max: ["Any", "2", "3", "5", "8", "10", "15", "20", "25", "30", "35", "40", "45", "50"]
    },
    "Square Feet": {
      min: ["0", "500", "1,000", "2,000", "3,000", "4,000", "5,000", "6,000", "7,000", "8,000", "9,000"],
      max: ["Any", "500", "1,000", "2,000", "3,000", "4,000", "5,000", "6,000", "7,000", "8,000", "9,000", "10,000", "11,250"]
    },
    "Square Yards": {
      min: ["0", "100", "200", "500", "1,000", "1,500", "2,000"],
      max: ["Any", "100", "200", "500", "1,000", "1,500", "2,000", "3,000", "4,000"]
    },
    "Square Meters": {
      min: ["0", "1,000", "5,000", "10,000", "15,000", "20,000", "25,000"],
      max: ["Any", "1,000", "5,000", "10,000", "15,000", "20,000", "25,000", "30,000", "40,000", "51,000"]
    },
    "Kanal": {
      min: ["0", "1", "2", "5", "10", "20", "30", "40", "50"],
      max: ["Any", "1", "2", "5", "10", "20", "30", "40", "50", "75", "100"]
    }
  };

  const bedOptions = ["All", "Studio", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

  const currencies = [
    "Pakistan (PKR)",
    "Canadian dollar (CAD)",
    "Saudi Arabia (SAR)",
    "United Arab Emirates (AED)",
    "United Kingdom (GBP)",
    "United States of America (USD)"
  ];

  const areaUnits = [
    "Square Feet",
    "Square Yards",
    "Square Meters",
    "Marla",
    "Kanal"
  ];

  const filteredCities = cityList.filter(c => 
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  const currentMinPrices = currencyPricingData[selectedCurrency]?.min || currencyPricingData["Pakistan (PKR)"].min;
  const currentMaxPrices = currencyPricingData[selectedCurrency]?.max || currencyPricingData["Pakistan (PKR)"].max;
  const currencyCode = selectedCurrency.match(/\(([^)]+)\)/)?.[1] || "PKR";

  const currentMinAreas = areaUnitData[selectedAreaUnit]?.min || areaUnitData["Marla"].min;
  const currentMaxAreas = areaUnitData[selectedAreaUnit]?.max || areaUnitData["Marla"].max;

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 80, scale: 0.85, rotateX: 50, transformPerspective: 1000 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.8, ease: "expo.out", delay: 0.2 }
    );

    gsap.fromTo(filterContainerRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", delay: 0.5 }
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !glowRef.current || !bgRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      gsap.to(glowRef.current, {
        x: x - 400,
        y: y - 400,
        duration: 1,
        ease: "power3.out"
      });

      const xOffset = (x / width - 0.5) * 50;
      const yOffset = (y / height - 0.5) * 50;
      gsap.to(bgRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 2,
        ease: "power2.out"
      });
    };

    const currentHero = heroRef.current;
    if (currentHero) {
      currentHero.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (currentHero) {
        currentHero.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      gsap.to(advancedSectionRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "expo.out",
        display: "flex"
      });
    } else {
      gsap.to(advancedSectionRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        display: "none"
      });
    }
  }, [isExpanded]);

  const closeAllDropdowns = () => {
    setIsCityOpen(false);
    setIsPropTypeOpen(false);
    setIsPriceOpen(false);
    setIsAreaOpen(false);
    setIsBedsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterContainerRef.current && !filterContainerRef.current.contains(event.target as Node)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResetSearch = () => {
    setPurpose("buy");
    setCity("Lahore");
    setLocation("");
    setPriceMin("0");
    setPriceMax("Any");
    setAreaMin("0");
    setAreaMax("Any");
    setBeds("All");
    setActivePropTab("Homes");
    setSelectedSubCategory("House");
    setDisplayPropType("Homes");
    setSelectedCurrency("Pakistan (PKR)");
    setSelectedAreaUnit("Marla");
    setCitySearch("");
    closeAllDropdowns();
  };

  const handleSearch = () => {
    const trimmedLocation = location.trim().toLowerCase();
    
    if (trimmedLocation.includes("mm alam") || trimmedLocation.includes("zameen aurum")) {
      router.push("/rent");
      return;
    }
    
    if (trimmedLocation.includes("ferozpur") || trimmedLocation.includes("walton") || trimmedLocation.includes("shiraz")) {
      router.push("/buy/homes");
      return;
    }
    
    if (trimmedLocation.includes("mehmood kasuri")) {
      if (activePropTab === "Commercial") {
        router.push("/buy/commercial");
      } else {
        router.push("/buy");
      }
      return;
    }
    
    if (trimmedLocation.includes("gulberg")) {
      if (purpose === "rent") {
        router.push("/rent");
      } else {
        router.push("/buy");
      }
      return;
    }

    if (activePropTab === "Commercial") {
      router.push("/buy/commercial");
      return;
    }
    
    if (activePropTab === "Homes") {
      if (selectedSubCategory === "Apartment" || selectedSubCategory === "Flat" || selectedSubCategory === "Portion" || selectedSubCategory === "Upper Portion" || selectedSubCategory === "Lower Portion") {
        router.push("/rent");
        return;
      }
      if (selectedSubCategory === "House") {
        router.push("/buy/homes");
        return;
      }
    }
    
    if (purpose === "rent") {
      router.push("/rent");
    } else {
      router.push("/buy");
    }
  };

  return (
    <>
      <section ref={heroRef} className="relative h-auto min-h-[750px] pb-12 md:min-h-[650px] md:pb-0 md:h-[650px] w-full flex items-start pt-32 md:items-center md:pt-0 justify-center bg-gray-950">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            ref={bgRef} 
            className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] bg-[url(/home/hero.webp)] bg-cover bg-center opacity-40"
          ></div>
          <div 
            ref={glowRef} 
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#013220] rounded-full blur-[180px] opacity-80"
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-[#1e2329]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center mt-4 md:mt-10">
          
          <h1 ref={titleRef} className="text-4xl md:text-5xl font-light text-white text-center mb-10 tracking-wide drop-shadow-xl">
            Search properties {purpose === "rent" ? "to rent" : "for sale"} in <span className="font-bold text-[#013220] drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] bg-white px-2 py-1 rounded">Lahore</span>
          </h1>

          <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl">
            {["buy", "rent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setPurpose(tab)}
                className={"px-8 py-2 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 " + (purpose === tab ? "bg-[#013220] text-white shadow-[0_0_20px_rgba(1,50,32,0.8)]" : "bg-transparent text-gray-300 md:hover:text-white md:hover:bg-white/10")}
              >
                {tab}
              </button>
            ))}
          </div>

          <div 
            ref={filterContainerRef}
            className="w-full bg-white/10 backdrop-blur-3xl border border-white/20 p-5 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col gap-4 relative z-20"
          >
            
            <div className="flex flex-col md:flex-row gap-3 relative z-50">
              
              <div className="flex-[1] bg-white/90 backdrop-blur-sm relative px-4 rounded-xl border border-white/30 md:hover:border-[#013220] transition-colors">
                <div className="flex flex-col w-full py-2 cursor-pointer" onClick={() => { const wasOpen = isCityOpen; closeAllDropdowns(); setIsCityOpen(!wasOpen); }}>
                  <span className="text-[10px] text-[#013220] font-bold tracking-wider mb-1">CITY</span>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm text-gray-900 font-medium">{city}</span>
                    <svg className={"w-4 h-4 text-gray-500 transform transition-transform " + (isCityOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {isCityOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded shadow-2xl border border-gray-200 z-[60]">
                    <div className="p-2 border-b border-gray-200">
                      <input type="text" value={citySearch} onChange={(e) => setCitySearch(e.target.value)} className="w-full border border-gray-800 p-1.5 text-sm outline-none text-black rounded-sm" placeholder="Search city" />
                    </div>
                    <ul className="max-h-56 overflow-y-auto bg-white py-1">
                      {filteredCities.map((c) => (
                        <li key={c} onClick={() => { setCity(c); setLocation(""); setIsCityOpen(false); setCitySearch(""); }} className={"px-4 py-2 text-sm cursor-pointer " + (city === c ? "bg-[#013220] text-white" : "text-gray-700 md:hover:bg-gray-100")}>
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className="p-2 border-t border-gray-200 flex justify-end bg-gray-50 rounded-b">
                      <button onClick={() => setIsCityOpen(false)} className="bg-[#444] text-white text-[11px] px-3 py-1 rounded md:hover:bg-black transition-colors">Close</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-[2] bg-white/90 backdrop-blur-sm relative flex items-center px-4 rounded-xl border border-white/30 md:hover:border-[#013220] transition-colors">
                 <div className="flex flex-col w-full py-2">
                   <span className="text-[10px] text-[#013220] font-bold tracking-wider mb-1">LOCATION</span>
                   <input 
                     type="text" 
                     placeholder={"Search live map data in " + city} 
                     value={location} 
                     onChange={(e) => setLocation(e.target.value)} 
                     onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                     onFocus={() => closeAllDropdowns()} 
                     className="w-full text-sm text-gray-900 font-medium outline-none bg-transparent placeholder-gray-400" 
                   />
                 </div>
              </div>

              <button onClick={handleSearch} className="md:w-40 bg-gradient-to-r from-[#013220] to-[#011a11] md:hover:from-[#011a11] md:hover:to-[#000000] text-white font-bold tracking-widest py-3 rounded-xl shadow-[0_0_20px_rgba(1,50,32,0.6)] transition-all transform md:hover:scale-105 active:scale-95 relative z-10">
                FIND
              </button>
            </div>

            <div ref={advancedSectionRef} className="hidden flex-col md:flex-row gap-3 overflow-visible h-0 opacity-0 relative z-40">
              
              <div className="flex-1 bg-white/90 relative flex flex-col px-4 py-2 rounded-xl border border-white/30 md:hover:border-[#013220] transition-colors">
                <div className="w-full cursor-pointer" onClick={() => { const wasOpen = isPropTypeOpen; closeAllDropdowns(); setIsPropTypeOpen(!wasOpen); }}>
                  <span className="text-[10px] text-[#013220] font-bold tracking-wider mb-1 block">PROPERTY TYPE</span>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm text-gray-900 font-medium">{displayPropType}</span>
                    <svg className={"w-4 h-4 text-gray-500 transform transition-transform " + (isPropTypeOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {isPropTypeOpen && (
                  <div 
                    className="absolute top-full mt-1 left-0 w-[320px] md:w-[380px] bg-white rounded-sm shadow-2xl border border-gray-200 z-[70] p-4 text-black cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-4 border-b border-gray-200 mb-4">
                      {(["Homes", "Plots", "Commercial"] as MainTab[]).map((tab) => (
                        <button 
                          key={tab} 
                          type="button"
                          onClick={(e) => { 
                            e.stopPropagation();
                            setActivePropTab(tab); 
                            setDisplayPropType(tab); 
                          }}
                          className={"text-[11px] font-bold tracking-wider uppercase pb-2 -mb-[1px] " + (activePropTab === tab ? "border-b-2 border-blue-500 text-black" : "text-gray-500 md:hover:text-black")}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {subCategories[activePropTab].map((subCat) => (
                        <button
                          key={subCat}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubCategory(subCat);
                            setDisplayPropType(subCat);
                            setIsPropTypeOpen(false);
                          }}
                          className={"text-center text-[13px] px-3 py-2 rounded-sm border transition-colors " + (selectedSubCategory === subCat && displayPropType === subCat ? "border-[#013220] text-white bg-[#013220]" : "border-[#013220] text-white bg-[#013220] md:hover:bg-[#011a11]")}
                        >
                          {subCat}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 items-center pt-2 text-xs">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePropTab("Homes");
                          setSelectedSubCategory("House");
                          setDisplayPropType("Homes");
                        }}
                        className="text-gray-500 md:hover:text-black"
                      >
                        Reset
                      </button>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPropTypeOpen(false);
                        }} 
                        className="bg-[#444] text-white px-4 py-1.5 rounded-sm md:hover:bg-black transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 bg-white/90 relative flex flex-col px-4 py-2 rounded-xl border border-white/30 md:hover:border-[#013220] transition-colors">
                <div className="w-full cursor-pointer" onClick={() => { const wasOpen = isPriceOpen; closeAllDropdowns(); setIsPriceOpen(!wasOpen); }}>
                  <span className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 block uppercase">PRICE ({currencyCode})</span>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm text-gray-900 font-medium truncate">
                      {priceMin} <span className="text-gray-400 mx-1 font-normal text-xs">to</span> {priceMax}
                    </span>
                    <svg className={"w-4 h-4 text-gray-500 transform transition-transform " + (isPriceOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {isPriceOpen && (
                  <div 
                    className="absolute top-full mt-1 left-0 w-[280px] md:w-[300px] bg-white rounded-sm shadow-2xl border border-gray-200 z-[70] flex flex-col text-black cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 border-b border-gray-200 text-center">
                      <button className="text-[#008cff] text-[13px] font-semibold md:hover:underline">Change currency ({currencyCode})</button>
                    </div>
                    
                    <div className="flex p-3 gap-3">
                      <div className="flex-1 flex flex-col border-r border-gray-100 pr-3">
                        <span className="text-xs font-bold mb-2 text-center text-gray-800">MIN:</span>
                        <input 
                          type="text" 
                          value={priceMin} 
                          onChange={(e) => setPriceMin(e.target.value)}
                          className="w-full border border-gray-300 rounded-sm p-1.5 text-xs text-center mb-2 outline-none text-gray-900 bg-white focus:border-blue-500" 
                        />
                        <ul className="h-48 overflow-y-auto flex flex-col styled-scrollbar">
                          {currentMinPrices.map((p) => (
                            <li 
                              key={p} 
                              onClick={(e) => { e.stopPropagation(); setPriceMin(p); }} 
                              className={"text-center py-2 px-1 text-xs cursor-pointer transition-colors " + (priceMin === p ? "bg-[#013220] text-white" : "text-gray-700 md:hover:bg-gray-100")}
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <span className="text-xs font-bold mb-2 text-center text-gray-800">MAX:</span>
                        <input 
                          type="text" 
                          value={priceMax} 
                          onChange={(e) => setPriceMax(e.target.value)}
                          className="w-full border border-gray-300 rounded-sm p-1.5 text-xs text-center mb-2 outline-none text-gray-900 bg-white focus:border-blue-500" 
                        />
                        <ul className="h-48 overflow-y-auto flex flex-col styled-scrollbar">
                          {currentMaxPrices.map((p) => (
                            <li 
                              key={p} 
                              onClick={(e) => { e.stopPropagation(); setPriceMax(p); }} 
                              className={"text-center py-2 px-1 text-xs cursor-pointer transition-colors " + (priceMax === p ? "bg-[#013220] text-white" : "text-gray-700 md:hover:bg-gray-100")}
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-2 border-t border-gray-200 flex justify-end bg-gray-50 rounded-b">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsPriceOpen(false); }} 
                        className="bg-[#444] text-white text-[11px] px-3 py-1.5 rounded-sm md:hover:bg-black transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 bg-white/90 relative flex flex-col px-4 py-2 rounded-xl border border-white/30 md:hover:border-[#013220] transition-colors">
                <div className="w-full cursor-pointer" onClick={() => { const wasOpen = isAreaOpen; closeAllDropdowns(); setIsAreaOpen(!wasOpen); }}>
                  <span className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 block uppercase">AREA ({selectedAreaUnit})</span>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm text-gray-900 font-medium truncate">
                      {areaMin} <span className="text-gray-400 mx-1 font-normal text-xs">to</span> {areaMax}
                    </span>
                    <svg className={"w-4 h-4 text-gray-500 transform transition-transform " + (isAreaOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {isAreaOpen && (
                  <div 
                    className="absolute top-full mt-1 left-0 w-[280px] md:w-[300px] bg-white rounded-sm shadow-2xl border border-gray-200 z-[70] flex flex-col text-black cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 border-b border-gray-200 text-center">
                      <button className="text-[#008cff] text-[13px] font-semibold md:hover:underline">Change area unit ({selectedAreaUnit})</button>
                    </div>
                    
                    <div className="flex p-3 gap-3">
                      <div className="flex-1 flex flex-col border-r border-gray-100 pr-3">
                        <span className="text-xs font-bold mb-2 text-center text-gray-800">MIN:</span>
                        <input 
                          type="text" 
                          value={areaMin} 
                          onChange={(e) => setAreaMin(e.target.value)}
                          className="w-full border border-gray-300 rounded-sm p-1.5 text-xs text-center mb-2 outline-none text-gray-900 bg-white focus:border-blue-500" 
                        />
                        <ul className="h-48 overflow-y-auto flex flex-col styled-scrollbar">
                          {currentMinAreas.map((a) => (
                            <li 
                              key={a} 
                              onClick={(e) => { e.stopPropagation(); setAreaMin(a); }} 
                              className={"text-center py-2 px-1 text-xs cursor-pointer transition-colors " + (areaMin === a ? "bg-[#013220] text-white" : "text-gray-700 md:hover:bg-gray-100")}
                            >
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <span className="text-xs font-bold mb-2 text-center text-gray-800">MAX:</span>
                        <input 
                          type="text" 
                          value={areaMax} 
                          onChange={(e) => setAreaMax(e.target.value)}
                          className="w-full border border-gray-300 rounded-sm p-1.5 text-xs text-center mb-2 outline-none text-gray-900 bg-white focus:border-blue-500" 
                        />
                        <ul className="h-48 overflow-y-auto flex flex-col styled-scrollbar">
                          {currentMaxAreas.map((a) => (
                            <li 
                              key={a} 
                              onClick={(e) => { e.stopPropagation(); setAreaMax(a); }} 
                              className={"text-center py-2 px-1 text-xs cursor-pointer transition-colors " + (areaMax === a ? "bg-[#013220] text-white" : "text-gray-700 md:hover:bg-gray-100")}
                            >
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-2 border-t border-gray-200 flex justify-end bg-gray-50 rounded-b">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsAreaOpen(false); }} 
                        className="bg-[#444] text-white text-[11px] px-3 py-1.5 rounded-sm md:hover:bg-black transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-[0.5] bg-white/90 relative flex flex-col px-4 py-2 rounded-xl border border-white/30 md:hover:border-[#013220] transition-colors">
                <div className="w-full cursor-pointer" onClick={() => { const wasOpen = isBedsOpen; closeAllDropdowns(); setIsBedsOpen(!wasOpen); }}>
                  <span className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 block">BEDS</span>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm text-gray-900 font-medium truncate">{beds}</span>
                    <svg className={"w-4 h-4 text-gray-500 transform transition-transform " + (isBedsOpen ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {isBedsOpen && (
                  <div 
                    className="absolute top-full mt-1 left-0 w-full bg-white rounded-sm shadow-2xl border border-gray-200 z-[70] flex flex-col text-black cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul className="max-h-64 overflow-y-auto flex flex-col pt-1 styled-scrollbar">
                      {bedOptions.map((b) => (
                        <li 
                          key={b}
                          onClick={(e) => { e.stopPropagation(); setBeds(b); setIsBedsOpen(false); }}
                          className={"text-center py-2.5 px-4 text-[13px] border-b border-gray-100 last:border-none cursor-pointer transition-colors " + (beds === b ? "bg-[#013220] text-white font-medium" : "text-gray-700 md:hover:bg-gray-50")}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="p-2 border-t border-gray-200 flex justify-end bg-gray-50 rounded-b">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsBedsOpen(false); }} 
                        className="bg-[#444] text-white text-[11px] px-3 py-1.5 rounded-sm md:hover:bg-black transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            <div className="w-full flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 mt-4 text-[11px] md:text-xs font-medium text-gray-300 relative z-10">
               <button 
                 onClick={() => { closeAllDropdowns(); setIsExpanded(!isExpanded); }}
                 className="md:hover:text-white transition-colors flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 md:hover:bg-white/20"
               >
                 <svg className={"w-3 h-3 transform transition-transform duration-300 " + (isExpanded ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 {isExpanded ? "Less Options" : "More Options"}
               </button>
               <span className="text-gray-600 hidden md:inline">|</span>
               <button 
                 onClick={() => setIsCurrencyModalOpen(true)} 
                 className="md:hover:text-white transition-colors"
               >
                 Change Currency
               </button>
               <span className="text-gray-600 hidden md:inline">|</span>
               <button 
                 onClick={() => setIsAreaModalOpen(true)}
                 className="md:hover:text-white transition-colors"
               >
                 Change Area Unit
               </button>
               <span className="text-gray-600 hidden md:inline">|</span>
               <button onClick={handleResetSearch} className="md:hover:text-red-400 transition-colors">Reset Search</button>
            </div>

          </div>
        </div>
      </section>

      {isCurrencyModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsCurrencyModalOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-[450px] rounded shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex justify-center items-center p-4 border-b border-gray-200">
              <h2 className="text-gray-800 font-bold text-[17px]">Change Currency</h2>
              <button 
                onClick={() => setIsCurrencyModalOpen(false)}
                className="absolute right-4 text-gray-500 md:hover:text-gray-800 transition-colors border border-gray-200 bg-gray-50 md:hover:bg-gray-100 p-1.5 rounded-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 bg-white rounded-b">
              
              <div className="relative w-full z-50">
                <div 
                  className="w-full border border-gray-300 bg-white rounded-sm p-3 flex justify-between items-center cursor-pointer text-[13px] text-gray-800"
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                >
                  <span>{selectedCurrency}</span>
                  <svg className={"w-4 h-4 text-gray-800 transform transition-transform " + (isCurrencyDropdownOpen ? "rotate-180" : "")} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </div>

                {isCurrencyDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl z-[60] rounded-sm">
                    <ul className="max-h-60 overflow-y-auto py-1">
                      {currencies.map((curr) => (
                        <li 
                          key={curr}
                          onClick={() => {
                            setSelectedCurrency(curr);
                            setIsCurrencyDropdownOpen(false);
                          }}
                          className="p-3 text-[13px] text-gray-800 cursor-pointer md:hover:bg-[#013220] md:hover:text-white transition-colors"
                        >
                          {curr}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsCurrencyModalOpen(false)}
                className="w-full bg-[#013220] md:hover:bg-[#011a11] text-white font-bold py-3 rounded-sm transition-colors relative z-10"
              >
                SAVE
              </button>

            </div>
          </div>
        </div>
      )}

      {isAreaModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsAreaModalOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-[450px] rounded shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex justify-center items-center p-4 border-b border-gray-200">
              <h2 className="text-gray-800 font-bold text-[17px]">Change Area</h2>
              <button 
                onClick={() => setIsAreaModalOpen(false)}
                className="absolute right-4 text-gray-500 md:hover:text-gray-800 transition-colors border border-gray-200 bg-gray-50 md:hover:bg-gray-100 p-1.5 rounded-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 bg-white rounded-b">
              
              <div className="relative w-full z-50">
                <div 
                  className="w-full border border-gray-300 bg-white rounded-sm p-3 flex justify-between items-center cursor-pointer text-[13px] text-gray-800"
                  onClick={() => setIsAreaDropdownModalOpen(!isAreaDropdownModalOpen)}
                >
                  <span>{selectedAreaUnit}</span>
                  <svg className={"w-4 h-4 text-gray-800 transform transition-transform " + (isAreaDropdownModalOpen ? "rotate-180" : "")} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </div>

                {isAreaDropdownModalOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl z-[60] rounded-sm">
                    <ul className="max-h-60 overflow-y-auto py-1">
                      {areaUnits.map((unit) => (
                        <li 
                          key={unit}
                          onClick={() => {
                            setSelectedAreaUnit(unit);
                            setIsAreaDropdownModalOpen(false);
                          }}
                          className="p-3 text-[13px] text-gray-800 cursor-pointer md:hover:bg-[#013220] md:hover:text-white transition-colors"
                        >
                          {unit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsAreaModalOpen(false)}
                className="w-full bg-[#013220] md:hover:bg-[#011a11] text-white font-bold py-3 rounded-sm transition-colors relative z-10"
              >
                SAVE
              </button>

            </div>
          </div>
        </div>
      )}
      
      <FeaturedProperties />
      <FeaturedRentals />
      <MarketReport />
      <WhyChooseUs />
      <Reviews />
    </>
  );
}