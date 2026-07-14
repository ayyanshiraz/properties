import BuyDetailClient from "../../../components/BuyDetailClient";
import { prisma } from "../../../lib/prisma";

export const dynamic = `force-dynamic`;

export const metadata = {
  title: `Property Details | Qemaat`,
  description: `View complete property details and contact our experts to buy your next asset.`,
};

export default async function BuyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const routeId = String(resolvedParams.id);
  
  let propertyData = null;

  if (routeId === `2001`) {
    propertyData = { id: routeId, title: `2 Kanal Commercial Building`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, priceStr: `PKR 100 Crore`, area: `2 Kanal (59x150)`, image: `/buy/1.webp`, images: [`/buy/1.webp`], description: `Premium commercial building available for sale.`, propertyType: `Commercial`, propertyStatus: `For Sale`, propertyId: `bizbuy-2001805972` };
  } else if (routeId === `2002`) {
    propertyData = { id: routeId, title: `2 Kanal Commercial House Kothi`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, priceStr: `PKR 90 Crore`, area: `2 Kanal (59x150)`, image: `/buy/2.webp`, images: [`/buy/2.webp`], description: `Luxurious commercial house kothi located directly on Mehmood Kasuri Road.`, propertyType: `House`, propertyStatus: `For Sale`, propertyId: `bizbuy-2002805972` };
  } else if (routeId === `2003`) {
    propertyData = { id: routeId, title: `3.5 Marla House`, location: `Main Ferozpur Road, Lahore`, priceStr: `PKR 1.25 Crore`, area: `3.5 Marla (26 ft front)`, image: `/buy/9.webp`, images: [`/buy/9.webp`, `/buy/10.webp`], description: `An excellent investment opportunity awaits with this 3.5 Marla house.`, propertyType: `House`, propertyStatus: `For Sale`, propertyId: `bizbuy-2003805972` };
  } else if (routeId === `2004`) {
    propertyData = { id: routeId, title: `6 Marla Shiraz Villas House`, location: `Shiraz Villas, Main Walton Road, Lahore`, priceStr: `PKR 3 Crore`, area: `6 Marla (25 ft front)`, image: `/buy/8.webp`, images: [`/buy/8.webp`, `/buy/video1.mp4`, `/buy/video2.mp4`], description: `Discover luxury living in this brand new double story house.`, propertyType: `House`, propertyStatus: `For Sale`, propertyId: `bizbuy-2004805972` };
  } else if (routeId === `2005`) {
    propertyData = { id: routeId, title: `1 Kanal 3 Marla Commercial Building`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, priceStr: `PKR 65 Crore`, area: `1 Kanal 3 Marla`, image: `/buy/1.webp`, images: [`/buy/1.webp`], description: `Presenting a prime commercial building spanning 1 Kanal and 3 Marla.`, propertyType: `Commercial`, propertyStatus: `For Sale`, propertyId: `bizbuy-2005805972` };
  } else if (routeId === `2006`) {
    propertyData = { id: routeId, title: `34 Marla House in Prime Location Gulberg`, location: `Gulberg, Lahore`, priceStr: `PKR 16 Crore`, area: `34 Marla (55 ft front)`, image: `/buy/14.webp`, images: [`/buy/11.webp`, `/buy/13.webp`, `/buy/14.webp`,`/buy/video4.mp4`, `/buy/video3.mp4`], description: `Premium 34 Marla home for sale in a prime location of Gulberg, just 1 minute away from Pepsi Road and 1 minute from Jail Road.`, propertyType: `House`, propertyStatus: `For Sale`, propertyId: `bizbuy-2006805972` };
  } else {
    try {
      const dbId = parseInt(routeId);
      if (!isNaN(dbId)) {
        const dbProp = await prisma.property.findUnique({ where: { id: dbId } });
        if (dbProp) {
          const dbImages = dbProp.images || [];
          const dbVideos = dbProp.videos || [];
          const combinedMedia = [...dbImages, ...dbVideos];

          propertyData = {
            id: dbProp.id.toString(),
            title: dbProp.title,
            location: dbProp.location,
            priceStr: `PKR ` + dbProp.price,
            area: dbProp.area || dbProp.category || `Various Dimensions`,
            image: combinedMedia.length > 0 ? combinedMedia[0] : `/buy/1.webp`,
            images: combinedMedia.length > 0 ? combinedMedia : [`/buy/1.webp`],
            description: dbProp.description,
            propertyType: dbProp.category || `For Sale`,
            propertyStatus: dbProp.type,
            propertyId: `bizbuy-` + dbProp.id + `805972`
          };
        }
      }
    } catch (error) {
      console.error(`Database fetch error:`, error);
    }
  }

  if (!propertyData) {
    propertyData = { id: routeId, title: `Property Not Found`, location: `Unknown`, priceStr: `N/A`, area: `N/A`, image: `/buy/1.webp`, images: [`/buy/1.webp`], description: `This property is no longer available.`, propertyType: `Unknown`, propertyStatus: `Sold / Unavailable`, propertyId: `N/A` };
  }

  return <BuyDetailClient property={propertyData} />;
}