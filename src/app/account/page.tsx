"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import DashboardClient from "../../components/DashboardClient"

export default function AccountDashboard() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem(`user`)
    router.push(`/login`)
  }

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col md:flex-row pb-16 md:pb-0`}>
      
      <aside className={`w-full md:w-20 lg:w-64 bg-white border-t md:border-t-0 md:border-r border-gray-200 flex flex-row md:flex-col fixed bottom-0 left-0 md:sticky md:top-0 h-16 md:h-screen shrink-0 z-50`}>
        <div className={`h-16 hidden md:flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-200 shrink-0`}>
          <div className={`w-8 h-8 bg-[#013220] rounded flex items-center justify-center`}>
            <svg className={`w-5 h-5 text-white`} fill={`currentColor`} viewBox={`0 0 20 20`}>
              <path d={`M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z`} />
            </svg>
          </div>
          <span className={`hidden lg:block ml-3 text-lg font-black text-gray-900 tracking-tight`}>
            Qemaat
          </span>
        </div>
        
        <nav className={`flex-1 py-0 md:py-4 flex flex-row md:flex-col gap-1 md:gap-2 px-2 md:px-3 justify-around md:justify-start items-center md:items-stretch overflow-hidden md:overflow-y-auto w-full`}>
          
          <Link href={`/`} className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-2 md:px-3 py-2 md:py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer transition-colors flex-1 md:flex-none justify-center md:justify-start text-center md:hidden`}>
            <svg className={`w-5 h-5 md:w-5 md:h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6`}></path></svg>
            <span className={`text-[10px] md:text-sm font-bold block md:hidden lg:block whitespace-nowrap`}>Home</span>
          </Link>

          <div className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-2 md:px-3 py-2 md:py-3 bg-[#e8f0ec] text-[#013220] rounded-lg cursor-pointer transition-colors flex-1 md:flex-none justify-center md:justify-start text-center`}>
            <svg className={`w-5 h-5 md:w-5 md:h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z`}></path></svg>
            <span className={`text-[10px] md:text-sm font-bold block md:hidden lg:block whitespace-nowrap`}>Dashboard</span>
          </div>
          
          <Link href={`/add-property`} className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-2 md:px-3 py-2 md:py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg cursor-pointer transition-colors flex-1 md:flex-none justify-center md:justify-start text-center`}>
            <svg className={`w-5 h-5 md:w-5 md:h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M12 4v16m8-8H4`}></path></svg>
            <span className={`text-[10px] md:text-sm font-bold block md:hidden lg:block whitespace-nowrap`}>Add Property</span>
          </Link>

          <button onClick={handleLogout} className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-2 md:px-3 py-2 md:py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer transition-colors flex-1 md:flex-none md:w-full text-center md:text-left md:mt-auto shrink-0 justify-center md:justify-start`}>
            <svg className={`w-5 h-5 md:w-5 md:h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1`}></path></svg>
            <span className={`text-[10px] md:text-sm font-bold block md:hidden lg:block whitespace-nowrap`}>Logout</span>
          </button>
        </nav>
      </aside>

      <DashboardClient />

    </div>
  )
}