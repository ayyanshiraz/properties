"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import gsap from "gsap"

export default function DashboardClient() {
  const [userName, setUserName] = useState("Alishba Zia")
  const [graphFilter, setGraphFilter] = useState("Week")
  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null)
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const graphContainerRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const emptyStateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUserName(parsed.name || parsed.email || "Alishba Zia")
    } else {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties", { cache: "no-store" })
        if (!response.ok) {
          setIsError(true)
          return
        }
        const result = await response.json()
        if (result.success) {
          setProperties(result.data)
        } else {
          setIsError(true)
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProperties()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(headerRef.current, 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )

      tl.fromTo(titleRef.current, 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.7)" }, 
        "-=.3"
      )

      tl.fromTo(cardsRef.current, 
        { y: 60, rotationX: -25, rotationY: 10, opacity: 0, transformPerspective: 1000, transformOrigin: "bottom center" },
        { y: 0, rotationX: 0, rotationY: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.4)" }, 
        "-=.6"
      )

      tl.fromTo(graphContainerRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
        "-=.4"
      )

      tl.fromTo(barsRef.current, 
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 0.8, stagger: 0.1, ease: "elastic.out(1, 0.8)" }, 
        "-=.4"
      )

      tl.fromTo(emptyStateRef.current, 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }, 
        "-=.5"
      )

    }, containerRef)

    return () => ctx.revert()
  }, [properties, isLoading, isError])

  const confirmDelete = async () => {
    if (!deleteModalId) return;
    
    try {
      const response = await fetch("/api/properties/" + deleteModalId, {
        method: "DELETE",
      })
      const result = await response.json()
      
      if (result.success) {
        setProperties(properties.filter((prop) => prop.id !== deleteModalId))
      } else {
        alert("System Error: Property could not be deleted.")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Network request failed.")
    } finally {
      setDeleteModalId(null)
    }
  }

  const getGraphData = () => {
    if (graphFilter === "Week") {
      const counts = [0, 0, 0, 0, 0, 0, 0] 
      properties.forEach((prop) => {
        const date = new Date(prop.createdAt)
        const dayIndex = date.getDay() 
        const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
        if (adjustedIndex >= 0 && adjustedIndex < 7) {
          counts[adjustedIndex]++
        }
      })
      const maxCount = Math.max(...counts, 1)
      return {
        data: counts.map((count) => ({ count, heightPercentage: (count / maxCount) * 100 })),
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      }
    } else if (graphFilter === "Month") {
      const counts = [0, 0, 0, 0]
      properties.forEach((prop) => {
        const date = new Date(prop.createdAt)
        const dateNum = date.getDate()
        if (dateNum <= 7) counts[0]++
        else if (dateNum <= 14) counts[1]++
        else if (dateNum <= 21) counts[2]++
        else counts[3]++
      })
      const maxCount = Math.max(...counts, 1)
      return {
        data: counts.map((count) => ({ count, heightPercentage: (count / maxCount) * 100 })),
        labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"]
      }
    } else {
      const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      properties.forEach((prop) => {
        const date = new Date(prop.createdAt)
        counts[date.getMonth()]++
      })
      const maxCount = Math.max(...counts, 1)
      return {
        data: counts.map((count) => ({ count, heightPercentage: (count / maxCount) * 100 })),
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    }
  }

  const graphRenderData = getGraphData()

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el
  }

  const setBarRef = (el: HTMLDivElement | null, index: number) => {
    barsRef.current[index] = el
  }

  return (
    <main ref={containerRef} className="flex-1 flex flex-col bg-[#f8fafc] perspective-1000 min-h-screen">
      
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Delete Property?</h3>
            <p className="text-gray-500 text-center mb-8 font-medium">Are you sure you want to permanently delete this listing? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteModalId(null)} className="flex-1 py-3.5 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-3.5 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      <header ref={headerRef} className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <Link href="/" className="hidden md:flex text-sm font-semibold text-gray-500 hover:text-[#013220] items-center gap-1 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            Go to Qemaat
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/add-property" className="hidden md:flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-[#013220] to-[#025a3a] hover:from-[#011a11] hover:to-[#013220] active:scale-95 transition-all px-5 py-2.5 rounded-lg shadow-lg hover:shadow-[#013220]/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            List Property
          </Link>
          <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
          <div className="flex items-center gap-3 group cursor-pointer">
            <span className="text-sm font-bold text-gray-700 hidden sm:block group-hover:text-[#013220] transition-colors">{userName}</span>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 group-hover:border-[#013220] group-hover:bg-[#e8f0ec] transition-all duration-300">
               <svg className="w-5 h-5 text-gray-500 group-hover:text-[#013220] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-8">
        
        <div className="mb-10" ref={titleRef}>
          <h2 className="font-black text-gray-900 text-3xl mb-2 tracking-tight">What would you like to list today?</h2>
          <p className="text-gray-500 font-medium mb-8 text-lg">Choose a category below to start adding your property details.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div ref={(el) => setCardRef(el, 0)} className="relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer overflow-hidden">
              <h3 className="text-xl font-black text-gray-900 mb-3">For Sale (Buy)</h3>
              <p className="text-sm text-gray-500 mb-6">List a Home, Plot, or Commercial property for potential buyers across the network.</p>
              <Link href="/add-property?type=sale" className="text-blue-600 font-bold text-sm flex items-center gap-2">Start Listing</Link>
            </div>

            <div ref={(el) => setCardRef(el, 1)} className="relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer overflow-hidden">
              <h3 className="text-xl font-black text-gray-900 mb-3">For Rent</h3>
              <p className="text-sm text-gray-500 mb-6">List residential or commercial properties to find verified tenants quickly.</p>
              <Link href="/add-property?type=rent" className="text-orange-500 font-bold text-sm flex items-center gap-2">Start Listing</Link>
            </div>

            <div ref={(el) => setCardRef(el, 2)} className="relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer overflow-hidden">
              <h3 className="text-xl font-black text-gray-900 mb-3">Co-Working Space</h3>
              <p className="text-sm text-gray-500 mb-6">List shared offices, premium meeting rooms, or dedicated quiet desks.</p>
              <Link href="/add-property?type=coworking" className="text-purple-600 font-bold text-sm flex items-center gap-2">Start Listing</Link>
            </div>
          </div>
        </div>

        <div ref={graphContainerRef} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mb-10 relative overflow-hidden">
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 z-10">
            <div>
              <h2 className="font-black text-gray-900 text-2xl mb-1">Properties Listed on Qemaat</h2>
              <p className="text-sm text-gray-500 font-medium">Total real listings added by users calculated across the platform.</p>
            </div>
            <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
              {["Week", "Month", "Year"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setGraphFilter(tab)}
                  className={"px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 " + (graphFilter === tab ? "bg-[#013220] text-white shadow-md scale-105" : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50")}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full flex items-end justify-between gap-3 px-2 pb-8 border-b-2 border-gray-100 relative z-10">
            {graphRenderData.data.map((item, index) => (
              <div 
                key={index}
                ref={(el) => setBarRef(el, index)} 
                className="w-full transition-all duration-300 rounded-t-lg relative group cursor-crosshair bg-[#e8f0ec] hover:bg-[#013220]"
                style={{ height: `${item.heightPercentage}%` }}
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap transform pointer-events-none">
                  {item.count} Listings
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm font-bold text-gray-400 px-4">
            {graphRenderData.labels.map((label, idx) => (
              <span key={idx} className={graphFilter === "Week" && new Date().getDay() - 1 === idx ? "text-[#013220] bg-[#e8f0ec] px-3 py-1 rounded-md" : ""}>{label}</span>
            ))}
          </div>
        </div>

        <div ref={emptyStateRef} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative overflow-hidden group mb-20">
          <div className="relative z-10 flex justify-between items-center mb-8">
            <h2 className="font-black text-gray-900 text-2xl">Your Listed Properties</h2>
          </div>
          
          {isLoading ? (
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 bg-white/50 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#013220] rounded-full animate-spin mb-4"></div>
              <h3 className="font-bold text-gray-500 text-lg">Loading your properties...</h3>
            </div>
          ) : isError ? (
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 bg-red-50 rounded-2xl border border-red-200">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className="font-black text-red-800 text-xl mb-2">Connection Timeout</h3>
              <p className="text-red-600 font-medium mb-6">The database is not responding. Please check your network connection and refresh the page.</p>
              <button onClick={() => window.location.reload()} className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg shadow-md hover:bg-red-700">
                Refresh Page
              </button>
            </div>
          ) : properties.length > 0 ? (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop: any) => (
                <div key={prop.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group/card relative">
                  
                  <div className="absolute top-6 right-6 flex gap-2 z-20 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-300">
                    <Link 
                      href={"/edit-property/" + prop.id} 
                      className="w-9 h-9 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors"
                      title="Edit Property"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </Link>
                    <button 
                      onClick={() => setDeleteModalId(prop.id)} 
                      className="w-9 h-9 bg-white text-red-600 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                      title="Delete Property"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>

                  <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                    {prop.images && prop.images.length > 0 ? (
                      <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                    ) : prop.videos && prop.videos.length > 0 ? (
                      <video src={prop.videos[0]} className="w-full h-full object-cover" controls={false} muted loop autoPlay />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">No Media Assets</div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg">{prop.type}</span>
                    <span className="text-lg font-black text-gray-900">PKR {prop.price}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">{prop.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-1">{prop.location}</p>
                  
                  {prop.category && (
                    <div className="mt-auto inline-block px-3 py-1.5 bg-[#f8fafc] text-gray-600 border border-gray-100 text-xs font-bold rounded-lg w-max">
                      {prop.category}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
              <h3 className="font-black text-gray-900 text-xl mb-2">No Properties Added Yet</h3>
              <Link href="/add-property" className="mt-4 inline-block text-sm font-bold text-white bg-gray-900 px-8 py-3.5 rounded-xl shadow-lg">List a Property Now</Link>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}