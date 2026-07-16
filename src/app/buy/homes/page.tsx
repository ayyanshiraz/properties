import HomesClient from "../../../components/HomesClient";
import { prisma } from "../../../lib/prisma";

export const dynamic = `force-dynamic`;

export const metadata = {
  title: `Homes For Sale | Qemaat`,
  description: `Discover premium residential homes for sale.`,
};

export default async function HomesPage() {
  const staticData = [
    {
      id: 2002,
      title: `2 Kanal Commercial House Kothi`,
      location: `Mehmood Kasuri Road, Gulberg, Lahore`,
      price: 900000000,
      priceStr: `PKR 90 Crore`,
      area: `2 Kanal (59x150)`,
      image: `/buy/2.webp`
    },
    {
      id: 2003,
      title: `3.5 Marla House`,
      location: `Main Ferozpur Road, Lahore`,
      price: 12500000,
      priceStr: `PKR 1.25 crore`,
      area: `3.5 Marla (26 ft front)`,
      image: `/buy/9.webp`
    },
    {
      id: 2004,
      title: `6 Marla Shiraz Villas House`,
      location: `Shiraz Villas, Main Walton Road, Lahore`,
      price: 30000000,
      priceStr: `PKR 3 Crore`,
      area: `6 Marla (25 ft front)`,
      image: `/buy/8.webp`
    },
    {
      id: 2006,
      title: `34 Marla House in Prime Location Gulberg`,
      location: `Gulberg, Lahore`,
      price: 160000000,
      priceStr: `PKR 16 Crore`,
      area: `34 Marla (55 ft front)`,
      image: `/buy/14.webp`
    }
  ];

  let dbProperties: any[] = [];
  try {
    dbProperties = await prisma.property.findMany({
      where: { 
        type: `For Sale`,
        category: `Homes`,
        status: `APPROVED`
      },
      orderBy: { createdAt: `desc` }
    });
  } catch (error) {
    console.error(`Failed to fetch homes properties:`, error);
  }

  const formattedDbData = dbProperties.map((prop: any) => ({
    id: prop.id,
    title: prop.title,
    location: prop.location,
    price: Number(prop.price.toString().replace(/[^0-9]/g, ``) || 0),
    priceStr: `PKR ` + prop.price,
    area: prop.area || prop.category || `Not Specified`,
    image: prop.images && prop.images.length > 0 ? prop.images[0] : `/buy/9.webp`,
    description: prop.description
  }));

  const combinedData = [...staticData, ...formattedDbData];

  return <HomesClient properties={combinedData} />;
}