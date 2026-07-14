import BuyClient from "../../components/BuyClient";
import { prisma } from "../../lib/prisma";

export const dynamic = `force-dynamic`;

export const metadata = {
  title: `Properties For Sale | Qemaat`,
  description: `Discover real estate opportunities with our exclusive properties for sale.`,
};

export default async function BuyPage() {
  const staticData = [
    { id: 2001, title: `2 Kanal Commercial Building`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, price: 1000000000, priceStr: `PKR 100 Crore`, area: `2 Kanal (59x150)`, image: `/buy/1.webp`, description: `Premium commercial building available for sale.` },
    { id: 2002, title: `2 Kanal Commercial House Kothi`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, price: 900000000, priceStr: `PKR 90 Crore`, area: `2 Kanal (59x150)`, image: `/buy/2.webp`, description: `Luxurious commercial house kothi located directly on Mehmood Kasuri Road.` },
    { id: 2003, title: `3.5 Marla House`, location: `Main Ferozpur Road, Lahore`, price: 12500000, priceStr: `PKR 1.25 Crore`, area: `3.5 Marla (26 ft front)`, image: `/buy/9.webp`, description: `An excellent investment opportunity awaits with this 3.5 Marla house.` },
    { id: 2004, title: `6 Marla Shiraz Villas House`, location: `Shiraz Villas, Main Walton Road, Lahore`, price: 30000000, priceStr: `PKR 3 Crore`, area: `6 Marla (25 ft front)`, image: `/buy/8.webp`, description: `Discover luxury living in this brand new double story house.` },
    { id: 2005, title: `1 Kanal 3 Marla Commercial Building`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, price: 650000000, priceStr: `PKR 65 Crore`, area: `1 Kanal 3 Marla`, image: `/buy/1.webp`, description: `Presenting a prime commercial building spanning 1 Kanal and 3 Marla.` },
    { id: 2006, title: `34 Marla House in Prime Location Gulberg`, location: `Gulberg, Lahore`, price: 160000000, priceStr: `PKR 16 Crore`, area: `34 Marla (55 ft front)`, image: `/buy/14.webp`, description: `Premium 34 Marla home for sale in a prime location of Gulberg, just 1 minute away from Pepsi Road and 1 minute from Jail Road.` }
  ];

  let dbProperties: any[] = [];
  try {
    dbProperties = await prisma.property.findMany({
      where: { type: `For Sale` },
      orderBy: { createdAt: `desc` }
    });
  } catch (error) {
    console.error(`Failed to fetch buy properties:`, error);
  }

  const formattedDbData = dbProperties.map((prop: any) => ({
    id: prop.id,
    title: prop.title,
    location: prop.location,
    price: Number(prop.price.toString().replace(/[^0-9]/g, ``) || 0),
    priceStr: `PKR ` + prop.price,
    area: prop.area || prop.category || `Not Specified`,
    image: prop.images && prop.images.length > 0 ? prop.images[0] : `/buy/1.webp`,
    description: prop.description
  }));

  const combinedData = [...staticData, ...formattedDbData];

  return <BuyClient properties={combinedData} />;
}