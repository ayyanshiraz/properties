import React from "react";
import HomeClient from "../components/HomeClient";
import { prisma } from "../lib/prisma";

export const dynamic = "force-dynamic";

// SEO Metadata for Search Engines
export const metadata = {
  title: "Qemaat - Sell Buy Rent Homes",
  description: "Find the best residential and commercial properties across Lahore. Your trusted real estate portal.",
  keywords: "properties in pakistan, buy house lahore, rent apartment lahore, real estate",
};

export default async function HomePage() {
  let dbProperties: any[] = [];
  
  try {
    dbProperties = await prisma.property.findMany({
      where: { status: "APPROVED" },
      select: {
        id: true,
        title: true,
        location: true,
        type: true,
        category: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch properties for homepage search:", error);
  }

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Interactive Client Side Search Block */}
      <HomeClient dbProperties={dbProperties} />
    </main>
  );
}