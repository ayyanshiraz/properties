import React from "react";
import HomeClient from "../components/HomeClient";

// SEO Metadata for Search Engines
export const metadata = {
  title: "Pakistan Property Real Estate - Sell Buy Rent Homes",
  description: "Find the best residential and commercial properties across Lahore, Karachi, and Islamabad. Your trusted real estate portal.",
  keywords: "properties in pakistan, buy house lahore, rent apartment karachi, real estate",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Interactive Client Side Search Block */}
      <HomeClient />
    </main>
  );
}