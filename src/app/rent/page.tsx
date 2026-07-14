import RentClient from "../../components/RentClient";
import { prisma } from "../../lib/prisma";

export const dynamic = `force-dynamic`;

export const metadata = {
  title: `Properties For Rent | Qemaat`,
  description: `Browse our exclusive properties for rent and discover luxury living today.`,
};

export default async function RentPage() {
  const staticData = [
    {
      id: 1001,
      title: `Furnished 2 Bed Apartment (Without Bills)`,
      location: `Gulberg, Lahore`,
      price: 160000,
      priceStr: `PKR 160,000`,
      image: `/rent/6.webp`
    },
    {
      id: 1002,
      title: `Non Furnished Apartment (Without Bills)`,
      location: `Gulberg, Lahore`,
      price: 150000,
      priceStr: `PKR 150,000`,
      image: `/rent/14.webp`
    },
    {
      id: 1003,
      title: `2 Bed Apartment in Zameen Aurum (Modern Furnished)`,
      location: `Gulberg, Lahore`,
      price: 520000,
      priceStr: `PKR 520,000`,
      image: `/rent/8.webp`
    },
    {
      id: 1004,
      title: `1 Kanal Portion on MM Alam Road`,
      location: `MM Alam Road, Gulberg, Lahore`,
      price: 250000,
      priceStr: `PKR 250,000`,
      image: `/rent/22.webp`
    },
    {
      id: 1005,
      title: `House for rent`,
      location: `Cavlary ground cant Lahore`,
      price: 150000,
      priceStr: `PKR 150,000`,
      image: `/rent/46.webp`
    },
    {
      id: 1006,
      title: `Commercial rent property main bolevard valenciaa`,
      location: `Main Boulevard Valencia, Lahore`,
      price: 650000,
      priceStr: `PKR 650,000`,
      image: `/rent/87.webp`
    }
  ];

  let dbProperties: any[] = [];
  try {
    dbProperties = await prisma.property.findMany({
      where: { type: `For Rent` },
      orderBy: { createdAt: `desc` }
    });
  } catch (error) {
    console.error(error);
  }

  const formattedDbData = dbProperties.map((prop: any) => ({
    id: prop.id,
    title: prop.title,
    location: prop.location,
    price: Number(prop.price.toString().replace(/[^0-9]/g, ``) || 0),
    priceStr: `PKR ` + prop.price,
    image: prop.images && prop.images.length > 0 ? prop.images[0] : `/rent/6.webp`
  }));

  const combinedData = [...staticData, ...formattedDbData];

  return <RentClient properties={combinedData} />;
}