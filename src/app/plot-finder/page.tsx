import PlotFinder from "../../components/PlotFinder";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Plot Finder | Qemaat",
  description: "Search and discover available plots and properties across Lahore using our interactive map interface."
};

export default async function PlotFinderPage() {
  let dbProperties: any[] = [];
  
  try {
    dbProperties = await prisma.property.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch properties for plot finder:", error);
  }

  // Sirf zaroori data pass karein ta ke client side heavy na ho
  const formattedDbData = dbProperties.map((prop) => ({
    id: prop.id,
    title: prop.title,
    type: prop.type,
    category: prop.category
  }));

  return (
    <main className="w-full min-h-screen bg-gray-200">
      <PlotFinder dbProperties={formattedDbData} />
    </main>
  );
}