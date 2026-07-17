"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

interface PropertyData {
  id: string;
  title: string;
  location: string;
  priceStr: string;
  area: string;
  image: string;
  images?: string[]; 
  description: string;
  propertyType: string;
  propertyStatus: string;
  propertyId: string;
  agentName?: string;
  featuresList?: string[];
  floorRates?: any;
  paymentPlans?: any;
}

interface PropertyDetailClientProps {
  property: PropertyData;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {

  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const modalImgRef = useRef<any>(null); 
  const heroImgRef = useRef<HTMLDivElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.image];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
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
      
      <div 
        className={`w-full h-[60vh] relative overflow-hidden flex items-end pb-12 cursor-pointer group`}
        onClick={() => setLightboxIndex(currentSlide)}
      >
        <div ref={heroImgRef} className={`absolute inset-0 w-full h-full`}>
          {galleryImages.map((mediaUrl, index) => {
            const isVideo = mediaUrl.toLowerCase().endsWith(`.mp4`) || mediaUrl.toLowerCase().endsWith(`.webm`);
            return isVideo ? (
              <video 
                key={index}
                src={mediaUrl} 
                autoPlay
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ` + (currentSlide === index ? `opacity-100` : `opacity-0`)} 
              />
            ) : (
              <img 
                key={index}
                src={mediaUrl} 
                alt={property.title} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ` + (currentSlide === index ? `opacity-100` : `opacity-0`)} 
              />
            );
          })}
        </div>
        <div className={`absolute inset-0 bg-gradient-to-t from-[#013220]/90 via-black/30 to-transparent mix-blend-multiply pointer-events-none`}></div>
        
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10`}>
          <div className={`bg-black/50 p-4 rounded-full backdrop-blur-sm shadow-2xl`}>
            <svg className={`w-8 h-8 text-white`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7`}></path></svg>
          </div>
        </div>
      </div>

      <div className={`w-full max-w-[1400px] mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row gap-12 mt-4`}>
        
        <div ref={contentRef} className={`w-full lg:w-[65%] flex flex-col gap-14`}>
          
          <div className={`flex flex-col gap-4`}>
            <div className={`text-sm text-gray-500 font-bold uppercase tracking-wider flex flex-wrap items-center gap-3`}>
              <Link href={`/`} className={`hover:text-[#013220] transition-colors`}>Home</Link>
              <svg className={`w-4 h-4 text-gray-400`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
              <Link href={`/rent`} className={`hover:text-[#013220] transition-colors`}>Rent</Link>
              <svg className={`w-4 h-4 text-gray-400`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
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
                <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider`}>Rent Price</span>
                <span className={`text-[#013220] font-black text-lg`}>{property.priceStr}</span>
              </div>
              <div className={`flex flex-col gap-2`}>
                <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider`}>Area Dimension</span>
                <span className={`text-gray-900 font-black text-lg`}>
                  {property.area && property.area !== "N/A" ? property.area : "Not Specified"}
                </span>
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

          {property.featuresList && property.featuresList.length > 0 && (
            <div className={`flex flex-col gap-8`}>
              <div className={`flex items-center gap-4`}>
                <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
                <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Project Highlights</h2>
              </div>
              <div className={`bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4`}>
                {property.featuresList.map((feature, idx) => (
                  <div key={idx} className={`flex items-start gap-3`}>
                    <svg className={`w-6 h-6 text-[#013220] shrink-0`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M5 13l4 4L19 7`}></path></svg>
                    <span className={`text-gray-700 font-medium`}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {property.floorRates && property.floorRates.length > 0 && (
            <div className={`flex flex-col gap-8`}>
              <div className={`flex items-center gap-4`}>
                <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
                <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Pricing Overview</h2>
              </div>
              <div className={`bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden`}>
                <table className={`w-full text-left border-collapse`}>
                  <thead>
                    <tr className={`bg-[#013220] text-white`}>
                      <th className={`p-4 font-bold text-lg`}>Floor</th>
                      <th className={`p-4 font-bold text-lg`}>Rate (Per Sq Ft)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.floorRates.map((rate: any, idx: number) => (
                      <tr key={idx} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors`}>
                        <td className={`p-4 text-gray-800 font-bold`}>{rate.floor}</td>
                        <td className={`p-4 text-[#013220] font-black`}>{rate.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {property.paymentPlans && property.paymentPlans.length > 0 && (
            <div className={`flex flex-col gap-8`}>
              <div className={`flex items-center gap-4`}>
                <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
                <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Payment Plans & ROI</h2>
              </div>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                {property.paymentPlans.map((plan: any, idx: number) => (
                  <div key={idx} className={`bg-white border border-[#013220]/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden`}>
                    <div className={`absolute top-0 left-0 w-full h-1.5 bg-[#013220]`}></div>
                    <h3 className={`text-xl font-black text-[#013220] mb-4 text-center border-b border-gray-100 pb-4`}>{plan.title}</h3>
                    
                    <div className={`flex justify-between items-center py-2 border-b border-gray-50`}>
                      <span className={`text-sm font-bold text-gray-500 uppercase`}>Space Value</span>
                      <span className={`font-black text-gray-900`}>PKR {plan.value}</span>
                    </div>
                    <div className={`flex justify-between items-center py-2 border-b border-gray-50`}>
                      <span className={`text-sm font-bold text-gray-500 uppercase`}>Down Payment (25%)</span>
                      <span className={`font-black text-gray-900`}>PKR {plan.downPayment}</span>
                    </div>
                    <div className={`flex justify-between items-center py-2 border-b border-gray-50`}>
                      <span className={`text-sm font-bold text-gray-500 uppercase`}>48 Monthly Installments</span>
                      <span className={`font-black text-gray-900`}>PKR {plan.installments}</span>
                    </div>
                    
                    <div className={`mt-4 bg-[#e8f0ec] p-4 rounded-xl`}>
                      <p className={`text-xs font-bold text-[#013220] text-center mb-2 tracking-widest uppercase`}>R.O.I Calculation</p>
                      <div className={`flex justify-between text-sm`}>
                        <span className={`font-semibold text-gray-700`}>Expected Profit:</span>
                        <span className={`font-black text-[#013220]`}>PKR {plan.roiProfit}</span>
                      </div>
                      <div className={`flex justify-between text-sm mt-1`}>
                        <span className={`font-semibold text-gray-700`}>Annual Return:</span>
                        <span className={`font-black text-[#013220]`}>{plan.roiPercent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`flex flex-col gap-8`}>
            <div className={`flex items-center gap-4`}>
              <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
              <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Location</h2>
            </div>
            
            <div className={`bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-8 rounded-2xl flex flex-col gap-6`}>
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
                <div className={`flex flex-col`}>
                  <span className={`text-gray-400 text-sm font-bold uppercase tracking-wider mb-1`}>Address</span>
                  <span className={`text-gray-900 font-bold`}>{property.location}</span>
                </div>
              </div>
              
              <div className={`w-full h-[450px] bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-200 mt-2`}>
                 <iframe 
                   src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`} 
                   width={`100%`} 
                   height={`100%`} 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading={`lazy`} 
                   referrerPolicy={`no-referrer-when-downgrade`}
                   title={`Property Location Map`}
                 ></iframe>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-8 pb-20`}>
            <div className={`flex items-center gap-4`}>
              <div className={`w-2 h-8 bg-[#013220] rounded-full`}></div>
              <h2 className={`text-3xl font-black text-gray-900 tracking-tight`}>Property Media</h2>
            </div>
            
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-4`}>
               {galleryImages.map((mediaUrl, idx) => {
                 const isVideo = mediaUrl.toLowerCase().endsWith(`.mp4`) || mediaUrl.toLowerCase().endsWith(`.webm`);
                 
                 return (
                   <div 
                     key={idx} 
                     onClick={() => setLightboxIndex(idx)}
                     className={`w-full h-[220px] rounded-xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-2xl transition-all duration-500`}
                   >
                     {isVideo ? (
                        <video src={mediaUrl} muted playsInline className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out`} />
                     ) : (
                        <img src={mediaUrl} alt={`Gallery view`} className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out`} />
                     )}
                     
                     {isVideo && (
                       <div className={`absolute top-3 right-3 bg-black/60 rounded-full p-2 z-10 shadow-lg`}>
                         <svg className={`w-4 h-4 text-white ml-0.5`} fill={`currentColor`} viewBox={`0 0 20 20`}><path d={`M4 4l12 6-12 6z`}></path></svg>
                       </div>
                     )}

                     <div className={`absolute inset-0 bg-[#013220]/0 group-hover:bg-[#013220]/30 transition-colors duration-500 flex items-center justify-center z-20`}>
                       <svg className={`w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 ease-out`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7`}></path></svg>
                     </div>
                   </div>
                 );
               })}
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
                <h3 className={`font-black text-xl text-gray-900`}>Qemaat Agent</h3>
                <Link href={`https://wa.me/923334888324`} target="_blank" rel="noopener noreferrer" className={`text-sm text-[#013220] font-bold uppercase tracking-wider hover:underline`}>Contact Us</Link>
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
                   defaultValue={`I am interested in renting the property: ` + property.title}
                 ></textarea>
              </div>
              
              <a href={`https://wa.me/923334888324`} target="_blank" rel="noopener noreferrer" className={`block text-center w-full bg-gradient-to-r from-[#013220] to-[#011a11] hover:from-[#011a11] hover:to-black text-white font-black text-lg py-3.5 rounded-lg transition-all duration-300 shadow-[0_10px_20px_rgba(1,50,32,0.3)] hover:shadow-[0_15px_30px_rgba(1,50,32,0.5)] hover:-translate-y-1 mt-2 uppercase tracking-widest`}>
                Request Information
              </a>
            </form>

          </div>
        </div>

      </div>

      {lightboxIndex !== null && (
        <div className={`fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center backdrop-blur-xl`}>
          
          <button onClick={() => setLightboxIndex(null)} className={`absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 z-50`}>
            <svg className={`w-8 h-8`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M6 18L18 6M6 6l12 12`}></path></svg>
          </button>
          
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className={`absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-300 z-50`}>
            <svg className={`w-10 h-10`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M15 19l-7-7 7-7`}></path></svg>
          </button>
          
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className={`absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-300 z-50`}>
            <svg className={`w-10 h-10`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M9 5l7 7-7 7`}></path></svg>
          </button>
          
          <div className={`relative w-full max-w-7xl max-h-[85vh] px-4 flex flex-col items-center justify-center select-none`} onClick={(e) => e.stopPropagation()}>
             {(() => {
               const activeMedia = galleryImages[lightboxIndex];
               const isVideo = activeMedia.toLowerCase().endsWith(`.mp4`) || activeMedia.toLowerCase().endsWith(`.webm`);
               
               return isVideo ? (
                 <video ref={modalImgRef} src={activeMedia} controls autoPlay className={`max-w-full max-h-[80vh] object-contain shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-lg`} />
               ) : (
                 <img ref={modalImgRef} src={activeMedia} alt={`Media Expanded`} className={`max-w-full max-h-[80vh] object-contain shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-lg`} />
               );
             })()}
             <div className={`text-white/50 font-bold tracking-widest uppercase mt-6 text-sm`}>
               Media {lightboxIndex + 1} of {galleryImages.length}
             </div>
          </div>
        </div>
      )}

    </main>
  );
}