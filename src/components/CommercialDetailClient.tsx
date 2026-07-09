"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BuyDetailClientProps {
  propertyId?: string;
}

export default function CommercialDetailClient({ propertyId: fallbackId }: BuyDetailClientProps) {
  const params = useParams();
  const routeId = (params?.id as string) || fallbackId || `1`;

  let currentTitle = `2 Kanal Commercial Building`;
  let currentPrice = `PKR 100 Crore`;
  let currentArea = `2 Kanal (59x150)`;
  let currentImage = `/buy/1.webp`;
  let currentImages = [`/buy/1.webp`];
  let currentDesc = `Premium commercial building available for sale on the highly sought after Mehmood Kasuri Road. This property spans exactly 2 Kanal with a front of 59 square feet and a depth of 150. An exceptional investment opportunity in the heart of the commercial district.`;
  let currentLocation = `Mehmood Kasuri Road, Gulberg, Lahore`;
  let currentPropertyType = `Commercial`;
  let currentMapArea = `Gulberg`;

  if (routeId === `2`) {
    currentTitle = `2 Kanal Commercial House Kothi`;
    currentPrice = `PKR 90 Crore`;
    currentArea = `2 Kanal (59x150)`;
    currentImage = `/buy/2.webp`;
    currentImages = [`/buy/2.webp`];
    currentDesc = `Luxurious commercial house kothi located directly on Mehmood Kasuri Road. Features a solid structure with a 59 square feet front and 150 feet length. Ideal for corporate offices or high end retail transformations.`;
  } else if (routeId === `5`) {
    currentTitle = `1 Kanal 3 Marla Commercial Building`;
    currentPrice = `PKR 65 Crore`;
    currentArea = `1 Kanal 3 Marla`;
    currentImage = `/buy/1.webp`;
    currentImages = [`/buy/1.webp`];
    currentDesc = `Presenting a prime commercial building spanning 1 Kanal and 3 Marla located on the bustling Mehmood Kasuri Road. With an asking price of PKR 90 Crore this expansive property offers unparalleled potential for corporate headquarters or high end retail spaces in one of Lahores most coveted commercial hubs.`;
    currentLocation = `Mehmood Kasuri Road, Gulberg, Lahore`;
    currentPropertyType = `Commercial`;
    currentMapArea = `Gulberg`;
  }

  const property = {
    id: routeId,
    title: currentTitle,
    location: currentLocation,
    priceStr: currentPrice,
    area: currentArea,
    image: currentImage,
    images: currentImages,
    description: currentDesc,
    propertyType: currentPropertyType,
    propertyStatus: `For Sale`,
    propertyId: `bizbuy-` + routeId + `805972`
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const modalImgRef = useRef<HTMLImageElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  const galleryImages = property.images;

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  useEffect(() => {
    gsap.fromTo(heroImgRef.current,
      { scale: 1.3, filter: `brightness(0.5) contrast(1.2)` },
      { scale: 1, filter: `brightness(1) contrast(1)`, duration: 2.5, ease: `power4.out` }
    );

    gsap.fromTo(contentRef.current,
      { opacity: 0, rotationX: -20, y: 50, transformPerspective: 1200, transformOrigin: `top center` },
      { opacity: 1, rotationX: 0, y: 0, duration: 1.5, ease: `power3.out`, delay: 0.5 }
    );

    gsap.fromTo(sidebarRef.current,
      { opacity: 0, x: 80, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 2, ease: `elastic.out(1.1, 0.6)`, delay: 0.7 }
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null && modalImgRef.current) {
      gsap.fromTo(modalImgRef.current,
        { scale: 0.7, opacity: 0, rotationY: 20 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 0.7, ease: `back.out(1.5)`, transformPerspective: 1000 }
      );
    }
  }, [lightboxIndex]);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <main className={`w-full min-h-screen bg-[#fcfcfc] flex flex-col pt-[70px] overflow-x-hidden`}>
      
      <div className={`w-full h-[60vh] relative overflow-hidden flex items-end pb-12 cursor-pointer`} onClick={() => setLightboxIndex(heroIndex)}>
        <img ref={heroImgRef} src={galleryImages[heroIndex]} alt={property.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out`} />
        <div className={`absolute inset-0 bg-gradient-to-t from-[#013220]/90 via-black/30 to-transparent mix-blend-multiply`}></div>
      </div>

      <div className={`w-full max-w-[1400px] mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row gap-12 mt-4`}>
        
        <div ref={contentRef} className={`w-full lg:w-[65%] flex flex-col gap-14`}>
          
          <div className={`flex flex-col gap-4`}>
            <div className={`text-sm text-gray-500 font-bold uppercase tracking-wider flex flex-wrap items-center gap-3`}>
              <Link href={`/`} className={`hover:text-[#013220] transition-colors`}>Home</Link>
              <svg className={`w-4 h-4 text-gray-400`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M9 5l7 7-7 7`}></path></svg>
              <Link href={`/buy`} className={`hover:text-[#013220] transition-colors`}>Buy</Link>
              <svg className={`w-4 h-4 text-gray-400`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M9 5l7 7-7 7`}></path></svg>
              <Link href={`/buy/commercial`} className={`hover:text-[#013220] transition-colors`}>Commercial</Link>
              <svg className={`w-4 h-4 text-gray-400`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M9 5l7 7-7 7`}></path></svg>
              <span className={`text-[#013220] truncate`}>{property.title}</span>
            </div>
            <h1 className={`text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight`}>
              {property.title}
            </h1>
          </div>
          
          <div className={`flex flex-col gap-8`}>
            <div className={`flex items-center gap-4`}>
              <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
              <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Property Details</h2>
            </div>
            
            <div className={`bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-2xl p-8 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-[#013220]/5 rounded-bl-full -z-10`}></div>
              
              <div className={`flex flex-col gap-2`}>
                <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider`}>Property ID</span>
                <span className={`text-gray-900 font-black text-lg`}>{property.propertyId}</span>
              </div>
              <div className={`flex flex-col gap-2`}>
                <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider`}>Sale Price</span>
                <span className={`text-[#013220] font-black text-lg`}>{property.priceStr}</span>
              </div>
              <div className={`flex flex-col gap-2`}>
                <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider`}>Area Dimension</span>
                <span className={`text-gray-900 font-black text-lg`}>{property.area}</span>
              </div>
              <div className={`flex flex-col gap-2`}>
                <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider`}>Property Type</span>
                <span className={`text-gray-900 font-black text-lg`}>{property.propertyType}</span>
              </div>
              <div className={`flex flex-col gap-2`}>
                <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider`}>Status</span>
                <span className={`bg-[#013220] text-white text-xs font-bold px-3 py-1 rounded w-max`}>{property.propertyStatus}</span>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-8`}>
            <div className={`flex items-center gap-4`}>
              <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
              <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Description</h2>
            </div>
            <p className={`text-gray-600 leading-relaxed text-xl font-light bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)]`}>
              {property.description}
            </p>
          </div>

          <div className={`flex flex-col gap-8`}>
            <div className={`flex items-center gap-4`}>
              <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
              <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Location Map</h2>
            </div>
            
            <div className={`bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-8 rounded-2xl flex flex-col gap-6`}>
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
                <div className={`flex flex-col`}>
                  <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider mb-1`}>Address</span>
                  <span className={`text-gray-900 font-bold`}>{property.location}</span>
                </div>
                <div className={`flex flex-col`}>
                  <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider mb-1`}>City</span>
                  <span className={`text-gray-900 font-bold`}>Lahore</span>
                </div>
                <div className={`flex flex-col`}>
                  <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider mb-1`}>Area</span>
                  <span className={`text-gray-900 font-bold`}>{currentMapArea}</span>
                </div>
              </div>
              
              <div className={`w-full h-[450px] bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-200 mt-2`}>
                 <iframe 
                   src={`https://maps.google.com/maps?q=` + property.location + `&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                   width={`100%`} 
                   height={`100%`} 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading={`lazy`} 
                   referrerPolicy={`no-referrer-when-downgrade`}
                   title={`${currentMapArea} Live Map`}
                 ></iframe>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-8 pb-20`}>
            <div className={`flex items-center gap-4`}>
              <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
              <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Property Gallery</h2>
            </div>
            
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-4`}>
               {galleryImages.map((img, idx) => (
                 <div 
                   key={idx} 
                   onClick={() => setLightboxIndex(idx)}
                   className={`w-full h-[220px] rounded-xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-2xl transition-all duration-500`}
                 >
                   <img src={img} alt={`Gallery view`} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out`} />
                   <div className={`absolute inset-0 bg-[#013220]/0 group-hover:bg-[#013220]/30 transition-colors duration-500 flex items-center justify-center`}>
                     <svg className={`w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 ease-out`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7`}></path></svg>
                   </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

        <div className={`w-full lg:w-[35%] relative z-20`}>
          <div ref={sidebarRef} className={`sticky top-28 bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-2xl p-6 flex flex-col gap-6`}>
            
            <div className={`flex items-center gap-4 border-b border-gray-100 pb-5`}>
              <div className={`w-16 h-16 bg-gradient-to-br from-[#013220] to-[#011a11] rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform cursor-pointer`}>
                <svg className={`w-8 h-8 text-white`} fill={`currentColor`} viewBox={`0 0 20 20`}><path fillRule={`evenodd`} d={`M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z`} clipRule={`evenodd`}></path></svg>
              </div>
              <div className={`flex flex-col gap-1`}>
                <h3 className={`font-black text-xl text-gray-900`}>Qeemat.com Agent</h3>
                <Link href={`#`} className={`text-sm text-[#013220] font-bold uppercase tracking-wider hover:underline`}>View All Listings</Link>
              </div>
            </div>

            <form className={`flex flex-col gap-4`}>
              <div className={`flex flex-col gap-1`}>
                 <label className={`text-xs font-bold text-gray-500 uppercase tracking-wider`}>Full Name</label>
                 <input type={`text`} placeholder={`Enter your full name`} className={`w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#013220] focus:bg-white transition-all font-medium text-gray-900`} />
              </div>
              
              <div className={`flex flex-col gap-1`}>
                 <label className={`text-xs font-bold text-gray-500 uppercase tracking-wider`}>Email Address</label>
                 <input type={`email`} placeholder={`Enter your email`} className={`w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#013220] focus:bg-white transition-all font-medium text-gray-900`} />
              </div>
              
              <div className={`flex flex-col gap-1`}>
                 <label className={`text-xs font-bold text-gray-500 uppercase tracking-wider`}>Phone Number</label>
                 <input type={`text`} placeholder={`+92 300 1234567`} className={`w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#013220] focus:bg-white transition-all font-medium text-gray-900`} />
              </div>
              
              <div className={`flex flex-col gap-1`}>
                 <label className={`text-xs font-bold text-gray-500 uppercase tracking-wider`}>Message</label>
                 <textarea 
                   rows={2} 
                   className={`w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#013220] focus:bg-white transition-all font-medium text-gray-900 resize-none`}
                   defaultValue={`I am interested in buying the property: ` + property.title}
                 ></textarea>
              </div>
              
              <button type={`button`} className={`w-full bg-gradient-to-r from-[#013220] to-[#011a11] hover:from-[#011a11] hover:to-black text-white font-black text-lg py-3.5 rounded-lg transition-all duration-300 shadow-[0_10px_20px_rgba(1,50,32,0.3)] hover:shadow-[0_15px_30px_rgba(1,50,32,0.5)] hover:-translate-y-1 mt-2 uppercase tracking-widest`}>
                Request Information
              </button>
            </form>

          </div>
        </div>

      </div>

      {lightboxIndex !== null && (
        <div className={`fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center backdrop-blur-xl`}>
          
          <button onClick={() => setLightboxIndex(null)} className={`absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 z-50`}>
            <svg className={`w-8 h-8`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M6 18L18 6M6 6l12 12`}></path></svg>
          </button>
          
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className={`absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-300 z-50`}>
            <svg className={`w-10 h-10`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M15 19l-7-7 7-7`}></path></svg>
          </button>
          
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className={`absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-300 z-50`}>
            <svg className={`w-10 h-10`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M9 5l7 7-7 7`}></path></svg>
          </button>
          
          <div className={`relative w-full max-w-7xl max-h-[85vh] px-4 flex flex-col items-center justify-center select-none`} onClick={(e) => e.stopPropagation()}>
             <img ref={modalImgRef} src={galleryImages[lightboxIndex]} alt={`Gallery Expanded`} className={`max-w-full max-h-[80vh] object-contain shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-lg`} />
             <div className={`text-white/50 font-bold tracking-widest uppercase mt-6 text-sm`}>
               Image {lightboxIndex + 1} of {galleryImages.length}
             </div>
          </div>
        </div>
      )}

    </main>
  );
}