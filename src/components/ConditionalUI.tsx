"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalUI({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // In pages par Navbar aur Footer show nahi hoga
  const isPortalPage = 
    pathname === "/account" || 
    pathname === "/add-property" || 
    pathname.startsWith("/edit-property") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/admin") ||
    pathname === "/alerts"; 

  return (
    <>
      {!isPortalPage && <Navbar />}
      {children}
      {!isPortalPage && <Footer />}
    </>
  );
}