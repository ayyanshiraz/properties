"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardClient from "../../components/DashboardClient";

export default function AccountDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(`user`);
    router.push(`/login`);
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col md:flex-row`}>
      
      {/* Sidebar */}
      <aside className={`w-full md:w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex`}>
        <div className={`h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-200`}>
          <div className={`w-8 h-8 bg-[#013220] rounded flex items-center justify-center`}>
            <svg className={`w-5 h-5 text-white`} fill={`currentColor`} viewBox={`0 0 20 20`}>
              <path d={`M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z`} />
            </svg>
          </div>
          <span className={`hidden lg:block ml-3 text-lg font-black text-gray-900 tracking-tight`}>
            Qeemat
          </span>
        </div>
        
        <nav className={`flex-1 py-4 flex flex-col gap-2 px-3`}>
          <div className={`flex items-center gap-3 px-3 py-3 bg-[#e8f0ec] text-[#013220] rounded-lg cursor-pointer transition-colors`}>
            <svg className={`w-5 h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z`}></path></svg>
            <span className={`hidden lg:block font-bold text-sm`}>Dashboard</span>
          </div>
          
          <Link href={`/add-property`} className={`flex items-center gap-3 px-3 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer transition-colors`}>
            <svg className={`w-5 h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M12 4v16m8-8H4`}></path></svg>
            <span className={`hidden lg:block font-bold text-sm`}>Add Property</span>
          </Link>

          {/* Logout Button */}
          <button onClick={handleLogout} className={`flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer transition-colors w-full text-left mt-auto`}>
            <svg className={`w-5 h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1`}></path></svg>
            <span className={`hidden lg:block font-bold text-sm`}>Logout</span>
          </button>
        </nav>
      </aside>

      <DashboardClient />

    </div>
  );
}