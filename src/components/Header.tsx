"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full bg-[#013220] z-[110] h-[44px] flex items-center">
      <div className="max-w-[1400px] mx-auto w-full px-4 flex justify-end items-center gap-6">
        
        <Link href="/" className="text-[13px] font-bold text-white hover:text-gray-200 transition-colors cursor-pointer">
          ADD PROPERTY
        </Link>

        <Link href="/" className="text-[13px] font-bold text-white hover:text-gray-200 transition-colors cursor-pointer">
          LOG IN
        </Link>

      </div>
    </header>
  );
}