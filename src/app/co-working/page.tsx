import CoWorkingClient from "../../components/CoWorkingClient";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Co-Working Space | Qemaat",
  description: "Discover premium co-working office spaces and shared desks tailored for your business needs.",
};

export default async function CoWorkingPage() {
  let dbProperties: any[] = [];
  try {
    dbProperties = await prisma.property.findMany({
      where: { 
        type: "Co-Working Space",
        status: "APPROVED" 
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch co-working properties:", error);
  }

  const formattedDbData = dbProperties.map((prop: any) => ({
    id: prop.id,
    title: prop.title,
    location: prop.location,
    price: Number(prop.price.toString().replace(/[^0-9]/g, "") || 0),
    priceStr: "PKR " + prop.price,
    area: prop.area || prop.category || "Not Specified",
    image: prop.images && prop.images.length > 0 ? prop.images[0] : "/buy/1.webp",
    description: prop.description
  }));

  return <CoWorkingClient properties={formattedDbData} />;
}