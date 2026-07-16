"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import gsap from "gsap"

export default function AlertsPage() {
  const [userName, setUserName] = useState("Alishba Zia")
  const [userId, setUserId] = useState<number | null>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const alertsRef = useRef<HTMLDivElement>(null)

  // User check
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUserName(parsed.name || parsed.email || "Alishba Zia")
      setUserId(parsed.id)
    } else {
      router.push("/login")
    }
  }, [router])

  // Fetch properties & generate alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      if (!userId) return

      try {
        const response = await fetch("/api/properties", { cache: "no-store" })
        const result = await response.json()
        
        if (result.success) {
          // Sirf is user ki properties filter karein
          const myProperties = result.data.filter((prop: any) => prop.userId === userId)
          
          // Notifications generate karein
          const generatedAlerts = myProperties.map((prop: any) => ({
            id: prop.id,
            title: prop.title,
            status: prop.status,
            type: prop.type,
            price: prop.price,
            date: new Date(prop.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "short", day: "numeric"
            })
          }))

          setAlerts(generatedAlerts)
        }
      } catch (error) {
        console.error("Failed to fetch alerts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAlerts()
  }, [userId])

  // GSAP Animations
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(headerRef.current, 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )

      tl.fromTo(titleRef.current, 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.7)" }, 
        "-=0.3"
      )

      if (alertsRef.current && alertsRef.current.children.length > 0) {
        tl.fromTo(alertsRef.current.children, 
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 
          "-=0.5"
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isLoading, alerts])

  return (
    <main ref={containerRef} className="flex-1 flex flex-col bg-[#f8fafc] min-h-screen overflow-x-hidden">
      
      <header ref={headerRef} className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/account" className="flex md:hidden text-gray-600 hover:text-[#013220] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
          <Link href="/account" className="hidden md:flex text-sm font-semibold text-gray-500 hover:text-[#013220] items-center gap-1 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Dashboard
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
               <svg className="w-5 h-5 text-gray-500 group-hover:text-[#013220] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-8 max-w-5xl mx-auto w-full">
        
        <div className="mb-10" ref={titleRef}>
          <h2 className="font-black text-gray-900 text-3xl mb-2 tracking-tight">Manage Alerts</h2>
          <p className="text-gray-500 font-medium text-lg">Stay updated with the latest status of your property listings.</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#013220] rounded-full animate-spin mb-4"></div>
            <h3 className="font-bold text-gray-500 text-lg">Checking for new alerts...</h3>
          </div>
        ) : alerts.length > 0 ? (
          <div className="flex flex-col gap-4" ref={alertsRef}>
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 items-start md:items-center relative overflow-hidden">
                
                {/* Visual Indicator Line */}
                <div className={"absolute left-0 top-0 bottom-0 w-1.5 " + (alert.status === "APPROVED" ? "bg-green-500" : "bg-yellow-400")}></div>

                {/* Icon */}
                <div className={"w-12 h-12 rounded-full flex items-center justify-center shrink-0 " + (alert.status === "APPROVED" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600")}>
                  {alert.status === "APPROVED" ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{alert.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Property ID: #{alert.id}</span>
                  </div>
                  
                  {alert.status === "APPROVED" ? (
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">
                      Your listing <span className="text-[#013220] font-black">{alert.title}</span> has been approved!
                    </h3>
                  ) : (
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">
                      Your listing <span className="text-gray-700 font-black">{alert.title}</span> is currently under review.
                    </h3>
                  )}
                  
                  <p className="text-sm text-gray-500 mt-1">
                    {alert.status === "APPROVED" 
                      ? "Great news! Your property is now live and visible to potential buyers and tenants on Qemaat." 
                      : "Our admin team is reviewing your property details. It will be live on the portal once approved."}
                  </p>
                </div>

                {/* Action Button */}
                <div className="shrink-0 mt-2 md:mt-0">
                  <Link 
                    href={`/edit-property/${alert.id}`}
                    className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm rounded-lg transition-colors border border-gray-200 block text-center"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </div>
            <h3 className="font-black text-gray-900 text-2xl mb-2">No Alerts Yet</h3>
            <p className="text-gray-500 font-medium text-center max-w-sm mb-8">
              You do not have any notifications right now. When you list a property, its approval updates will appear here.
            </p>
            <Link href="/add-property" className="bg-[#013220] hover:bg-[#011a11] text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-colors">
              List a Property
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}