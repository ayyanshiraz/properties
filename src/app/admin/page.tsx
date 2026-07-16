"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function AdminDashboard() {
  const router = useRouter();
  const [pendingProps, setPendingProps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAdmin = () => {
      const storedUserString = localStorage.getItem("user");
      if (!storedUserString) {
        router.push("/login");
        return;
      }
      const user = JSON.parse(storedUserString);
      if (user.role !== "ADMIN") {
        router.push("/");
      } else {
        fetchPending();
      }
    };
    checkAdmin();
  }, [router]);

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/admin/properties");
      const data = await res.json();
      if (data.success) {
        setPendingProps(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const res = await fetch("/api/admin/properties", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        fetchPending();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!loading && pendingProps.length > 0 && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, [loading, pendingProps]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013220]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      <div className="bg-[#013220] py-16 px-4 sm:px-8 lg:px-12 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Admin Approval Portal
          </h1>
          <p className="text-green-100 text-lg font-medium max-w-2xl">
            Review and manage new property listings before they go live on Qemaat.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 -mt-8 relative z-10 pb-20">
        {pendingProps.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-[#013220]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">All Caught Up</h2>
            <p className="text-gray-500 text-lg max-w-md">
              There are no pending properties to review at the moment. New submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6" ref={cardsRef}>
            <div className="flex items-center justify-between mb-2 px-2">
              <h2 className="text-xl font-bold text-gray-800">Pending Requests ({pendingProps.length})</h2>
            </div>
            
            {pendingProps.map((prop: any) => (
              <div key={prop.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-xl transition-shadow duration-300">
                
                <div className="w-full md:w-48 h-36 bg-gray-100 rounded-xl overflow-hidden shrink-0 relative">
                  {prop.images && prop.images.length > 0 ? (
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-black tracking-widest px-3 py-1 rounded shadow-sm uppercase">
                    PENDING
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-md">{prop.type}</span>
                    {prop.category && <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-md">{prop.category}</span>}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">{prop.title}</h3>
                  <div className="flex flex-wrap items-center gap-y-3 gap-x-5 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {prop.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Listed by {prop.user ? prop.user.name : "Unknown"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {new Date(prop.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-5 md:border-l md:border-gray-100 md:pl-8 shrink-0 w-full md:w-auto">
                  <div className="flex flex-col md:items-end">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Asking Price</span>
                    <span className="text-2xl font-black text-[#013220]">PKR {prop.price}</span>
                  </div>
                  <button 
                    onClick={() => handleApprove(prop.id)} 
                    className="w-full md:w-auto bg-[#013220] hover:bg-[#011a11] text-white font-bold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Approve Listing
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}