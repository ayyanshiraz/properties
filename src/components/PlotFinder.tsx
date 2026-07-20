"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

interface DBProperty {
  id: number;
  title: string;
  type: string;
  category: string;
}

interface PlotFinderProps {
  dbProperties?: DBProperty[];
}

export default function PlotFinder({ dbProperties = [] }: PlotFinderProps) {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [mapLocation, setMapLocation] = useState("Lahore, Pakistan");
  const [zoomLevel, setZoomLevel] = useState(14);
  const [mapType, setMapType] = useState("k");
  const [displayedMarkers, setDisplayedMarkers] = useState<any[]>([]);

  const markerData = [
    { top: "30%", left: "25%", label: "2 Kanal Commercial Building", link: "/buy/commercial/2001" },
    { top: "45%", left: "45%", label: "2 Kanal Commercial House Kothi", link: "/buy/homes/2002" },
    { top: "60%", left: "35%", label: "Furnished 2 Bed Apartment", link: "/rent/1001" },
    { top: "50%", left: "70%", label: "Non Furnished Apartment", link: "/rent/1002" },
    { top: "75%", left: "55%", label: "Zameen Aurum Apartment", link: "/rent/1003" },
    { top: "40%", left: "60%", label: "1 Kanal Portion MM Alam", link: "/rent/1004" },
    { top: "65%", left: "25%", label: "3.5 Marla House Ferozpur", link: "/buy/homes/2003" },
    { top: "80%", left: "40%", label: "6 Marla Shiraz Villas", link: "/buy/homes/2004" },
    { top: "35%", left: "35%", label: "1 Kanal 3 Marla Commercial", link: "/buy/commercial/2005" },
    { top: "20%", left: "50%", label: "House for rent Cavalry Ground", link: "/rent/1005" },
    { top: "85%", left: "20%", label: "Commercial property Valencia", link: "/rent/1006" },
    { top: "55%", left: "80%", label: "34 Marla Home Gulberg", link: "/buy/homes/2006" }
  ];

  const dbMarkers = dbProperties.map((prop) => {
    const topPos = 20 + ((prop.id * 17) % 60); 
    const leftPos = 20 + ((prop.id * 23) % 60); 

    let propertyLink = `/buy/homes/${prop.id}`;
    if (prop.type === "For Rent") {
      propertyLink = `/rent/${prop.id}`;
    } else if (prop.type === "Co-Working Space") {
      propertyLink = `/co-working/${prop.id}`;
    } else if (prop.category === "Commercial") {
      propertyLink = `/buy/commercial/${prop.id}`;
    }

    return {
      top: `${topPos}%`,
      left: `${leftPos}%`,
      label: prop.title,
      link: propertyLink
    };
  });

  const allMarkers = [...markerData, ...dbMarkers];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setDisplayedMarkers(allMarkers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allMarkers.filter(m => m.label.toLowerCase().includes(query));
      setDisplayedMarkers(filtered);
    }
  }, [searchQuery, dbProperties]);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== "") {
      setMapLocation(trimmedQuery + " Lahore Pakistan");
    } else {
      setMapLocation("Lahore, Pakistan");
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 1, 21));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 1, 1));
  };

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === "k" ? "m" : "k"));
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      gsap.fromTo(
        mapContainerRef.current,
        { opacity: 0, scale: 1.05, filter: "blur(10px) grayscale(50%)" },
        { opacity: 1, scale: 1, filter: "blur(0px) grayscale(0%)", duration: 2, ease: "power3.out" }
      );
    }

    if (searchBarRef.current) {
      gsap.fromTo(
        searchBarRef.current,
        { y: -100, opacity: 0, rotateX: -45, transformPerspective: 1000 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, delay: 0.5, ease: "back.out(1.2)" }
      );
    }

    if (markersRef.current && markersRef.current.children) {
      gsap.fromTo(
        Array.from(markersRef.current.children),
        { scale: 0, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1, stagger: 0.05, delay: 1, ease: "elastic.out(1, 0.5)" }
      );
    }

    if (controlsRef.current) {
      gsap.fromTo(
        controlsRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power3.out" }
      );
    }
  }, [displayedMarkers]);

  return (
    <div className="fixed inset-0 z-[99999] w-full h-screen overflow-hidden bg-gray-200 flex flex-col">
      
      <div ref={mapContainerRef} className="absolute inset-0 z-0">
        <iframe
          key={mapLocation + zoomLevel + mapType}
          src={`https://maps.google.com/maps?q=` + encodeURIComponent(mapLocation) + `&t=` + mapType + `&z=` + zoomLevel + `&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
        <div className="absolute inset-0 bg-[#013220]/10 pointer-events-none"></div>
      </div>

      <div className="absolute top-0 right-0 z-20 w-full px-4 pt-6 md:px-8 flex justify-end pointer-events-none">
        <div ref={searchBarRef} className="bg-white p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-5xl flex flex-col md:flex-row gap-4 items-end pointer-events-auto border border-gray-100">
          
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1">Select City</label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#013220] transition-colors text-[#013220] font-bold appearance-none cursor-pointer">
                <option value="lahore">Lahore</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-[#013220]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-2/3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1">Search Property or Location</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search live map data or property titles..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#013220] transition-colors text-black placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleSearch}
            className="w-full md:w-auto px-10 py-3 bg-[#013220] text-white font-bold tracking-wider uppercase rounded-lg hover:bg-[#10b981] transition-colors duration-300 shadow-lg shrink-0 h-[48px]"
          >
            FIND
          </button>
        </div>
      </div>

      <div ref={markersRef} className="absolute inset-0 z-10 pointer-events-none">
        {displayedMarkers.map((marker, idx) => (
          <div key={idx} className="absolute" style={{ top: marker.top, left: marker.left }}>
            <div 
              onClick={() => {
                if (marker.link !== "#") {
                  router.push(marker.link);
                }
              }}
              className="flex items-center bg-gray-800/95 backdrop-blur-sm text-white text-[11px] font-bold rounded-sm shadow-xl pointer-events-auto cursor-pointer hover:bg-gray-900 transition-colors transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-[#013220] p-1.5 flex items-center justify-center rounded-l-sm">
                <img src="/logo2 copy.png" alt="logo" className="w-3.5 h-3.5 object-contain" />
              </div>
              <span className="px-2.5 py-1.5 whitespace-nowrap">{marker.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div ref={controlsRef} className="absolute right-6 bottom-12 z-20 flex flex-col gap-4 pointer-events-none">
        
        <div className="bg-white rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden pointer-events-auto border border-gray-100">
          <button type="button" onClick={handleZoomIn} className="p-3 hover:bg-gray-100 transition-colors text-black flex items-center justify-center border-b border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </button>
          <button type="button" onClick={handleZoomOut} className="p-3 hover:bg-gray-100 transition-colors text-black flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"></path></svg>
          </button>
        </div>

        <div onClick={toggleMapType} className="bg-white p-1 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] pointer-events-auto border border-gray-100 relative group cursor-pointer overflow-hidden w-[60px] h-[60px]">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=200&q=80" alt="View Switcher" className="w-full h-full object-cover rounded" />
          <div className="absolute inset-1 bg-black/40 rounded flex items-center justify-center transition-colors group-hover:bg-black/60">
            <span className="text-[9px] text-white font-bold uppercase tracking-wide">{mapType === "k" ? "Map" : "Sat"}</span>
          </div>
        </div>

      </div>

    </div>
  );
}